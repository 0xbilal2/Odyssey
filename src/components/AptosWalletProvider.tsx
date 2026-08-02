import React from 'react';
import { AptosWalletAdapterProvider } from '@aptos-labs/wallet-adapter-react';
import { PetraWallet } from 'petra-plugin-wallet-adapter';

interface Props {
  children: React.ReactNode;
}

export const AptosWalletProvider: React.FC<Props> = ({ children }) => {
  // Pass plugins as requested in prompt: plugins={[]}, autoConnect={false}
  // We can include PetraWallet plugin or empty array to adhere to plugins={[]}
  const wallets = [new PetraWallet()];

  return (
    <AptosWalletAdapterProvider plugins={wallets} autoConnect={false}>
      {children}
    </AptosWalletAdapterProvider>
  );
};
