"use client"

import { useState } from "react"
import TreatModal from "./treat-modal"

const treatCategories = [
  { id: "all", name: "All Treats" },
  { id: "cupcakes", name: "Cupcakes" },
  { id: "cake-circles", name: "Cake Circles" },
  { id: "bento", name: "Bento Packages" },
  { id: "trio-delight", name: "Trio Delight" },
  { id: "all-mine", name: "All Mine Package" },
  { id: "add-ons", name: "Add-ons" },
]

const treatsData = [
  // Cupcakes - Box of 4
  {
    id: 1,
    title: "Cupcake Box of 4",
    category: "cupcakes",
    image: "/cupcake-box-4.png",
    basePrice: 550,
    description: "Perfect mini celebration with 4 beautifully decorated cupcakes",
    flavors: [
      { name: "Vanilla", price: 550 },
      { name: "Marble", price: 600 },
      { name: "Chocolate", price: 650 },
      { name: "Chocolate Chip", price: 750 },
      { name: "Chocolate Mint", price: 750 },
      { name: "Raspberry", price: 600 },
      { name: "Red Velvet", price: 650 },
      { name: "Flavored", price: 600 },
      { name: "Assorted Box (2 flavors)", price: 750 }
    ],
    sizes: ["Box of 4"],
    preparationTime: "Same day",
  },
  // Cupcakes - Box of 6
  {
    id: 2,
    title: "Cupcake Box of 6",
    category: "cupcakes",
    image: "/cupcake-box-6.png",
    basePrice: 800,
    description: "Share the sweetness with 6 gourmet cupcakes",
    flavors: [
      { name: "Vanilla", price: 800 },
      { name: "Marble", price: 850 },
      { name: "Chocolate", price: 850 },
      { name: "Chocolate Chip", price: 950 },
      { name: "Chocolate Mint", price: 950 },
      { name: "Raspberry", price: 800 },
      { name: "Red Velvet", price: 850 },
      { name: "Flavored", price: 850 },
      { name: "Assorted Box (2 flavors)", price: 1000 }
    ],
    sizes: ["Box of 6"],
    preparationTime: "Same day",
  },
  // Cupcakes - Box of 12
  {
    id: 3,
    title: "Cupcake Box of 12",
    category: "cupcakes",
    image: "/cupcake-box-12.png",
    basePrice: 1000,
    description: "Perfect for parties with a dozen delicious cupcakes",
    flavors: [
      { name: "Vanilla", price: 1000 },
      { name: "Marble", price: 1050 },
      { name: "Chocolate", price: 1200 },
      { name: "Chocolate Chip", price: 1250 },
      { name: "Chocolate Mint", price: 1250 },
      { name: "Raspberry", price: 1050 },
      { name: "Red Velvet", price: 1200 },
      { name: "Flavored", price: 1100 },
      { name: "Assorted Box (2 flavors)", price: 1500 }
    ],
    sizes: ["Box of 12"],
    preparationTime: "1 day",
  },
  // Cupcakes - Box of 24
  {
    id: 4,
    title: "Cupcake Box of 24",
    category: "cupcakes",
    image: "/cupcake-box-24.png",
    basePrice: 2400,
    description: "Large celebration package with 24 premium cupcakes",
    flavors: [
      { name: "Vanilla", price: 2400 },
      { name: "Marble", price: 2450 },
      { name: "Chocolate", price: 2800 },
      { name: "Chocolate Chip", price: 2850 },
      { name: "Chocolate Mint", price: 2850 },
      { name: "Raspberry", price: 2450 },
      { name: "Red Velvet", price: 2800 },
      { name: "Flavored", price: 2600 },
      { name: "Assorted Box (2 flavors)", price: 3000 }
    ],
    sizes: ["Box of 24"],
    preparationTime: "2 days",
  },
  // Edible Print Cupcakes
  {
    id: 5,
    title: "Edible Print Cupcakes",
    category: "cupcakes",
    image: "/edible-toppers.png",
    basePrice: 1500,
    description: "Custom edible decorations for your cakes and cupcakes",
    flavors: [
      { name: "Lemon", price: 1500 },
      { name: "Strawberry", price: 1500 },
      { name: "Mint", price: 1500 },
      { name: "Passion", price: 1500 },
      { name: "Pineapple", price: 1500 },
      { name: "Orange", price: 1500 },
      { name: "Pina Colada", price: 1500 },
      { name: "Blueberry", price: 1500 },
      { name: "Vanilla", price: 1500 },
      { name: "Marble", price: 1500 },
      { name: "Chocolate", price: 1500 },
      { name: "Chocolate Chip", price: 1500 },
      { name: "Chocolate Mint", price: 1500 },
      { name: "Raspberry", price: 1500 },
      { name: "Red Velvet", price: 1500 }
    ],
    sizes: [
      { name: "Box of 6", price: 1500 },
      { name: "Box of 12", price: 2000 }
    ],
    preparationTime: "3 business days",
    maxOrder: "Max 6 prints per order",
    packageContents: ["Edible print cupcakes", "Max 6 prints per order"]
  },
  // Bento Box of Two
  {
    id: 6,
    title: "Bento Box of Two",
    category: "bento",
    image: "/bento-package.png",
    basePrice: 1500,
    description: "Beautiful bento package with 2 items",
    flavors: [
      { name: "Vanilla", price: 1500 },
      { name: "Bubblegum", price: 1500 },
      { name: "Pina Colada", price: 1500 },
      { name: "Lemon", price: 1500 },
      { name: "Passion", price: 1500 },
      { name: "Chocolate", price: 1500 },
      { name: "Mint", price: 1500 },
      { name: "Strawberry", price: 1500 },
      { name: "Pineapple", price: 1500 },
      { name: "Orange", price: 1500 }
    ],
    sizes: ["Standard Package"],
    preparationTime: "2 days",
    packageContents: ["2 cake items", "Beautiful gift box", "Personalized message card"],
    notes: "Cake toppers charged separately. Cannot have assorted flavors."
  },
  // Bento Box of Five
  {
    id: 7,
    title: "Bento Box of Five",
    category: "bento",
    image: "/bento-package.png",
    basePrice: 2400,
    description: "Premium bento package with 5 delicious items",
    flavors: [
      { name: "Vanilla", price: 2400 },
      { name: "Marble", price: 2400 },
      { name: "Chocolate", price: 2400 },
      { name: "Flavored", price: 2400 },
      { name: "Vanilla Oreo", price: 2400 },
      { name: "Chocolate Mint", price: 2600 },
      { name: "Chocolate Chip", price: 2600 },
      { name: "Red Velvet", price: 2600 },
      { name: "Raspberry", price: 2600 },
      { name: "Assorted Box (2 flavors)", price: 2600 }
    ],
    sizes: ["Standard Package"],
    preparationTime: "2 days",
    packageContents: ["5 cake items", "Premium gift box", "Personalized message card"]
  },
  // Bento Box of Eight
  {
    id: 8,
    title: "Bento Box of Eight",
    category: "bento",
    image: "/bento-package.png",
    basePrice: 3600,
    description: "Deluxe bento package with 8 exquisite items",
    flavors: [
      { name: "Vanilla", price: 3600 },
      { name: "Chocolate Chip", price: 3600 },
      { name: "Raspberry", price: 3600 },
      { name: "Flavored", price: 3600 },
      { name: "Vanilla/Chocolate Oreo", price: 3600 },
      { name: "Bubblegum", price: 3600 },
      { name: "Chocolate Mint", price: 3600 },
      { name: "Red Velvet", price: 3600 },
      { name: "Coconut", price: 3600 },
      { name: "Assorted Box (2 flavors)", price: 3600 }
    ],
    sizes: ["Standard Package"],
    preparationTime: "3 days",
    packageContents: ["8 cake items", "Deluxe gift box", "Personalized message card"]
  },
  // Trio Delight
  {
    id: 9,
    title: "Trio Delight",
    category: "trio-delight",
    image: "/cake-circles.png",
    basePrice: 3200,
    description: "3 mini cakes summing to 2kgs - perfect for variety",
    flavors: [
      { name: "Vanilla", price: 3200 },
      { name: "Raspberry", price: 3200 },
      { name: "Vanilla Oreo", price: 3200 },
      { name: "Chocolate Oreo", price: 3200 },
      { name: "Chocolate", price: 3200 },
      { name: "Chocolate Mint", price: 3200 },
      { name: "Chocolate Chip", price: 3200 },
      { name: "Red Velvet", price: 3200 },
      { name: "Flavored", price: 3200 },
      { name: "Assorted (2 flavors)", price: 3200 },
      { name: "Lemon", price: 3200 },
      { name: "Strawberry", price: 3200 },
      { name: "Mint", price: 3200 },
      { name: "Passion", price: 3200 },
      { name: "Pineapple", price: 3200 },
      { name: "Orange", price: 3200 },
      { name: "Blueberry", price: 3200 },
      { name: "Pina Colada", price: 3200 }
    ],
    sizes: ["Standard Package (3 mini cakes)"],
    preparationTime: "2 days",
    packageContents: ["3 mini cakes (total 2kg)", "Beautiful presentation"]
  },
  // All Mine Package
  {
    id: 10,
    title: "All Mine Package",
    category: "all-mine",
    image: "/all-mine-box.png",
    basePrice: 3000,
    description: "Complete celebration experience with cake, cupcakes, drink, and memories",
    flavors: [
      { name: "Vanilla", price: 3000 },
      { name: "Bubblegum", price: 3000 },
      { name: "Pina Colada", price: 3000 },
      { name: "Passion", price: 3000 },
      { name: "Chocolate", price: 3000 },
      { name: "Mint", price: 3000 },
      { name: "Strawberry", price: 3000 },
      { name: "Pineapple", price: 3000 },
      { name: "Orange", price: 3000 },
      { name: "Raspberry", price: 3000 }
    ],
    drinkOptions: [
      "Gordon's Tonic", "KO", "Smirnoff", "Manyatta", "Snap", 
      "Savannah", "Red Bull", "Faxe", "Tusker", "Uprise", 
      "Monster Energy", "Canned Soda", "Ribena", "Minute Maid"
    ],
    sizes: ["Complete Package"],
    preparationTime: "3 days",
    packageContents: [
      "0.5kg mini cake",
      "2 cupcakes",
      "Drink of choice",
      "10 polaroid pictures",
      "Premium gift box",
      "Personalized note"
    ],
    notes: "Extra polaroids: Ksh 50 each. Drinks can be supplied with chocolate at extra cost."
  },
  // Cake Circles
  {
    id: 11,
    title: "Cake Circles",
    category: "cake-circles",
    image: "/cake-circles.png",
    basePrice: 1500,
    description: "Individual chocolate-coated cake circles - perfect personal treats",
    flavors: [
      { name: "Vanilla", price: 1500 },
      { name: "Raspberry", price: 1500 },
      { name: "Lemon", price: 1500 },
      { name: "Flavored", price: 1500 },
      { name: "Salted Caramel", price: 1500 },
      { name: "Chocolate", price: 1500 },
      { name: "Bubblegum", price: 1500 },
      { name: "Pineapple Coconut", price: 1500 },
      { name: "Assorted (2 flavors)", price: 1500 },
      { name: "Lemon", price: 1500 },
      { name: "Strawberry", price: 1500 },
      { name: "Mint", price: 1500 },
      { name: "Passion", price: 1500 },
      { name: "Pineapple", price: 1500 },
      { name: "Orange", price: 1500 },
      { name: "Pina Colada", price: 1500 },
      { name: "Blueberry", price: 1500 }
    ],
    sizes: [
      { name: "Box of 6", price: 1500 },
      { name: "Box of 12", price: 3000 }
    ],
    preparationTime: "Same day",
    notes: "Chocolate coated. Can be assorted with 2 flavors."
  },
  // Add-ons - Edible Toppers
  {
    id: 12,
    title: "Edible Toppers",
    category: "add-ons",
    image: "/edible-toppers.png",
    basePrice: 100,
    description: "Beautiful edible decorations to enhance your cakes",
    items: [
      { name: "Black Grad Cap", price: 500 },
      { name: "Custom Grad Cap", price: 600 },
      { name: "Fondant Rose", price: 300 },
      { name: "Pearls (sweets)", price: 100 },
      { name: "Chocolate Toppers", price: 300 },
      { name: "Oreos", price: 250 },
      { name: "Custom Bow (large)", price: 1000 },
      { name: "Rainbow", price: 1000 },
      { name: "Custom Unicorn Horn (large)", price: 1000 },
      { name: "Teddy Bear", price: 600 },
      { name: "Animated Doll (medium)", price: 600 },
      { name: "Strawberries (berry fruits)", price: 400 },
      { name: "Baby Shoes", price: 500 },
      { name: "Cupcake/Cake Edible Print", price: 1000 }
    ],
    sizes: ["Each"],
    preparationTime: "Same day"
  },
  // Add-ons - Non-Edible Toppers
  {
    id: 13,
    title: "Non-Edible Toppers",
    category: "add-ons",
    image: "/non-edible-toppers.png",
    basePrice: 150,
    description: "Decorative toppers you can keep as keepsakes",
    items: [
      { name: "A6 Custom Card", price: 250 },
      { name: "Ribbons (6)", price: 200 },
      { name: "Animated Paper Toppers", price: 1000 },
      { name: "Acrylic Name Toppers", price: 600 },
      { name: "Paper Name Toppers", price: 300 },
      { name: "Wavy Candles", price: 350 },
      { name: "Butterflies", price: 350 },
      { name: "Placard Numbers", price: 300 },
      { name: "Candle Numbers", price: 150 },
      { name: "Small Tiara", price: 400 },
      { name: "Big Tiara", price: 500 },
      { name: "Polaroids (10)", price: 500 },
      { name: "Spheres", price: 1000 },
      { name: "Flowers (40-50 stems)", price: 2000 }
    ],
    sizes: ["Each"],
    preparationTime: "Same day"
  }
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
                  <p className="treat-price">From Ksh{treat.basePrice}</p>
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