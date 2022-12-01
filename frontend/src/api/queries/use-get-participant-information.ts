import { address } from '../type';
import { useAuth } from './../../hooks/use-auth';

export type ParticipantInformation = {
  participantName: string;
};

type GetParticipantInformation = (participantAddress: address) => Promise<ParticipantInformation>;

export const useGetParticipantInformation = (): GetParticipantInformation => {
  const { contract } = useAuth();

  const getParticipantInformation = (participantAddress: address): Promise<ParticipantInformation> =>
    new Promise<ParticipantInformation>((resolve, reject) => {
      console.log('getting participant information', { participantAddress });

      try {
        contract.methods.getParticipanInformation(participantAddress).call(function (err: any, res: any) {
          if (err) {
            console.log('An error occured', err);
            reject(err);
          }
          console.log('got participant information', { res });
          resolve({ participantName: res });
        });
      } catch (error) {
        reject(error);
      }
    });

  return getParticipantInformation;
};
