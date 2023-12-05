const express = require("express");
const { spawn } = require("child_process");
const app = express();
const bodyParser = require("body-parser");
const axios = require("axios");
const fs = require("fs").promises;
const sharp = require("sharp");

app.use(bodyParser.json());

// Function to run the Python script and return a promise
const runPythonScript = (pythonScriptPath) => {
  return new Promise((resolve, reject) => {
    const pythonProcess = spawn("python", [pythonScriptPath]);
    let data = "";
    pythonProcess.stdout.on("data", (chunk) => {
      data += chunk.toString();
    });
    pythonProcess.on("close", (code) => {
      console.log(`Python script exited with code ${code}`);
      resolve(data);
      // console.log("Data: ", data);
    });
    pythonProcess.on("error", (err) => {
      reject(err);
    });
  });
};

// Function to download and convert an image from IPFS to JPG
async function downloadAndConvertImageFromIPFS(cid, outputPath) {
  const ipfsGatewayUrl = `https://ipfs.io/ipfs/${cid}`;
  console.log(`Downloading and converting image from IPFS: ${ipfsGatewayUrl}`);
  try {
    const response = await axios.get(ipfsGatewayUrl, {
      responseType: "arraybuffer",
    });

    // Ensure the directory exists
    await fs.mkdir("content", { recursive: true });

    // Use sharp to convert and save the image as JPG
    await sharp(response.data).jpeg().toFile(outputPath);

    console.log(
      `Image downloaded and converted successfully to: ${outputPath}`
    );
  } catch (error) {
    console.error("Error downloading/convert image from IPFS:", error.message);
  }
}

// Endpoint to trigger the Python script
app.post("/run-similarity", async (req, res) => {
  const body = req.body;
  const pythonScriptPath = "similarity.py";

  // Loop through the request body properties dynamically
  for (const key in body) {
    if (Object.hasOwnProperty.call(body, key)) {
      const cid = body[key];

      // Download and convert images using unique paths dynamically
      const imagePath = `./content/${key}.jpg`;
      await downloadAndConvertImageFromIPFS(cid, imagePath);
    }
  }
  try {
    // Call the function to run the Python script
    const data = await runPythonScript(pythonScriptPath);

    // Send the data back to the client
    res.send(data);
  } catch (error) {
    console.error("Error running Python script:", error);
    res.status(500).send("Internal Server Error");
  }
});

// Start the Express server
const port = 3000;
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
