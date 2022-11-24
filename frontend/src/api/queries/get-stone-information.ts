import { address } from '../type';

export type StoneInformation = {
  stoneId: number;
  timestamp: number;
  origin: string;
  characteristic: string;
  miner: address;
  owner: address;
  supplyChainSteps: {
    responsibleParty: address;
    actionLocation: string;
    description: string;
    timestamp: number;
  }[];
};

export const getStoneInformation = async (stoneId: number): Promise<StoneInformation> => {
  console.log('getting stone information', { stoneId });
  // throw new Error("Failed.")
  return {
    stoneId,
    timestamp: 1669237746,
    origin: 'Australien',
    characteristic: 'Blau\nHochkarat\nViele Ecken',
    miner: '0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266',
    owner: '0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266',
    supplyChainSteps: [
      {
        responsibleParty: '0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266',
        actionLocation: 'Bern',
        description: 'Feinschliff',
        timestamp: 1669217746,
      },
      {
        responsibleParty: '0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266',
        actionLocation: 'Bern',
        description: 'Feinschliff',
        timestamp: 1669217746,
      },
      {
        responsibleParty: '0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266',
        actionLocation: 'Bern',
        description: 'Feinschliff',
        timestamp: 1669217746,
      },
      {
        responsibleParty: '0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266',
        actionLocation: 'Bern',
        description: 'Feinschliff',
        timestamp: 1669217746,
      },
    ],
  };
};
