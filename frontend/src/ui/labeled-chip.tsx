import { Chip, ChipProps } from 'primereact/chip';
import React from 'react';

/**
 * A PrimeReact Chip with a description above of it.
 */
export const LabeledChip = (props: ChipProps & { description: string }) => {
  const { description } = props;

  return (
    <div>
      <div className="pb-1">
        <span className="text-color-secondary text-sm">{description}</span>
      </div>
      <div>
        <Chip {...props} />
      </div>
    </div>
  );
};
