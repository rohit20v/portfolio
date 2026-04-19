import {useState} from 'react';
import {ArrowUpRight, Github, Linkedin, Mail, Twitter} from 'lucide-react';
import {socials} from "../utils/contants.ts";
import RotatingText from "./RotatingText.tsx";
import {motion, LayoutGroup} from "motion/react";

const iconMap = {
    github: Github,
    linkedin: Linkedin,
    twitter: Twitter,
    mail: Mail,
};

const Socials = () => {
    const [activeIndex, setActiveIndex] = useState(0);

    const words = ['impactful!', 'awesome!', 'epic!', 'cool!', 'brilliant!', 'magic!', 'innovative!', 'slick!'];
    const colors = [
        'bg-cyan-300',
        'bg-rose-300',
        'bg-amber-300',
        'bg-emerald-300',
        'bg-indigo-300',
        'bg-purple-300',
        'bg-orange-300',
        'bg-lime-300'
    ];

    return (
        <section id="contact" className="pb-32 px-6">
            <div className="max-w-7xl mx-auto text-center">
                <LayoutGroup>
                    <motion.h2
                        layout
                        transition={{
                            layout: { type: "spring", damping: 30, stiffness: 150 }
                        }}
                        className="text-4xl md:text-7xl font-black mb-12 tracking-tighter flex flex-wrap md:flex-nowrap justify-center items-center gap-x-4 gap-y-2 overflow-visible"
                    >
                        <motion.span layout className="whitespace-nowrap">
                            Let's build something
                        </motion.span>
                        <RotatingText
                            layout
                            texts={words}
                            onNext={(index) => setActiveIndex(index)}
                            mainClassName={`px-2 sm:px-2 md:px-3 ${colors[activeIndex]} text-black overflow-hidden py-0.5 sm:py-1 md:py-2 justify-center rounded-lg inline-flex transition-colors duration-500`}
                            staggerFrom="last"
                            initial={{ y: "100%", opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            exit={{ y: "-120%", opacity: 0 }}
                            staggerDuration={0.025}
                            splitLevelClassName="overflow-hidden pb-0.5 sm:pb-1 md:pb-1"
                            transition={{ type: "spring", damping: 30, stiffness: 400 }}
                            rotationInterval={2000}
                            splitBy="characters"
                            auto
                            loop
                        />
                    </motion.h2>
                </LayoutGroup>

                <div
                    className="grid grid-cols-2 md:flex md:flex-wrap justify-center gap-4 md:gap-6 mb-20 rotate-button-arrow">
                    {socials.map((social) => {
                        const Icon = iconMap[social.icon];
                        return (
                            <a
                                key={social.name}
                                href={social.href}
                                className={`flex items-center justify-center md:justify-start gap-2 md:gap-3 px-4 md:px-8 py-4 bg-foreground/[0.05] md:bg-transparent glass rounded-2xl md:rounded-full font-bold text-base md:text-lg transition-all duration-300 hover:scale-110 ${social.color} hover-trigger`}
                            >
                                <Icon size={20}/> <span className="truncate">{social.name}</span> <ArrowUpRight
                                size={18} className="opacity-50 button-arrow hidden md:block"/>
                            </a>
                        )
                    })}
                </div>

                <footer
                    className="border-t border-white/10 pt-12 text-gray-500 text-sm flex flex-col md:flex-row items-center justify-between gap-6">
                    <p>© 2026 Developer Portfolio. All rights reserved.</p>
                    <div className="flex gap-8">
                        <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
                        <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
                    </div>
                </footer>
            </div>
        </section>
    );
};

export default Socials;
