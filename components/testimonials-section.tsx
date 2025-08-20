"use client"

import { useState, useEffect } from "react"

const testimonials = [
  {
    id: 1,
    name: "Sarah Johnson",
    text: "Essie created the most beautiful wedding cake for us! Every detail was perfect and it tasted amazing.",
    rating: 5,
    event: "Wedding",
  },
  {
    id: 2,
    name: "Mike Chen",
    text: "The birthday cake for my daughter was incredible. She couldn't stop smiling when she saw it!",
    rating: 5,
    event: "Birthday",
  },
  {
    id: 3,
    name: "Lisa Rodriguez",
    text: "Professional service and delicious cakes. Essie made our corporate event extra special.",
    rating: 5,
    event: "Corporate Event",
  },
  {
    id: 4,
    name: "David Thompson",
    text: "Amazing graduation cake! The design was exactly what we wanted and more.",
    rating: 5,
    event: "Graduation",
  },
  {
    id: 5,
    name: "Emma Wilson",
    text: "Essie's attention to detail is unmatched. Our anniversary cake was a work of art!",
    rating: 5,
    event: "Anniversary",
  },
  {
    id: 6,
    name: "James Brown",
    text: "Best custom cake we've ever had. Essie brought our vision to life perfectly.",
    rating: 5,
    event: "Custom Order",
  },
  {
    id: 7,
    name: "Maria Garcia",
    text: "The cupcakes were a hit at our party! Beautiful presentation and delicious flavors.",
    rating: 5,
    event: "Party",
  },
  {
    id: 8,
    name: "Robert Lee",
    text: "Exceptional quality and service. Essie exceeded all our expectations!",
    rating: 5,
    event: "Special Event",
  },
  {
    id: 9,
    name: "Jennifer Davis",
    text: "Gorgeous cake and wonderful experience. Will definitely order again!",
    rating: 5,
    event: "Celebration",
  },
]

export default function TestimonialsSection() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [visibleCount, setVisibleCount] = useState(3)

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setVisibleCount(1)
      } else if (window.innerWidth < 1024) {
        setVisibleCount(2)
      } else {
        setVisibleCount(3)
      }
    }

    handleResize()
    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % (testimonials.length - visibleCount + 1))
    }, 4000)

    return () => clearInterval(timer)
  }, [visibleCount])

  const nextTestimonial = () => {
    setCurrentIndex((prev) => (prev + 1) % (testimonials.length - visibleCount + 1))
  }

  const prevTestimonial = () => {
    setCurrentIndex(
      (prev) => (prev - 1 + testimonials.length - visibleCount + 1) % (testimonials.length - visibleCount + 1),
    )
  }

  const renderStars = (rating: number) => {
    return "★".repeat(rating) + "☆".repeat(5 - rating)
  }

  return (
    <section className="section">
      <div className="container">
        <div style={{ textAlign: "center", marginBottom: "3rem" }}>
          <h2 style={{ color: "var(--primary-pink)" }}>What Clients Say</h2>
          <p style={{ fontSize: "1.2rem", color: "var(--dark-gray)", maxWidth: "600px", margin: "0 auto" }}>
            Don't just take our word for it - hear from our happy customers
          </p>
        </div>

        <div className="testimonials-container">
          <button className="testimonial-nav prev" onClick={prevTestimonial}>
            ❮
          </button>

          <div className="testimonials-slider">
            <div
              className="testimonials-track"
              style={{
                transform: `translateX(-${currentIndex * (100 / visibleCount)}%)`,
                width: `${(testimonials.length / visibleCount) * 100}%`,
              }}
            >
              {testimonials.map((testimonial) => (
                <div key={testimonial.id} className="testimonial-card">
                  <div className="testimonial-content">
                    <div
                      className="stars"
                      style={{ color: "var(--primary-pink)", fontSize: "1.2rem", marginBottom: "1rem" }}
                    >
                      {renderStars(testimonial.rating)}
                    </div>
                    <p style={{ fontStyle: "italic", marginBottom: "1rem", color: "var(--dark-gray)" }}>
                      "{testimonial.text}"
                    </p>
                    <div className="testimonial-author">
                      <strong style={{ color: "var(--primary-pink)" }}>{testimonial.name}</strong>
                      <span style={{ color: "var(--dark-gray)", fontSize: "0.9rem" }}> - {testimonial.event}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <button className="testimonial-nav next" onClick={nextTestimonial}>
            ❯
          </button>
        </div>

        <div className="testimonial-dots">
          {Array.from({ length: testimonials.length - visibleCount + 1 }).map((_, index) => (
            <button
              key={index}
              className={`dot ${index === currentIndex ? "active" : ""}`}
              onClick={() => setCurrentIndex(index)}
            />
          ))}
        </div>
      </div>

      <style jsx>{`
        .testimonials-container {
          position: relative;
          display: flex;
          align-items: center;
          gap: 2rem;
        }

        .testimonials-slider {
          flex: 1;
          overflow: hidden;
          border-radius: var(--border-radius);
        }

        .testimonials-track {
          display: flex;
          transition: transform 0.5s ease;
        }

        .testimonial-card {
          flex: 0 0 ${100 / visibleCount}%;
          padding: 0 1rem;
        }

        .testimonial-content {
          background: white;
          padding: 2rem;
          border-radius: var(--border-radius);
          box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
          height: 200px;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
        }

        .testimonial-nav {
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

        .testimonial-nav:hover {
          background: #ff1493;
          transform: scale(1.1);
        }

        .testimonial-dots {
          display: flex;
          justify-content: center;
          gap: 0.5rem;
          margin-top: 2rem;
        }

        .dot {
          width: 10px;
          height: 10px;
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
          .testimonials-container {
            gap: 1rem;
          }
          
          .testimonial-nav {
            width: 40px;
            height: 40px;
            font-size: 1.2rem;
          }
          
          .testimonial-content {
            padding: 1.5rem;
            height: auto;
            min-height: 180px;
          }
        }
      `}</style>
    </section>
  )
}
