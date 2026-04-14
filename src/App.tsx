import {useEffect, useState} from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Skills from './components/Skills';
import Socials from './components/Socials';
import CustomCursor from './components/CustomCursor';
import ThreeBackground from './components/ThreeBackground';
import {Moon, Sun} from 'lucide-react';

function App() {
    const [isDark, setIsDark] = useState(true);

    useEffect(() => {
        if (isDark) {
            document.documentElement.classList.add('dark');
        } else {
            document.documentElement.classList.remove('dark');
        }
    }, [isDark]);

    return (
        <div className="relative min-h-screen transition-colors duration-500">
            <CustomCursor/>
            <ThreeBackground/>
            <Navbar isDark={isDark}/>

            {/* Theme Toggle */}
            <button
                onClick={() => setIsDark(!isDark)}
                className="fixed bottom-8 right-8 z-[100] w-14 h-14 bg-foreground/5 backdrop-blur-xl border border-foreground/10 rounded-full flex items-center justify-center hover:scale-125 transition-all active:scale-95 hover-trigger"
            >
                {isDark ? <Sun size={24}/> : <Moon size={24}/>}
            </button>

            <main>
                <Hero isDark={isDark}/>
                {/*<Projects />*/}
                <Skills/>
                <Socials/>
            </main>
        </div>
    );
}

export default App;
