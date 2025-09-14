import React, { useRef, useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import heroVideo from '../../assets/home.mp4'
import ai from '../../assets/AI.svg'
import '../../globals.css'

const VideoHero: React.FC = () => {
  const videoRef = useRef<HTMLVideoElement | null>(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const navigate = useNavigate()

  useEffect(() => {
    const v = videoRef.current
    if (!v) return

    setIsPlaying(!v.paused && !v.ended)

    const onPlay = () => setIsPlaying(true)
    const onPause = () => setIsPlaying(false)

    v.addEventListener('play', onPlay)
    v.addEventListener('pause', onPause)
    return () => {
      v.removeEventListener('play', onPlay)
      v.removeEventListener('pause', onPause)
    }
  }, [])

  const togglePlay = async () => {
    const v = videoRef.current
    if (!v) return
    try {
      if (v.paused) {
        await v.play()
      } else {
        v.pause()
      }
    } catch (err) {
      console.error('Video play failed (browser policy?):', err)
    }
  }

  return (
    <div className="relative mx-4 mt-4 overflow-hidden rounded-2xl shadow-md sm:mx-6 md:mx-8 lg:mx-[25px]">
      {/* Wrapper with aspect ratio for responsiveness */}
      <div
        className="relative w-full"
        style={{ height: '440px' }}
        onClick={togglePlay}
        role="button"
        aria-label={isPlaying ? 'Pause video' : 'Play video'}
      >
        {/* Background video */}
        <video
          ref={videoRef}
          muted
          playsInline
          className="absolute top-0 left-0 h-full w-full cursor-pointer rounded-2xl object-cover grayscale"
          style={{ height: '571px' }}
        >
          <source src={heroVideo} type="video/mp4" />
          Your browser does not support the video tag.
        </video>

        {/* Content */}
        <div className="relative z-20 flex h-full flex-col items-center justify-center px-4 text-center sm:items-start sm:px-6 sm:text-left md:px-8 lg:px-12 xl:px-20">
          <h1 className="mb-3 max-w-xl text-lg font-bold sm:mb-4 sm:text-2xl md:text-3xl lg:text-4xl xl:text-6xl">
            Your health <br /> Simplified with Ai
          </h1>
          <h6 className="mb-2 max-w-xl text-[10px] font-bold sm:mb-3 sm:text-xs md:text-sm lg:text-base">
            Find the Right plan, doctor, or answer — Instantly.
          </h6>
          <button
            onClick={(e) => {
              e.stopPropagation()
              navigate('/ai')
            }}
            style={{ width: '122px', height: '40px' }}
            className="flex items-center justify-center space-x-2 rounded-full border border-[#306FB641] text-xs font-semibold shadow-md backdrop-blur transition-all duration-300 hover:shadow-lg"
          >
            <img src={ai} alt="ai" className="w-4" />
            <span>Talk to Ai</span>
          </button>
        </div>
      </div>
    </div>
  )
}

export default VideoHero
