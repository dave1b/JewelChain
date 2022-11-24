import { address } from '../type';

export type PassedOwnership = {};

export const passOwnership = async (stoneId: number, newOwnerAdress: address): Promise<PassedOwnership> => {
  console.log('passing ownership', { stoneId, newOwnerAdress });
  // throw new Error("Failed.")
  return {};
};
