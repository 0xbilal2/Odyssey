import React, { useState } from 'react';
import { Note, TagType } from '../types';
import { Search, Plus, Lock, Unlock, Calendar, ExternalLink, Filter, ShieldCheck, Database, Folder, Sparkles, Trash2, Tag } from 'lucide-react';
import { useWallet } from '@aptos-labs/wallet-adapter-react';

interface NotesDashboardProps {
  notes: Note[];
  onOpenNewNoteModal: () => void;
  onSelectNote: (note: Note) => void;
  onDeleteNote: (id: string) => void;
}

const TAG_FILTERS: TagType[] = ['All', 'Work', 'Personal', 'Research', 'Crypto', 'Ideas'];

export const NotesDashboard: React.FC<NotesDashboardProps> = ({
  notes,
  onOpenNewNoteModal,
  onSelectNote,
  onDeleteNote,
}) => {
  const { account } = useWallet();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTag, setSelectedTag] = useState<TagType>('All');

  // Filter notes based on search query and tag selection
  const filteredNotes = notes.filter((note) => {
    const matchesSearch =
      note.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      note.body.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (note.preview && note.preview.toLowerCase().includes(searchQuery.toLowerCase()));

    const matchesTag =
      selectedTag === 'All' || (note.tags && note.tags.includes(selectedTag));

    return matchesSearch && matchesTag;
  });

  const formattedWallet = account?.address
    ? `${account.address.toString().substring(0, 6)}...${account.address.toString().substring(account.address.toString().length - 4)}`
    : '';

  return (
    <div className="flex-1 flex flex-col max-w-7xl mx-auto w-full px-4 md:px-8 py-8 space-y-8">
      
      {/* Dashboard Top Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-6 border-b border-[#BAC095]/15">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <h1 className="font-display font-extrabold text-3xl text-[#D4DE95] tracking-tight">
              Encrypted Journal
            </h1>
            <span className="px-2.5 py-0.5 rounded-full text-xs font-mono bg-[#636B2F]/30 text-[#D4DE95] border border-[#BAC095]/20">
              {notes.length} {notes.length === 1 ? 'Note' : 'Notes'}
            </span>
          </div>
          <p className="text-sm font-body text-[#BAC095]/80">
            Connected as <span className="font-mono text-[#D4DE95]">{formattedWallet}</span>. Encrypted client-side, anchored on Aptos, saved on Shelby.
          </p>
        </div>

        {/* Primary Action Button */}
        <button
          onClick={onOpenNewNoteModal}
          className="glow-lime-hover self-start md:self-auto flex items-center gap-2 bg-[#636B2F] hover:bg-[#636B2F]/90 text-[#D4DE95] font-bold text-sm px-5 py-3 rounded-xl border border-[#D4DE95]/50 transition-all duration-300 transform active:scale-95"
        >
          <Plus className="w-4 h-4 text-[#D4DE95]" />
          <span>New Note</span>
        </button>
      </div>

      {/* Search & Tag Filter Bar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
        
        {/* Search Input */}
        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 text-[#BAC095]/60 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search encrypted notes..."
            className="w-full bg-[#2A2D1A] border border-[#BAC095]/20 focus:border-[#D4DE95] focus:outline-none rounded-xl pl-10 pr-4 py-2.5 text-sm text-[#D4DE95] placeholder-[#BAC095]/40 transition-colors font-body"
          />
        </div>

        {/* Tag Filters */}
        <div className="flex items-center gap-2 overflow-x-auto w-full sm:w-auto pb-2 sm:pb-0 scrollbar-none">
          <Filter className="w-4 h-4 text-[#BAC095]/60 shrink-0 hidden sm:block" />
          {TAG_FILTERS.map((tag) => (
            <button
              key={tag}
              onClick={() => setSelectedTag(tag)}
              className={`px-3 py-1.5 rounded-lg text-xs font-mono border whitespace-nowrap transition-all ${
                selectedTag === tag
                  ? 'bg-[#636B2F] border-[#D4DE95]/50 text-[#D4DE95] font-bold shadow-sm'
                  : 'bg-[#2A2D1A] border-[#BAC095]/15 text-[#BAC095]/80 hover:border-[#BAC095]/40 hover:text-[#D4DE95]'
              }`}
            >
              {tag}
            </button>
          ))}
        </div>
      </div>

      {/* Note Cards Bento Grid */}
      {filteredNotes.length === 0 ? (
        <div className="bg-[#2A2D1A]/60 border border-[#BAC095]/15 rounded-2xl p-12 text-center space-y-4 my-8">
          <div className="w-12 h-12 rounded-2xl bg-[#636B2F]/30 border border-[#BAC095]/20 mx-auto flex items-center justify-center text-[#D4DE95]">
            <Folder className="w-6 h-6" />
          </div>
          <div className="space-y-1">
            <h3 className="font-display font-bold text-lg text-[#D4DE95]">No notes found</h3>
            <p className="text-sm font-body text-[#BAC095]/70 max-w-sm mx-auto">
              {searchQuery || selectedTag !== 'All'
                ? 'Try clearing your search terms or selecting a different tag filter.'
                : 'Click "New Note" to create your first encrypted note on Shelby!'}
            </p>
          </div>
          <button
            onClick={onOpenNewNoteModal}
            className="glow-lime inline-flex items-center gap-2 bg-[#636B2F] text-[#D4DE95] font-semibold text-xs px-4 py-2.5 rounded-xl border border-[#D4DE95]/40 hover:bg-[#636B2F]/90 transition-all"
          >
            <Plus className="w-4 h-4" />
            <span>Create New Note</span>
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredNotes.map((note) => {
            const formattedDate = new Date(note.updatedAt).toLocaleDateString('en-US', {
              month: 'short',
              day: 'numeric',
            });

            return (
              <article
                key={note.id}
                onClick={() => onSelectNote(note)}
                className="bg-[#2A2D1A] border border-[#BAC095]/20 hover:border-[#D4DE95]/50 rounded-2xl p-6 flex flex-col justify-between gap-5 transition-all duration-300 hover:-translate-y-1 cursor-pointer group shadow-lg relative overflow-hidden"
              >
                {/* Top Title & Lock Status */}
                <div className="space-y-2">
                  <div className="flex items-start justify-between gap-2">
                    <h2 className="font-display font-bold text-lg text-[#D4DE95] group-hover:text-white transition-colors line-clamp-2">
                      {note.title}
                    </h2>
                    <div className="shrink-0 p-1.5 rounded-lg bg-[#31341F] border border-[#BAC095]/20 text-[#D4DE95]">
                      {note.isEncrypted ? (
                        <Lock className="w-4 h-4 text-[#D4DE95]" title="AES-GCM Encrypted" />
                      ) : (
                        <Unlock className="w-4 h-4 text-[#BAC095]" title="Unencrypted" />
                      )}
                    </div>
                  </div>

                  {/* Body Preview */}
                  <p className="font-body text-sm text-[#BAC095]/80 line-clamp-3 leading-relaxed">
                    {note.isEncrypted && note.cipherText
                      ? `${note.cipherText.substring(0, 50)}... [AES-GCM Encrypted]`
                      : note.preview || note.body}
                  </p>
                </div>

                {/* Footer Metadata */}
                <div className="space-y-3 pt-3 border-t border-[#BAC095]/15">
                  <div className="flex items-center justify-between text-xs font-mono text-[#BAC095]/70">
                    <div className="flex items-center gap-1.5 flex-wrap">
                      {note.tags && note.tags.map((tag) => (
                        <span key={tag} className="px-2 py-0.5 rounded bg-[#636B2F]/30 text-[#D4DE95] text-[10px] font-semibold border border-[#BAC095]/20 uppercase">
                          {tag}
                        </span>
                      ))}
                    </div>

                    <span className="text-[11px]">{formattedDate}</span>
                  </div>

                  {/* Shelby & Tx Hash Pill */}
                  <div className="flex items-center justify-between text-[11px] font-mono text-[#BAC095]/60">
                    <span className="flex items-center gap-1 text-[#D4DE95]/80">
                      <Database className="w-3 h-3 text-[#D4DE95]" />
                      <span>Shelby Storage</span>
                    </span>

                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        if (confirm('Delete this note?')) {
                          onDeleteNote(note.id);
                        }
                      }}
                      className="text-red-400 hover:text-red-300 p-1 rounded hover:bg-red-950/30 transition-colors opacity-0 group-hover:opacity-100"
                      title="Delete note"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>

              </article>
            );
          })}
        </div>
      )}

    </div>
  );
};
