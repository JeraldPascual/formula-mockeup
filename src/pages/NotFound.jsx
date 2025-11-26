import { Link } from "react-router-dom";
import { useEffect, useRef } from "react";
import gsap from "gsap";

export const NotFound = () => {
  const containerRef = useRef(null);
  const textRef = useRef(null);

  useEffect(() => {
    gsap.fromTo(
      containerRef.current,
      { opacity: 0, scale: 0.9 },
      { opacity: 1, scale: 1, duration: 0.8, ease: "power3.out" }
    );

    gsap.fromTo(
      textRef.current,
      { y: 30, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.6, delay: 0.3, ease: "power2.out" }
    );
  }, []);

  return (
    <div className="min-h-screen bg-black flex items-center justify-center px-6 relative overflow-hidden">
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-5">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              "repeating-linear-gradient(45deg, transparent, transparent 30px, rgba(220,38,38,.1) 30px, rgba(220,38,38,.1) 60px)",
          }}
        ></div>
      </div>

      <div ref={containerRef} className="text-center relative z-10">
        {/* Giant 404 */}
        <div className="relative mb-8">
          <div
            className="text-[15rem] md:text-[20rem] font-black leading-none"
            style={{
              WebkitTextStroke: '3px rgba(220, 38, 38, 0.5)',
              WebkitTextFillColor: 'transparent',
              color: 'transparent',
            }}
          >
            404
          </div>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-6xl md:text-8xl font-black text-red-600 animate-pulse">
              404
            </div>
          </div>
        </div>

        {/* Message */}
        <div ref={textRef} className="space-y-6">
          <h1 className="text-4xl md:text-5xl font-black text-white uppercase tracking-tight">
            Page Not Found
          </h1>
          <p className="text-gray-400 text-lg max-w-md mx-auto">
            This page has gone off-track. Let's get you back to the race.
          </p>

          {/* Buttons */}
          <div className="flex gap-4 justify-center flex-wrap mt-8">
            <Link
              to="/"
              className="px-8 py-4 bg-red-600 hover:bg-red-700 text-white font-black text-sm uppercase tracking-wider transition-all duration-200 shadow-lg hover:shadow-red-600/50"
            >
              Back to Home
            </Link>
            <Link
              to="/drivers"
              className="px-8 py-4 bg-white/10 hover:bg-white/20 backdrop-blur-sm text-white font-black text-sm uppercase tracking-wider transition-all duration-200"
            >
              View Drivers
            </Link>
          </div>
        </div>

        {/* Decorative elements */}
        <div className="absolute -top-20 -left-20 w-40 h-40 bg-red-600/20 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-20 -right-20 w-40 h-40 bg-red-600/10 rounded-full blur-3xl"></div>
      </div>
    </div>
  );
};
