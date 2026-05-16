import { create } from 'zustand';

export interface Tab {
  id: string;
  title: string;
  url: string;
  favicon: string;
  isActive: boolean;
}

export interface Workspace {
  id: string;
  name: string;
  color: string;
}

type Panel = 'discord' | 'spotify' | 'ai' | null;

interface PulseState {
  tabs: Tab[];
  activeTabId: string;
  workspaces: Workspace[];
  activeWorkspaceId: string;
  openPanel: Panel;
  panelWidth: number;
  commandPaletteOpen: boolean;
  neonTheme: boolean;
  settingsOpen: boolean;
  addressBarValue: string;

  setActiveTab: (id: string) => void;
  addTab: (tab?: Partial<Tab>) => void;
  closeTab: (id: string) => void;
  setOpenPanel: (panel: Panel) => void;
  setPanelWidth: (w: number) => void;
  toggleCommandPalette: () => void;
  toggleNeonTheme: () => void;
  setSettingsOpen: (v: boolean) => void;
  setAddressBarValue: (v: string) => void;
  setActiveWorkspace: (id: string) => void;
}

const defaultTabs: Tab[] = [
  { id: '1', title: 'New Tab', url: 'pulse://newtab', favicon: '🏠', isActive: true },
  { id: '2', title: 'GitHub', url: 'https://github.com', favicon: '🐙', isActive: false },
  { id: '3', title: 'Linear', url: 'https://linear.app', favicon: '📋', isActive: false },
  { id: '4', title: 'Vercel Dashboard', url: 'https://vercel.com', favicon: '▲', isActive: false },
];

const defaultWorkspaces: Workspace[] = [
  { id: 'w1', name: 'Personal', color: '#60a5fa' },
  { id: 'w2', name: 'Work', color: '#34d399' },
  { id: 'w3', name: 'Design', color: '#f87171' },
];

export const usePulseStore = create<PulseState>((set, get) => ({
  tabs: defaultTabs,
  activeTabId: '1',
  workspaces: defaultWorkspaces,
  activeWorkspaceId: 'w1',
  openPanel: null,
  panelWidth: 320,
  commandPaletteOpen: false,
  neonTheme: false,
  settingsOpen: false,
  addressBarValue: 'pulse://newtab',

  setActiveTab: (id) =>
    set((s) => ({
      activeTabId: id,
      addressBarValue: s.tabs.find((t) => t.id === id)?.url ?? '',
    })),

  addTab: (partial) => {
    const id = Date.now().toString();
    const newTab: Tab = {
      id,
      title: partial?.title ?? 'New Tab',
      url: partial?.url ?? 'pulse://newtab',
      favicon: partial?.favicon ?? '🏠',
      isActive: false,
      ...partial,
    };
    set((s) => ({ tabs: [...s.tabs, newTab], activeTabId: id, addressBarValue: newTab.url }));
  },

  closeTab: (id) => {
    const { tabs, activeTabId } = get();
    if (tabs.length === 1) return;
    const idx = tabs.findIndex((t) => t.id === id);
    const remaining = tabs.filter((t) => t.id !== id);
    const newActive =
      activeTabId === id
        ? remaining[Math.max(0, idx - 1)].id
        : activeTabId;
    set({ tabs: remaining, activeTabId: newActive });
  },

  setOpenPanel: (panel) =>
    set((s) => ({ openPanel: s.openPanel === panel ? null : panel })),

  setPanelWidth: (w) => set({ panelWidth: Math.max(240, Math.min(600, w)) }),

  toggleCommandPalette: () => set((s) => ({ commandPaletteOpen: !s.commandPaletteOpen })),

  toggleNeonTheme: () => set((s) => ({ neonTheme: !s.neonTheme })),

  setSettingsOpen: (v) => set({ settingsOpen: v }),

  setAddressBarValue: (v) => set({ addressBarValue: v }),

  setActiveWorkspace: (id) => set({ activeWorkspaceId: id }),
}));
