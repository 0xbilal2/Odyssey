import React from 'react';
import { Check, Sparkles, Key, ArrowRight } from 'lucide-react';
import { ActiveNavView } from '../types';

interface PricingPageProps {
  onNavigate: (page: ActiveNavView) => void;
  onOpenShelbyKeyModal: () => void;
}

export const PricingPage: React.FC<PricingPageProps> = ({ onNavigate, onOpenShelbyKeyModal }) => {
  return (
    <div className="flex-1 max-w-5xl mx-auto w-full px-4 md:px-8 py-12 space-y-12">
      
      {/* Header */}
      <div className="text-center space-y-4">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#636B2F]/40 border border-[#D4DE95]/30 text-xs font-mono text-[#D4DE95]">
          <Sparkles className="w-3.5 h-3.5 text-[#D4DE95]" />
          <span>Odyssey Storage Plans</span>
        </div>

        <h1 className="font-display font-black text-4xl text-[#D4DE95] tracking-tight">
          Transparent, Web3-Native Storage Pricing
        </h1>

        <p className="text-sm text-[#BAC095]/80 max-w-xl mx-auto leading-relaxed">
          Decentralized note encryption powered by Aptos and Shelby. No subscription lock-in.
        </p>
      </div>

      {/* Pricing Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch">
        
        {/* Free Plan */}
        <div className="bg-[#2A2E19] border border-[#484D30] rounded-2xl p-8 space-y-6 flex flex-col justify-between shadow-xl">
          <div className="space-y-4">
            <span className="text-xs font-mono uppercase bg-[#1C2010] text-[#D4DE95] px-3 py-1 rounded-md border border-[#484D30]">
              Standard Free Tier
            </span>

            <div className="space-y-1">
              <div className="flex items-baseline gap-1">
                <span className="font-display font-extrabold text-4xl text-[#D4DE95]">$0</span>
                <span className="text-xs text-[#BAC095]/70 font-mono">/ forever</span>
              </div>
              <p className="text-xs text-[#BAC095]/70 font-body">
                Ideal for personal journaling and encrypted note keeping on Shelby testnet.
              </p>
            </div>

            <ul className="space-y-3 pt-4 border-t border-[#484D30]/60 text-xs font-mono text-[#D4DE95]">
              <li className="flex items-center gap-2.5">
                <Check className="w-4 h-4 text-[#8B9646]" />
                <span>Unlimited Local & Client AES Encryption</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Check className="w-4 h-4 text-[#8B9646]" />
                <span>Shelby Network Testnet Storage</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Check className="w-4 h-4 text-[#8B9646]" />
                <span>Petra Aptos Wallet Signatures</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Check className="w-4 h-4 text-[#8B9646]" />
                <span>Tags, Folders & Favorites</span>
              </li>
            </ul>
          </div>

          <button
            onClick={() => onNavigate('editor')}
            className="w-full py-3 px-4 bg-[#3D4127] hover:bg-[#636B2F] text-[#D4DE95] font-bold text-xs font-mono rounded-xl border border-[#BAC095]/20 transition-all text-center"
          >
            Start Writing Free
          </button>
        </div>

        {/* Pro Developer Plan */}
        <div className="bg-[#2A2E19] border-2 border-[#8B9646] rounded-2xl p-8 space-y-6 flex flex-col justify-between shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 bg-[#8B9646] text-[#1C2010] text-[10px] font-mono font-bold px-3 py-1 rounded-bl-xl uppercase">
            Developer / Pro
          </div>

          <div className="space-y-4">
            <span className="text-xs font-mono uppercase bg-[#1C2010] text-[#D4DE95] px-3 py-1 rounded-md border border-[#484D30]">
              Shelby API Key Mode
            </span>

            <div className="space-y-1">
              <div className="flex items-baseline gap-1">
                <span className="font-display font-extrabold text-4xl text-[#D4DE95]">Custom</span>
                <span className="text-xs text-[#BAC095]/70 font-mono">/ BYO API Key</span>
              </div>
              <p className="text-xs text-[#BAC095]/70 font-body">
                Use your custom Shelby Developer API key for high-rate limit storage.
              </p>
            </div>

            <ul className="space-y-3 pt-4 border-t border-[#484D30]/60 text-xs font-mono text-[#D4DE95]">
              <li className="flex items-center gap-2.5">
                <Check className="w-4 h-4 text-[#8B9646]" />
                <span>Custom Shelby API Key Endpoint</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Check className="w-4 h-4 text-[#8B9646]" />
                <span>Dedicated RPC Blob Gateway</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Check className="w-4 h-4 text-[#8B9646]" />
                <span>Priority Aptos Blockchain Anchoring</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Check className="w-4 h-4 text-[#8B9646]" />
                <span>Unlimited High-Volume Blob Commits</span>
              </li>
            </ul>
          </div>

          <button
            onClick={onOpenShelbyKeyModal}
            className="glow-lime w-full py-3 px-4 bg-[#8B9646] hover:bg-[#8B9646]/90 text-[#1C2010] font-bold text-xs font-mono rounded-xl border border-[#D4DE95]/50 transition-all text-center flex items-center justify-center gap-2"
          >
            <Key className="w-4 h-4 text-[#1C2010]" />
            <span>Configure Shelby Key</span>
          </button>
        </div>

      </div>

    </div>
  );
};
