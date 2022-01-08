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
        int256 longitude;
        int256 latitude;
        uint256 price;
        uint256 chargeRate;
        address owner;
    }
    uint256 nextStationId = 1;

    mapping(uint256 => uint256) chargeEndTime;
    mapping(uint256 => Station) stations;
    mapping(uint256 => uint256) earnings;

    uint256[] stationIds;
    mapping(uint256 => uint256) stationIdToIndex;

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
        require(
            _isApprovedOrOwner(_msgSender(), _stationId),
            "Caller is not owner nor approved"
        );
        _;
    }

    function createStation(Station memory _station) external {
        uint256 stationId = nextStationId;
        stationIds.push(stationId);
        stationIdToIndex[stationId] = stationIds.length - 1;

        _station.id = stationId;
        _station.owner = msg.sender;

        stations[stationId] = _station;

        nextStationId++;
        _safeMint(msg.sender, stationId);
        emit StationCreated(stationId);
    }

    function deleteStation(uint256 _stationId) internal {
        delete stations[_stationId];
        uint256 stationIdIndex = stationIdToIndex[_stationId];
        stationIds[stationIdIndex] = stationIds[stationIds.length - 1];
        stationIdToIndex[stationIds[stationIds.length - 1]] = stationIdIndex;
        stationIds.pop();
        delete stationIdToIndex[_stationId];
        emit StationDeleted(_stationId);
    }

    function editStation(Station memory _station)
        external
        stationOwner(_station.id)
    {
        stations[_station.id] = _station;
        emit StationUpdated(_station.id);
    }

    function chargeAtStation(uint256 _stationId) external payable {
        uint256 endTime = (msg.value / stations[_stationId].price) *
            stations[_stationId].chargeRate +
            block.timestamp;

        chargeEndTime[_stationId] = endTime;
        earnings[_stationId] += msg.value;
        emit StationInUse(_stationId, endTime);
    }

    function withdrawEarningsFromStation(uint256 _stationId)
        external
        stationOwner(_stationId)
    {
        payable(msg.sender).transfer(earnings[_stationId]);
        earnings[_stationId] = 0;
    }

    function burn(uint256 tokenId) public override stationOwner(tokenId) {
        deleteStation(tokenId);
        _burn(tokenId);
    }

    function getAllStations() public view returns (Station[] memory) {
        Station[] memory result = new Station[](stationIds.length);
        for (uint256 i = 0; i < stationIds.length; i++) {
            result[i] = stations[stationIds[i]];
        }
        return result;
    }

    function _beforeTokenTransfer(
        address from,
        address to,
        uint256 tokenId
    ) internal override {
        stations[tokenId].owner = to;
    }
}
