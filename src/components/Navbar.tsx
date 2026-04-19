import { navLinks } from "../utils/contants";
import PillNav from './PillNav';

const Navbar = ({isDark}: { isDark: boolean }) => {

    return (
        <div className="pt-[84px]">
            <PillNav
                items={navLinks}
                baseColor={isDark ? "rgba(255,255,255,0.15)" : "rgb(0 0 0 / 0.20)"}
                pillColor={isDark ? "rgb(21 21 21)" : "rgb(239 239 239)"}
                pillTextColor={isDark ? "#fff" : "#000"}
                theme={isDark ? "dark" : "light"}
                hoveredPillTextColor={isDark ? "#000" : "#ffffff"}
            />
            <div className="p-1 bg-amber-600 text-white font-bold text-sm text-center tracking-widest">
                ⚠️STILL IN WIP!
            </div>
        </div>
    );
};

export default Navbar;
