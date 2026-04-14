import {useEffect, useRef, useState} from 'react';
import gsap from 'gsap';
import {ArrowDown} from 'lucide-react';

const Hero = ({isDark} : {isDark: boolean}) => {
    const [mounted, setMounted] = useState(false);
    const [index, setIndex] = useState(0);

    const titleRef = useRef<HTMLHeadingElement>(null);
    const subtitleRef = useRef<HTMLParagraphElement>(null);
    const buttonRef = useRef<HTMLDivElement>(null);
    const wordRef = useRef<HTMLSpanElement>(null);

    const words: { text: string, color: string }[] = [
        {text: "experiences.", color: '#ffb94f'},
        {text: "solutions.", color: '#7300ff'},
        {text: "interfaces.", color: '#F4127F'},
        {text: "applications.", color: '#12F0F4'},
    ];

    // 1. Ensure we only render the "Heavy" stuff after the browser is ready
    useEffect(() => {
        setMounted(true);
    }, []);

    // Word Rotation Logic
    useEffect(() => {
        if (!mounted || !wordRef.current) return;

        const rotateWords = () => {
            if (!wordRef.current) return;

            // Your original GSAP animation logic
            gsap.to(wordRef.current, {
                y: -30,
                rotateX: 90,
                opacity: 0,
                duration: 0.6,
                ease: "power2.inOut",
                onComplete: () => {
                    setIndex((prev) => (prev + 1) % words.length);

                    // Reset BEFORE next frame
                    gsap.set(wordRef.current, {
                        y: 30,
                        rotateX: -90,
                        opacity: 0,
                    });

                    // Animate back in
                    gsap.to(wordRef.current, {
                        y: 0,
                        rotateX: 0,
                        opacity: 1,
                        duration: 0.6,
                        ease: "power2.out",
                    });
                },
            });
        };

        const interval = setInterval(rotateWords, 3000);
        return () => clearInterval(interval);
    }, [mounted, words.length]);

    if (!mounted) return <div className="min-h-screen"/>;

    return (
        <section className="relative w-full h-screen overflow-hidden" style={{perspective: '1000px'}}>

            {/* BACKGROUND LAYER */}
            {/*<div className="absolute inset-0 z-0 pointer-events-none">*/}
            {/*    <LightRays*/}
            {/*        raysOrigin="top-center"*/}
            {/*        raysColor="#ffffff"*/}
            {/*        raysSpeed={1}*/}
            {/*        lightSpread={0.2}*/}
            {/*        rayLength={6}*/}
            {/*        followMouse={true}*/}
            {/*        mouseInfluence={0.2}*/}
            {/*        noiseAmount={0}*/}
            {/*        distortion={0}*/}
            {/*        className="custom-rays"*/}
            {/*        pulsating={false}*/}
            {/*        fadeDistance={1}*/}
            {/*        saturation={1}*/}
            {/*    />*/}
            {/*    <div className="absolute inset-0"/>*/}
            {/*</div>*/}

            {/* CONTENT LAYER */}
            <div className="relative z-50 flex flex-col items-center justify-center h-full px-6">

                <div className="max-w-5xl text-center">
                    <h1
                        ref={titleRef}
                        className="text-5xl md:text-8xl font-black tracking-tighter leading-tight mb-6"
                    >
                        I build digital <br/>
                        <span className="inline-block relative h-[1.1em] overflow-hidden perspective-[1000px]">
                            <span
                                ref={wordRef}
                                className={`inline-block origin-bottom will-change-transform`}
                                style={{
                                    transformStyle: "preserve-3d",
                                    color: words[index].color
                                }}
                            >
                                {words[index].text}
                            </span>
                        </span>
                    </h1>

                    <p ref={subtitleRef} className="text-lg md:text-2xl mb-12 max-w-2xl mx-auto">
                        I build web apps that are fast, scalable, and don’t feel like a pain to use.
                    </p>

                    <div ref={buttonRef} className="flex gap-4 justify-center">
                        {/*<button*/}
                        {/*    className={`px-8 py-4 bg-${isDark ? 'white' : 'black'} text-${isDark ? 'black' : 'white'} rounded-full font-bold hover:scale-110 transition-transform ease-in-out`}>*/}
                        {/*    View Projects*/}
                        {/*</button>*/}
                        <button
                            className={`px-8 py-4 border border-${isDark ? 'white/20' : 'black'} text-${isDark ? 'white' : 'black'} rounded-full font-bold hover:bg-white/10 transition-colors`}>
                            Get in Touch
                        </button>
                    </div>
                </div>
            </div>

            <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce text-white/30 z-50">
                <ArrowDown size={32}/>
            </div>
        </section>
    );
};

export default Hero;