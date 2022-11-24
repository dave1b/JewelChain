import { Button } from 'primereact/button';
import React, { useState } from 'react';

import { JewelCodeTextInputDialog } from './jewel-code-text-input-dialog';

interface JewelCodeInputProps {
  onChange: (stoneId: number) => void;
}

export const JewelCodeInput = ({ onChange }: JewelCodeInputProps) => {
  const [jewelCodeTextInputDialogVisible, setJewelCodeTextInputDialogVisible] = useState<boolean>(false);

  const onHideJewelCodeTextDialog = () => setJewelCodeTextInputDialogVisible(false);
  const onShowJewelCodeTextDialog = () => setJewelCodeTextInputDialogVisible(true);

  return (
    <>
      <JewelCodeTextInputDialog
        onHide={onHideJewelCodeTextDialog}
        visible={jewelCodeTextInputDialogVisible}
        onCodeSubmitted={onChange}
      />
      <Button label="Zertifikat scannen" icon="pi pi-qrcode" type="button" className="mr-3 p-button-raised" />
      <Button
        label="Jewel-Code von Hand eingeben"
        type="button"
        className="p-button-text"
        onClick={onShowJewelCodeTextDialog}
      />
    </>
  );
};
