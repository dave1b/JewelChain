import React, { createContext, ReactNode, useContext, useState } from 'react';

import { address } from '../api/type';
import { ABI } from '../utils/contract';
import { ethEnabled, getAccount } from '../utils/meta';
import { useToasts } from './use-toasts';

const Web3 = require('web3');

// @ts-ignore
const AuthContext = createContext<{
  accountAddress: address | null;
  login: () => Promise<void>;
  logout: () => Promise<void>;
  authProcessActive: boolean;
  contract: any;
}>();

export const useAuth = () => {
  return useContext(AuthContext);
};

interface AuthProviderProps {
  children: ReactNode;
}

// create eth contract (once because AuthProvider gets mounted once)
const web3 = new Web3('http://localhost:8545');
const smartContractAddress = '0x5FbDB2315678afecb367f032d93F642f64180aa3';
const contract = new web3.eth.Contract(ABI, smartContractAddress);

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [accountAddress, setAccountAddress] = useState<address | null>(null);
  const [authProcessActive, setAuthProcessActive] = useState(false);
  const { showToast } = useToasts();

  const login = async () => {
    setAuthProcessActive(true);

    const metamaskEnabled = ethEnabled();
    if (!metamaskEnabled) {
      // show error if metamask is not enabled
      showToast({
        severity: 'error',
        summary: 'Anmeldung fehlgeschlagen',
        detail: (
          <span>
            <b>
              <a href="https://metamask.io/download/" target="_blank" rel="noreferrer">
                MetaMask
              </a>
            </b>{' '}
            wird zur Anmeldung benötigt.
          </span>
        ),
        sticky: true,
      });
    } else {
      try {
        const accountAddress = await getAccount();
        setAccountAddress(accountAddress);
      } catch (error: any) {
        // show error if metamask login failed
        showToast({
          severity: 'error',
          summary: 'Anmeldung fehlgeschlagen.',
          detail: `Code ${error?.code}: ${error?.message}`,
          sticky: true,
        });
      }
    }

    setAuthProcessActive(false);
  };

  const logout = async () => {};

  return (
    <AuthContext.Provider
      value={{
        accountAddress,
        login,
        logout,
        authProcessActive,
        contract
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
