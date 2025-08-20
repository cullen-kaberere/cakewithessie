"use client"

import { useState } from "react"

const videos = [
  {
    id: 1,
    title: "Wedding Cake Creation Process",
    thumbnail: "/video-thumb-1.png",
    description: "Watch how we create stunning wedding cakes from start to finish",
  },
  {
    id: 2,
    title: "Cupcake Decorating Techniques",
    thumbnail: "/video-thumb-2.png",
    description: "Learn our professional cupcake decorating secrets",
  },
  {
    id: 3,
    title: "Custom Cake Design Process",
    thumbnail: "/video-thumb-3.png",
    description: "Behind the scenes of creating custom cake designs",
  },
  {
    id: 4,
    title: "Birthday Cake Surprise Reveal",
    thumbnail: "/video-thumb-4.png",
    description: "Capturing the joy of birthday cake reveals",
  },
]

export default function VideoSection() {
  const [currentVideo, setCurrentVideo] = useState(0)

  const nextVideo = () => {
    setCurrentVideo((prev) => (prev + 1) % videos.length)
  }

  const prevVideo = () => {
    setCurrentVideo((prev) => (prev - 1 + videos.length) % videos.length)
  }

  return (
    <section className="section">
      <div className="container">
        <div style={{ textAlign: "center", marginBottom: "3rem" }}>
          <h2 style={{ color: "var(--primary-pink)" }}>Behind the Scenes</h2>
          <p style={{ fontSize: "1.1rem", color: "var(--dark-gray)" }}>
            Watch our cake creation process and see the magic happen
          </p>
        </div>

        <div className="video-carousel">
          <button className="video-nav prev" onClick={prevVideo}>
            ❮
          </button>

          <div className="video-container">
            <div className="video-placeholder">
              <img src={videos[currentVideo].thumbnail || "/placeholder.svg"} alt={videos[currentVideo].title} />
              <div className="play-button">▶</div>
            </div>
            <div className="video-info">
              <h3>{videos[currentVideo].title}</h3>
              <p>{videos[currentVideo].description}</p>
            </div>
          </div>

          <button className="video-nav next" onClick={nextVideo}>
            ❯
          </button>
        </div>

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
        .video-carousel {
          display: flex;
          align-items: center;
          gap: 2rem;
          margin-bottom: 2rem;
        }

        .video-container {
          flex: 1;
          max-width: 600px;
          margin: 0 auto;
        }

        .video-placeholder {
          position: relative;
          width: 100%;
          height: 350px;
          border-radius: var(--border-radius);
          overflow: hidden;
          cursor: pointer;
          transition: var(--transition);
        }

        .video-placeholder:hover {
          transform: scale(1.02);
        }

        .video-placeholder img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        .play-button {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          width: 80px;
          height: 80px;
          background: rgba(255, 105, 180, 0.9);
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          color: white;
          font-size: 2rem;
          transition: var(--transition);
        }

        .video-placeholder:hover .play-button {
          background: var(--primary-pink);
          transform: translate(-50%, -50%) scale(1.1);
        }

        .video-info {
          text-align: center;
          padding: 1.5rem 0;
        }

        .video-info h3 {
          color: var(--primary-pink);
          margin-bottom: 0.5rem;
        }

        .video-info p {
          color: var(--dark-gray);
          margin: 0;
        }

        .video-nav {
          background: var(--primary-pink);
          color: white;
          border: none;
          width: 50px;
          height: 50px;
          border-radius: 50%;
          font-size: 1.5rem;
          cursor: pointer;
          transition: var(--transition);
          flex-shrink: 0;
        }

        .video-nav:hover {
          background: #ff1493;
          transform: scale(1.1);
        }

        .video-dots {
          display: flex;
          justify-content: center;
          gap: 0.5rem;
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

        @media (max-width: 768px) {
          .video-carousel {
            gap: 1rem;
          }
          
          .video-nav {
            width: 40px;
            height: 40px;
            font-size: 1.2rem;
          }
          
          .video-placeholder {
            height: 250px;
          }
          
          .play-button {
            width: 60px;
            height: 60px;
            font-size: 1.5rem;
          }
        }
      `}</style>
    </section>
  )
}
