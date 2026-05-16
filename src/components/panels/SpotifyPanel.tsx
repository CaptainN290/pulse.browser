import { useState } from 'react';
import { motion } from 'framer-motion';
import { Play, Pause, SkipBack, SkipForward, Volume2, Heart, Shuffle, Repeat, Music } from 'lucide-react';
import { usePulseStore } from '../../store/usePulseStore';

const playlists = [
  { id: 'p1', name: 'Chill Vibes', count: 24, color: '#1DB954' },
  { id: 'p2', name: 'Deep Focus', count: 18, color: '#60a5fa' },
  { id: 'p3', name: 'Late Night', count: 31, color: '#f87171' },
  { id: 'p4', name: 'Workout', count: 42, color: '#fbbf24' },
];

const tracks = [
  { id: 't1', title: 'Blinding Lights', artist: 'The Weeknd', duration: '3:22', liked: true, art: '🌃' },
  { id: 't2', title: 'Levitating', artist: 'Dua Lipa', duration: '3:23', liked: false, art: '🪐' },
  { id: 't3', title: 'As It Was', artist: 'Harry Styles', duration: '2:37', liked: true, art: '🌅' },
  { id: 't4', title: 'Heat Waves', artist: 'Glass Animals', duration: '3:59', liked: false, art: '🌊' },
  { id: 't5', title: 'Stay', artist: 'The Kid LAROI', duration: '2:21', liked: true, art: '✨' },
];

