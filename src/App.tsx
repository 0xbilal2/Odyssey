import React, { useState, useEffect } from 'react';
import { useWallet } from '@aptos-labs/wallet-adapter-react';
import { AptosWalletProvider } from './components/AptosWalletProvider';
import { Navbar } from './components/Navbar';
import { LandingPage } from './components/LandingPage';
import { NotesDashboard } from './components/NotesDashboard';
import { NoteEditor } from './components/NoteEditor';
import { NoteViewModal } from './components/NoteViewModal';
import { ShelbyKeyModal } from './components/ShelbyKeyModal';
import { Footer } from './components/Footer';
import { loadNotes, addNote, deleteNote as removeNoteFromStorage } from './lib/storage';
import { Note } from './types';

const AppContent: React.FC = () => {
  const { connected, account } = useWallet();
  const walletAddress = account?.address?.toString() || '';

  const [notes, setNotes] = useState<Note[]>([]);
  const [isEditorOpen, setIsEditorOpen] = useState(false);
  const [selectedNote, setSelectedNote] = useState<Note | null>(null);
  const [isShelbyKeyModalOpen, setIsShelbyKeyModalOpen] = useState(false);

  // Sync notes whenever connected wallet changes
  useEffect(() => {
    if (connected && walletAddress) {
      const userNotes = loadNotes(walletAddress);
      setNotes(userNotes);
    } else {
      setNotes([]);
    }
  }, [connected, walletAddress]);

  const handleSaveNote = (newNote: Note) => {
    if (walletAddress) {
      const updated = addNote(walletAddress, newNote);
      setNotes(updated);
    }
  };

  const handleDeleteNote = (id: string) => {
    if (walletAddress) {
      const updated = removeNoteFromStorage(walletAddress, id);
      setNotes(updated);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#3D4127] text-[#BAC095]">
      
      {/* Top Navbar */}
      <Navbar onOpenShelbyKeyModal={() => setIsShelbyKeyModalOpen(true)} />

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col">
        {!connected ? (
          /* Landing Page (Only visible BEFORE wallet connect) */
          <LandingPage onOpenShelbyKeyModal={() => setIsShelbyKeyModalOpen(true)} />
        ) : (
          /* Notes Dashboard (Only visible AFTER wallet connect) */
          <NotesDashboard
            notes={notes}
            onOpenNewNoteModal={() => setIsEditorOpen(true)}
            onSelectNote={(note) => setSelectedNote(note)}
            onDeleteNote={handleDeleteNote}
          />
        )}
      </main>

      {/* Footer / Credits Section */}
      <Footer />

      {/* Modals */}
      <NoteEditor
        isOpen={isEditorOpen}
        onClose={() => setIsEditorOpen(false)}
        onSaveNote={handleSaveNote}
      />

      <NoteViewModal
        note={selectedNote}
        isOpen={selectedNote !== null}
        onClose={() => setSelectedNote(null)}
        onDeleteNote={handleDeleteNote}
      />

      <ShelbyKeyModal
        isOpen={isShelbyKeyModalOpen}
        onClose={() => setIsShelbyKeyModalOpen(false)}
      />

    </div>
  );
};

export default function App() {
  return (
    <AptosWalletProvider>
      <AppContent />
    </AptosWalletProvider>
  );
}
