import { create } from 'zustand';

export type VisualizationMode = 'reactor' | 'particles' | 'energy' | 'spectrum' | 'waveform';

export interface VisualizationTheme {
  name: string;
  primaryColor: [number, number, number];
  secondaryColor: [number, number, number];
  accentColor: [number, number, number];
}

export const THEMES: Record<string, VisualizationTheme> = {
  jarvis: {
    name: 'JARVIS (Blue)',
    primaryColor: [0.0, 0.5, 1.0],
    secondaryColor: [0.0, 0.2, 0.8],
    accentColor: [0.0, 1.0, 1.0],
  },
  neon: {
    name: 'Neon (Green)',
    primaryColor: [0.0, 1.0, 0.5],
    secondaryColor: [0.0, 0.8, 0.3],
    accentColor: [1.0, 0.0, 1.0],
  },
  plasma: {
    name: 'Plasma (Red)',
    primaryColor: [1.0, 0.2, 0.2],
    secondaryColor: [1.0, 0.5, 0.0],
    accentColor: [1.0, 1.0, 0.0],
  },
  cyber: {
    name: 'Cyber (Purple)',
    primaryColor: [0.8, 0.0, 1.0],
    secondaryColor: [0.5, 0.0, 1.0],
    accentColor: [0.0, 1.0, 1.0],
  },
  void: {
    name: 'Void (Dark)',
    primaryColor: [0.1, 0.1, 0.3],
    secondaryColor: [0.2, 0.1, 0.5],
    accentColor: [0.0, 1.0, 0.5],
  },
};

export interface VisualizationStore {
  // Visualization mode
  mode: VisualizationMode;
  setMode: (mode: VisualizationMode) => void;
  
  // Theme
  theme: VisualizationTheme;
  setTheme: (themeName: string) => void;
  
  // Visual settings
  particleCount: number;
  setParticleCount: (count: number) => void;
  
  rotationSpeed: number;
  setRotationSpeed: (speed: number) => void;
  
  glowIntensity: number;
  setGlowIntensity: (intensity: number) => void;
  
  // Effects
  enableTrails: boolean;
  toggleTrails: () => void;
  
  enableGlitch: boolean;
  toggleGlitch: () => void;
  
  enableAudioReactivity: boolean;
  toggleAudioReactivity: () => void;
}

export const useVisualizationStore = create<VisualizationStore>((set, get) => ({
  mode: 'reactor',
  setMode: (mode: VisualizationMode) => set({ mode }),

  theme: THEMES.jarvis,
  setTheme: (themeName: string) => {
    const theme = THEMES[themeName] || THEMES.jarvis;
    set({ theme });
  },

  particleCount: 5000,
  setParticleCount: (count: number) =>
    set({ particleCount: Math.min(Math.max(count, 1000), 50000) }),

  rotationSpeed: 1,
  setRotationSpeed: (speed: number) =>
    set({ rotationSpeed: Math.max(speed, 0) }),

  glowIntensity: 1,
  setGlowIntensity: (intensity: number) =>
    set({ glowIntensity: Math.min(Math.max(intensity, 0), 2) }),

  enableTrails: true,
  toggleTrails: () => set((state) => ({ enableTrails: !state.enableTrails })),

  enableGlitch: false,
  toggleGlitch: () => set((state) => ({ enableGlitch: !state.enableGlitch })),

  enableAudioReactivity: false,
  toggleAudioReactivity: () =>
    set((state) => ({ enableAudioReactivity: !state.enableAudioReactivity })),
}));
