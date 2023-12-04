// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

interface INFTMarketplace {
    function checkWinner(
        uint256 _tokenId
    ) external view returns (address _winnerAddr);
}
