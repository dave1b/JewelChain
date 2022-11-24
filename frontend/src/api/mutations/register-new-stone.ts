export type NewRegisteredStone = {};

export const registerNewStone = async (origin: string, characteristic: string): Promise<NewRegisteredStone> => {
  console.log('registering new stone', { origin, characteristic });
  // throw new Error("Failed.")
  return {};
};
