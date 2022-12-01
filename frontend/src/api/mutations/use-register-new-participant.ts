import { useAuth } from '../../hooks/use-auth';

export type NewRegisteredParticipant = {};

type RegisterNewParticipant = (participantName: string) => Promise<NewRegisteredParticipant>;

export const useRegisterNewParticipant = (): RegisterNewParticipant => {
  const { contract, accountAddress } = useAuth();

  const registerNewParticipant = (participantName: string): Promise<NewRegisteredParticipant> =>
    new Promise<NewRegisteredParticipant>((resolve, reject) => {
      console.log('creating new participant', { participantName });

      try {
        contract.methods
          .registerNewParticipant(participantName)
          .send({ from: accountAddress })
          .on('receipt', function (receipt: any) {
            console.log('created new participant', { receipt });
            resolve(receipt);
          });
      } catch (error) {
        reject(error);
      }
    });

  return registerNewParticipant;
};
