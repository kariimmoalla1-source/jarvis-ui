import React, { useEffect, useState } from 'react';
import { useElectronStore } from '../states/electronStore';
import { useAudioStore } from '../states/audioStore';
import { electronBridge, JARVISState } from '../services/electronBridge';
import './StatusBar.css';

export const StatusBar: React.FC = () => {
  const { jarvisState, isElectron, isConnected } = useElectronStore();
  const { audioData } = useAudioStore();
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const unsubscribe = electronBridge.subscribe(
      'jarvis:state',
      (state: JARVISState) => {
        useElectronStore.getState().updateJarvisState(state);
      }
    );

    return () => unsubscribe?.();
  }, []);

  if (!isVisible && !isElectron) return null;

  const statusColor = jarvisState
    ? getStatusColor(jarvisState.status)
    : '#666';

  return (
    <div className="status-bar">
      {/* Electron Connection Status */}
      {isElectron && (
        <div className="status-item">
          <span className={`status-indicator ${isConnected ? 'connected' : 'disconnected'}`}></span>
          <span className="status-text">
            {isConnected ? 'CONNECTED' : 'DISCONNECTED'}
          </span>
        </div>
      )}

      {/* JARVIS State */}
      {jarvisState && (
        <>
          <div className="status-item">
            <span className="status-indicator" style={{ backgroundColor: statusColor }}></span>
            <span className="status-text">
              {jarvisState.status.toUpperCase()}
            </span>
          </div>

          <div className="status-item">
            <span className="status-label">PWR:</span>
            <span className="status-value">{jarvisState.powerLevel.toFixed(0)}%</span>
          </div>

          <div className="status-item">
            <span className="status-label">TEMP:</span>
            <span className="status-value">{Math.round(jarvisState.temperature)}K</span>
          </div>
        </>
      )}

      {/* Audio Data */}
      {audioData && (
        <>
          <div className="status-item">
            <span className="status-label">BASS:</span>
            <span className="status-value">{(audioData.bass * 100).toFixed(0)}%</span>
          </div>

          <div className="status-item">
            <span className="status-label">MID:</span>
            <span className="status-value">{(audioData.mid * 100).toFixed(0)}%</span>
          </div>

          <div className="status-item">
            <span className="status-label">PEAK:</span>
            <span className="status-value">{(audioData.peak * 100).toFixed(0)}%</span>
          </div>
        </>
      )}

      {/* Toggle Button */}
      <button
        className="status-toggle"
        onClick={() => setIsVisible(!isVisible)}
        title={isVisible ? 'Hide status bar' : 'Show status bar'}
      >
        {isVisible ? '▼' : '▲'}
      </button>
    </div>
  );
};

function getStatusColor(status: string): string {
  switch (status) {
    case 'idle':
      return '#00ff88';
    case 'listening':
      return '#00ccff';
    case 'thinking':
      return '#ffaa00';
    case 'speaking':
      return '#ff0088';
    case 'working':
      return '#00aaff';
    case 'error':
      return '#ff0000';
    default:
      return '#666';
  }
}
