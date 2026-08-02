import React, { useState } from 'react';
import { useWallet } from '@aptos-labs/wallet-adapter-react';
import { Shield, Lock, Server, Cpu, ArrowRight, Wallet, CheckCircle2, FileText, Database, KeyRound } from 'lucide-react';

interface LandingPageProps {
  onOpenShelbyKeyModal: () => void;
}

export const LandingPage: React.FC<LandingPageProps> = ({ onOpenShelbyKeyModal }) => {
  const { connect } = useWallet();
  const [connecting, setConnecting] = useState(false);

  const handleConnectWallet = async () => {
    setConnecting(true);
    try {
      await connect("Petra");
    } catch (err: any) {
      console.error('Wallet connect error:', err);
      if (!window.aptos && !(window as any).petra) {
        if (confirm("Petra Wallet extension was not detected. Install Petra wallet from petra.app to continue?")) {
          window.open("https://petra.app/", "_blank");
        }
      }
    } finally {
      setConnecting(false);
    }
  };

  return (
    <div className="flex-1 flex flex-col justify-between py-12 px-4 md:px-8 max-w-7xl mx-auto w-full">
      
      {/* Hero Section */}
      <section className="flex flex-col items-center text-center my-auto py-12 space-y-8 max-w-4xl mx-auto">
        
        {/* Badge */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#636B2F]/20 border border-[#BAC095]/30 text-[#D4DE95] text-xs font-mono">
          <Shield className="w-3.5 h-3.5 text-[#D4DE95]" />
          <span>Decentralized & Client-Encrypted Notes on Aptos</span>
        </div>

        {/* Title */}
        <h1 className="font-display font-extrabold text-4xl sm:text-6xl text-[#D4DE95] tracking-tight leading-tight">
          Your thoughts, encrypted client-side. <br />
          <span className="text-[#BAC095]">Stored on Shelby Protocol.</span>
        </h1>

        {/* Subtitle / Tagline */}
        <p className="text-lg md:text-xl text-[#BAC095]/90 max-w-2xl leading-relaxed font-body">
          Odyssey is a Web3 sanctuary for your personal journal and notes. Encrypted with AES-GCM in your browser, signed via Aptos blockchain, and permanently stored on the Shelby decentralized network.
        </p>

        {/* Call to Action Button */}
        <div className="flex flex-col sm:flex-row items-center gap-4 pt-4">
          <button
            onClick={handleConnectWallet}
            disabled={connecting}
            className="glow-lime-hover flex items-center gap-3 bg-[#636B2F] hover:bg-[#636B2F]/90 text-[#D4DE95] font-bold text-lg px-8 py-4 rounded-2xl border border-[#D4DE95]/50 transition-all duration-300 transform hover:-translate-y-0.5 active:scale-95 disabled:opacity-50"
          >
            <Wallet className="w-5 h-5 text-[#D4DE95]" />
            <span>{connecting ? 'Triggering Petra Popup...' : 'Connect Petra Wallet to Launch'}</span>
            <ArrowRight className="w-5 h-5 ml-1 text-[#D4DE95]" />
          </button>
        </div>

        {/* Trust Badges */}
        <div className="flex flex-wrap items-center justify-center gap-6 pt-6 text-xs text-[#BAC095]/70 font-mono">
          <div className="flex items-center gap-1.5">
            <CheckCircle2 className="w-4 h-4 text-[#D4DE95]" />
            <span>Real Petra Wallet Extension</span>
          </div>
          <div className="flex items-center gap-1.5">
            <CheckCircle2 className="w-4 h-4 text-[#D4DE95]" />
            <span>Web Crypto AES-256-GCM</span>
          </div>
          <div className="flex items-center gap-1.5">
            <CheckCircle2 className="w-4 h-4 text-[#D4DE95]" />
            <span>Shelby Protocol SDK</span>
          </div>
        </div>
      </section>

      {/* Pillars / Feature Grid */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-6 my-12">
        
        {/* Pillar 1 */}
        <div className="bg-[#2A2D1A] border border-[#BAC095]/15 p-6 rounded-2xl flex flex-col gap-3 hover:border-[#D4DE95]/40 transition-all duration-300">
          <div className="w-10 h-10 rounded-xl bg-[#636B2F]/40 border border-[#BAC095]/30 flex items-center justify-center text-[#D4DE95]">
            <Lock className="w-5 h-5" />
          </div>
          <h3 className="font-display font-bold text-xl text-[#D4DE95]">Client-Side AES-GCM</h3>
          <p className="text-sm text-[#BAC095]/80 leading-relaxed font-body">
            Notes are encrypted locally in your browser using standard Web Crypto API before leaving your device. Nobody—not even Shelby node operators—can read unencrypted text without your key.
          </p>
        </div>

        {/* Pillar 2 */}
        <div className="bg-[#2A2D1A] border border-[#BAC095]/15 p-6 rounded-2xl flex flex-col gap-3 hover:border-[#D4DE95]/40 transition-all duration-300">
          <div className="w-10 h-10 rounded-xl bg-[#636B2F]/40 border border-[#BAC095]/30 flex items-center justify-center text-[#D4DE95]">
            <Cpu className="w-5 h-5" />
          </div>
          <h3 className="font-display font-bold text-xl text-[#D4DE95]">Aptos Signed Provenance</h3>
          <p className="text-sm text-[#BAC095]/80 leading-relaxed font-body">
            Every note creation or update invokes a real Aptos wallet transaction via Petra, anchoring cryptographic ownership and timestamp verification on-chain.
          </p>
        </div>

        {/* Pillar 3 */}
        <div className="bg-[#2A2D1A] border border-[#BAC095]/15 p-6 rounded-2xl flex flex-col gap-3 hover:border-[#D4DE95]/40 transition-all duration-300">
          <div className="w-10 h-10 rounded-xl bg-[#636B2F]/40 border border-[#BAC095]/30 flex items-center justify-center text-[#D4DE95]">
            <Database className="w-5 h-5" />
          </div>
          <h3 className="font-display font-bold text-xl text-[#D4DE95]">Shelby Decentralized Storage</h3>
          <p className="text-sm text-[#BAC095]/80 leading-relaxed font-body">
            Encrypted note payloads are saved to Shelby Protocol blobs, offering high availability, censorship resistance, and permanent decentralized data retention.
          </p>
        </div>

      </section>

      {/* Getting Started Guide */}
      <section className="bg-[#31341F] border border-[#BAC095]/20 rounded-2xl p-6 md:p-8 my-8 flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="space-y-2 text-left">
          <h4 className="font-display font-bold text-lg text-[#D4DE95] flex items-center gap-2">
            <KeyRound className="w-5 h-5 text-[#D4DE95]" />
            <span>Ready to start your Odyssey?</span>
          </h4>
          <p className="text-sm text-[#BAC095]/80 font-body max-w-xl">
            Click "Connect Wallet" to initiate the Aptos Petra wallet extension request. Once connected, your encrypted Notes Dashboard will instantly unlock.
          </p>
        </div>
        <button
          onClick={handleConnectWallet}
          className="glow-lime flex items-center gap-2 bg-[#636B2F] hover:bg-[#636B2F]/90 text-[#D4DE95] font-semibold text-sm px-6 py-3 rounded-xl border border-[#D4DE95]/40 whitespace-nowrap transition-all"
        >
          <Wallet className="w-4 h-4" />
          <span>Connect Petra</span>
        </button>
      </section>

    </div>
  );
};
