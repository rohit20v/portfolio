import {ArrowUpRight, Github, Linkedin, Mail, Twitter} from 'lucide-react';
import {socials} from "../utils/contants.ts";

const iconMap = {
    github: Github,
    linkedin: Linkedin,
    twitter: Twitter,
    mail: Mail,
};

const Socials = () => {
    return (
        <section id="contact" className="py-32 px-6">
            <div className="max-w-7xl mx-auto text-center">
                <h2 className="text-4xl md:text-7xl font-black mb-12 tracking-tighter">Let's build something <span
                    className="text-gradient">epic</span>.</h2>

                <div className="grid grid-cols-2 md:flex md:flex-wrap justify-center gap-4 md:gap-6 mb-20 rotate-button-arrow">
                    {socials.map((social) => {
                        const Icon = iconMap[social.icon];
                        return (
                        <a
                            key={social.name}
                            href={social.href}
                            className={`flex items-center justify-center md:justify-start gap-2 md:gap-3 px-4 md:px-8 py-4 bg-foreground/[0.05] md:bg-transparent glass rounded-2xl md:rounded-full font-bold text-base md:text-lg transition-all duration-300 hover:scale-110 ${social.color} hover-trigger`}
                        >
                            <Icon size={20} /> <span className="truncate">{social.name}</span> <ArrowUpRight size={18} className="opacity-50 button-arrow hidden md:block"/>
                        </a>
                    )})}
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
