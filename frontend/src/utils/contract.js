export let contract = {
    "address": "0x5FbDB2315678afecb367f032d93F642f64180aa3",
    "abi": [
        {
            "anonymous": false,
            "inputs": [
                {
                    "indexed": true,
                    "internalType": "address",
                    "name": "owner",
                    "type": "address"
                },
                {
                    "indexed": false,
                    "internalType": "uint256",
                    "name": "stoneId",
                    "type": "uint256"
                }
            ],
            "name": "NewStoneRegistered",
            "type": "event"
        },
        {
            "inputs": [
                {
                    "internalType": "uint256",
                    "name": "stoneId",
                    "type": "uint256"
                },
                {
                    "internalType": "string",
                    "name": "actionLocation",
                    "type": "string"
                },
                {
                    "internalType": "string",
                    "name": "description",
                    "type": "string"
                }
            ],
            "name": "addStep",
            "outputs": [],
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "address",
                    "name": "participantAddress",
                    "type": "address"
                }
            ],
            "name": "getParticipanInformation",
            "outputs": [
                {
                    "internalType": "string",
                    "name": "participantName",
                    "type": "string"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "uint256",
                    "name": "stoneId",
                    "type": "uint256"
                }
            ],
            "name": "getStoneInformation",
            "outputs": [
                {
                    "components": [
                        {
                            "internalType": "uint256",
                            "name": "stoneId",
                            "type": "uint256"
                        },
                        {
                            "internalType": "uint256",
                            "name": "timestamp",
                            "type": "uint256"
                        },
                        {
                            "internalType": "string",
                            "name": "origin",
                            "type": "string"
                        },
                        {
                            "internalType": "string",
                            "name": "characteristic",
                            "type": "string"
                        },
                        {
                            "internalType": "address",
                            "name": "miner",
                            "type": "address"
                        },
                        {
                            "internalType": "address",
                            "name": "owner",
                            "type": "address"
                        },
                        {
                            "components": [
                                {
                                    "internalType": "address",
                                    "name": "responsibleParty",
                                    "type": "address"
                                },
                                {
                                    "internalType": "string",
                                    "name": "actionLocation",
                                    "type": "string"
                                },
                                {
                                    "internalType": "string",
                                    "name": "description",
                                    "type": "string"
                                },
                                {
                                    "internalType": "uint256",
                                    "name": "timestamp",
                                    "type": "uint256"
                                }
                            ],
                            "internalType": "struct JewelChain.SupplyChainStep[]",
                            "name": "supplyChainSteps",
                            "type": "tuple[]"
                        }
                    ],
                    "internalType": "struct JewelChain.Stone",
                    "name": "stone",
                    "type": "tuple"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "uint256",
                    "name": "stoneId",
                    "type": "uint256"
                },
                {
                    "internalType": "address",
                    "name": "newOwner",
                    "type": "address"
                }
            ],
            "name": "passOwnership",
            "outputs": [],
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "string",
                    "name": "participantName",
                    "type": "string"
                }
            ],
            "name": "registerNewParticipant",
            "outputs": [],
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "string",
                    "name": "origin",
                    "type": "string"
                },
                {
                    "internalType": "string",
                    "name": "characteristic",
                    "type": "string"
                }
            ],
            "name": "registerNewStone",
            "outputs": [],
            "stateMutability": "nonpayable",
            "type": "function"
        }
    ]
}