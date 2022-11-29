var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var Web3 = require("web3");
var web3 = new Web3("http://localhost:8545");
var smartContractAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3";
var userAddress = "0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266";
var userPrivateKey = "0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80";
var secondaryUserAdress = "0x3C44CdDdB6a900fa2b585dd299e03d12FA4293BC";
var ABI = [
    {
        anonymous: false,
        inputs: [
            {
                indexed: true,
                internalType: "address",
                name: "owner",
                type: "address"
            },
            {
                indexed: false,
                internalType: "uint256",
                name: "stoneId",
                type: "uint256"
            },
        ],
        name: "NewStoneRegistered",
        type: "event"
    },
    {
        inputs: [
            {
                internalType: "uint256",
                name: "stoneId",
                type: "uint256"
            },
            {
                internalType: "string",
                name: "actionLocation",
                type: "string"
            },
            {
                internalType: "string",
                name: "description",
                type: "string"
            },
        ],
        name: "addStep",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function"
    },
    {
        inputs: [
            {
                internalType: "address",
                name: "participantAddress",
                type: "address"
            },
        ],
        name: "getParticipanInformation",
        outputs: [
            {
                internalType: "string",
                name: "participantName",
                type: "string"
            },
        ],
        stateMutability: "view",
        type: "function"
    },
    {
        inputs: [
            {
                internalType: "uint256",
                name: "stoneId",
                type: "uint256"
            },
        ],
        name: "getStoneInformation",
        outputs: [
            {
                components: [
                    {
                        internalType: "uint256",
                        name: "stoneId",
                        type: "uint256"
                    },
                    {
                        internalType: "uint256",
                        name: "timestamp",
                        type: "uint256"
                    },
                    {
                        internalType: "string",
                        name: "origin",
                        type: "string"
                    },
                    {
                        internalType: "string",
                        name: "characteristic",
                        type: "string"
                    },
                    {
                        internalType: "address",
                        name: "miner",
                        type: "address"
                    },
                    {
                        internalType: "address",
                        name: "owner",
                        type: "address"
                    },
                    {
                        components: [
                            {
                                internalType: "address",
                                name: "responsibleParty",
                                type: "address"
                            },
                            {
                                internalType: "string",
                                name: "actionLocation",
                                type: "string"
                            },
                            {
                                internalType: "string",
                                name: "description",
                                type: "string"
                            },
                            {
                                internalType: "uint256",
                                name: "timestamp",
                                type: "uint256"
                            },
                        ],
                        internalType: "struct JewelChain.SupplyChainStep[]",
                        name: "supplyChainSteps",
                        type: "tuple[]"
                    },
                ],
                internalType: "struct JewelChain.Stone",
                name: "stone",
                type: "tuple"
            },
        ],
        stateMutability: "view",
        type: "function"
    },
    {
        inputs: [
            {
                internalType: "uint256",
                name: "stoneId",
                type: "uint256"
            },
            {
                internalType: "address",
                name: "newOwner",
                type: "address"
            },
        ],
        name: "passOwnership",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function"
    },
    {
        inputs: [
            {
                internalType: "string",
                name: "participantName",
                type: "string"
            },
        ],
        name: "registerNewParticipant",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function"
    },
    {
        inputs: [
            {
                internalType: "string",
                name: "origin",
                type: "string"
            },
            {
                internalType: "string",
                name: "characteristic",
                type: "string"
            },
        ],
        name: "registerNewStone",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function"
    },
];
var contract = new web3.eth.Contract(ABI, smartContractAddress);
function registerNewParticipant(participantName) {
    return contract.methods
        .registerNewParticipant(participantName)
        .send({ from: userAddress })
        .on("receipt", function (receipt) {
        return receipt;
    });
}
function registerNewStone(origin, characteristic) {
    return __awaiter(this, void 0, void 0, function () {
        var res;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, contract.methods
                        .registerNewStone(origin, characteristic)
                        .send({ from: userAddress })
                        .on("receipt", function (receipt) {
                        return receipt;
                    })];
                case 1:
                    res = _a.sent();
                    return [2 /*return*/, res.events.NewStoneRegistered.returnValues];
            }
        });
    });
}
function passOwnership(stoneId, newOwnerAdress) {
    return contract.methods
        .passOwnership(stoneId, newOwnerAdress)
        .send({ from: userAddress })
        .on("receipt", function (receipt) {
        return receipt;
    });
}
function addStep(stoneId, actionLocation, description) {
    return contract.methods
        .addStep(stoneId, actionLocation, description)
        .send({ from: userAddress })
        .on("receipt", function (receipt) {
        return receipt;
    });
}
function getStoneInformation(stoneId) {
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
function getParticipanInformation(participantAddress) {
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
function main() {
    return __awaiter(this, void 0, void 0, function () {
        var stone;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    registerNewParticipant("HSLU").then(function (res) {
                        // console.log(res);
                    });
                    return [4 /*yield*/, registerNewStone("Sempach", "blau").then(function (res) {
                            stone = res;
                            console.log(stone);
                            console.log(stone.owner);
                            console.log(stone.stoneId);
                        })];
                case 1:
                    _a.sent();
                    addStep(stone.stoneId, "zurich", "verkauft");
                    return [4 /*yield*/, passOwnership(stone.stoneId, secondaryUserAdress).then(function (res) {
                            console.log(res);
                        })];
                case 2:
                    _a.sent();
                    return [4 /*yield*/, getStoneInformation(stone.stoneId).then(function (res) {
                            console.log(res);
                        })];
                case 3:
                    _a.sent();
                    return [4 /*yield*/, getParticipanInformation(userAddress).then(function (res) {
                            console.log(res);
                        })];
                case 4:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    });
}
main();
