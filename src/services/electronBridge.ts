/**
 * Electron Bridge Service
 * Communicates with JARVIS Electron backend
 */

export interface JARVISState {
  status: 'idle' | 'listening' | 'thinking' | 'speaking' | 'working' | 'error';
  powerLevel: number;
  temperature: number;
  coreIntensity: number;
  audioLevel?: number;
  message?: string;
}

export interface JARVISCommand {
  action: string;
  data?: any;
}

class ElectronBridge {
  private isElectron = false;
  private ipcRenderer: any = null;
  private listeners: Map<string, Set<(data: any) => void>> = new Map();

  constructor() {
    this.detectElectron();
  }

  private detectElectron(): void {
    try {
      // Check if running in Electron
      if ((window as any).require && (window as any).require.resolve) {
        const ipc = (window as any).require('electron').ipcRenderer;
        if (ipc) {
          this.ipcRenderer = ipc;
          this.isElectron = true;
          console.log('✓ Electron IPC bridge initialized');
          this.setupListeners();
        }
      }
    } catch (error) {
      console.log('⚠ Not running in Electron - using fallback mode');
    }
  }

  private setupListeners(): void {
    if (!this.ipcRenderer) return;

    // Listen for JARVIS state updates
    this.ipcRenderer.on('jarvis:state', (event: any, state: JARVISState) => {
      this.emit('jarvis:state', state);
    });

    // Listen for audio level updates
    this.ipcRenderer.on('jarvis:audio-level', (event: any, level: number) => {
      this.emit('jarvis:audio-level', level);
    });

    // Listen for error events
    this.ipcRenderer.on('jarvis:error', (event: any, error: string) => {
      this.emit('jarvis:error', error);
    });
  }

  /**
   * Send a command to JARVIS backend
   */
  async sendCommand(command: JARVISCommand): Promise<any> {
    if (!this.isElectron) {
      console.log('Demo mode - command:', command);
      return { success: true, demo: true };
    }

    return new Promise((resolve, reject) => {
      this.ipcRenderer.invoke('jarvis:command', command)
        .then(resolve)
        .catch(reject);
    });
  }

  /**
   * Request current JARVIS state
   */
  async getState(): Promise<JARVISState | null> {
    if (!this.isElectron) {
      return null;
    }

    try {
      return await this.ipcRenderer.invoke('jarvis:get-state');
    } catch (error) {
      console.error('Failed to get JARVIS state:', error);
      return null;
    }
  }

  /**
   * Send UI state update to JARVIS
   */
  async updateUIState(uiState: any): Promise<void> {
    await this.sendCommand({
      action: 'update-ui-state',
      data: uiState,
    });
  }

  /**
   * Subscribe to state changes
   */
  subscribe(event: string, callback: (data: any) => void): () => void {
    if (!this.listeners.has(event)) {
      this.listeners.set(event, new Set());
    }

    this.listeners.get(event)!.add(callback);

    // Return unsubscribe function
    return () => {
      this.listeners.get(event)?.delete(callback);
    };
  }

  /**
   * Emit event to subscribers
   */
  private emit(event: string, data: any): void {
    this.listeners.get(event)?.forEach(callback => callback(data));
  }

  /**
   * Check if running in Electron
   */
  getIsElectron(): boolean {
    return this.isElectron;
  }
}

// Singleton instance
export const electronBridge = new ElectronBridge();
