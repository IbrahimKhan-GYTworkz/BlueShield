import React, { useRef, useState, useEffect } from "react";
import heroVideo from "../../assets/home.mp4";
import ai from "../../assets/AI.svg";
import "../../globals.css"

const VideoHero: React.FC = () => {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;

    setIsPlaying(!v.paused && !v.ended);

    const onPlay = () => setIsPlaying(true);
    const onPause = () => setIsPlaying(false);

    v.addEventListener("play", onPlay);
    v.addEventListener("pause", onPause);
    return () => {
      v.removeEventListener("play", onPlay);
      v.removeEventListener("pause", onPause);
    };
  }, []);

  const togglePlay = async () => {
    const v = videoRef.current;
    if (!v) return;
    try {
      if (v.paused) {
        await v.play();
      } else {
        v.pause();
      }
    } catch (err) {
      console.error("Video play failed (browser policy?):", err);
    }
  };

  return (
    <div className="relative overflow-hidden mx-[25px] mt-4 rounded-2xl shadow-md">
      {/* Wrapper with aspect ratio for responsiveness */}
      <div
        className="relative w-full aspect-[16/9] sm:aspect-[21/9] lg:h-[571px]"
        onClick={togglePlay}
        role="button"
        aria-label={isPlaying ? "Pause video" : "Play video"}
      >
        {/* Background video */}
        <video
          ref={videoRef}
          muted
          playsInline
          className="absolute top-0 left-0 w-full h-full object-cover rounded-2xl cursor-pointer"
        >
          <source src={heroVideo} type="video/mp4" />
          Your browser does not support the video tag.
        </video>

        {/* Gradient overlay */}
        <div
          className="absolute inset-0 rounded-2xl pointer-events-none"
          style={{
            background:
              "linear-gradient(90deg, rgba(0,0,0,0.65) 0%, rgba(0,0,0,0.55) 20%, rgba(0,0,0,0.35) 40%, rgba(0,0,0,0.15) 70%, rgba(0,0,0,0) 100%)",
          }}
        />

        {/* Content */}
        <div className="relative z-20 flex flex-col items-center sm:items-start justify-center h-full text-center sm:text-left px-6 sm:px-12 lg:px-20">
          <h1 className="text-xl sm:text-4xl lg:text-6xl font-bold mb-4 max-w-xl">
            Your health Simplified with Ai
          </h1>
          <p className="text-base sm:text-lg lg:text-2xl max-w-2xl mb-6">
            Find the Right plan, doctor or answer — Instant.
          </p>

          <button
            onClick={(e) => e.stopPropagation()}
            className="border border-[#306FB641] px-5 sm:px-6 py-2 sm:py-3 rounded-full font-semibold text-sm sm:text-lg flex items-center space-x-2 transition-all duration-300 shadow-lg hover:shadow-xl  backdrop-blur"
          >
            <img src={ai} alt="ai" className="w-5 sm:w-6" />
            <span>Talk to Ai</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default VideoHero;

