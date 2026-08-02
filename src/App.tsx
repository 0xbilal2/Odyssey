import React, { useState, useEffect } from 'react';
import { useWallet } from '@aptos-labs/wallet-adapter-react';
import { AptosWalletProvider } from './components/AptosWalletProvider';
import { Navbar } from './components/Navbar';
import { LandingPage } from './components/LandingPage';
import { NotesDashboard } from './components/NotesDashboard';
import { Sidebar } from './components/Sidebar';
import { FullNoteEditorPage } from './components/FullNoteEditorPage';
import { FeaturesPage } from './components/FeaturesPage';
import { SecurityPage } from './components/SecurityPage';
import { PricingPage } from './components/PricingPage';
import { NoteEditor } from './components/NoteEditor';
import { NoteViewModal } from './components/NoteViewModal';
import { ShelbyKeyModal } from './components/ShelbyKeyModal';
import { Footer } from './components/Footer';
import { loadNotes, addNote, deleteNote as removeNoteFromStorage, toggleFavoriteNote } from './lib/storage';
import { Note, ActiveNavView } from './types';

const AppContent: React.FC = () => {
  const { connected, account } = useWallet();
  const walletAddress = account?.address?.toString() || '';

  const [activeNav, setActiveNav] = useState<ActiveNavView>('all');
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

  const handleToggleFavorite = (id: string) => {
    if (walletAddress) {
      const updated = toggleFavoriteNote(walletAddress, id);
      setNotes(updated);
    }
  };

  const isDashboardView = ['all', 'recent', 'favorites', 'work', 'personal', 'research'].includes(activeNav);

  return (
    <div className="min-h-screen flex flex-col bg-[#3D4127] text-[#BAC095]">
      
      {/* Top Navbar */}
      <Navbar
        activeNav={activeNav}
        onNavigate={setActiveNav}
        onOpenShelbyKeyModal={() => setIsShelbyKeyModalOpen(true)}
      />

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col min-h-0">
        {!connected ? (
          /* Landing Page / Static Info Pages (Only visible BEFORE wallet connect) */
          activeNav === 'features' ? (
            <FeaturesPage onNavigate={setActiveNav} />
          ) : activeNav === 'security' ? (
            <SecurityPage />
          ) : activeNav === 'pricing' ? (
            <PricingPage onNavigate={setActiveNav} onOpenShelbyKeyModal={() => setIsShelbyKeyModalOpen(true)} />
          ) : (
            <LandingPage onOpenShelbyKeyModal={() => setIsShelbyKeyModalOpen(true)} />
          )
        ) : (
          /* Authenticated State Pages */
          activeNav === 'editor' ? (
            <FullNoteEditorPage
              onSaveNote={handleSaveNote}
              onBack={() => setActiveNav('all')}
            />
          ) : activeNav === 'features' ? (
            <FeaturesPage onNavigate={setActiveNav} />
          ) : activeNav === 'security' ? (
            <SecurityPage />
          ) : activeNav === 'pricing' ? (
            <PricingPage onNavigate={setActiveNav} onOpenShelbyKeyModal={() => setIsShelbyKeyModalOpen(true)} />
          ) : (
            /* Dashboard View with Authentic Sidebar (Matching Image 1) */
            <div className="flex-1 flex overflow-hidden">
              <Sidebar
                activeNav={activeNav}
                onNavigate={setActiveNav}
                onOpenNewNote={() => setActiveNav('editor')}
                notesCount={notes.length}
                favoritesCount={notes.filter((n) => n.isFavorite).length}
              />
              <NotesDashboard
                notes={notes}
                activeNav={activeNav}
                onNavigate={setActiveNav}
                onOpenNewNoteModal={() => setActiveNav('editor')}
                onSelectNote={(note) => setSelectedNote(note)}
                onDeleteNote={handleDeleteNote}
                onToggleFavorite={handleToggleFavorite}
              />
            </div>
          )
        )}
      </main>

      {/* Footer / Credits Section */}
      <Footer activeNav={activeNav} onNavigate={setActiveNav} />

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

