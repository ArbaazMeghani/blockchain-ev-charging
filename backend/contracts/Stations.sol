//SPDX-License-Identifier: MIT
pragma solidity >=0.7.0 <0.9.0;

import "hardhat/console.sol";
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Burnable.sol";

contract Stations is ERC721, ERC721Burnable {
    address public owner;

    struct Station {
        uint256 id;
        string title;
        string stationAddress;
        uint256 longitude;
        uint256 latitude;
        uint256 price;
        uint256 chargeRate;
    }

    mapping(uint256 => uint256) chargeEndTime;
    mapping(uint256 => Station) stations;
    mapping(uint256 => uint256) earnings;

    event StationCreated(uint256 stationId);
    event StationDeleted(uint256 stationId);
    event StationUpdated(uint256 stationId);
    event StationInUse(uint256 stationId, uint256 endTime);

    constructor()
        public
        ERC721("Electric Vehicle Charging Stations", "STATION")
    {
        owner = msg.sender;
    }

    modifier stationOwner(uint256 _stationId) {
        require(msg.sender == ownerOf(_stationId));
        _;
    }

    function createStation(Station memory _station) external {}

    function deleteStation(uint256 _stationId)
        external
        stationOwner(_stationId)
    {}

    function editStation(Station memory _station)
        external
        stationOwner(_station.id)
    {}

    function chargeAtStation(uint256 _stationId) external payable {}

    function withdrawEarningsFromStation(uint256 _stationId)
        external
        stationOwner(_stationId)
    {}
}
