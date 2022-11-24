import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog';
import React, { useState } from 'react';

import { passOwnership } from '../api/mutations/pass-ownership';
import { useParticipantResolving } from '../hooks/use-participant-resolving';
import { useToasts } from '../hooks/use-toasts';
import { FormTextInput } from '../ui/form-text-input';

interface AddStepDialogProps {
  stoneId: number;
  visible: boolean;
  onHide: () => void;
  onPassedOwnership: () => void;
}

const DEFAULT_STEP = {
  newOwnerAdress: undefined,
};

export const PassOwnershipDialog = ({ stoneId, visible, onHide, onPassedOwnership }: AddStepDialogProps) => {
  const [submitted, setSubmitted] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [{ newOwnerAdress }, setInputs] = useState<{ newOwnerAdress?: string }>(DEFAULT_STEP);
  const { showToast } = useToasts();

  const newOwnerName = useParticipantResolving(newOwnerAdress || '');

  const isFormValid = newOwnerAdress && newOwnerAdress.trim();

  const resetForm = () => {
    setSubmitted(false);
    setInputs(DEFAULT_STEP);
  };

  const onValueChange: React.ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement> = (e) => {
    setInputs((inputs) => ({ ...inputs, [e.target.name]: e.target.value }));
  };

  const onAddClick = async () => {
    setSubmitted(true);

    if (!isFormValid) return;

    try {
      setLoading(true);
      await passOwnership(stoneId, newOwnerAdress);
      showToast({
        severity: 'success',
        summary: 'Besitz weitergegeben.',
        detail: `${stoneId}, ${newOwnerName}`,
        sticky: true,
      });
      setSubmitted(false);
      resetForm();
      onPassedOwnership();
      onHide();
    } catch (error: any) {
      showToast({
        severity: 'error',
        summary: 'Failed to pass ownership.',
        detail: String(error),
        sticky: true,
      });
    }
    setLoading(false);
  };

  const footer = (
    <div>
      <Button label="Abbrechen" className="p-button-text" icon="pi pi-times" onClick={onHide} disabled={loading} />
      <Button label="Besitzer ändern" icon="pi pi-check" onClick={onAddClick} disabled={loading} loading={loading} />
    </div>
  );

  return (
    <Dialog
      header="Besitzer ändern"
      footer={footer}
      visible={visible}
      onHide={onHide}
      breakpoints={{ '960px': '800px', '640px': '100vw' }}
      style={{ width: 750 }}
    >
      <div className="p-fluid">
        <FormTextInput
          label="Adresse des neuen Besitzers"
          onInputChange={onValueChange}
          hideValidationErrors={!submitted}
          required={true}
          id="newOwnerAdress"
          value={newOwnerAdress}
          inputTextProps={{ placeholder: 'Welche Adresse soll der neue Besitzer des Edelsteins sein?' }}
        />
      </div>
    </Dialog>
  );
};
