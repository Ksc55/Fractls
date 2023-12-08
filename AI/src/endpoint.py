import ssl

ssl._create_default_https_context = ssl._create_unverified_context
from flask import Flask, request, jsonify
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
        result = get_similarity_score(paths[0], paths[1])
        return jsonify(str(result[0])), 200
    except Exception as e:
        print(f"Error running similarity script: {e}")
        return "Internal Server Error", 500

if __name__ == '__main__':
    port = 3000
    app.run(host='0.0.0.0', port=port)
