import { Card, CardTemplateTypes } from 'primereact/card';
import { Timeline } from 'primereact/timeline';
import React from 'react';

import { StoneInformation } from '../api/queries/get-stone-information';
import { LabeledChip } from '../ui/labeled-chip';
import { formatDatetime } from '../utils/format-datetime';
import { useParticipantResolving } from './../hooks/use-participant-resolving';

interface StoneInformationProps {
  stone: StoneInformation;
  footer?: CardTemplateTypes;
}

export const StoneInformationDisplay = ({ stone, footer }: StoneInformationProps) => {
  const { characteristic, miner, origin, owner, stoneId, supplyChainSteps, timestamp } = stone;

  const minerName = useParticipantResolving(miner);
  const ownerName = useParticipantResolving(owner);

  const TimelineContent = (item: any) => {
    const responsiblePartyName = useParticipantResolving(item.responsibleParty);

    return `${responsiblePartyName} @${item.actionLocation}: ${item.description}`;
  };

  return (
    <Card title={stoneId} subTitle={`Am ${formatDatetime(timestamp)} in ${origin} entdeckt.`} footer={footer}>
      <div className="grid grid-nogutter">
        <div className="col-12 md:col-4">
          <LabeledChip
            className="mt-0 mb-2"
            label={characteristic}
            description="Charakteristiken"
            style={{ whiteSpace: 'pre-line' }}
          />
          <LabeledChip className="mb-2" label={ownerName} description="Besitzer" />
          <LabeledChip label={minerName} description="Miner" />
        </div>
        <div className="col-12 md:col-8">
          <Timeline
            value={supplyChainSteps}
            opposite={(item) => formatDatetime(item.timestamp)}
            content={TimelineContent}
          />
        </div>
      </div>
    </Card>
  );
};
