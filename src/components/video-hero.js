"use client"

import { useEffect, useRef } from "react"

export default function VideoHero() {
  const videoRef = useRef(null)

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.play()
    }
  }, [])

  return (
    <div className="absolute inset-0 w-full h-full overflow-hidden">
      <video ref={videoRef} className="absolute inset-0 w-full h-full object-cover" autoPlay muted loop playsInline>
        <source src="/hero-section-video/2022395-hd_1920_1080_30fps.mp4" type="video/mp4" />
      </video>
      <div className="absolute inset-0 bg-black/50" />
    </div>
  )
}

