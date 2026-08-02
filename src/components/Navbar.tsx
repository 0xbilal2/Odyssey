import React, { useState } from 'react';
import { useWallet } from '@aptos-labs/wallet-adapter-react';
import { ShieldCheck, Wallet, LogOut, Copy, Check, Key, ExternalLink } from 'lucide-react';
import { getShelbyApiKey } from '../lib/shelby';

interface NavbarProps {
  onOpenShelbyKeyModal: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenShelbyKeyModal }) => {
  const { connected, account, connect, disconnect } = useWallet();
  const [copied, setCopied] = useState(false);
  const [isConnecting, setIsConnecting] = useState(false);

  const hasShelbyKey = Boolean(getShelbyApiKey());

  const handleConnect = async () => {
    setIsConnecting(true);
    try {
      await connect("Petra");
    } catch (err: any) {
      console.error('Wallet connection error:', err);
      // Fallback alert / guidance if Petra plugin isn't installed
      if (!window.aptos && !(window as any).petra) {
        if (confirm("Petra Wallet extension was not detected. Would you like to open petra.app to install it?")) {
          window.open("https://petra.app/", "_blank");
        }
      }
    } finally {
      setIsConnecting(false);
    }
  };

  const copyAddress = () => {
    if (account?.address) {
      navigator.clipboard.writeText(account.address.toString());
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const formattedAddress = account?.address
    ? `${account.address.toString().substring(0, 6)}...${account.address.toString().substring(account.address.toString().length - 4)}`
    : '';

  return (
    <header className="sticky top-0 z-40 bg-[#3D4127]/90 backdrop-blur-md border-b border-[#BAC095]/15 px-4 md:px-8 py-3.5 transition-all">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        
        {/* Logo & Brand */}
        <div className="flex items-center gap-3">
          <div className="relative w-9 h-9 rounded-xl bg-[#636B2F] border border-[#BAC095]/30 flex items-center justify-center shadow-sm">
            <svg className="w-5 h-5 text-[#D4DE95]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" strokeLinecap="round" />
              <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" strokeLinecap="round" />
              <polygon points="12 6 15 12 12 18 9 12" fill="#D4DE95" stroke="none" />
            </svg>
            <span className="absolute -top-1 -right-1 flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#D4DE95] opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#D4DE95]"></span>
            </span>
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-display font-bold text-xl text-[#D4DE95] tracking-tight">Odyssey</span>
              <span className="text-[10px] font-mono uppercase bg-[#636B2F]/40 text-[#D4DE95] px-2 py-0.5 rounded border border-[#BAC095]/20">
                Aptos & Shelby
              </span>
            </div>
          </div>
        </div>

        {/* Right Action Cluster */}
        <div className="flex items-center gap-3">
          
          {/* Shelby Key indicator */}
          <button
            onClick={onOpenShelbyKeyModal}
            className={`hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-lg border text-xs font-mono transition-all ${
              hasShelbyKey
                ? 'bg-[#636B2F]/20 border-[#D4DE95]/40 text-[#D4DE95] hover:bg-[#636B2F]/40'
                : 'bg-[#31341F] border-[#BAC095]/20 text-[#BAC095] hover:border-[#D4DE95]/50'
            }`}
            title="Configure Shelby Developer API Key"
          >
            <Key className="w-3.5 h-3.5" />
            <span>{hasShelbyKey ? 'Shelby Key: Set' : 'Shelby Key (Optional)'}</span>
          </button>

          {/* Wallet Button */}
          {connected ? (
            <div className="flex items-center gap-2 bg-[#31341F] border border-[#BAC095]/25 p-1 pl-3 rounded-xl">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#D4DE95] animate-pulse"></span>
                <span className="font-mono text-xs font-semibold text-[#D4DE95]">
                  {formattedAddress}
                </span>
              </div>
              
              <button
                onClick={copyAddress}
                title="Copy Address"
                className="p-1.5 hover:bg-[#636B2F]/40 text-[#BAC095] hover:text-[#D4DE95] rounded-lg transition-colors"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-[#D4DE95]" /> : <Copy className="w-3.5 h-3.5" />}
              </button>

              <button
                onClick={() => disconnect()}
                title="Disconnect Wallet"
                className="p-1.5 hover:bg-red-900/30 text-[#BAC095] hover:text-red-300 rounded-lg transition-colors ml-1"
              >
                <LogOut className="w-3.5 h-3.5" />
              </button>
            </div>
          ) : (
            <button
              onClick={handleConnect}
              disabled={isConnecting}
              className="glow-lime-hover relative flex items-center gap-2 bg-[#636B2F] hover:bg-[#636B2F]/90 text-[#D4DE95] font-semibold text-sm px-4 py-2 rounded-xl border border-[#D4DE95]/40 transition-all duration-300 transform active:scale-95 disabled:opacity-50"
            >
              <Wallet className="w-4 h-4 text-[#D4DE95]" />
              <span>{isConnecting ? 'Connecting Petra...' : 'Connect Wallet'}</span>
            </button>
          )}

        </div>
      </div>
    </header>
  );
};
