import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function DashboardShowcase() {
  const sectionRef = useRef<HTMLElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Parallax background
      if (bgRef.current) {
        gsap.to(bgRef.current, {
          yPercent: 20,
          ease: 'none',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top bottom',
            end: 'bottom top',
            scrub: 0.5,
          },
        });
      }

      // Header reveal
      const headerElements = headerRef.current?.querySelectorAll('.reveal-el');
      headerElements?.forEach((el, i) => {
        gsap.from(el, {
          y: 50,
          opacity: 0,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: { trigger: el, start: 'top 88%', once: true },
          delay: i * 0.15,
        });
      });

      const container = sectionRef.current?.querySelector('.dashboard-container');

      if (container) {
        gsap.from(container, {
          y: 120,
          opacity: 0,
          scale: 0.85,
          duration: 1.2,
          ease: 'power3.out',
          scrollTrigger: { trigger: sectionRef.current, start: 'top 70%', once: true },
        });

        // Parallax scale
        gsap.fromTo(container, { scale: 0.93 }, {
          scale: 1,
          ease: 'none',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 80%',
            end: 'center center',
            scrub: 0.8,
          },
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative py-28 lg:py-40 overflow-hidden"
      id="dashboard"
    >
      {/* Background Image */}
      <div ref={bgRef} className="absolute inset-0 z-0" style={{ top: '-15%', bottom: '-15%' }}>
        <img
          src="/images/bg-dashboard.png"
          alt=""
          className="w-full h-full object-cover"
          aria-hidden="true"
        />
        <div
          className="absolute inset-0"
          style={{
            background: 'linear-gradient(180deg, rgba(5,5,5,0.94) 0%, rgba(5,5,5,0.88) 50%, rgba(5,5,5,0.94) 100%)',
          }}
        />
      </div>

      <div className="relative z-10 max-w-[1280px] mx-auto px-6 lg:px-12">
        {/* Header */}
        <div ref={headerRef} className="text-center mb-12 lg:mb-16">
          <span className="reveal-el font-mono text-xs uppercase tracking-[0.2em] block mb-5" style={{ color: '#00ff88' }}>
            COMMAND CENTER
          </span>
          <h2 className="reveal-el font-heading text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold mb-6" style={{ color: '#ffffff', lineHeight: 1.1 }}>
            Your Club,<br /><span style={{ color: '#00ff88' }}>One Screen</span>
          </h2>
          <p className="reveal-el text-lg lg:text-xl max-w-[650px] mx-auto" style={{ color: '#b0b0b0' }}>
            Every table, every order, every rupee—tracked in real time. Total control at your fingertips.
          </p>
        </div>

        {/* Dashboard Mockup */}
        <div
          className="dashboard-container relative max-w-[1000px] mx-auto rounded-3xl overflow-hidden"
          style={{
            border: '1px solid rgba(0,255,136,0.2)',
            boxShadow: '0 30px 100px rgba(0,0,0,0.6), 0 0 80px rgba(0,255,136,0.06)',
            padding: '8px',
            background: 'rgba(255,255,255,0.02)',
          }}
        >
          <img
            src="/screens/maindashboard.jpeg"
            alt="Full CueTrack dashboard"
            className="w-full h-auto rounded-2xl"
            loading="lazy"
          />
        </div>
      </div>
    </section>
  );
}