export default function SpotifyPanel() {
  const { neonTheme } = usePulseStore();
  const [playing, setPlaying] = useState(true);
  const [activeTrack, setActiveTrack] = useState('t1');
  const [progress, setProgress] = useState(38);
  const [volume, setVolume] = useState(72);
  const [activePlaylist, setActivePlaylist] = useState('p1');
  const [liked, setLiked] = useState<Record<string, boolean>>(
    Object.fromEntries(tracks.map((t) => [t.id, t.liked]))
  );

  const current = tracks.find((t) => t.id === activeTrack)!;
  const accentColor = neonTheme ? '#22d3ee' : '#1DB954';

  return (
    <div className="flex flex-col h-full overflow-hidden">
      {/* Now playing hero */}
      <div className={`shrink-0 p-4 border-b ${neonTheme ? 'border-cyan-500/15' : 'border-white/8'}`}>
        <div className="flex items-center gap-3 mb-4">
          <motion.div
            animate={{ rotate: playing ? 360 : 0 }}
            transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}
            className={`w-12 h-12 rounded-xl flex items-center justify-center text-2xl shrink-0
              ${neonTheme ? 'bg-cyan-500/15 shadow-[0_0_12px_rgba(34,211,238,0.2)]' : 'bg-white/10'}`}
          >
            {current.art}
          </motion.div>
          <div className="flex-1 min-w-0">
            <p className={`text-sm font-semibold truncate ${neonTheme ? 'text-cyan-100' : 'text-white/90'}`}>
              {current.title}
            </p>
            <p className={`text-xs truncate ${neonTheme ? 'text-cyan-400/60' : 'text-white/45'}`}>
              {current.artist}
            </p>
          </div>
          <motion.button
            whileHover={{ scale: 1.15 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => setLiked((l) => ({ ...l, [activeTrack]: !l[activeTrack] }))}
          >
            <Heart
              size={16}
              fill={liked[activeTrack] ? accentColor : 'none'}
              className="transition-colors"
              style={{ color: liked[activeTrack] ? accentColor : 'rgba(255,255,255,0.3)' }}
            />
          </motion.button>
        </div>

        {/* Progress bar */}
        <div className="mb-3">
          <div
            className={`w-full h-1 rounded-full cursor-pointer ${neonTheme ? 'bg-white/10' : 'bg-white/10'}`}
            onClick={(e) => {
              const rect = e.currentTarget.getBoundingClientRect();
              setProgress(Math.round(((e.clientX - rect.left) / rect.width) * 100));
            }}
          >
            <motion.div
              className="h-full rounded-full relative"
              style={{ width: `${progress}%`, backgroundColor: accentColor }}
              animate={{ boxShadow: neonTheme ? `0 0 6px ${accentColor}` : 'none' }}
            >
              <div
                className="absolute right-0 top-1/2 -translate-y-1/2 w-2.5 h-2.5 rounded-full bg-white shadow-md -translate-x-0.5"
                style={{ boxShadow: neonTheme ? `0 0 6px ${accentColor}` : undefined }}
              />
            </motion.div>
          </div>
          <div className="flex justify-between mt-1">
            <span className={`text-xs ${neonTheme ? 'text-white/30' : 'text-white/30'}`}>1:17</span>
            <span className={`text-xs ${neonTheme ? 'text-white/30' : 'text-white/30'}`}>{current.duration}</span>
          </div>
        </div>

        {/* Controls */}
        <div className="flex items-center justify-between">
          <motion.button whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
            <Shuffle size={14} className={neonTheme ? 'text-cyan-400/50' : 'text-white/40'} />
          </motion.button>
          <motion.button whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
            <SkipBack size={18} className={neonTheme ? 'text-cyan-300' : 'text-white/70'} fill="currentColor" />
          </motion.button>
          <motion.button
            onClick={() => setPlaying((v) => !v)}
            whileHover={{ scale: 1.08 }}
            whileTap={{ scale: 0.92 }}
            className="w-10 h-10 rounded-full flex items-center justify-center"
            style={{
              backgroundColor: accentColor,
              boxShadow: neonTheme ? `0 0 16px ${accentColor}60` : undefined,
            }}
          >
            {playing
              ? <Pause size={18} fill="black" className="text-black" />
              : <Play size={18} fill="black" className="text-black ml-0.5" />
            }
          </motion.button>
          <motion.button whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
            <SkipForward size={18} className={neonTheme ? 'text-cyan-300' : 'text-white/70'} fill="currentColor" />
          </motion.button>
          <motion.button whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
            <Repeat size={14} className={neonTheme ? 'text-cyan-400/50' : 'text-white/40'} />
          </motion.button>
        </div>

        {/* Volume */}
        <div className="flex items-center gap-2 mt-3">
          <Volume2 size={12} className={neonTheme ? 'text-white/30' : 'text-white/30'} />
          <div
            className={`flex-1 h-1 rounded-full cursor-pointer ${neonTheme ? 'bg-white/10' : 'bg-white/10'}`}
            onClick={(e) => {
              const rect = e.currentTarget.getBoundingClientRect();
              setVolume(Math.round(((e.clientX - rect.left) / rect.width) * 100));
            }}
          >
            <div
              className="h-full rounded-full"
              style={{ width: `${volume}%`, backgroundColor: accentColor }}
            />
          </div>
          <span className={`text-xs w-6 text-right ${neonTheme ? 'text-white/30' : 'text-white/30'}`}>{volume}</span>
        </div>
      </div>

      {/* Playlists */}
      <div className={`shrink-0 p-3 border-b ${neonTheme ? 'border-cyan-500/15' : 'border-white/8'}`}>
        <p className={`text-xs uppercase tracking-wider font-semibold mb-2 px-1 ${neonTheme ? 'text-white/30' : 'text-white/30'}`}>
          Playlists
        </p>
        <div className="grid grid-cols-2 gap-1.5">
          {playlists.map((pl) => (
            <motion.button
              key={pl.id}
              onClick={() => setActivePlaylist(pl.id)}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.97 }}
              className={`flex items-center gap-2 p-2 rounded-lg text-left transition-all
                ${pl.id === activePlaylist
                  ? neonTheme ? 'bg-cyan-500/15 border border-cyan-500/25' : 'bg-white/12 border border-white/12'
                  : neonTheme ? 'bg-white/4 hover:bg-white/8 border border-transparent' : 'bg-white/4 hover:bg-white/8 border border-transparent'
                }`}
            >
              <Music size={12} style={{ color: pl.color }} />
              <div className="min-w-0">
                <p className={`text-xs truncate font-medium ${neonTheme ? 'text-white/70' : 'text-white/70'}`}>{pl.name}</p>
                <p className={`text-xs ${neonTheme ? 'text-white/25' : 'text-white/25'}`}>{pl.count} tracks</p>
              </div>
            </motion.button>
          ))}
        </div>
      </div>

      {/* Track list */}
      <div className="flex-1 overflow-y-auto p-3 space-y-0.5 scrollbar-none">
        <p className={`text-xs uppercase tracking-wider font-semibold mb-2 px-1 ${neonTheme ? 'text-white/30' : 'text-white/30'}`}>
          Queue
        </p>
        {tracks.map((track, idx) => (
          <motion.button
            key={track.id}
            onClick={() => setActiveTrack(track.id)}
            whileHover={{ x: 2 }}
            className={`w-full flex items-center gap-3 px-2 py-2 rounded-lg transition-all
              ${track.id === activeTrack
                ? neonTheme ? 'bg-cyan-500/15' : 'bg-white/10'
                : neonTheme ? 'hover:bg-white/5' : 'hover:bg-white/5'
              }`}
          >
            <span className={`text-xs w-4 text-right shrink-0 ${neonTheme ? 'text-white/25' : 'text-white/25'}`}>
              {track.id === activeTrack ? '▶' : idx + 1}
            </span>
            <span className="text-base shrink-0">{track.art}</span>
            <div className="flex-1 min-w-0 text-left">
              <p className={`text-xs truncate font-medium ${track.id === activeTrack
                ? neonTheme ? 'text-cyan-200' : 'text-white'
                : neonTheme ? 'text-white/65' : 'text-white/65'
              }`}>{track.title}</p>
              <p className={`text-xs truncate ${neonTheme ? 'text-white/30' : 'text-white/30'}`}>{track.artist}</p>
            </div>
            <span className={`text-xs shrink-0 ${neonTheme ? 'text-white/25' : 'text-white/25'}`}>{track.duration}</span>
          </motion.button>
        ))}
      </div>
    </div>
  );
}
