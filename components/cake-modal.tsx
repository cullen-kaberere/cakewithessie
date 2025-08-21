"use client"

import { useState } from "react"
import { useCart } from "@/contexts/cart-context"

interface CakeModalProps {
  cake: {
    id: number
    title: string
    image: string
    description: string
    startingPrice: number
    flavors: string[]
    sizes: string[]
  }
  onClose: () => void
}

export default function CakeModal({ cake, onClose }: CakeModalProps) {
  const [selectedFlavor, setSelectedFlavor] = useState(cake.flavors[0])
  const [selectedSize, setSelectedSize] = useState(cake.sizes[0])
  const [quantity, setQuantity] = useState(1)
  const { addItem } = useCart()

  const getSizePrice = (size: string) => {
    const multipliers: { [key: string]: number } = {
      "0.5kg": 1,
      "1kg": 1.5,
      "1.5kg": 2,
      "2kg": 2.5,
      "3kg": 3.5,
      "4kg": 4.5,
      "5kg": 5.5,
    }
    return Math.round(cake.startingPrice * (multipliers[size] || 1))
  }

  const totalPrice = getSizePrice(selectedSize) * quantity

  const handleAddToCart = () => {
    addItem({
      title: cake.title,
      image: cake.image,
      price: getSizePrice(selectedSize),
      quantity,
      flavor: selectedFlavor,
      size: selectedSize,
      category: "cake",
    })
    onClose()
  }

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose}>
          ×
        </button>

        <div className="modal-body">
          <div className="modal-image">
            <img src={cake.image || "/placeholder.svg"} alt={cake.title} />
          </div>

          <div className="modal-details">
            <h2>{cake.title}</h2>
            <p className="modal-description">{cake.description}</p>

            <div className="option-group">
              <h4>Select Flavor:</h4>
              <div className="flavor-options">
                {cake.flavors.map((flavor) => (
                  <button
                    key={flavor}
                    className={`option-btn ${selectedFlavor === flavor ? "active" : ""}`}
                    onClick={() => setSelectedFlavor(flavor)}
                  >
                    {flavor}
                  </button>
                ))}
              </div>
            </div>

            <div className="option-group">
              <h4>Select Size:</h4>
              <div className="size-options">
                {cake.sizes.map((size) => (
                  <button
                    key={size}
                    className={`option-btn ${selectedSize === size ? "active" : ""}`}
                    onClick={() => setSelectedSize(size)}
                  >
                    {size} - Ksh{getSizePrice(size)}
                  </button>
                ))}
              </div>
            </div>

            <div className="option-group">
              <h4>Quantity:</h4>
              <div className="quantity-controls">
                <button className="quantity-btn" onClick={() => setQuantity(Math.max(1, quantity - 1))}>
                  -
                </button>
                <span className="quantity-display">{quantity}</span>
                <button className="quantity-btn" onClick={() => setQuantity(quantity + 1)}>
                  +
                </button>
              </div>
            </div>

            <div className="price-summary">
              <h3>Total: Ksh{totalPrice}</h3>
            </div>

            <button className="btn btn-primary add-to-cart-btn" onClick={handleAddToCart}>
              Add to Cart
            </button>
          </div>
        </div>
      </div>

      <style jsx>{`
        .modal-overlay {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(0, 0, 0, 0.8);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 1000;
          padding: 2rem;
        }

        .modal-content {
          background: white;
          border-radius: var(--border-radius);
          max-width: 800px;
          width: 100%;
          max-height: 90vh;
          overflow-y: auto;
          position: relative;
        }

        .modal-close {
          position: absolute;
          top: 1rem;
          right: 1rem;
          background: none;
          border: none;
          font-size: 2rem;
          cursor: pointer;
          color: var(--dark-gray);
          z-index: 10;
          width: 40px;
          height: 40px;
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 50%;
          transition: var(--transition);
        }

        .modal-close:hover {
          background: var(--light-gray);
        }

        .modal-body {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 2rem;
          padding: 2rem;
        }

        .modal-image {
          position: relative;
        }

        .modal-image img {
          width: 100%;
          height: 300px;
          object-fit: cover;
          border-radius: var(--border-radius);
        }

        .modal-details h2 {
          color: var(--primary-pink);
          margin-bottom: 1rem;
        }

        .modal-description {
          color: var(--dark-gray);
          margin-bottom: 2rem;
          line-height: 1.6;
        }

        .option-group {
          margin-bottom: 2rem;
        }

        .option-group h4 {
          color: var(--dark-gray);
          margin-bottom: 1rem;
        }

        .flavor-options,
        .size-options {
          display: flex;
          flex-wrap: wrap;
          gap: 0.5rem;
        }

        .option-btn {
          padding: 0.5rem 1rem;
          border: 2px solid var(--light-pink);
          background: white;
          color: var(--dark-gray);
          border-radius: var(--border-radius);
          cursor: pointer;
          transition: var(--transition);
          font-size: 0.9rem;
        }

        .option-btn:hover,
        .option-btn.active {
          background: var(--primary-pink);
          color: white;
          border-color: var(--primary-pink);
        }

        .quantity-controls {
          display: flex;
          align-items: center;
          gap: 1rem;
        }

        .quantity-btn {
          width: 40px;
          height: 40px;
          border: 2px solid var(--primary-pink);
          background: white;
          color: var(--primary-pink);
          border-radius: 50%;
          cursor: pointer;
          transition: var(--transition);
          font-size: 1.2rem;
          font-weight: bold;
        }

        .quantity-btn:hover {
          background: var(--primary-pink);
          color: white;
        }

        .quantity-display {
          font-size: 1.2rem;
          font-weight: bold;
          color: var(--dark-gray);
          min-width: 30px;
          text-align: center;
        }

        .price-summary {
          margin: 2rem 0;
          padding: 1rem;
          background: var(--soft-pink);
          border-radius: var(--border-radius);
          text-align: center;
        }

        .price-summary h3 {
          color: var(--primary-pink);
          margin: 0;
        }

        .add-to-cart-btn {
          width: 100%;
          padding: 1rem;
          font-size: 1.1rem;
        }

        @media (max-width: 768px) {
          .modal-overlay {
            padding: 1rem;
          }
          
          .modal-body {
            grid-template-columns: 1fr;
            gap: 1.5rem;
            padding: 1.5rem;
          }
          
          .modal-image img {
            height: 250px;
          }
          
          .flavor-options,
          .size-options {
            gap: 0.25rem;
          }
          
          .option-btn {
            padding: 0.4rem 0.8rem;
            font-size: 0.8rem;
          }
        }
      `}</style>
    </div>
  )
}
