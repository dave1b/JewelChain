// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract JewelChain {
    Stone[] stones;
    // Mapping of address to name
    mapping(address => string) participants;

    struct Stone {
        uint256 stoneId;
        uint256 timestamp;
        string origin;
        string characteristic;
        address miner;
        address owner;
        SupplyChainStep[] supplyChainSteps;
    }

    struct SupplyChainStep {
        address responsibleParty;
        string actionLocation;
        string description;
        uint256 timestamp;
    }

    event NewStoneRegistered(address indexed owner, uint256 stoneId);

    function registerNewParticipant(string memory participantName) public {
        participants[msg.sender] = participantName;
    }

    function registerNewStone(
        string memory origin,
        string memory characteristic /*, string memory description*/
    ) public {
        uint256 newStoneId = stones.length;

        Stone storage stone = stones.push();

        stone.stoneId = newStoneId;
        stone.timestamp = block.timestamp;
        stone.origin = origin;
        stone.characteristic = characteristic;
        stone.miner = msg.sender;
        stone.owner = msg.sender;

        /*addStep(newStoneId, origin, description);*/
        emit NewStoneRegistered(msg.sender, newStoneId);
    }

    modifier ownerCheck(uint256 stoneId) {
        require(stones[stoneId].owner == msg.sender,
        "Kein OWNER: Sie muessen Eigentuemer des Steins sein, um diese Aktion auszufuehren");
        _;
    }

    function passOwnership(uint256 stoneId, address newOwner)
        public
        ownerCheck(stoneId)
    {
        stones[stoneId].owner = newOwner;
    }

    // überprüfen ob owner, nacher step eintragen
    function addStep(
        uint256 stoneId,
        string memory actionLocation,
        string memory description
    ) public ownerCheck(stoneId) {
        uint256 currentTimestamp = block.timestamp;
        address responsibleParty = msg.sender;
        stones[stoneId].supplyChainSteps.push(
            SupplyChainStep(
                responsibleParty,
                actionLocation,
                description,
                currentTimestamp
            )
        );
    }

    function stoneExists(uint256 stoneId) private view returns (bool) {
        for (uint i = 0; i < stones.length; i++) {
            if (stones[i].stoneId == stoneId) {
                return true;
            }
        }
        return false;
    }

    modifier checkExistingStoneID(uint256 stoneId) {
        require(stoneExists(stoneId),
        "Dieser Stein existiert nicht");
        _;
    }


    // für anzeigen von Informationen zu Stone
    function getStoneInformation(uint256 stoneId)
        public checkExistingStoneID(stoneId)
        view
        returns (Stone memory stone)
    {
        Stone memory _stone = stones[stoneId];
        return _stone;
    }

    // für anzeigen von Informationen zu Participant
    function getParticipanInformation(address participantAddress)
        public
        view
        returns (string memory participantName)
    {
        string memory _name = participants[participantAddress];
        return _name;
    }
}
