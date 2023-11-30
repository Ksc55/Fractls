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

      const imageBuffer = req.file.buffer;

      const puzzlePiecesMetadata = await storePuzzleAsset(imageBuffer);

      return res.status(200).json({
        success: true,
        message: "File uploaded and metadata stored successfully",
        puzzlePiecesMetadata: puzzlePiecesMetadata,
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

// The function to store puzzle assets with the provided image buffer
async function storePuzzleAsset(imageBuffer) {
  try {
    const client = new NFTStorage({ token: process.env.NFT_STORAGE_API_KEY });

    const image = await loadImage(imageBuffer);
    const canvas = createCanvas(image.width, image.height);
    const ctx = canvas.getContext("2d");
    ctx.drawImage(image, 0, 0, image.width, image.height);

    const pieceWidth = image.width / 3;
    const pieceHeight = image.height / 3;

    const puzzlePiecesMetadata = [];

    for (let row = 0; row < 3; row++) {
      for (let col = 0; col < 3; col++) {
        const pieceCanvas = createCanvas(pieceWidth, pieceHeight);
        const pieceCtx = pieceCanvas.getContext("2d");

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

        const metadata = await client.store({
          name: `Piece${row * 3 + col + 1}`,
          description: `Piece ${row * 3 + col + 1} of 9 for PuzzleNFT`,
          image: new File(
            [pieceCanvas.toBuffer("image/png")],
            `piece${row * 3 + col + 1}.png`,
            {
              type: "image/png",
            }
          ),
        });

        puzzlePiecesMetadata.push(metadata);
      }
    }

    const originalImageMetadata = {
      name: "Fractal NFT",
      description: "A puzzle NFT created from a single image",
      image: new File([imageBuffer], "PuzzleNFT.png", { type: "image/png" }),
      metadata: {
        name: "PuzzleNFT",
        description: "A puzzle NFT created from a single image",
        url: "",
        pieces: puzzlePiecesMetadata.map((piece) => piece.url),
      },
    };

    const originalImage = await client.store(originalImageMetadata);
    originalImageMetadata.metadata.url = originalImage.url;
    originalImage;

    return originalImageMetadata;
  } catch (error) {
    console.error(error);
    throw error;
  }
}
