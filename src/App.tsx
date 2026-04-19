import {useEffect, useState} from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Skills from './components/Skills';
import Socials from './components/Socials';
import CustomCursor from './components/CustomCursor';
import CustomScrollbar from "./components/CustomScrollbar.tsx";
import ThreeBackground from './components/ThreeBackground';
import GradualBlur from "./components/GradualBlur.tsx";
import ThemeToggler from "./components/ThemeToggler.tsx";

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
        <div className="relative min-h-screen transition-colors">
            <CustomCursor/>
            <CustomScrollbar/>
            <ThreeBackground isDark={isDark} />
            <Navbar isDark={isDark}/>

            <main className="relative px-8">
                <Hero isDark={isDark}/>
                {/*<Projects/>*/}
                <Skills/>
                <Socials/>

                <GradualBlur
                    target="page"
                    position="bottom"
                    height="8rem"
                    strength={1.4}
                    divCount={5}
                    curve="bezier"
                    exponential
                    opacity={1}
                />
            </main>

            {/* Theme Toggle */}
            <ThemeToggler isDark={isDark} onClick={() => setIsDark(!isDark)} bottomPos={"right"}/>
        </div>
    );
}

export default App;
