import { NFTStorage, File } from "nft.storage";
import dotenv from "dotenv";
import { createCanvas, loadImage } from "canvas";
import {NextResponse} from "next/server";
import { v4 as uuidv4 } from 'uuid';

dotenv.config();

// Retrieve the NFT Storage API key from environment variables
const { NFT_STORAGE_API_KEY } = process.env;

// Function to split an image into a 3x3 grid and store each piece as an NFT

async function storePuzzleAsset(originalNFT, name ,description) {
    try {
        if (!NFT_STORAGE_API_KEY) {
            throw new Error("NFT_STORAGE_API_KEY is not provided in the environment variables.");
        }

        // Create a new NFTStorage client with the provided API key
        const client = new NFTStorage({ token: NFT_STORAGE_API_KEY });

        // Load the image using the canvas library
        const image = await loadImage(originalNFT);
        const canvas = createCanvas(image.width, image.height);
        const ctx = canvas.getContext("2d");
        ctx.drawImage(image, 0, 0, image.width, image.height);

        // Calculate the dimensions of each puzzle piece
        const pieceWidth = image.width / 3;
        const pieceHeight = image.height / 3;

        // Initialize an array to store the metadata for each puzzle piece
        const puzzlePiecesMetadata = [];

        // Loop through each row and column to create a 3x3 grid
        for (let row = 0; row < 3; row++) {
            for (let col = 0; col < 3; col++) {
                // Create a new canvas for each puzzle piece
                const pieceCanvas = createCanvas(pieceWidth, pieceHeight);
                const pieceCtx = pieceCanvas.getContext("2d");

                // Crop the original image to get the current puzzle piece
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

                // Store the metadata and image for the current puzzle piece on NFT.Storage
                const metadata = await client.store({
                    name: `PuzzlePiece${row * 3 + col + 1}`,
                    description: `Puzzle Piece ${row * 3 + col + 1} of 9 for PuzzleNFT`,
                    image: new File(
                        [pieceCanvas.toBuffer("image/png")],
                        `piece${row * 3 + col + 1}.png`,
                        { type: "image/png" }
                    ),
                });

                // Add the metadata for the current puzzle piece to the array
                puzzlePiecesMetadata.push(metadata);
            }
        }

        // Log the URLs where the metadata for each puzzle piece is stored on Filecoin and IPFS
        console.log("Metadata stored on Filecoin and IPFS for each puzzle piece:");
        puzzlePiecesMetadata.forEach((metadata, index) => {
            console.log(`Piece ${index + 1}: ${metadata.url}`);
        });

        const originalImageMetadata = {
            name,
            description,
            image: new File([originalNFT], "PuzzleNFT.png", { type: "image/png" }),
            properties: {
                pieces: puzzlePiecesMetadata.map((pieceMetadata) => pieceMetadata.url),
            },
        };

        // Store the metadata and image for the original image on NFT.Storage
        const originalImage = await client.store(originalImageMetadata);
        console.log("Metadata stored on Filecoin and IPFS for original image:");
        console.log(originalImage.url);
        return {
            pieces: puzzlePiecesMetadata.map((metadata, index) => ({
                url: metadata.url,
                id: uuidv4().split('-').map(part => parseInt(part, 16)).join(''),
            }
            )),
            original: originalImage
        };
    } catch (error) {
        // Handle any errors that may occur during the process
        console.error(error);
        throw error;
    }
}



export async function POST(request: Request) {
    const {image, name ,description} = await request.json()
    return storePuzzleAsset(image, name ,description).then(({pieces, original}    ) => {
        return NextResponse.json(
            {
                tokenId:  uuidv4().split('-').map(part => parseInt(part, 16)).join(''),
                tokenURIs: pieces.map((item) => item.url),
                _ids: pieces.map((item) => item.id),
                original
            }
        )
    }).catch((error) => {
        return NextResponse.json({status: 'Error uploading images'})
    });
}
