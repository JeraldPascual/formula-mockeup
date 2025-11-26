import { Link, useLocation } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import gsap from "gsap";

export const Header = () => {
    const location = useLocation();
    const headerRef = useRef(null);
    const logoRef = useRef(null);
    const navRef = useRef(null);
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    useEffect(() => {
        gsap.fromTo(
            headerRef.current,
            { y: -100, opacity: 0 },
            { y: 0, opacity: 1, duration: 0.8, ease: "power3.out" }
        );

        gsap.fromTo(
            logoRef.current.children,
            { x: -50, opacity: 0 },
            { x: 0, opacity: 1, duration: 0.6, stagger: 0.1, delay: 0.3, ease: "back.out(1.7)" }
        );

        if (navRef.current?.children) {
            gsap.fromTo(
                navRef.current.children,
                { y: -20, opacity: 0 },
                { y: 0, opacity: 1, duration: 0.5, stagger: 0.1, delay: 0.5, ease: "power2.out" }
            );
        }

        // Scroll listener for dynamic header
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // Close mobile menu when route changes
    useEffect(() => {
        setIsMobileMenuOpen(false);
    }, [location]);

    const isActive = (path) => location.pathname === path;

    return (
        <>
            <header
                ref={headerRef}
                className={`m-0 p-0 w-full flex items-center justify-between shadow-lg fixed top-0 left-0 right-0 z-50 border-b transition-all duration-300 ${
                    isScrolled
                        ? 'h-14 bg-black/95 backdrop-blur-xl border-red-600/70 shadow-2xl shadow-red-600/10'
                        : 'h-16 md:h-20 bg-black/98 backdrop-blur-md border-red-600/50'
                } px-4 md:px-8`}
            >
                <Link to="/" ref={logoRef} className="flex items-center gap-2 md:gap-4 hover:opacity-80 transition-opacity group">
                    <div className="relative">
                        <div className={`text-white font-black tracking-tighter transform group-hover:scale-110 transition-all duration-300 ${
                            isScrolled ? 'text-2xl md:text-3xl' : 'text-3xl md:text-4xl'
                        }`}>F1</div>
                        <div className="absolute -bottom-1 left-0 w-full h-0.5 md:h-1 bg-gradient-to-r from-red-600 to-transparent"></div>
                    </div>
                    <div className="h-6 md:h-10 w-px bg-gradient-to-b from-red-600 to-transparent"></div>
                    <h1 className={`text-white font-bold tracking-[0.2em] md:tracking-[0.3em] uppercase transition-all duration-300 ${
                        isScrolled ? 'text-[10px] md:text-xs' : 'text-xs md:text-sm'
                    }`}>2025 Season</h1>
                </Link>

                {/* Desktop Navigation */}
                <nav ref={navRef} className="hidden md:flex gap-4 lg:gap-8 text-white text-xs font-bold tracking-widest">
                <Link
                    to="/"
                    className={`relative hover:text-red-400 transition-colors pb-1 group ${
                        isActive('/') ? 'text-red-500' : ''
                    }`}
                >
                    HOME
                    <span className={`absolute bottom-0 left-0 w-full h-0.5 bg-red-600 transform origin-left transition-transform ${
                        isActive('/') ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'
                    }`}></span>
                </Link>
                <Link
                    to="/drivers"
                    className={`relative hover:text-red-400 transition-colors pb-1 group ${
                        isActive('/drivers') ? 'text-red-500' : ''
                    }`}
                >
                    DRIVERS
                    <span className={`absolute bottom-0 left-0 w-full h-0.5 bg-red-600 transform origin-left transition-transform ${
                        isActive('/drivers') ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'
                    }`}></span>
                </Link>
                <Link
                    to="/teams"
                    className={`relative hover:text-red-400 transition-colors pb-1 group ${
                        isActive('/teams') ? 'text-red-500' : ''
                    }`}
                >
                    TEAMS
                    <span className={`absolute bottom-0 left-0 w-full h-0.5 bg-red-600 transform origin-left transition-transform ${
                        isActive('/teams') ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'
                    }`}></span>
                </Link>
                <Link
                    to="/standings"
                    className={`relative hover:text-red-400 transition-colors pb-1 group ${
                        isActive('/standings') ? 'text-red-500' : ''
                    }`}
                >
                    STANDINGS
                    <span className={`absolute bottom-0 left-0 w-full h-0.5 bg-red-600 transform origin-left transition-transform ${
                        isActive('/standings') ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'
                    }`}></span>
                </Link>
                <Link
                    to="/schedule"
                    className={`relative hover:text-red-400 transition-colors pb-1 group ${
                        isActive('/schedule') ? 'text-red-500' : ''
                    }`}
                >
                    SCHEDULE
                    <span className={`absolute bottom-0 left-0 w-full h-0.5 bg-red-600 transform origin-left transition-transform ${
                        isActive('/schedule') ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'
                    }`}></span>
                </Link>
            </nav>

            {/* Mobile Menu Button */}
            <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="md:hidden flex flex-col gap-1.5 w-8 h-8 justify-center items-center group"
                aria-label="Toggle menu"
            >
                <span className={`w-6 h-0.5 bg-white transition-all duration-300 ${isMobileMenuOpen ? 'rotate-45 translate-y-2' : ''}`}></span>
                <span className={`w-6 h-0.5 bg-white transition-all duration-300 ${isMobileMenuOpen ? 'opacity-0' : ''}`}></span>
                <span className={`w-6 h-0.5 bg-white transition-all duration-300 ${isMobileMenuOpen ? '-rotate-45 -translate-y-2' : ''}`}></span>
            </button>
        </header>

        {/* Mobile Menu */}
        <div className={`md:hidden fixed top-16 left-0 right-0 bg-black/98 backdrop-blur-xl border-b border-red-600/50 transition-all duration-300 z-40 ${
            isMobileMenuOpen ? 'max-h-screen opacity-100' : 'max-h-0 opacity-0 overflow-hidden'
        }`}>
            <nav className="flex flex-col p-6 gap-4">
                <Link
                    to="/"
                    className={`text-white text-lg font-bold tracking-wider py-3 px-4 rounded transition-colors ${
                        isActive('/') ? 'bg-red-600 text-white' : 'hover:bg-white/10'
                    }`}
                >
                    HOME
                </Link>
                <Link
                    to="/drivers"
                    className={`text-white text-lg font-bold tracking-wider py-3 px-4 rounded transition-colors ${
                        isActive('/drivers') ? 'bg-red-600 text-white' : 'hover:bg-white/10'
                    }`}
                >
                    DRIVERS
                </Link>
                <Link
                    to="/teams"
                    className={`text-white text-lg font-bold tracking-wider py-3 px-4 rounded transition-colors ${
                        isActive('/teams') ? 'bg-red-600 text-white' : 'hover:bg-white/10'
                    }`}
                >
                    TEAMS
                </Link>
                <Link
                    to="/standings"
                    className={`text-white text-lg font-bold tracking-wider py-3 px-4 rounded transition-colors ${
                        isActive('/standings') ? 'bg-red-600 text-white' : 'hover:bg-white/10'
                    }`}
                >
                    STANDINGS
                </Link>
                <Link
                    to="/schedule"
                    className={`text-white text-lg font-bold tracking-wider py-3 px-4 rounded transition-colors ${
                        isActive('/schedule') ? 'bg-red-600 text-white' : 'hover:bg-white/10'
                    }`}
                >
                    SCHEDULE
                </Link>
            </nav>
        </div>
        </>
    );
}
