import { useAuth } from '../../hooks/use-auth';
import { address } from '../type';

export type NewRegisteredStone = {
  owner: address;
  stoneId: number;
};

type RegisterNewStone = (origin: string, characteristic: string) => Promise<NewRegisteredStone>;

export const useRegisterNewStone = (): RegisterNewStone => {
  const { contract, accountAddress } = useAuth();

  const registerNewStone = (origin: string, characteristic: string): Promise<NewRegisteredStone> =>
    new Promise<NewRegisteredStone>(async (resolve, reject) => {
      console.log('registering new stone', { origin, characteristic });

      try {
        var res = await contract.methods
          .registerNewStone(origin, characteristic)
          .send({ from: accountAddress })
          .on('receipt', function (receipt: any) {
            return receipt;
          })
          .on('error', (error: any) => {
            reject(error);
          });
        const newStone = res.events.NewStoneRegistered.returnValues;
        resolve(newStone);
      } catch (error) {
        reject(error);
      }
    });

  return registerNewStone;
};
