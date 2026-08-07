import React, { useState } from 'react';
import { useWallet } from '@aptos-labs/wallet-adapter-react';
import { ShieldCheck, Wallet, LogOut, Copy, Check, Key, FileText, LayoutGrid } from 'lucide-react';
import { getShelbyApiKey } from '../lib/shelby';
import { ActiveNavView } from '../types';

interface NavbarProps {
  onOpenShelbyKeyModal: () => void;
  activeNav?: ActiveNavView;
  onNavigate?: (nav: ActiveNavView) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenShelbyKeyModal, activeNav, onNavigate }) => {
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
    <header className="sticky top-0 z-40 bg-[#3D4127]/95 backdrop-blur-md border-b border-[#BAC095]/15 px-4 md:px-8 py-3 transition-all">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
        
        {/* Logo & Brand */}
        <button 
          onClick={() => onNavigate?.(connected ? 'all' : 'all')} 
          className="flex items-center gap-3 text-left group hover:opacity-95 transition-opacity cursor-pointer"
        >
          <div>
            <div className="flex items-center gap-2">
              <span className="font-display font-bold text-xl text-[#D4DE95] tracking-tight">Odyssey</span>
              <span className="hidden sm:inline-block text-[10px] font-mono uppercase bg-[#636B2F]/40 text-[#D4DE95] px-2 py-0.5 rounded border border-[#BAC095]/20">
                Aptos & Shelby
              </span>
            </div>
          </div>
        </button>

        {/* Center Navigation Links (Matching Image 2) */}
        <nav className="hidden md:flex items-center gap-6 text-sm font-medium">
          {connected && (
            <button
              onClick={() => onNavigate?.('all')}
              className={`flex items-center gap-1.5 transition-colors ${
                activeNav === 'all' || activeNav === 'recent' || activeNav === 'favorites'
                  ? 'text-[#D4DE95] font-semibold border-b-2 border-[#D4DE95] pb-0.5'
                  : 'text-[#BAC095]/80 hover:text-[#D4DE95]'
              }`}
            >
              <LayoutGrid className="w-4 h-4" />
              <span>Notes Dashboard</span>
            </button>
          )}

          {connected && (
            <button
              onClick={() => onNavigate?.('editor')}
              className={`flex items-center gap-1.5 transition-colors ${
                activeNav === 'editor'
                  ? 'text-[#D4DE95] font-semibold border-b-2 border-[#D4DE95] pb-0.5'
                  : 'text-[#BAC095]/80 hover:text-[#D4DE95]'
              }`}
            >
              <FileText className="w-4 h-4" />
              <span>New Note Editor</span>
            </button>
          )}

          <button
            onClick={() => onNavigate?.('features')}
            className={`transition-colors ${
              activeNav === 'features' ? 'text-[#D4DE95] font-semibold border-b-2 border-[#D4DE95] pb-0.5' : 'text-[#BAC095]/80 hover:text-[#D4DE95]'
            }`}
          >
            Features
          </button>

          <button
            onClick={() => onNavigate?.('security')}
            className={`transition-colors ${
              activeNav === 'security' ? 'text-[#D4DE95] font-semibold border-b-2 border-[#D4DE95] pb-0.5' : 'text-[#BAC095]/80 hover:text-[#D4DE95]'
            }`}
          >
            Security
          </button>

          <button
            onClick={() => onNavigate?.('pricing')}
            className={`transition-colors ${
              activeNav === 'pricing' ? 'text-[#D4DE95] font-semibold border-b-2 border-[#D4DE95] pb-0.5' : 'text-[#BAC095]/80 hover:text-[#D4DE95]'
            }`}
          >
            Pricing
          </button>
        </nav>

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
            <Key className="w-3.5 h-3.5 text-[#D4DE95]" />
            <span>{hasShelbyKey ? 'Shelby Key: Active' : 'Shelby Key'}</span>
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
              className="glow-lime-hover relative flex items-center gap-2 bg-[#636B2F] hover:bg-[#636B2F]/90 text-[#D4DE95] font-semibold text-sm px-4 py-2 rounded-xl border border-[#D4DE95]/40 transition-all duration-300 transform active:scale-95 disabled:opacity-50 shadow-md"
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
