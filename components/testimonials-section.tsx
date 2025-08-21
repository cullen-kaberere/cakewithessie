"use client"

import { useState, useEffect } from "react"

const testimonials = [
  {
    id: 1,
    name: "Sarah Johnson",
    text: "Essie created the most beautiful wedding cake for us! Every detail was perfect and it tasted amazing.",
    rating: 5,
    event: "Wedding",
    image: "/testimonial-1.jpg", // Add these images to your public folder
  },
  {
    id: 2,
    name: "Mike Chen",
    text: "The birthday cake for my daughter was incredible. She couldn't stop smiling when she saw it!",
    rating: 5,
    event: "Birthday",
    image: "/testimonial-2.jpg",
  },
  {
    id: 3,
    name: "Lisa Rodriguez",
    text: "Professional service and delicious cakes. Essie made our corporate event extra special.",
    rating: 5,
    event: "Corporate Event",
    image: "/testimonial-3.jpg",
  },
  {
    id: 4,
    name: "David Thompson",
    text: "Amazing graduation cake! The design was exactly what we wanted and more.",
    rating: 5,
    event: "Graduation",
    image: "/testimonial-4.jpg",
  },
  {
    id: 5,
    name: "Emma Wilson",
    text: "Essie's attention to detail is unmatched. Our anniversary cake was a work of art!",
    rating: 5,
    event: "Anniversary",
    image: "/testimonial-5.jpg",
  },
  {
    id: 6,
    name: "James Brown",
    text: "Best custom cake we've ever had. Essie brought our vision to life perfectly.",
    rating: 5,
    event: "Custom Order",
    image: "/testimonial-6.jpg",
  },
]

