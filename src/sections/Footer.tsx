import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowUpRight } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const navLinks = [
  { label: 'How It Works', id: 'how-it-works' },
  { label: 'Dashboard', id: 'dashboard' },
  { label: 'Contact', id: 'cta' },
];

export default function Footer() {
  const footerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const elements = footerRef.current?.querySelectorAll('.footer-reveal');
      elements?.forEach((el, i) => {
        gsap.from(el, {
          y: 40,
          opacity: 0,
          duration: 0.7,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: el,
            start: 'top 95%',
            once: true,
          },
          delay: i * 0.06,
        });
      });
    }, footerRef);

    return () => ctx.revert();
  }, []);

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <footer ref={footerRef} className="relative" style={{ background: '#020202' }}>
      {/* Top Divider — Gradient line */}
      <div className="h-px w-full" style={{ background: 'linear-gradient(90deg, transparent, rgba(0,255,136,0.3), transparent)' }} />

      {/* Main Footer Content */}
      <div className="max-w-[1280px] mx-auto px-6 lg:px-12 pt-20 pb-12">
        {/* Big CTA Row */}
        <div className="footer-reveal mb-20">
          <div className="flex flex-col lg:flex-row items-start lg:items-end justify-between gap-8">
            <div>
              <p className="text-sm font-mono uppercase tracking-[0.2em] mb-4" style={{ color: '#00ff88' }}>
                Ready to get started?
              </p>
              <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold" style={{ color: '#ffffff', lineHeight: 1.1 }}>
                Let's build your<br />
                <span style={{ color: '#00ff88' }}>smarter club.</span>
              </h2>
            </div>
            <a
              href="#cta"
              className="green-glow-btn text-lg px-10 py-5 inline-flex items-center gap-3 font-bold flex-shrink-0"
              onClick={(e) => { e.preventDefault(); scrollTo('cta'); }}
            >
              Book Demo
              <ArrowUpRight size={20} />
            </a>
          </div>
        </div>

        {/* Footer Grid */}
        <div className="footer-reveal grid grid-cols-2 md:grid-cols-4 gap-10 mb-16">
          {/* Logo Column */}
          <div className="col-span-2 md:col-span-1">
            <div className="flex items-center gap-3 mb-5">
              <img
                src="/images/logo.png"
                alt="CueTrack"
                className="w-10 h-10 object-contain rounded-full"
                style={{ filter: 'drop-shadow(0 0 8px rgba(0, 255, 136, 0.3))' }}
              />
              <div className="font-heading text-2xl font-bold tracking-widest" style={{ letterSpacing: '0.08em' }}>
                <span className="brand-cue">Cue</span>
                <span className="brand-track">Track</span>
              </div>
            </div>
            <p className="text-sm max-w-[260px] mb-6 leading-relaxed" style={{ color: '#555' }}>
              Smart management for smart clubs. One system for tables, billing, inventory, and more.
            </p>
          </div>

          {/* Navigation */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-[0.15em] mb-5" style={{ color: '#888' }}>
              Navigation
            </h4>
            <ul className="space-y-3">
              {navLinks.map((link) => (
                <li key={link.id}>
                  <button
                    onClick={() => scrollTo(link.id)}
                    className="text-sm transition-colors duration-300 hover:text-[#00ff88] cursor-pointer"
                    style={{ color: '#555' }}
                  >
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Product */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-[0.15em] mb-5" style={{ color: '#888' }}
            >
              Product
            </h4>
            <ul className="space-y-3">
              {['Table Tracking', 'Cafe Billing', 'Inventory', 'Reports'].map((item) => (
                <li key={item}>
                  <span className="text-sm transition-colors duration-300 hover:text-[#00ff88] cursor-pointer" style={{ color: '#555' }}>
                    {item}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-[0.15em] mb-5" style={{ color: '#888' }}>
              Contact
            </h4>
            <ul className="space-y-3">
              <li>
                <a href="tel:+918010997241" className="text-sm transition-colors duration-300 hover:text-[#00ff88]" style={{ color: '#555' }}>
                  +91-8010997241
                </a>
              </li>
              <li>
                <a href="tel:+917020721914" className="text-sm transition-colors duration-300 hover:text-[#00ff88]" style={{ color: '#555' }}>
                  +91-7020721914
                </a>
              </li>
              <li>
                <a href="mailto:anexuswebs@gmail.com" className="text-sm transition-colors duration-300 hover:text-[#00ff88]" style={{ color: '#555' }}>
                  anexuswebs@gmail.com
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="footer-reveal border-t pt-8" style={{ borderColor: 'rgba(255,255,255,0.06)' }}>
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
            <span className="text-xs" style={{ color: '#444' }}>
              © 2026 <span className="brand-cue">Cue</span><span className="brand-track">Track</span>. All rights reserved.
            </span>
            <span className="text-xs" style={{ color: '#444' }}>
              Built by{' '}
              <a
                href="https://anexuswebsolutions.vercel.app"
                target="_blank"
                rel="noopener noreferrer"
                className="transition-colors duration-300 hover:text-[#00ff88] font-medium"
                style={{ color: '#666' }}
              >
                Anexus Web Solutions
              </a>
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}

