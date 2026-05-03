import { useEffect, useState, useRef } from 'react';
import { Menu, X } from 'lucide-react';
import gsap from 'gsap';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [hidden, setHidden] = useState(false);
  const lastScrollY = useRef(0);
  const navRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      const currentY = window.scrollY;
      setScrolled(currentY > 100);
      if (currentY > lastScrollY.current && currentY > 200) {
        setHidden(true);
      } else {
        setHidden(false);
      }
      lastScrollY.current = currentY;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    gsap.to(navRef.current, {
      y: hidden ? -100 : 0,
      duration: 0.3,
      ease: 'power2.out',
    });
  }, [hidden]);

  const scrollTo = (id: string) => {
    setMenuOpen(false);
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const navLinks = [
    { label: 'How It Works', id: 'how-it-works' },
    { label: 'Dashboard', id: 'dashboard' },
    { label: 'Contact', id: 'cta' },
  ];

  return (
    <nav
      ref={navRef}
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
      style={{
        background: scrolled ? 'rgba(5, 5, 5, 0.9)' : 'transparent',
        backdropFilter: scrolled ? 'blur(16px)' : 'none',
        WebkitBackdropFilter: scrolled ? 'blur(16px)' : 'none',
        borderBottom: scrolled ? '1px solid rgba(255,255,255,0.04)' : '1px solid transparent',
      }}
    >
      <div className="max-w-[1280px] mx-auto px-6 lg:px-12 py-4 flex items-center justify-between">
        {/* Logo */}
        <div
          className="flex items-center gap-3 cursor-pointer group"
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        >
          <img
            src="/images/Cuetrack-Logo.png"
            alt="CueTrack"
            className="w-10 h-10 object-contain transition-transform duration-300 group-hover:scale-110"
            style={{ filter: 'drop-shadow(0 0 8px rgba(0, 255, 136, 0.3))' }}
          />
          <div className="font-heading text-xl font-bold tracking-widest" style={{ letterSpacing: '0.08em' }}>
            <span className="brand-cue">Cue</span>
            <span className="brand-track">Track</span>
          </div>
        </div>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <button
              key={link.id}
              onClick={() => scrollTo(link.id)}
              className="text-sm font-medium transition-colors duration-300 hover:text-[#00ff88]"
              style={{ color: '#b0b0b0' }}
            >
              {link.label}
            </button>
          ))}
          <button
            onClick={() => scrollTo('cta')}
            className="green-glow-btn text-sm px-6 py-2.5 font-bold"
          >
            Book Demo
          </button>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden p-2"
          onClick={() => setMenuOpen(!menuOpen)}
          style={{ color: '#ffffff' }}
        >
          {menuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div
          className="md:hidden px-6 pb-6 pt-2 flex flex-col gap-4"
          style={{ background: 'rgba(5, 5, 5, 0.98)', backdropFilter: 'blur(16px)' }}
        >
          {navLinks.map((link) => (
            <button
              key={link.id}
              onClick={() => scrollTo(link.id)}
              className="text-left text-base font-medium py-2 transition-colors duration-300 hover:text-[#00ff88]"
              style={{ color: '#b0b0b0' }}
            >
              {link.label}
            </button>
          ))}
          <button
            onClick={() => scrollTo('cta')}
            className="green-glow-btn text-sm px-5 py-3 mt-2 font-bold"
          >
            Book Demo
          </button>
        </div>
      )}
    </nav>
  );
}

