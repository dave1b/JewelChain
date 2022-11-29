const Web3 = require("web3");
export const ethEnabled = async () => {
    if (window.ethereum) {
        await window.ethereum.request({ method: 'eth_requestAccounts' });
        window.web3 = new Web3(window.ethereum); return true;
    } return false;
}

export async function getAccount() {
    const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
    const accountAddress = accounts[0];
    console.log(accountAddress)
}