export default function TestimonialsSection() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [visibleCount, setVisibleCount] = useState(3)
  const [isAutoPlaying, setIsAutoPlaying] = useState(true)

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
    if (!isAutoPlaying) return
    
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % (testimonials.length - visibleCount + 1))
    }, 5000)

    return () => clearInterval(timer)
  }, [visibleCount, isAutoPlaying])

  const nextTestimonial = () => {
    setCurrentIndex((prev) => (prev + 1) % (testimonials.length - visibleCount + 1))
    setIsAutoPlaying(false)
  }

  const prevTestimonial = () => {
    setCurrentIndex(
      (prev) => (prev - 1 + testimonials.length - visibleCount + 1) % (testimonials.length - visibleCount + 1),
    )
    setIsAutoPlaying(false)
  }

  const renderStars = (rating: number) => {
    return (
      <div className="stars">
        {[...Array(5)].map((_, i) => (
          <svg
            key={i}
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill={i < rating ? "currentColor" : "none"}
            stroke="currentColor"
          >
            <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
          </svg>
        ))}
      </div>
    )
  }

  return (
    <section className="testimonials-section" style={{ 
      background: "linear-gradient(135deg, var(--soft-pink) 0%, var(--light-gray) 100%)",
      position: "relative",
      overflow: "hidden",
      padding: "6rem 0"
    }}>
      {/* Decorative elements */}
      <div className="decorative-cake decorative-cake-1">🎂</div>
      <div className="decorative-cake decorative-cake-2">🧁</div>
      <div className="decorative-cake decorative-cake-3">🍰</div>
      
      <div className="container">
        <div className="section-header">
          <h2>Sweet Words From Happy Clients</h2>
          <p>Don't just take our word for it - hear from our delighted customers</p>
        </div>

        <div className="testimonials-container">
          <button className="testimonial-nav prev" onClick={prevTestimonial} aria-label="Previous testimonials">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M15 18L9 12L15 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>

          <div 
            className="testimonials-slider"
            onMouseEnter={() => setIsAutoPlaying(false)}
            onMouseLeave={() => setIsAutoPlaying(true)}
          >
            <div
              className="testimonials-track"
              style={{
                transform: `translateX(-${currentIndex * (100 / visibleCount)}%)`,
              }}
            >
              {testimonials.map((testimonial) => (
                <div key={testimonial.id} className="testimonial-card">
                  <div className="testimonial-content">
                    <div className="quote-icon">"</div>
                    {/* {renderStars(testimonial.rating)} */}
                    <p className="testimonial-text">"{testimonial.text}"</p>
                    <div className="testimonial-author">
                      {/* <div className="author-image">
                        <img src={testimonial.image || "/placeholder-avatar.jpg"} alt={testimonial.name} />
                      </div> */}
                      <div className="author-info">
                        <strong>{testimonial.name}</strong>
                        <span>{testimonial.event}</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <button className="testimonial-nav next" onClick={nextTestimonial} aria-label="Next testimonials">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M9 18L15 12L9 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
        </div>

        <div className="testimonial-dots">
          {Array.from({ length: testimonials.length - visibleCount + 1 }).map((_, index) => (
            <button
              key={index}
              className={`dot ${index === currentIndex ? "active" : ""}`}
              onClick={() => {
                setCurrentIndex(index)
                setIsAutoPlaying(false)
              }}
              aria-label={`Go to testimonial ${index + 1}`}
            />
          ))}
        </div>
      </div>

      <style jsx>{`
        .testimonials-section {
          position: relative;
        }

        .decorative-cake {
          position: absolute;
          font-size: 2rem;
          opacity: 0.1;
          z-index: 0;
        }

        .decorative-cake-1 {
          top: 20%;
          left: 5%;
          animation: float 6s ease-in-out infinite;
        }

        .decorative-cake-2 {
          top: 60%;
          right: 5%;
          animation: float 8s ease-in-out infinite 1s;
        }

        .decorative-cake-3 {
          bottom: 20%;
          left: 15%;
          animation: float 7s ease-in-out infinite 0.5s;
        }

        .section-header {
          text-align: center;
          margin-bottom: 4rem;
          position: relative;
          z-index: 1;
        }

        .section-header h2 {
          color: var(--primary-pink);
          font-size: 2.8rem;
          margin-bottom: 1rem;
          font-family: var(--font-serif);
        }

        .section-header p {
          font-size: 1.2rem;
          color: var(--dark-gray);
          max-width: 600px;
          margin: 0 auto;
        }

        .testimonials-container {
          position: relative;
          display: flex;
          align-items: center;
          gap: 2rem;
          margin: 0 auto;
          max-width: 1200px;
          z-index: 1;
        }

        .testimonials-slider {
          flex: 1;
          overflow: hidden;
          border-radius: 20px;
        }

        .testimonials-track {
          display: flex;
          transition: transform 0.6s cubic-bezier(0.4, 0, 0.2, 1);
          will-change: transform;
        }

        .testimonial-card {
          flex: 0 0 ${100 / visibleCount}%;
          padding: 0 1rem;
          min-height: 300px;
        }

        .testimonial-content {
          background: rgba(255, 255, 255, 0.95);
          backdrop-filter: blur(10px);
          padding: 2.5rem;
          border-radius: 20px;
          height: 100%;
          display: flex;
          flex-direction: column;
          position: relative;
          box-shadow: 
            0 10px 40px rgba(255, 105, 180, 0.15),
            0 0 0 1px rgba(255, 255, 255, 0.1);
          transition: all 0.3s ease;
        }

        .testimonial-content:hover {
          transform: translateY(-5px);
          box-shadow: 
            0 20px 50px rgba(255, 105, 180, 0.2),
            0 0 0 1px rgba(255, 255, 255, 0.2);
        }

        .quote-icon {
          position: absolute;
          top: 1.5rem;
          right: 2rem;
          font-size: 4rem;
          color: var(--primary-pink);
          opacity: 0.2;
          font-family: serif;
          line-height: 1;
        }

        .stars {
          color: var(--primary-pink);
          margin-bottom: 1.5rem;
          display: flex;
          gap: 0.2rem;
        }

        .testimonial-text {
          font-style: italic;
          margin-bottom: 2rem;
          color: var(--dark-gray);
          line-height: 1.7;
          font-size: 1.1rem;
          flex-grow: 1;
        }

        .testimonial-author {
          display: flex;
          align-items: center;
          gap: 1rem;
        }

        .author-image {
          width: 50px;
          height: 50px;
          border-radius: 50%;
          overflow: hidden;
          border: 3px solid var(--primary-pink);
        }

        .author-image img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        .author-info {
          display: flex;
          flex-direction: column;
        }

        .author-info strong {
          color: var(--primary-pink);
          font-weight: 600;
        }

        .author-info span {
          color: var(--muted-foreground);
          font-size: 0.9rem;
        }

        .testimonial-nav {
          background: var(--primary-pink);
          color: white;
          border: none;
          width: 60px;
          height: 60px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: all 0.3s ease;
          flex-shrink: 0;
          box-shadow: 0 4px 15px rgba(255, 105, 180, 0.3);
        }

        .testimonial-nav:hover {
          background: #ff1493;
          transform: scale(1.1);
          box-shadow: 0 6px 20px rgba(255, 105, 180, 0.4);
        }

        .testimonial-dots {
          display: flex;
          justify-content: center;
          gap: 0.8rem;
          margin-top: 3rem;
          z-index: 1;
          position: relative;
        }

        .dot {
          width: 12px;
          height: 12px;
          border-radius: 50%;
          border: none;
          background: rgba(255, 105, 180, 0.3);
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .dot.active {
          background: var(--primary-pink);
          transform: scale(1.3);
        }

        .dot:hover {
          background: var(--primary-pink);
          transform: scale(1.2);
        }

        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(5deg); }
        }

        /* Responsive Design */
        @media (max-width: 1024px) {
          .testimonial-card {
            min-height: 350px;
          }
          
          .testimonial-content {
            padding: 2rem;
          }
        }

        @media (max-width: 768px) {
          .section-header h2 {
            font-size: 2.2rem;
          }

          .testimonials-container {
            gap: 1rem;
          }
          
          .testimonial-nav {
            width: 50px;
            height: 50px;
          }
          
          .testimonial-card {
            min-height: 320px;
            padding: 0 0.5rem;
          }
          
          .testimonial-content {
            padding: 1.8rem;
          }
          
          .quote-icon {
            font-size: 3rem;
            top: 1rem;
            right: 1.5rem;
          }
          
          .testimonial-text {
            font-size: 1rem;
          }
        }

        @media (max-width: 480px) {
          .testimonials-section {
            padding: 4rem 0;
          }
          
          .section-header h2 {
            font-size: 1.8rem;
          }
          
          .section-header p {
            font-size: 1rem;
          }
          
          .testimonial-card {
            min-height: 300px;
          }
          
          .testimonial-content {
            padding: 1.5rem;
          }
          
          .author-image {
            width: 40px;
            height: 40px;
          }
        }
      `}</style>
    </section>
  )
}