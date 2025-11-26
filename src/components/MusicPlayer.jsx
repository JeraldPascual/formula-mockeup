import { useEffect, useRef, useState } from "react";

export const MusicPlayer = () => {
  const audioRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    // Autoplay with fallback
    const tryAutoPlay = async () => {
      if (audioRef.current) {
        try {
          audioRef.current.volume = 0.3;
          audioRef.current.currentTime = 30;
          await audioRef.current.play();
          setIsPlaying(true);
        } catch (error) {
          console.log("Autoplay blocked, waiting for user interaction");
          // If still blocked, wait for any user interaction
          const enableOnInteraction = async () => {
            try {
              if (audioRef.current) {
                audioRef.current.volume = 0.3;
                audioRef.current.currentTime = 30;
                await audioRef.current.play();
                setIsPlaying(true);
              }
            } catch (err) {
              console.log("Play failed:", err);
            }
          };
          document.addEventListener('click', enableOnInteraction, { once: true });
          document.addEventListener('keydown', enableOnInteraction, { once: true });
        }
      }
    };

    // Try after short delay
    setTimeout(tryAutoPlay, 100);
  }, []);

  // Handle chorus looping with 2-second gap
  useEffect(() => {
    const handleTimeUpdate = () => {
      if (audioRef.current && audioRef.current.currentTime >= 75) {
        audioRef.current.pause();
        setIsPlaying(false);
        // Wait 2 seconds before restarting
        setTimeout(() => {
          if (audioRef.current) {
            audioRef.current.currentTime = 30;
            audioRef.current.play().then(() => {
              setIsPlaying(true);
            }).catch(err => console.log("Restart failed:", err));
          }
        }, 2000);
      }
    };

    const audio = audioRef.current;
    if (audio) {
      audio.addEventListener('timeupdate', handleTimeUpdate);
    }

    return () => {
      if (audio) {
        audio.removeEventListener('timeupdate', handleTimeUpdate);
      }
    };
  }, []);

  const toggleAudio = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
        setIsPlaying(false);
      } else {
        const playPromise = audioRef.current.play();
        if (playPromise !== undefined) {
          playPromise
            .then(() => {
              setIsPlaying(true);
            })
            .catch(error => {
              console.error("Audio playback failed:", error);
              setIsPlaying(false);
            });
        } else {
          setIsPlaying(true);
        }
      }
    }
  };

  return (
    <>
      <audio
        ref={audioRef}
        src="/bg-music.mp3"
        preload="auto"
        playsInline
        onLoadedData={() => {
          if (audioRef.current) {
            audioRef.current.volume = 0.3;
          }
        }}
      />

      {/* Floating Music Button - F1 Themed */}
      <div
        className={`fixed right-6 bottom-6 z-[100] transition-all duration-300 ${isVisible ? 'translate-x-0' : 'translate-x-20'}`}
      >
        <button
          onClick={toggleAudio}
          className="group relative w-14 h-14 bg-gradient-to-br from-red-600 to-red-700 hover:from-red-500 hover:to-red-600 rounded-full shadow-[0_0_30px_rgba(220,38,38,0.6)] hover:shadow-[0_0_40px_rgba(220,38,38,0.8)] transition-all duration-300 hover:scale-110 border-2 border-red-400"
          title={isPlaying ? "Pause Theme" : "Play Theme"}
        >
          {/* F1 Logo Background */}
          <div className="absolute inset-0 flex items-center justify-center opacity-10">
            <span className="text-2xl font-black">F1</span>
          </div>

          {/* Play/Pause Icon */}
          <div className="relative z-10 flex items-center justify-center w-full h-full">
            {isPlaying ? (
              <div className="flex gap-1">
                <div className="w-1 h-4 bg-white rounded-full animate-pulse"></div>
                <div className="w-1 h-4 bg-white rounded-full animate-pulse" style={{ animationDelay: '0.2s' }}></div>
              </div>
            ) : (
              <div className="w-0 h-0 border-l-[10px] border-l-white border-t-[7px] border-t-transparent border-b-[7px] border-b-transparent ml-1"></div>
            )}
          </div>

          {/* Rotating border effect */}
          {isPlaying && (
            <div className="absolute inset-0 rounded-full border-2 border-t-white border-r-transparent border-b-transparent border-l-transparent animate-spin"></div>
          )}
        </button>

        {/* Tooltip on hover */}
        <div className="absolute right-16 top-1/2 -translate-y-1/2 bg-black/90 text-white px-3 py-2 rounded text-xs font-bold whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
          {isPlaying ? "PAUSE THEME" : "PLAY THEME"}
        </div>
      </div>
    </>
  );
};
