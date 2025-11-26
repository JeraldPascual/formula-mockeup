import { useState, useEffect, useRef } from "react";
import standings from "../../assets/standings.json";
import gsap from "gsap";

export const StandingsPage = () => {
  const [activeTab, setActiveTab] = useState("drivers");
  const titleRef = useRef(null);
  const tabsRef = useRef(null);
  const tableRef = useRef(null);

  useEffect(() => {
    gsap.fromTo(
      titleRef.current,
      { opacity: 0, y: -30 },
      { opacity: 1, y: 0, duration: 0.8, ease: "power3.out", delay: 0.2 }
    );

    gsap.fromTo(
      tabsRef.current,
      { opacity: 0, scale: 0.9 },
      { opacity: 1, scale: 1, duration: 0.6, delay: 0.4 }
    );
  }, []);

  useEffect(() => {
    if (tableRef.current) {
      const rows = tableRef.current.children;
      gsap.fromTo(
        rows,
        { opacity: 0, x: -30 },
        { opacity: 1, x: 0, duration: 0.4, stagger: 0.03, ease: "power2.out" }
      );
    }
  }, [activeTab]);

  return (
    <section className="min-h-screen bg-black py-12">
      <div className="max-w-7xl mx-auto px-6">
        <div ref={titleRef} className="mb-8">
          <h2 className="text-4xl md:text-5xl font-black text-white mb-2 tracking-tight">
            Standings
          </h2>
          <p className="text-gray-400 text-sm">2025 Season Championship</p>
        </div>

        <div ref={tabsRef} className="flex gap-2 mb-8 border-b border-zinc-800">
          <button
            onClick={() => setActiveTab("drivers")}
            className={`px-6 py-3 font-bold text-sm tracking-wide transition-all ${
              activeTab === "drivers"
                ? "text-white border-b-2 border-red-600"
                : "text-gray-500 hover:text-gray-300"
            }`}
          >
            DRIVERS
          </button>
          <button
            onClick={() => setActiveTab("constructors")}
            className={`px-6 py-3 font-bold text-sm tracking-wide transition-all ${
              activeTab === "constructors"
                ? "text-white border-b-2 border-red-600"
                : "text-gray-500 hover:text-gray-300"
            }`}
          >
            CONSTRUCTORS
          </button>
        </div>

        {activeTab === "drivers" && (
          <div className="bg-zinc-900 overflow-x-auto">
            <div className="min-w-[600px]">
              <div className="grid grid-cols-12 gap-2 sm:gap-4 px-4 sm:px-6 py-4 bg-zinc-800 text-gray-400 text-xs font-bold uppercase tracking-wider">
                <div className="col-span-1">Pos</div>
                <div className="col-span-4 sm:col-span-4">Driver</div>
                <div className="col-span-3 sm:col-span-3">Team</div>
                <div className="col-span-2 text-center">Wins</div>
                <div className="col-span-2 text-right">Points</div>
              </div>
              <div ref={tableRef}>
                {standings.drivers.map((driver, index) => (
                  <div
                    key={driver.position}
                    className="grid grid-cols-12 gap-2 sm:gap-4 px-4 sm:px-6 py-4 sm:py-5 border-b border-zinc-800 hover:bg-zinc-800 transition-colors group"
                  >
                    <div className="col-span-1 flex items-center">
                      <span className="text-lg sm:text-xl font-black text-white group-hover:text-red-500 transition-colors">
                        {driver.position}
                      </span>
                    </div>
                    <div className="col-span-4 sm:col-span-4 flex items-center gap-2 sm:gap-3">
                      <div className="w-1 h-10 sm:h-12 rounded-full bg-red-600"></div>
                      <div className="min-w-0">
                        <div className="text-white font-bold text-sm sm:text-base truncate">{driver.name}</div>
                      </div>
                    </div>
                    <div className="col-span-3 sm:col-span-3 flex items-center text-gray-400 text-xs sm:text-sm font-semibold truncate">
                      {driver.team}
                    </div>
                    <div className="col-span-2 flex items-center justify-center">
                      {driver.wins > 0 ? (
                        <span className="bg-red-600 text-white text-xs font-black px-2 sm:px-3 py-1 rounded">{driver.wins}</span>
                      ) : (
                        <span className="text-gray-600">-</span>
                      )}
                    </div>
                    <div className="col-span-2 flex items-center justify-end text-white font-black text-lg sm:text-xl">
                      {driver.points}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeTab === "constructors" && (
          <div className="bg-zinc-900">
            <div className="grid grid-cols-12 gap-4 px-6 py-4 bg-zinc-800 text-gray-400 text-xs font-bold uppercase tracking-wider">
              <div className="col-span-1">Pos</div>
              <div className="col-span-9">Team</div>
              <div className="col-span-2 text-right">Pts</div>
            </div>
            <div ref={tableRef}>
              {standings.constructors.map((constructor, index) => (
                <div
                  key={constructor.position}
                  className="grid grid-cols-12 gap-4 px-6 py-5 border-b border-zinc-800 hover:bg-zinc-800 transition-colors group"
                >
                  <div className="col-span-1 flex items-center">
                    <span className="text-xl font-black text-white group-hover:text-red-500 transition-colors">
                      {constructor.position}
                    </span>
                  </div>
                  <div className="col-span-9 flex items-center gap-4">
                    <div
                      className="w-1 h-12 rounded-full"
                      style={{ backgroundColor: constructor.color }}
                    ></div>
                    <div className="text-white font-bold text-base">{constructor.name || constructor.team}</div>
                  </div>
                  <div className="col-span-2 flex items-center justify-end text-white font-black text-xl">
                    {constructor.points}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
