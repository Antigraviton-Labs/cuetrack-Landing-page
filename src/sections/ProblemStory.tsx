import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function ProblemStory() {
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
          scrollTrigger: {
            trigger: el,
            start: 'top 88%',
            once: true,
          },
          delay: i * 0.15,
        });
      });

      // Scene card reveals
      const cards = sectionRef.current?.querySelectorAll('.scene-card');
      const badges = sectionRef.current?.querySelectorAll('.scene-badge');
      const overlays = sectionRef.current?.querySelectorAll('.scene-overlay');

      cards?.forEach((card, i) => {
        gsap.from(card, {
          y: 80,
          opacity: 0,
          scale: 0.92,
          duration: 0.9,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: card,
            start: 'top 85%',
            once: true,
          },
          delay: i * 0.2,
        });
      });

      badges?.forEach((badge, i) => {
        gsap.from(badge, {
          scale: 0,
          opacity: 0,
          duration: 0.5,
          ease: 'back.out(1.7)',
          scrollTrigger: {
            trigger: badge,
            start: 'top 85%',
            once: true,
          },
          delay: 0.3 + i * 0.2,
        });
      });

      overlays?.forEach((overlay, i) => {
        gsap.from(overlay, {
          y: 20,
          opacity: 0,
          duration: 0.6,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: overlay,
            start: 'top 85%',
            once: true,
          },
          delay: 0.4 + i * 0.2,
        });
      });

      // Arrow
      const arrow = sectionRef.current?.querySelector('.arrow-indicator');
      if (arrow) {
        gsap.from(arrow, {
          scale: 0,
          opacity: 0,
          duration: 0.6,
          ease: 'back.out(1.7)',
          scrollTrigger: { trigger: arrow, start: 'top 90%', once: true },
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative py-28 lg:py-40 overflow-hidden"
      id="how-it-works"
    >
      {/* Background Image */}
      <div ref={bgRef} className="absolute inset-0 z-0" style={{ top: '-15%', bottom: '-15%' }}>
        <img
          src="/images/bg-problem-story.png"
          alt=""
          className="w-full h-full object-cover"
          aria-hidden="true"
        />
        <div
          className="absolute inset-0"
          style={{
            background: 'linear-gradient(180deg, rgba(5,5,5,0.92) 0%, rgba(5,5,5,0.85) 50%, rgba(5,5,5,0.92) 100%)',
          }}
        />
      </div>

      <div className="relative z-10 max-w-[1280px] mx-auto px-6 lg:px-12">
        {/* Header */}
        <div ref={headerRef} className="text-center mb-20 max-w-[900px] mx-auto">
          <span className="reveal-el font-mono text-xs uppercase tracking-[0.2em] block mb-5" style={{ color: '#00ff88' }}>
            HOW IT WORKS
          </span>
          <h2 className="reveal-el font-heading text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold mb-6" style={{ color: '#ffffff', lineHeight: 1.1 }}>
            From Chaos<br />to <span style={{ color: '#00ff88' }}>Control</span>
          </h2>
          <p className="reveal-el text-lg lg:text-xl max-w-[600px] mx-auto" style={{ color: '#b0b0b0' }}>
            See how <span className="brand-cue font-semibold">Cue</span><span className="brand-track font-semibold">Track</span> transforms the way you run your club
          </p>
        </div>

        {/* Three Scene Cards */}
        <div className="grid md:grid-cols-3 gap-8">
          {/* Scene 1 */}
          <div className="scene-card relative rounded-2xl overflow-hidden aspect-[4/3] group">
            <img src="/images/notebook-chaos.jpg" alt="Messy handwritten notebook" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
            <div className="absolute inset-0 bg-gradient-to-t from-[rgba(5,5,5,0.95)] via-[rgba(5,5,5,0.3)] to-transparent" />
            <div className="scene-badge absolute top-4 left-4 flex items-center gap-2 px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wider" style={{ background: 'rgba(255,50,50,0.2)', color: '#ff4444', backdropFilter: 'blur(8px)' }}>
              <span>❌</span> Error Prone
            </div>
            <div className="scene-overlay absolute bottom-0 left-0 right-0 p-6">
              <h3 className="text-xl font-bold text-white mb-2">Notebook Chaos</h3>
              <p className="text-sm" style={{ color: '#b0b0b0' }}>
                Messy handwritten records. Lost pages. Wrong totals. Revenue slipping through cracks.
              </p>
            </div>
          </div>

          {/* Scene 2 */}
          <div className="scene-card relative rounded-2xl overflow-hidden aspect-[4/3] group">
            <img src="/images/excel-confusion.jpg" alt="Cluttered Excel spreadsheet" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
            <div className="absolute inset-0 bg-gradient-to-t from-[rgba(5,5,5,0.95)] via-[rgba(5,5,5,0.3)] to-transparent" />
            <div className="scene-badge absolute top-4 left-4 flex items-center gap-2 px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wider" style={{ background: 'rgba(255,50,50,0.2)', color: '#ff4444', backdropFilter: 'blur(8px)' }}>
              <span>❌</span> Time Waste
            </div>
            <div className="scene-overlay absolute bottom-0 left-0 right-0 p-6">
              <h3 className="text-xl font-bold text-white mb-2">Excel Frustration</h3>
              <p className="text-sm" style={{ color: '#b0b0b0' }}>
                Broken formulas. Deleted rows. Hours wasted daily on manual data entry.
              </p>
            </div>
          </div>

          {/* Scene 3 */}
          <div className="scene-card relative rounded-2xl overflow-hidden aspect-[4/3] group">
            <img src="/images/dashboard-ui.jpg" alt="Clean CueTrack dashboard" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
            <div className="absolute inset-0 bg-gradient-to-t from-[rgba(5,5,5,0.95)] via-[rgba(5,5,5,0.3)] to-transparent" />
            <div className="scene-badge absolute top-4 left-4 flex items-center gap-2 px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wider" style={{ background: 'rgba(0,255,136,0.15)', color: '#00ff88', backdropFilter: 'blur(8px)' }}>
              <span>✅</span> Automated
            </div>
            <div className="scene-overlay absolute bottom-0 left-0 right-0 p-6">
              <h3 className="text-xl font-bold text-white mb-2"><span className="brand-cue">Cue</span><span className="brand-track">Track</span> Solution</h3>
              <p className="text-sm" style={{ color: '#b0b0b0' }}>
                One screen. Every table. Real-time updates. Zero errors.
              </p>
            </div>
          </div>
        </div>

        {/* Transition Arrow */}
        <div className="flex justify-center mt-14">
          <div
            className="arrow-indicator w-20 h-20 rounded-full flex items-center justify-center text-3xl font-bold animate-pulse-glow"
            style={{ background: 'rgba(0,255,136,0.15)', color: '#00ff88', border: '1px solid rgba(0,255,136,0.3)' }}
          >
            ↓
          </div>
        </div>
      </div>
    </section>
  );
}
