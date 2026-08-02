import React from 'react';
import { AptosWalletAdapterProvider } from '@aptos-labs/wallet-adapter-react';
import { PetraWallet } from 'petra-plugin-wallet-adapter';

interface Props {
  children: React.ReactNode;
}

const wallets = [new PetraWallet()];

export const AptosWalletProvider: React.FC<Props> = ({ children }) => {
  return (
    <AptosWalletAdapterProvider plugins={wallets} autoConnect={false}>
      {children}
    </AptosWalletAdapterProvider>
  );
};
