import React from 'react';
import { Github, Globe, BookOpen, MessageSquare, Twitter, User } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="w-full bg-[#2A2D1A] border-t border-[#BAC095]/15 py-6 px-4 md:px-8 mt-auto">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-[#BAC095]/80">
        
        {/* Left branding */}
        <div className="flex items-center gap-2">
          <span className="font-display font-bold text-[#D4DE95] text-sm">Odyssey</span>
          <span className="text-[#BAC095]/40">•</span>
          <span>Encrypted Aptos & Shelby Journal</span>
        </div>

        {/* Links row */}
        <div className="flex flex-wrap items-center justify-center gap-6">
          
          {/* Built by Bilal */}
          <div className="flex items-center gap-2 bg-[#3D4127] px-3 py-1.5 rounded-full border border-[#BAC095]/20">
            <span className="flex items-center gap-1.5 font-medium text-[#D4DE95]">
              <User className="w-3.5 h-3.5 text-[#D4DE95]" />
              Built by Bilal
            </span>
            <div className="flex items-center gap-1.5 ml-1 border-l border-[#BAC095]/20 pl-2">
              <a
                href="https://github.com/0xbilal2"
                target="_blank"
                rel="noreferrer"
                title="Bilal GitHub"
                className="hover:text-[#D4DE95] transition-colors p-1"
              >
                <Github className="w-3.5 h-3.5" />
              </a>
              <a
                href="https://x.com/0xBilal2"
                target="_blank"
                rel="noreferrer"
                title="Bilal X (Twitter)"
                className="hover:text-[#D4DE95] transition-colors p-1"
              >
                <Twitter className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>

          {/* Built on Shelby Network */}
          <div className="flex items-center gap-2 bg-[#3D4127] px-3 py-1.5 rounded-full border border-[#BAC095]/20">
            <span className="font-medium text-[#BAC095]">Shelby Network:</span>
            <div className="flex items-center gap-2">
              <a
                href="https://shelby.xyz"
                target="_blank"
                rel="noreferrer"
                title="Shelby Website"
                className="hover:text-[#D4DE95] transition-colors p-1"
              >
                <Globe className="w-3.5 h-3.5" />
              </a>
              <a
                href="https://docs.shelby.xyz"
                target="_blank"
                rel="noreferrer"
                title="Shelby Docs"
                className="hover:text-[#D4DE95] transition-colors p-1"
              >
                <BookOpen className="w-3.5 h-3.5" />
              </a>
              <a
                href="https://github.com/shelby"
                target="_blank"
                rel="noreferrer"
                title="Shelby GitHub"
                className="hover:text-[#D4DE95] transition-colors p-1"
              >
                <Github className="w-3.5 h-3.5" />
              </a>
              <a
                href="https://discord.gg/shelbyserves"
                target="_blank"
                rel="noreferrer"
                title="Shelby Discord"
                className="hover:text-[#D4DE95] transition-colors p-1"
              >
                <MessageSquare className="w-3.5 h-3.5" />
              </a>
              <a
                href="https://x.com/shelbyserves"
                target="_blank"
                rel="noreferrer"
                title="Shelby X (Twitter)"
                className="hover:text-[#D4DE95] transition-colors p-1"
              >
                <Twitter className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>

        </div>
      </div>
    </footer>
  );
};
