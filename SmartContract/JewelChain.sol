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
        int64 timestamp;
    }


    event NewStoneRegistered(address indexed owner, uint256 stoneId);

    function registerNewParticipant(string memory participantName) public {
        participants[msg.sender] = participantName;
    }
     function registerNewStone(string memory origin ,string memory characteristic ) public {
        uint256 newStoneId = stones.length;
        SupplyChainStep[] memory supplyChainStep;
        Stone memory stone = Stone({
            stoneId: newStoneId,
            timestamp: block.timestamp,
            origin: origin,
            characteristic: characteristic,
            miner: msg.sender,
            owner: msg.sender,
            supplyChainSteps: supplyChainStep
        });
        stones.push(stone);
        emit NewStoneRegistered(msg.sender, newStoneId);
    }

    function passOwnership(uint256 stoneId, address newOwner) public  {
        if(stones[stoneId].owner == msg.sender){
            stones[stoneId].owner = newOwner;
        }
    }

    // überprüfen ob owner, nacher step eintragen
    function addStep() public {}


    // für anzeigen von Informationen zu Stone
    function getStoneInformation() public view returns (Stone memory stone) {}
    
    // für anzeigen von Informationen zu Participant
    function getParticipanInformation() public view returns (string memory participantName) {}

}