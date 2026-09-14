import React, { useState } from 'react';
import { HologramScene } from './HologramScene';
import { useJarvisStore } from '../states/jarvisState';
import './Reactor.css';

export const Reactor: React.FC = () => {
  const {
    isActive,
    powerLevel,
    temperature,
    coreIntensity,
    toggleActive,
    setPowerLevel,
    setTemperature,
    setCoreIntensity,
  } = useJarvisStore();

  const [showControls, setShowControls] = useState(true);

  return (
    <div className="reactor-container">
      <HologramScene />

      {showControls && (
        <div className="reactor-controls">
          <div className="control-panel">
            <div className="panel-header">
              <h1>JARVIS REACTOR</h1>
              <button
                className={`status-indicator ${isActive ? 'active' : 'inactive'}`}
                onClick={toggleActive}
              >
                {isActive ? '● ONLINE' : '● OFFLINE'}
              </button>
            </div>

            <div className="control-group">
              <label>Power Level</label>
              <input
                type="range"
                min="0"
                max="100"
                value={powerLevel}
                onChange={(e) => setPowerLevel(Number(e.target.value))}
                className="slider"
              />
              <span className="value">{powerLevel}%</span>
            </div>

            <div className="control-group">
              <label>Core Intensity</label>
              <input
                type="range"
                min="0"
                max="1"
                step="0.01"
                value={coreIntensity}
                onChange={(e) => setCoreIntensity(Number(e.target.value))}
                className="slider"
              />
              <span className="value">{(coreIntensity * 100).toFixed(0)}%</span>
            </div>

            <div className="control-group">
              <label>Temperature (K)</label>
              <input
                type="range"
                min="1000"
                max="5000"
                step="100"
                value={temperature}
                onChange={(e) => setTemperature(Number(e.target.value))}
                className="slider"
              />
              <span className="value">{temperature}K</span>
            </div>

            <div className="system-status">
              <div className="status-line">
                <span>SYSTEM STATUS</span>
                <span className="status-dot">●</span>
              </div>
              <div className="status-line">
                <span>Output:</span>
                <span>{(powerLevel * 0.75).toFixed(1)} MWh</span>
              </div>
              <div className="status-line">
                <span>Efficiency:</span>
                <span>{(powerLevel * 0.92).toFixed(1)}%</span>
              </div>
              <div className="status-line">
                <span>Core Temp:</span>
                <span>{temperature}K</span>
              </div>
            </div>
          </div>

          <button
            className="toggle-controls"
            onClick={() => setShowControls(!showControls)}
            title="Toggle Controls"
          >
            ✕
          </button>
        </div>
      )}

      {!showControls && (
        <button
          className="show-controls"
          onClick={() => setShowControls(true)}
          title="Show Controls"
        >
          ≡
        </button>
      )}
    </div>
  );
};
