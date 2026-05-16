import { motion } from 'framer-motion';
import { Globe, Star, Clock, ArrowRight, Zap } from 'lucide-react';
import { usePulseStore } from '../store/usePulseStore';

const quickLinks = [
  { label: 'GitHub', url: 'github.com', icon: '🐙', color: '#60a5fa' },
  { label: 'Linear', url: 'linear.app', icon: '📋', color: '#34d399' },
  { label: 'Vercel', url: 'vercel.com', icon: '▲', color: '#f87171' },
  { label: 'Figma', url: 'figma.com', icon: '🎨', color: '#fbbf24' },
  { label: 'Notion', url: 'notion.so', icon: '📓', color: '#a78bfa' },
  { label: 'Slack', url: 'slack.com', icon: '💬', color: '#60a5fa' },
];

const recent = [
  { title: 'Pulse Browser — Design System', url: 'github.com/pulse/design', time: '2 min ago' },
  { title: 'Q4 Product Roadmap', url: 'linear.app/workspace/roadmap', time: '15 min ago' },
  { title: 'Landing Page Redesign', url: 'figma.com/file/pulse-landing', time: '1 hr ago' },
  { title: 'API Documentation v2', url: 'docs.pulse.app/api', time: '3 hr ago' },
];

function NewTabPage() {
  const { neonTheme, addTab } = usePulseStore();

  return (
    <div className={`h-full flex flex-col items-center justify-center px-8 py-12 overflow-y-auto
      ${neonTheme ? 'bg-gradient-to-b from-black via-gray-950 to-black' : 'bg-gradient-to-b from-gray-950 via-black to-gray-950'}`}>

      {/* Greeting */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center mb-12"
      >
        <div className={`inline-flex items-center gap-2.5 px-4 py-2 rounded-full mb-6
          ${neonTheme ? 'bg-cyan-500/10 border border-cyan-500/20' : 'bg-white/5 border border-white/8'}`}>
          <Zap size={12} className={neonTheme ? 'text-cyan-400' : 'text-white/50'} />
          <span className={`text-xs font-medium ${neonTheme ? 'text-cyan-300' : 'text-white/50'}`}>
            Good afternoon
          </span>
        </div>
        <h1 className={`text-4xl font-bold tracking-tight mb-2
          ${neonTheme
            ? 'text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 to-blue-400'
            : 'text-transparent bg-clip-text bg-gradient-to-r from-white to-white/60'
          }`}>
          Pulse
        </h1>
        <p className={`text-sm ${neonTheme ? 'text-white/30' : 'text-white/30'}`}>
          Your intelligent browser workspace
        </p>
      </motion.div>

      {/* Quick links */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="w-full max-w-[500px] mb-10"
      >
        <div className="flex items-center gap-2 mb-4">
          <Star size={13} className={neonTheme ? 'text-cyan-500/60' : 'text-white/30'} />
          <span className={`text-xs font-semibold uppercase tracking-wider ${neonTheme ? 'text-white/30' : 'text-white/30'}`}>
            Quick Access
          </span>
        </div>
        <div className="grid grid-cols-3 gap-2.5">
          {quickLinks.map((link, i) => (
            <motion.button
              key={link.label}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3, delay: 0.15 + i * 0.05 }}
              onClick={() => addTab({ title: link.label, url: `https://${link.url}`, favicon: link.icon })}
              whileHover={{ scale: 1.04, y: -2 }}
              whileTap={{ scale: 0.97 }}
              className={`flex flex-col items-center gap-2.5 p-4 rounded-2xl transition-all border group
                ${neonTheme
                  ? 'bg-white/3 border-white/6 hover:bg-white/6 hover:border-cyan-500/20'
                  : 'bg-white/4 border-white/6 hover:bg-white/8 hover:border-white/12'
                }`}
            >
              <span
                className={`w-10 h-10 rounded-xl flex items-center justify-center text-xl
                  group-hover:shadow-lg transition-shadow`}
                style={{
                  backgroundColor: link.color + '15',
                  boxShadow: undefined,
                }}
              >
                {link.icon}
              </span>
              <span className={`text-xs font-medium ${neonTheme ? 'text-white/55 group-hover:text-white/80' : 'text-white/55 group-hover:text-white/80'}`}>
                {link.label}
              </span>
            </motion.button>
          ))}
        </div>
      </motion.div>

      {/* Recent */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.25 }}
        className="w-full max-w-[500px]"
      >
        <div className="flex items-center gap-2 mb-4">
          <Clock size={13} className={neonTheme ? 'text-cyan-500/60' : 'text-white/30'} />
          <span className={`text-xs font-semibold uppercase tracking-wider ${neonTheme ? 'text-white/30' : 'text-white/30'}`}>
            Recent
          </span>
        </div>
        <div className={`rounded-2xl overflow-hidden border ${neonTheme ? 'border-cyan-500/12 bg-white/2' : 'border-white/8 bg-white/2'}`}>
          {recent.map((item, i) => (
            <motion.button
              key={item.url}
              onClick={() => addTab({ title: item.title, url: `https://${item.url}`, favicon: '🌐' })}
              whileHover={{ x: 3 }}
              className={`w-full flex items-center gap-3 px-4 py-3 text-left group transition-colors
                ${i !== recent.length - 1 ? (neonTheme ? 'border-b border-cyan-500/8' : 'border-b border-white/5') : ''}
                ${neonTheme ? 'hover:bg-cyan-500/5' : 'hover:bg-white/4'}`}
            >
              <Globe size={13} className={neonTheme ? 'text-cyan-500/40 shrink-0' : 'text-white/20 shrink-0'} />
              <div className="flex-1 min-w-0">
                <p className={`text-xs font-medium truncate ${neonTheme ? 'text-white/65 group-hover:text-white/85' : 'text-white/60 group-hover:text-white/85'}`}>
                  {item.title}
                </p>
                <p className={`text-xs truncate ${neonTheme ? 'text-white/25' : 'text-white/25'}`}>
                  {item.url}
                </p>
              </div>
              <span className={`text-xs shrink-0 ${neonTheme ? 'text-white/20' : 'text-white/20'}`}>{item.time}</span>
              <ArrowRight size={12} className={`opacity-0 group-hover:opacity-40 shrink-0 transition-opacity ${neonTheme ? 'text-cyan-400' : 'text-white'}`} />
            </motion.button>
          ))}
        </div>
      </motion.div>
    </div>
  );
}

