import React, { useState } from 'react';
import { Note } from '../types';
import { Lock, Unlock, X, ExternalLink, Calendar, Tag, Key, ShieldCheck, Trash2, Copy, Check } from 'lucide-react';
import { decryptText } from '../lib/crypto';

interface NoteViewModalProps {
  note: Note | null;
  isOpen: boolean;
  onClose: () => void;
  onDeleteNote: (id: string) => void;
}

export const NoteViewModal: React.FC<NoteViewModalProps> = ({
  note,
  isOpen,
  onClose,
  onDeleteNote,
}) => {
  const [passphrase, setPassphrase] = useState('');
  const [decryptedContent, setDecryptedContent] = useState<string | null>(null);
  const [decryptError, setDecryptError] = useState<string | null>(null);
  const [isDecrypting, setIsDecrypting] = useState(false);
  const [copiedHash, setCopiedHash] = useState(false);

  if (!isOpen || !note) return null;

  const handleDecrypt = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!note.cipherText || !note.iv || !note.salt) return;
    
    setIsDecrypting(true);
    setDecryptError(null);
    try {
      const keyToUse = passphrase || 'odyssey-default-passphrase';
      const result = await decryptText(note.cipherText, note.iv, note.salt, keyToUse);
      setDecryptedContent(result);
    } catch (err: any) {
      setDecryptError(err.message || 'Decryption failed. Please check your key.');
    } finally {
      setIsDecrypting(false);
    }
  };

  const formattedDate = new Date(note.updatedAt).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });

  const isEncryptedAndLocked = note.isEncrypted && decryptedContent === null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-md animate-fadeIn">
      <div className="bg-[#2A2D1A] border border-[#BAC095]/30 rounded-2xl w-full max-w-2xl max-h-[90vh] flex flex-col shadow-2xl overflow-hidden text-[#BAC095]">
        
        {/* Header */}
        <div className="p-6 border-b border-[#BAC095]/15 flex items-start justify-between bg-[#31341F]/80">
          <div className="space-y-2 pr-4">
            <div className="flex items-center gap-2 flex-wrap">
              <h2 className="font-display font-bold text-2xl text-[#D4DE95]">{note.title}</h2>
              {note.isEncrypted ? (
                <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-mono bg-[#636B2F]/30 text-[#D4DE95] border border-[#BAC095]/30">
                  <Lock className="w-3 h-3 text-[#D4DE95]" />
                  <span>AES-GCM Encrypted</span>
                </span>
              ) : (
                <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-mono bg-[#BAC095]/10 text-[#BAC095] border border-[#BAC095]/20">
                  <Unlock className="w-3 h-3" />
                  <span>Unencrypted</span>
                </span>
              )}
            </div>

            <div className="flex flex-wrap items-center gap-4 text-xs text-[#BAC095]/70 font-mono">
              <span className="flex items-center gap-1">
                <Calendar className="w-3.5 h-3.5 text-[#D4DE95]" />
                {formattedDate}
              </span>
              {note.tags && note.tags.length > 0 && (
                <div className="flex items-center gap-1.5">
                  <Tag className="w-3.5 h-3.5 text-[#D4DE95]" />
                  {note.tags.map((tag) => (
                    <span key={tag} className="px-1.5 py-0.5 rounded bg-[#636B2F]/30 text-[#D4DE95]">
                      {tag}
                    </span>
                  ))}
                </div>
              )}
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 hover:bg-[#636B2F]/40 text-[#BAC095] hover:text-[#D4DE95] rounded-xl transition-colors shrink-0"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-6 overflow-y-auto space-y-6 flex-1">
          
          {isEncryptedAndLocked ? (
            <div className="space-y-5">
              
              {/* Encrypted Raw Preview */}
              <div className="bg-[#1E210A] border border-[#BAC095]/20 rounded-xl p-4 font-mono text-xs text-[#BAC095]/60 space-y-2">
                <div className="flex items-center justify-between text-[#D4DE95] text-xs font-semibold">
                  <span>Encrypted Ciphertext Block</span>
                  <Lock className="w-3.5 h-3.5" />
                </div>
                <p className="break-all opacity-80 leading-relaxed max-h-24 overflow-y-auto">
                  {note.cipherText}
                </p>
              </div>

              {/* Decryption Form */}
              <form onSubmit={handleDecrypt} className="bg-[#31341F] border border-[#D4DE95]/30 p-5 rounded-2xl space-y-4">
                <div className="space-y-1">
                  <label className="block text-xs font-mono text-[#D4DE95] font-semibold flex items-center gap-1.5">
                    <Key className="w-3.5 h-3.5" />
                    Enter Decryption Key / Passphrase
                  </label>
                  <p className="text-xs text-[#BAC095]/70">
                    Provide the key used when saving this note (default key pre-filled if blank).
                  </p>
                </div>

                <div className="flex items-center gap-2">
                  <input
                    type="password"
                    value={passphrase}
                    onChange={(e) => setPassphrase(e.target.value)}
                    placeholder="Enter key or leave blank for default..."
                    className="flex-1 bg-[#2A2D1A] border border-[#BAC095]/30 focus:border-[#D4DE95] focus:outline-none rounded-xl px-4 py-2 text-sm text-[#D4DE95] font-mono"
                  />
                  <button
                    type="submit"
                    disabled={isDecrypting}
                    className="glow-lime-hover bg-[#636B2F] hover:bg-[#636B2F]/90 text-[#D4DE95] font-bold text-xs px-5 py-2.5 rounded-xl border border-[#D4DE95]/40 transition-all shrink-0"
                  >
                    {isDecrypting ? 'Decrypting...' : 'Decrypt Note'}
                  </button>
                </div>

                {decryptError && (
                  <p className="text-xs text-red-400 font-mono">{decryptError}</p>
                )}
              </form>
            </div>
          ) : (
            <div className="space-y-4">
              {decryptedContent !== null && (
                <div className="flex items-center gap-2 text-xs font-mono text-[#D4DE95] bg-[#636B2F]/30 border border-[#D4DE95]/30 px-3 py-1.5 rounded-lg">
                  <ShieldCheck className="w-4 h-4 text-[#D4DE95]" />
                  <span>Decryption successful via Web Crypto API AES-GCM</span>
                </div>
              )}
              
              <div className="bg-[#1E210A] border border-[#BAC095]/20 rounded-2xl p-6 whitespace-pre-wrap font-body text-base text-[#D4DE95] leading-relaxed min-h-[160px]">
                {decryptedContent !== null ? decryptedContent : note.body}
              </div>
            </div>
          )}

          {/* Decentralized Storage Metadata */}
          <div className="bg-[#31341F] border border-[#BAC095]/15 rounded-xl p-4 text-xs space-y-2 font-mono">
            <span className="text-[#D4DE95] font-semibold block mb-1">On-Chain & Decentralized Provenance</span>
            
            {note.shelbyBlobId && (
              <div className="flex items-center justify-between text-[#BAC095]/90">
                <span className="text-[#BAC095]/60">Shelby Blob ID:</span>
                <a
                  href={note.shelbyUrl || `https://explorer.shelby.xyz/blob/${note.shelbyBlobId}`}
                  target="_blank"
                  rel="noreferrer"
                  className="text-[#D4DE95] hover:underline flex items-center gap-1 font-mono text-[11px]"
                >
                  {note.shelbyBlobId}
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            )}

            {note.transactionHash && (
              <div className="flex items-center justify-between text-[#BAC095]/90 pt-1 border-t border-[#BAC095]/10">
                <span className="text-[#BAC095]/60">Aptos Tx Hash:</span>
                <span className="text-[#D4DE95] font-mono text-[11px] flex items-center gap-1">
                  {note.transactionHash}
                </span>
              </div>
            )}
          </div>

        </div>

        {/* Footer Actions */}
        <div className="p-4 border-t border-[#BAC095]/15 bg-[#31341F]/80 flex items-center justify-between">
          <button
            onClick={() => {
              if (confirm('Are you sure you want to delete this note?')) {
                onDeleteNote(note.id);
                onClose();
              }
            }}
            className="flex items-center gap-1.5 text-xs text-red-400 hover:text-red-300 font-mono px-3 py-1.5 rounded-lg hover:bg-red-950/30 transition-colors"
          >
            <Trash2 className="w-4 h-4" />
            <span>Delete Note</span>
          </button>

          <button
            onClick={onClose}
            className="bg-[#636B2F] hover:bg-[#636B2F]/90 text-[#D4DE95] font-semibold text-xs px-5 py-2 rounded-xl border border-[#D4DE95]/30 transition-all"
          >
            Close
          </button>
        </div>

      </div>
    </div>
  );
};
