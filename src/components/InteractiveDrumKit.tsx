import React, { useState, useEffect, useCallback } from 'react';
// import './App.css';

// Define drum kit types
type DrumKitName = 'rock' | 'jazz' | 'electronic';
type DrumPadConfig = {
  key: string;
  sound: string;
  label: string;
  color: string;
};

// Drum kit configurations
const DRUM_KITS: Record<DrumKitName, DrumPadConfig[]> = {
  rock: [
    { key: 'a', sound: '/src/sounds/kick.mp3', label: 'Kick', color: 'red' },
    { key: 's', sound: '/src/sounds/snare.mp3', label: 'Snare', color: 'blue' },
    { key: 'd', sound: '/src/sounds/hihat.mp3', label: 'Hi-Hat', color: 'green' },
    { key: 'f', sound: '/src/sounds/tom.mp3', label: 'Tom', color: 'yellow' },
    { key: 'l', sound: '/src/sounds/crash.mp3', label: 'Crash', color: 'purple' },
  ],
  jazz: [
    { key: 'a', sound: '/src/sounds/Jazz-kick.mp3', label: 'Kick', color: 'indigo' },
    { key: 's', sound: '/src/sounds/Jazz-snare.mp3', label: 'Snare', color: 'pink' },
    { key: 'd', sound: '/src/sounds/Jazz-hi-hat.mp3', label: 'Hi-Hat', color: 'teal' },
    { key: 'f', sound: '/src/sounds/Jazz-brush.mp3', label: 'Brush', color: 'orange' },
    { key: 'g', sound: '/src/sounds/Jazz-ride.mp3', label: 'Ride', color: 'cyan' },
  ],
  electronic: [
    { key: 'a', sound: '/src/sounds/electronic-kick.mp3', label: 'Kick', color: 'emerald' },
    { key: 's', sound: '/src/sounds/electronic-snare.mp3', label: 'Snare', color: 'sky' },
    { key: 'd', sound: '/src/sounds/electronic-hihat.mp3', label: 'Hi-Hat', color: 'lime' },
    { key: 'f', sound: '/src/sounds/electronic-clap.mp3', label: 'Clap', color: 'fuchsia' },
    { key: 'g', sound: '/src/sounds/electronic-synth.mp3', label: 'Synth', color: 'rose' },
  ]
};

const InteractiveDrumKit: React.FC = () => {
  const [currentKit, setCurrentKit] = useState<DrumKitName>('rock');
  const [activeKeys, setActiveKeys] = useState<string[]>([]);

  const playSound = useCallback((sound: string) => {
    try {
      const audio = new Audio(sound);
      audio.play().catch(error => {
        console.error('Error playing sound:', error);
      });
    } catch (error) {
      console.error('Sound playback failed:', error);
    }
  }, []);

  const triggerDrumPad = useCallback((pad: DrumPadConfig) => {
    playSound(pad.sound);
    setActiveKeys(prev => [...prev, pad.key]);
    setTimeout(() => {
      setActiveKeys(prev => prev.filter(k => k !== pad.key));
    }, 100);
  }, [playSound]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const pad = DRUM_KITS[currentKit].find(p => p.key === e.key.toLowerCase());
      if (pad) {
        triggerDrumPad(pad);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [currentKit, triggerDrumPad]);

  return (
    <div className="drum-kit-container">
      <div className="drum-kit-wrapper">
        <div className="drum-kit-header">
          <h1>Interactive Drum Kit</h1>
          <div className="kit-selector">
            {(Object.keys(DRUM_KITS) as DrumKitName[]).map(kit => (
              <button
                key={kit}
                onClick={() => setCurrentKit(kit)}
                className={currentKit === kit ? 'active' : ''}
              >
                {kit.charAt(0).toUpperCase() + kit.slice(1)}
              </button>
            ))}
          </div>
        </div>

        <div className="drum-pads">
          {DRUM_KITS[currentKit].map((pad) => (
            <button
              key={pad.key}
              onClick={() => triggerDrumPad(pad)}
              className={`drum-pad ${pad.color} ${activeKeys.includes(pad.key) ? 'active' : ''}`}
            >
              <span className="pad-label">{pad.label}</span>
              <span className="pad-key">{pad.key}</span>
            </button>
          ))}
        </div>

        <div className="drum-kit-footer">
          <p>Current Kit: <strong className='ram'>{currentKit.charAt(0).toUpperCase() + currentKit.slice(1)}</strong> </p>
        </div>
      </div>
    </div>
  );
};

export default InteractiveDrumKit;