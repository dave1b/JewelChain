export const ethEnabled = () => !!window.ethereum;

export async function getAccount() {
  const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
  const accountAddress = accounts[0];
  console.log('Received account address', accountAddress);
  return accountAddress;
}
