import React, { useState, useEffect } from 'react';
import { Key, X, Check, Trash2, ExternalLink, Info } from 'lucide-react';
import { getShelbyApiKey, setShelbyApiKey, clearShelbyApiKey } from '../lib/shelby';

interface ShelbyKeyModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ShelbyKeyModal: React.FC<ShelbyKeyModalProps> = ({ isOpen, onClose }) => {
  const [apiKey, setApiKeyInput] = useState('');
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setApiKeyInput(getShelbyApiKey() || '');
      setSaved(false);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleSave = () => {
    if (apiKey.trim()) {
      setShelbyApiKey(apiKey.trim());
    } else {
      clearShelbyApiKey();
    }
    setSaved(true);
    setTimeout(() => {
      setSaved(false);
      onClose();
    }, 1200);
  };

  const handleClear = () => {
    clearShelbyApiKey();
    setApiKeyInput('');
    setSaved(true);
    setTimeout(() => {
      setSaved(false);
      onClose();
    }, 1000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-fadeIn">
      <div className="bg-[#31341F] border border-[#BAC095]/30 rounded-2xl w-full max-w-md p-6 shadow-2xl space-y-5 text-[#BAC095] relative">
        
        {/* Header */}
        <div className="flex items-center justify-between border-b border-[#BAC095]/15 pb-4">
          <div className="flex items-center gap-2 text-[#D4DE95]">
            <Key className="w-5 h-5" />
            <h3 className="font-display font-bold text-lg">Shelby Developer API Key</h3>
          </div>
          <button
            onClick={onClose}
            className="p-1 hover:bg-[#636B2F]/30 text-[#BAC095] hover:text-[#D4DE95] rounded-lg transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Instructions */}
        <div className="bg-[#2A2D1A] border border-[#BAC095]/20 p-3.5 rounded-xl text-xs space-y-2 leading-relaxed">
          <div className="flex items-start gap-2 text-[#D4DE95]">
            <Info className="w-4 h-4 shrink-0 mt-0.5" />
            <p className="font-medium">Optional developer credential for Shelby Protocol storage:</p>
          </div>
          <p className="text-[#BAC095]/80 pl-6">
            To store notes directly on the live Shelby Decentralized Storage Network, grab your free Shelby developer API key from{' '}
            <a
              href="https://developers.shelby.xyz"
              target="_blank"
              rel="noreferrer"
              className="text-[#D4DE95] underline hover:text-white inline-flex items-center gap-0.5"
            >
              developers.shelby.xyz <ExternalLink className="w-3 h-3" />
            </a>.
          </p>
        </div>

        {/* Input */}
        <div className="space-y-2">
          <label className="block text-xs font-mono uppercase text-[#D4DE95]">API Key</label>
          <input
            type="password"
            value={apiKey}
            onChange={(e) => setApiKeyInput(e.target.value)}
            placeholder="sh_live_..."
            className="w-full bg-[#2A2D1A] border border-[#BAC095]/30 focus:border-[#D4DE95] focus:outline-none rounded-xl px-4 py-2.5 text-sm text-[#D4DE95] font-mono placeholder-[#BAC095]/40"
          />
        </div>

        {/* Actions */}
        <div className="flex items-center justify-between pt-2">
          {apiKey ? (
            <button
              onClick={handleClear}
              className="flex items-center gap-1.5 text-xs text-red-400 hover:text-red-300 font-mono"
            >
              <Trash2 className="w-3.5 h-3.5" />
              <span>Clear Key</span>
            </button>
          ) : <div />}

          <div className="flex items-center gap-3">
            <button
              onClick={onClose}
              className="px-4 py-2 text-xs font-medium text-[#BAC095] hover:text-white transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={handleSave}
              className="glow-lime-hover flex items-center gap-1.5 bg-[#636B2F] hover:bg-[#636B2F]/90 text-[#D4DE95] font-semibold text-xs px-5 py-2.5 rounded-xl border border-[#D4DE95]/40 transition-all"
            >
              {saved ? <Check className="w-4 h-4" /> : null}
              <span>{saved ? 'Saved!' : 'Save Key'}</span>
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
