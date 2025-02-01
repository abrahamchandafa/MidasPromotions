"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"

const Star = ({ size, top, left, duration }) => (
  <motion.div
    className="absolute rounded-full bg-white"
    style={{
      width: size,
      height: size,
      top: `${top}%`,
      left: `${left}%`,
    }}
    animate={{
      opacity: [0, 1, 0],
      scale: [0, 1, 0],
    }}
    transition={{
      duration: duration,
      repeat: Number.POSITIVE_INFINITY,
      ease: "easeInOut",
    }}
  />
)

export default function StarBackground() {
  const [stars, setStars] = useState([])

  useEffect(() => {
    const newStars = Array.from({ length: 100 }, (_, i) => ({
      id: i,
      size: Math.random() * 3 + 1,
      top: Math.random() * 100,
      left: Math.random() * 100,
      duration: Math.random() * 3 + 2,
    }))
    setStars(newStars)
  }, [])

  return (
    <div className="fixed inset-0 z-0 pointer-events-none">
      {stars.map((star) => (
        <Star key={star.id} {...star} />
      ))}
    </div>
  )
}

