import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Trophy, Star, Shield, Zap } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const badges = [
  { icon: Trophy, text: '100+ Active Clubs' },
  { icon: Star, text: '4.9/5 Average Rating' },
  { icon: Shield, text: 'Bank-Grade Security' },
  { icon: Zap, text: '99.9% Uptime' },
];

export default function TrustBadge() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const items = sectionRef.current?.querySelectorAll('.trust-item');
      items?.forEach((item, i) => {
        gsap.from(item, {
          y: 20,
          opacity: 0,
          scale: 0.9,
          duration: 0.5,
          ease: 'back.out(1.4)',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 92%',
            once: true,
          },
          delay: i * 0.1,
        });
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={sectionRef}
      className="py-8 overflow-hidden relative"
      style={{ background: 'rgba(0,255,136,0.04)' }}
    >
      {/* Subtle border lines */}
      <div className="absolute top-0 left-0 right-0 h-px" style={{ background: 'linear-gradient(90deg, transparent, rgba(0,255,136,0.15), transparent)' }} />
      <div className="absolute bottom-0 left-0 right-0 h-px" style={{ background: 'linear-gradient(90deg, transparent, rgba(0,255,136,0.15), transparent)' }} />

      {/* Desktop: Static */}
      <div className="hidden md:flex max-w-[1280px] mx-auto px-6 lg:px-12 justify-center gap-16 flex-wrap">
        {badges.map((badge) => {
          const Icon = badge.icon;
          return (
            <div key={badge.text} className="trust-item flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg flex items-center justify-center" style={{ background: 'rgba(0,255,136,0.1)' }}>
                <Icon size={20} style={{ color: '#00ff88' }} />
              </div>
              <span className="text-sm font-semibold" style={{ color: '#ffffff' }}>
                {badge.text}
              </span>
            </div>
          );
        })}
      </div>

      {/* Mobile: Marquee */}
      <div className="md:hidden flex animate-marquee whitespace-nowrap">
        {[...badges, ...badges].map((badge, i) => {
          const Icon = badge.icon;
          return (
            <div key={`${badge.text}-${i}`} className="trust-item flex items-center gap-3 mx-8">
              <Icon size={18} style={{ color: '#00ff88' }} />
              <span className="text-sm font-semibold" style={{ color: '#ffffff' }}>
                {badge.text}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
