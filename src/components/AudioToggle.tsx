import React, { useEffect, useRef } from 'react';
import { useAudioStore } from '../states/audioStore';
import { audioAnalyzer } from '../services/audioAnalyzer';
import './AudioToggle.css';

interface AudioToggleProps {
  onStateChange?: (enabled: boolean) => void;
}

export const AudioToggle: React.FC<AudioToggleProps> = ({ onStateChange }) => {
  const { isAudioEnabled, enableAudio, disableAudio, updateAudioData } = useAudioStore();
  const unsubscribeRef = useRef<(() => void) | null>(null);

  const handleToggleAudio = async () => {
    if (!isAudioEnabled) {
      try {
        await audioAnalyzer.initialize();
        enableAudio();
        
        // Subscribe to audio data updates
        unsubscribeRef.current = audioAnalyzer.subscribe((data) => {
          updateAudioData(data);
        });
        
        onStateChange?.(true);
      } catch (error) {
        console.error('Failed to enable audio:', error);
        alert('Unable to access microphone. Please check permissions.');
      }
    } else {
      disableAudio();
      
      // Unsubscribe from audio updates
      if (unsubscribeRef.current) {
        unsubscribeRef.current();
        unsubscribeRef.current = null;
      }
      
      audioAnalyzer.dispose();
      onStateChange?.(false);
    }
  };

  useEffect(() => {
    return () => {
      if (unsubscribeRef.current) {
        unsubscribeRef.current();
      }
    };
  }, []);

  return (
    <button
      className={`audio-toggle ${isAudioEnabled ? 'active' : ''}`}
      onClick={handleToggleAudio}
      title={isAudioEnabled ? 'Disable audio reactivity' : 'Enable audio reactivity'}
    >
      <span className="audio-icon">
        {isAudioEnabled ? '🎤' : '🔇'}
      </span>
      <span className="audio-label">
        {isAudioEnabled ? 'Audio ON' : 'Audio OFF'}
      </span>
    </button>
  );
};
