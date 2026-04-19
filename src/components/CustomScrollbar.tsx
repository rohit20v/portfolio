import { useEffect, useState, useRef } from "react";
import { motion, useScroll, useSpring, useTransform } from "motion/react";

const CustomScrollbar = () => {
    const [isDragging, setIsDragging] = useState(false);
    const [isScrolling, setIsScrolling] = useState(false);
    const scrollTrackRef = useRef<HTMLDivElement>(null);
    const scrollTimeoutRef = useRef<number | null>(null);
    const { scrollYProgress } = useScroll();

    // Detect scrolling to trigger color change
    useEffect(() => {
        const handleScroll = () => {
            setIsScrolling(true);
            if (scrollTimeoutRef.current) window.clearTimeout(scrollTimeoutRef.current);
            scrollTimeoutRef.current = window.setTimeout(() => {
                setIsScrolling(false);
            }, 1000); // Keep color for 1s after last scroll
        };

        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => {
            window.removeEventListener('scroll', handleScroll);
            if (scrollTimeoutRef.current) window.clearTimeout(scrollTimeoutRef.current);
        };
    }, []);

    // Smoothen the visual position of the thumb
    const smoothProgress = useSpring(scrollYProgress, {
        stiffness: 400,
        damping: 40,
        restDelta: 0.001
    });

    const y = useTransform(smoothProgress, [0, 1], ["0%", "300%"]);

    const handleMouseDown = (e: React.MouseEvent) => {
        setIsDragging(true);
        setIsScrolling(true);
        e.preventDefault();
        document.body.style.userSelect = 'none';
    };

    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            if (!isDragging || !scrollTrackRef.current) return;

            const trackRect = scrollTrackRef.current.getBoundingClientRect();
            const progress = Math.max(0, Math.min(1, (e.clientY - trackRect.top) / trackRect.height));

            const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
            window.scrollTo({
                top: progress * totalHeight,
                behavior: 'auto'
            });
        };

        const handleMouseUp = () => {
            setIsDragging(false);
            document.body.style.userSelect = '';
        };

        if (isDragging) {
            window.addEventListener("mousemove", handleMouseMove);
            window.addEventListener("mouseup", handleMouseUp);
        }

        return () => {
            window.removeEventListener("mousemove", handleMouseMove);
            window.removeEventListener("mouseup", handleMouseUp);
        };
    }, [isDragging]);

    return (
        <div 
            className="fixed right-2 top-1/2 -translate-y-1/2 w-1.5 h-[50vh] z-[100001] hidden md:block"
            aria-hidden="true"
        >
            <div 
                ref={scrollTrackRef}
                className="w-full h-full bg-foreground/10 rounded-full relative backdrop-blur-md cursor-pointer group"
                onClick={(e) => {
                    if (scrollTrackRef.current && !isDragging) {
                        const rect = scrollTrackRef.current.getBoundingClientRect();
                        const progress = (e.clientY - rect.top) / rect.height;
                        const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
                        window.scrollTo({
                            top: progress * totalHeight,
                            behavior: 'smooth'
                        });
                    }
                }}
            >
                {/* Thumb */}
                <motion.div
                    className="absolute top-0 left-0 w-full rounded-full cursor-grab active:cursor-grabbing bg-foreground/40 overflow-hidden"
                    style={{ 
                        height: '25%', 
                        y
                    }}
                    onMouseDown={handleMouseDown}
                >
                    {/* Continuous Color Overlay */}
                    <motion.div 
                        animate={{ opacity: isScrolling || isDragging ? 1 : 0 }}
                        transition={{ duration: isScrolling || isDragging ? 0.3 : 1.5, ease: "easeInOut" }}
                        className="absolute inset-0 bg-blue-500 animate-hue-rotate"
                    />
                </motion.div>
            </div>

            <style>{`
                @keyframes hue-rotate {
                    from { filter: hue-rotate(0deg); }
                    to { filter: hue-rotate(360deg); }
                }
                .animate-hue-rotate {
                    animation: hue-rotate 4s linear infinite;
                }
            `}</style>
        </div>
    );
};

export default CustomScrollbar;
