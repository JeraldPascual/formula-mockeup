import teams from "../../assets/teams.json";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export const TeamsPage = () => {
  const titleRef = useRef(null);
  const cardsRef = useRef([]);

  useEffect(() => {
    gsap.fromTo(
      titleRef.current,
      { opacity: 0, y: -30 },
      { opacity: 1, y: 0, duration: 0.8, ease: "power3.out", delay: 0.2 }
    );

    cardsRef.current.forEach((card, index) => {
      gsap.fromTo(
        card,
        { opacity: 0, x: index % 2 === 0 ? -50 : 50, scale: 0.9 },
        {
          opacity: 1,
          x: 0,
          scale: 1,
          duration: 0.7,
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
    <section className="min-h-screen bg-black py-8 sm:py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div ref={titleRef} className="mb-6 sm:mb-8">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-white mb-2 tracking-tight">
            Teams
          </h2>
          <p className="text-gray-400 text-xs sm:text-sm">2025 Constructor Lineup</p>
        </div>

        <div className="space-y-2 sm:space-y-3">
          {teams.map((team, index) => (
            <div
              key={team.name}
              ref={(el) => (cardsRef.current[index] = el)}
              className="group bg-zinc-900 hover:bg-zinc-800 transition-all duration-300 overflow-hidden border-l-2 sm:border-l-4"
              style={{ borderLeftColor: team.color }}
            >
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-4 sm:p-6 gap-4">
                <div className="flex items-center gap-4 sm:gap-8 flex-1 w-full">
                  <div className="flex items-center gap-3 sm:gap-4">
                    <div
                      className="w-0.5 sm:w-1 h-12 sm:h-16 rounded-full"
                      style={{ backgroundColor: team.color }}
                    ></div>
                    <span className="text-xl sm:text-2xl font-black text-white group-hover:text-red-500 transition-colors">
                      {String(index + 1).padStart(2, '0')}
                    </span>
                  </div>

                  <div className="flex-1">
                    <h3 className="text-lg sm:text-xl md:text-2xl font-black text-white mb-1 uppercase tracking-tight">
                      {team.name}
                    </h3>
                    <div className="text-gray-400 text-xs sm:text-sm space-y-1">
                      <p className="font-semibold">{team.drivers.join(' • ')}</p>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-4 sm:gap-8 w-full sm:w-auto justify-between sm:justify-end">
                  <div className="text-left sm:text-right">
                    <div className="text-gray-500 text-[10px] sm:text-xs uppercase tracking-wider mb-1">Base</div>
                    <div className="text-white font-bold text-xs sm:text-sm">{team.base}</div>
                  </div>
                  <div className="text-right">
                    <div className="text-gray-500 text-[10px] sm:text-xs uppercase tracking-wider mb-1">Championships</div>
                    <div className="text-lg sm:text-xl font-black" style={{ color: team.color }}>
                      {team.championships}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
