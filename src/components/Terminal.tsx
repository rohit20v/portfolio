import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';

const Terminal = () => {
    const [lines, setLines] = useState<string[]>([]);
    const [currentLineIndex, setCurrentLineIndex] = useState(0);
    const [currentCharIndex, setCurrentCharIndex] = useState(0);

    const terminalData = [
        { label: "➜", color: "text-blue-400", text: "hello world" },
        { label: "➜", color: "text-blue-400", text: "whoami" },
        { label: "root", color: "text-purple-400", text: "Rohit Verma", isOutput: true },
        { label: "➜", color: "text-blue-400", text: "about" },
        { label: "found", color: "text-emerald-400", text: "partime full stack developer full time learner", isOutput: true },
        { label: "➜", color: "text-blue-400", text: "status" },
        { label: "status", color: "text-amber-400", text: "feel free to hit me up for work, collabs, and chats", isOutput: true },
    ];

    useEffect(() => {
        if (currentLineIndex < terminalData.length) {
            const currentLine = terminalData[currentLineIndex];
            
            if (currentLine.isOutput) {
                // Outputs appear instantly or with a small delay
                const timeout = setTimeout(() => {
                    setLines(prev => [...prev, `${currentLine.text}`]);
                    setCurrentLineIndex(prev => prev + 1);
                }, 400);
                return () => clearTimeout(timeout);
            } else {
                // Commands type out
                if (currentCharIndex < currentLine.text.length) {
                    const timeout = setTimeout(() => {
                        setCurrentCharIndex(prev => prev + 1);
                    }, 50);
                    return () => clearTimeout(timeout);
                } else {
                    const timeout = setTimeout(() => {
                        setLines(prev => [...prev, currentLine.text]);
                        setCurrentLineIndex(prev => prev + 1);
                        setCurrentCharIndex(0);
                    }, 600);
                    return () => clearTimeout(timeout);
                }
            }
        }
    }, [currentLineIndex, currentCharIndex, terminalData]);

    return (
        <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="w-full max-w-2xl mx-auto mb-12 rounded-xl overflow-hidden border border-white/10 bg-black/80 backdrop-blur-xl shadow-2xl font-mono text-left"
        >
            <div className="flex items-center justify-between px-4 py-3 bg-white/5 border-b border-white/10">
                <div className="flex gap-2">
                    <div className="w-3 h-3 rounded-full bg-[#ff5f56]" />
                    <div className="w-3 h-3 rounded-full bg-[#ffbd2e]" />
                    <div className="w-3 h-3 rounded-full bg-[#27c93f]" />
                </div>
                <div className="text-[10px] md:text-xs text-white/40 font-medium">
                    rohit — 80×24
                </div>
                <div className="w-12" /> {/* Spacer to balance */}
            </div>
            
            <div className="p-4 md:p-6 text-sm md:text-base leading-relaxed h-64 md:h-72 overflow-y-auto custom-scrollbar">
                <AnimatePresence mode="popLayout">
                    {lines.map((line, idx) => {
                        const data = terminalData[idx];
                        return (
                            <motion.div 
                                key={idx}
                                initial={{ opacity: 0, x: -5 }}
                                animate={{ opacity: 1, x: 0 }}
                                className="mb-1 flex gap-3"
                            >
                                <span className={`${data.color} font-bold shrink-0`}>{data.label}</span>
                                <span className="text-white/90 break-all">{line}</span>
                            </motion.div>
                        );
                    })}
                </AnimatePresence>

                {currentLineIndex < terminalData.length && !terminalData[currentLineIndex].isOutput && (
                    <div className="flex gap-3">
                        <span className={`${terminalData[currentLineIndex].color} font-bold shrink-0`}>
                            {terminalData[currentLineIndex].label}
                        </span>
                        <span className="text-white/90">
                            {terminalData[currentLineIndex].text.slice(0, currentCharIndex)}
                            <span className="inline-block w-2 h-5 bg-white/60 ml-1 animate-pulse align-middle" />
                        </span>
                    </div>
                )}
                
                {currentLineIndex === terminalData.length && (
                   <motion.div 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="flex flex-col gap-1"
                   >
                     <div className="flex gap-3">
                        <span className="text-blue-400 font-bold">➜</span>
                        <a 
                            href="#contact" 
                            className="text-white/60 hover:text-white underline underline-offset-4 decoration-white/20 hover:decoration-white transition-all cursor-pointer"
                        >
                            ./contact_me
                        </a>
                        <span className="inline-block w-2 h-5 bg-white/60 animate-pulse align-middle" />
                     </div>
                   </motion.div>
                )}
            </div>
        </motion.div>
    );
};

export default Terminal;
