"use client"

import { useState, useEffect } from "react"

const slides = [
  {
    id: 1,
    image: "/elegant-pink-rose-wedding-cake.png",
    title: "Beautiful Wedding Cakes",
    subtitle: "Make your special day unforgettable",
    cta: "View Wedding Cakes",
  },
  {
    id: 2,
    image: "/images/birthday-cake.png",
    title: "Custom Birthday Cakes",
    subtitle: "Celebrate every milestone with sweetness",
    cta: "Order Birthday Cake",
  },
  {
    id: 3,
    image: "/graduation-cake.png",
    title: "Graduation Celebrations",
    subtitle: "Honor achievements with delicious treats",
    cta: "Browse Graduation Cakes",
  },
]

export default function HeroSlider() {
  const [currentSlide, setCurrentSlide] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length)
    }, 5000)

    return () => clearInterval(timer)
  }, [])

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length)
  }

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length)
  }

  return (
    <section className="hero-slider">
      <div className="slider-container">
        {slides.map((slide, index) => (
          <div
            key={slide.id}
            className={`slide ${index === currentSlide ? "active" : ""}`}
            style={{
              backgroundImage: `linear-gradient(rgba(0,0,0,0.4), rgba(0,0,0,0.4)), url(${slide.image})`,
            }}
          >
            <div className="slide-content">
              <h1 className="slide-title">{slide.title}</h1>
              <p className="slide-subtitle">{slide.subtitle}</p>
              <button className="btn btn-primary slide-cta">{slide.cta}</button>
            </div>
          </div>
        ))}
      </div>

      <button className="slider-nav prev" onClick={prevSlide}>
        ❮
      </button>
      <button className="slider-nav next" onClick={nextSlide}>
        ❯
      </button>

      <div className="slider-dots">
        {slides.map((_, index) => (
          <button
            key={index}
            className={`dot ${index === currentSlide ? "active" : ""}`}
            onClick={() => setCurrentSlide(index)}
          />
        ))}
      </div>

      <style jsx>{`
        .hero-slider {
          position: relative;
          height: 100vh;
          overflow: hidden;
        }

        .slider-container {
          position: relative;
          width: 100%;
          height: 100%;
        }

        .slide {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background-size: cover;
          background-position: center;
          display: flex;
          align-items: center;
          justify-content: center;
          opacity: 0;
          transition: opacity 1s ease-in-out;
        }

        .slide.active {
          opacity: 1;
        }

        .slide-content {
          text-align: center;
          color: white;
          max-width: 600px;
          padding: 2rem;
        }

        .slide-title {
          font-size: 3.5rem;
          margin-bottom: 1rem;
          animation: slideUp 1s ease-out;
        }

        .slide-subtitle {
          font-size: 1.5rem;
          margin-bottom: 2rem;
          animation: slideUp 1s ease-out 0.2s both;
        }

        .slide-cta {
          animation: slideUp 1s ease-out 0.4s both;
        }

        .slider-nav {
          position: absolute;
          top: 50%;
          transform: translateY(-50%);
          background: rgba(255, 255, 255, 0.8);
          border: none;
          width: 50px;
          height: 50px;
          border-radius: 50%;
          font-size: 1.5rem;
          cursor: pointer;
          transition: var(--transition);
          z-index: 10;
        }

        .slider-nav:hover {
          background: white;
          transform: translateY(-50%) scale(1.1);
        }

        .prev {
          left: 2rem;
        }

        .next {
          right: 2rem;
        }

        .slider-dots {
          position: absolute;
          bottom: 2rem;
          left: 50%;
          transform: translateX(-50%);
          display: flex;
          gap: 1rem;
          z-index: 10;
        }

        .dot {
          width: 12px;
          height: 12px;
          border-radius: 50%;
          border: none;
          background: rgba(255, 255, 255, 0.5);
          cursor: pointer;
          transition: var(--transition);
        }

        .dot.active {
          background: white;
          transform: scale(1.2);
        }

        @media (max-width: 768px) {
          .slide-title {
            font-size: 2.5rem;
          }
          
          .slide-subtitle {
            font-size: 1.2rem;
          }
          
          .slider-nav {
            width: 40px;
            height: 40px;
            font-size: 1.2rem;
          }
          
          .prev {
            left: 1rem;
          }
          
          .next {
            right: 1rem;
          }
        }
      `}</style>
    </section>
  )
}
