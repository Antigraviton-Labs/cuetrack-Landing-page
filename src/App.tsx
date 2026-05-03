import { useState, useEffect, useCallback, useRef } from 'react';
import Lenis from 'lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import LoadingScreen from './sections/LoadingScreen';
import Navbar from './sections/Navbar';
import Hero from './sections/Hero';
import ProblemStory from './sections/ProblemStory';
import DashboardShowcase from './sections/DashboardShowcase';
import AppScreenshotSlider from './sections/AppScreenshotSlider';
import TrustBadge from './sections/TrustBadge';
import CTASection from './sections/CTASection';
import Footer from './sections/Footer';
import NoiseOverlay from './components/NoiseOverlay';

gsap.registerPlugin(ScrollTrigger);

export default function App() {
  const [loaded, setLoaded] = useState(false);
  const lenisRef = useRef<Lenis | null>(null);

  const handleLoadComplete = useCallback(() => {
    setLoaded(true);
  }, []);

  useEffect(() => {
    // Initialize Lenis smooth scroll
    const lenis = new Lenis({
      lerp: 0.08,
      smoothWheel: true,
    });
    lenisRef.current = lenis;

    // Sync Lenis with GSAP ScrollTrigger
    lenis.on('scroll', ScrollTrigger.update);
    gsap.ticker.add((time) => {
      lenis.raf(time * 1000);
    });
    gsap.ticker.lagSmoothing(0);

    return () => {
      lenis.destroy();
      gsap.ticker.remove((time) => {
        lenis.raf(time * 1000);
      });
    };
  }, []);

  return (
    <div className="relative" style={{ background: '#050505', minHeight: '100vh' }}>
      <LoadingScreen onComplete={handleLoadComplete} />
      <NoiseOverlay />
      <Navbar />
      <main>
        <Hero animate={loaded} />
        <ProblemStory />
        <DashboardShowcase />
        <AppScreenshotSlider />
        <TrustBadge />
        <CTASection />
      </main>
      <Footer />
    </div>
  );
}

