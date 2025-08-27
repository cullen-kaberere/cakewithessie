"use client"

import { useState } from "react"

const galleryImages = [
  {
    id: 1,
    src: "/cake29.jpg",
    title: "Frozen Birthday Cake",
    category: "Birthday",
    height: 300,
  },
  {
    id: 2,
    src: "/cake31.jpg",
    title: "Colorful Kids Birthday",
    category: "Birthday",
    height: 250,
  },
  {
    id: 3,
    src: "/cake7.jpg",
    title: "Graduation Achievement",
    category: "Graduation",
    height: 280,
  },
  {
    id: 4,
    src: "/cake31.jpg",
    title: "Custom cake",
    category: "Wedding",
    height: 320,
  },
  {
    id: 5,
    src: "/cake19.jpg",
    title: "Allmine package",
    category: "Cupcakes",
    height: 240,
  },
  {
    id: 6,
    src: "/cake24.jpg",
    title: "Number Cake",
    category: "Corporate",
    height: 290,
  },
  {
    id: 7,
    src: "/romantic-anniversary-cake.png",
    title: "Anniversary Romance",
    category: "Anniversary",
    height: 310,
  },
  {
    id: 8,
    src: "/superhero-birthday-cake.png",
    title: "Superhero Adventure",
    category: "Kids",
    height: 270,
  },
  {
    id: 9,
    src: "/princess-castle-cake.png",
    title: "Princess Castle Dreams",
    category: "Kids",
    height: 330,
  },
  {
    id: 10,
    src: "/cake26.jpg",
    title: "Sweet Bento Package",
    category: "Packages",
    height: 260,
  },
  {
    id: 11,
    src: "/cake33.jpg",
    title: "Custom Cake Design",
    category: "Birthday",
    height: 285,
  },
  {
    id: 12,
    src: "/custom-cake.png",
    title: "Custom Design Creation",
    category: "Custom",
    height: 295,
  },
  {
    id: 13,
    src: "/cake28.jpg",
    title: "Cake Circle",
    category: "Packages",
    height: 340,
  },
  {
    id: 14,
    src: "/cake31.jpg",
    title: "Tropical Birthday Delight",
    category: "Birthday",
    height: 255,
  },
  {
    id: 15,
    src: "/cake32.jpg",
    title: "Kids Birthday Fun",
    category: "Cake",
    height: 275,
  },
]

export default function MasonryGallery() {
  const [selectedImage, setSelectedImage] = useState<(typeof galleryImages)[0] | null>(null)

  return (
    <>
      <section className="section" style={{ backgroundColor: "var(--light-gray)" }}>
        <div className="container">
          <div style={{ textAlign: "center", marginBottom: "3rem" }}>
            <h2 style={{ color: "var(--primary-pink)" }}>Our Creations</h2>
            <p style={{ fontSize: "1.1rem", color: "var(--dark-gray)" }}>
              Browse through our portfolio of beautiful cakes and treats
            </p>
          </div>

          <div className="masonry-grid">
            {galleryImages.map((image) => (
              <div
                key={image.id}
                className="masonry-item"
                style={{ height: `${image.height}px` }}
                onClick={() => setSelectedImage(image)}
              >
                <img src={image.src || "/placeholder.svg"} alt={image.title} />
                <div className="masonry-overlay">
                  <div className="overlay-content">
                    <h4>{image.title}</h4>
                    <p>{image.category}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Image Modal */}
      {selectedImage && (
        <div className="image-modal" onClick={() => setSelectedImage(null)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close" onClick={() => setSelectedImage(null)}>
              ×
            </button>
            <img src={selectedImage.src || "/placeholder.svg"} alt={selectedImage.title} />
            <div className="modal-info">
              <h3>{selectedImage.title}</h3>
              <p>{selectedImage.category}</p>
            </div>
          </div>
        </div>
      )}

      <style jsx>{`
        .masonry-grid {
          column-count: 4;
          column-gap: 1.5rem;
          margin: 0 auto;
        }

        .masonry-item {
          break-inside: avoid;
          margin-bottom: 1.5rem;
          position: relative;
          border-radius: var(--border-radius);
          overflow: hidden;
          cursor: pointer;
          transition: var(--transition);
        }

        .masonry-item:hover {
          transform: scale(1.02);
        }

        .masonry-item img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
          transition: var(--transition);
        }

        .masonry-item:hover img {
          transform: scale(1.1);
        }

        .masonry-overlay {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: linear-gradient(to bottom, transparent 0%, rgba(0, 0, 0, 0.8) 100%);
          display: flex;
          align-items: flex-end;
          padding: 1.5rem;
          opacity: 0;
          transition: var(--transition);
        }

        .masonry-item:hover .masonry-overlay {
          opacity: 1;
        }

        .overlay-content h4 {
          color: white;
          margin: 0 0 0.5rem 0;
          font-size: 1.1rem;
        }

        .overlay-content p {
          color: var(--light-pink);
          margin: 0;
          font-size: 0.9rem;
        }

        .image-modal {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(0, 0, 0, 0.9);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 1000;
          padding: 2rem;
        }

        .image-modal .modal-content {
          max-width: 90vw;
          max-height: 90vh;
          position: relative;
          background: white;
          border-radius: var(--border-radius);
          overflow: hidden;
        }

        .image-modal img {
          width: 100%;
          height: auto;
          max-height: 70vh;
          object-fit: contain;
        }

        .modal-close {
          position: absolute;
          top: 1rem;
          right: 1rem;
          background: rgba(0, 0, 0, 0.7);
          color: white;
          border: none;
          width: 40px;
          height: 40px;
          border-radius: 50%;
          font-size: 1.5rem;
          cursor: pointer;
          z-index: 10;
        }

        .modal-info {
          padding: 1.5rem;
          text-align: center;
        }

        .modal-info h3 {
          color: var(--primary-pink);
          margin-bottom: 0.5rem;
        }

        .modal-info p {
          color: var(--dark-gray);
          margin: 0;
        }

        @media (max-width: 1200px) {
          .masonry-grid {
            column-count: 3;
          }
        }

        @media (max-width: 768px) {
          .masonry-grid {
            column-count: 2;
            column-gap: 1rem;
          }
          
          .masonry-item {
            margin-bottom: 1rem;
          }
        }

        @media (max-width: 480px) {
          .masonry-grid {
            column-count: 1;
          }
        }
      `}</style>
    </>
  )
}
