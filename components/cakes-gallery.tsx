"use client"

import { useState } from "react"
import CakeModal from "./cake-modal"

const cakeCategories = [
  { id: "all", name: "All Cakes" },
  { id: "birthday", name: "Birthday" },
  { id: "kids", name: "Kids" },
  { id: "graduation", name: "Graduation" },
  { id: "custom", name: "Custom" },
  { id: "anniversary", name: "Anniversary" },
  { id: "tier", name: "Tier" },
  { id: "baby-shower", name: "Baby Shower" },
]

const cakesData = [
  {
    id: 1,
    title: "Tier Cake",
    category: "tier",
    image: "/cake3.jpg",
    startingPrice: 150,
    description: "Beautiful tier wedding cake with delicate sugar roses",
    flavors: ["Vanilla", "Chocolate", "Red Velvet", "Lemon"],
    sizes: ["3kg", "4kg", "5kg"],
  },
  {
    id: 2,
    title: "Baby Shower Theme",
    category: "baby-shower",
    image: "/cake37.jpg",
    startingPrice: 180,
    description: "Adorable baby shower cake with cute fondant decorations",
    flavors: ["Vanilla", "Strawberry", "Chocolate"],
    sizes: ["2kg", "3kg", "4kg", "5kg"],
  },
  {
    id: 3,
    title: "Colorful Kids Birthday",
    category: "kids",
    image: "/cake39.jpg",
    startingPrice: 45,
    description: "Fun and colorful birthday cake perfect for kids parties",
    flavors: ["Vanilla", "Strawberry", "Chocolate", "Funfetti"],
    sizes: ["0.5kg", "1kg", "1.5kg", "2kg"],
  },
  {
    id: 4,
    title: "Classic Birthday Celebration",
    category: "birthday",
    image: "/cake38.jpg",
    startingPrice: 35,
    description: "Traditional birthday cake with custom decorations",
    flavors: ["Vanilla", "Chocolate", "Strawberry", "Marble"],
    sizes: ["0.5kg", "1kg", "1.5kg", "2kg"],
  },
  {
    id: 5,
    title: "Graduation Achievement",
    category: "graduation",
    image: "/cake7.jpg",
    startingPrice: 55,
    description: "Celebrate academic achievements with this special cake",
    flavors: ["Vanilla", "Chocolate", "Lemon", "Red Velvet"],
    sizes: ["1kg", "1.5kg", "2kg", "3kg"],
  },
  {
    id: 6,
    title: "Graduation Cap Design",
    category: "graduation",
    image: "/graduation-cake.png",
    startingPrice: 60,
    description: "Classic graduation cap themed cake",
    flavors: ["Chocolate", "Vanilla", "Caramel", "Coffee"],
    sizes: ["1kg", "1.5kg", "2kg", "3kg"],
  },
  {
    id: 7,
    title: "Custom celebration Cake",
    category: "custom",
    image: "/cake14.jpg",
    startingPrice: 80,
    description: "Professional cake design for corporate events",
    flavors: ["Vanilla", "Chocolate", "Lemon", "Carrot"],
    sizes: ["2kg", "3kg", "4kg", "5kg"],
  },
  {
    id: 8,
    title: "Custom Design Cake",
    category: "custom",
    image: "/cake33.jpg",
    startingPrice: 70,
    description: "Personalized cake design based on your vision",
    flavors: ["Vanilla", "Chocolate", "Red Velvet", "Lemon", "Strawberry", "Oreo", "Chocolate Mint"],
    sizes: ["0.5kg", "1kg", "1.5kg", "2kg", "3kg"],
  },
  {
    id: 9,
    title: "Anniversary Romance",
    category: "anniversary",
    image: "/cake44.jpg",
    startingPrice: 65,
    description: "Romantic cake design for anniversary celebrations",
    flavors: ["Red Velvet", "Chocolate", "Vanilla", "Strawberry"],
    sizes: ["1kg", "1.5kg", "2kg", "3kg"],
  },
  {
    id: 10,
    title: "Kids Superhero Theme",
    category: "kids",
    image: "/cake41.jpg",
    startingPrice: 50,
    description: "Action-packed superhero themed cake for kids",
    flavors: ["Vanilla", "Chocolate", "Funfetti", "Strawberry"],
    sizes: ["0.5kg", "1kg", "1.5kg", "2kg"],
  },
  {
    id: 11,
    title: "Princess Cake",
    category: "kids",
    image: "/cake29.jpg",
    startingPrice: 55,
    description: "Magical princess themed cake for little royals",
    flavors: ["Vanilla", "Strawberry", "Pink Velvet", "Funfetti"],
    sizes: ["1kg", "1.5kg", "2kg", "3kg"],
  },
  {
    id: 12,
    title: "Milestone Cake",
    category: "birthday",
    image: "/cake40.jpg",
    startingPrice: 40,
    description: "Special cake for milestone birthday celebrations",
    flavors: ["Chocolate", "Vanilla", "Caramel", "Coffee"],
    sizes: ["1kg", "1.5kg", "2kg", "3kg"],
  },
]

