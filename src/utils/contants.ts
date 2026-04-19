import type {MenuItem, SocialItem} from "./types.ts";

export const navLinks: MenuItem[] = [
    {label: 'Home', link: '#'},
    // { label: 'Projects', href: '#projects' },
    {label: 'Skills', link: '#skills'},
    {label: 'Contact', link: '#contact'},
];

export const socials: SocialItem[] = [
    {
        name: 'GitHub',
        icon: 'github',
        href: 'https://github.com/rohit20v',
        color: 'hover:bg-gray-800 hover:text-white',
    },
    {
        name: 'LinkedIn',
        icon: 'linkedin',
        href: 'https://it.linkedin.com/in/dev-rohit-verma',
        color: 'hover:bg-blue-600 hover:text-white',
    },
    {
        name: 'Twitter',
        icon: 'twitter',
        href: 'https://x.com/rohit_verma_dev?s=21',
        color: 'hover:bg-sky-500 hover:text-white',
    },
    {
        name: 'Email',
        icon: 'mail',
        href: 'mailto:verma.rohit.1203@gmail.com',
        color: 'hover:bg-amber-500 hover:text-white',
    },
];