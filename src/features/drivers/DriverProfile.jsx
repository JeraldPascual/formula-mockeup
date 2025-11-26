import React, { useEffect, useRef } from "react";
import formulaRacers from "../../assets/formulaRacers.json";
import teamsData from "../../assets/teams.json";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

// Country name and gradient mapping
const countryData = {
  "🇳🇱": { name: "NETHERLANDS", gradient: "linear-gradient(135deg, #AE1C28 0%, #FFFFFF 33%, #21468B 100%)" },
  "🇯🇵": { name: "JAPAN", gradient: "linear-gradient(135deg, #FFFFFF 0%, #BC002D 100%)" },
  "🇲🇨": { name: "MONACO", gradient: "linear-gradient(135deg, #CE1126 0%, #FFFFFF 100%)" },
  "🇬🇧": { name: "GREAT BRITAIN", gradient: "linear-gradient(135deg, #012169 0%, #FFFFFF 50%, #C8102E 100%)" },
  "🇦🇺": { name: "AUSTRALIA", gradient: "linear-gradient(135deg, #00008B 0%, #FFFFFF 50%, #FF0000 100%)" },
  "🇮🇹": { name: "ITALY", gradient: "linear-gradient(135deg, #009246 0%, #FFFFFF 50%, #CE2B37 100%)" },
  "🇪🇸": { name: "SPAIN", gradient: "linear-gradient(135deg, #AA151B 0%, #F1BF00 50%, #AA151B 100%)" },
  "🇨🇦": { name: "CANADA", gradient: "linear-gradient(135deg, #FF0000 0%, #FFFFFF 100%)" },
  "🇫🇷": { name: "FRANCE", gradient: "linear-gradient(135deg, #002395 0%, #FFFFFF 50%, #ED2939 100%)" },
  "🇦🇷": { name: "ARGENTINA", gradient: "linear-gradient(135deg, #74ACDF 0%, #FFFFFF 50%, #74ACDF 100%)" },
  "🇳🇿": { name: "NEW ZEALAND", gradient: "linear-gradient(135deg, #00247D 0%, #FFFFFF 50%, #CC142B 100%)" },
  "🇹🇭": { name: "THAILAND", gradient: "linear-gradient(135deg, #ED1C24 0%, #FFFFFF 33%, #241D4F 66%, #FFFFFF 100%)" },
  "🇩🇪": { name: "GERMANY", gradient: "linear-gradient(135deg, #000000 0%, #DD0000 50%, #FFCE00 100%)" },
  "🇧🇷": { name: "BRAZIL", gradient: "linear-gradient(135deg, #009B3A 0%, #FEDF00 50%, #002776 100%)" },
};

