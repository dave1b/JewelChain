const Web3 = require("web3");

const web3 = new Web3("http://localhost:8545");
const smartContractAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3";
const userAddress = '0xdF3e18d64BC6A983f673Ab319CCaE4f1a57C7097';
const userPrivateKey = "0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80";

var ABI = [
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


const contract = new web3.eth.Contract(ABI, smartContractAddress);

// contract.methods
//     .registerNewParticipant("apple")
//     .send({ from: userAddress })
//     .on('receipt', function (receipt) {
//         // receipt example
//         console.log(receipt);
//     })


contract.methods.getParticipanInformation(userAddress).call()
    .then(function (result) {
        console.log(result)
    });


// contract.methods
//     .registerNewStone("sempach", "blau")
//     .send({ from: userAddress, gas: 500000 })
//     .on('receipt', function (receipt) {
//         console.log(receipt);
//     }
//     )

