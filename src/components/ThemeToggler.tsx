import {Moon, Sun} from "lucide-react";

interface ThemeTogglerProps {
    isDark: boolean;
    onClick: (isDark : boolean) => void;
    bottomPos: 'right' | 'left';
}

const ThemeToggler = (props: ThemeTogglerProps) => (
    <button
        onClick={() => props.onClick(props.isDark)}
        className={`fixed bottom-8 ${props.bottomPos === 'right' ? 'right-8' : 'left-8'} z-[2000] w-14 h-14 bg-foreground/5 backdrop-blur-xl border border-foreground/10 rounded-full flex items-center justify-center hover:scale-125 transition-all active:scale-95 hover-trigger`}
    >
        {props.isDark ? <Sun size={24}/> : <Moon size={24}/>}
    </button>
);

export default ThemeToggler;