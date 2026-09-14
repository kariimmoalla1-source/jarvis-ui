# Jarvis UI - Futuristic Reactor Interface

A stunning, interactive 3D visualization of a futuristic AI reactor interface, built with React, Three.js, and TypeScript. Inspired by Iron Man's JARVIS system.

## Features

✨ **Interactive 3D Visualization**
- Energy Core with dynamic color shifting based on temperature
- Orbital Rings with synchronized rotations
- Particle system creating an atmospheric effect
- Real-time rendering using Three.js WebGL

🎮 **Live Controls**
- Adjustable Power Level (0-100%)
- Core Intensity Control
- Temperature Adjustment (1000K - 5000K)
- Real-time system status display
- Toggle between online/offline states

🎨 **Design**
- Cyberpunk aesthetic with neon green (#00ff88) accent colors
- Responsive design adapts to all screen sizes
- Smooth animations and transitions
- Glitch effects and glowing shadows

⚡ **Technology Stack**
- React 18+ with TypeScript
- Three.js for 3D graphics
- Zustand for state management
- Vite for fast development and building
- Monospace font (Courier New) for authenticity

## Project Structure

```
jarvis-ui/
├── src/
│   ├── components/
│   │   ├── Reactor.tsx           # Main component with controls
│   │   ├── Reactor.css           # Styling for controls
│   │   ├── HologramScene.tsx      # Container for 3D visualization
│   │   ├── HologramScene.css      # Scene styling
│   │   ├── EnergyCore.tsx         # 3D energy core visualization
│   │   ├── OrbitalRings.tsx       # Rotating orbital rings
│   │   └── Particles.tsx          # Particle effects
│   ├── states/
│   │   └── jarvisState.ts         # Zustand state management
│   ├── main.tsx                   # React entry point
│   └── index.css                  # Global styles
├── index.html                      # HTML entry point
├── vite.config.ts                 # Vite configuration
├── tsconfig.json                  # TypeScript configuration
├── package.json                   # Dependencies and scripts
└── README.md                       # This file
```

## Getting Started

### Prerequisites
- Node.js 16+ and npm/yarn

### Installation

1. Clone the repository:
```bash
git clone https://github.com/kariimmoalla1-source/jarvis-ui.git
cd jarvis-ui
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

The application will open at `http://localhost:3000`

### Building for Production

```bash
npm run build
```

The optimized build will be in the `dist/` directory.

### Preview Production Build

```bash
npm run preview
```

## Usage

### Controls

- **Power Level Slider**: Adjust the overall power output and rotation speed
- **Core Intensity Slider**: Control the brightness and opacity of the core and effects
- **Temperature Slider**: Change the core color based on temperature (hotter = redder)
- **Status Button**: Toggle between ONLINE and OFFLINE states
- **Toggle Button (✕)**: Hide/show the control panel
- **Menu Button (≡)**: Show the control panel when hidden

### System Status Display

The control panel displays real-time metrics:
- **Output**: Power level × 0.75 MWh
- **Efficiency**: Power level × 0.92%
- **Core Temp**: Current temperature in Kelvin

## State Management

The application uses Zustand for state management. The main store (`useJarvisStore`) tracks:

```typescript
- isActive: boolean          // System power state
- powerLevel: 0-100         // Power output percentage
- temperature: 1000-5000    // Core temperature in Kelvin
- coreIntensity: 0-1        // Visualization intensity
- particleCount: 1000-10000 // Number of particles
```

## Customization

### Colors

Edit the color values in the component files:
- Energy Core: `src/components/EnergyCore.tsx` (HSL values)
- Orbital Rings: `src/components/OrbitalRings.tsx` (hex values)
- UI Controls: `src/components/Reactor.css` (CSS variables)

### Animation Speed

Adjust animation speeds in component files:
- Core rotation: `EnergyCore.tsx` lines ~95-97
- Ring rotation: `OrbitalRings.tsx` lines ~84-86
- Particle movement: `Particles.tsx` lines ~97-99

### UI Layout

Modify the control panel layout and styling in `Reactor.css`.

## Performance Tips

- Reduce `particleCount` in state for better performance on lower-end devices
- Disable vsync if experiencing stuttering
- Use production build for better performance

## Browser Compatibility

- Chrome/Edge 90+
- Firefox 88+
- Safari 14.1+
- Requires WebGL support

## Future Enhancements

- [ ] Add audio reactivity
- [ ] Implement keyboard shortcuts
- [ ] Add preset configurations
- [ ] Export/import settings
- [ ] Multiple visualization themes
- [ ] Advanced telemetry display
- [ ] Voice control integration

## License

MIT License - feel free to use this project for personal and commercial purposes.

## Credits

Created with inspiration from Iron Man's JARVIS system. Built with React, Three.js, and passion for futuristic UI design.

## Support

For issues or suggestions, please open an issue on GitHub.

---

**Made with ❤️ by kariimmoalla1-source**
