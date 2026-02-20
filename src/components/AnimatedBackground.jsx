import React from 'react';
import DotGrid from './DotGrid';

const AnimatedBackground = ({ children }) => {
  return (
    <div className="relative min-h-screen overflow-hidden">
      {/* DotGrid Background */}
      <div className="fixed inset-0 z-0" style={{ pointerEvents: 'auto' }}>
        <DotGrid
          dotSize={5}
          gap={15}
          baseColor="#1a0a2e"
          activeColor="#CF9EFF"
          proximity={120}
          shockRadius={250}
          shockStrength={5}
          resistance={750}
          returnDuration={1.5}
        />
      </div>

      {/* Subtle overlay to ensure content readability */}
      <div className="fixed inset-0 bg-[#060010]/40 z-[1] pointer-events-none" />

      <div className="relative z-10">{children}</div>
    </div>
  );
};

export default AnimatedBackground;
