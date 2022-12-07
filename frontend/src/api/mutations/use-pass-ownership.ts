import { address } from '../type';
import { useAuth } from './../../hooks/use-auth';

export type PassedOwnership = {};

type PassOwnership = (stoneId: number, newOwnerAdress: address) => Promise<PassedOwnership>;

export const usePassOwnership = (): PassOwnership => {
  const { contract, accountAddress } = useAuth();

  const passOwnership = (stoneId: number, newOwnerAdress: address): Promise<PassedOwnership> =>
    new Promise<PassedOwnership>((resolve, reject) => {
      console.log('passing ownership', { stoneId, newOwnerAdress });

      try {
        contract.methods
          .passOwnership(stoneId, newOwnerAdress)
          .send({ from: accountAddress })
          .on('receipt', function (receipt: any) {
            console.log('passed ownership', { receipt });
            resolve(receipt);
          })
          .on('error', (error: any) => {
            reject(error);
          });
      } catch (error) {
        reject(error);
      }
    });

  return passOwnership;
};
