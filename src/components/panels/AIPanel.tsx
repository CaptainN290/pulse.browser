import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, Sparkles, RotateCcw, Copy } from 'lucide-react';
import { usePulseStore } from '../../store/usePulseStore';

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
}

const suggestions = [
  'Summarize this page',
  'Find key insights',
  'Draft a reply',
  'Explain this code',
];

const sampleResponses = [
  "I've analyzed the current page. Here are the key takeaways:\n\n1. The main topic focuses on modern browser UI design\n2. Several interactive components are highlighted\n3. Performance metrics show excellent load times\n\nWould you like me to dive deeper into any of these?",
  "Based on the content I can see, here are the key insights:\n\n- User experience is prioritized with smooth animations\n- The design system uses a consistent glassmorphism aesthetic\n- Multiple workspace support enables productivity\n\nAnything specific you'd like to explore?",
  "I've drafted a response for you. The tone is professional and concise. Let me know if you'd like adjustments to the style or length.",
];

export default function AIPanel() {
  const { neonTheme } = usePulseStore();
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '0',
      role: 'assistant',
      content: "Hi! I'm your Pulse AI assistant. I can help you summarize pages, answer questions, or assist with tasks. What would you like to do?",
    },
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const send = (text = input) => {
    if (!text.trim() || loading) return;
    const userMsg: Message = { id: Date.now().toString(), role: 'user', content: text.trim() };
    setMessages((m) => [...m, userMsg]);
    setInput('');
    setLoading(true);
    setTimeout(() => {
      const reply = sampleResponses[Math.floor(Math.random() * sampleResponses.length)];
      setMessages((m) => [...m, { id: Date.now().toString(), role: 'assistant', content: reply }]);
      setLoading(false);
    }, 1200);
  };

  const accentColor = neonTheme ? '#22d3ee' : 'rgba(255,255,255,0.9)';

  return (
    <div className="flex flex-col h-full overflow-hidden">
      {/* Header */}
      <div className={`flex items-center gap-2 px-4 py-3 border-b shrink-0
        ${neonTheme ? 'border-cyan-500/15' : 'border-white/8'}`}>
        <div className={`w-7 h-7 rounded-lg flex items-center justify-center
          ${neonTheme ? 'bg-cyan-500/20 shadow-[0_0_8px_rgba(34,211,238,0.3)]' : 'bg-white/10'}`}>
          <Sparkles size={14} style={{ color: accentColor }} />
        </div>
        <div>
          <h3 className={`text-xs font-semibold ${neonTheme ? 'text-cyan-200' : 'text-white/80'}`}>Pulse AI</h3>
          <p className={`text-xs ${neonTheme ? 'text-cyan-500/60' : 'text-white/35'}`}>Context-aware assistant</p>
        </div>
        <button
          onClick={() => setMessages([{ id: '0', role: 'assistant', content: "Chat cleared! How can I help you?" }])}
          className={`ml-auto transition-colors ${neonTheme ? 'text-white/25 hover:text-cyan-400' : 'text-white/25 hover:text-white/60'}`}
        >
          <RotateCcw size={13} />
        </button>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4 scrollbar-none">
        <AnimatePresence initial={false}>
          {messages.map((msg) => (
            <motion.div
              key={msg.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.2 }}
              className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              {msg.role === 'assistant' && (
                <div className={`w-6 h-6 rounded-lg flex items-center justify-center text-xs shrink-0 mr-2 mt-0.5
                  ${neonTheme ? 'bg-cyan-500/20' : 'bg-white/10'}`}>
                  <Sparkles size={12} style={{ color: accentColor }} />
                </div>
              )}
              <div
                className={`max-w-[85%] rounded-2xl px-3 py-2.5 text-xs leading-relaxed group relative
                  ${msg.role === 'user'
                    ? neonTheme
                      ? 'bg-cyan-500/20 text-cyan-100 border border-cyan-500/25 rounded-tr-sm'
                      : 'bg-white/12 text-white/85 border border-white/10 rounded-tr-sm'
                    : neonTheme
                      ? 'bg-white/5 text-white/70 border border-white/8 rounded-tl-sm'
                      : 'bg-white/5 text-white/65 border border-white/8 rounded-tl-sm'
                  }`}
              >
                <p className="whitespace-pre-wrap">{msg.content}</p>
                {msg.role === 'assistant' && (
                  <button
                    onClick={() => navigator.clipboard.writeText(msg.content)}
                    className={`absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity
                      ${neonTheme ? 'text-white/30 hover:text-cyan-400' : 'text-white/30 hover:text-white/70'}`}
                  >
                    <Copy size={10} />
                  </button>
                )}
              </div>
            </motion.div>
          ))}
        </AnimatePresence>

        {loading && (
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center gap-2"
          >
            <div className={`w-6 h-6 rounded-lg flex items-center justify-center shrink-0
              ${neonTheme ? 'bg-cyan-500/20' : 'bg-white/10'}`}>
              <Sparkles size={12} style={{ color: accentColor }} />
            </div>
            <div className={`rounded-2xl px-3 py-2.5 rounded-tl-sm
              ${neonTheme ? 'bg-white/5 border border-white/8' : 'bg-white/5 border border-white/8'}`}>
              <div className="flex gap-1 items-center h-4">
                {[0, 1, 2].map((i) => (
                  <motion.div
                    key={i}
                    animate={{ opacity: [0.3, 1, 0.3], y: [0, -3, 0] }}
                    transition={{ duration: 0.9, repeat: Infinity, delay: i * 0.15 }}
                    className={`w-1.5 h-1.5 rounded-full ${neonTheme ? 'bg-cyan-400' : 'bg-white/50'}`}
                  />
                ))}
              </div>
            </div>
          </motion.div>
        )}
        <div ref={bottomRef} />
      </div>

      {/* Suggestions */}
      <div className={`px-3 pb-2 shrink-0 border-t ${neonTheme ? 'border-cyan-500/15' : 'border-white/8'} pt-2`}>
        <div className="flex flex-wrap gap-1.5 mb-3">
          {suggestions.map((s) => (
            <motion.button
              key={s}
              onClick={() => send(s)}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              className={`px-2.5 py-1 rounded-full text-xs transition-all
                ${neonTheme
                  ? 'bg-cyan-500/10 text-cyan-400/70 hover:text-cyan-300 hover:bg-cyan-500/20 border border-cyan-500/20'
                  : 'bg-white/6 text-white/45 hover:text-white/70 hover:bg-white/10 border border-white/8'
                }`}
            >
              {s}
            </motion.button>
          ))}
        </div>

        {/* Input */}
        <div className={`flex items-center gap-2 rounded-xl px-3 py-2.5 transition-all
          ${neonTheme
            ? 'bg-white/5 border border-cyan-500/20 focus-within:border-cyan-500/40 focus-within:shadow-[0_0_12px_rgba(34,211,238,0.1)]'
            : 'bg-white/6 border border-white/10 focus-within:border-white/20'
          }`}>
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && !e.shiftKey && send()}
            placeholder="Ask anything..."
            className={`flex-1 bg-transparent text-xs outline-none
              ${neonTheme ? 'text-cyan-100 placeholder:text-white/25' : 'text-white/80 placeholder:text-white/25'}`}
          />
          <motion.button
            onClick={() => send()}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            disabled={!input.trim() || loading}
            className="transition-opacity disabled:opacity-30"
          >
            <Send size={14} style={{ color: accentColor }} />
          </motion.button>
        </div>
      </div>
    </div>
  );
}
