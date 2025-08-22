"use client"

import { useState } from "react"
import TreatModal from "./treat-modal"

const treatCategories = [
  { id: "all", name: "All Treats" },
  { id: "cupcakes", name: "Cupcakes" },
  { id: "cake-circles", name: "Cake Circles" },
  { id: "bento", name: "Bento Packages" },
  { id: "all-mine", name: "All Mine Box" },
  { id: "add-ons", name: "Add-ons" },
]

const treatsData = [
  {
    id: 1,
    title: "Cupcake Box of 4",
    category: "cupcakes",
    image: "/cupcake-box-4.png",
    price: 18,
    description: "Perfect mini celebration with 4 beautifully decorated cupcakes",
    flavors: ["Vanilla", "Chocolate", "Strawberry", "Red Velvet", "Lemon", "Marble"],
    sizes: ["Box of 4"],
    preparationTime: "Same day",
  },
  {
    id: 2,
    title: "Cupcake Box of 6",
    category: "cupcakes",
    image: "/cupcake-box-6.png",
    price: 25,
    description: "Share the sweetness with 6 gourmet cupcakes",
    flavors: ["Vanilla", "Chocolate", "Strawberry", "Red Velvet", "Lemon", "Marble", "Mint", "Raspberry"],
    sizes: ["Box of 6"],
    preparationTime: "Same day",
  },
  {
    id: 3,
    title: "Cupcake Box of 12",
    category: "cupcakes",
    image: "/cupcake-box-12.png",
    price: 45,
    description: "Perfect for parties with a dozen delicious cupcakes",
    flavors: ["Vanilla", "Chocolate", "Strawberry", "Red Velvet", "Lemon", "Marble", "Mint", "Raspberry", "Funfetti"],
    sizes: ["Box of 12"],
    preparationTime: "1 day",
  },
  {
    id: 4,
    title: "Cupcake Box of 24",
    category: "cupcakes",
    image: "/cupcake-box-24.png",
    price: 85,
    description: "Large celebration package with 24 premium cupcakes",
    flavors: [
      "Vanilla",
      "Chocolate",
      "Strawberry",
      "Red Velvet",
      "Lemon",
      "Marble",
      "Mint",
      "Raspberry",
      "Funfetti",
      "Caramel",
    ],
    sizes: ["Box of 24"],
    preparationTime: "2 days",
  },
  {
    id: 5,
    title: "Cake Circles - Mini Delights",
    category: "cake-circles",
    image: "/cake-circles.png",
    price: 35,
    description: "Individual cake circles perfect for personal treats",
    flavors: ["Vanilla", "Chocolate", "Red Velvet", "Lemon"],
    sizes: ["6 pieces", "12 pieces"],
    preparationTime: "Same day",
  },
  {
    id: 6,
    title: "Bento Package - Sweet Surprise",
    category: "bento",
    image: "/bento-package.png",
    price: 55,
    description: "Small cake + 5 cupcakes in a beautiful presentation box",
    flavors: ["Vanilla", "Chocolate", "Strawberry", "Red Velvet"],
    sizes: ["Standard Package"],
    preparationTime: "2 days",
    packageContents: ["1 Small Cake (0.5kg)", "5 Cupcakes", "Beautiful Gift Box", "Personalized Message Card"],
  },
  {
    id: 7,
    title: "All Mine Box - Complete Experience",
    category: "all-mine",
    image: "/all-mine-box.png",
    price: 75,
    description: "Ultimate treat box with cake, cupcakes, drink, and memories",
    flavors: ["Vanilla", "Chocolate", "Strawberry", "Red Velvet", "Lemon"],
    sizes: ["Complete Package"],
    preparationTime: "3 days",
    packageContents: [
      "1 Small Cake (0.5kg)",
      "2 Gourmet Cupcakes",
      "Choice of Drink (Coffee/Tea/Juice)",
      "10 Polaroid Pictures",
      "Premium Gift Box",
      "Personalized Note",
    ],
    drinkOptions: ["Premium Coffee", "Herbal Tea", "Fresh Juice", "Hot Chocolate"],
  },
  {
    id: 8,
    title: "Flower Bouquet Add-on",
    category: "add-ons",
    image: "/flower-bouquet-addon.png",
    price: 25,
    description: "Beautiful fresh flower bouquet to complement your cake order",
    flavors: [],
    sizes: ["Small", "Medium", "Large"],
    preparationTime: "Same day",
  },
  {
    id: 9,
    title: "Edible Print Cupcakes",
    category: "cupcakes",
    image: "/edible-toppers.png",
    price: 15,
    description: "Custom edible decorations for your cakes and cupcakes",
    flavors: [],
    sizes: ["Set of 6", "Set of 12"],
    preparationTime: "1 day",
  },
  {
    id: 10,
    title: "Non-Edible Toppers",
    category: "add-ons",
    image: "/non-edible-toppers.png",
    price: 12,
    description: "Decorative toppers you can keep as keepsakes",
    flavors: [],
    sizes: ["Set of 3", "Set of 6"],
    preparationTime: "Same day",
  },
]

