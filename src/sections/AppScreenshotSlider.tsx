import { useState, useEffect, useRef, useCallback } from 'react';

const images = [
  { src: '/screens/maindashboard.jpeg', alt: 'Main Dashboard' },
  { src: '/screens/tables.jpeg', alt: 'Tables' },
  { src: '/screens/booktable.jpeg', alt: 'Book Table' },
  { src: '/screens/inventory.jpeg', alt: 'Inventory' },
  { src: '/screens/balancetracker.jpeg', alt: 'Balance Tracker' },
  { src: '/screens/reports.jpeg', alt: 'Reports Overview' },
  { src: '/screens/report1.jpeg', alt: 'Detailed Report 1' },
  { src: '/screens/report2.jpeg', alt: 'Detailed Report 2' },
  { src: '/screens/settingsandlogs.jpeg', alt: 'Settings and Logs' },
  { src: '/screens/tableendsession.jpeg', alt: 'Table End Session' },
];

export default function AppScreenshotSlider() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const autoIntervalRef = useRef<number | null>(null);

  const totalSlides = images.length;

  const goToSlide = useCallback((index: number) => {
    if (index < 0) index = 0;
    if (index >= totalSlides) index = totalSlides - 1;
    setCurrentIndex(index);
  }, [totalSlides]);

  const nextSlide = useCallback(() => {
    const next = currentIndex + 1 >= totalSlides ? 0 : currentIndex + 1;
    setCurrentIndex(next);
  }, [currentIndex, totalSlides]);

  const prevSlide = useCallback(() => {
    const prev = currentIndex - 1 < 0 ? totalSlides - 1 : currentIndex - 1;
    setCurrentIndex(prev);
  }, [currentIndex, totalSlides]);

  // Auto-play
  useEffect(() => {
    autoIntervalRef.current = window.setInterval(nextSlide, 4500);
    return () => {
      if (autoIntervalRef.current) {
        window.clearInterval(autoIntervalRef.current);
      }
    };
  }, [nextSlide]);

  // Pause on hover
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const pause = () => {
      if (autoIntervalRef.current) {
        window.clearInterval(autoIntervalRef.current);
      }
    };
    const resume = () => {
      autoIntervalRef.current = window.setInterval(nextSlide, 4500);
    };

    container.addEventListener('mouseenter', pause);
    container.addEventListener('mouseleave', resume);

    return () => {
      container.removeEventListener('mouseenter', pause);
      container.removeEventListener('mouseleave', resume);
    };
  }, [nextSlide]);

  // Keyboard
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') prevSlide();
      if (e.key === 'ArrowRight') nextSlide();
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [nextSlide, prevSlide]);

  return (
    <section 
      id="screenshots"
      className="w-full h-screen flex items-center justify-center overflow-hidden" 
      style={{
        background: 'linear-gradient(135deg, #0A2F1F 0%, #05180e 100%)'
      }}
    >
      <div 
        ref={containerRef}
        className="w-[90%] max-w-[1300px] h-[85%] bg-[rgba(20,20,30,0.35)] backdrop-blur-[14px] rounded-[48px] border border-[rgba(212,175,55,0.4)] shadow-[0_25px_45px_rgba(0,0,0,0.5),inset_0_1px_1px_rgba(255,255,255,0.1)] p-8 flex flex-col transition-all duration-300"
      >
        {/* Header */}
        <div className="text-center mb-6">
          <h2 
            className="text-[2.2rem] font-semibold leading-tight" 
            style={{
              background: 'linear-gradient(135deg, #fff, #D4AF37)',
              WebkitBackgroundClip: 'text',
              backgroundClip: 'text',
              color: 'transparent',
              letterSpacing: '-0.5px'
            }}
          >
            ⚡ CueTrak in action
          </h2>
          <p className="text-[0.9rem] mt-1" style={{ color: '#ccc' }}>
            Offline club manager — 10 real screenshots
          </p>
        </div>

        {/* Carousel Wrapper */}
        <div className="flex-1 relative flex items-center justify-center overflow-hidden rounded-[32px] bg-[rgba(0,0,0,0.2)]">
          <button 
            className="absolute top-1/2 -translate-y-1/2 bg-[rgba(0,0,0,0.6)] backdrop-blur-[8px] border-none w-11 h-11 rounded-[60px] flex items-center justify-center cursor-pointer text-[2rem] transition-all duration-200 z-10 left-5"
            style={{ color: '#D4AF37' }}
            aria-label="Previous"
            onClick={prevSlide}
          >
            ‹
          </button>
          
          <div 
            className="carousel-track w-full h-full flex"
            style={{ 
              transform: `translateX(-${currentIndex * 100}%)`,
              transition: 'transform 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94)'
            }}
          >
            {images.map((image, index) => (
              <div key={index} className="flex-none w-full h-full flex items-center justify-center p-4">
                <img 
                  src={image.src}
                  alt={image.alt}
                  className="max-w-full max-h-full object-contain rounded-[24px] shadow-[0_20px_35px_rgba(0,0,0,0.5)] border-2 border-[rgba(212,175,55,0.2)] transition-transform duration-200 hover:scale-[1.05]"
                />
              </div>
            ))}
          </div>
          
          <button 
            className="absolute top-1/2 -translate-y-1/2 bg-[rgba(0,0,0,0.6)] backdrop-blur-[8px] border-none w-11 h-11 rounded-[60px] flex items-center justify-center cursor-pointer text-[2rem] transition-all duration-200 z-10 right-5"
            style={{ color: '#D4AF37' }}
            aria-label="Next"
            onClick={nextSlide}
          >
            ›
          </button>
        </div>

        {/* Dots */}
        <div className="flex justify-center gap-3 mt-6">
          {images.map((_, index) => (
            <button
              key={index}
              className={`w-[10px] h-[10px] rounded-[20px] transition-all duration-200 cursor-pointer ${index === currentIndex ? 'bg-[#D4AF37] w-[28px]' : 'bg-[rgba(255,255,255,0.3)]'}`}
              onClick={() => goToSlide(index)}
              aria-label={`Slide ${index + 1}`}
            />
          ))}
        </div>

        {/* Footer note */}
        <div className="text-center mt-4 text-[0.7rem]" style={{ color: '#aaa' }}>
          ← swipe or click arrows →
        </div>
      </div>
    </section>
  );
}

