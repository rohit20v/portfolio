import React from "react";
import {motion, type Target, type TargetAndTransition, type Transition, type VariantLabels} from "motion/react";

export interface MenuItem {
    label: string;
    ariaLabel?: string;
    onClick?: () => void;
    link: string;
}

export interface SocialItem {
    name: string;
    icon: 'github' | 'linkedin' | 'twitter' | 'mail';
    href: string;
    color: string;
}

export interface PillNavProps {
    logo?: string;
    logoAlt?: string;
    items: MenuItem[];
    activeHref?: string;
    className?: string;
    ease?: string;
    baseColor?: string;
    pillColor?: string;
    hoveredPillTextColor?: string;
    pillTextColor?: string;
    initialLoadAnimation?: boolean;
    theme?: 'dark' | 'light';
}

export interface MenuProps {
    position?: 'left' | 'right';
    colors?: string[];
    items?: MenuItem[];
    socialItems?: SocialItem[];
    displaySocials?: boolean;
    displayItemNumbering?: boolean;
    className?: string;
    logoUrl?: string;
    showLogo?: boolean;
    menuButtonColor?: string;
    openMenuButtonColor?: string;
    accentColor?: string;
    isFixed: boolean;
    changeMenuColorOnOpen?: boolean;
    closeOnClickAway?: boolean;
    onMenuOpen?: () => void;
    onMenuClose?: () => void;
    theme?: 'dark' | 'light';
}

export interface RotatingTextRef {
    next: () => void;
    previous: () => void;
    jumpTo: (index: number) => void;
    reset: () => void;
}

export interface RotatingTextProps
    extends Omit<
        React.ComponentPropsWithoutRef<typeof motion.span>,
        'children' | 'transition' | 'initial' | 'animate' | 'exit'
    > {
    texts: string[];
    transition?: Transition;
    initial?: boolean | Target | VariantLabels;
    animate?: boolean | VariantLabels | TargetAndTransition;
    exit?: Target | VariantLabels;
    animatePresenceMode?: 'sync' | 'wait';
    animatePresenceInitial?: boolean;
    rotationInterval?: number;
    staggerDuration?: number;
    staggerFrom?: 'first' | 'last' | 'center' | 'random' | number;
    loop?: boolean;
    auto?: boolean;
    splitBy?: string;
    onNext?: (index: number) => void;
    mainClassName?: string;
    splitLevelClassName?: string;
    elementLevelClassName?: string;
}