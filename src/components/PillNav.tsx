import React, {useEffect, useRef, useState} from 'react';
import {gsap} from 'gsap';
import Logo from "../assets/Logo.tsx";
import PillAnimButton from "./PillAnimButton.tsx";

export type PillNavItem = {
    label: string;
    href: string;
    ariaLabel?: string;
};

export interface PillNavProps {
    logo?: string;
    logoAlt?: string;
    items: PillNavItem[];
    activeHref?: string;
    className?: string;
    ease?: string;
    baseColor?: string;
    pillColor?: string;
    hoveredPillTextColor?: string;
    pillTextColor?: string;
    onMobileMenuClick?: () => void;
    initialLoadAnimation?: boolean;
    theme?: 'dark' | 'light';
}

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
                                             onMobileMenuClick,
                                             initialLoadAnimation = true,
                                         }) => {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const hamburgerRef = useRef<HTMLButtonElement | null>(null);
    const mobileMenuRef = useRef<HTMLDivElement | null>(null);
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

        const menu = mobileMenuRef.current;
        if (menu) {
            gsap.set(menu, {visibility: 'hidden', opacity: 0, scaleY: 1, y: 0});
        }
    }, [initialLoadAnimation, ease]);

    const toggleMobileMenu = () => {
        const newState = !isMobileMenuOpen;
        setIsMobileMenuOpen(newState);

        const hamburger = hamburgerRef.current;
        const menu = mobileMenuRef.current;

        if (hamburger) {
            const lines = hamburger.querySelectorAll('.hamburger-line');
            if (newState) {
                gsap.to(lines[0], {rotation: 45, y: 3, duration: 0.3, ease});
                gsap.to(lines[1], {rotation: -45, y: -3, duration: 0.3, ease});
            } else {
                gsap.to(lines[0], {rotation: 0, y: 0, duration: 0.3, ease});
                gsap.to(lines[1], {rotation: 0, y: 0, duration: 0.3, ease});
            }
        }

        if (menu) {
            if (newState) {
                gsap.set(menu, {visibility: 'visible'});
                gsap.fromTo(
                    menu,
                    {opacity: 0, y: 10, scaleY: 1},
                    {
                        opacity: 1,
                        y: 0,
                        scaleY: 1,
                        duration: 0.3,
                        ease,
                        transformOrigin: 'top center'
                    }
                );
            } else {
                gsap.to(menu, {
                    opacity: 0,
                    y: 10,
                    scaleY: 1,
                    duration: 0.2,
                    ease,
                    transformOrigin: 'top center',
                    onComplete: () => {
                        gsap.set(menu, {visibility: 'hidden'});
                    }
                });
            }
        }

        onMobileMenuClick?.();
    };

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
            className={`fixed top-0 z-[1000] w-full left-0 flex justify-center transition-all duration-300 pointer-events-none ${
                scrolled ? "py-2" : "py-6"
            }`}>
            <nav
                className={`flex items-center justify-between md:grid md:grid-cols-3 md:items-center box-border px-6 md:px-12 pointer-events-auto transition-all duration-300 ${
                    scrolled
                        ? `w-[80%] max-w-8xl backdrop-blur-md backdrop-brightness-125 backdrop-contrast-125 bg-${theme === 'dark' ? 'white/10' : 'black/10'} border border-white/10 rounded-br-4xl rounded-tr-md rounded-bl-md rounded-tl-4xl py-4 shadow-lg`
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
                              styles={`md:scale-${scrolled ? '210' : '225'} scale-160 transition-all duration-200`}/>
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
                            <li key={item.href} role="none" className="flex h-full">
                                <PillAnimButton
                                    label={item.label}
                                    href={item.href}
                                    isActive={activeHref === item.href}
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

                <button
                    ref={hamburgerRef}
                    onClick={toggleMobileMenu}
                    aria-label="Toggle menu"
                    aria-expanded={isMobileMenuOpen}
                    className="md:hidden rounded-full border-0 flex flex-col items-center justify-center gap-1 cursor-pointer p-0 relative ml-4"
                    style={{
                        width: 'var(--nav-h)',
                        height: 'var(--nav-h)',
                        background: 'var(--base, #000)'
                    }}
                >
                  <span
                      className="hamburger-line w-4 h-0.5 rounded origin-center transition-all duration-[10ms] ease-[cubic-bezier(0.25,0.1,0.25,1)]"
                      style={{background: 'var(--pill-bg, #fff)'}}
                  />
                    <span
                        className="hamburger-line w-4 h-0.5 rounded origin-center transition-all duration-[10ms] ease-[cubic-bezier(0.25,0.1,0.25,1)]"
                        style={{background: 'var(--pill-bg, #fff)'}}
                    />
                </button>
            </nav>

            <div
                ref={mobileMenuRef}
                className="md:hidden absolute top-[4em] left-4 right-4 rounded-[27px] shadow-[0_8px_32px_rgba(0,0,0,0.12)] z-[998] origin-top backdrop-blur-xl"
                style={{
                    ...cssVars,
                    background: 'var(--base, #f0f0f0)'
                }}
            >
                <ul className="list-none m-0 p-0.75 flex flex-col justify-center gap-6">
                    {items.map(item => {
                        const defaultStyle: React.CSSProperties = {
                            background: 'var(--pill-bg, #fff)',
                            color: 'var(--pill-text, #fff)'
                        };
                        const hoverIn = (e: React.MouseEvent<HTMLAnchorElement>) => {
                            e.currentTarget.style.background = 'var(--base)';
                            e.currentTarget.style.color = 'var(--hover-text, #fff)';
                        };
                        const hoverOut = (e: React.MouseEvent<HTMLAnchorElement>) => {
                            e.currentTarget.style.background = 'var(--pill-bg, #fff)';
                            e.currentTarget.style.color = 'var(--pill-text, #fff)';
                        };

                        const linkClasses =
                            'block py-4 px-6 text-[18px] font-semibold rounded-[50px] transition-all duration-200 ease-[cubic-bezier(0.25,0.1,0.25,1)] no-underline';

                        return (
                            <li key={item.href}>
                                <a
                                    href={item.href}
                                    className={linkClasses}
                                    style={defaultStyle}
                                    onMouseEnter={hoverIn}
                                    onMouseLeave={hoverOut}
                                    onClick={() => setIsMobileMenuOpen(false)}
                                >
                                    {item.label}
                                </a>
                            </li>
                        );
                    })}
                </ul>
            </div>
        </div>

    );
};

export default PillNav;
