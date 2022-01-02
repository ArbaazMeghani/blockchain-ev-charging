//SPDX-License-Identifier: MIT
pragma solidity >=0.7.0 <0.9.0;

import "hardhat/console.sol";
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Burnable.sol";

contract Stations is ERC721, ERC721Burnable {
    address public owner;

    constructor() public ERC721("Electric Vehicle Charging Stations", "STATION") {
        owner = msg.sender;
    }
}
