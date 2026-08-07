import React from 'react';
import { Github, Globe, BookOpen, Twitter, User } from 'lucide-react';
import logoUrl from '../assets/logo.jpg';

interface FooterProps {
  onNavigate?: (page: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  return (
    <footer className="w-full bg-[#2A2D1A] border-t border-[#BAC095]/15 py-6 px-4 md:px-8 mt-auto">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-[#BAC095]/80">
        
        {/* Left branding with Logo */}
        <div className="flex items-center gap-2.5">
          <img 
            src={logoUrl} 
            alt="Odyssey Logo" 
            onError={(e) => { (e.target as HTMLImageElement).src = '/logo.jpg'; }}
            className="w-6 h-6 rounded-md object-cover border border-[#BAC095]/30 shadow-sm"
          />
          <span className="font-display font-bold text-[#D4DE95] text-sm">Odyssey</span>
          <span className="text-[#BAC095]/40">•</span>
          <span>© 2024 Odyssey Protocol. Securely encrypted.</span>
        </div>

        {/* Links row */}
        <div className="flex flex-wrap items-center justify-center gap-6">
          
          {/* Navigation links */}
          <div className="flex items-center gap-4 text-xs font-medium">
            <button 
              onClick={() => onNavigate?.('features')} 
              className="hover:text-[#D4DE95] transition-colors"
            >
              Whitepaper
            </button>
            <a 
              href="https://github.com/0xbilal2" 
              target="_blank" 
              rel="noreferrer" 
              className="hover:text-[#D4DE95] transition-colors"
            >
              Github
            </a>
            <button 
              onClick={() => onNavigate?.('security')} 
              className="hover:text-[#D4DE95] transition-colors"
            >
              Privacy
            </button>
            <button 
              onClick={() => onNavigate?.('pricing')} 
              className="hover:text-[#D4DE95] transition-colors"
            >
              Terms
            </button>
          </div>

          {/* Built by Bilal */}
          <div className="flex items-center gap-2 bg-[#3D4127] px-3 py-1 rounded-full border border-[#BAC095]/20">
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
                className="hover:text-[#D4DE95] transition-colors p-0.5"
              >
                <Github className="w-3.5 h-3.5" />
              </a>
              <a
                href="https://x.com/0xBilal2"
                target="_blank"
                rel="noreferrer"
                title="Bilal X (Twitter)"
                className="hover:text-[#D4DE95] transition-colors p-0.5"
              >
                <Twitter className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>

          {/* Built on Shelby Network */}
          <div className="flex items-center gap-2 bg-[#3D4127] px-3 py-1 rounded-full border border-[#BAC095]/20">
            <span className="font-medium text-[#BAC095]">Shelby Network:</span>
            <div className="flex items-center gap-2">
              <a
                href="https://shelby.xyz"
                target="_blank"
                rel="noreferrer"
                title="Shelby Website"
                className="hover:text-[#D4DE95] transition-colors p-0.5"
              >
                <Globe className="w-3.5 h-3.5" />
              </a>
              <a
                href="https://docs.shelby.xyz"
                target="_blank"
                rel="noreferrer"
                title="Shelby Docs"
                className="hover:text-[#D4DE95] transition-colors p-0.5"
              >
                <BookOpen className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>

        </div>
      </div>
    </footer>
  );
};
