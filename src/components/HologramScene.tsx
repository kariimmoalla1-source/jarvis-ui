import React from 'react';
import { EnergyCore } from './EnergyCore';
import { OrbitalRings } from './OrbitalRings';
import { Particles } from './Particles';
import { useJarvisStore } from '../states/jarvisState';
import './HologramScene.css';

export const HologramScene: React.FC = () => {
  const { powerLevel, temperature, coreIntensity, particleCount } = useJarvisStore();

  return (
    <div className="hologram-scene">
      <div className="hologram-core">
        <EnergyCore intensity={coreIntensity} temperature={temperature} />
      </div>
      <div className="hologram-rings">
        <OrbitalRings speed={powerLevel / 100} intensity={coreIntensity} />
      </div>
      <div className="hologram-particles">
        <Particles count={particleCount} intensity={coreIntensity} />
      </div>
    </div>
  );
};
