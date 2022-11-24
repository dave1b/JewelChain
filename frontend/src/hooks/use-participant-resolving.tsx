import React, { useEffect, useState } from 'react';

import { getParticipantInformation, ParticipantInformation } from '../api/queries/get-participant-information';
import { address } from '../api/type';
import { useToasts } from './use-toasts';

const DEFAULT_PARTICIPANT: ParticipantInformation = {
  participantName: '',
};

// hook that returns a participant name of a participant address by calling getParticipantInformation.
// while the call loads "Lade Name..." is returned.
// if the call fails the participantAddress is returned.
// if the call succeeds the participant name is returned.
export const useParticipantResolving = (participantAddress: address): string => {
  const [loading, setLoading] = useState<boolean>(false);
  const [{ participantName }, setParticipant] = useState<ParticipantInformation>(DEFAULT_PARTICIPANT);
  const { showToast } = useToasts();

  const updateParticipant = async () => {
    if (!participantAddress) return;

    try {
      setLoading(true);
      const participant = await getParticipantInformation(participantAddress);
      setParticipant(participant);
    } catch (error: any) {
      showToast({
        severity: 'error',
        summary: 'Failed to get participant information.',
        detail: String(error),
        sticky: true,
      });
    }
    setLoading(false);
  };

  // load a new participant's name when the address changes
  useEffect(() => {
    setParticipant(DEFAULT_PARTICIPANT);
    if (participantAddress) updateParticipant();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [participantAddress]);

  return loading ? 'Lade Name...' : participantName || participantAddress;
};