export const DriverProfile = () => {
  const cardsRef = useRef([]);

  useEffect(() => {
    const introCar = document.querySelector('.intro-car');
    if (introCar) {
      gsap.fromTo(
        introCar,
        { y: 200, opacity: 0, scale: 0.8 },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 1.5,
          ease: "power3.out",
          scrollTrigger: {
            trigger: introCar,
            start: "top bottom",
            end: "center center",
            scrub: 1,
          },
        }
      );
    }

    cardsRef.current.forEach((card, index) => {
      gsap.fromTo(
        card,
        { opacity: 0, x: index % 2 === 0 ? -100 : 100 },
        {
          opacity: 1,
          x: 0,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: card,
            start: "top bottom-=100",
            toggleActions: "play none none reverse",
          },
        }
      );
    });
  }, []);

  return (
    <div className="w-full space-y-8">
      {teamsData.map((team, teamIndex) => {
        const teamDrivers = formulaRacers.filter(racer => racer.team === team.name);

        return (
          <React.Fragment key={team.name}>
            {/* Team Introduction Section */}
            <div
              className="w-full min-h-screen flex flex-col items-center justify-center relative overflow-hidden"
              style={{ backgroundColor: team.color }}
            >
              <div className="absolute inset-0 opacity-10">
                <div
                  className="absolute inset-0"
                  style={{
                    backgroundImage:
                      "repeating-linear-gradient(45deg, transparent, transparent 30px, rgba(0,0,0,.1) 30px, rgba(0,0,0,.1) 60px)",
                  }}
                ></div>
              </div>

              <div className="relative z-10 text-center px-4 sm:px-8 mb-16">
                <div className="text-white text-base sm:text-lg md:text-xl font-bold uppercase tracking-widest mb-4 opacity-70">
                  {team.base}
                </div>
                <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black text-white uppercase tracking-tight mb-8"
                  style={{ textShadow: '0 0 60px rgba(0,0,0,0.5)' }}>
                  {team.name}
                </h1>
                <div className="flex items-center justify-center gap-4 sm:gap-8 text-white text-sm sm:text-base md:text-lg font-semibold uppercase">
                  <span className="opacity-80">{team.championships} {team.championships === 1 ? 'Championship' : 'Championships'}</span>
                  <span className="opacity-50">•</span>
                  <span className="opacity-80">{teamDrivers.length} Drivers</span>
                </div>
              </div>

              <div className="intro-car w-full max-w-7xl px-8 relative">
                <img
                  src={team.carImage}
                  alt={`${team.name} car`}
                  className="w-full h-auto object-contain drop-shadow-2xl"
                  onError={(e) => {
                    e.target.src = `https://media.formula1.com/image/upload/f_auto,c_limit,w_1440,q_auto/content/dam/fom-website/teams/2024/${team.name.toLowerCase().replace(/\s+/g, '-')}.png`;
                  }}
                />
              </div>

              <div className="absolute bottom-12 left-1/2 transform -translate-x-1/2 text-white opacity-50 animate-bounce">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                </svg>
              </div>
            </div>

            {/* Team's Driver Sections */}
            {teamDrivers.map((racer, driverIndex) => {
              const teamColor = racer.teamColor || "#E10600";
              const isEven = driverIndex % 2 === 0;
              const country = countryData[racer.flag] || { name: "RACING", gradient: "linear-gradient(135deg, #FFFFFF 0%, #E10600 100%)" };
              const overallIndex = teamIndex * 10 + driverIndex;

              return (
                <div
                  key={racer.name}
                  ref={(el) => (cardsRef.current[overallIndex] = el)}
                  className="w-full min-h-screen flex items-center relative overflow-hidden"
                  style={{ backgroundColor: teamColor }}
                >
                  <div className="absolute inset-0 opacity-10">
                    <div
                      className="absolute inset-0"
                      style={{
                        backgroundImage:
                          "repeating-linear-gradient(45deg, transparent, transparent 30px, rgba(0,0,0,.1) 30px, rgba(0,0,0,.1) 60px)",
                      }}
                    ></div>
                  </div>

                  <div className="absolute inset-0 flex items-center justify-center pointer-events-none overflow-hidden">
                    <span
                      className="font-black select-none"
                      style={{
                        fontSize: 'clamp(15rem, 30vw, 35rem)',
                        lineHeight: 1,
                        WebkitTextStroke: '2px rgba(0,0,0,0.2)',
                        WebkitTextFillColor: 'transparent',
                        color: 'transparent',
                      }}
                    >
                      {racer.number}
                    </span>
                  </div>

                  <div className={`w-full px-4 sm:px-6 md:px-12 lg:px-24 py-12 sm:py-16 grid lg:grid-cols-2 gap-8 sm:gap-12 lg:gap-16 items-center relative z-10 ${!isEven ? 'lg:flex-row-reverse' : ''}`}>
                    <div className={`space-y-4 sm:space-y-6 md:space-y-8 ${!isEven ? 'lg:order-2' : ''}`}>
                      <div>
                        <span
                          className="text-2xl sm:text-3xl md:text-4xl font-black uppercase tracking-tight block"
                          style={{
                            background: country.gradient,
                            WebkitBackgroundClip: 'text',
                            WebkitTextFillColor: 'transparent',
                            backgroundClip: 'text',
                          }}
                        >
                          {country.name}
                        </span>
                      </div>

                      <div>
                        <h1 className="text-4xl sm:text-5xl md:text-6xl font-black text-white uppercase tracking-tight mb-2">
                          {racer.name.split(' ')[0]}
                        </h1>
                        <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-white uppercase tracking-tight opacity-80">
                          {racer.name.split(' ').slice(1).join(' ')}
                        </h2>
                      </div>

                      <div className="text-white text-base sm:text-lg md:text-xl font-bold uppercase tracking-wider opacity-90">
                        {racer.team}
                      </div>

                      <p className="text-white text-base sm:text-lg leading-relaxed opacity-80 max-w-xl">
                        {racer.description}
                      </p>

                      <div className="bg-white bg-opacity-10 backdrop-blur-sm p-6 rounded-lg">
                        <div className="text-white text-sm font-semibold uppercase opacity-70 mb-2">
                          Team
                        </div>
                        <div className="text-white text-xl font-black uppercase">
                          {racer.team}
                        </div>
                      </div>
                    </div>

                    <div className={`relative h-[700px] w-full ${!isEven ? 'lg:order-1' : ''}`}>
                      <div className="absolute inset-0 flex items-center justify-center opacity-30">
                        <img
                          src={racer.actionImage || `https://media.formula1.com/content/dam/fom-website/teams/2024/${racer.team.toLowerCase().replace(/\s+/g, '-')}.png`}
                          alt={`${racer.team} car`}
                          className="w-[180%] h-auto object-contain scale-150"
                          onError={(e) => {
                            e.target.style.display = 'none';
                          }}
                        />
                      </div>

                      <div className="relative z-20 h-full flex items-center justify-center overflow-hidden">
                        <img
                          src={racer.image}
                          alt={racer.name}
                          className="h-[110%] w-auto object-contain drop-shadow-2xl"
                          onError={(e) => {
                            e.target.src = "https://via.placeholder.com/400x600?text=" + racer.name;
                          }}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </React.Fragment>
        );
      })}
    </div>
  );
};
