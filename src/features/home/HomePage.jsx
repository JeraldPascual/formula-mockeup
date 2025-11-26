import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import formulaRacers from "../../assets/formulaRacers.json";
import teams from "../../assets/teams.json";

gsap.registerPlugin(ScrollTrigger);

export const HomePage = () => {
  const heroRef = useRef(null);
  const [nextRace, setNextRace] = useState(null);
  const [loading, setLoading] = useState(true);
  const [currentDriverIndex, setCurrentDriverIndex] = useState(0);
  const [currentTeamIndex, setCurrentTeamIndex] = useState(0);
  const [driverAutoPlay, setDriverAutoPlay] = useState(true);
  const [teamAutoPlay, setTeamAutoPlay] = useState(true);

  useEffect(() => {
    const fetchNextRace = async () => {
      try {
        const response = await fetch('https://api.openf1.org/v1/sessions?session_name=Race&year=2025');
        const data = await response.json();
        const now = new Date();
        const upcoming = data.find(race => new Date(race.date_start) > now);
        if (upcoming) setNextRace(upcoming);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching race data:', error);
        setLoading(false);
      }
    };

    fetchNextRace();

    gsap.fromTo(
      heroRef.current,
      { opacity: 0, scale: 0.95 },
      { opacity: 1, scale: 1, duration: 1.2, ease: "power3.out" }
    );

    // Auto-scroll drivers carousel
    const driverInterval = setInterval(() => {
      if (driverAutoPlay) {
        setCurrentDriverIndex((prev) => (prev + 1) % formulaRacers.length);
      }
    }, 4000);

    // Auto-scroll teams carousel
    const teamInterval = setInterval(() => {
      if (teamAutoPlay) {
        setCurrentTeamIndex((prev) => (prev + 1) % teams.length);
      }
    }, 5000);

    return () => {
      clearInterval(driverInterval);
      clearInterval(teamInterval);
    };
  }, [driverAutoPlay, teamAutoPlay]);

  const nextDriver = () => {
    setDriverAutoPlay(false);
    setCurrentDriverIndex((prev) => (prev + 1) % formulaRacers.length);
  };
  const prevDriver = () => {
    setDriverAutoPlay(false);
    setCurrentDriverIndex((prev) => (prev - 1 + formulaRacers.length) % formulaRacers.length);
  };
  const nextTeam = () => {
    setTeamAutoPlay(false);
    setCurrentTeamIndex((prev) => (prev + 1) % teams.length);
  };
  const prevTeam = () => {
    setTeamAutoPlay(false);
    setCurrentTeamIndex((prev) => (prev - 1 + teams.length) % teams.length);
  };

  const currentDriver = formulaRacers[currentDriverIndex];
  const currentTeam = teams[currentTeamIndex];

  return (
    <div className="min-h-screen bg-black">
      {/* Hero Banner */}
      <section
        ref={heroRef}
        className="relative h-[60vh] sm:h-[70vh] min-h-[400px] sm:min-h-[500px] flex items-end overflow-hidden"
      >
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/50 to-black z-10"></div>
          <div className="absolute inset-0 bg-gradient-to-r from-red-600/20 to-transparent z-10"></div>
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{
              backgroundImage: 'url(https://media.formula1.com/image/upload/c_lfill,w_3392/q_auto/v1740000000/content/dam/fom-website/2018-redesign-assets/Racehub%20header%20images%2016x9/Las%20Vegas.webp)',
              filter: 'brightness(0.5)'
            }}
          ></div>
        </div>

        <div className="relative z-20 w-full px-4 sm:px-6 md:px-16 pb-8 sm:pb-12 max-w-7xl mx-auto">
          <div className="mb-2 sm:mb-3">
            <span className="text-red-500 font-bold text-xs sm:text-sm tracking-[0.15em] sm:tracking-[0.2em] uppercase">2025 FIA Formula One</span>
          </div>
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black text-white mb-3 sm:mb-4 tracking-tight leading-tight max-w-4xl">
            THE PINNACLE OF MOTORSPORT
          </h1>
          <p className="text-gray-300 text-base sm:text-lg mb-4 sm:mb-6 max-w-2xl">
            Follow the world's best drivers and teams as they compete across iconic circuits worldwide.
          </p>

          <div className="flex gap-2 sm:gap-3 flex-wrap">
            <Link
              to="/drivers"
              className="px-5 sm:px-6 py-2.5 sm:py-3 bg-red-600 hover:bg-red-700 text-white font-bold text-sm tracking-wider uppercase transition-all duration-200"
            >
              Drivers
            </Link>
            <Link
              to="/standings"
              className="px-5 sm:px-6 py-2.5 sm:py-3 bg-white/10 hover:bg-white/20 backdrop-blur-sm text-white font-bold text-sm tracking-wider uppercase transition-all duration-200"
            >
              Standings
            </Link>
          </div>
        </div>

        <div className="hidden sm:block absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 border-2 border-red-600 rounded-full flex items-start justify-center p-2">
            <div className="w-1 h-3 bg-red-600 rounded-full"></div>
          </div>
        </div>
      </section>

      {/* Next Race Section */}
      <section className="py-8 sm:py-12 md:py-16 px-4 sm:px-6 md:px-8 max-w-7xl mx-auto">
        <div className="text-center mb-8 sm:mb-12">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-white mb-2 sm:mb-3 tracking-tight uppercase">
            <span className="text-red-600">Next</span> Race
          </h2>
          <div className="w-16 sm:w-24 h-0.5 sm:h-1 bg-gradient-to-r from-transparent via-red-600 to-transparent mx-auto"></div>
        </div>

        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="relative">
              <div className="w-16 h-16 border-4 border-red-600/30 border-t-red-600 rounded-full animate-spin"></div>
              <div className="text-red-600 text-sm font-bold mt-4 text-center animate-pulse">Loading...</div>
            </div>
          </div>
        ) : nextRace ? (
          <div className="relative bg-gradient-to-br from-zinc-900 to-black border border-zinc-800 rounded-2xl overflow-hidden shadow-2xl hover:border-red-600/50 transition-all duration-300 group">
            {/* Background pattern */}
            <div className="absolute inset-0 opacity-5">
              <div className="absolute inset-0" style={{
                backgroundImage: `repeating-linear-gradient(45deg, rgba(220, 38, 38, 0.1) 0px, rgba(220, 38, 38, 0.1) 2px, transparent 2px, transparent 10px)`,
              }}></div>
            </div>

            {/* Animated gradient overlay */}
            <div className="absolute top-0 right-0 w-96 h-96 bg-red-600/10 rounded-full blur-3xl group-hover:bg-red-600/20 transition-all duration-500"></div>

            <div className="relative grid md:grid-cols-2 gap-6 sm:gap-8 p-4 sm:p-6 md:p-8 lg:p-12">
              {/* Left: Race Info */}
              <div className="space-y-6">
                <div>
                  <div className="inline-block px-3 py-1 bg-red-600/20 border border-red-600/50 rounded-full mb-4">
                    <span className="text-red-500 text-xs font-bold uppercase tracking-wider">Upcoming</span>
                  </div>
                  <h3 className="text-3xl sm:text-4xl md:text-5xl font-black text-white mb-2 leading-tight">
                    {nextRace.meeting_name || nextRace.location}
                  </h3>
                  <p className="text-gray-400 text-sm uppercase tracking-wider">{nextRace.circuit_short_name}</p>
                </div>

                <div className="space-y-4 pt-4">
                  <div className="flex items-start gap-4 group/item">
                    <div className="w-12 h-12 rounded-lg bg-red-600/10 border border-red-600/30 flex items-center justify-center flex-shrink-0 group-hover/item:bg-red-600/20 transition-colors">
                      <svg className="w-6 h-6 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                    </div>
                    <div className="flex-1">
                      <div className="text-gray-500 text-xs font-bold uppercase tracking-wider mb-1">Location</div>
                      <div className="text-white text-lg font-semibold">{nextRace.location}</div>
                      <div className="text-gray-400 text-sm">{nextRace.country_name}</div>
                    </div>
                  </div>

                  <div className="flex items-start gap-4 group/item">
                    <div className="w-12 h-12 rounded-lg bg-red-600/10 border border-red-600/30 flex items-center justify-center flex-shrink-0 group-hover/item:bg-red-600/20 transition-colors">
                      <svg className="w-6 h-6 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                    </div>
                    <div className="flex-1">
                      <div className="text-gray-500 text-xs font-bold uppercase tracking-wider mb-1">Race Date</div>
                      <div className="text-white text-lg font-semibold">
                        {new Date(nextRace.date_start).toLocaleDateString('en-US', {
                          weekday: 'long',
                          month: 'long',
                          day: 'numeric',
                        })}
                      </div>
                      <div className="text-gray-400 text-sm">
                        {new Date(nextRace.date_start).toLocaleTimeString('en-US', {
                          hour: '2-digit',
                          minute: '2-digit',
                          timeZoneName: 'short',
                        })}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-start gap-4 group/item">
                    <div className="w-12 h-12 rounded-lg bg-red-600/10 border border-red-600/30 flex items-center justify-center flex-shrink-0 group-hover/item:bg-red-600/20 transition-colors">
                      <svg className="w-6 h-6 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 21v-4m0 0V5a2 2 0 012-2h6.5l1 1H21l-3 6 3 6h-8.5l-1-1H5a2 2 0 00-2 2zm9-13.5V9" />
                      </svg>
                    </div>
                    <div className="flex-1">
                      <div className="text-gray-500 text-xs font-bold uppercase tracking-wider mb-1">Session Type</div>
                      <div className="text-white text-lg font-semibold">{nextRace.session_name}</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right: Countdown */}
              <div className="flex items-center justify-center">
                <div className="text-center">
                  <div className="relative inline-block">
                    <div className="absolute inset-0 bg-red-600 blur-2xl opacity-30 animate-pulse"></div>
                    <div className="relative bg-gradient-to-br from-red-600 to-red-800 rounded-xl sm:rounded-2xl p-6 sm:p-8 border-2 sm:border-4 border-red-500/30">
                      <div className="text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-black text-white mb-2 drop-shadow-2xl">
                        {Math.ceil((new Date(nextRace.date_start) - new Date()) / (1000 * 60 * 60 * 24))}
                      </div>
                      <div className="text-red-100 text-base sm:text-lg font-bold uppercase tracking-[0.2em] sm:tracking-[0.3em]">
                        Days
                      </div>
                      <div className="text-red-200/60 text-xs uppercase tracking-wider mt-1">
                        Until Race
                      </div>
                    </div>
                  </div>

                  {/* Additional time breakdown */}
                  <div className="grid grid-cols-3 gap-3 mt-6">
                    {[
                      { label: 'Hours', value: Math.floor(((new Date(nextRace.date_start) - new Date()) % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)) },
                      { label: 'Minutes', value: Math.floor(((new Date(nextRace.date_start) - new Date()) % (1000 * 60 * 60)) / (1000 * 60)) },
                      { label: 'Seconds', value: Math.floor(((new Date(nextRace.date_start) - new Date()) % (1000 * 60)) / 1000) },
                    ].map(({ label, value }) => (
                      <div key={label} className="bg-white/5 backdrop-blur-sm rounded-lg p-3 border border-white/10">
                        <div className="text-2xl font-black text-white">{value}</div>
                        <div className="text-gray-400 text-xs uppercase tracking-wider">{label}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="bg-zinc-900/50 border border-zinc-800 rounded-xl p-12 text-center">
            <div className="text-gray-500 text-lg mb-2">No upcoming race scheduled</div>
            <div className="text-gray-600 text-sm">Check back later for updates</div>
          </div>
        )}
      </section>

      {/* Drivers Carousel */}
      <section className="py-8 sm:py-12 md:py-16 px-4 sm:px-6 md:px-8 bg-zinc-900/50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-8 sm:mb-12">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-white mb-2 sm:mb-3 tracking-tight uppercase">
              <span className="text-red-600">2025</span> Drivers
            </h2>
            <div className="w-16 sm:w-24 h-0.5 sm:h-1 bg-gradient-to-r from-transparent via-red-600 to-transparent mx-auto"></div>
          </div>

          <div className="relative">
            {/* Carousel Content */}
            <div className="relative h-[500px] sm:h-[550px] md:h-[600px] overflow-hidden rounded-xl bg-gradient-to-br from-zinc-900 to-black border border-zinc-800">
              {/* Background with driver image */}
              <div className="absolute inset-0">
                <div
                  className="absolute inset-0 bg-cover bg-center opacity-20 blur-sm"
                  style={{
                    backgroundImage: `url(${currentDriver.image})`,
                    backgroundColor: currentDriver.teamColor
                  }}
                ></div>
                <div className="absolute inset-0 bg-gradient-to-r from-black via-black/80 to-transparent"></div>
              </div>

              {/* Driver Content */}
              <div className="relative h-full flex items-center">
                <div className="grid md:grid-cols-2 gap-4 sm:gap-6 md:gap-8 w-full p-4 sm:p-6 md:p-8 lg:p-12">
                  {/* Driver Info */}
                  <div className="space-y-3 sm:space-y-4 md:space-y-6">
                    <div className="text-5xl sm:text-6xl md:text-7xl font-black opacity-20" style={{ color: currentDriver.teamColor }}>
                      #{currentDriver.number}
                    </div>
                    <div>
                      <h3 className="text-4xl sm:text-5xl font-black text-white mb-1 sm:mb-2 uppercase tracking-tight">
                        {currentDriver.name.split(' ')[0]}
                      </h3>
                      <h4 className="text-2xl sm:text-3xl font-black text-white/70 uppercase tracking-tight">
                        {currentDriver.name.split(' ').slice(1).join(' ')}
                      </h4>
                    </div>
                    <div className="text-lg sm:text-xl font-bold uppercase tracking-wider" style={{ color: currentDriver.teamColor }}>
                      {currentDriver.team}
                    </div>
                    <p className="text-gray-300 text-base sm:text-lg leading-relaxed">
                      {currentDriver.description}
                    </p>
                    <Link
                      to="/drivers"
                      className="inline-block px-5 sm:px-6 py-2.5 sm:py-3 bg-red-600 hover:bg-red-700 text-white font-bold text-sm tracking-wider uppercase transition-all duration-200"
                    >
                      View All Drivers
                    </Link>
                  </div>

                  {/* Driver Image */}
                  <div className="relative hidden md:flex items-end justify-center">
                    <img
                      src={currentDriver.image}
                      alt={currentDriver.name}
                      className="h-[400px] lg:h-[500px] w-auto object-contain drop-shadow-2xl"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Navigation Buttons */}
            <button
              onClick={prevDriver}
              className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 w-10 h-10 sm:w-12 sm:h-12 bg-black/80 hover:bg-red-600 text-white rounded-full flex items-center justify-center transition-all duration-200 border border-white/20 hover:border-red-600"
            >
              <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <button
              onClick={nextDriver}
              className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 w-10 h-10 sm:w-12 sm:h-12 bg-black/80 hover:bg-red-600 text-white rounded-full flex items-center justify-center transition-all duration-200 border border-white/20 hover:border-red-600"
            >
              <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>

            {/* Dots Indicator */}
            <div className="flex justify-center gap-1.5 sm:gap-2 mt-4 sm:mt-6">
              {formulaRacers.slice(0, 10).map((_, index) => (
                <button
                  key={index}
                  onClick={() => {
                    setDriverAutoPlay(false);
                    setCurrentDriverIndex(index);
                  }}
                  className={`w-2 h-2 rounded-full transition-all duration-200 ${
                    index === currentDriverIndex % 10 ? 'bg-red-600 w-8' : 'bg-gray-600 hover:bg-gray-400'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Teams Carousel */}
      <section className="py-8 sm:py-12 md:py-16 px-4 sm:px-6 md:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-8 sm:mb-12">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-white mb-2 sm:mb-3 tracking-tight uppercase">
              <span className="text-red-600">Constructor</span> Teams
            </h2>
            <div className="w-16 sm:w-24 h-0.5 sm:h-1 bg-gradient-to-r from-transparent via-red-600 to-transparent mx-auto"></div>
          </div>

          <div className="relative">
            {/* Carousel Content */}
            <div className="relative h-[450px] sm:h-[500px] md:h-[550px] overflow-hidden rounded-xl" style={{ backgroundColor: currentTeam.color }}>
              {/* Multiple texture layers */}
              <div className="absolute inset-0">
                {/* Diagonal stripes */}
                <div className="absolute inset-0 opacity-10" style={{
                  backgroundImage: 'repeating-linear-gradient(45deg, transparent, transparent 20px, rgba(0,0,0,0.15) 20px, rgba(0,0,0,0.15) 40px)'
                }}></div>

                {/* Dots pattern */}
                <div className="absolute inset-0 opacity-5" style={{
                  backgroundImage: 'radial-gradient(circle, rgba(0,0,0,0.2) 1px, transparent 1px)',
                  backgroundSize: '20px 20px'
                }}></div>

                {/* Hexagon pattern */}
                <div className="absolute inset-0 opacity-10">
                  <svg width="100%" height="100%">
                    <defs>
                      <pattern id="hexagons" x="0" y="0" width="50" height="43.4" patternUnits="userSpaceOnUse">
                        <polygon points="24.8,22 37.3,29.2 37.3,43.7 24.8,50.9 12.3,43.7 12.3,29.2" fill="none" stroke="rgba(0,0,0,0.3)" strokeWidth="1"/>
                      </pattern>
                    </defs>
                    <rect width="100%" height="100%" fill="url(#hexagons)" />
                  </svg>
                </div>

                {/* Gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-br from-black/20 via-transparent to-black/40"></div>
              </div>

              {/* Team Content */}
              <div className="relative h-full flex items-center p-4 sm:p-6 md:p-8 lg:p-12">
                <div className="grid md:grid-cols-2 gap-6 sm:gap-8 w-full items-center">
                  {/* Team Info */}
                  <div className="space-y-3 sm:space-y-4 md:space-y-6">
                    <div className="text-white/20 font-bold text-sm uppercase tracking-wider">
                      {currentTeam.base}
                    </div>
                    <h3 className="text-4xl sm:text-5xl font-black text-white mb-1 sm:mb-2 uppercase tracking-tight">
                      {currentTeam.name}
                    </h3>
                    <div className="space-y-2">
                      <div className="text-white/90 font-bold uppercase tracking-wider text-sm">
                        Drivers
                      </div>
                      <div className="text-white text-xl sm:text-2xl font-black">
                        {currentTeam.drivers.join(' • ')}
                      </div>
                    </div>
                    <div className="flex items-center gap-4 sm:gap-6 md:gap-8 pt-2 sm:pt-4">
                      <div>
                        <div className="text-white/70 text-sm uppercase tracking-wider mb-1">Championships</div>
                        <div className="text-4xl sm:text-5xl font-black text-white">{currentTeam.championships}</div>
                      </div>
                    </div>
                    <Link
                      to="/teams"
                      className="inline-block px-5 sm:px-6 py-2.5 sm:py-3 bg-black hover:bg-black/80 text-white font-bold text-sm tracking-wider uppercase transition-all duration-200"
                    >
                      View All Teams
                    </Link>
                  </div>

                  {/* Team Car Image */}
                  <div className="relative hidden sm:flex items-center justify-center">
                    <img
                      src={currentTeam.carImage}
                      alt={`${currentTeam.name} car`}
                      className="w-full max-w-[300px] md:max-w-[400px] lg:max-w-[500px] h-auto object-contain drop-shadow-2xl"
                      onError={(e) => {
                        e.target.style.display = 'none';
                      }}
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Navigation Buttons */}
            <button
              onClick={prevTeam}
              className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 w-10 h-10 sm:w-12 sm:h-12 bg-black/80 hover:bg-white/20 text-white rounded-full flex items-center justify-center transition-all duration-200 border border-white/20"
            >
              <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <button
              onClick={nextTeam}
              className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 w-10 h-10 sm:w-12 sm:h-12 bg-black/80 hover:bg-white/20 text-white rounded-full flex items-center justify-center transition-all duration-200 border border-white/20"
            >
              <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>

            {/* Dots Indicator */}
            <div className="flex justify-center gap-1.5 sm:gap-2 mt-4 sm:mt-6">
              {teams.map((_, index) => (
                <button
                  key={index}
                  onClick={() => {
                    setTeamAutoPlay(false);
                    setCurrentTeamIndex(index);
                  }}
                  className={`w-2 h-2 rounded-full transition-all duration-200 ${
                    index === currentTeamIndex ? 'bg-red-600 w-8' : 'bg-gray-600 hover:bg-gray-400'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-8 sm:py-12 md:py-16 px-4 sm:px-6 max-w-7xl mx-auto bg-zinc-900/50">
        <div className="mb-6 sm:mb-8">
          <h2 className="text-3xl sm:text-4xl font-black text-white uppercase tracking-tight mb-2">By The Numbers</h2>
          <div className="w-12 sm:w-16 h-0.5 sm:h-1 bg-red-600"></div>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
          {[
            { value: '20', label: 'Drivers' },
            { value: '10', label: 'Teams' },
            { value: '24', label: 'Races' },
            { value: '1000+', label: 'Grand Prix' },
          ].map((stat, index) => (
            <div key={index} className="border-l-2 sm:border-l-4 border-red-600 pl-3 sm:pl-4">
              <div className="text-4xl sm:text-5xl font-black text-white mb-1">{stat.value}</div>
              <div className="text-gray-400 text-sm uppercase tracking-wide">{stat.label}</div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};