export default function TreatsGallery() {
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [selectedTreat, setSelectedTreat] = useState<(typeof treatsData)[0] | null>(null)

  const filteredTreats =
    selectedCategory === "all" ? treatsData : treatsData.filter((treat) => treat.category === selectedCategory)

  return (
    <>
      <div className="treats-gallery">
        {/* Filter Buttons */}
        <div className="filter-buttons">
          {treatCategories.map((category) => (
            <button
              key={category.id}
              className={`filter-btn ${selectedCategory === category.id ? "active" : ""}`}
              onClick={() => setSelectedCategory(category.id)}
            >
              {category.name}
            </button>
          ))}
        </div>

        {/* Treats Grid */}
        <div className="treats-grid">
          {filteredTreats.map((treat) => (
            <div key={treat.id} className="treat-card" onClick={() => setSelectedTreat(treat)}>
              <div className="treat-image">
                <img src={treat.image || "/placeholder.svg"} alt={treat.title} />
                <div className="treat-overlay">
                  <button className="btn btn-primary">View Details</button>
                </div>
              </div>
              <div className="treat-info">
                <h3>{treat.title}</h3>
                <p className="treat-description">{treat.description}</p>
                <div className="treat-meta">
                  <p className="treat-price">Ksh{treat.price}</p>
                  <p className="prep-time">Ready in: {treat.preparationTime}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Treat Detail Modal */}
      {selectedTreat && <TreatModal treat={selectedTreat} onClose={() => setSelectedTreat(null)} />}

      <style jsx>{`
        .treats-gallery {
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

        .treats-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
          gap: 2rem;
        }

        .treat-card {
          background: white;
          border-radius: var(--border-radius);
          overflow: hidden;
          box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
          transition: var(--transition);
          cursor: pointer;
        }

        .treat-card:hover {
          transform: translateY(-8px);
          box-shadow: 0 12px 30px rgba(0, 0, 0, 0.15);
        }

        .treat-image {
          position: relative;
          height: 250px;
          overflow: hidden;
        }

        .treat-image img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: var(--transition);
        }

        .treat-card:hover .treat-image img {
          transform: scale(1.1);
        }

        .treat-overlay {
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

        .treat-card:hover .treat-overlay {
          opacity: 1;
        }

        .treat-info {
          padding: 1.5rem;
        }

        .treat-info h3 {
          color: var(--primary-pink);
          margin-bottom: 0.5rem;
          font-size: 1.25rem;
        }

        .treat-description {
          color: var(--dark-gray);
          margin-bottom: 1rem;
          font-size: 0.9rem;
          line-height: 1.5;
        }

        .treat-meta {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .treat-price {
          color: var(--primary-pink);
          font-weight: 600;
          font-size: 1.2rem;
          margin: 0;
        }

        .prep-time {
          color: var(--dark-gray);
          font-size: 0.85rem;
          margin: 0;
          font-style: italic;
        }

        @media (max-width: 768px) {
          .filter-buttons {
            gap: 0.5rem;
          }
          
          .filter-btn {
            padding: 0.5rem 1rem;
            font-size: 0.9rem;
          }
          
          .treats-grid {
            grid-template-columns: 1fr;
          }
          
          .treat-meta {
            flex-direction: column;
            align-items: flex-start;
            gap: 0.5rem;
          }
        }
      `}</style>
    </>
  )
}