export default function CakesGallery() {
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [selectedCake, setSelectedCake] = useState<(typeof cakesData)[0] | null>(null)

  const filteredCakes =
    selectedCategory === "all" ? cakesData : cakesData.filter((cake) => cake.category === selectedCategory)

  return (
    <>
      <div className="cakes-gallery">
        {/* Filter Buttons */}
        <div className="filter-buttons">
          {cakeCategories.map((category) => (
            <button
              key={category.id}
              className={`filter-btn ${selectedCategory === category.id ? "active" : ""}`}
              onClick={() => setSelectedCategory(category.id)}
            >
              {category.name}
            </button>
          ))}
        </div>

        {/* Cakes Grid */}
        <div className="cakes-grid">
          {filteredCakes.map((cake) => (
            <div key={cake.id} className="cake-card" onClick={() => setSelectedCake(cake)}>
              <div className="cake-image">
                <img src={cake.image || "/placeholder.svg"} alt={cake.title} />
                <div className="cake-overlay">
                  <button className="btn btn-primary">View Details</button>
                </div>
              </div>
              <div className="cake-info">
                <h3>{cake.title}</h3>
                <p className="cake-description">{cake.description}</p>
                {/* <p className="cake-price">Starting from Ksh{cake.startingPrice}</p> */}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Cake Detail Modal */}
      {selectedCake && <CakeModal cake={selectedCake} onClose={() => setSelectedCake(null)} />}

      <style jsx>{`
        .cakes-gallery {
          width: 100%;
        }

        .filter-buttons {
          display: flex;
          flex-wrap: wrap;
          justify-content: center;
          gap: 1rem;
          margin-bottom: 3rem;
        }

        .filter-btn {
          padding: 0.75rem 1.5rem;
          border: 2px solid var(--primary-pink);
          background: transparent;
          color: var(--primary-pink);
          border-radius: var(--border-radius);
          cursor: pointer;
          transition: var(--transition);
          font-weight: 500;
        }

        .filter-btn:hover,
        .filter-btn.active {
          background: var(--primary-pink);
          color: white;
          transform: translateY(-2px);
        }

        .cakes-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
          gap: 2rem;
        }

        .cake-card {
          background: white;
          border-radius: var(--border-radius);
          overflow: hidden;
          box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
          transition: var(--transition);
          cursor: pointer;
        }

        .cake-card:hover {
          transform: translateY(-8px);
          box-shadow: 0 12px 30px rgba(0, 0, 0, 0.15);
        }

        .cake-image {
          position: relative;
          height: 200px; /* Reduced from 250px */
          overflow: hidden;
        }

        .cake-image img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: var(--transition);
        }

        .cake-card:hover .cake-image img {
          transform: scale(1.1);
        }

        .cake-overlay {
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

        .cake-card:hover .cake-overlay {
          opacity: 1;
        }

        .cake-info {
          padding: 1rem; /* Reduced from 1.5rem */
        }

        .cake-info h3 {
          color: var(--primary-pink);
          margin-bottom: 0.5rem;
          font-size: 1.1rem; /* Reduced from 1.25rem */
        }

        .cake-description {
          color: var(--dark-gray);
          margin-bottom: 0.75rem; /* Reduced from 1rem */
          font-size: 0.85rem; /* Reduced from 0.9rem */
          line-height: 1.4;
        }

        .cake-price {
          color: var(--primary-pink);
          font-weight: 600;
          font-size: 1rem; /* Reduced from 1.1rem */
          margin-bottom: 0;
        }

        @media (max-width: 768px) {
          .filter-buttons {
            gap: 0.5rem;
            margin-bottom: 2rem; /* Reduced from 3rem */
          }
          
          .filter-btn {
            padding: 0.5rem 1rem;
            font-size: 0.8rem; /* Reduced from 0.9rem */
          }
          
          .cakes-grid {
            grid-template-columns: repeat(2, 1fr);
            gap: 1rem;
          }
          
          .cake-info {
            padding: 0.75rem; /* Reduced from 1rem */
          }
          
          .cake-info h3 {
            font-size: 1rem; /* Reduced from 1.1rem */
            margin-bottom: 0.25rem; /* Reduced from 0.5rem */
          }
          
          .cake-description {
            display: none;
          }
          
          .cake-price {
            font-size: 0.9rem; /* Reduced from 1rem */
          }
          
          .cake-image {
            height: 150px; /* Reduced from 180px */
          }
        }

        @media (max-width: 640px) {
          .cakes-grid {
            grid-template-columns: repeat(2, 1fr);
            gap: 0.75rem;
          }
          
          .cake-image {
            height: 130px;
          }
          
          .cake-info {
            padding: 0.5rem;
          }
          
          .cake-info h3 {
            font-size: 0.9rem;
          }
        }

        @media (max-width: 480px) {
          .cakes-grid {
            grid-template-columns: 1fr;
            gap: 1rem;
          }
          
          .cake-image {
            height: 180px;
          }
          
          .cake-info {
            padding: 1rem;
          }
          
          .cake-info h3 {
            font-size: 1.1rem;
          }
          
          .cake-description {
            display: block;
            font-size: 0.8rem;
          }
          
          .cake-price {
            font-size: 1rem;
          }
        }

        @media (max-width: 360px) {
          .cakes-grid {
            grid-template-columns: 1fr;
          }
          
          .filter-buttons {
            gap: 0.25rem;
          }
          
          .filter-btn {
            padding: 0.4rem 0.8rem;
            font-size: 0.7rem;
          }
        }
      `}</style>
    </>
  )
}