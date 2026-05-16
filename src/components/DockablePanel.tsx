import { useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, GripVertical } from 'lucide-react';
import { usePulseStore } from '../store/usePulseStore';
import DiscordPanel from './panels/DiscordPanel';
import SpotifyPanel from './panels/SpotifyPanel';
import AIPanel from './panels/AIPanel';

const panelMeta = {
  discord: { title: 'Discord', icon: '💬', color: '#5865F2' },
  spotify: { title: 'Spotify', icon: '🎵', color: '#1DB954' },
  youtube: { title: 'YouTube Music', icon: '🎬', color: '#FF0000' },
  ai: { title: 'Pulse AI', icon: '✨', color: '#22d3ee' },
};

export default function DockablePanel() {
  const { openPanel, setOpenPanel, panelWidth, setPanelWidth, neonTheme } = usePulseStore();
  const resizing = useRef(false);
  const startX = useRef(0);
  const startW = useRef(0);

  const onMouseDown = useCallback(
    (e: React.MouseEvent) => {
      resizing.current = true;
      startX.current = e.clientX;
      startW.current = panelWidth;

      const onMove = (ev: MouseEvent) => {
        if (!resizing.current) return;
        const delta = startX.current - ev.clientX;
        setPanelWidth(startW.current + delta);
      };
      const onUp = () => {
        resizing.current = false;
        window.removeEventListener('mousemove', onMove);
        window.removeEventListener('mouseup', onUp);
      };
      window.addEventListener('mousemove', onMove);
      window.addEventListener('mouseup', onUp);
    },
    [panelWidth, setPanelWidth]
  );

  const meta = openPanel ? panelMeta[openPanel as keyof typeof panelMeta] : null;

  return (
    <AnimatePresence>
      {openPanel && meta && (
        <motion.div
          key={openPanel}
          initial={{ width: 0, opacity: 0 }}
          animate={{ width: panelWidth, opacity: 1 }}
          exit={{ width: 0, opacity: 0 }}
          transition={{ type: 'spring', stiffness: 300, damping: 30 }}
          className={`relative flex flex-col h-full shrink-0 overflow-hidden border-l
            ${neonTheme
              ? 'bg-black/50 border-cyan-500/20 shadow-[-4px_0_30px_rgba(34,211,238,0.06)]'
              : 'bg-black/35 border-white/8'
            }
            backdrop-blur-xl`}
          style={{ width: panelWidth, minWidth: 240, maxWidth: 600 }}
        >
          {/* Resize handle */}
          <div
            onMouseDown={onMouseDown}
            className="absolute left-0 top-0 bottom-0 w-1.5 cursor-col-resize z-10 group flex items-center justify-center"
          >
            <div className={`w-0.5 h-12 rounded-full transition-colors group-hover:opacity-80
              ${neonTheme ? 'bg-cyan-500/30 group-hover:bg-cyan-400/60' : 'bg-white/10 group-hover:bg-white/25'}`} />
            <GripVertical
              size={14}
              className={`absolute opacity-0 group-hover:opacity-40 transition-opacity
                ${neonTheme ? 'text-cyan-400' : 'text-white'}`}
            />
          </div>

          {/* Panel header */}
          <div className={`flex items-center gap-2.5 px-4 py-3 border-b shrink-0
            ${neonTheme ? 'border-cyan-500/15' : 'border-white/8'}`}>
            <span className="text-base">{meta.icon}</span>
            <span
              className={`text-sm font-semibold ${neonTheme ? 'text-cyan-200' : 'text-white/80'}`}
              style={!neonTheme ? { color: meta.color } : undefined}
            >
              {meta.title}
            </span>
            <div
              className="w-1.5 h-1.5 rounded-full ml-1 animate-pulse"
              style={{ backgroundColor: neonTheme ? '#22d3ee' : meta.color, boxShadow: `0 0 4px ${meta.color}` }}
            />
            <motion.button
              onClick={() => setOpenPanel(null)}
              whileHover={{ scale: 1.15, rotate: 90 }}
              whileTap={{ scale: 0.9 }}
              transition={{ duration: 0.15 }}
              className={`ml-auto transition-colors ${neonTheme ? 'text-white/30 hover:text-cyan-300' : 'text-white/30 hover:text-white/70'}`}
            >
              <X size={15} />
            </motion.button>
          </div>

          {/* Panel content */}
          <div className="flex-1 overflow-hidden">
            {openPanel === 'discord' && <DiscordPanel />}
            {openPanel === 'spotify' && <SpotifyPanel />}
            {openPanel === 'ai' && <AIPanel />}
            {openPanel === 'youtube' && (
              <div className="flex flex-col items-center justify-center h-full gap-3 text-center p-6">
                <div className={`w-16 h-16 rounded-2xl flex items-center justify-center text-3xl
                  ${neonTheme ? 'bg-red-500/15 shadow-[0_0_20px_rgba(239,68,68,0.2)]' : 'bg-red-500/10'}`}>
                  🎬
                </div>
                <p className={`text-sm font-medium ${neonTheme ? 'text-cyan-200' : 'text-white/70'}`}>YouTube Music</p>
                <p className={`text-xs ${neonTheme ? 'text-white/30' : 'text-white/35'}`}>Connect your account to start listening</p>
                <motion.button
                  whileHover={{ scale: 1.04 }}
                  whileTap={{ scale: 0.96 }}
                  className="px-4 py-2 rounded-lg text-xs font-medium bg-red-500/20 text-red-400 border border-red-500/25 hover:bg-red-500/30 transition-colors"
                >
                  Connect Account
                </motion.button>
              </div>
            )}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
