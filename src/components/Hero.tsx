import {useEffect, useRef, useState} from 'react';
import gsap from 'gsap';
import {ArrowDown} from 'lucide-react';
import PillAnimButton from "./PillAnimButton.tsx";
import Terminal from "./Terminal.tsx";
import { motion } from "motion/react";
import NameSelector from "./NameSelector.tsx";

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
        // todo replace pb with py
        <section className="relative w-full min-h-screen flex items-center justify-center pb-20 overflow-hidden" style={{perspective: '1000px'}}>

            {/* CONTENT LAYER */}
            <div className="relative z-50 flex flex-col items-center justify-center w-full px-6">
                
                <div className="md:hidden w-full">
                    <Terminal />
                </div>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 1 }}
                    className="max-w-5xl text-center">
                    
                    <NameSelector isDark={isDark} />

                    <h1
                        ref={titleRef}
                        className="text-5xl md:text-7xl font-black tracking-tighter leading-tight mb-6"
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

                    <p ref={subtitleRef} className="text-lg md:text-xl mb-12 max-w-2xl mx-auto">
                        I build web apps that are fast, scalable, and don’t feel like a pain to use.
                    </p>

                    <div ref={buttonRef} className="flex gap-4 justify-center">
                        <PillAnimButton
                            label={"View Projects"} 
                            href={"#projects"} 
                            baseColor={isDark ? "white" : "black"}
                            pillColor={isDark ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.05)"}
                            pillTextColor={isDark ? "white" : "black"}
                            hoveredPillTextColor={isDark ? "black" : "white"}
                        />
                        <PillAnimButton
                            label={"Get in Touch"} 
                            href={"#contact"} 
                            baseColor={isDark ? "white" : "black"}
                            pillColor={isDark ? "white" : "black"}
                            pillTextColor={isDark ? "black" : "white"}
                            hoveredPillTextColor={isDark ? "black" : "white"}
                        />
                    </div>
                </motion.div>
            </div>

            <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce text-white/30 z-50">
                <ArrowDown size={32}/>
            </div>
        </section>
    );
};

export default Hero;