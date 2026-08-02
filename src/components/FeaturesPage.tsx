import React from 'react';
import { Shield, Lock, Cpu, Database, CheckCircle, ArrowRight, Server, Key, Zap } from 'lucide-react';
import { ActiveNavView } from '../types';

interface FeaturesPageProps {
  onNavigate: (page: ActiveNavView) => void;
}

export const FeaturesPage: React.FC<FeaturesPageProps> = ({ onNavigate }) => {
  const featureList = [
    {
      title: 'Client-Side AES-256-GCM Encryption',
      desc: 'All note payloads are encrypted inside your browser memory using Web Crypto API before touching any server or storage blob.',
      icon: Lock,
      badge: 'Zero-Knowledge',
    },
    {
      title: 'Shelby Network Blob Storage',
      desc: 'Decentralized, immutable storage engine built for high-throughput web3 applications. Your encrypted ciphertexts are stored immutably across nodes.',
      icon: Database,
      badge: 'Decentralized',
    },
    {
      title: 'Aptos Blockchain Anchoring',
      desc: 'Note creation timestamps and cryptographic state hashes are signed and committed to the Aptos blockchain for verifiable proof of authorship.',
      icon: Cpu,
      badge: 'Aptos Engine',
    },
    {
      title: 'PBKDF2 Key Derivation',
      desc: 'Passphrases are salted with 100,000 iterations to withstand brute-force attacks. Only key holders can compute the decryption matrix.',
      icon: Key,
      badge: 'Hardened Security',
    },
    {
      title: 'Instant Multi-Device Sync',
      desc: 'Access your encrypted journal from any device by simply connecting your Petra Aptos wallet. Your keys remain strictly on client.',
      icon: Zap,
      badge: 'Seamless Sync',
    },
    {
      title: 'Custom Passphrase & Wallet Sig Mode',
      desc: 'Choose to lock notes with your wallet signature or create custom passphrases for specific sensitive entries.',
      icon: Shield,
      badge: 'Dual Lock',
    },
  ];

  return (
    <div className="flex-1 max-w-6xl mx-auto w-full px-4 md:px-8 py-12 space-y-12">
      
      {/* Header section */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#636B2F]/40 border border-[#D4DE95]/30 text-xs font-mono text-[#D4DE95]">
          <Shield className="w-3.5 h-3.5" />
          <span>Odyssey Architecture Overview</span>
        </div>

        <h1 className="font-display font-black text-4xl md:text-5xl text-[#D4DE95] tracking-tight">
          Built for Absolute Privacy & Permanent Storage
        </h1>

        <p className="text-base text-[#BAC095]/80 font-body leading-relaxed">
          Odyssey combines Web Crypto AES-256-GCM encryption with Shelby Network blob storage and Aptos smart contract verification.
        </p>
      </div>

      {/* Feature Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {featureList.map((item, idx) => {
          const Icon = item.icon;
          return (
            <div
              key={idx}
              className="bg-[#2A2E19] border border-[#484D30] rounded-2xl p-6 space-y-4 hover:border-[#D4DE95]/50 transition-all duration-300 shadow-xl"
            >
              <div className="flex items-center justify-between">
                <div className="w-10 h-10 rounded-xl bg-[#636B2F]/40 border border-[#BAC095]/30 flex items-center justify-center text-[#D4DE95]">
                  <Icon className="w-5 h-5" />
                </div>
                <span className="text-[10px] font-mono uppercase bg-[#1C2010] text-[#D4DE95] px-2.5 py-1 rounded-md border border-[#484D30]">
                  {item.badge}
                </span>
              </div>

              <h3 className="font-display font-bold text-lg text-[#D4DE95]">
                {item.title}
              </h3>

              <p className="text-sm text-[#BAC095]/80 font-body leading-relaxed">
                {item.desc}
              </p>
            </div>
          );
        })}
      </div>

      {/* Action CTA */}
      <div className="bg-[#2A2E19] border border-[#D4DE95]/40 rounded-2xl p-8 text-center space-y-4 shadow-2xl">
        <h2 className="font-display font-bold text-2xl text-[#D4DE95]">
          Ready to experience true private journaling?
        </h2>
        <p className="text-sm text-[#BAC095]/80 max-w-xl mx-auto">
          Connect your Aptos wallet to encrypt your first note on the Shelby Network.
        </p>
        <button
          onClick={() => onNavigate('editor')}
          className="glow-lime inline-flex items-center gap-2 bg-[#8B9646] hover:bg-[#8B9646]/90 text-[#1C2010] font-bold text-sm px-6 py-3 rounded-xl border border-[#D4DE95]/50 transition-all"
        >
          <span>Open Note Editor</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>

    </div>
  );
};
