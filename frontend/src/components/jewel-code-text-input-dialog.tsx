import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog';
import { InputNumberValueChangeParams } from 'primereact/inputnumber';
import React, { useState } from 'react';

import { FormNumberInput } from '../ui/form-number-input';

interface JewelCodeTextInputDialogProps {
  onCodeSubmitted: (code: number) => void;
  visible: boolean;
  onHide: () => void;
}

export const JewelCodeTextInputDialog = ({ onCodeSubmitted, visible, onHide }: JewelCodeTextInputDialogProps) => {
  const [submitted, setSubmitted] = useState<boolean>(false);
  const [code, setCode] = useState<number | null>();

  const isFormValid = !!code || code === 0;

  const resetForm = () => {
    setSubmitted(false);
    setCode(undefined);
  };

  const onCodeChange = (e: InputNumberValueChangeParams) => setCode(e.value);

  const onSubmit = async () => {
    setSubmitted(true);

    if (!isFormValid) return;

    setSubmitted(false);
    onCodeSubmitted(code);
    resetForm();
    onHide();
  };

  const footer = (
    <div>
      <Button label="Abbrechen" className="p-button-text" icon="pi pi-times" onClick={onHide} />
      <Button label="OK" icon="pi pi-check" onClick={onSubmit} />
    </div>
  );

  return (
    <Dialog
      header="Jewel-Code von Hand eingeben"
      footer={footer}
      visible={visible}
      onHide={onHide}
      breakpoints={{ '960px': '800px', '640px': '100vw' }}
      style={{ width: 750 }}
    >
      <div className="p-fluid">
        <FormNumberInput
          label="Jewel-Code"
          onInputChange={onCodeChange}
          hideValidationErrors={!submitted}
          required={true}
          id="code"
          value={code || undefined}
          inputNumberProps={{
            placeholder: 'Nummer',
          }}
        />
      </div>
    </Dialog>
  );
};
