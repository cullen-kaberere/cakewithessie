"use client"

import { useState, useEffect } from "react"

const completedProjects = [
  {
    id: 1,
    title: "Sarah & Mike's Wedding",
    image: "/completion-wedding-1.png",
    description: "Three-tier elegant wedding cake with sugar roses",
    date: "December 2024",
  },
  {
    id: 2,
    title: "Emma's 5th Birthday",
    image: "/completion-birthday-1.png",
    description: "Princess castle cake with edible decorations",
    date: "November 2024",
  },
  {
    id: 3,
    title: "Tech Corp Annual Event",
    image: "/completion-corporate-1.png",
    description: "Corporate branded cake for 200+ employees",
    date: "October 2024",
  },
  {
    id: 4,
    title: "James' Graduation",
    image: "/completion-graduation-1.png",
    description: "Custom graduation cap design with school colors",
    date: "September 2024",
  },
  {
    id: 5,
    title: "Golden Anniversary",
    image: "/completion-anniversary-1.png",
    description: "50th anniversary celebration cake",
    date: "August 2024",
  },
]

export default function CompletionShowcase() {
  const [currentSlide, setCurrentSlide] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % completedProjects.length)
    }, 4000)

    return () => clearInterval(timer)
  }, [])

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % completedProjects.length)
  }

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + completedProjects.length) % completedProjects.length)
  }

  return (
    <section className="section" style={{ backgroundColor: "var(--soft-pink)" }}>
      <div className="container">
        <div style={{ textAlign: "center", marginBottom: "3rem" }}>
          <h2 style={{ color: "var(--primary-pink)" }}>Recent Completions</h2>
          <p style={{ fontSize: "1.1rem", color: "var(--dark-gray)" }}>
            Celebrating our recent cake creations and happy customers
          </p>
        </div>

        <div className="completion-showcase">
          <button className="showcase-nav prev" onClick={prevSlide}>
            ❮
          </button>

          <div className="showcase-container">
            <div className="showcase-slider">
              {completedProjects.map((project, index) => (
                <div
                  key={project.id}
                  className={`showcase-slide ${index === currentSlide ? "active" : ""}`}
                  style={{
                    transform: `translateX(${(index - currentSlide) * 100}%)`,
                  }}
                >
                  <div className="showcase-image">
                    <img src={project.image || "/placeholder.svg"} alt={project.title} />
                  </div>
                  <div className="showcase-content">
                    <h3>{project.title}</h3>
                    <p className="showcase-description">{project.description}</p>
                    <p className="showcase-date">{project.date}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <button className="showcase-nav next" onClick={nextSlide}>
            ❯
          </button>
        </div>

        <div className="showcase-indicators">
          {completedProjects.map((_, index) => (
            <button
              key={index}
              className={`indicator ${index === currentSlide ? "active" : ""}`}
              onClick={() => setCurrentSlide(index)}
            />
          ))}
        </div>
      </div>

      <style jsx>{`
        .completion-showcase {
          display: flex;
          align-items: center;
          gap: 2rem;
          margin-bottom: 2rem;
        }

        .showcase-container {
          flex: 1;
          overflow: hidden;
          border-radius: var(--border-radius);
          max-width: 800px;
          margin: 0 auto;
        }

        .showcase-slider {
          display: flex;
          transition: transform 0.5s ease;
        }

        .showcase-slide {
          flex: 0 0 100%;
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 2rem;
          background: white;
          border-radius: var(--border-radius);
          overflow: hidden;
          box-shadow: 0 8px 25px rgba(0, 0, 0, 0.1);
          transition: var(--transition);
        }

        .showcase-image {
          height: 300px;
          overflow: hidden;
        }

        .showcase-image img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        .showcase-content {
          padding: 2rem;
          display: flex;
          flex-direction: column;
          justify-content: center;
        }

        .showcase-content h3 {
          color: var(--primary-pink);
          margin-bottom: 1rem;
          font-size: 1.5rem;
        }

        .showcase-description {
          color: var(--dark-gray);
          margin-bottom: 1rem;
          line-height: 1.6;
        }

        .showcase-date {
          color: var(--primary-pink);
          font-weight: 500;
          font-size: 0.9rem;
          margin: 0;
        }

        .showcase-nav {
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

        .showcase-nav:hover {
          background: #ff1493;
          transform: scale(1.1);
        }

        .showcase-indicators {
          display: flex;
          justify-content: center;
          gap: 0.5rem;
        }

        .indicator {
          width: 12px;
          height: 12px;
          border-radius: 50%;
          border: none;
          background: rgba(255, 105, 180, 0.3);
          cursor: pointer;
          transition: var(--transition);
        }

        .indicator.active {
          background: var(--primary-pink);
          transform: scale(1.2);
        }

        @media (max-width: 768px) {
          .completion-showcase {
            gap: 1rem;
          }
          
          .showcase-slide {
            grid-template-columns: 1fr;
            gap: 0;
          }
          
          .showcase-image {
            height: 250px;
          }
          
          .showcase-content {
            padding: 1.5rem;
          }
          
          .showcase-nav {
            width: 40px;
            height: 40px;
            font-size: 1.2rem;
          }
        }
      `}</style>
    </section>
  )
}
