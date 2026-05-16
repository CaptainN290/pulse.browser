import TabBar from './TabBar';
import AddressBar from './AddressBar';
import WorkspaceSwitcher from './WorkspaceSwitcher';
import { usePulseStore } from '../store/usePulseStore';
import { motion } from 'framer-motion';
import { Bell, User } from 'lucide-react';

export default function TopBar() {
  const { neonTheme } = usePulseStore();

  return (
    <motion.div
      initial={{ y: -40, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.35, ease: 'easeOut' }}
      className={`flex flex-col shrink-0 border-b
        ${neonTheme
          ? 'bg-black/50 border-cyan-500/15 shadow-[0_1px_20px_rgba(34,211,238,0.05)]'
          : 'bg-black/40 border-white/8'
        }
        backdrop-blur-xl`}
    >
      {/* Tab row */}
      <div className="flex items-center gap-2 px-2 pt-1.5">
        <WorkspaceSwitcher />
        <div className="flex-1 overflow-hidden">
          <TabBar />
        </div>
        <div className="flex items-center gap-1 shrink-0">
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className={`w-7 h-7 rounded-lg flex items-center justify-center transition-colors
              ${neonTheme ? 'text-white/30 hover:text-cyan-300 hover:bg-cyan-500/10' : 'text-white/30 hover:text-white/70 hover:bg-white/8'}`}
          >
            <Bell size={13} />
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className={`w-7 h-7 rounded-lg flex items-center justify-center transition-colors
              ${neonTheme ? 'text-white/30 hover:text-cyan-300 hover:bg-cyan-500/10' : 'text-white/30 hover:text-white/70 hover:bg-white/8'}`}
          >
            <User size={13} />
          </motion.button>
        </div>
      </div>
      {/* Address bar row */}
      <AddressBar />
    </motion.div>
  );
}
