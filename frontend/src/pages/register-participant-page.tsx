import { Button } from 'primereact/button';
import React, { useState } from 'react';

import { registerNewParticipant } from '../api/mutations/register-new-participant';
import { useToasts } from '../hooks/use-toasts';
import { FormTextInput } from '../ui/form-text-input';

export const RegisterParticipantPage = () => {
  const [submitted, setSubmitted] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [name, setName] = useState<string>('');
  const { showToast } = useToasts();

  const resetForm = () => {
    setSubmitted(false);
    setName('');
  };

  const onNameChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    setName(e.target.value);
  };

  const onCreateClick = async () => {
    setSubmitted(true);
    
    if (!name || !name.trim()) return;

    try {
      setLoading(true)
      await registerNewParticipant(name);
      showToast({
        severity: 'success',
        summary: 'Registered the new participant.',
        detail: name,
      });
      setSubmitted(false);
      resetForm();
    } catch (error: any) {
      showToast({
        severity: 'error',
        summary: 'Failed to register the participant.',
        detail: String(error),
        sticky: true,
      });
    }
    setLoading(false)


  };

  return (
    <>
      <span className="block text-6xl font-bold mb-1">Participant registrieren</span>
      <p className="mt-0 mb-4 text-700 line-height-3">Hier können neue Participants erstellt werden.</p>
      <div className="p-fluid">
        <FormTextInput
          label="Name"
          onInputChange={onNameChange}
          hideValidationErrors={!submitted}
          required={true}
          id="name"
          value={name}
          inputTextProps={{ placeholder: 'Name des Participants' }}
        />
      </div>
      <Button
        label="Participant erstellen"
        icon="pi pi-user-plus"
        type="button"
        className="p-button-raised"
        loading={loading}
        disabled={loading}
        onClick={onCreateClick}
      />
    </>
  );
};
