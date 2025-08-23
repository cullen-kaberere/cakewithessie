"use client"

import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import CakesGallery from "@/components/cakes-gallery"

export default function CakesPage() {
  return (
    <>
      <Navbar />
      <main style={{ paddingTop: "80px" }}>
        {/* Hero Section */}
        <section className="cakes-hero">
          <div className="container">
            <div className="hero-content">
              <h1>Our Beautiful Cakes</h1>
              <p>Discover our collection of exquisite custom cakes for every special occasion</p>
              <div className="hero-scroll-indicator">
                <span>Scroll to explore</span>
                <div className="scroll-arrow"></div>
              </div>
            </div>
          </div>
          <div className="hero-overlay"></div>
        </section>

        {/* Gallery Section */}
        <section className="cakes-gallery-section">
          <div className="container">
            <div className="gallery-header">
              <h2>Sweet Creations</h2>
              <p>Each cake is crafted with love and attention to detail</p>
              
              {/* Filter Tabs */}
              {/* <div className="category-filters">
                <button className="filter-btn active">All Cakes</button>
                <button className="filter-btn">Wedding</button>
                <button className="filter-btn">Birthday</button>
                <button className="filter-btn">Anniversary</button>
                <button className="filter-btn">Special Events</button>
              </div> */}
            </div>
            
            <CakesGallery />
          </div>
        </section>

        {/* CTA Section */}
        <section className="cakes-cta">
          <div className="container">
            <div className="cta-content">
              <h2>Ready to Order Your Dream Cake?</h2>
              <p>Contact us to discuss your custom cake design and make your celebration unforgettable</p>
              <div className="cta-buttons">
                <button className="btn btn-primary">Get a Quote</button>
                <button className="btn btn-secondary">View Gallery</button>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />

      <style jsx>{`
        /* Hero Section */
        .cakes-hero {
          position: relative;
          height: 40vh;
          min-height: 360px;
          display: flex;
          align-items: center;
          justify-content: center;
          background: linear-gradient(135deg, rgba(255, 105, 180, 0.1) 0%, rgba(255, 192, 203, 0.2) 100%),
                      url('/cake-hero-bg.jpg') center/cover no-repeat;
          overflow: hidden;
        }

        .hero-overlay {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: linear-gradient(45deg, 
                     rgba(255, 255, 255, 0.9) 0%, 
                     rgba(255, 228, 225, 0.7) 50%,
                     rgba(255, 192, 203, 0.5) 100%);
          z-index: 1;
        }

        .hero-content {
          position: relative;
          z-index: 2;
          text-align: center;
          max-width: 800px;
          margin: 0 auto;
        }

        .hero-content h1 {
          font-size: 3.5rem;
          color: var(--primary-pink);
          margin-bottom: 1.5rem;
          font-family: var(--font-serif);
          text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.1);
        }

        .hero-content p {
          font-size: 1.3rem;
          color: var(--dark-gray);
          margin-bottom: 3rem;
          line-height: 1.6;
        }

        .hero-scroll-indicator {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 0.5rem;
          color: var(--primary-pink);
          font-weight: 500;
        }

        .scroll-arrow {
          width: 2px;
          height: 30px;
          background: var(--primary-pink);
          position: relative;
          animation: bounce 2s infinite;
        }

        .scroll-arrow::after {
          content: '';
          position: absolute;
          bottom: -8px;
          left: -4px;
          width: 10px;
          height: 10px;
          border-right: 2px solid var(--primary-pink);
          border-bottom: 2px solid var(--primary-pink);
          transform: rotate(45deg);
        }

        @keyframes bounce {
          0%, 20%, 50%, 80%, 100% {
            transform: translateY(0);
          }
          40% {
            transform: translateY(-10px);
          }
          60% {
            transform: translateY(-5px);
          }
        }

        /* Gallery Section */
        .cakes-gallery-section {
          padding: 6rem 0;
          background: var(--light-gray);
        }

        .gallery-header {
          text-align: center;
          margin-bottom: 4rem;
        }

        .gallery-header h2 {
          color: var(--primary-pink);
          font-size: 2.8rem;
          margin-bottom: 1rem;
          font-family: var(--font-serif);
        }

        .gallery-header p {
          color: var(--dark-gray);
          font-size: 1.2rem;
          margin-bottom: 3rem;
          max-width: 600px;
          margin-left: auto;
          margin-right: auto;
        }

        .category-filters {
          display: flex;
          justify-content: center;
          gap: 1rem;
          flex-wrap: wrap;
          margin-top: 2rem;
        }

        .filter-btn {
          padding: 0.8rem 1.5rem;
          border: 2px solid var(--primary-pink);
          background: transparent;
          color: var(--primary-pink);
          border-radius: 50px;
          cursor: pointer;
          font-weight: 600;
          transition: all 0.3s ease;
        }

        .filter-btn:hover,
        .filter-btn.active {
          background: var(--primary-pink);
          color: white;
          transform: translateY(-2px);
          box-shadow: 0 4px 15px rgba(255, 105, 180, 0.3);
        }

        /* CTA Section */
        .cakes-cta {
          padding: 6rem 0;
          background: linear-gradient(135deg, var(--soft-pink) 0%, var(--light-gray) 100%);
          text-align: center;
        }

        .cta-content {
          max-width: 600px;
          margin: 0 auto;
        }

        .cta-content h2 {
          color: var(--primary-pink);
          font-size: 2.5rem;
          margin-bottom: 1.5rem;
          font-family: var(--font-serif);
        }

        .cta-content p {
          color: var(--dark-gray);
          font-size: 1.2rem;
          margin-bottom: 3rem;
          line-height: 1.6;
        }

        .cta-buttons {
          display: flex;
          gap: 1.5rem;
          justify-content: center;
          flex-wrap: wrap;
        }

        .btn {
          padding: 1rem 2rem;
          border: none;
          border-radius: 50px;
          font-weight: 600;
          font-size: 1.1rem;
          cursor: pointer;
          transition: all 0.3s ease;
          text-decoration: none;
          display: inline-block;
        }

        .btn-primary {
          background: var(--primary-pink);
          color: white;
          box-shadow: 0 4px 15px rgba(255, 105, 180, 0.3);
        }

        .btn-primary:hover {
          background: #ff1493;
          transform: translateY(-3px);
          box-shadow: 0 8px 25px rgba(255, 105, 180, 0.4);
        }

        .btn-secondary {
          background: transparent;
          color: var(--primary-pink);
          border: 2px solid var(--primary-pink);
        }

        .btn-secondary:hover {
          background: var(--primary-pink);
          color: white;
          transform: translateY(-3px);
        }

        /* Responsive Design */
        @media (max-width: 1024px) {
          .hero-content h1 {
            font-size: 3rem;
          }
          
          .gallery-header h2 {
            font-size: 2.5rem;
          }
        }

        @media (max-width: 768px) {
          .cakes-hero {
            height: 50vh;
            min-height: 400px;
          }
          
          .hero-content h1 {
            font-size: 2.5rem;
          }
          
          .hero-content p {
            font-size: 1.1rem;
          }
          
          .gallery-header h2 {
            font-size: 2.2rem;
          }
          
          .category-filters {
            gap: 0.5rem;
          }
          
          .filter-btn {
            padding: 0.6rem 1.2rem;
            font-size: 0.9rem;
          }
          
          .cta-buttons {
            flex-direction: column;
            align-items: center;
          }
          
          .btn {
            width: 200px;
          }
        }

        @media (max-width: 480px) {
          .hero-content h1 {
            font-size: 2rem;
          }
          
          .hero-content p {
            font-size: 1rem;
          }
          
          .gallery-header h2 {
            font-size: 1.8rem;
          }
          
          .gallery-header p {
            font-size: 1rem;
          }
          
          .cta-content h2 {
            font-size: 2rem;
          }
          
          .cta-content p {
            font-size: 1rem;
          }
        }

        /* Dark mode support */
        .dark .cakes-hero {
          background: linear-gradient(135deg, rgba(255, 105, 180, 0.1) 0%, rgba(255, 192, 203, 0.2) 100%),
                      url('/cake-hero-bg-dark.jpg') center/cover no-repeat;
        }

        .dark .hero-overlay {
          background: linear-gradient(45deg, 
                     rgba(26, 26, 26, 0.9) 0%, 
                     rgba(40, 20, 35, 0.7) 50%,
                     rgba(255, 105, 180, 0.3) 100%);
        }

        .dark .cakes-gallery-section {
          background: var(--muted);
        }

        .dark .cakes-cta {
          background: linear-gradient(135deg, var(--muted) 0%, var(--card) 100%);
        }
      `}</style>
    </>
  )
}