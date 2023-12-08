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

import {IFractionToken} from "./interface/IFractionToken.sol";

contract NFTMarketplace {
    /////////////// STATE VARIABLES ////////////////////
    ListNFT[] public allNFTs;

    ////////////// STRUCTS  ////////////////////

    struct ListNFT {
        uint256 tokenId;
        uint256[] partIds;
        address owner;
    }

    struct Part {
        uint256 id;
        string url;
    }
    /////////////// MAPPING ////////////////////
    mapping(uint256 => mapping(uint256 => Part)) public parts;
    mapping(address => ListNFT) public ownerNFT;
    mapping(uint256 => address) userWinner;

    /////////////// EVENTS ////////////////////
    event NFTCreated(uint256 tokenId, uint256[] partIds, address owner);
    event PartURIUpdated(uint256 tokenId, uint256 partId, string newURI);
    event WinnerRewarded(address winner, uint256 tokenId);

    constructor() {}

    // @functions
    // Function to create a new NFT with associated partIds and TokenURIs
    function createNFT(
        uint256 tokenId,
        string[] memory tokenURIs,
        uint256[] memory _ids
    ) public {
        uint256[] memory newPartIds = new uint256[](9);

        // Create parts mapping for each tokenId and partId
        for (uint256 i = 0; i < 9; i++) {
            parts[tokenId][_ids[i]] = Part({id: _ids[i], url: tokenURIs[i]});
            newPartIds[i] = _ids[i];
        }

        // Create ListNFT instance and update mappings
        ListNFT memory newListNFT = ListNFT(tokenId, newPartIds, msg.sender);
        ownerNFT[msg.sender] = newListNFT;
        allNFTs.push(newListNFT);

        emit NFTCreated(tokenId, newPartIds, msg.sender);
    }

    /////////// @notice This would check if the part is correct
    /////////// @dev The function arePartsCorrect() returns true or false
    ///////////      if true, it means the user sent [1,2,3,4,5,6,7,8,9] and we reward the user
    /////////// @param Array of Numbers
    function checkParts(
        uint256[9] memory _numbers,
        uint256 _tokenId,
        address owner
    ) external {
        bool didUserWin = arePartsCorrect(_numbers, owner);

        require(didUserWin, "Unable to match paths, Please try again");
        rewardWinner(_tokenId);
    }

    function rewardWinner(uint256 _tokenId) private {
        userWinner[_tokenId] = msg.sender;
        emit WinnerRewarded(msg.sender, _tokenId);
    }

    //////////////// GETTERS (PURE AND VIEW)/////////////////////////

    function extractValues(
        uint256 bigNumber
    ) public pure returns (uint256[18] memory) {
        uint256[18] memory values;
        bool inArray;

        for (uint i = 0; i < 18; i++) {
            inArray = false;
            // We use modulo operation to get the remainder of the bigNumber divided by 10
            uint256 digit = bigNumber % 10;

            // Check if the digit already exists in the values array
            for (uint256 i2 = 0; i2 < values.length; i2++) {
                if (digit == values[i2]) {
                    inArray = true;
                    break;
                }
            }

            // If the digit is not in the array, add it
            if (!inArray) {
                values[i] = digit;
            }

            // We then divide the bigNumber by 10 to effectively remove the last digit
            bigNumber = bigNumber / 10;
        }

        return values;
    }

    function arePartsCorrect(
        uint256[9] memory _numbers,
        address owner
    ) internal view returns (bool _ifWon) {
        uint256[] memory ids = ownerNFT[owner].partIds;

        for (uint256 i = 0; i < 9; i++) {
            // Check if the number matches the index (1 to 9)
            if (_numbers[i] != ids[i]) {
                // If there's a match, call the callback function
                return false;
            }
        }
        return true;
    }

    function checkWinner(
        uint256 _tokenId
    ) external view returns (address _winnerAddr) {
        return userWinner[_tokenId];
    }

    // Function to get the ListNFT associated with the calling address
    function getListNFT()
        public
        view
        returns (uint256, uint256[] memory, address)
    {
        ListNFT memory userNFT = ownerNFT[msg.sender];
        return (userNFT.tokenId, userNFT.partIds, userNFT.owner);
    }

    // Function to get all NFTs created, useful for listing all NFTs
    function getAllNFTs() public view returns (ListNFT[] memory) {
        return allNFTs;
    }

    // Additional getter to retrieve the URI associated with a specific partId and tokenId
    function getPartURI(
        uint256 tokenId,
        uint256 partId
    ) public view returns (Part memory) {
        return parts[tokenId][partId];
    }
}
