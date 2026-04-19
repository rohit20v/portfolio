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