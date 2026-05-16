import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Check } from 'lucide-react';
import { usePulseStore } from '../store/usePulseStore';

export default function WorkspaceSwitcher() {
  const { workspaces, activeWorkspaceId, setActiveWorkspace, neonTheme } = usePulseStore();
  const [open, setOpen] = useState(false);
  const active = workspaces.find((w) => w.id === activeWorkspaceId)!;

  return (
    <div className="relative">
      <motion.button
        onClick={() => setOpen((v) => !v)}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.97 }}
        className={`flex items-center gap-2 h-7 px-2.5 rounded-lg text-xs transition-all
          ${neonTheme
            ? 'bg-white/5 hover:bg-cyan-500/10 border border-cyan-500/15 text-cyan-200'
            : 'bg-white/6 hover:bg-white/10 border border-white/8 text-white/70'
          }`}
      >
        <span
          className="w-2 h-2 rounded-full shrink-0"
          style={{ backgroundColor: active.color, boxShadow: neonTheme ? `0 0 6px ${active.color}` : undefined }}
        />
        <span className="hidden md:block max-w-[80px] truncate">{active.name}</span>
      </motion.button>

      <AnimatePresence>
        {open && (
          <>
            <div className="fixed inset-0 z-40" onClick={() => setOpen(false)} />
            <motion.div
              initial={{ opacity: 0, y: -6, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -6, scale: 0.97 }}
              transition={{ duration: 0.15 }}
              className={`absolute top-full mt-2 left-0 min-w-[160px] rounded-xl overflow-hidden z-50 border
                ${neonTheme
                  ? 'bg-black/80 backdrop-blur-xl border-cyan-500/25 shadow-[0_8px_32px_rgba(34,211,238,0.12)]'
                  : 'bg-black/70 backdrop-blur-xl border-white/10 shadow-[0_8px_32px_rgba(0,0,0,0.6)]'
                }`}
            >
              <div className="p-1.5">
                {workspaces.map((w) => (
                  <motion.button
                    key={w.id}
                    onClick={() => { setActiveWorkspace(w.id); setOpen(false); }}
                    whileHover={{ x: 2 }}
                    className={`w-full flex items-center gap-2.5 px-2.5 py-2 rounded-lg text-xs transition-colors
                      ${w.id === activeWorkspaceId
                        ? neonTheme ? 'bg-cyan-500/15 text-cyan-200' : 'bg-white/10 text-white'
                        : neonTheme ? 'text-white/50 hover:text-white/80 hover:bg-white/5' : 'text-white/50 hover:text-white/80 hover:bg-white/5'
                      }`}
                  >
                    <span
                      className="w-2 h-2 rounded-full shrink-0"
                      style={{ backgroundColor: w.color, boxShadow: neonTheme ? `0 0 4px ${w.color}` : undefined }}
                    />
                    <span className="flex-1 text-left">{w.name}</span>
                    {w.id === activeWorkspaceId && <Check size={11} />}
                  </motion.button>
                ))}
                <div className={`my-1 h-px ${neonTheme ? 'bg-cyan-500/15' : 'bg-white/8'}`} />
                <button
                  className={`w-full flex items-center gap-2.5 px-2.5 py-2 rounded-lg text-xs transition-colors
                    ${neonTheme ? 'text-white/30 hover:text-cyan-400 hover:bg-cyan-500/10' : 'text-white/30 hover:text-white/60 hover:bg-white/5'}`}
                >
                  <Plus size={12} />
                  New workspace
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
