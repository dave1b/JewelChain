import { Button } from 'primereact/button';
import React, { useState } from 'react';

import { useRegisterNewStone } from '../api/mutations/use-register-new-stone';
import { useToasts } from '../hooks/use-toasts';
import { FormTextInput } from '../ui/form-text-input';
import { FormTextareaInput } from '../ui/form-textarea-input';
import { NeedsAuthContainer } from './../components/needs-auth-container';
import { createCertificate } from './../utils/create-certificate';

const DEFAULT_STONE = {
  origin: '',
  characteristic: '',
};

export const NewStonePage = () => {
  const [submitted, setSubmitted] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [{ origin, characteristic }, setInput] = useState<{ origin: string; characteristic: string }>(DEFAULT_STONE);
  const { showToast } = useToasts();
  const registerNewStone = useRegisterNewStone();

  const isFormValid = origin && origin.trim() && characteristic && characteristic.trim();

  const resetForm = () => {
    setSubmitted(false);
    setInput(DEFAULT_STONE);
  };

  const onValueChange: React.ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement> = (e) => {
    setInput((stone) => ({ ...stone, [e.target.name]: e.target.value }));
  };

  const onCreateClick = async () => {
    setSubmitted(true);

    if (!isFormValid) return;

    try {
      setLoading(true);
      const newStone = await registerNewStone(origin, characteristic);
      showToast({
        severity: 'success',
        summary: 'Registered the new stone.',
        detail: `Jewel-ID: ${newStone.stoneId}`,
      });
      await createCertificate(newStone);
      setSubmitted(false);
      resetForm();
    } catch (error: any) {
      showToast({
        severity: 'error',
        summary: 'Failed to register the stone.',
        detail: String(error),
        sticky: true,
      });
    }
    setLoading(false);
  };

  return (
    <>
      <span className="block text-6xl font-bold mb-1">Edelstein registrieren</span>
      <p className="mt-0 mb-4 text-700 line-height-3">
        Hier können neue Edelsteine in die JewelChain aufgenommen werden.
      </p>
      {/* canvas used to create QR-Code */}
      <canvas id="qr_code" style={{ display: 'none' }}></canvas>
      <NeedsAuthContainer>
        <>
          <div className="p-fluid">
            <FormTextInput
              label="Herkunft"
              onInputChange={onValueChange}
              hideValidationErrors={!submitted}
              required={true}
              id="origin"
              value={origin}
              inputTextProps={{ placeholder: 'Herkunft des Edelsteins' }}
            />
            <FormTextareaInput
              label="Charakteristik"
              onInputChange={onValueChange}
              hideValidationErrors={!submitted}
              required={true}
              id="characteristic"
              value={characteristic}
              inputTextProps={{ autoResize: true, placeholder: 'Charakteristiken des Edelsteins' }}
            />
          </div>
          <Button
            label="Edelstein aufnehmen"
            icon="pi pi-user-plus"
            type="button"
            className="p-button-raised"
            loading={loading}
            disabled={loading}
            onClick={onCreateClick}
          />
        </>
      </NeedsAuthContainer>
    </>
  );
};
