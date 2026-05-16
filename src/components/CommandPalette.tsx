import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, ArrowRight, Clock, Globe, Settings, Zap, Music, MessageCircle } from 'lucide-react';
import { usePulseStore } from '../store/usePulseStore';

interface Command {
  id: string;
  label: string;
  description?: string;
  icon: React.ElementType;
  shortcut?: string;
  action: () => void;
  category: string;
}

export default function CommandPalette() {
  const { commandPaletteOpen, toggleCommandPalette, addTab, setOpenPanel, neonTheme } = usePulseStore();
  const [query, setQuery] = useState('');
  const [activeIdx, setActiveIdx] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);

  const commands: Command[] = [
    { id: 'newtab', label: 'New Tab', description: 'Open a new browser tab', icon: Globe, shortcut: '⌘T', category: 'Browser', action: () => { addTab(); toggleCommandPalette(); } },
    { id: 'discord', label: 'Open Discord', description: 'Toggle Discord panel', icon: MessageCircle, category: 'Apps', action: () => { setOpenPanel('discord'); toggleCommandPalette(); } },
    { id: 'spotify', label: 'Open Spotify', description: 'Toggle Spotify panel', icon: Music, category: 'Apps', action: () => { setOpenPanel('spotify'); toggleCommandPalette(); } },
    { id: 'settings', label: 'Settings', description: 'Open browser settings', icon: Settings, shortcut: '⌘,', category: 'Browser', action: () => { usePulseStore.getState().setSettingsOpen(true); toggleCommandPalette(); } },
    { id: 'neon', label: 'Toggle Neon Theme', description: 'Switch between minimal and neon', icon: Zap, category: 'Appearance', action: () => { usePulseStore.getState().toggleNeonTheme(); toggleCommandPalette(); } },
    { id: 'github', label: 'Go to GitHub', icon: Globe, description: 'Navigate to github.com', category: 'Navigation', action: () => { addTab({ title: 'GitHub', url: 'https://github.com', favicon: '🐙' }); toggleCommandPalette(); } },
    { id: 'linear', label: 'Go to Linear', icon: Globe, description: 'Navigate to linear.app', category: 'Navigation', action: () => { addTab({ title: 'Linear', url: 'https://linear.app', favicon: '📋' }); toggleCommandPalette(); } },
  ];

  const filtered = query
    ? commands.filter(
        (c) =>
          c.label.toLowerCase().includes(query.toLowerCase()) ||
          c.description?.toLowerCase().includes(query.toLowerCase()) ||
          c.category.toLowerCase().includes(query.toLowerCase())
      )
    : commands;

  useEffect(() => {
    if (commandPaletteOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
      setQuery('');
      setActiveIdx(0);
    }
  }, [commandPaletteOpen]);

  useEffect(() => {
    setActiveIdx(0);
  }, [query]);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        toggleCommandPalette();
      }
      if (!commandPaletteOpen) return;
      if (e.key === 'Escape') toggleCommandPalette();
      if (e.key === 'ArrowDown') { e.preventDefault(); setActiveIdx((i) => Math.min(i + 1, filtered.length - 1)); }
      if (e.key === 'ArrowUp') { e.preventDefault(); setActiveIdx((i) => Math.max(i - 1, 0)); }
      if (e.key === 'Enter') { e.preventDefault(); filtered[activeIdx]?.action(); }
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [commandPaletteOpen, filtered, activeIdx, toggleCommandPalette]);

  const categories = [...new Set(filtered.map((c) => c.category))];

  return (
    <AnimatePresence>
      {commandPaletteOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.15 }}
            className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm"
            onClick={toggleCommandPalette}
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: -12 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: -12 }}
            transition={{ duration: 0.18, ease: [0.16, 1, 0.3, 1] }}
            className={`fixed top-[20%] left-1/2 -translate-x-1/2 z-50 w-full max-w-[520px] rounded-2xl overflow-hidden border shadow-2xl
              ${neonTheme
                ? 'bg-black/80 border-cyan-500/30 shadow-[0_20px_60px_rgba(34,211,238,0.15)]'
                : 'bg-black/75 border-white/12 shadow-[0_20px_60px_rgba(0,0,0,0.8)]'
              }
              backdrop-blur-2xl`}
          >
            {/* Search input */}
            <div className={`flex items-center gap-3 px-4 py-3.5 border-b
              ${neonTheme ? 'border-cyan-500/20' : 'border-white/8'}`}>
              <Search size={16} className={neonTheme ? 'text-cyan-400 shrink-0' : 'text-white/40 shrink-0'} />
              <input
                ref={inputRef}
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search commands, tabs, apps..."
                className={`flex-1 bg-transparent text-sm outline-none
                  ${neonTheme ? 'text-cyan-100 placeholder:text-white/30' : 'text-white/85 placeholder:text-white/30'}`}
              />
              <kbd className={`text-xs px-1.5 py-0.5 rounded border font-mono
                ${neonTheme ? 'border-cyan-500/25 text-cyan-500/60 bg-cyan-500/5' : 'border-white/12 text-white/25 bg-white/5'}`}>
                ESC
              </kbd>
            </div>

            {/* Results */}
            <div className="max-h-[320px] overflow-y-auto py-2 scrollbar-none">
              {filtered.length === 0 ? (
                <div className="flex flex-col items-center py-8 gap-2">
                  <Clock size={20} className={neonTheme ? 'text-white/20' : 'text-white/20'} />
                  <p className={`text-sm ${neonTheme ? 'text-white/30' : 'text-white/30'}`}>No results found</p>
                </div>
              ) : (
                categories.map((cat) => {
                  const catCmds = filtered.filter((c) => c.category === cat);
                  return (
                    <div key={cat}>
                      <p className={`px-4 py-1.5 text-xs uppercase tracking-wider font-semibold
                        ${neonTheme ? 'text-white/25' : 'text-white/25'}`}>
                        {cat}
                      </p>
                      {catCmds.map((cmd) => {
                        const globalIdx = filtered.indexOf(cmd);
                        const Icon = cmd.icon;
                        return (
                          <motion.button
                            key={cmd.id}
                            onClick={cmd.action}
                            onMouseEnter={() => setActiveIdx(globalIdx)}
                            className={`w-full flex items-center gap-3 px-4 py-2.5 transition-all
                              ${globalIdx === activeIdx
                                ? neonTheme
                                  ? 'bg-cyan-500/15 text-cyan-200'
                                  : 'bg-white/8 text-white'
                                : neonTheme ? 'text-white/60' : 'text-white/60'
                              }`}
                          >
                            <div className={`w-7 h-7 rounded-lg flex items-center justify-center shrink-0 transition-colors
                              ${globalIdx === activeIdx
                                ? neonTheme ? 'bg-cyan-500/20' : 'bg-white/10'
                                : neonTheme ? 'bg-white/5' : 'bg-white/5'
                              }`}>
                              <Icon size={14} />
                            </div>
                            <div className="flex-1 text-left min-w-0">
                              <p className="text-sm font-medium">{cmd.label}</p>
                              {cmd.description && (
                                <p className={`text-xs truncate ${neonTheme ? 'text-white/30' : 'text-white/30'}`}>
                                  {cmd.description}
                                </p>
                              )}
                            </div>
                            <div className="flex items-center gap-1.5 shrink-0">
                              {cmd.shortcut && (
                                <kbd className={`text-xs px-1.5 py-0.5 rounded border font-mono
                                  ${neonTheme ? 'border-cyan-500/20 text-cyan-500/50 bg-cyan-500/5' : 'border-white/10 text-white/25 bg-white/5'}`}>
                                  {cmd.shortcut}
                                </kbd>
                              )}
                              {globalIdx === activeIdx && (
                                <ArrowRight size={12} className={neonTheme ? 'text-cyan-400' : 'text-white/40'} />
                              )}
                            </div>
                          </motion.button>
                        );
                      })}
                    </div>
                  );
                })
              )}
            </div>

            {/* Footer */}
            <div className={`flex items-center justify-between px-4 py-2 border-t
              ${neonTheme ? 'border-cyan-500/15' : 'border-white/6'}`}>
              <div className="flex items-center gap-3">
                {[['↑↓', 'Navigate'], ['↵', 'Select'], ['ESC', 'Close']].map(([key, label]) => (
                  <div key={key} className="flex items-center gap-1">
                    <kbd className={`text-xs px-1.5 py-0.5 rounded border font-mono
                      ${neonTheme ? 'border-cyan-500/20 text-cyan-500/50 bg-cyan-500/5' : 'border-white/10 text-white/20 bg-white/5'}`}>
                      {key}
                    </kbd>
                    <span className={`text-xs ${neonTheme ? 'text-white/20' : 'text-white/20'}`}>{label}</span>
                  </div>
                ))}
              </div>
              <span className={`text-xs ${neonTheme ? 'text-cyan-500/40' : 'text-white/20'}`}>
                {filtered.length} result{filtered.length !== 1 ? 's' : ''}
              </span>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
