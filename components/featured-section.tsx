"use client"

const featuredItems = [
  {
    id: 1,
    image: "/elegant-chocolate-wedding-cake.png",
    title: "Wedding Cakes",
    description: "Elegant designs for your perfect day",
    category: "weddings",
  },
  {
    id: 2,
    image: "/colorful-cartoon-birthday-cake.png",
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
    image: "/placeholder-7dpri.png",
    title: "Custom Designs",
    description: "Unique cakes tailored to your vision",
    category: "custom",
  },
  {
    id: 5,
    image: "/placeholder-8mq81.png",
    title: "Anniversary Cakes",
    description: "Romantic designs for special milestones",
    category: "anniversary",
  },
  {
    id: 6,
    image: "/corporate-event-cake.png",
    title: "Corporate Events",
    description: "Professional cakes for business occasions",
    category: "corporate",
  },
]

export default function FeaturedSection() {
  return (
    <section className="section" style={{ backgroundColor: "var(--light-gray)" }}>
      <div className="container">
        <div style={{ textAlign: "center", marginBottom: "3rem" }}>
          <h2 style={{ color: "var(--primary-pink)" }}>Featured Cakes & Events</h2>
          <p style={{ fontSize: "1.2rem", color: "var(--dark-gray)", maxWidth: "600px", margin: "0 auto" }}>
            Discover our most popular cake designs and event specialties
          </p>
        </div>

        <div className="featured-grid">
          {featuredItems.map((item) => (
            <div key={item.id} className="featured-card">
              <div className="featured-image">
                <img src={item.image || "/placeholder.svg"} alt={item.title} />
                <div className="featured-overlay">
                  <button className="btn btn-primary">View More</button>
                </div>
              </div>
              <div className="featured-content">
                <h3>{item.title}</h3>
                <p>{item.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <style jsx>{`
        .featured-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
          gap: 2rem;
        }

        .featured-card {
          background: white;
          border-radius: var(--border-radius);
          overflow: hidden;
          box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
          transition: var(--transition);
        }

        .featured-card:hover {
          transform: translateY(-8px);
          box-shadow: 0 12px 30px rgba(0, 0, 0, 0.15);
        }

        .featured-image {
          position: relative;
          overflow: hidden;
          height: 250px;
        }

        .featured-image img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: var(--transition);
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
          background: rgba(0, 0, 0, 0.7);
          display: flex;
          align-items: center;
          justify-content: center;
          opacity: 0;
          transition: var(--transition);
        }

        .featured-card:hover .featured-overlay {
          opacity: 1;
        }

        .featured-content {
          padding: 1.5rem;
        }

        .featured-content h3 {
          color: var(--primary-pink);
          margin-bottom: 0.5rem;
        }

        .featured-content p {
          color: var(--dark-gray);
          margin-bottom: 0;
        }

        @media (max-width: 768px) {
          .featured-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </section>
  )
}
