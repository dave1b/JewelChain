import { Button } from 'primereact/button';
import React, { useEffect, useState } from 'react';

import { useRegisterNewParticipant } from '../api/mutations/use-register-new-participant';
import { NeedsAuthContainer } from '../components/needs-auth-container';
import { useParticipantResolving } from '../hooks/use-participant-resolving';
import { useToasts } from '../hooks/use-toasts';
import { FormTextInput } from '../ui/form-text-input';
import { useAuth } from './../hooks/use-auth';

export const RegisterParticipantPage = () => {
  const [submitted, setSubmitted] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [name, setName] = useState<string>('');
  const { accountAddress } = useAuth();
  const { showToast } = useToasts();
  const registerNewParticipant = useRegisterNewParticipant();
  const { currentParticipantName, fetchedOnce } = useParticipantResolving(accountAddress || '');

  useEffect(() => {
    // use the existing name as the initial input value
    setName(currentParticipantName);
  }, [currentParticipantName]);

  const onNameChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    setName(e.target.value);
  };

  const onCreateClick = async () => {
    setSubmitted(true);

    if (!name || !name.trim()) return;

    try {
      setLoading(true);
      await registerNewParticipant(name);
      showToast({
        severity: 'success',
        summary: 'Updated profile.',
        detail: name,
      });
      setSubmitted(false);
    } catch (error: any) {
      showToast({
        severity: 'error',
        summary: 'Failed to update profile.',
        detail: String(error),
        sticky: true,
      });
    }
    setLoading(false);
  };

  return (
    <>
      <span className="block text-6xl font-bold mb-1">Profil</span>
      <p className="mt-0 mb-4 text-700 line-height-3">Hier kannst du dein Profil bearbeiten.</p>
      <NeedsAuthContainer>
        <>
          {!fetchedOnce ? (
            'Lade Profil...'
          ) : (
            <>
              <div className="p-fluid">
                <FormTextInput
                  label="Name"
                  onInputChange={onNameChange}
                  hideValidationErrors={!submitted}
                  required={true}
                  id="name"
                  value={name}
                  inputTextProps={{ placeholder: 'Name deiner Einrichtung' }}
                />
              </div>
              <Button
                label="Profil aktualisieren"
                icon="pi pi-check"
                type="button"
                className="p-button-raised"
                loading={loading}
                disabled={loading}
                onClick={onCreateClick}
              />
            </>
          )}
        </>
      </NeedsAuthContainer>
    </>
  );
};
