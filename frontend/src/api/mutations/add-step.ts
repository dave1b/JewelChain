export type AddedStep = {};

export const addStep = async (stoneId: number, actionLocation: string, description: string): Promise<AddedStep> => {
  console.log('adding step', { stoneId, actionLocation, description });
  // throw new Error("Failed.")
  return {};
};
