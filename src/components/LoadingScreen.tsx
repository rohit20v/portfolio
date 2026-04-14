import { useEffect, useRef } from 'react';
import gsap from 'gsap';

const LoadingScreen = ({ onComplete }: { onComplete: () => void }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const keysRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const keys = keysRef.current?.children;
    if (!keys) return;

    const tl = gsap.timeline({
      onComplete: () => {
        gsap.to(containerRef.current, {
          opacity: 0,
          duration: 0.8,
          ease: "power4.inOut",
          onComplete
        });
      }
    });

    // Initial reveal
    tl.set(containerRef.current, { opacity: 1 })
      .from(keys, {
        y: 20,
        opacity: 0,
        duration: 0.8,
        stagger: 0.1,
        ease: "expo.out"
      })
      .from(textRef.current, {
        opacity: 0,
        y: 10,
        duration: 0.6,
        ease: "power2.out"
      }, "-=0.4");

    // "Typing" animation sequence
    tl.to(keys, {
      backgroundColor: "var(--text)",
      color: "var(--bg)",
      scale: 0.95,
      duration: 0.1,
      stagger: {
        each: 0.15,
        repeat: 1,
        yoyo: true
      }
    });

    // Wait a bit before finishing
    tl.to({}, { duration: 0.5 });

  }, [onComplete]);

  return (
    <div 
      ref={containerRef}
      className="fixed inset-0 z-9999 bg-background flex flex-col items-center justify-center space-y-8"
    >
      <div ref={keysRef} className="flex gap-3">
        {['⌘', 'K', 'S', 'P'].map((key, i) => (
          <div 
            key={i}
            className="w-16 h-16 md:w-20 md:h-20 border-2 border-foreground/10 rounded-2xl flex items-center justify-center text-2xl md:text-3xl font-bold shadow-sm"
            style={{ backgroundColor: 'transparent' }}
          >
            {key}
          </div>
        ))}
      </div>
      <div ref={textRef} className="text-foreground/40 font-medium tracking-[0.2em] uppercase text-xs md:text-sm">
        Initializing Workspace
      </div>
    </div>
  );
};

export default LoadingScreen;
