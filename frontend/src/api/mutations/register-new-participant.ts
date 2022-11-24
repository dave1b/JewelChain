export type NewRegisteredParticipant = {};

export const registerNewParticipant = async (participantName: string): Promise<NewRegisteredParticipant> => {
  console.log('creating new participant', { participantName });
  // throw new Error("Failed.")
  return {};
};
