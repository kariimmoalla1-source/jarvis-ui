import { create } from 'zustand';

interface JarvisState {
  isActive: boolean;
  powerLevel: number;
  temperature: number;
  coreIntensity: number;
  particleCount: number;
  toggleActive: () => void;
  setPowerLevel: (level: number) => void;
  setTemperature: (temp: number) => void;
  setCoreIntensity: (intensity: number) => void;
  setParticleCount: (count: number) => void;
}

export const useJarvisStore = create<JarvisState>((set) => ({
  isActive: true,
  powerLevel: 85,
  temperature: 2850,
  coreIntensity: 0.8,
  particleCount: 5000,
  toggleActive: () => set((state) => ({ isActive: !state.isActive })),
  setPowerLevel: (level) => set({ powerLevel: Math.min(100, Math.max(0, level)) }),
  setTemperature: (temp) => set({ temperature: Math.min(5000, Math.max(1000, temp)) }),
  setCoreIntensity: (intensity) => set({ coreIntensity: Math.min(1, Math.max(0, intensity)) }),
  setParticleCount: (count) => set({ particleCount: Math.min(10000, Math.max(1000, count)) }),
}));
