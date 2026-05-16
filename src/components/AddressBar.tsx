import { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { Search, RotateCw, ChevronLeft, ChevronRight, Shield, Command } from 'lucide-react';
import { usePulseStore } from '../store/usePulseStore';

export default function AddressBar() {
  const { addressBarValue, setAddressBarValue, toggleCommandPalette, neonTheme } = usePulseStore();
  const [focused, setFocused] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    inputRef.current?.blur();
  };

  const isSecure = addressBarValue.startsWith('https') || addressBarValue.startsWith('pulse://');

  return (
    <div className="flex items-center gap-2 px-3 h-10">
      {/* Nav buttons */}
      <div className="flex items-center gap-0.5">
        {[ChevronLeft, ChevronRight, RotateCw].map((Icon, i) => (
          <motion.button
            key={i}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className={`w-6 h-6 rounded-md flex items-center justify-center transition-colors
              ${neonTheme ? 'text-white/30 hover:text-cyan-300 hover:bg-cyan-500/10' : 'text-white/30 hover:text-white/70 hover:bg-white/8'}`}
          >
            <Icon size={13} />
          </motion.button>
        ))}
      </div>

      {/* Address bar */}
      <motion.form
        onSubmit={handleSubmit}
        animate={{
          boxShadow: focused
            ? neonTheme
              ? '0 0 0 1.5px rgba(34,211,238,0.5), 0 0 16px rgba(34,211,238,0.15)'
              : '0 0 0 1.5px rgba(255,255,255,0.2)'
            : '0 0 0 1px rgba(255,255,255,0.06)',
        }}
        transition={{ duration: 0.15 }}
        className={`flex-1 flex items-center gap-2 h-7 rounded-xl px-3 cursor-text
          ${neonTheme ? 'bg-white/5' : 'bg-white/6'} backdrop-blur-sm`}
        onClick={() => inputRef.current?.focus()}
      >
        {focused ? (
          <Search size={12} className={neonTheme ? 'text-cyan-400 shrink-0' : 'text-white/40 shrink-0'} />
        ) : (
          <Shield size={12} className={`shrink-0 ${isSecure ? (neonTheme ? 'text-cyan-400' : 'text-green-400/70') : 'text-yellow-400/70'}`} />
        )}
        <input
          ref={inputRef}
          value={addressBarValue}
          onChange={(e) => setAddressBarValue(e.target.value)}
          onFocus={() => { setFocused(true); inputRef.current?.select(); }}
          onBlur={() => setFocused(false)}
          className={`flex-1 bg-transparent text-xs outline-none min-w-0
            ${neonTheme ? 'text-cyan-100 placeholder:text-cyan-500/40' : 'text-white/80 placeholder:text-white/30'}`}
          placeholder="Search or enter address..."
          spellCheck={false}
        />
      </motion.form>

      {/* Command palette trigger */}
      <motion.button
        onClick={toggleCommandPalette}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className={`flex items-center gap-1.5 h-7 px-2.5 rounded-lg text-xs transition-all
          ${neonTheme
            ? 'bg-cyan-500/10 text-cyan-400/70 hover:text-cyan-300 hover:bg-cyan-500/20 border border-cyan-500/20'
            : 'bg-white/6 text-white/40 hover:text-white/70 hover:bg-white/10 border border-white/8'
          }`}
      >
        <Command size={12} />
        <span className="hidden sm:block">K</span>
      </motion.button>
    </div>
  );
}
