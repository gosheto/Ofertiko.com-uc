import React, { useState, useEffect, useRef } from 'react';
import { Theme } from '../types';

export const OfertikoLogo: React.FC<{ theme: Theme; onClick?: () => void; className?: string; animated?: boolean }> = ({ theme, onClick, className = "w-32 h-32", animated = true }) => {
  const isDark = theme.id !== 'light' && theme.id !== 'pastel' && theme.id !== 'classic';
  const logoRef = useRef<HTMLDivElement>(null);
  const [eyePosition, setEyePosition] = useState({ x: 0, y: 0 });
  const [isTracking, setIsTracking] = useState(false);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!logoRef.current) return;

      const rect = logoRef.current.getBoundingClientRect();
      const logoCenterX = rect.left + rect.width / 2;
      const logoCenterY = rect.top + rect.height / 2;

      const deltaX = e.clientX - logoCenterX;
      const deltaY = e.clientY - logoCenterY;
      const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);

      if (distance < 500) {
        setIsTracking(true);
        const maxOffset = 6;
        const angle = Math.atan2(deltaY, deltaX);
        const offsetX = Math.cos(angle) * Math.min(distance / 30, maxOffset);
        const offsetY = Math.sin(angle) * Math.min(distance / 30, maxOffset);
        setEyePosition({ x: offsetX, y: offsetY });
      } else {
        setIsTracking(false);
        setEyePosition({ x: 0, y: 0 });
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div
      ref={logoRef}
      onClick={onClick}
      className={`relative ${className} ${animated ? 'animate-float' : ''} group cursor-pointer select-none active:scale-95 transition-transform`}
    >
      <svg key={theme.id} viewBox="0 0 200 200" className={`w-full h-full transition-transform duration-500 ease-in-out ${animated ? 'group-hover:rotate-6 group-hover:scale-110' : ''} ${isDark ? 'drop-shadow-[0_0_20px_rgba(34,211,238,0.6)]' : 'drop-shadow-[0_0_20px_rgba(6,182,212,0.4)]'}`}>
        <defs>
          <linearGradient id={`glass-grad-${theme.id}`} x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor={isDark ? "rgba(255, 255, 255, 0.25)" : "rgba(255, 255, 255, 0.9)"} />
            <stop offset="50%" stopColor={isDark ? "rgba(255, 255, 255, 0.05)" : "rgba(255, 255, 255, 0.6)"} />
            <stop offset="100%" stopColor={isDark ? "rgba(255, 255, 255, 0.15)" : "rgba(255, 255, 255, 0.8)"} />
          </linearGradient>

          {animated && (
            <linearGradient id={`dynamic-sheen-${theme.id}`} x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="white" stopOpacity="0" />
              <stop offset="50%" stopColor="white" stopOpacity={isDark ? "0.15" : "0.4"}>
                <animate attributeName="stop-opacity" values={isDark ? "0.15;0.3;0.15" : "0.4;0.6;0.4"} dur="4s" repeatCount="indefinite" />
              </stop>
              <stop offset="100%" stopColor="white" stopOpacity="0" />

              <animate attributeName="x1" values="-20%; 120%" dur="7s" repeatCount="indefinite" />
              <animate attributeName="y1" values="-20%; 120%" dur="7s" repeatCount="indefinite" />
              <animate attributeName="x2" values="20%; 160%" dur="7s" repeatCount="indefinite" />
              <animate attributeName="y2" values="20%; 160%" dur="7s" repeatCount="indefinite" />
            </linearGradient>
          )}

          <linearGradient id={`inner-glow-${theme.id}`} x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#22d3ee" stopOpacity={isDark ? "0.4" : "0.5"}>
              {animated && <animate attributeName="stop-color" values="#22d3ee;#ec4899;#a855f7;#22d3ee" dur="6s" repeatCount="indefinite" />}
            </stop>
            <stop offset="50%" stopColor="#a855f7" stopOpacity={isDark ? "0.3" : "0.4"}>
              {animated && <animate attributeName="stop-color" values="#a855f7;#22d3ee;#ec4899;#a855f7" dur="6s" repeatCount="indefinite" />}
            </stop>
            <stop offset="100%" stopColor="#ec4899" stopOpacity={isDark ? "0.4" : "0.5"}>
              {animated && <animate attributeName="stop-color" values="#ec4899;#a855f7;#22d3ee;#ec4899" dur="6s" repeatCount="indefinite" />}
            </stop>
          </linearGradient>
        </defs>

        <line x1="100" y1="10" x2="100" y2="50" stroke="#a855f7" strokeWidth="4" strokeLinecap="round" />
        <circle cx="100" cy="10" r="6" fill="#ec4899" className={animated ? "animate-pulse" : ""}>
          {animated && <animate attributeName="opacity" values="1;0.5;1" dur="2s" repeatCount="indefinite" />}
        </circle>

        <rect
          x="30" y="40" width="140" height="130" rx="40"
          fill={`url(#glass-grad-${theme.id})`}
          stroke={`url(#inner-glow-${theme.id})`}
          strokeWidth="3"
          className="backdrop-blur-md"
        />

        {animated && (
          <rect
            x="30" y="40" width="140" height="130" rx="40"
            fill={`url(#dynamic-sheen-${theme.id})`}
            pointerEvents="none"
          />
        )}

        <path d="M 40 80 Q 50 50 80 45" stroke={isDark ? "white" : "#1e293b"} strokeWidth="2" strokeOpacity="0.5" fill="none" />

        <g className={animated ? "animate-blink" : ""}>
          <ellipse
            cx={75 + eyePosition.x}
            cy={95 + eyePosition.y}
            rx="10"
            ry="12"
            fill={isDark ? "white" : "#1e293b"}
            filter={isDark ? "drop-shadow(0 0 5px #22d3ee)" : ""}
            style={{ transition: isTracking ? 'none' : 'cx 0.3s ease-out, cy 0.3s ease-out' }}
          />
          <ellipse
            cx={125 + eyePosition.x}
            cy={95 + eyePosition.y}
            rx="10"
            ry="12"
            fill={isDark ? "white" : "#1e293b"}
            filter={isDark ? "drop-shadow(0 0 5px #22d3ee)" : ""}
            style={{ transition: isTracking ? 'none' : 'cx 0.3s ease-out, cy 0.3s ease-out' }}
          />
        </g>

        <circle cx="60" cy="115" r="6" fill="#ec4899" fillOpacity="0.5" />
        <circle cx="140" cy="115" r="6" fill="#ec4899" fillOpacity="0.5" />

        <path
          d="M 75 130 Q 100 150 125 130"
          stroke={isDark ? "white" : "#1e293b"}
          strokeWidth="4"
          strokeLinecap="round"
          fill="none"
          strokeOpacity="0.9"
        />
      </svg>
    </div>
  );
};
