"use client"

import { useState } from "react"
import { useCart } from "@/contexts/cart-context"
import { HiX, HiMinus, HiPlus, HiShoppingCart } from "react-icons/hi"

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
        <button className="modal-close" onClick={onClose} aria-label="Close modal">
          <HiX />
        </button>

        <div className="modal-body">
          <div className="modal-image-section">
            <div className="modal-image">
              <img src={cake.image || "/placeholder.svg"} alt={cake.title} />
              <div className="cake-badge">Popular</div>
            </div>
          </div>

          <div className="modal-details">
            <div className="modal-header">
              <h2>{cake.title}</h2>
              <p className="modal-description">{cake.description}</p>
            </div>

            <div className="options-container">
              <div className="option-group">
                <div className="option-header">
                  <h4>Select Flavor</h4>
                  <span className="selected-indicator">{selectedFlavor}</span>
                </div>
                <div className="flavor-options">
                  {cake.flavors.map((flavor) => (
                    <button
                      key={flavor}
                      className={`flavor-option ${selectedFlavor === flavor ? "active" : ""}`}
                      onClick={() => setSelectedFlavor(flavor)}
                    >
                      <span className="flavor-dot"></span>
                      {flavor}
                    </button>
                  ))}
                </div>
              </div>

              <div className="option-group">
                <div className="option-header">
                  <h4>Choose Size</h4>
                </div>
                <div className="size-options">
                  {cake.sizes.map((size) => (
                    <button
                      key={size}
                      className={`size-option ${selectedSize === size ? "active" : ""}`}
                      onClick={() => setSelectedSize(size)}
                    >
                      <span className="size-label">{size}</span>
                      <span className="size-price">Ksh{getSizePrice(size)}</span>
                    </button>
                  ))}
                </div>
              </div>

              <div className="option-group">
                <div className="option-header">
                  <h4>Quantity</h4>
                </div>
                <div className="quantity-controls">
                  <button 
                    className="quantity-btn" 
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    aria-label="Decrease quantity"
                  >
                    <HiMinus />
                  </button>
                  <span className="quantity-display">{quantity}</span>
                  <button 
                    className="quantity-btn" 
                    onClick={() => setQuantity(quantity + 1)}
                    aria-label="Increase quantity"
                  >
                    <HiPlus />
                  </button>
                </div>
              </div>
            </div>

            <div className="price-action-section">
              <div className="price-summary">
                <div className="price-line">
                  <span>Subtotal:</span>
                  <span>Ksh{getSizePrice(selectedSize)}</span>
                </div>
                <div className="price-line">
                  <span>Quantity:</span>
                  <span>{quantity}</span>
                </div>
                <div className="total-price">
                  <span>Total:</span>
                  <span>Ksh{totalPrice}</span>
                </div>
              </div>

              <button className="add-to-cart-btn" onClick={handleAddToCart}>
                <HiShoppingCart className="cart-icon" />
                Add to Cart - Ksh{totalPrice}
              </button>
            </div>
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
          backdrop-filter: blur(5px);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 1000;
          padding: 1rem;
          animation: fadeIn 0.3s ease;
        }

        .modal-content {
          background: white;
          border-radius: 20px;
          max-width: 900px;
          width: 100%;
          max-height: 90vh;
          overflow-y: auto;
          position: relative;
          box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
          animation: slideUp 0.4s ease;
        }

        .modal-close {
          position: absolute;
          top: 1.5rem;
          right: 1.5rem;
          background: rgba(255, 255, 255, 0.9);
          border: none;
          border-radius: 50%;
          width: 45px;
          height: 45px;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: all 0.3s ease;
          z-index: 10;
          color: var(--dark-gray);
          font-size: 1.5rem;
        }

        .modal-close:hover {
          background: var(--primary-pink);
          color: white;
          transform: rotate(90deg);
        }

        .modal-body {
          display: grid;
          grid-template-columns: 1fr 1fr;
          min-height: 500px;
        }

        .modal-image-section {
          position: relative;
          background: linear-gradient(135deg, var(--soft-pink) 0%, var(--light-gray) 100%);
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 2rem;
        }

        .modal-image {
          position: relative;
          width: 100%;
          height: 650px;
          border-radius: 16px;
          overflow: hidden;
          box-shadow: 0 10px 40px rgba(0, 0, 0, 0.2);
        }

        .modal-image img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.3s ease;
        }

        .cake-badge {
          position: absolute;
          top: 1rem;
          left: 1rem;
          background: var(--primary-pink);
          color: white;
          padding: 0.5rem 1rem;
          border-radius: 20px;
          font-size: 0.8rem;
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 0.5px;
        }

        .modal-details {
          padding: 2.5rem;
          display: flex;
          flex-direction: column;
          gap: 2rem;
        }

        .modal-header h2 {
          color: var(--primary-pink);
          margin-bottom: 1rem;
          font-size: 1.8rem;
          font-weight: 700;
        }

        .modal-description {
          color: var(--dark-gray);
          line-height: 1.6;
          margin-bottom: 0;
        }

        .options-container {
          display: flex;
          flex-direction: column;
          gap: 2rem;
        }

        .option-group {
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }

        .option-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .option-header h4 {
          color: var(--dark-gray);
          margin: 0;
          font-size: 1.1rem;
          font-weight: 600;
        }

        .selected-indicator {
          background: var(--soft-pink);
          color: var(--primary-pink);
          padding: 0.3rem 0.8rem;
          border-radius: 12px;
          font-size: 0.8rem;
          font-weight: 500;
        }

        .flavor-options {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
          gap: 0.5rem;
        }

        .flavor-option {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          padding: 0.8rem;
          border: 2px solid var(--light-gray);
          background: white;
          border-radius: 12px;
          cursor: pointer;
          transition: all 0.3s ease;
          font-size: 0.9rem;
        }

        .flavor-option:hover,
        .flavor-option.active {
          border-color: var(--primary-pink);
          background: var(--soft-pink);
          transform: translateY(-2px);
        }

        .flavor-dot {
          width: 12px;
          height: 12px;
          border-radius: 50%;
          background: currentColor;
          opacity: 0.6;
        }

        .flavor-option.active .flavor-dot {
          opacity: 1;
          transform: scale(1.2);
        }

        .size-options {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(100px, 1fr));
          gap: 0.5rem;
        }

        .size-option {
          display: flex;
          flex-direction: column;
          align-items: center;
          padding: 1rem;
          border: 2px solid var(--light-gray);
          background: white;
          border-radius: 12px;
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .size-option:hover,
        .size-option.active {
          border-color: var(--primary-pink);
          background: var(--soft-pink);
          transform: translateY(-2px);
        }

        .size-label {
          font-weight: 600;
          color: var(--dark-gray);
          margin-bottom: 0.25rem;
        }

        .size-price {
          color: var(--primary-pink);
          font-weight: 600;
          font-size: 0.9rem;
        }

        .quantity-controls {
          display: flex;
          align-items: center;
          gap: 1rem;
          background: var(--light-gray);
          border-radius: 50px;
          padding: 0.5rem;
          width: fit-content;
        }

        .quantity-btn {
          width: 40px;
          height: 40px;
          border: none;
          background: white;
          color: var(--primary-pink);
          border-radius: 50%;
          cursor: pointer;
          transition: all 0.3s ease;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 1.2rem;
        }

        .quantity-btn:hover {
          background: var(--primary-pink);
          color: white;
          transform: scale(1.1);
        }

        .quantity-display {
          font-size: 1.2rem;
          font-weight: 600;
          color: var(--dark-gray);
          min-width: 30px;
          text-align: center;
        }

        .price-action-section {
          margin-top: auto;
          padding-top: 2rem;
          border-top: 2px solid var(--light-gray);
        }

        .price-summary {
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
          margin-bottom: 1.5rem;
        }

        .price-line {
          display: flex;
          justify-content: space-between;
          color: var(--dark-gray);
          font-size: 0.9rem;
        }

        .total-price {
          display: flex;
          justify-content: space-between;
          font-size: 1.3rem;
          font-weight: 700;
          color: var(--primary-pink);
          margin-top: 0.5rem;
          padding-top: 0.5rem;
          border-top: 1px solid var(--light-gray);
        }

        .add-to-cart-btn {
          width: 100%;
          padding: 1.2rem;
          background: var(--primary-pink);
          color: white;
          border: none;
          border-radius: 50px;
          font-size: 1.1rem;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s ease;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.5rem;
          box-shadow: 0 4px 20px rgba(255, 105, 180, 0.4);
        }

        .add-to-cart-btn:hover {
          background: #ff1493;
          transform: translateY(-2px);
          box-shadow: 0 8px 30px rgba(255, 105, 180, 0.6);
        }

        .cart-icon {
          font-size: 1.2rem;
        }

        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }

        @keyframes slideUp {
          from { 
            opacity: 0;
            transform: translateY(30px) scale(0.95);
          }
          to { 
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }

        /* Responsive Design */
        @media (max-width: 768px) {
          .modal-body {
            grid-template-columns: 1fr;
          }
          
          .modal-image-section {
            padding: 1.5rem;
          }
          
          .modal-image {
            height: 250px;
          }
          
          .modal-details {
            padding: 2rem;
          }
          
          .flavor-options,
          .size-options {
            grid-template-columns: repeat(auto-fit, minmax(100px, 1fr));
          }
        }

        @media (max-width: 480px) {
          .modal-content {
            border-radius: 16px;
          }
          
          .modal-image-section {
            padding: 1rem;
          }
          
          .modal-image {
            height: 200px;
          }
          
          .modal-details {
            padding: 1.5rem;
          }
          
          .modal-header h2 {
            font-size: 1.5rem;
          }
          
          .flavor-options {
            grid-template-columns: 1fr;
          }
          
          .size-options {
            grid-template-columns: repeat(2, 1fr);
          }
          
          .add-to-cart-btn {
            padding: 1rem;
            font-size: 1rem;
          }
        }

        /* Dark mode support */
        .dark .modal-content {
          background: var(--card);
        }
        
        .dark .modal-header h2 {
          color: var(--primary-pink);
        }
        
        .dark .modal-description {
          color: var(--muted-foreground);
        }
        
        .dark .flavor-option,
        .dark .size-option {
          background: var(--muted);
          border-color: var(--border);
          color: var(--foreground);
        }
        
        .dark .flavor-option.active,
        .dark .size-option.active {
          background: var(--soft-pink);
          border-color: var(--primary-pink);
        }
        
        .dark .quantity-controls {
          background: var(--muted);
        }
        
        .dark .quantity-btn {
          background: var(--card);
          color: var(--primary-pink);
        }
      `}</style>
    </div>
  )
}