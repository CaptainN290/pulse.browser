import { motion, AnimatePresence } from 'framer-motion';
import { X, Monitor, Zap, Layout, Bell, Shield, Palette } from 'lucide-react';
import { usePulseStore } from '../store/usePulseStore';

const sections = [
  { id: 'appearance', label: 'Appearance', icon: Palette },
  { id: 'layout', label: 'Layout', icon: Layout },
  { id: 'notifications', label: 'Notifications', icon: Bell },
  { id: 'privacy', label: 'Privacy', icon: Shield },
  { id: 'about', label: 'About', icon: Monitor },
];

export default function SettingsModal() {
  const { settingsOpen, setSettingsOpen, neonTheme, toggleNeonTheme } = usePulseStore();

  return (
    <AnimatePresence>
      {settingsOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm"
            onClick={() => setSettingsOpen(false)}
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className={`fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-50 w-[560px] max-h-[70vh] rounded-2xl overflow-hidden border shadow-2xl
              ${neonTheme
                ? 'bg-black/85 border-cyan-500/25 shadow-[0_20px_60px_rgba(34,211,238,0.12)]'
                : 'bg-black/80 border-white/10 shadow-[0_20px_60px_rgba(0,0,0,0.8)]'
              }
              backdrop-blur-2xl`}
          >
            {/* Header */}
            <div className={`flex items-center justify-between px-6 py-4 border-b
              ${neonTheme ? 'border-cyan-500/20' : 'border-white/8'}`}>
              <h2 className={`text-sm font-semibold ${neonTheme ? 'text-cyan-200' : 'text-white/80'}`}>Settings</h2>
              <motion.button
                onClick={() => setSettingsOpen(false)}
                whileHover={{ scale: 1.15, rotate: 90 }}
                whileTap={{ scale: 0.9 }}
                transition={{ duration: 0.15 }}
                className={neonTheme ? 'text-white/30 hover:text-cyan-300' : 'text-white/30 hover:text-white/70'}
              >
                <X size={16} />
              </motion.button>
            </div>

            <div className="flex h-[calc(70vh-57px)]">
              {/* Sidebar */}
              <div className={`w-44 shrink-0 border-r py-3 ${neonTheme ? 'border-cyan-500/15' : 'border-white/8'}`}>
                {sections.map((s) => {
                  const Icon = s.icon;
                  return (
                    <motion.button
                      key={s.id}
                      whileHover={{ x: 2 }}
                      className={`w-full flex items-center gap-2.5 px-4 py-2.5 text-left transition-colors
                        ${s.id === 'appearance'
                          ? neonTheme ? 'bg-cyan-500/10 text-cyan-200' : 'bg-white/8 text-white/80'
                          : neonTheme ? 'text-white/40 hover:text-white/70 hover:bg-white/5' : 'text-white/40 hover:text-white/70 hover:bg-white/5'
                        }`}
                    >
                      <Icon size={14} />
                      <span className="text-xs font-medium">{s.label}</span>
                    </motion.button>
                  );
                })}
              </div>

              {/* Content */}
              <div className="flex-1 overflow-y-auto p-6 scrollbar-none">
                <h3 className={`text-sm font-semibold mb-5 ${neonTheme ? 'text-cyan-200' : 'text-white/70'}`}>Appearance</h3>

                {/* Theme toggle */}
                <div className="mb-6">
                  <p className={`text-xs font-medium mb-3 ${neonTheme ? 'text-white/50' : 'text-white/50'}`}>Theme Mode</p>
                  <div className="grid grid-cols-2 gap-2.5">
                    {[
                      { label: 'Minimal', value: false, desc: 'Clean black & white', icon: Monitor },
                      { label: 'Neon', value: true, desc: 'Retro neon glow', icon: Zap },
                    ].map((theme) => (
                      <motion.button
                        key={theme.label}
                        onClick={() => { if (theme.value !== neonTheme) toggleNeonTheme(); }}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.97 }}
                        className={`flex flex-col items-start gap-2 p-3.5 rounded-xl border transition-all
                          ${neonTheme === theme.value
                            ? neonTheme
                              ? 'bg-cyan-500/15 border-cyan-500/30 shadow-[0_0_12px_rgba(34,211,238,0.1)]'
                              : 'bg-white/10 border-white/20'
                            : neonTheme
                              ? 'bg-white/3 border-white/8 hover:bg-white/6'
                              : 'bg-white/3 border-white/8 hover:bg-white/6'
                          }`}
                      >
                        <theme.icon size={16} className={neonTheme === theme.value
                          ? neonTheme ? 'text-cyan-300' : 'text-white'
                          : neonTheme ? 'text-white/30' : 'text-white/30'} />
                        <div>
                          <p className={`text-xs font-medium ${neonTheme === theme.value
                            ? neonTheme ? 'text-cyan-200' : 'text-white'
                            : neonTheme ? 'text-white/45' : 'text-white/45'}`}>{theme.label}</p>
                          <p className={`text-xs ${neonTheme ? 'text-white/25' : 'text-white/25'}`}>{theme.desc}</p>
                        </div>
                      </motion.button>
                    ))}
                  </div>
                </div>

                {/* Font size */}
                <div className="mb-6">
                  <p className={`text-xs font-medium mb-3 ${neonTheme ? 'text-white/50' : 'text-white/50'}`}>Interface Scale</p>
                  <div className="flex gap-1.5">
                    {['S', 'M', 'L', 'XL'].map((s, i) => (
                      <motion.button
                        key={s}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className={`flex-1 py-2 rounded-lg text-xs font-medium border transition-all
                          ${i === 1
                            ? neonTheme ? 'bg-cyan-500/15 border-cyan-500/30 text-cyan-200' : 'bg-white/10 border-white/20 text-white'
                            : neonTheme ? 'bg-white/3 border-white/8 text-white/40 hover:bg-white/6' : 'bg-white/3 border-white/8 text-white/40 hover:bg-white/6'
                          }`}
                      >
                        {s}
                      </motion.button>
                    ))}
                  </div>
                </div>

                {/* Toggles */}
                <div className="space-y-3">
                  {[
                    { label: 'Blur effects', desc: 'Glassmorphism backgrounds', on: true },
                    { label: 'Animations', desc: 'Smooth transitions', on: true },
                    { label: 'Compact mode', desc: 'Reduce padding', on: false },
                  ].map((toggle) => (
                    <div key={toggle.label} className="flex items-center justify-between">
                      <div>
                        <p className={`text-xs font-medium ${neonTheme ? 'text-white/60' : 'text-white/60'}`}>{toggle.label}</p>
                        <p className={`text-xs ${neonTheme ? 'text-white/25' : 'text-white/25'}`}>{toggle.desc}</p>
                      </div>
                      <motion.button
                        whileTap={{ scale: 0.9 }}
                        className={`relative w-9 h-5 rounded-full transition-colors
                          ${toggle.on
                            ? neonTheme ? 'bg-cyan-500/70 shadow-[0_0_8px_rgba(34,211,238,0.4)]' : 'bg-white/70'
                            : neonTheme ? 'bg-white/10' : 'bg-white/10'
                          }`}
                      >
                        <motion.div
                          animate={{ x: toggle.on ? 16 : 2 }}
                          transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                          className="absolute top-0.5 w-4 h-4 bg-white rounded-full shadow"
                        />
                      </motion.button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
