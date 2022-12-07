import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog';
import { Message, MessageProps } from 'primereact/message';
import React, { useEffect, useState } from 'react';
// @ts-ignore no typings provided
import QrReader from 'react-qr-scanner';

import { useToasts } from '../hooks/use-toasts';

interface JewelCodeQRInputDialogProps {
  onCodeSubmitted: (code: number) => void;
  visible: boolean;
  onHide: () => void;
}

export const JewelCodeQRInputDialog = ({ onCodeSubmitted, visible, onHide }: JewelCodeQRInputDialogProps) => {
  const { showToast } = useToasts();
  const [message, setMessage] = useState<MessageProps>();

  const footer = <Button label="Abbrechen" className="p-button-text" icon="pi pi-times" onClick={onHide} />;

  useEffect(() => {
    // reset message when modal is hiding
    if (!visible) setMessage(undefined);
  }, [visible]);

  const handleScan = (data: any) => {
    if (data !== null) {
      const indexOfIdentifier = data.text.indexOf('-JEWELCHAIN-JEWELCODE');
      if (indexOfIdentifier === -1) {
        // QR-Code isn't a Jewel-Code
        setMessage({
          severity: 'error',
          text: 'Dieser QR-Code besitzt keinen Jewel-Code.',
        });
      } else {
        const stoneId = data.text.substring(0, indexOfIdentifier);
        onCodeSubmitted(stoneId);
        onHide();
      }
    }
  };

  const handleError = (err: any) => {
    showToast({
      severity: 'error',
      summary: 'Something went wrong.',
      detail: String(err),
      sticky: true,
    });
  };

  const previewStyle = {
    height: '100%',
    width: '100%',
  };

  return (
    <Dialog header="Jewel-Code einscannen" footer={footer} visible={visible} onHide={onHide} style={{ width: 500 }}>
      <div className="p-fluid">
        {message ? (
          <>
            <Message {...message} />
            <Button
              label="Erneut scannen"
              type="button"
              className="p-button-outlined mt-4"
              onClick={() => setMessage(undefined)}
            />
          </>
        ) : (
          <QrReader
            className="mt-4 border-round"
            delay={100}
            style={previewStyle}
            onError={handleError}
            onScan={handleScan}
          />
        )}
      </div>
    </Dialog>
  );
};
