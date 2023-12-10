// SPDX-License-Identifier: MIT

pragma solidity ^0.8.18;

import {Script} from "forge-std/Script.sol";
import {NFTMarketplace} from "../src/NFTMarketplace.sol";

contract DeployNFTMarketplace is Script {
    constructor() {}

    NFTMarketplace _nFTMarketplace;

    function run() external returns (NFTMarketplace) {
        vm.startBroadcast();
        _nFTMarketplace = new NFTMarketplace();
        vm.stopBroadcast();
        return _nFTMarketplace;
    }
}
