import { motion, AnimatePresence } from 'framer-motion';
import { X, Plus } from 'lucide-react';
import { usePulseStore } from '../store/usePulseStore';

export default function TabBar() {
  const { tabs, activeTabId, setActiveTab, closeTab, addTab, neonTheme } = usePulseStore();

  return (
    <div className="flex items-center gap-1 px-2 h-9 overflow-x-auto scrollbar-none">
      <AnimatePresence initial={false}>
        {tabs.map((tab) => {
          const isActive = tab.id === activeTabId;
          return (
            <motion.div
              key={tab.id}
              initial={{ opacity: 0, scale: 0.85, width: 0 }}
              animate={{ opacity: 1, scale: 1, width: 'auto' }}
              exit={{ opacity: 0, scale: 0.85, width: 0 }}
              transition={{ duration: 0.18, ease: 'easeOut' }}
              onClick={() => setActiveTab(tab.id)}
              className={`relative flex items-center gap-2 px-3 h-7 rounded-lg cursor-pointer group shrink-0 max-w-[160px] min-w-[80px] select-none transition-all duration-150
                ${isActive
                  ? neonTheme
                    ? 'bg-cyan-500/15 shadow-[0_0_8px_1px_rgba(34,211,238,0.25)] border border-cyan-500/30'
                    : 'bg-white/15 border border-white/15'
                  : neonTheme
                    ? 'hover:bg-white/5 border border-transparent'
                    : 'hover:bg-white/8 border border-transparent'
                }`}
            >
              <span className="text-xs shrink-0">{tab.favicon}</span>
              <span
                className={`text-xs truncate flex-1 transition-colors duration-150
                  ${isActive
                    ? neonTheme ? 'text-cyan-200' : 'text-white/90'
                    : neonTheme ? 'text-white/40 group-hover:text-white/60' : 'text-white/40 group-hover:text-white/70'
                  }`}
              >
                {tab.title}
              </span>
              {tabs.length > 1 && (
                <motion.button
                  onClick={(e) => { e.stopPropagation(); closeTab(tab.id); }}
                  whileHover={{ scale: 1.2 }}
                  whileTap={{ scale: 0.9 }}
                  className="opacity-0 group-hover:opacity-100 transition-opacity ml-auto shrink-0"
                >
                  <X size={11} className="text-white/60 hover:text-white" />
                </motion.button>
              )}
            </motion.div>
          );
        })}
      </AnimatePresence>

      <motion.button
        onClick={() => addTab()}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        className={`w-7 h-7 rounded-lg flex items-center justify-center shrink-0 transition-all
          ${neonTheme ? 'hover:bg-cyan-500/15 text-white/40 hover:text-cyan-300' : 'hover:bg-white/10 text-white/40 hover:text-white/80'}`}
      >
        <Plus size={14} />
      </motion.button>
    </div>
  );
}
