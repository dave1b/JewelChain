import { Tooltip } from 'primereact/tooltip';
import React from 'react';

interface InfoTooltipProps {
  id: string;
  text: string;
  verticalAlign?: string;
  className?: string;
}

export const InfoTooltip = ({ id, text, verticalAlign, className }: InfoTooltipProps) => {
  return (
    <>
      <Tooltip target={`#${id}`} style={{ maxWidth: 425 }} autoHide={false} />
      <i className={'pi pi-info-circle ' + className} id={id} data-pr-tooltip={text} style={{ verticalAlign }}></i>
    </>
  );
};
