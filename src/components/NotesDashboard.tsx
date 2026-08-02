import React, { useState } from 'react';
import { Note, TagType, ActiveNavView } from '../types';
import { Search, Plus, Lock, Unlock, Calendar, ExternalLink, Filter, ShieldCheck, Database, Folder, Sparkles, Trash2, Tag, Star, ArrowUpDown } from 'lucide-react';
import { useWallet } from '@aptos-labs/wallet-adapter-react';

interface NotesDashboardProps {
  notes: Note[];
  activeNav: ActiveNavView;
  onNavigate: (nav: ActiveNavView) => void;
  onOpenNewNoteModal: () => void;
  onSelectNote: (note: Note) => void;
  onDeleteNote: (id: string) => void;
  onToggleFavorite?: (id: string) => void;
}

const TAG_FILTERS: TagType[] = ['All', 'Work', 'Personal', 'Research', 'Crypto', 'Ideas'];

export const NotesDashboard: React.FC<NotesDashboardProps> = ({
  notes,
  activeNav,
  onNavigate,
  onOpenNewNoteModal,
  onSelectNote,
  onDeleteNote,
  onToggleFavorite,
}) => {
  const { account } = useWallet();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTag, setSelectedTag] = useState<TagType>('All');
  const [sortBy, setSortBy] = useState<'date' | 'title'>('date');

  // Active section title and description
  const getViewMeta = () => {
    switch (activeNav) {
      case 'recent':
        return { title: 'Recent Notes', subtitle: 'Notes updated recently in your journal.' };
      case 'favorites':
        return { title: 'Favorite Notes', subtitle: 'Your starred and prioritized encrypted notes.' };
      case 'work':
        return { title: 'Work Folder', subtitle: 'Encrypted work documentation and specs.' };
      case 'personal':
        return { title: 'Personal Folder', subtitle: 'Private thoughts, keys, and personal entries.' };
      case 'research':
        return { title: 'Research Folder', subtitle: 'Protocol research and cryptographic analysis.' };
      default:
        return { title: 'All Notes', subtitle: 'Your securely encrypted journal.' };
    }
  };

  const viewMeta = getViewMeta();

  // Filter notes based on activeNav view, search query, and tag selection
  const filteredNotes = notes
    .filter((note) => {
      // Nav View Filtering
      if (activeNav === 'favorites' && !note.isFavorite) return false;
      if (activeNav === 'work' && !note.tags.includes('Work')) return false;
      if (activeNav === 'personal' && !note.tags.includes('Personal')) return false;
      if (activeNav === 'research' && !note.tags.includes('Research')) return false;
      
      // Search Query Filtering
      const matchesSearch =
        note.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        note.body.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (note.preview && note.preview.toLowerCase().includes(searchQuery.toLowerCase()));

      // Tag Filter
      const matchesTag =
        selectedTag === 'All' || (note.tags && note.tags.includes(selectedTag));

      return matchesSearch && matchesTag;
    })
    .sort((a, b) => {
      if (sortBy === 'title') {
        return a.title.localeCompare(b.title);
      }
      return new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime();
    });

  return (
    <div className="flex-1 flex flex-col w-full p-6 md:p-8 space-y-6 overflow-y-auto">
      
      {/* Search Header Bar (Matching Image 1) */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
        
        {/* Search Input */}
        <div className="relative w-full sm:w-96">
          <Search className="w-4 h-4 text-[#BAC095]/60 absolute left-4 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search encrypted notes..."
            className="w-full bg-[#2A2E19] border border-[#484D30] focus:border-[#8B9646] focus:outline-none rounded-xl pl-11 pr-4 py-2.5 text-sm text-[#D4DE95] placeholder-[#BAC095]/40 transition-colors font-body shadow-inner"
          />
        </div>

        {/* New Note Action Button (Matching Image 1 lime green button) */}
        <button
          onClick={onOpenNewNoteModal}
          className="glow-lime flex items-center gap-2 bg-[#8B9646] hover:bg-[#8B9646]/90 text-[#1C2010] font-bold text-sm px-5 py-2.5 rounded-xl border border-[#D4DE95]/50 transition-all duration-300 transform active:scale-95 shadow-md shrink-0"
        >
          <Plus className="w-4 h-4 text-[#1C2010]" />
          <span>New Note</span>
        </button>
      </div>

      {/* Main Title & Filter Bar (Matching Image 1) */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pt-2 pb-4 border-b border-[#484D30]/50">
        <div>
          <h1 className="font-display font-extrabold text-3xl text-[#D4DE95] tracking-tight">
            {viewMeta.title}
          </h1>
          <p className="text-sm font-body text-[#BAC095]/80 mt-1">
            {viewMeta.subtitle}
          </p>
        </div>

        {/* Sort & Filter Controls (Matching Image 1 right buttons) */}
        <div className="flex items-center gap-3">
          
          {/* Sort Dropdown / Button */}
          <button
            onClick={() => setSortBy(sortBy === 'date' ? 'title' : 'date')}
            className="flex items-center gap-1.5 bg-[#2A2E19] border border-[#484D30] hover:border-[#BAC095]/40 text-xs font-mono text-[#D4DE95] px-3.5 py-2 rounded-xl transition-all"
          >
            <ArrowUpDown className="w-3.5 h-3.5 text-[#8B9646]" />
            <span>Sort: {sortBy === 'date' ? 'Date' : 'Title'}</span>
          </button>

          {/* Filter Tag pills */}
          <div className="flex items-center gap-1.5 overflow-x-auto">
            {TAG_FILTERS.map((tag) => (
              <button
                key={tag}
                onClick={() => setSelectedTag(tag)}
                className={`px-3 py-1.5 rounded-lg text-xs font-mono border whitespace-nowrap transition-all ${
                  selectedTag === tag
                    ? 'bg-[#8B9646] border-[#D4DE95] text-[#1C2010] font-bold shadow-sm'
                    : 'bg-[#2A2E19] border-[#484D30] text-[#BAC095]/80 hover:border-[#BAC095]/40 hover:text-[#D4DE95]'
                }`}
              >
                {tag}
              </button>
            ))}
          </div>

        </div>
      </div>

      {/* Note Cards Bento Grid (Matching Image 1: 3 columns) */}
      {filteredNotes.length === 0 ? (
        <div className="bg-[#2A2E19]/80 border border-[#484D30] rounded-2xl p-12 text-center space-y-4 my-8 shadow-inner">
          <div className="w-12 h-12 rounded-2xl bg-[#3D4127] border border-[#BAC095]/20 mx-auto flex items-center justify-center text-[#D4DE95]">
            <Folder className="w-6 h-6 text-[#8B9646]" />
          </div>
          <div className="space-y-1">
            <h3 className="font-display font-bold text-lg text-[#D4DE95]">No notes found in this view</h3>
            <p className="text-sm font-body text-[#BAC095]/70 max-w-sm mx-auto">
              {searchQuery || selectedTag !== 'All'
                ? 'Try clearing your search query or selecting a different tag filter.'
                : 'Click "New Note" to record your first encrypted entry.'}
            </p>
          </div>
          <button
            onClick={onOpenNewNoteModal}
            className="glow-lime inline-flex items-center gap-2 bg-[#8B9646] text-[#1C2010] font-bold text-xs px-4 py-2.5 rounded-xl border border-[#D4DE95]/40 hover:bg-[#8B9646]/90 transition-all"
          >
            <Plus className="w-4 h-4" />
            <span>Create New Note</span>
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredNotes.map((note) => {
            const timeAgo = note.updatedAt ? new Date(note.updatedAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }) : 'Recently';

            return (
              <article
                key={note.id}
                onClick={() => onSelectNote(note)}
                className="bg-[#2A2E19] border border-[#484D30] hover:border-[#8B9646]/70 rounded-2xl p-6 flex flex-col justify-between gap-5 transition-all duration-300 hover:-translate-y-1 cursor-pointer group shadow-xl relative overflow-hidden"
              >
                {/* Top Title & Lock Indicator (Matching Image 1) */}
                <div className="space-y-3">
                  <div className="flex items-start justify-between gap-2">
                    <h2 className="font-display font-bold text-xl text-[#D4DE95] group-hover:text-white transition-colors line-clamp-2">
                      {note.title}
                    </h2>
                    <div className="shrink-0 p-1.5 rounded-lg bg-[#1C2010] border border-[#484D30] text-[#D4DE95]">
                      {note.isEncrypted ? (
                        <Lock className="w-4 h-4 text-[#8B9646]" title="AES-GCM Encrypted" />
                      ) : (
                        <Unlock className="w-4 h-4 text-[#BAC095]" title="Unencrypted" />
                      )}
                    </div>
                  </div>

                  {/* Snippet / Cipher Text Preview */}
                  <p className="font-mono text-xs text-[#BAC095]/80 line-clamp-3 leading-relaxed bg-[#1C2010]/50 p-2.5 rounded-xl border border-[#484D30]/40">
                    {note.isEncrypted && note.cipherText
                      ? `${note.cipherText.substring(0, 48)}...\n[Encrypted Block]`
                      : note.preview || note.body}
                  </p>
                </div>

                {/* Footer Badges & Actions (Matching Image 1) */}
                <div className="pt-3 border-t border-[#484D30]/60 flex items-center justify-between text-xs font-mono">
                  
                  {/* Tag badge */}
                  <div className="flex items-center gap-1.5">
                    {note.tags && note.tags[0] && (
                      <span className="px-2.5 py-0.5 rounded-md bg-[#1C2010] text-[#8B9646] text-[10px] font-bold border border-[#484D30] uppercase">
                        {note.tags[0]}
                      </span>
                    )}

                    {/* Favorite toggle star icon */}
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        onToggleFavorite?.(note.id);
                      }}
                      className="p-1 hover:text-[#D4DE95] text-[#BAC095]/60 transition-colors"
                      title={note.isFavorite ? 'Remove from favorites' : 'Mark as favorite'}
                    >
                      <Star className={`w-3.5 h-3.5 ${note.isFavorite ? 'text-amber-400 fill-amber-400' : ''}`} />
                    </button>
                  </div>

                  {/* Date String */}
                  <div className="flex items-center gap-2">
                    <span className="text-[11px] text-[#BAC095]/60">{timeAgo}</span>

                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        if (confirm('Delete this note?')) {
                          onDeleteNote(note.id);
                        }
                      }}
                      className="text-red-400 hover:text-red-300 p-1 rounded hover:bg-red-950/40 transition-colors opacity-0 group-hover:opacity-100"
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

