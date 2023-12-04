// SPDX-License-Identifier: MIT

pragma solidity ^0.8.18;

import {Script} from "forge-std/Script.sol";
import {NFTContract} from "../src/NFTContract.sol";

contract DeployNFTContract is Script {
    constructor() {}

    NFTContract _nftContract;

    function run() external returns (NFTContract) {
        vm.startBroadcast();
        _nftContract = new NFTContract();
        vm.stopBroadcast();
        return _nftContract;
    }
}
