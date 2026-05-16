import { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Sidebar from './components/Sidebar';
import TopBar from './components/TopBar';
import BrowserContent from './components/BrowserContent';
import DockablePanel from './components/DockablePanel';
import CommandPalette from './components/CommandPalette';
import SettingsModal from './components/SettingsModal';
import { usePulseStore } from './store/usePulseStore';

function NeonGrid() {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `
            linear-gradient(rgba(34,211,238,0.5) 1px, transparent 1px),
            linear-gradient(90deg, rgba(34,211,238,0.5) 1px, transparent 1px)
          `,
          backgroundSize: '40px 40px',
        }}
      />
      <div className="absolute top-0 left-1/4 w-px h-full bg-gradient-to-b from-transparent via-cyan-500/10 to-transparent" />
      <div className="absolute top-0 right-1/3 w-px h-full bg-gradient-to-b from-transparent via-cyan-500/8 to-transparent" />
    </div>
  );
}

export default function App() {
  const { neonTheme } = usePulseStore();

  useEffect(() => {
    document.title = 'Pulse Browser';
  }, []);

  return (
    <div
      className="w-screen h-screen overflow-hidden flex flex-col relative select-none"
      style={{
        background: neonTheme
          ? 'radial-gradient(ellipse at 20% 0%, rgba(8,145,178,0.08) 0%, transparent 50%), radial-gradient(ellipse at 80% 100%, rgba(6,182,212,0.06) 0%, transparent 50%), #030303'
          : 'radial-gradient(ellipse at 20% 0%, rgba(255,255,255,0.02) 0%, transparent 50%), #050505',
      }}
    >
      {/* Background noise texture */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.015]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
        }}
      />

      {/* Neon decorative grid */}
      <AnimatePresence>
        {neonTheme && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="absolute inset-0 pointer-events-none"
          >
            <NeonGrid />
            <div className="absolute top-0 left-0 w-96 h-96 rounded-full bg-cyan-500/4 blur-3xl pointer-events-none" />
            <div className="absolute bottom-0 right-1/4 w-64 h-64 rounded-full bg-blue-500/5 blur-3xl pointer-events-none" />
          </motion.div>
        )}
      </AnimatePresence>

      {/* macOS-style title bar */}
      <div className="h-8 shrink-0 flex items-center px-4 gap-3">
        <div className="flex gap-1.5 z-10">
          {['bg-red-500/70', 'bg-yellow-500/70', 'bg-green-500/70'].map((c, i) => (
            <div key={i} className={`w-2.5 h-2.5 rounded-full ${c} hover:opacity-100 opacity-70 transition-opacity cursor-pointer`} />
          ))}
        </div>
        <div className={`flex-1 text-center text-xs font-medium pointer-events-none ${neonTheme ? 'text-cyan-500/30' : 'text-white/15'}`}>
          Pulse
        </div>
      </div>

      {/* Main layout */}
      <div className="flex flex-1 overflow-hidden">
        <Sidebar />

        {/* Center column */}
        <div className="flex flex-col flex-1 overflow-hidden min-w-0">
          <TopBar />
          <BrowserContent />
        </div>

        {/* Dockable side panel */}
        <DockablePanel />
      </div>

      {/* Overlays */}
      <CommandPalette />
      <SettingsModal />

      {/* Neon indicator badge */}
      <AnimatePresence>
        {neonTheme && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="fixed bottom-4 right-4 pointer-events-none z-30"
          >
            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-black/60 border border-cyan-500/30 backdrop-blur-sm shadow-[0_0_12px_rgba(34,211,238,0.2)]">
              <div className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse shadow-[0_0_4px_rgba(34,211,238,0.8)]" />
              <span className="text-xs text-cyan-400/80 font-medium tracking-widest">NEON</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
