import { useRef, useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { gsap } from 'gsap';
import type { MenuItem } from "../utils/types.ts";

interface MobileMenuProps {
    items: MenuItem[];
    theme?: 'dark' | 'light';
}

export default function MobileMenu({ items, theme = 'dark' }: MobileMenuProps) {
    const topRef = useRef<HTMLSpanElement>(null);
    const midRef = useRef<HTMLSpanElement>(null);
    const botRef = useRef<HTMLSpanElement>(null);
    const sidebarRef = useRef<HTMLDivElement>(null);
    const textRefs = useRef<(HTMLLIElement | null)[]>([]);
    const tlRef = useRef<gsap.core.Timeline | null>(null);
    const [isOpen, setIsOpen] = useState(false);
    const [mounted, setMounted] = useState(false);

    const isDark = theme === 'dark';
    const sidebarBg = isDark ? '#111' : '#fff';
    const itemTextColor = isDark ? '#fff' : '#000';
    const burgerColor = isDark ? '#fff' : '#000';

    useEffect(() => {
        setMounted(true);
    }, []);

    useEffect(() => {
        if (!mounted) return;

        const top = topRef.current;
        const mid = midRef.current;
        const bot = botRef.current;
        const sidebar = sidebarRef.current;
        const texts = textRefs.current.filter(Boolean) as HTMLLIElement[];

        if (!top || !mid || !bot || !sidebar) return;

        // Reset positions
        gsap.set(sidebar, { x: '100%' });
        gsap.set([top, mid, bot], { rotation: 0, y: 0, opacity: 1 });

        const tl = gsap.timeline({ paused: true });

        tl
            // Step 1: bars slide toward center and middle disappears
            .to(top, { y: 13, duration: 0.4, ease: 'power2.inOut' })
            .to(bot, { y: -13, duration: 0.4, ease: 'power2.inOut' }, '-=0.4')
            .to(mid, { opacity: 0, duration: 0.2 }, '-=0.4')
            // Step 2: rotate into X with spin
            .to(top, { rotation: 585, duration: 0.8, ease: 'back.out(1.7)' })
            .to(bot, { rotation: 675, duration: 0.8, ease: 'back.out(1.7)' }, '-=0.8')
            // Step 3: slide drawer IN from the right
            .to(sidebar, { x: 0, duration: 0.6, ease: 'power3.out' }, '-=0.6')
            // Step 4: stagger items
            .fromTo(texts, 
                { opacity: 0, y: 20 },
                { opacity: 1, y: 0, duration: 0.4, stagger: 0.1, ease: 'power2.out' },
                '-=0.2'
            );

        tlRef.current = tl;

        if (isOpen) {
            tl.progress(1);
        }

        return () => { tl.kill(); };
    }, [items, theme, mounted]);

    const handleToggle = () => {
        const tl = tlRef.current;
        if (!tl) return;
        if (isOpen) {
            tl.reverse();
        } else {
            tl.play();
        }
        setIsOpen(!isOpen);
    };

    const sidebarContent = (
        <div
            ref={sidebarRef}
            className="fixed top-0 right-0 h-full w-[280px] z-[99998] flex items-start shadow-2xl shadow-black/50"
            style={{ background: sidebarBg }}
        >
            <ul className="mt-32 ml-10 space-y-6">
                {items.map((item, i) => (
                    <li
                        key={item.label + i}
                        ref={el => { textRefs.current[i] = el; }}
                        className="list-none font-bold text-4xl cursor-pointer"
                        style={{ color: itemTextColor, fontFamily: 'sans-serif' }}
                        onClick={() => {
                            item.onClick?.();
                            if (isOpen) handleToggle();
                        }}
                    >
                        <a 
                            href={item.link} 
                            className="hover:opacity-60 transition-opacity"
                        >
                            {item.label}
                        </a>
                    </li>
                ))}
            </ul>
        </div>
    );

    return (
        <div className="relative">
            <button
                onClick={handleToggle}
                aria-label="Toggle menu"
                className="relative z-[9999] w-8 h-8 flex flex-col justify-between cursor-pointer bg-transparent border-none p-0"
            >
                <span ref={topRef} className="block w-full h-1 rounded-full origin-center" style={{ backgroundColor: burgerColor }} />
                <span ref={midRef} className="block w-full h-1 rounded-full origin-center" style={{ backgroundColor: burgerColor }} />
                <span ref={botRef} className="block w-full h-1 rounded-full origin-center" style={{ backgroundColor: burgerColor }} />
            </button>

            {mounted && createPortal(sidebarContent, document.body)}
        </div>
    );
}
