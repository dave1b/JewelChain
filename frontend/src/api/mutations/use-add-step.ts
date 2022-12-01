import { useAuth } from './../../hooks/use-auth';

export type AddedStep = {};
type AddStep = (stoneId: number, actionLocation: string, description: string) => Promise<AddedStep>;

export const useAddStep = (): AddStep => {
  const { contract, accountAddress } = useAuth();

  const addStep = (stoneId: number, actionLocation: string, description: string): Promise<AddedStep> =>
    new Promise<AddedStep>((resolve, reject) => {
      console.log('adding step', { stoneId, actionLocation, description });

      try {
        contract.methods
          .addStep(stoneId, actionLocation, description)
          .send({ from: accountAddress })
          .on('receipt', function (receipt: any) {
            console.log('added step', { receipt });
            resolve(receipt);
          });
      } catch (error) {
        reject(error);
      }
    });

  return addStep;
};