function GenericPage({ url, title }: { url: string; title: string }) {
  const { neonTheme } = usePulseStore();

  return (
    <div className={`h-full flex flex-col items-center justify-center gap-4
      ${neonTheme ? 'bg-black' : 'bg-gray-950'}`}>
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.3 }}
        className="text-center"
      >
        <div className={`w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4
          ${neonTheme ? 'bg-cyan-500/10 border border-cyan-500/20 shadow-[0_0_20px_rgba(34,211,238,0.1)]' : 'bg-white/5 border border-white/8'}`}>
          <Globe size={28} className={neonTheme ? 'text-cyan-400/60' : 'text-white/30'} />
        </div>
        <h2 className={`text-lg font-semibold mb-1 ${neonTheme ? 'text-cyan-200' : 'text-white/70'}`}>{title}</h2>
        <p className={`text-sm ${neonTheme ? 'text-white/25' : 'text-white/30'}`}>{url}</p>
        <p className={`text-xs mt-4 ${neonTheme ? 'text-white/15' : 'text-white/20'}`}>
          Web content renders here in a real browser
        </p>
      </motion.div>
    </div>
  );
}

export default function BrowserContent() {
  const { tabs, activeTabId } = usePulseStore();
  const activeTab = tabs.find((t) => t.id === activeTabId);

  if (!activeTab) return null;

  const isNewTab = activeTab.url === 'pulse://newtab';

  return (
    <div className="flex-1 overflow-hidden">
      {isNewTab ? (
        <NewTabPage />
      ) : (
        <GenericPage url={activeTab.url} title={activeTab.title} />
      )}
    </div>
  );
}
