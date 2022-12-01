import { useEffect, useState } from 'react';

import { useGetParticipantInformation } from '../api/queries/use-get-participant-information';
import { address } from '../api/type';
import { usePrevious } from './../utils/use-previous';
import { useToasts } from './use-toasts';

type ResolvedParticipant = {
  participantName: string;
  participantAddress: string;
};

// hook that returns participant names of participant addresses in a map with participant addresses as keys.
// while the call loads "Lade Name..." is returned for each address.
// if the call fails the participantAddress is returned for each address.
// if the call succeeds the participant name is returned for each address.
export const useParticipantsResolving = (participantAddresses: address[]): Record<address, ResolvedParticipant> => {
  const [loading, setLoading] = useState<boolean>(false);
  const [participants, setParticipants] = useState<ResolvedParticipant[]>([]);
  const { showToast } = useToasts();
  const getParticipantInformation = useGetParticipantInformation();

  const fetchParticipants = async () => {
    if (participantAddresses.length === 0) return;

    try {
      setLoading(true);

      const participants = await Promise.all(
        participantAddresses.map(async (participantAddress): Promise<ResolvedParticipant> => {
          // for each participant fetch its name
          const participant = await getParticipantInformation(participantAddress);
          return { ...participant, participantAddress };
        }),
      );
      setParticipants(participants);
    } catch (error: any) {
      showToast({
        severity: 'error',
        summary: 'Failed to get participants information.',
        detail: String(error),
        sticky: true,
      });
    }
    setLoading(false);
  };

  const prevAdresses = usePrevious(participantAddresses);

  // load a new participant's name when the address changes
  useEffect(() => {
    // check if adresses have changed
    if (JSON.stringify(prevAdresses) !== JSON.stringify(participantAddresses)) {
      if (participantAddresses.length > 0) fetchParticipants();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [participantAddresses.length]);

  return participants.reduce(
    (a, v) => ({ ...a, [v.participantAddress]: loading ? 'Lade Name...' : v.participantName || v.participantAddress }),
    {},
  );
};
