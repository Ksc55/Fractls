import express from "express";
import multer from "multer";
import { NFTStorage } from "nft.storage";
import dotenv from "dotenv";
import { createCanvas, loadImage } from "canvas";

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

app.use(express.json());

app.post(
  "/upload-and-store-metadata",
  upload.single("image"),
  async (req, res) => {
    try {
      if (!req.file) {
        return res
          .status(400)
          .json({ success: false, message: "No file uploaded" });
      }

      const { name, description, attributes } = req.body;

      const imageBuffer = req.file.buffer;

      const data = await storePuzzleAsset(imageBuffer, {
        name,
        description,
        attributes,
      });

      return res.status(200).json({
        success: true,
        message: "File uploaded and metadata stored successfully",
        data: data,
      });
    } catch (error) {
      console.error(error);
      return res
        .status(500)
        .json({ success: false, message: "Internal Server Error" });
    }
  }
);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

async function storePuzzleAsset(imageBuffer, metadata) {
  try {
    const client = new NFTStorage({ token: process.env.NFT_STORAGE_API_KEY });

    const image = await loadImage(imageBuffer);
    const canvas = createCanvas(image.width, image.height);
    const ctx = canvas.getContext("2d");
    ctx.drawImage(image, 0, 0, image.width, image.height);

    // Constants for puzzle piece dimensions
    const pieceWidth = image.width / 3;
    const pieceHeight = image.height / 3;

    const puzzlePiecesMetadata = [];

    // Loop through puzzle pieces
    for (let row = 0; row < 3; row++) {
      for (let col = 0; col < 3; col++) {
        // Create a canvas for each puzzle piece
        const pieceCanvas = createCanvas(pieceWidth, pieceHeight);
        const pieceCtx = pieceCanvas.getContext("2d");

        // Draw the puzzle piece on the canvas
        pieceCtx.drawImage(
          canvas,
          col * pieceWidth,
          row * pieceHeight,
          pieceWidth,
          pieceHeight,
          0,
          0,
          pieceWidth,
          pieceHeight
        );

        // Convert puzzle piece to buffer
        const pieceBuffer = pieceCanvas.toBuffer("image/png");

        // Store puzzle piece metadata
        const pieceMetadata = await client.store({
          ...metadata,
          name: `${metadata.name} - Piece ${row * 3 + col + 1}`,
          description: `${metadata.description} - Piece ${row * 3 + col + 1}`,
          image: new File([pieceBuffer], `piece${row * 3 + col + 1}.png`, {
            type: "image/png",
          }),
        });

        puzzlePiecesMetadata.push(pieceMetadata);
      }
    }

    // Create metadata for the original image
    const originalImageMetadata = {
      name: `${metadata.name} - Original`,
      description: `${metadata.description} - Original`,
      image: new File([imageBuffer], "original.png", { type: "image/png" }),
      attributes: metadata.attributes,
      metadata: {
        url: "",
        pieces: puzzlePiecesMetadata.map((piece) => piece.url),
      },
    };

    // Store metadata for the original image
    const originalImage = await client.store(originalImageMetadata);
    originalImageMetadata.metadata.url = originalImage.url;

    return originalImageMetadata;
  } catch (error) {
    console.error(error);
    throw error;
  }
}
