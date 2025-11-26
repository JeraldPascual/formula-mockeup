import { useEffect, useState } from "react";

export const SchedulePage = () => {
  const [races, setRaces] = useState([]);
  const [loading, setLoading] = useState(true);

  // Static 2025 F1 Calendar as fallback
  const staticSchedule = [
    { round: 1, name: "Bahrain Grand Prix", location: "Sakhir", country: "Bahrain", date: "2025-03-16", circuit: "Bahrain International Circuit" },
    { round: 2, name: "Saudi Arabian Grand Prix", location: "Jeddah", country: "Saudi Arabia", date: "2025-03-23", circuit: "Jeddah Corniche Circuit" },
    { round: 3, name: "Australian Grand Prix", location: "Melbourne", country: "Australia", date: "2025-04-06", circuit: "Albert Park Circuit" },
    { round: 4, name: "Japanese Grand Prix", location: "Suzuka", country: "Japan", date: "2025-04-13", circuit: "Suzuka Circuit" },
    { round: 5, name: "Chinese Grand Prix", location: "Shanghai", country: "China", date: "2025-04-20", circuit: "Shanghai International Circuit" },
    { round: 6, name: "Miami Grand Prix", location: "Miami", country: "USA", date: "2025-05-04", circuit: "Miami International Autodrome" },
    { round: 7, name: "Emilia Romagna Grand Prix", location: "Imola", country: "Italy", date: "2025-05-18", circuit: "Autodromo Enzo e Dino Ferrari" },
    { round: 8, name: "Monaco Grand Prix", location: "Monte Carlo", country: "Monaco", date: "2025-05-25", circuit: "Circuit de Monaco" },
    { round: 9, name: "Spanish Grand Prix", location: "Barcelona", country: "Spain", date: "2025-06-01", circuit: "Circuit de Barcelona-Catalunya" },
    { round: 10, name: "Canadian Grand Prix", location: "Montreal", country: "Canada", date: "2025-06-15", circuit: "Circuit Gilles Villeneuve" },
    { round: 11, name: "Austrian Grand Prix", location: "Spielberg", country: "Austria", date: "2025-06-29", circuit: "Red Bull Ring" },
    { round: 12, name: "British Grand Prix", location: "Silverstone", country: "United Kingdom", date: "2025-07-06", circuit: "Silverstone Circuit" },
    { round: 13, name: "Belgian Grand Prix", location: "Spa-Francorchamps", country: "Belgium", date: "2025-07-27", circuit: "Circuit de Spa-Francorchamps" },
    { round: 14, name: "Hungarian Grand Prix", location: "Budapest", country: "Hungary", date: "2025-08-03", circuit: "Hungaroring" },
    { round: 15, name: "Dutch Grand Prix", location: "Zandvoort", country: "Netherlands", date: "2025-08-31", circuit: "Circuit Zandvoort" },
    { round: 16, name: "Italian Grand Prix", location: "Monza", country: "Italy", date: "2025-09-07", circuit: "Autodromo Nazionale di Monza" },
    { round: 17, name: "Azerbaijan Grand Prix", location: "Baku", country: "Azerbaijan", date: "2025-09-21", circuit: "Baku City Circuit" },
    { round: 18, name: "Singapore Grand Prix", location: "Singapore", country: "Singapore", date: "2025-10-05", circuit: "Marina Bay Street Circuit" },
    { round: 19, name: "United States Grand Prix", location: "Austin", country: "USA", date: "2025-10-19", circuit: "Circuit of the Americas" },
    { round: 20, name: "Mexico City Grand Prix", location: "Mexico City", country: "Mexico", date: "2025-10-26", circuit: "Autódromo Hermanos Rodríguez" },
    { round: 21, name: "São Paulo Grand Prix", location: "São Paulo", country: "Brazil", date: "2025-11-09", circuit: "Autódromo José Carlos Pace" },
    { round: 22, name: "Las Vegas Grand Prix", location: "Las Vegas", country: "USA", date: "2025-11-22", circuit: "Las Vegas Street Circuit" },
    { round: 23, name: "Qatar Grand Prix", location: "Lusail", country: "Qatar", date: "2025-11-30", circuit: "Lusail International Circuit" },
    { round: 24, name: "Abu Dhabi Grand Prix", location: "Abu Dhabi", country: "UAE", date: "2025-12-07", circuit: "Yas Marina Circuit" },
  ];

  useEffect(() => {
    // Use static schedule since API might not have 2025 data
    setRaces(staticSchedule);
    setLoading(false);
  }, []);

  const getCurrentRace = () => {
    const now = new Date();
    return races.find(race => new Date(race.date) >= now) || races[0];
  };

  const currentRace = getCurrentRace();

  const getRaceStatus = (raceDate) => {
    const now = new Date();
    const race = new Date(raceDate);

    if (race < now) return 'completed';
    if (race.toDateString() === now.toDateString()) return 'today';

    const daysUntil = Math.ceil((race - now) / (1000 * 60 * 60 * 24));
    if (daysUntil <= 7) return 'upcoming';

    return 'future';
  };

  const getStatusStyles = (status) => {
    switch(status) {
      case 'completed':
        return 'bg-zinc-800/50 border-zinc-700 opacity-60';
      case 'today':
        return 'bg-red-600/20 border-red-600 ring-2 ring-red-600/50';
      case 'upcoming':
        return 'bg-red-600/10 border-red-600/50';
      default:
        return 'bg-zinc-900 border-zinc-800';
    }
  };

  const getStatusBadge = (status) => {
    switch(status) {
      case 'completed':
        return <span className="px-2 py-1 bg-zinc-700 text-zinc-400 text-xs font-bold uppercase rounded">Completed</span>;
      case 'today':
        return <span className="px-2 py-1 bg-red-600 text-white text-xs font-bold uppercase rounded animate-pulse">Race Day</span>;
      case 'upcoming':
        return <span className="px-2 py-1 bg-red-600/80 text-white text-xs font-bold uppercase rounded">Next Up</span>;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-black py-8 sm:py-12 md:py-16 px-4 sm:px-6 md:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8 sm:mb-12">
          <div className="inline-block px-4 py-1.5 bg-red-600/20 border border-red-600/50 rounded-full mb-4">
            <span className="text-red-500 text-xs font-bold uppercase tracking-wider">2025 Season</span>
          </div>
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black text-white mb-3 sm:mb-4 tracking-tight uppercase">
            Race <span className="text-red-600">Calendar</span>
          </h1>
          <p className="text-gray-400 text-base sm:text-lg max-w-2xl mx-auto">
            24 races across 5 continents. The most exciting season in Formula 1 history.
          </p>
          <div className="w-24 h-1 bg-gradient-to-r from-transparent via-red-600 to-transparent mx-auto mt-6"></div>
        </div>

        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="relative">
              <div className="w-16 h-16 border-4 border-red-600/30 border-t-red-600 rounded-full animate-spin"></div>
              <div className="text-red-600 text-sm font-bold mt-4 text-center animate-pulse">Loading Schedule...</div>
            </div>
          </div>
        ) : (
          <div className="grid gap-4 sm:gap-6">
            {races.map((race) => {
              const status = getRaceStatus(race.date);
              const isHighlighted = race.round === currentRace?.round;

              return (
                <div
                  key={race.round}
                  className={`relative group ${getStatusStyles(status)} border rounded-xl sm:rounded-2xl overflow-hidden transition-all duration-300 hover:scale-[1.01] ${
                    isHighlighted ? 'shadow-2xl shadow-red-600/20' : ''
                  }`}
                >
                  {/* Background pattern */}
                  <div className="absolute inset-0 opacity-5">
                    <div className="absolute inset-0" style={{
                      backgroundImage: 'repeating-linear-gradient(45deg, transparent, transparent 10px, rgba(255,255,255,0.1) 10px, rgba(255,255,255,0.1) 20px)'
                    }}></div>
                  </div>

                  {/* Animated gradient for current race */}
                  {isHighlighted && (
                    <div className="absolute top-0 right-0 w-96 h-96 bg-red-600/20 rounded-full blur-3xl group-hover:bg-red-600/30 transition-all duration-500"></div>
                  )}

                  <div className="relative grid grid-cols-12 gap-3 sm:gap-4 md:gap-6 p-4 sm:p-6 md:p-8 items-center">
                    {/* Round Number */}
                    <div className="col-span-2 sm:col-span-1 flex flex-col items-center justify-center">
                      <div className={`text-4xl sm:text-5xl md:text-6xl font-black ${status === 'completed' ? 'text-zinc-600' : 'text-red-600'}`}>
                        {race.round}
                      </div>
                      <div className="text-xs text-gray-500 font-bold uppercase mt-1 hidden sm:block">Round</div>
                    </div>

                    {/* Race Info */}
                    <div className="col-span-10 sm:col-span-8 md:col-span-7 space-y-2">
                      <div className="flex items-center gap-2 flex-wrap">
                        <h3 className={`text-lg sm:text-xl md:text-2xl lg:text-3xl font-black ${status === 'completed' ? 'text-gray-500' : 'text-white'} leading-tight`}>
                          {race.name}
                        </h3>
                        {getStatusBadge(status)}
                      </div>

                      <div className="flex flex-wrap gap-4 text-sm">
                        <div className="flex items-center gap-2">
                          <svg className="w-4 h-4 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                          </svg>
                          <span className={status === 'completed' ? 'text-gray-600' : 'text-gray-400'}>
                            {race.location}, {race.country}
                          </span>
                        </div>

                        <div className="flex items-center gap-2">
                          <svg className="w-4 h-4 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
                          </svg>
                          <span className={`text-xs ${status === 'completed' ? 'text-gray-600' : 'text-gray-500'} truncate max-w-[200px] sm:max-w-none`}>
                            {race.circuit}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Date */}
                    <div className="col-span-12 sm:col-span-3 md:col-span-4 flex sm:justify-end items-center">
                      <div className={`text-center sm:text-right ${isHighlighted ? 'scale-110' : ''} transition-transform`}>
                        <div className={`text-2xl sm:text-3xl md:text-4xl font-black ${status === 'completed' ? 'text-gray-600' : 'text-white'}`}>
                          {new Date(race.date).toLocaleDateString('en-US', { day: 'numeric' })}
                        </div>
                        <div className={`text-sm sm:text-base font-bold uppercase ${status === 'completed' ? 'text-gray-600' : 'text-red-500'}`}>
                          {new Date(race.date).toLocaleDateString('en-US', { month: 'short' })}
                        </div>
                        <div className={`text-xs ${status === 'completed' ? 'text-gray-700' : 'text-gray-500'} font-semibold`}>
                          {new Date(race.date).toLocaleDateString('en-US', { year: 'numeric' })}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Hover effect line */}
                  {status !== 'completed' && (
                    <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-red-600 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  )}
                </div>
              );
            })}
          </div>
        )}

        {/* Season Stats */}
        <div className="mt-12 sm:mt-16 grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
          <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-4 sm:p-6 text-center">
            <div className="text-3xl sm:text-4xl font-black text-red-600 mb-2">{races.length}</div>
            <div className="text-gray-400 text-xs sm:text-sm font-bold uppercase tracking-wider">Total Races</div>
          </div>
          <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-4 sm:p-6 text-center">
            <div className="text-3xl sm:text-4xl font-black text-red-600 mb-2">5</div>
            <div className="text-gray-400 text-xs sm:text-sm font-bold uppercase tracking-wider">Continents</div>
          </div>
          <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-4 sm:p-6 text-center">
            <div className="text-3xl sm:text-4xl font-black text-red-600 mb-2">
              {races.filter(r => getRaceStatus(r.date) === 'completed').length}
            </div>
            <div className="text-gray-400 text-xs sm:text-sm font-bold uppercase tracking-wider">Completed</div>
          </div>
          <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-4 sm:p-6 text-center">
            <div className="text-3xl sm:text-4xl font-black text-red-600 mb-2">
              {races.filter(r => getRaceStatus(r.date) !== 'completed').length}
            </div>
            <div className="text-gray-400 text-xs sm:text-sm font-bold uppercase tracking-wider">Remaining</div>
          </div>
        </div>
      </div>
    </div>
  );
};
