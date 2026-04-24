import {motion} from "motion/react";
import {MousePointer2} from "lucide-react";
import React from "react";
import gsap from "gsap"

const NameSelector = ({isDark}: { isDark: boolean }) => {
    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        const link = e.currentTarget
        const rect = link.getBoundingClientRect()
        const x = e.clientX - rect.left - rect.width / 2
        const y = e.clientY - rect.top - rect.height / 2
        gsap.to(link, {x: x * 0.8, y: y * 0.8, duration: 0.4, ease: "power2.out"})
    }

    const handleMouseLeave = (e: React.MouseEvent<HTMLDivElement>) => {
        gsap.to(e.currentTarget, {x: 0, y: 0, duration: 0.6, ease: "elastic.out(1, 0.5)"})
    }

    const handleTouchStart = (e: React.TouchEvent<HTMLDivElement>) => {
        gsap.to(e.currentTarget, {x: 0, y: 0, duration: 0, overwrite: true})
    }

    return (
        <motion.div
            initial={{opacity: 0, y: 20}}
            animate={{opacity: 1, y: 0}}
            transition={{duration: 0.8, delay: 0.5}}
            className="hidden md:flex flex-col items-center justify-center gap-2 mb-12"
        >
            <span className={`text-6xl font-medium ${isDark ? 'text-white/80' : 'text-black/80'}`}>
                Hi! I'm
            </span>
            <div className="relative inline-block px-4 py-2">
                <span
                    className={`text-7xl md:text-9xl font-black tracking-tighter relative z-10 ${isDark ? 'text-white' : 'text-black'}`}>
                    Rohit Verma
                </span>

                {/* Selection Overlay - Glass like, no blur */}
                <motion.div
                    initial={{width: 0, height: 0, top: 0, left: 0}}
                    animate={{
                        width: "100%",
                        height: "100%"
                    }}
                    transition={{
                        duration: 1.6,
                        delay: 1.8,
                        ease: "easeInOut"
                    }}
                    className={`absolute z-20 pointer-events-none rounded-lg border ${
                        isDark
                            ? 'bg-white/10 border-white/20'
                            : 'bg-black/5 border-black/10'
                    }`}
                />

                {/* Mouse Cursor */}
                <motion.div
                    initial={{left: "0%", top: "0%", opacity: 0}}
                    animate={{
                        left: "100%",
                        top: "100%",
                        opacity: 1
                    }}
                    transition={{
                        duration: 1.6,
                        delay: 1.8,
                        ease: "easeInOut"
                    }}
                    className="absolute z-30 pointer-events-none"
                    style={{marginLeft: '-8px', marginTop: '-8px'}}
                >
                    <motion.div
                        animate={{scale: [1, 0.8, 1]}}
                        transition={{
                            duration: 0.2,
                            delay: 3.0,
                        }}
                    >
                        <div
                            onMouseMove={handleMouseMove}
                            onMouseLeave={handleMouseLeave}
                            onTouchStart={handleTouchStart}
                            className="pointer-events-auto cursor-none p-3 -m-3"
                        >
                            <MousePointer2
                                strokeWidth={1}
                                stroke={isDark ? "#fff" : "#000"}
                                className={`w-8 h-8 ${isDark ? 'text-black fill-black' : 'text-white fill-white'} drop-shadow-[0_4px_12px_rgba(0,0,0,0.4)]`}
                            />
                        </div>
                    </motion.div>
                </motion.div>
            </div>
        </motion.div>
    );
};

export default NameSelector;
