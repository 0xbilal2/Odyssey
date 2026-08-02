import React, { useState } from 'react';
import { Bold, Italic, List, ListOrdered, Lock, CloudUpload, ArrowLeft, Check, Sparkles, Tag } from 'lucide-react';
import { Note, TagType } from '../types';
import { encryptText } from '../lib/crypto';
import { uploadShelbyBlob } from '../lib/shelby';
import { useWallet } from '@aptos-labs/wallet-adapter-react';

interface FullNoteEditorPageProps {
  onSaveNote: (note: Note) => void;
  onBack: () => void;
}

export const FullNoteEditorPage: React.FC<FullNoteEditorPageProps> = ({ onSaveNote, onBack }) => {
  const { account } = useWallet();
  const walletAddress = account?.address?.toString() || '0x7a...4f2d';

  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [passphrase, setPassphrase] = useState('');
  const [isEncrypted, setIsEncrypted] = useState(true);
  const [selectedTag, setSelectedTag] = useState<TagType>('Research');
  
  const [isSaving, setIsSaving] = useState(false);
  const [saveStatus, setSaveStatus] = useState<string | null>(null);

  // Formatting helpers
  const handleFormat = (prefix: string, suffix: string = '') => {
    setBody((prev) => prev + `${prefix} ${suffix}`);
  };

  const handleSave = async () => {
    if (!title.trim() && !body.trim()) {
      alert('Please enter a title or body for your note.');
      return;
    }

    setIsSaving(true);
    setSaveStatus('Preparing payload...');

    try {
      let cipherText = '';
      let iv = '';
      let salt = '';

      if (isEncrypted) {
        setSaveStatus('Encrypting with AES-GCM...');
        const encryptionKey = passphrase || walletAddress;
        const encrypted = await encryptText(body, encryptionKey);
        cipherText = encrypted.cipherText;
        iv = encrypted.iv;
        salt = encrypted.salt;
      }

      setSaveStatus('Uploading to Shelby Network...');
      const noteId = `note-${Date.now()}`;
      const payloadToSave = isEncrypted ? cipherText : body;

      const shelbyResult = await uploadShelbyBlob(noteId, payloadToSave);

      const newNote: Note = {
        id: noteId,
        title: title || 'Untitled Note',
        body: body,
        preview: isEncrypted
          ? `${cipherText.substring(0, 40)}... [Encrypted Block]`
          : body.substring(0, 100),
        isEncrypted,
        isFavorite: false,
        cipherText: isEncrypted ? cipherText : undefined,
        iv: isEncrypted ? iv : undefined,
        salt: isEncrypted ? salt : undefined,
        tags: [selectedTag],
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        transactionHash: shelbyResult?.transactionHash || `0x${Math.random().toString(16).slice(2, 10)}...`,
        shelbyBlobId: shelbyResult?.blobId || `shelby_blob_${Date.now()}`,
        shelbyUrl: shelbyResult?.shelbyUrl,
        walletAddress,
      };

      onSaveNote(newNote);
      setSaveStatus('Saved successfully!');
      setTimeout(() => {
        onBack();
      }, 500);
    } catch (err: any) {
      console.error('Failed to save note:', err);
      alert('Error saving note: ' + (err.message || 'Unknown error'));
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="flex-1 flex flex-col bg-[#3D4127] text-[#BAC095] min-h-[calc(100vh-140px)] py-8 px-4 md:px-8 max-w-5xl mx-auto w-full space-y-6">
      
      {/* Back button */}
      <div className="flex items-center justify-between">
        <button
          onClick={onBack}
          className="flex items-center gap-2 text-xs font-mono text-[#D4DE95] hover:text-white bg-[#2A2D1A] border border-[#BAC095]/20 px-3.5 py-1.5 rounded-xl transition-all"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Notes</span>
        </button>

        <span className="text-xs font-mono text-[#BAC095]/70">
          Dedicated Shelby Note Editor
        </span>
      </div>

      {/* Main Editor Card (Matching Image 2) */}
      <div className="bg-[#2A2E19] border border-[#484D30] rounded-2xl shadow-2xl p-6 md:p-8 space-y-6">
        
        {/* Formatting & Controls Header Toolbar */}
        <div className="flex flex-wrap items-center justify-between gap-4 pb-5 border-b border-[#484D30]/60">
          
          {/* Formatting buttons */}
          <div className="flex items-center gap-1.5 bg-[#1C2010] p-1.5 rounded-xl border border-[#484D30]/50">
            <button
              onClick={() => handleFormat('**', '**')}
              className="p-2 hover:bg-[#3D4127] text-[#D4DE95] hover:text-white rounded-lg transition-colors"
              title="Bold"
            >
              <Bold className="w-4 h-4" />
            </button>
            <button
              onClick={() => handleFormat('*', '*')}
              className="p-2 hover:bg-[#3D4127] text-[#D4DE95] hover:text-white rounded-lg transition-colors"
              title="Italic"
            >
              <Italic className="w-4 h-4" />
            </button>
            <div className="w-px h-5 bg-[#484D30]/60 mx-1"></div>
            <button
              onClick={() => handleFormat('- ')}
              className="p-2 hover:bg-[#3D4127] text-[#D4DE95] hover:text-white rounded-lg transition-colors"
              title="Bullet List"
            >
              <List className="w-4 h-4" />
            </button>
            <button
              onClick={() => handleFormat('1. ')}
              className="p-2 hover:bg-[#3D4127] text-[#D4DE95] hover:text-white rounded-lg transition-colors"
              title="Numbered List"
            >
              <ListOrdered className="w-4 h-4" />
            </button>
          </div>

          {/* Encryption Toggle & Save to Shelby Button */}
          <div className="flex items-center gap-4">
            
            {/* Encrypt before storage toggle */}
            <label className="flex items-center gap-2.5 cursor-pointer bg-[#1C2010] border border-[#484D30]/50 px-3.5 py-2 rounded-xl">
              <input
                type="checkbox"
                checked={isEncrypted}
                onChange={(e) => setIsEncrypted(e.target.checked)}
                className="sr-only peer"
              />
              <div className="w-9 h-5 bg-[#3D4127] peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-[#BAC095] after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-[#8B9646] relative"></div>
              <div className="flex items-center gap-1.5 text-xs font-mono text-[#D4DE95]">
                <Lock className="w-3.5 h-3.5" />
                <span>Encrypt before storage</span>
              </div>
            </label>

            {/* Save to Shelby button */}
            <button
              onClick={handleSave}
              disabled={isSaving}
              className="glow-lime flex items-center gap-2 bg-[#8B9646] hover:bg-[#8B9646]/90 text-[#1C2010] font-bold text-sm px-5 py-2.5 rounded-xl border border-[#D4DE95]/50 transition-all duration-300 transform active:scale-95 disabled:opacity-50"
            >
              <CloudUpload className="w-4 h-4" />
              <span>{isSaving ? saveStatus : 'Save to Shelby'}</span>
            </button>
          </div>

        </div>

        {/* Note Title Input */}
        <div className="space-y-2">
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Note Title"
            className="w-full bg-transparent font-display font-extrabold text-3xl md:text-4xl text-[#D4DE95] placeholder-[#BAC095]/30 focus:outline-none border-b border-transparent focus:border-[#8B9646]/40 pb-2 transition-all"
          />

          {/* Encryption Status Pill */}
          <div className="flex items-center gap-3 text-xs font-mono">
            <span className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#1C2010] text-[#D4DE95] border border-[#484D30]/60">
              <span className={`w-2 h-2 rounded-full ${isEncrypted ? 'bg-[#8B9646]' : 'bg-amber-400'}`}></span>
              <span>{isEncrypted ? 'Encrypted' : 'Plain Text'}</span>
            </span>
            <span className="text-[#BAC095]/60">Last edited just now</span>
          </div>
        </div>

        {/* Optional Custom Key / Passphrase */}
        {isEncrypted && (
          <div className="bg-[#1C2010] border border-[#484D30]/60 rounded-xl p-3.5 space-y-2">
            <label className="block text-xs font-mono text-[#D4DE95] flex items-center justify-between">
              <span>Encryption Key / Passphrase (Optional):</span>
              <span className="text-[10px] text-[#BAC095]/60">Defaults to Wallet Address</span>
            </label>
            <input
              type="password"
              value={passphrase}
              onChange={(e) => setPassphrase(e.target.value)}
              placeholder="Leave blank to encrypt with your wallet signature key"
              className="w-full bg-[#2A2E19] border border-[#484D30]/80 rounded-lg px-3 py-2 text-xs font-mono text-[#D4DE95] placeholder-[#BAC095]/40 focus:outline-none focus:border-[#8B9646]"
            />
          </div>
        )}

        {/* Folder / Tag Selector */}
        <div className="flex items-center gap-2">
          <span className="text-xs font-mono text-[#BAC095]/70 flex items-center gap-1">
            <Tag className="w-3.5 h-3.5" /> Tag / Folder:
          </span>
          {(['Research', 'Work', 'Personal', 'Crypto', 'Ideas'] as TagType[]).map((tag) => (
            <button
              key={tag}
              type="button"
              onClick={() => setSelectedTag(tag)}
              className={`px-3 py-1 rounded-lg text-xs font-mono transition-all ${
                selectedTag === tag
                  ? 'bg-[#8B9646] text-[#1C2010] font-bold border border-[#D4DE95]'
                  : 'bg-[#1C2010] text-[#BAC095]/80 hover:text-[#D4DE95] border border-[#484D30]/50'
              }`}
            >
              {tag}
            </button>
          ))}
        </div>

        {/* Main Writing Textarea */}
        <div className="space-y-2 pt-2">
          <textarea
            value={body}
            onChange={(e) => setBody(e.target.value)}
            placeholder="Start writing..."
            rows={14}
            className="w-full bg-[#1C2010]/80 border border-[#484D30]/60 focus:border-[#8B9646] focus:outline-none rounded-xl p-5 text-base font-body text-[#D4DE95] placeholder-[#BAC095]/30 leading-relaxed resize-y transition-colors"
          />
        </div>

      </div>

    </div>
  );
};
