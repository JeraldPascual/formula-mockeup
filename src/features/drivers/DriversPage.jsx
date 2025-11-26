import { DriverProfile } from "./DriverProfile";
import { useEffect, useRef } from "react";
import gsap from "gsap";

export const DriversPage = () => {
  const titleRef = useRef(null);
  const subtitleRef = useRef(null);

  useEffect(() => {
    gsap.fromTo(
      titleRef.current,
      { opacity: 0, y: -30 },
      { opacity: 1, y: 0, duration: 0.8, ease: "power3.out", delay: 0.2 }
    );

    gsap.fromTo(
      subtitleRef.current,
      { opacity: 0 },
      { opacity: 1, duration: 0.8, delay: 0.5 }
    );
  }, []);

  return (
    <section className="p-8 max-w-7xl mx-auto">
      <div className="mb-12 text-center relative">
        <div className="absolute inset-0 flex items-center justify-center opacity-5">
          <span className="text-9xl font-black">2025</span>
        </div>
        <h2 ref={titleRef} className="relative text-5xl font-black text-white mb-3 tracking-tight uppercase">
          <span className="text-red-600">F1</span> Drivers
        </h2>
        <p ref={subtitleRef} className="text-gray-400 text-sm tracking-wider uppercase">20 Drivers • 10 Teams • One Champion</p>
        <div className="mt-4 mx-auto w-24 h-1 bg-gradient-to-r from-transparent via-red-600 to-transparent"></div>
      </div>
      <DriverProfile />
    </section>
  );
}
