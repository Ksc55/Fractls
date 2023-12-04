// Layout of Contract:
// version
// imports
// errors
// interfaces, libraries, contracts
// Type declarations
// State variables
// Events
// Modifiers
// Functions

// Layout of Functions:
// constructor
// receive function (if exists)
// fallback function (if exists)
// external
// public
// internal
// private
// internal & private view & pure functions
// external & public view & pure functions

// SPDX-License-Identifier: GPL-2.0-or-later

pragma solidity ^0.8.19;

import {ERC721} from "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import {ERC721URIStorage} from "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import {Ownable} from "@openzeppelin/contracts/access/Ownable.sol";

// The contract inherits from the ERC721, ERC721URIStorage, ERC721Burnable, and Ownable contracts.
contract NFTContract is ERC721, ERC721URIStorage, Ownable(msg.sender) {
    uint256 private _tokenIdCounter;

    // The constructor sets the name and symbol of the token using the ERC721 constructor.
    constructor() ERC721("Fractis", "FRAC") {}

    // Function to mint a new NFT. The function takes the recipient address and the token URI as parameters.
    function mint(address to, string memory uri) public returns (uint256) {
        // Getting the current token ID.
        uint256 tokenId = _tokenIdCounter;
        // Incrementing the token ID counter.
        _tokenIdCounter++;
        // Minting the new token and assigning it to the recipient.
        _safeMint(to, tokenId);
        // Setting the token URI of the minted token.
        _setTokenURI(tokenId, uri);

        // Returning the token ID of the minted token.
        return tokenId;
    }

    // Overriding the tokenURI function from the ERC721 contract to return the URI of a specific token.
    function tokenURI(
        uint256 tokenId
    ) public view override(ERC721, ERC721URIStorage) returns (string memory) {
        return super.tokenURI(tokenId);
    }

    // Function to get the current token ID.
    function getCurrentTokenId() public view returns (uint256) {
        return _tokenIdCounter;
    }

    function supportsInterface(
        bytes4 interfaceId
    ) public view override(ERC721, ERC721URIStorage) returns (bool) {
        return super.supportsInterface(interfaceId);
    }
}
