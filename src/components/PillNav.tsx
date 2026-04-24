import React, {useEffect, useRef, useState} from 'react';
import {gsap} from 'gsap';
import Logo from "../assets/Logo.tsx";
import PillAnimButton from "./PillAnimButton.tsx";
import type {PillNavProps} from "../utils/types.ts";
import MobileMenu from "./MobileMenu.tsx";


const PillNav: React.FC<PillNavProps> = ({
                                             items,
                                             activeHref,
                                             theme,
                                             className = '',
                                             ease = 'power3.easeOut',
                                             baseColor = 'var(--text)',
                                             pillColor = 'var(--bg)',
                                             hoveredPillTextColor = 'var(--bg)',
                                             pillTextColor = 'var(--text)',
                                             initialLoadAnimation = true,
                                         }) => {
    const [scrolled, setScrolled] = useState(false);
    const navItemsRef = useRef<HTMLDivElement | null>(null);
    const logoRef = useRef<HTMLElement | null>(null);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 10);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    useEffect(() => {
        if (initialLoadAnimation) {
            const logo = logoRef.current;
            const navItems = navItemsRef.current;

            if (logo) {
                gsap.set(logo, {scale: 0});
                gsap.to(logo, {
                    scale: 1,
                    duration: 0.6,
                    ease
                });
            }

            if (navItems) {
                gsap.set(navItems, {width: 0, overflow: 'hidden'});
                gsap.to(navItems, {
                    width: 'auto',
                    duration: 0.6,
                    ease
                });
            }
        }
    }, [initialLoadAnimation, ease]);

    const cssVars = {
        ['--base']: baseColor,
        ['--pill-bg']: pillColor,
        ['--hover-text']: hoveredPillTextColor,
        ['--pill-text']: pillTextColor,
        ['--nav-h']: '42px',
        ['--logo']: '36px',
        ['--pill-pad-x']: '18px',
        ['--pill-gap']: '3px'
    } as React.CSSProperties;

    return (
        <div
            className={`fixed top-0 z-[100000] w-full left-0 flex justify-center transition-all duration-300 pointer-events-none ${
                scrolled ? "py-2" : "py-6"
            }`}>
            <nav
                className={`flex items-center justify-between md:grid md:grid-cols-3 md:items-center box-border px-6 md:px-12 pointer-events-auto transition-all duration-300 ${
                    scrolled
                        ? `w-[90%] md:w-[80%] max-w-8xl backdrop-blur-md backdrop-brightness-125 backdrop-contrast-125 bg-${theme === 'dark' ? 'white/10' : 'black/10'} border border-white/15 rounded-br-4xl rounded-tr-md rounded-bl-md rounded-tl-4xl py-4 shadow-lg`
                        : "w-full bg-transparent border-transparent py-0"
                } ${className}`}
                aria-label="Primary"
                style={cssVars}
            >
                <div className="flex justify-start">
                    <a
                        href="#"
                        aria-label="Home"
                        ref={el => {
                            logoRef.current = el;
                        }}
                        className="rounded-full inline-flex items-center justify-center hover:scale-110 transition-all ease-in-out duration-200"
                    >
                        <Logo color={theme !== 'dark' ? '#000' : '#fff'}
                              styles={`${scrolled ? 'md:scale-210' : 'md:scale-230'} scale-160 transition-all duration-200 md:ml-20 ml-4`}/>
                    </a>
                </div>

                <div
                    ref={navItemsRef}
                    className="hidden md:flex relative items-center rounded-full justify-self-center"
                    style={{
                        height: 'var(--nav-h)',
                        background: 'var(--base, #000)'
                    }}
                >
                    <ul
                        role="menubar"
                        className="list-none flex items-stretch m-0 p-[3px] h-full"
                        style={{gap: 'var(--pill-gap)'}}
                    >
                        {items.map((item) => (
                            <li key={item.link} role="none" className="flex h-full">
                                <PillAnimButton
                                    label={item.label}
                                    href={item.link}
                                    isActive={activeHref === item.link}
                                    baseColor={baseColor}
                                    pillColor={pillColor}
                                    pillTextColor={pillTextColor}
                                    hoveredPillTextColor={hoveredPillTextColor}
                                    ariaLabel={item.ariaLabel}
                                    ease={ease}
                                />
                            </li>
                        ))}
                    </ul>
                </div>

                <div className="hidden md:block"></div>
                <div className="md:hidden flex justify-end">
                    <MobileMenu
                        items={items}
                        theme={theme}
                    />
                </div>

            </nav>
        </div>
    );
};

export default PillNav;
