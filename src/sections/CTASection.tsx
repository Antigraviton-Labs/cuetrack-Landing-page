import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Phone, Mail, MessageCircle } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export default function CTASection() {
  const sectionRef = useRef<HTMLElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Parallax background
      if (bgRef.current) {
        gsap.to(bgRef.current, {
          yPercent: 15,
          ease: 'none',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top bottom',
            end: 'bottom top',
            scrub: 0.5,
          },
        });
      }

      const headline = sectionRef.current?.querySelector('.cta-headline');
      const subtext = sectionRef.current?.querySelector('.cta-subtext');
      const buttons = sectionRef.current?.querySelectorAll('.cta-btn');
      const contacts = sectionRef.current?.querySelectorAll('.cta-contact');
      const qr = sectionRef.current?.querySelector('.cta-qr');
      const logo = sectionRef.current?.querySelector('.cta-logo');

      if (logo) {
        gsap.from(logo, {
          scale: 0.5,
          opacity: 0,
          rotation: -15,
          duration: 0.8,
          ease: 'back.out(1.7)',
          scrollTrigger: { trigger: sectionRef.current, start: 'top 75%', once: true },
        });
      }

      if (headline) {
        gsap.from(headline, {
          y: 60,
          opacity: 0,
          duration: 0.9,
          ease: 'power3.out',
          scrollTrigger: { trigger: sectionRef.current, start: 'top 75%', once: true },
          delay: 0.15,
        });
      }

      if (subtext) {
        gsap.from(subtext, {
          y: 30,
          opacity: 0,
          duration: 0.7,
          ease: 'power3.out',
          scrollTrigger: { trigger: sectionRef.current, start: 'top 75%', once: true },
          delay: 0.3,
        });
      }

      buttons?.forEach((btn, i) => {
        gsap.from(btn, {
          y: 30,
          opacity: 0,
          scale: 0.95,
          duration: 0.6,
          ease: 'back.out(1.4)',
          scrollTrigger: { trigger: sectionRef.current, start: 'top 75%', once: true },
          delay: 0.45 + i * 0.12,
        });
      });

      contacts?.forEach((c, i) => {
        gsap.from(c, {
          x: -30,
          opacity: 0,
          duration: 0.5,
          ease: 'power3.out',
          scrollTrigger: { trigger: sectionRef.current, start: 'top 75%', once: true },
          delay: 0.6 + i * 0.1,
        });
      });

      if (qr) {
        gsap.from(qr, {
          scale: 0.7,
          opacity: 0,
          rotation: -10,
          duration: 0.8,
          ease: 'back.out(1.7)',
          scrollTrigger: { trigger: sectionRef.current, start: 'top 75%', once: true },
          delay: 0.5,
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative py-32 lg:py-44 overflow-hidden"
      id="cta"
    >
      {/* Background Image */}
      <div ref={bgRef} className="absolute inset-0 z-0" style={{ top: '-15%', bottom: '-15%' }}>
        <img
          src="/images/bg-cta.png"
          alt=""
          className="w-full h-full object-cover"
          aria-hidden="true"
        />
        <div
          className="absolute inset-0"
          style={{
            background: 'linear-gradient(180deg, rgba(5,5,5,0.93) 0%, rgba(5,5,5,0.85) 50%, rgba(5,5,5,0.95) 100%)',
          }}
        />
      </div>

      {/* Gradient mesh overlay */}
      <div
        className="absolute inset-0 z-[1]"
        style={{
          background: 'radial-gradient(ellipse at 20% 30%, rgba(0,255,136,0.08) 0%, transparent 50%), radial-gradient(ellipse at 80% 70%, rgba(0,255,136,0.05) 0%, transparent 50%)',
        }}
      />

      <div className="relative z-10 max-w-[1280px] mx-auto px-6 lg:px-12">
        <div className="grid lg:grid-cols-[1fr_auto] gap-16 items-center">
          {/* Left Content */}
          <div className="text-center lg:text-left">
            {/* Logo */}
            <img
              src="/images/Cuetrack-Logo.png"
              alt="CueTrack"
              className="cta-logo w-20 h-20 object-contain mb-8 mx-auto lg:mx-0"
              style={{ filter: 'drop-shadow(0 0 20px rgba(0, 255, 136, 0.3))' }}
            />

            <span className="font-mono text-xs uppercase tracking-[0.2em] block mb-5" style={{ color: '#00ff88' }}>
              READY TO UPGRADE?
            </span>
            <h2 className="cta-headline font-heading text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold mb-8" style={{ color: '#ffffff', lineHeight: 1.1 }}>
              Stop Managing<br />Like 2010.<br /><span style={{ color: '#00ff88' }}>Upgrade Today.</span>
            </h2>
            <p className="cta-subtext text-lg lg:text-xl mb-12 max-w-[550px] mx-auto lg:mx-0" style={{ color: '#b0b0b0' }}>
              Join 100+ clubs already running smarter with <span className="brand-cue font-semibold">Cue</span><span className="brand-track font-semibold">Track</span>. Book your free demo now.
            </p>

            {/* Buttons */}
            <div className="flex flex-wrap gap-5 justify-center lg:justify-start mb-12">
              <a href="mailto:anexuswebs@gmail.com?subject=CUETRACK%20Demo%20Request" className="cta-btn green-glow-btn text-lg px-12 py-5 inline-flex items-center gap-2 font-bold">
                Book Free Demo
              </a>
              <a
                href="https://wa.me/918010997241"
                target="_blank"
                rel="noopener noreferrer"
                className="cta-btn ghost-btn text-lg px-12 py-5 inline-flex items-center gap-2"
                style={{ borderColor: '#25D366', color: '#25D366' }}
              >
                <MessageCircle size={20} />
                WhatsApp Now
              </a>
            </div>

            {/* Contact Info */}
            <div className="flex flex-col gap-4 items-center lg:items-start">
              <a href="tel:+918010997241" className="cta-contact flex items-center gap-3 text-base lg:text-lg hover:text-[#00ff88] transition-colors" style={{ color: '#ffffff' }}>
                <Phone size={20} style={{ color: '#00ff88' }} />
                +91-8010997241
              </a>
              <a href="tel:+917020721914" className="cta-contact flex items-center gap-3 text-base lg:text-lg hover:text-[#00ff88] transition-colors" style={{ color: '#ffffff' }}>
                <Phone size={20} style={{ color: '#00ff88' }} />
                +91-7020721914
              </a>
              <a href="mailto:anexuswebs@gmail.com" className="cta-contact flex items-center gap-3 text-base lg:text-lg hover:text-[#00ff88] transition-colors" style={{ color: '#ffffff' }}>
                <Mail size={20} style={{ color: '#00ff88' }} />
                anexuswebs@gmail.com
              </a>
            </div>
          </div>

          {/* Right - QR Code */}
          <div className="cta-qr flex flex-col items-center">
            <div className="glass-card p-6 rounded-2xl" style={{ border: '1px solid rgba(0,255,136,0.2)' }}>
              <img
                src="/images/qr-code.jpg"
                alt="Scan to explore CueTrack"
                className="w-40 h-40 lg:w-48 lg:h-48 object-contain rounded-xl"
              />
            </div>
            <span className="text-sm mt-4 font-medium" style={{ color: '#666666' }}>
              Scan to Explore
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
