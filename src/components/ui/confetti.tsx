
import React, { useEffect, useState } from 'react';
import confetti from 'canvas-confetti';

interface ConfettiProps {
  duration?: number;
  particleCount?: number;
  spread?: number;
  colors?: string[];
  trigger?: boolean;
  onComplete?: () => void;
}

export const Confetti: React.FC<ConfettiProps> = ({
  duration = 3000,
  particleCount = 100,
  spread = 70,
  colors = ['#ff7b00', '#ff3cbd', '#5ffad0', '#8f61e9', '#ffd62e'],
  trigger = false,
  onComplete
}) => {
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    if (!trigger) return;
    
    setIsActive(true);
    
    const end = Date.now() + duration;
    
    // Create the confetti burst
    const frameInterval = 40; // ms between frames
    
    const frame = () => {
      confetti({
        particleCount: particleCount / 15,
        angle: 60,
        spread,
        origin: { x: 0, y: 0.8 },
        colors,
        disableForReducedMotion: true,
      });
      
      confetti({
        particleCount: particleCount / 15,
        angle: 120,
        spread,
        origin: { x: 1, y: 0.8 },
        colors,
        disableForReducedMotion: true,
      });
      
      if (Date.now() < end) {
        requestAnimationFrame(frame);
      } else {
        setIsActive(false);
        if (onComplete) onComplete();
      }
    };
    
    frame();
    
    return () => {
      setIsActive(false);
    };
  }, [trigger, duration, particleCount, spread, colors, onComplete]);

  return null;
};

export default Confetti;
