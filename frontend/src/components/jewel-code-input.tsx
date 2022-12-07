import { Button } from 'primereact/button';
import React, { useState } from 'react';

import { JewelCodeQRInputDialog } from './jewel-code-qr-input-dialog';
import { JewelCodeTextInputDialog } from './jewel-code-text-input-dialog';

interface JewelCodeInputProps {
  onChange: (stoneId: number) => void;
}

export const JewelCodeInput = ({ onChange }: JewelCodeInputProps) => {
  const [jewelCodeTextInputDialogVisible, setJewelCodeTextInputDialogVisible] = useState<boolean>(false);
  const [jewelCodeQRInputDialogVisible, setJewelCodeQRInputDialogVisible] = useState<boolean>(false);

  const onHideJewelCodeTextDialog = () => setJewelCodeTextInputDialogVisible(false);
  const onShowJewelCodeTextDialog = () => setJewelCodeTextInputDialogVisible(true);
  const onHideJewelCodeQRDialog = () => setJewelCodeQRInputDialogVisible(false);
  const onShowJewelCodeQRDialog = () => setJewelCodeQRInputDialogVisible(true);

  return (
    <>
      <JewelCodeTextInputDialog
        onHide={onHideJewelCodeTextDialog}
        visible={jewelCodeTextInputDialogVisible}
        onCodeSubmitted={onChange}
      />
      <JewelCodeQRInputDialog
        onHide={onHideJewelCodeQRDialog}
        visible={jewelCodeQRInputDialogVisible}
        onCodeSubmitted={onChange}
      />
      <Button
        label="Zertifikat scannen"
        icon="pi pi-qrcode"
        type="button"
        className="mr-3 p-button-raised"
        onClick={onShowJewelCodeQRDialog}
      />
      <Button
        label="Jewel-Code von Hand eingeben"
        type="button"
        className="p-button-text"
        onClick={onShowJewelCodeTextDialog}
      />
    </>
  );
};
