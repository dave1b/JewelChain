import { useAuth } from '../../hooks/use-auth';
import { address } from '../type';

export type SupplyChainStep = {
  responsibleParty: address;
  actionLocation: string;
  description: string;
  timestamp: number;
};

export type StoneInformation = {
  stoneId: number;
  timestamp: number;
  origin: string;
  characteristic: string;
  miner: address;
  owner: address;
  supplyChainSteps: SupplyChainStep[];
};

type GetStoneInformation = (stoneId: number) => Promise<StoneInformation>;

export const useGetStoneInformation = (): GetStoneInformation => {
  const { contract } = useAuth();

  const getStoneInformation = (stoneId: number): Promise<StoneInformation> =>
    new Promise<StoneInformation>((resolve, reject) => {
      console.log('getting stone information', { stoneId });

      try {
        contract.methods.getStoneInformation(stoneId).call(function (err: any, res: any) {
          if (err) {
            console.log('An error occured', err);
            reject(err);
          }
          console.log('got stone information', { res });
          resolve(res);
        });
      } catch (error) {
        reject(error);
      }
    });

  return getStoneInformation;
};
