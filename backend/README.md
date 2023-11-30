# store-nft-example


## Install

```bash
npm install
```

## Add .env file
    ```bash
    cp .env.example .env
    ```


## Add your private key to .env file
    ```bash
    PRIVATE_KEY=YOUR_PRIVATE_KEY
    ```
## Add your NFT Storage API key to .env file
    ```bash
    NFT_STORAGE_API_KEY=YOUR_NFT_STORAGE_API_KEY
    ```



## Usage

1. Run the server locally
```bash
node ./server/index.js
```

2. The route is http://localhost:3000/upload-and-store-metadata
3. The params are an image as form-data encoded and value is your image file
4. The POST route will output the IPFS hash and the NFT Storage hash of the original image metadata and the pieces metadata
<!-- 3. TODO CONTRACT + mint it on the blockchain for each meatadata -->
<!-- 3. The script will output the transaction hash and the NFT contract address
5. You can view the NFT on OpenSea by visiting https://testnets.opensea.io/assets/CONTRACT_ADDRESS/TOKEN_ID -->
6. You can view the NFT on IPFS by visiting https://ipfs.io/ipfs/IPFS_HASH
7. You can view the NFT on NFT Storage by visiting https://nft.storage/ipfs/IPFS_HASH
 

