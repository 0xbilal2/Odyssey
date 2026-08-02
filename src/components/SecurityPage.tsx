import React from 'react';
import { ShieldCheck, Lock, Key, Server, FileCode, CheckCircle2 } from 'lucide-react';

export const SecurityPage: React.FC = () => {
  return (
    <div className="flex-1 max-w-5xl mx-auto w-full px-4 md:px-8 py-12 space-y-12">
      
      {/* Header */}
      <div className="space-y-4 text-center">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#636B2F]/40 border border-[#D4DE95]/30 text-xs font-mono text-[#D4DE95]">
          <ShieldCheck className="w-4 h-4 text-[#D4DE95]" />
          <span>Security & Cryptography Specification</span>
        </div>

        <h1 className="font-display font-black text-4xl text-[#D4DE95] tracking-tight">
          Zero-Knowledge Architecture & Encryption Guarantees
        </h1>

        <p className="text-sm text-[#BAC095]/80 max-w-2xl mx-auto leading-relaxed">
          Odyssey guarantees that raw unencrypted note contents never exist on any server, node, or relay network.
        </p>
      </div>

      {/* Crypto Spec Cards */}
      <div className="space-y-6">
        
        <div className="bg-[#2A2E19] border border-[#484D30] rounded-2xl p-6 md:p-8 space-y-4 shadow-xl">
          <div className="flex items-center gap-3">
            <Lock className="w-6 h-6 text-[#D4DE95]" />
            <h2 className="font-display font-bold text-xl text-[#D4DE95]">
              1. AES-256-GCM Encryption Matrix
            </h2>
          </div>
          <p className="text-sm text-[#BAC095]/80 leading-relaxed font-body">
            Every note title and body is converted to UTF-8 raw bytes and encrypted with standard Web Crypto API <code className="font-mono bg-[#1C2010] px-2 py-0.5 rounded text-[#D4DE95]">AES-GCM</code>. A fresh 96-bit Initialization Vector (IV) is cryptographically generated for every save operation to prevent replay attacks.
          </p>
        </div>

        <div className="bg-[#2A2E19] border border-[#484D30] rounded-2xl p-6 md:p-8 space-y-4 shadow-xl">
          <div className="flex items-center gap-3">
            <Key className="w-6 h-6 text-[#D4DE95]" />
            <h2 className="font-display font-bold text-xl text-[#D4DE95]">
              2. PBKDF2 Key Derivation (100,000 Rounds)
            </h2>
          </div>
          <p className="text-sm text-[#BAC095]/80 leading-relaxed font-body">
            Encryption keys are derived from your Aptos wallet signature or custom passphrase using <code className="font-mono bg-[#1C2010] px-2 py-0.5 rounded text-[#D4DE95]">PBKDF2</code> with HMAC-SHA-256. 100,000 iterations ensure GPU and ASIC resistance against off-line brute force attempts.
          </p>
        </div>

        <div className="bg-[#2A2E19] border border-[#484D30] rounded-2xl p-6 md:p-8 space-y-4 shadow-xl">
          <div className="flex items-center gap-3">
            <Server className="w-6 h-6 text-[#D4DE95]" />
            <h2 className="font-display font-bold text-xl text-[#D4DE95]">
              3. Shelby Protocol Immutable Blob Storage
            </h2>
          </div>
          <p className="text-sm text-[#BAC095]/80 leading-relaxed font-body">
            Encrypted ciphertexts are committed directly to Shelby storage blobs. Shelby provides decentralized replication, high availability, and verifiable content addressing for web3 data.
          </p>
        </div>

      </div>

      {/* Verification Checklist */}
      <div className="bg-[#1C2010] border border-[#484D30] rounded-2xl p-6 md:p-8 space-y-4">
        <h3 className="font-display font-bold text-lg text-[#D4DE95]">
          Client Verification Summary
        </h3>
        <ul className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs font-mono text-[#BAC095]/90">
          <li className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-[#8B9646]" />
            <span>Zero plaintext stored in localStorage</span>
          </li>
          <li className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-[#8B9646]" />
            <span>Client-side Web Crypto API implementation</span>
          </li>
          <li className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-[#8B9646]" />
            <span>Signed Aptos transaction hash anchoring</span>
          </li>
          <li className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-[#8B9646]" />
            <span>100% open-source client codebase</span>
          </li>
        </ul>
      </div>

    </div>
  );
};
