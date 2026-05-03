import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Trophy, Star, Headphones } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

interface HeroProps {
  animate: boolean;
}

export default function Hero({ animate }: HeroProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);
  const eyebrowRef = useRef<HTMLDivElement>(null);
  const headline1Ref = useRef<HTMLDivElement>(null);
  const headline2Ref = useRef<HTMLDivElement>(null);
  const subtextRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const trustRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  // Hero entrance animation
  useEffect(() => {
    if (!animate) return;

    const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

    tl.to(eyebrowRef.current, { y: 0, opacity: 1, duration: 0.6, delay: 0.2 })
      .to(headline1Ref.current, { y: 0, opacity: 1, duration: 0.8 }, '-=0.3')
      .to(headline2Ref.current, { y: 0, opacity: 1, duration: 0.8 }, '-=0.5')
      .to(subtextRef.current, { y: 0, opacity: 1, duration: 0.6 }, '-=0.4')
      .to(ctaRef.current, { y: 0, opacity: 1, duration: 0.5 }, '-=0.3')
      .to(trustRef.current, { y: 0, opacity: 1, duration: 0.5 }, '-=0.2');

    const floatingCards = cardsRef.current?.querySelectorAll('.floating-card');
    if (floatingCards && floatingCards.length > 0) {
      tl.to(floatingCards, {
        y: 0,
        opacity: 1,
        rotateX: 0,
        duration: 0.8,
        stagger: 0.15,
      }, '-=0.8');
    }

    return () => { tl.kill(); };
  }, [animate]);

  // Parallax background
  useEffect(() => {
    if (!bgRef.current || !sectionRef.current) return;

    const ctx = gsap.context(() => {
      gsap.to(bgRef.current, {
        yPercent: 30,
        ease: 'none',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: 0.5,
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen flex items-center overflow-hidden"
      id="hero"
    >
      {/* Background Image — Parallax */}
      <div ref={bgRef} className="absolute inset-0 z-0" style={{ top: '-15%', bottom: '-15%' }}>
        <img
          src="/images/hero-bg.jpg"
          alt="Luxury snooker club"
          className="w-full h-full object-cover"
        />
        <div
          className="absolute inset-0"
          style={{
            background: 'linear-gradient(90deg, rgba(5,5,5,0.95) 0%, rgba(5,5,5,0.7) 50%, rgba(5,5,5,0.3) 100%)',
          }}
        />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-[1280px] mx-auto px-6 lg:px-12 py-32 w-full">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Column - Text */}
          <div className="flex flex-col gap-6">
            {/* Logo + Eyebrow */}
            <div
              ref={eyebrowRef}
              className="opacity-0 translate-y-5 flex items-center gap-4"
            >
              <img
                src="/images/Cuetrack-Logo.png"
                alt="CueTrack"
                className="w-12 h-12 object-contain"
                style={{ filter: 'drop-shadow(0 0 12px rgba(0, 255, 136, 0.3))' }}
              />
              <span
                className="text-xs font-mono uppercase tracking-[0.2em]"
                style={{ color: '#00ff88' }}
              >
                SMART CLUB MANAGEMENT
              </span>
            </div>

            <div>
              <div
                ref={headline1Ref}
                className="opacity-0 translate-y-10"
              >
                <h1
                  className="font-heading text-5xl sm:text-6xl lg:text-7xl xl:text-8xl font-bold leading-[1.05]"
                  style={{ color: '#ffffff', letterSpacing: '-0.02em' }}
                >
                  Run Your Club
                </h1>
              </div>
              <div
                ref={headline2Ref}
                className="opacity-0 translate-y-10"
              >
                <h1
                  className="font-heading text-5xl sm:text-6xl lg:text-7xl xl:text-8xl font-bold leading-[1.05]"
                  style={{ letterSpacing: '-0.02em' }}
                >
                  <span style={{ color: '#ffffff' }}>Like a </span>
                  <span style={{ color: '#00ff88' }}>Pro</span>
                </h1>
              </div>
            </div>

            <p
              ref={subtextRef}
              className="opacity-0 translate-y-5 text-lg lg:text-xl max-w-[520px] leading-relaxed"
              style={{ color: '#b0b0b0' }}
            >
              <span className="brand-cue font-semibold">Cue</span>
              <span className="brand-track font-semibold">Track</span> replaces messy notebooks and Excel chaos with one powerful system for snooker clubs, pool halls, and gaming cafes.
            </p>

            <div
              ref={ctaRef}
              className="opacity-0 translate-y-5 flex flex-wrap gap-5"
            >
              <a href="#cta" className="green-glow-btn inline-block text-lg px-10 py-5 font-bold">
                Book Free Demo
              </a>
              <a href="#how-it-works" className="ghost-btn inline-block text-lg px-10 py-5">
                See How It Works
              </a>
            </div>

            <div
              ref={trustRef}
              className="opacity-0 translate-y-4 flex flex-wrap gap-10 mt-8"
            >
              <div className="flex items-center gap-2">
                <Trophy size={18} style={{ color: '#00ff88' }} />
                <span className="text-sm font-medium" style={{ color: '#666666' }}>100+ Clubs</span>
              </div>
              <div className="flex items-center gap-2">
                <Star size={18} style={{ color: '#00ff88' }} />
                <span className="text-sm font-medium" style={{ color: '#666666' }}>4.9 Rating</span>
              </div>
              <div className="flex items-center gap-2">
                <Headphones size={18} style={{ color: '#00ff88' }} />
                <span className="text-sm font-medium" style={{ color: '#666666' }}>24/7 Support</span>
              </div>
            </div>
          </div>

          {/* Right Column - Floating Cards */}
          <div
            ref={cardsRef}
            className="relative hidden lg:block h-[500px]"
          >
            {/* Card 1 - Table Timer */}
            <div
              className="floating-card absolute top-[10%] left-[10%] w-[210px] glass-card-glow p-6 opacity-0"
              style={{
                transform: 'translateY(60px) rotateX(15deg)',
                animation: 'float 4s ease-in-out infinite',
              }}
            >
              <div className="font-mono text-xs uppercase tracking-widest mb-2" style={{ color: 'rgba(255,255,255,0.5)' }}>
                Table 3
              </div>
              <div className="flex justify-between items-baseline">
                <span className="font-mono text-3xl font-bold text-white">47 min</span>
                <span className="font-mono text-xl font-semibold" style={{ color: '#00ff88' }}>₹240</span>
              </div>
            </div>

            {/* Card 2 - Revenue */}
            <div
              className="floating-card absolute top-[35%] right-[5%] w-[230px] glass-card-glow p-6 opacity-0"
              style={{
                transform: 'translateY(60px) rotateX(15deg)',
                animation: 'float 5s ease-in-out infinite',
                animationDelay: '-1s',
              }}
            >
              <div className="font-mono text-xs uppercase tracking-widest mb-2" style={{ color: 'rgba(255,255,255,0.5)' }}>
                Today's Revenue
              </div>
              <div className="font-mono text-3xl font-bold mb-3" style={{ color: '#00ff88' }}>
                ₹12,450
              </div>
              <div className="flex gap-1 h-8 items-end">
                <div className="w-3 rounded-sm" style={{ height: '40%', background: 'rgba(0,255,136,0.3)' }} />
                <div className="w-3 rounded-sm" style={{ height: '60%', background: 'rgba(0,255,136,0.5)' }} />
                <div className="w-3 rounded-sm" style={{ height: '45%', background: 'rgba(0,255,136,0.3)' }} />
                <div className="w-3 rounded-sm" style={{ height: '80%', background: 'rgba(0,255,136,0.7)' }} />
                <div className="w-3 rounded-sm" style={{ height: '55%', background: 'rgba(0,255,136,0.4)' }} />
                <div className="w-3 rounded-sm" style={{ height: '70%', background: '#00ff88' }} />
              </div>
            </div>

            {/* Card 3 - Order */}
            <div
              className="floating-card absolute bottom-[15%] left-[20%] w-[250px] glass-card-glow p-6 opacity-0"
              style={{
                transform: 'translateY(60px) rotateX(15deg)',
                animation: 'float 6s ease-in-out infinite',
                animationDelay: '-2s',
              }}
            >
              <div className="font-mono text-xs uppercase tracking-widest mb-2" style={{ color: 'rgba(255,255,255,0.5)' }}>
                Order #42
              </div>
              <div className="text-sm text-white space-y-1">
                <div className="flex justify-between">
                  <span>2 Cold Coffee</span>
                  <span style={{ color: '#00ff88' }}>₹120</span>
                </div>
                <div className="flex justify-between">
                  <span>1 Fries</span>
                  <span style={{ color: '#00ff88' }}>₹80</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
