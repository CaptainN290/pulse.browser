import { motion } from 'framer-motion';
import { MessageCircle, Music, Mic2, Settings, Youtube, Zap, ChevronRight } from 'lucide-react';
import { usePulseStore } from '../store/usePulseStore';

const SidebarButton = ({
  icon: Icon,
  label,
  active,
  onClick,
  neon,
  color,
}: {
  icon: React.ElementType;
  label: string;
  active?: boolean;
  onClick: () => void;
  neon: boolean;
  color?: string;
}) => (
  <motion.button
    onClick={onClick}
    title={label}
    whileHover={{ scale: 1.08 }}
    whileTap={{ scale: 0.95 }}
    className={`relative flex items-center justify-center w-10 h-10 rounded-xl transition-all duration-200 group
      ${active
        ? neon
          ? 'bg-cyan-500/20 shadow-[0_0_12px_2px_rgba(34,211,238,0.4)]'
          : 'bg-white/15 shadow-inner'
        : neon
          ? 'hover:bg-white/5 hover:shadow-[0_0_8px_1px_rgba(34,211,238,0.2)]'
          : 'hover:bg-white/10'
      }`}
  >
    <Icon
      size={18}
      className={`transition-colors duration-200
        ${active
          ? neon ? 'text-cyan-300' : 'text-white'
          : neon ? 'text-cyan-500/70 group-hover:text-cyan-300' : 'text-white/50 group-hover:text-white/90'
        }`}
      style={active && color ? { color } : undefined}
    />
    {active && (
      <motion.div
        layoutId="active-indicator"
        className={`absolute -right-1 w-1 h-5 rounded-full ${neon ? 'bg-cyan-400 shadow-[0_0_6px_2px_rgba(34,211,238,0.6)]' : 'bg-white'}`}
      />
    )}
    <span className="absolute left-14 bg-black/80 backdrop-blur text-white text-xs px-2 py-1 rounded-md opacity-0 group-hover:opacity-100 pointer-events-none whitespace-nowrap z-50 transition-opacity duration-150 border border-white/10">
      {label}
    </span>
  </motion.button>
);

export default function Sidebar() {
  const { openPanel, setOpenPanel, neonTheme, toggleNeonTheme, setSettingsOpen, toggleCommandPalette } = usePulseStore();

  return (
    <motion.aside
      initial={{ x: -60, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ duration: 0.4, ease: 'easeOut' }}
      className={`flex flex-col items-center py-4 px-2 gap-2 w-14 h-full z-20 shrink-0 relative
        ${neonTheme
          ? 'bg-black/60 border-r border-cyan-500/20 shadow-[1px_0_20px_0_rgba(34,211,238,0.08)]'
          : 'bg-black/40 border-r border-white/8'
        }
        backdrop-blur-xl`}
    >
      {/* Logo */}
      <motion.div
        whileHover={{ scale: 1.1, rotate: 5 }}
        className={`w-8 h-8 rounded-xl flex items-center justify-center mb-3 cursor-pointer
          ${neonTheme ? 'bg-cyan-500/20 shadow-[0_0_12px_2px_rgba(34,211,238,0.4)]' : 'bg-white/10'}`}
        onClick={toggleCommandPalette}
      >
        <Zap size={16} className={neonTheme ? 'text-cyan-300' : 'text-white'} />
      </motion.div>

      <div className={`w-6 h-px mb-1 ${neonTheme ? 'bg-cyan-500/30' : 'bg-white/10'}`} />

      {/* App buttons */}
      <SidebarButton
        icon={MessageCircle}
        label="Discord"
        active={openPanel === 'discord'}
        onClick={() => setOpenPanel('discord')}
        neon={neonTheme}
        color="#5865F2"
      />
      <SidebarButton
        icon={Music}
        label="Spotify"
        active={openPanel === 'spotify'}
        onClick={() => setOpenPanel('spotify')}
        neon={neonTheme}
        color="#1DB954"
      />
      <SidebarButton
        icon={Youtube}
        label="YouTube Music"
        active={openPanel === 'youtube'}
        onClick={() => setOpenPanel('youtube' as 'discord')}
        neon={neonTheme}
        color="#FF0000"
      />

      <div className={`w-6 h-px my-1 ${neonTheme ? 'bg-cyan-500/30' : 'bg-white/10'}`} />

      <SidebarButton
        icon={Mic2}
        label="AI Assistant"
        active={openPanel === 'ai'}
        onClick={() => setOpenPanel('ai')}
        neon={neonTheme}
      />

      {/* Spacer */}
      <div className="flex-1" />

      {/* Neon toggle */}
      <motion.button
        onClick={toggleNeonTheme}
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.95 }}
        title="Toggle Neon Theme"
        className={`w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-300 group
          ${neonTheme
            ? 'bg-cyan-500/20 shadow-[0_0_12px_2px_rgba(34,211,238,0.4)]'
            : 'hover:bg-white/10'}`}
      >
        <ChevronRight
          size={16}
          className={`transition-colors ${neonTheme ? 'text-cyan-300' : 'text-white/40 group-hover:text-white/80'}`}
        />
      </motion.button>

      <SidebarButton
        icon={Settings}
        label="Settings"
        onClick={() => setSettingsOpen(true)}
        neon={neonTheme}
      />
    </motion.aside>
  );
}
