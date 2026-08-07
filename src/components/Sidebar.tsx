import React from 'react';
import { FileText, Clock, Star, Folder, LogOut, Plus } from 'lucide-react';
import { useWallet } from '@aptos-labs/wallet-adapter-react';
import { ActiveNavView } from '../types';

interface SidebarProps {
  activeNav: ActiveNavView;
  onNavigate: (nav: ActiveNavView) => void;
  onOpenNewNote: () => void;
  notesCount: number;
  favoritesCount: number;
}

export const Sidebar: React.FC<SidebarProps> = ({
  activeNav,
  onNavigate,
  onOpenNewNote,
  notesCount,
  favoritesCount,
}) => {
  const { account, disconnect } = useWallet();

  const formattedWallet = account?.address
    ? `${account.address.toString().substring(0, 6)}...${account.address.toString().substring(account.address.toString().length - 4)}`
    : '0x7a...4f2d';

  const navItems = [
    { id: 'all' as ActiveNavView, label: 'All Notes', icon: FileText, count: notesCount },
    { id: 'recent' as ActiveNavView, label: 'Recent', icon: Clock },
    { id: 'favorites' as ActiveNavView, label: 'Favorites', icon: Star, count: favoritesCount },
  ];

  const folderItems = [
    { id: 'work' as ActiveNavView, label: 'Work', icon: Folder },
    { id: 'personal' as ActiveNavView, label: 'Personal', icon: Folder },
    { id: 'research' as ActiveNavView, label: 'Research', icon: Folder },
  ];

  return (
    <aside className="w-64 bg-[#262A19] border-r border-[#484D30]/60 flex flex-col justify-between shrink-0 min-h-screen text-[#BAC095] select-none p-4">
      
      {/* Top Header & Logo */}
      <div className="space-y-6">
        <div className="flex items-center gap-3 px-2 pt-2">
          <span className="font-display font-extrabold text-2xl text-[#D4DE95] tracking-tight">
            Odyssey
          </span>
        </div>

        {/* Main Nav Section */}
        <div className="space-y-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeNav === item.id;

            return (
              <button
                key={item.id}
                onClick={() => onNavigate(item.id)}
                className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-sm font-medium transition-all ${
                  isActive
                    ? 'bg-[#3D4127] text-[#D4DE95] font-semibold border border-[#BAC095]/20 shadow-inner'
                    : 'text-[#BAC095]/80 hover:bg-[#31341F] hover:text-[#D4DE95]'
                }`}
              >
                <div className="flex items-center gap-3">
                  <Icon className={`w-4 h-4 ${isActive ? 'text-[#D4DE95]' : 'text-[#BAC095]/70'}`} />
                  <span>{item.label}</span>
                </div>
                {item.count !== undefined && item.count > 0 && (
                  <span className="text-xs font-mono bg-[#1C2010] text-[#D4DE95] px-2 py-0.5 rounded-full border border-[#BAC095]/10">
                    {item.count}
                  </span>
                )}
              </button>
            );
          })}
        </div>

        {/* Folders Section */}
        <div className="pt-3 border-t border-[#484D30]/40 space-y-2">
          <div className="px-3 text-[11px] font-mono tracking-wider text-[#BAC095]/60 uppercase">
            Folders
          </div>

          <div className="space-y-1">
            {folderItems.map((folder) => {
              const Icon = folder.icon;
              const isActive = activeNav === folder.id;

              return (
                <button
                  key={folder.id}
                  onClick={() => onNavigate(folder.id)}
                  className={`w-full flex items-center gap-3 px-3 py-2 rounded-xl text-sm font-medium transition-all ${
                    isActive
                      ? 'bg-[#3D4127] text-[#D4DE95] font-semibold border border-[#BAC095]/20'
                      : 'text-[#BAC095]/80 hover:bg-[#31341F] hover:text-[#D4DE95]'
                  }`}
                >
                  <Icon className={`w-4 h-4 ${isActive ? 'text-[#D4DE95]' : 'text-[#BAC095]/60'}`} />
                  <span>{folder.label}</span>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Bottom Profile / Wallet Bar */}
      <div className="pt-4 border-t border-[#484D30]/40">
        <div className="bg-[#1C2010] border border-[#484D30]/60 rounded-xl p-2.5 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-[#8B9646] animate-pulse"></span>
            <span className="font-mono text-xs text-[#D4DE95] font-semibold tracking-wide">
              {formattedWallet}
            </span>
          </div>
          <button
            onClick={() => disconnect()}
            title="Disconnect Wallet"
            className="p-1 hover:bg-[#3D4127] text-[#BAC095] hover:text-red-300 rounded-lg transition-colors"
          >
            <LogOut className="w-4 h-4" />
          </button>
        </div>
      </div>

    </aside>
  );
};
