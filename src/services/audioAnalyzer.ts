/**
 * Audio Analyzer Service
 * Provides real-time audio analysis for reactive visualizations
 */

export interface AudioData {
  frequency: number[];
  waveform: number[];
  bass: number;
  mid: number;
  treble: number;
  energy: number;
  peak: number;
}

class AudioAnalyzer {
  private audioContext: AudioContext | null = null;
  private analyser: AnalyserNode | null = null;
  private microphone: MediaStreamAudioSourceNode | null = null;
  private dataArray: Uint8Array | null = null;
  private frequencyData: Uint8Array | null = null;
  private isInitialized = false;
  private animationFrameId: number | null = null;
  private callbacks: Set<(data: AudioData) => void> = new Set();

  async initialize(): Promise<void> {
    if (this.isInitialized) return;

    try {
      // Create audio context
      this.audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();

      // Get microphone stream
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });

      // Create analyser
      this.analyser = this.audioContext.createAnalyser();
      this.analyser.fftSize = 256;

      // Connect microphone to analyser
      this.microphone = this.audioContext.createMediaStreamSource(stream);
      this.microphone.connect(this.analyser);

      // Initialize data arrays
      this.dataArray = new Uint8Array(this.analyser.frequencyBinCount);
      this.frequencyData = new Uint8Array(this.analyser.frequencyBinCount);

      this.isInitialized = true;
      this.startAnalysis();
    } catch (error) {
      console.error('Failed to initialize audio analyzer:', error);
    }
  }

  private startAnalysis(): void {
    const analyze = () => {
      if (!this.analyser || !this.dataArray || !this.frequencyData) return;

      // Get frequency and waveform data
      this.analyser.getByteFrequencyData(this.frequencyData);
      this.analyser.getByteTimeDomainData(this.dataArray);

      // Calculate frequency bands
      const bass = this.getFrequencyBand(0, 0.1);
      const mid = this.getFrequencyBand(0.1, 0.5);
      const treble = this.getFrequencyBand(0.5, 1);
      const energy = (bass + mid + treble) / 3;

      // Get peak value
      const peak = Math.max(...this.frequencyData) / 255;

      const audioData: AudioData = {
        frequency: Array.from(this.frequencyData).map(v => v / 255),
        waveform: Array.from(this.dataArray).map(v => (v - 128) / 128),
        bass: bass / 255,
        mid: mid / 255,
        treble: treble / 255,
        energy: energy / 255,
        peak: peak,
      };

      // Call all registered callbacks
      this.callbacks.forEach(callback => callback(audioData));

      this.animationFrameId = requestAnimationFrame(analyze);
    };

    analyze();
  }

  private getFrequencyBand(start: number, end: number): number {
    if (!this.frequencyData) return 0;

    const bandSize = this.frequencyData.length;
    const startIdx = Math.floor(start * bandSize);
    const endIdx = Math.floor(end * bandSize);

    let sum = 0;
    for (let i = startIdx; i < endIdx; i++) {
      sum += this.frequencyData[i];
    }

    return sum / (endIdx - startIdx);
  }

  subscribe(callback: (data: AudioData) => void): () => void {
    this.callbacks.add(callback);

    // Return unsubscribe function
    return () => {
      this.callbacks.delete(callback);
    };
  }

  dispose(): void {
    if (this.animationFrameId !== null) {
      cancelAnimationFrame(this.animationFrameId);
    }

    if (this.microphone) {
      this.microphone.disconnect();
    }

    if (this.analyser) {
      this.analyser.disconnect();
    }

    if (this.audioContext) {
      this.audioContext.close();
    }

    this.isInitialized = false;
  }
}

// Singleton instance
export const audioAnalyzer = new AudioAnalyzer();
