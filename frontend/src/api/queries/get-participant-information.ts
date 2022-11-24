import { address } from '../type';

export type ParticipantInformation = {
  participantName: string;
};

export const getParticipantInformation = async (participantAddress: address): Promise<ParticipantInformation> => {
  console.log('getting participant information', { participantAddress });
  // throw new Error("Failed.")
  return { participantName: 'Verarbeiter 1' };
};
