import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Hash, Volume2, ChevronDown, ChevronRight, Circle } from 'lucide-react';
import { usePulseStore } from '../../store/usePulseStore';

const servers = [
  { id: 's1', name: 'Pulse Dev', avatar: '⚡', color: '#60a5fa' },
  { id: 's2', name: 'Design Hub', avatar: '🎨', color: '#f87171' },
  { id: 's3', name: 'Open Source', avatar: '🌍', color: '#34d399' },
];

const channels = [
  { id: 'c1', name: 'general', type: 'text', unread: 3 },
  { id: 'c2', name: 'design', type: 'text', unread: 0 },
  { id: 'c3', name: 'releases', type: 'text', unread: 12 },
  { id: 'c4', name: 'Voice Chat', type: 'voice', unread: 0 },
  { id: 'c5', name: 'Stage', type: 'voice', unread: 0 },
];

const messages = [
  { id: 'm1', user: 'alex.dev', avatar: '👨‍💻', content: 'Just pushed the new glassmorphism updates, looking clean!', time: '2:34 PM', color: '#60a5fa' },
  { id: 'm2', user: 'sarah.design', avatar: '🎨', content: 'The sidebar animations are really smooth now ✨', time: '2:35 PM', color: '#f87171' },
  { id: 'm3', user: 'jay.code', avatar: '🚀', content: 'When is the next release dropping?', time: '2:37 PM', color: '#34d399' },
  { id: 'm4', user: 'alex.dev', avatar: '👨‍💻', content: 'Targeting end of week. A lot of new features coming.', time: '2:38 PM', color: '#60a5fa' },
];

