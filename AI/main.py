from flask import Flask, request, jsonify
import os
import ssl
ssl._create_default_https_context = ssl._create_unverified_context
import os
import subprocess
import requests
from PIL import Image
from io import BytesIO

app = Flask(__name__)
from similarity import get_similarity_score

def download_and_convert_image_from_ipfs(cid, output_path):
    ipfs_gateway_url = f"https://ipfs.io/ipfs/{cid}"
    print(f"Downloading and converting image from IPFS: {ipfs_gateway_url}")
    
    try:
        response = requests.get(ipfs_gateway_url)
        img = BytesIO(response.content)
        i = Image.open(img)
        i.save(output_path)
        return img
    except Exception as e:
        print(f"Error downloading/convert image from IPFS: {e}")
        return None

@app.route('/')
def index():
    return jsonify({"AI Antifraud": "Welcome to our AI antifraud 🚅"})


@app.route('/run-similarity', methods=['POST'])
def run_similarity():
    data = request.get_json()
    paths = []
    images = []
    for cid in data:
        image_path = f'./content/{cid.replace("/", "")}'
        paths.append(image_path)
        images.append(download_and_convert_image_from_ipfs(cid, image_path))

    try:
        firstImage = paths[0]
        arrayResults = []
        for i in range(1, len(paths)):
            secondImage = paths[i]
            if images[i] is None:
                continue  # Skip similarity calculation if image doesn't exist
            result = get_similarity_score(firstImage, secondImage)
            secondImage =  secondImage.replace("./content/", "")
            secondImage = secondImage.replace("piece", "/piece")
            arrayResults.append({
                'image': "https://ipfs.io/ipfs/"+secondImage,
                'similarity_score': float(result[0])
            })
            arrayResults.sort(key=lambda x: x['similarity_score'], reverse=True)
                

        return jsonify(arrayResults), 200
       
    except Exception as e:
        print(f"Error running similarity script: {e}")
        return "Internal Server Error", 500
    finally:
        # Clean up the files after similarity calculation
        for path in paths:
            if os.path.exists(path):
                os.remove(path)

if __name__ == '__main__':
    app.run(debug=True, port=os.getenv("PORT", default=5000))