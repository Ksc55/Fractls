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

pragma solidity ^0.8.0;

import {ERC20} from "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import {INFTMarketplace} from "./interface/INFTMarketplace.sol";

contract FractionToken is ERC20 {
    constructor() ERC20("FractionToken", "FTT") {
        _mint(msg.sender, 1000);
    }

    function mint(uint256 _tokenId, address marketplaceAddress) external {
        //@state reads
        address winnerAddress = INFTMarketplace(marketplaceAddress).checkWinner(
            _tokenId
        );

        //@checks
        require(winnerAddress == msg.sender, "Msg Sender not winner");
        _mint(msg.sender, 1);
    }
}
