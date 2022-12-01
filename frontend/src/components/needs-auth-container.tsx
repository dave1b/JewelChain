import { Button } from 'primereact/button';
import React from 'react';

import { useAuth } from './../hooks/use-auth';

export const NeedsAuthContainer = ({ children }: { children: JSX.Element }) => {
  const { accountAddress, login, authProcessActive } = useAuth();

  return !!accountAddress ? (
    children
  ) : (
    <div>
      <h3>Anmeldung erforderlich</h3>
      <Button
        label="Anmelden"
        type="button"
        className="p-button-outlined"
        onClick={login}
        disabled={authProcessActive}
        loading={authProcessActive}
      />
    </div>
  );
};
