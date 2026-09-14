import { create } from 'zustand';
import { AudioData } from '../services/audioAnalyzer';

export interface AudioStore {
  // Audio state
  isAudioEnabled: boolean;
  audioData: AudioData | null;
  
  // Audio controls
  enableAudio: () => void;
  disableAudio: () => void;
  updateAudioData: (data: AudioData) => void;
  
  // Audio-reactive values
  bass: number;
  mid: number;
  treble: number;
  energy: number;
  peak: number;
}

export const useAudioStore = create<AudioStore>((set) => ({
  isAudioEnabled: false,
  audioData: null,
  bass: 0,
  mid: 0,
  treble: 0,
  energy: 0,
  peak: 0,

  enableAudio: () => set({ isAudioEnabled: true }),
  disableAudio: () => set({ isAudioEnabled: false }),

  updateAudioData: (data: AudioData) =>
    set({
      audioData: data,
      bass: data.bass,
      mid: data.mid,
      treble: data.treble,
      energy: data.energy,
      peak: data.peak,
    }),
}));
