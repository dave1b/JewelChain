import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog';
import React, { useState } from 'react';

import { addStep } from '../api/mutations/add-step';
import { useToasts } from '../hooks/use-toasts';
import { FormTextInput } from '../ui/form-text-input';

interface AddStepDialogProps {
  stoneId: number;
  visible: boolean;
  onHide: () => void;
  onAddedStep: () => void;
}

const DEFAULT_STEP = {
  actionLocation: '',
  description: '',
};

export const AddStepDialog = ({ stoneId, visible, onHide, onAddedStep }: AddStepDialogProps) => {
  const [submitted, setSubmitted] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [{ actionLocation, description }, setInputs] = useState<{ actionLocation: string; description: string }>(
    DEFAULT_STEP,
  );
  const { showToast } = useToasts();

  const isFormValid = actionLocation && actionLocation.trim() && description && description.trim();

  const resetForm = () => {
    setSubmitted(false);
    setInputs(DEFAULT_STEP);
  };

  const onValueChange: React.ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement> = (e) => {
    setInputs((stone) => ({ ...stone, [e.target.name]: e.target.value }));
  };

  const onAddClick = async () => {
    setSubmitted(true);

    if (!isFormValid) return;

    try {
      setLoading(true);
      await addStep(stoneId, actionLocation, description);
      showToast({
        severity: 'success',
        summary: 'Added new step.',
        detail: `${actionLocation}, ${description}`,
      });
      setSubmitted(false);
      resetForm();
      onAddedStep();
      onHide();
    } catch (error: any) {
      showToast({
        severity: 'error',
        summary: 'Failed to add new step.',
        detail: String(error),
        sticky: true,
      });
    }
    setLoading(false);
  };

  const footer = (
    <div>
      <Button label="Abbrechen" className="p-button-text" icon="pi pi-times" onClick={onHide} disabled={loading} />
      <Button label="Schritt hinzufügen" icon="pi pi-check" onClick={onAddClick} disabled={loading} loading={loading} />
    </div>
  );

  return (
    <Dialog
      header="Verarbeitungsschritt hinzufügen"
      footer={footer}
      visible={visible}
      onHide={onHide}
      breakpoints={{ '960px': '800px', '640px': '100vw' }}
      style={{ width: 750 }}
    >
      <div className="p-fluid">
        <FormTextInput
          label="Ort der Ausführung"
          onInputChange={onValueChange}
          hideValidationErrors={!submitted}
          required={true}
          id="actionLocation"
          value={actionLocation}
          inputTextProps={{ placeholder: 'Wo wurde dieser Verarbeitungsschritt ausgeführt?' }}
        />
        <FormTextInput
          label="Beschreibung"
          onInputChange={onValueChange}
          hideValidationErrors={!submitted}
          required={true}
          id="description"
          value={description}
          inputTextProps={{ placeholder: 'Kurze Beschreibung des Verarbeitungsschrittes' }}
        />
      </div>
    </Dialog>
  );
};
