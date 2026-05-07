import { useEffect, useRef } from 'react';
import gsap from 'gsap';

interface LoadingScreenProps {
  onComplete: () => void;
}

export default function LoadingScreen({ onComplete }: LoadingScreenProps) {
  const overlayRef = useRef<HTMLDivElement>(null);
  const logoImgRef = useRef<HTMLImageElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const logoTextRef = useRef<HTMLDivElement>(null);
  const dotsRef = useRef<HTMLDivElement>(null);
  const captionRef = useRef<HTMLDivElement>(null);
  const shimmerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const tl = gsap.timeline();

    // Ring glow entrance
    tl.fromTo(ringRef.current, {
      opacity: 0,
      scale: 0.5,
      rotation: -90,
    }, {
      opacity: 1,
      scale: 1,
      rotation: 0,
      duration: 0.8,
      ease: 'back.out(1.4)',
    })
    // Logo image entrance
    .fromTo(logoImgRef.current, {
      opacity: 0,
      scale: 0.3,
      rotation: -20,
    }, {
      opacity: 1,
      scale: 1,
      rotation: 0,
      duration: 0.7,
      ease: 'back.out(1.7)',
    }, '-=0.5')
    // Text entrance
    .fromTo(logoTextRef.current, {
      opacity: 0,
      y: 20,
      scale: 0.9,
    }, {
      opacity: 1,
      y: 0,
      scale: 1,
      duration: 0.5,
      ease: 'power3.out',
    }, '-=0.3')
    // Dots entrance
    .to(dotsRef.current, { opacity: 1, duration: 0.3 }, '-=0.2')
    // Caption entrance
    .to(captionRef.current, { opacity: 1, duration: 0.3 }, '-=0.1')
    // Shimmer bar
    .fromTo(shimmerRef.current, {
      opacity: 0,
      scaleX: 0,
    }, {
      opacity: 1,
      scaleX: 1,
      duration: 0.6,
      ease: 'power2.inOut',
    }, '-=0.3');

    // Pulse dots animation
    const dots = dotsRef.current?.querySelectorAll('.loading-dot');
    if (dots) {
      gsap.to(dots, {
        scale: 1.5,
        opacity: 0.6,
        duration: 0.6,
        stagger: { each: 0.2, repeat: -1, yoyo: true },
        ease: 'power1.inOut',
      });
    }

    // Exit after 2.2s
    const timer = setTimeout(() => {
      gsap.to(overlayRef.current, {
        opacity: 0,
        scale: 1.05,
        duration: 0.6,
        ease: 'power2.inOut',
        onComplete: () => {
          if (overlayRef.current) {
            overlayRef.current.style.display = 'none';
          }
          onComplete();
        },
      });
    }, 2200);

    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <div
      ref={overlayRef}
      className="fixed inset-0 z-[9999] flex flex-col items-center justify-center gap-6"
      style={{ background: '#050505' }}
    >
      {/* Logo Container */}
      <div className="relative flex items-center justify-center">
        {/* Spinning glow ring */}
        <div
          ref={ringRef}
          className="absolute w-36 h-36 sm:w-44 sm:h-44 rounded-full opacity-0"
          style={{
            border: '2px solid rgba(0, 255, 136, 0.3)',
            boxShadow: '0 0 40px rgba(0, 255, 136, 0.15), inset 0 0 40px rgba(0, 255, 136, 0.05)',
            animation: 'spin-slow 4s linear infinite',
          }}
        />
        {/* Pulsing glow ring */}
        <div
          className="absolute w-32 h-32 sm:w-40 sm:h-40 rounded-full"
          style={{
            animation: 'logo-glow-pulse 2s ease-in-out infinite',
          }}
        />
        {/* Logo Image */}
        <img
          ref={logoImgRef}
          src="/images/logo.png"
          alt="CueTrack Logo"
          className="relative w-24 h-24 sm:w-28 sm:h-28 object-contain rounded-full opacity-0"
          style={{ filter: 'drop-shadow(0 0 20px rgba(0, 255, 136, 0.3))' }}
        />
      </div>

      {/* Brand Text */}
      <div ref={logoTextRef} className="opacity-0 flex items-baseline gap-0">
        <span
          className="text-4xl sm:text-5xl font-heading font-bold tracking-widest brand-cue"
          style={{ letterSpacing: '0.08em' }}
        >
          Cue
        </span>
        <span
          className="text-4xl sm:text-5xl font-heading font-bold tracking-widest brand-track"
          style={{ letterSpacing: '0.08em' }}
        >
          Track
        </span>
      </div>

      {/* Shimmer bar */}
      <div
        ref={shimmerRef}
        className="w-48 h-[2px] rounded-full opacity-0"
        style={{
          background: 'linear-gradient(90deg, transparent, #00ff88, transparent)',
          backgroundSize: '200% 100%',
          animation: 'shimmer 1.5s ease-in-out infinite',
          transformOrigin: 'center',
        }}
      />

      {/* Loading Dots */}
      <div ref={dotsRef} className="flex gap-3 opacity-0">
        <span
          className="loading-dot w-2 h-2 rounded-full"
          style={{ background: '#00ff88' }}
        />
        <span
          className="loading-dot w-2 h-2 rounded-full"
          style={{ background: '#00ff88' }}
        />
        <span
          className="loading-dot w-2 h-2 rounded-full"
          style={{ background: '#00ff88' }}
        />
      </div>

      {/* Caption */}
      <div ref={captionRef} className="opacity-0">
        <p className="text-sm" style={{ color: '#666666', fontFamily: 'var(--font-body)' }}>
          Loading your club experience...
        </p>
      </div>
    </div>
  );
}
