const Web3 = require("web3");

const web3 = new Web3("http://localhost:8545");
const smartContractAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3";
const userAddress = "0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266";
const userPrivateKey =
  "0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80";
const secondaryUserAdress = "0x3C44CdDdB6a900fa2b585dd299e03d12FA4293BC";
const ABI = [
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "owner",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "stoneId",
        type: "uint256",
      },
    ],
    name: "NewStoneRegistered",
    type: "event",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "stoneId",
        type: "uint256",
      },
      {
        internalType: "string",
        name: "actionLocation",
        type: "string",
      },
      {
        internalType: "string",
        name: "description",
        type: "string",
      },
    ],
    name: "addStep",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "participantAddress",
        type: "address",
      },
    ],
    name: "getParticipanInformation",
    outputs: [
      {
        internalType: "string",
        name: "participantName",
        type: "string",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "stoneId",
        type: "uint256",
      },
    ],
    name: "getStoneInformation",
    outputs: [
      {
        components: [
          {
            internalType: "uint256",
            name: "stoneId",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "timestamp",
            type: "uint256",
          },
          {
            internalType: "string",
            name: "origin",
            type: "string",
          },
          {
            internalType: "string",
            name: "characteristic",
            type: "string",
          },
          {
            internalType: "address",
            name: "miner",
            type: "address",
          },
          {
            internalType: "address",
            name: "owner",
            type: "address",
          },
          {
            components: [
              {
                internalType: "address",
                name: "responsibleParty",
                type: "address",
              },
              {
                internalType: "string",
                name: "actionLocation",
                type: "string",
              },
              {
                internalType: "string",
                name: "description",
                type: "string",
              },
              {
                internalType: "uint256",
                name: "timestamp",
                type: "uint256",
              },
            ],
            internalType: "struct JewelChain.SupplyChainStep[]",
            name: "supplyChainSteps",
            type: "tuple[]",
          },
        ],
        internalType: "struct JewelChain.Stone",
        name: "stone",
        type: "tuple",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "stoneId",
        type: "uint256",
      },
      {
        internalType: "address",
        name: "newOwner",
        type: "address",
      },
    ],
    name: "passOwnership",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "string",
        name: "participantName",
        type: "string",
      },
    ],
    name: "registerNewParticipant",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "string",
        name: "origin",
        type: "string",
      },
      {
        internalType: "string",
        name: "characteristic",
        type: "string",
      },
    ],
    name: "registerNewStone",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
];

const contract = new web3.eth.Contract(ABI, smartContractAddress);

function registerNewParticipant(participantName: string) {
  return contract.methods
    .registerNewParticipant(participantName)
    .send({ from: userAddress })
    .on("receipt", function (receipt) {
      return receipt;
    });
}

async function registerNewStone(origin: string, characteristic: string) {
  var res = await contract.methods
    .registerNewStone(origin, characteristic)
    .send({ from: userAddress })
    .on("receipt", function (receipt) {
      return receipt;
    });
  return res.events.NewStoneRegistered.returnValues;
}

function passOwnership(stoneId: number, newOwnerAdress: string) {
  return contract.methods
    .passOwnership(stoneId, newOwnerAdress)
    .send({ from: userAddress })
    .on("receipt", function (receipt) {
      return receipt;
    });
}

function addStep(stoneId: number, actionLocation: string, description: string) {
  return contract.methods
    .addStep(stoneId, actionLocation, description)
    .send({ from: userAddress })
    .on("receipt", function (receipt) {
      return receipt;
    });
}
function getStoneInformation(stoneId: number) {
  return contract.methods
    .getStoneInformation(stoneId)
    .call(function (err, res) {
      if (err) {
        console.log("An error occured", err);
        return;
      }
      return res;
    });
}
function getParticipanInformation(participantAddress: string) {
  return contract.methods
    .getParticipanInformation(participantAddress)
    .call(function (err, res) {
      if (err) {
        console.log("An error occured", err);
        return;
      }
      return res;
    });
}

async function main() {
  registerNewParticipant("HSLU").then((res) => {
    // console.log(res);
  });
  var stone;
  await registerNewStone("Sempach", "blau").then((res) => {
    stone = res;
    console.log(stone);
    console.log(stone.owner);
    console.log(stone.stoneId);
  });
  addStep(stone.stoneId, "zurich", "verkauft");
  await passOwnership(stone.stoneId, secondaryUserAdress).then((res) => {
    console.log(res);
  });
  await getStoneInformation(stone.stoneId).then((res) => {
    console.log(res);
  });
  await getParticipanInformation(userAddress).then((res) => {
    console.log(res);
  });
}
main();
