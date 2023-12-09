import { NFTStorage, File } from "nft.storage";
import dotenv from "dotenv";
import { createCanvas, loadImage } from "canvas";
import {NextResponse} from "next/server";
import { v4 as uuidv4 } from 'uuid';
import {useAccount, useContractRead, useContractWrite, usePrepareContractWrite} from "wagmi";
import NFTMarketplace from "../../../NFTMarketplace.json";


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
            image: new File([canvas.toBuffer("image/png")], `original.png`, { type: "image/png" }),
            properties: {
                pieces: puzzlePiecesMetadata.map((pieceMetadata) => pieceMetadata.url),
            },
        };

        // Store the metadata and image for the original image on NFT.Storage
        const originalImage = await client.store(originalImageMetadata);
        console.log("Metadata stored on Filecoin and IPFS for original image:" + originalImage.url);
        


        // HERE CHECK ANTI FRAUD
        // try {
        //     await checkFraud(originalImage)
        // }
        // catch (e) {
        //     console.log(e)
        // }



        return puzzlePiecesMetadata.map((metadata, index) => ({
            url: metadata.url,
            id: uuidv4().split('-').map(part => parseInt(part, 16)).join(''),
        }));

        

        



        
    } catch (error) {
        // Handle any errors that may occur during the process
        console.error(error);
        throw error;
    }
}



const checkFraud = async (originalImage) => {
    const responseIpfs = await getImageUrlFromIpfs(originalImage.url);
            await checkAntiFraud(responseIpfs);
  };


async function getImageUrlFromIpfs(ipfsUrl: string) {
    const ipfsEndpoint = "https://gateway.pinata.cloud";
    ipfsUrl = ipfsUrl.replace('ipfs://', '');
    const fullUrl = `${ipfsEndpoint}/ipfs/${ipfsUrl}`;

    try {
        const response = await fetch(fullUrl);

        if (!response.ok) {
            throw new Error(`Failed to fetch IPFS image: ${response.status} ${response.statusText}`);
        }

        const responseData = await response.text();

        const data = JSON.parse(responseData);
        return data.image;
    } catch (error) {
        console.error("Error fetching IPFS image:", error);
        try {
            const response = await fetch("https://ipfs.io/ipfs/" + ipfsUrl);

            if (!response.ok) {
                throw new Error(`Failed to fetch IPFS image: ${response.status} ${response.statusText}`);
            }

            const responseData = await response.text();

            const data = JSON.parse(responseData);
            return data.image;
        }
        catch (e) {
            console.error("Error fetching IPFS image:", e);
        }
        
    }
}


export async function checkAntiFraud(image: string) {
    try {
        const antifraud_endpoint = process.env.ANTI_FRAUD_URL;
        image = image.replace('ipfs://', '');
        console.log('image:', image);

        const response = await fetch(antifraud_endpoint + '/run-similarity', {
            method: 'POST',
            body: JSON.stringify([
                image,
                "bafybeihwetgkyyye2reyev7i7dzf37w3nd52pxwwzzqh56ew6ulktamtya/piece9.png",
                "bafybeifrlbawyaaswpwzlk3zx2euvppybnag3d5b3sa6z6nijjm5mrq5dy/piece2.png"
            ]),
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (response.ok) {
            const data = await response.json();
            console.log("ANTIFRAUD Result:", data);
        } else {
            console.error("ANTIFRAUD Error:", response.status, response.statusText);
        }
    } catch (error) {
        console.error("ANTIFRAUD Error:", error);
    }
}


// import NFTMarketplace from "../../../NFTMarketplace.json";

// interface UseTriggerGetAllNFTs {
//     data: ReturnType<typeof useContractRead>['data'];
//     isError: ReturnType<typeof useContractRead>['isError'];
//     triggerGetAllNFTs: () => Promise<any>; // Adjust 'any' to the actual type returned by getAllNFTs
// }

// // Custom hook to trigger the getAllNFTs function
// export function useTriggerGetAllNFTs(): UseTriggerGetAllNFTs {
//     const triggerGetAllNFTs = async () => {
//         try {
//             // Call the getAllNFTs function
//             const result = await useContractRead({
//                 address: `0x${process.env.NEXT_PUBLIC_CONTRACT}`,
//                 abi: NFTMarketplace.abi,
//                 functionName: "getAllNFTs",
//             });

//             // Handle the result if needed
//             console.log("Result of getAllNFTs:", result);
//             return result;
//         } catch (error) {
//             console.error("Error triggering getAllNFTs:", error);
//             throw error;
//         }
//     };

//     return { data, isError, triggerGetAllNFTs };
// }





export async function POST(request: Request) {
    const {image, name ,description} = await request.json()
    return storePuzzleAsset(image, name ,description).then((response    ) => {
        return NextResponse.json(
            {
                tokenId:  uuidv4().split('-').map(part => parseInt(part, 16)).join(''),
                tokenURIs: response.map((item) => item.url),
                _ids: response.map((item) => item.id),
            }
        )
    }).catch((error) => {
        return NextResponse.json({status: 'Error uploading images'})
    });
}
