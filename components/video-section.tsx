"use client"

import { useState } from "react"

const videos = [
  {
    id: 1,
    title: "Wedding Cake Creation Process",
    src: "/reel1.mp4", // vertical (reel format) video
    description: "Watch how we create stunning wedding cakes from start to finish",
  },
  {
    id: 2,
    title: "Cupcake Decorating Techniques",
    src: "/reel2.mp4",
    description: "Learn our professional cupcake decorating secrets",
  },
  {
    id: 3,
    title: "Custom Cake Design Process",
    src: "/videos/video3.mp4",
    description: "Behind the scenes of creating custom cake designs",
  },
  {
    id: 4,
    title: "Birthday Cake Surprise Reveal",
    src: "/videos/video4.mp4",
    description: "Capturing the joy of birthday cake reveals",
  },
]

export default function VideoSection() {
  const [currentVideo, setCurrentVideo] = useState(0)

  // When one video ends, play the next
  const handleVideoEnd = () => {
    setCurrentVideo((prev) => (prev + 1) % videos.length)
  }

  return (
    <section className="section">
      <div className="container">
        {/* Heading */}
        <div style={{ textAlign: "center", marginBottom: "2rem" }}>
          <h2 style={{ color: "var(--primary-pink)" }}>Behind the Scenes</h2>
          <p style={{ fontSize: "1.1rem", color: "var(--dark-gray)" }}>
            Watch our cake creation process and see the magic happen
          </p>
        </div>

        {/* Reel-style video player */}
        <div className="reel-video-container">
          <video
            key={videos[currentVideo].id} // re-mount video on change
            src={videos[currentVideo].src}
            autoPlay
            muted
            controls
            playsInline
            onEnded={handleVideoEnd}
          />
          <div className="video-info">
            <h3>{videos[currentVideo].title}</h3>
            <p>{videos[currentVideo].description}</p>
          </div>
        </div>

        {/* Navigation dots */}
        <div className="video-dots">
          {videos.map((_, index) => (
            <button
              key={index}
              className={`dot ${index === currentVideo ? "active" : ""}`}
              onClick={() => setCurrentVideo(index)}
            />
          ))}
        </div>
      </div>

      <style jsx>{`
        .reel-video-container {
          position: relative;
          width: 100%;
          max-width: 400px; /* reel width */
          margin: 0 auto;
          aspect-ratio: 9 / 12; /* keep vertical format */
          border-radius: var(--border-radius);
          overflow: hidden;
          background: black;
        }

        video {
          width: 100%;
          height: 100%;
          object-fit: cover; /* fill without distortion */
        }

        .video-info {
          text-align: center;
          padding: 1rem 0;
        }

        .video-info h3 {
          color: var(--primary-pink);
          margin-bottom: 0.5rem;
        }

        .video-info p {
          color: var(--dark-gray);
          margin: 0;
        }

        .video-dots {
          display: flex;
          justify-content: center;
          gap: 0.5rem;
          margin-top: 1rem;
        }

        .dot {
          width: 12px;
          height: 12px;
          border-radius: 50%;
          border: none;
          background: rgba(255, 105, 180, 0.3);
          cursor: pointer;
          transition: var(--transition);
        }

        .dot.active {
          background: var(--primary-pink);
          transform: scale(1.2);
        }
      `}</style>
    </section>
  )
}