export default function DiscordPanel() {
  const { neonTheme } = usePulseStore();
  const [activeServer, setActiveServer] = useState('s1');
  const [activeChannel, setActiveChannel] = useState('c1');
  const [textChannelsOpen, setTextChannelsOpen] = useState(true);
  const [voiceChannelsOpen, setVoiceChannelsOpen] = useState(true);
  const [message, setMessage] = useState('');

  const textChannels = channels.filter((c) => c.type === 'text');
  const voiceChannels = channels.filter((c) => c.type === 'voice');

  return (
    <div className="flex h-full overflow-hidden">
      {/* Server list */}
      <div className={`w-12 flex flex-col items-center py-3 gap-2 shrink-0 border-r
        ${neonTheme ? 'border-cyan-500/15 bg-black/30' : 'border-white/8 bg-black/20'}`}>
        {servers.map((s) => (
          <motion.button
            key={s.id}
            onClick={() => setActiveServer(s.id)}
            whileHover={{ scale: 1.1, borderRadius: '12px' }}
            whileTap={{ scale: 0.95 }}
            title={s.name}
            className={`w-8 h-8 rounded-2xl flex items-center justify-center text-sm font-bold transition-all duration-200 relative
              ${activeServer === s.id
                ? 'rounded-xl shadow-lg'
                : ''
              }`}
            style={{
              backgroundColor: s.color + '25',
              border: activeServer === s.id ? `1.5px solid ${s.color}50` : '1.5px solid transparent',
              boxShadow: activeServer === s.id && neonTheme ? `0 0 8px ${s.color}40` : undefined,
            }}
          >
            {s.avatar}
            {activeServer === s.id && (
              <motion.div
                layoutId="server-indicator"
                className="absolute -left-2 w-1 h-4 rounded-full"
                style={{ backgroundColor: s.color }}
              />
            )}
          </motion.button>
        ))}
      </div>

      {/* Channel list */}
      <div className={`w-40 flex flex-col shrink-0 border-r overflow-hidden
        ${neonTheme ? 'border-cyan-500/15 bg-black/20' : 'border-white/8 bg-black/15'}`}>
        <div className={`px-3 py-3 border-b ${neonTheme ? 'border-cyan-500/15' : 'border-white/8'}`}>
          <h3 className={`text-xs font-semibold truncate ${neonTheme ? 'text-cyan-300' : 'text-white/80'}`}>
            {servers.find((s) => s.id === activeServer)?.name}
          </h3>
        </div>
        <div className="flex-1 overflow-y-auto py-2 scrollbar-none">
          {/* Text channels */}
          <button
            onClick={() => setTextChannelsOpen((v) => !v)}
            className={`w-full flex items-center gap-1 px-2 py-1 text-xs uppercase tracking-wider font-semibold transition-colors
              ${neonTheme ? 'text-white/30 hover:text-white/60' : 'text-white/30 hover:text-white/60'}`}
          >
            {textChannelsOpen ? <ChevronDown size={10} /> : <ChevronRight size={10} />}
            Text
          </button>
          <AnimatePresence>
            {textChannelsOpen && textChannels.map((ch) => (
              <motion.button
                key={ch.id}
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                onClick={() => setActiveChannel(ch.id)}
                className={`w-full flex items-center gap-1.5 px-3 py-1.5 text-xs rounded-lg mx-1 transition-all relative
                  ${ch.id === activeChannel
                    ? neonTheme ? 'bg-cyan-500/15 text-cyan-200' : 'bg-white/10 text-white'
                    : neonTheme ? 'text-white/40 hover:text-white/70 hover:bg-white/5' : 'text-white/40 hover:text-white/70 hover:bg-white/5'
                  }`}
                style={{ width: 'calc(100% - 8px)' }}
              >
                <Hash size={11} className="shrink-0" />
                <span className="flex-1 text-left truncate">{ch.name}</span>
                {ch.unread > 0 && (
                  <span className={`text-xs px-1 rounded-full text-white min-w-[16px] text-center
                    ${neonTheme ? 'bg-cyan-500/60' : 'bg-white/20'}`}
                    style={{ fontSize: '10px' }}
                  >
                    {ch.unread}
                  </span>
                )}
              </motion.button>
            ))}
          </AnimatePresence>

          <button
            onClick={() => setVoiceChannelsOpen((v) => !v)}
            className={`w-full flex items-center gap-1 px-2 py-1 mt-1 text-xs uppercase tracking-wider font-semibold transition-colors
              ${neonTheme ? 'text-white/30 hover:text-white/60' : 'text-white/30 hover:text-white/60'}`}
          >
            {voiceChannelsOpen ? <ChevronDown size={10} /> : <ChevronRight size={10} />}
            Voice
          </button>
          <AnimatePresence>
            {voiceChannelsOpen && voiceChannels.map((ch) => (
              <motion.button
                key={ch.id}
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                onClick={() => setActiveChannel(ch.id)}
                className={`w-full flex items-center gap-1.5 px-3 py-1.5 text-xs rounded-lg mx-1 transition-all
                  ${ch.id === activeChannel
                    ? neonTheme ? 'bg-cyan-500/15 text-cyan-200' : 'bg-white/10 text-white'
                    : neonTheme ? 'text-white/40 hover:text-white/70 hover:bg-white/5' : 'text-white/40 hover:text-white/70 hover:bg-white/5'
                  }`}
                style={{ width: 'calc(100% - 8px)' }}
              >
                <Volume2 size={11} className="shrink-0" />
                <span className="flex-1 text-left truncate">{ch.name}</span>
              </motion.button>
            ))}
          </AnimatePresence>
        </div>

        {/* User bar */}
        <div className={`flex items-center gap-2 p-2 border-t ${neonTheme ? 'border-cyan-500/15' : 'border-white/8'}`}>
          <div className="relative">
            <div className={`w-6 h-6 rounded-full flex items-center justify-center text-sm
              ${neonTheme ? 'bg-cyan-500/20' : 'bg-white/10'}`}>
              👤
            </div>
            <Circle size={8} fill="#22c55e" className="absolute -bottom-0.5 -right-0.5 text-green-500" />
          </div>
          <span className={`text-xs truncate flex-1 ${neonTheme ? 'text-cyan-300/70' : 'text-white/60'}`}>You</span>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* Header */}
        <div className={`flex items-center gap-2 px-4 py-3 border-b shrink-0
          ${neonTheme ? 'border-cyan-500/15' : 'border-white/8'}`}>
          <Hash size={14} className={neonTheme ? 'text-cyan-400' : 'text-white/50'} />
          <span className={`text-sm font-medium ${neonTheme ? 'text-cyan-200' : 'text-white/80'}`}>
            {channels.find((c) => c.id === activeChannel)?.name}
          </span>
        </div>

        {/* Message list */}
        <div className="flex-1 overflow-y-auto px-4 py-4 space-y-4 scrollbar-none">
          {messages.map((msg) => (
            <motion.div
              key={msg.id}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex items-start gap-3 group"
            >
              <div
                className="w-7 h-7 rounded-full flex items-center justify-center text-sm shrink-0 mt-0.5"
                style={{ backgroundColor: msg.color + '20', border: `1px solid ${msg.color}30` }}
              >
                {msg.avatar}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-baseline gap-2 mb-0.5">
                  <span className="text-xs font-semibold" style={{ color: msg.color }}>{msg.user}</span>
                  <span className={`text-xs ${neonTheme ? 'text-white/25' : 'text-white/25'}`}>{msg.time}</span>
                </div>
                <p className={`text-xs leading-relaxed ${neonTheme ? 'text-white/70' : 'text-white/60'}`}>{msg.content}</p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Input */}
        <div className="px-4 pb-4 pt-2 shrink-0">
          <div className={`flex items-center gap-2 rounded-xl px-3 py-2.5
            ${neonTheme ? 'bg-white/5 border border-cyan-500/20' : 'bg-white/6 border border-white/10'}`}>
            <input
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Message #general"
              className={`flex-1 bg-transparent text-xs outline-none
                ${neonTheme ? 'text-cyan-100 placeholder:text-white/25' : 'text-white/80 placeholder:text-white/25'}`}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
