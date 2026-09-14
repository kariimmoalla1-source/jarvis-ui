import React from 'react';
import { useVisualizationStore, THEMES } from '../states/visualizationStore';
import { useAudioStore } from '../states/audioStore';
import './VisualizationPanel.css';

export const VisualizationPanel: React.FC = () => {
  const {
    mode,
    setMode,
    theme,
    setTheme,
    particleCount,
    setParticleCount,
    rotationSpeed,
    setRotationSpeed,
    glowIntensity,
    setGlowIntensity,
    enableTrails,
    toggleTrails,
    enableGlitch,
    toggleGlitch,
    enableAudioReactivity,
    toggleAudioReactivity,
  } = useVisualizationStore();

  const { isAudioEnabled } = useAudioStore();

  return (
    <div className="visualization-panel">
      <div className="panel-header">
        <h3>⚙️ VISUALIZATION</h3>
      </div>

      {/* Mode Selection */}
      <div className="panel-section">
        <label>Visualization Mode</label>
        <div className="mode-buttons">
          {(['reactor', 'particles', 'energy', 'spectrum', 'waveform'] as const).map(
            (m) => (
              <button
                key={m}
                className={`mode-btn ${mode === m ? 'active' : ''}`}
                onClick={() => setMode(m)}
              >
                {m}
              </button>
            )
          )}
        </div>
      </div>

      {/* Theme Selection */}
      <div className="panel-section">
        <label>Color Theme</label>
        <select value={theme.name} onChange={(e) => {
          const themeName = Object.keys(THEMES).find(
            (k) => THEMES[k].name === e.target.value
          );
          if (themeName) setTheme(themeName);
        }}>
          {Object.entries(THEMES).map(([key, t]) => (
            <option key={key} value={t.name}>{t.name}</option>
          ))}
        </select>
      </div>

      {/* Particle Count */}
      <div className="panel-section">
        <label>Particles: {particleCount.toLocaleString()}</label>
        <input
          type="range"
          min="1000"
          max="50000"
          step="1000"
          value={particleCount}
          onChange={(e) => setParticleCount(Number(e.target.value))}
        />
      </div>

      {/* Rotation Speed */}
      <div className="panel-section">
        <label>Rotation Speed: {rotationSpeed.toFixed(2)}x</label>
        <input
          type="range"
          min="0"
          max="3"
          step="0.1"
          value={rotationSpeed}
          onChange={(e) => setRotationSpeed(Number(e.target.value))}
        />
      </div>

      {/* Glow Intensity */}
      <div className="panel-section">
        <label>Glow Intensity: {glowIntensity.toFixed(1)}</label>
        <input
          type="range"
          min="0"
          max="2"
          step="0.1"
          value={glowIntensity}
          onChange={(e) => setGlowIntensity(Number(e.target.value))}
        />
      </div>

      {/* Toggle Effects */}
      <div className="panel-section">
        <label className="checkbox-label">
          <input
            type="checkbox"
            checked={enableTrails}
            onChange={toggleTrails}
          />
          Particle Trails
        </label>
      </div>

      <div className="panel-section">
        <label className="checkbox-label">
          <input
            type="checkbox"
            checked={enableGlitch}
            onChange={toggleGlitch}
          />
          Glitch Effects
        </label>
      </div>

      <div className="panel-section">
        <label className="checkbox-label">
          <input
            type="checkbox"
            checked={enableAudioReactivity}
            onChange={toggleAudioReactivity}
            disabled={!isAudioEnabled}
          />
          Audio Reactivity {!isAudioEnabled && <span className="disabled-text">(Enable audio first)</span>}
        </label>
      </div>
    </div>
  );
};
