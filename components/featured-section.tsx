"use client"

const featuredItems = [
  {
    id: 1,
    image: "/cake3.jpg",
    title: "Tier Cakes",
    description: "Elegant designs for your perfect day",
    category: "tier",
  },
  {
    id: 2,
    image: "/cake31.jpg",
    title: "Kids Birthday Cakes",
    description: "Fun and colorful designs kids love",
    category: "kids",
  },
  {
    id: 3,
    image: "/graduation-cake-diploma.png",
    title: "Graduation Cakes",
    description: "Celebrate achievements in style",
    category: "graduation",
  },
  {
    id: 4,
    image: "/cake9.jpg",
    title: "Custom Designs",
    description: "Unique cakes tailored to your vision",
    category: "custom",
  },
  {
    id: 5,
    image: "/cake1.jpg",
    title: "Anniversary Cakes",
    description: "Romantic designs for special milestones",
    category: "anniversary",
  },
  {
    id: 6,
    image: "/cake2.jpg",
    title: "Cupcakes & Treats",
    description: "Delicious mini desserts for every occasion",
    category: "treats",
  },
]

export default function FeaturedSection() {
  return (
    <section className="section" style={{ backgroundColor: "var(--light-gray)", padding: "5rem 0" }}>
      <div className="container">
        <div className="section-header">
          <h2>Featured Cakes & Events</h2>
          <p>Discover our most popular cake designs and event specialties</p>
        </div>

        <div className="featured-grid">
          {featuredItems.map((item) => (
            <div key={item.id} className="featured-card">
              <div className="featured-image">
                <img src={item.image || "/placeholder.svg"} alt={item.title} />
                <div className="featured-overlay">
                  <div className="overlay-content">
                    <button className="btn-view-more">
                      <span>Explore</span>
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </button>
                  </div>
                </div>
                <div className="category-badge">{item.category}</div>
              </div>
              <div className="featured-content">
                <h3>{item.title}</h3>
                <p>{item.description}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="section-cta">
          <button className="btn-primary">View All Categories</button>
        </div>
      </div>

      <style jsx>{`
        .section-header {
          text-align: center;
          margin-bottom: 3rem;
        }

        .section-header h2 {
          color: var(--primary-pink);
          font-size: 2.5rem;
          margin-bottom: 1rem;
          position: relative;
          display: inline-block;
        }

        .section-header h2::after {
          content: '';
          position: absolute;
          bottom: -10px;
          left: 50%;
          transform: translateX(-50%);
          width: 60px;
          height: 3px;
          background: var(--primary-pink);
          border-radius: 2px;
        }

        .section-header p {
          font-size: 1.1rem;
          color: var(--dark-gray);
          max-width: 600px;
          margin: 0 auto;
        }

        .featured-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
          gap: 1.5rem;
          margin-bottom: 3rem;
        }

        .featured-card {
          background: white;
          border-radius: 16px;
          overflow: hidden;
          box-shadow: 0 8px 25px rgba(0, 0, 0, 0.08);
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          position: relative;
        }

        .featured-card:hover {
          transform: translateY(-8px) scale(1.02);
          box-shadow: 0 20px 40px rgba(255, 105, 180, 0.2);
        }

        .featured-image {
          position: relative;
          overflow: hidden;
          height: 200px;
        }

        .featured-image img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.5s ease;
        }

        .featured-card:hover .featured-image img {
          transform: scale(1.1);
        }

        .featured-overlay {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: linear-gradient(135deg, rgba(255, 105, 180, 0.9) 0%, rgba(255, 192, 203, 0.9) 100%);
          display: flex;
          align-items: center;
          justify-content: center;
          opacity: 0;
          transition: opacity 0.3s ease;
        }

        .featured-card:hover .featured-overlay {
          opacity: 1;
        }

        .overlay-content {
          text-align: center;
        }

        .btn-view-more {
          background: white;
          color: var(--primary-pink);
          border: none;
          padding: 12px 24px;
          border-radius: 50px;
          font-weight: 600;
          display: flex;
          align-items: center;
          gap: 8px;
          cursor: pointer;
          transition: all 0.3s ease;
          box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
        }

        .btn-view-more:hover {
          transform: translateY(-2px);
          box-shadow: 0 6px 20px rgba(0, 0, 0, 0.15);
        }

        .category-badge {
          position: absolute;
          top: 15px;
          left: 15px;
          background: var(--primary-pink);
          color: white;
          padding: 6px 12px;
          border-radius: 20px;
          font-size: 0.8rem;
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 0.5px;
        }

        .featured-content {
          padding: 1.5rem;
        }

        .featured-content h3 {
          color: var(--dark-gray);
          margin-bottom: 0.75rem;
          font-size: 1.25rem;
          transition: color 0.3s ease;
        }

        .featured-card:hover .featured-content h3 {
          color: var(--primary-pink);
        }

        .featured-content p {
          color: var(--muted-foreground);
          margin-bottom: 0;
          line-height: 1.6;
        }

        .section-cta {
          text-align: center;
        }

        .btn-primary {
          background: var(--primary-pink);
          color: white;
          border: none;
          padding: 15px 30px;
          border-radius: 50px;
          font-weight: 600;
          font-size: 1.1rem;
          cursor: pointer;
          transition: all 0.3s ease;
          box-shadow: 0 4px 15px rgba(255, 105, 180, 0.3);
        }

        .btn-primary:hover {
          background: #ff1493;
          transform: translateY(-2px);
          box-shadow: 0 8px 25px rgba(255, 105, 180, 0.4);
        }

        /* Responsive Design */
        @media (max-width: 1024px) {
          .featured-grid {
            grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
            gap: 1.25rem;
          }
        }

        @media (max-width: 768px) {
          .section-header h2 {
            font-size: 2rem;
          }

          .featured-grid {
            grid-template-columns: repeat(2, 1fr);
            gap: 1rem;
          }

          .featured-image {
            height: 160px;
          }

          .featured-content {
            padding: 1.25rem;
          }

          .featured-content h3 {
            font-size: 1.1rem;
          }
        }

        @media (max-width: 480px) {
          .featured-grid {
            grid-template-columns: repeat(2, 1fr);
            gap: 0.75rem;
          }

          .featured-image {
            height: 140px;
          }

          .featured-content {
            padding: 1rem;
          }

          .featured-content h3 {
            font-size: 1rem;
            margin-bottom: 0.5rem;
          }

          .featured-content p {
            font-size: 0.9rem;
          }

          .category-badge {
            top: 10px;
            left: 10px;
            font-size: 0.7rem;
            padding: 4px 8px;
          }

          .btn-view-more {
            padding: 10px 18px;
            font-size: 0.9rem;
          }
        }

        @media (max-width: 360px) {
          .featured-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </section>
  )
}