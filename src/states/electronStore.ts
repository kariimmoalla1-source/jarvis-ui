import { create } from 'zustand';
import { JARVISState } from '../services/electronBridge';

export interface ElectronStore {
  // Connection state
  isConnected: boolean;
  isElectron: boolean;
  
  // JARVIS state
  jarvisState: JARVISState | null;
  
  // Actions
  setConnected: (connected: boolean) => void;
  setIsElectron: (isElectron: boolean) => void;
  updateJarvisState: (state: JARVISState) => void;
  
  // Status helpers
  getStatus: () => string;
  isActive: () => boolean;
}

const defaultJarvisState: JARVISState = {
  status: 'idle',
  powerLevel: 0,
  temperature: 1000,
  coreIntensity: 0.5,
  audioLevel: 0,
};

export const useElectronStore = create<ElectronStore>((set, get) => ({
  isConnected: false,
  isElectron: false,
  jarvisState: defaultJarvisState,

  setConnected: (connected: boolean) => set({ isConnected: connected }),
  
  setIsElectron: (isElectron: boolean) => set({ isElectron }),

  updateJarvisState: (state: JARVISState) =>
    set({
      jarvisState: state,
      isConnected: true,
    }),

  getStatus: () => {
    const state = get().jarvisState;
    return state?.status || 'offline';
  },

  isActive: () => {
    const state = get().jarvisState;
    return state?.status !== 'error' && state?.powerLevel > 0;
  },
}));
