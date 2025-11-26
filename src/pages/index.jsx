import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Header } from "../components/header";
import { Footer } from "../components/Footer";
import { MusicPlayer } from "../components/MusicPlayer";
import { HomePage } from "../features/home/HomePage";
import { DriversPage } from "../features/drivers/DriversPage";
import { TeamsPage } from "../features/teams/TeamsPage";
import { StandingsPage } from "../features/standings/StandingsPage";
import { SchedulePage } from "../features/schedule/SchedulePage";
import { NotFound } from "./NotFound";

export const Index = () => {
  return (
    <Router>
      <main className="m-0 p-0 min-h-screen bg-black relative overflow-x-hidden">
        {/* Animated background pattern */}
        <div className="fixed inset-0 opacity-10 pointer-events-none">
          <div className="absolute inset-0" style={{
            backgroundImage: `
              linear-gradient(rgba(220, 38, 38, 0.1) 1px, transparent 1px),
              linear-gradient(90deg, rgba(220, 38, 38, 0.1) 1px, transparent 1px)
            `,
            backgroundSize: '50px 50px'
          }}></div>
        </div>

        {/* Red glow effects */}
        <div className="fixed top-0 left-1/4 w-96 h-96 bg-red-600/20 rounded-full blur-3xl pointer-events-none"></div>
        <div className="fixed bottom-0 right-1/4 w-96 h-96 bg-red-600/10 rounded-full blur-3xl pointer-events-none"></div>

        <div className="relative z-10">
          <Header />
          <div className="pt-16 md:pt-20">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/drivers" element={<DriversPage />} />
              <Route path="/teams" element={<TeamsPage />} />
              <Route path="/standings" element={<StandingsPage />} />
              <Route path="/schedule" element={<SchedulePage />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
            <Footer />
          </div>
        </div>

        {/* Floating Music Player */}
        <MusicPlayer />
      </main>
    </Router>
  );
}
