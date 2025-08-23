"use client"

import { useState } from "react"
import { useCart } from "@/contexts/cart-context"

interface FlavorOption {
  name: string
  price: number
}

interface SizeOption {
  name: string
  price?: number
}

interface TreatModalProps {
  treat: {
    id: number
    title: string
    image: string
    description: string
    basePrice: number
    flavors: FlavorOption[]
    sizes: SizeOption[] | string[]
    preparationTime: string
    packageContents?: string[]
    drinkOptions?: string[]
    items?: FlavorOption[]
    notes?: string
    maxOrder?: string
  }
  onClose: () => void
}

export default function TreatModal({ treat, onClose }: TreatModalProps) {
  const [selectedFlavor, setSelectedFlavor] = useState<FlavorOption>(treat.flavors?.[0] || { name: "", price: treat.basePrice })
  const [selectedSize, setSelectedSize] = useState(treat.sizes[0])
  const [selectedDrink, setSelectedDrink] = useState(treat.drinkOptions?.[0] || "")
  const [selectedItem, setSelectedItem] = useState(treat.items?.[0] || { name: "", price: treat.basePrice })
  const [quantity, setQuantity] = useState(1)
  const { addItem } = useCart()

  const getSizePrice = (size: SizeOption | string) => {
    if (typeof size === 'string') {
      const sizeOption = (treat.sizes as SizeOption[]).find(s => 
        typeof s === 'object' && s.name === size
      ) as SizeOption | undefined
      return sizeOption?.price || treat.basePrice
    }
    return size.price || treat.basePrice
  }

  const getCurrentPrice = () => {
    let price = treat.basePrice
    
    // For items with individual flavor pricing
    if (treat.flavors && treat.flavors.length > 0 && selectedFlavor) {
      price = selectedFlavor.price
    }
    
    // For add-ons with individual items
    if (treat.items && treat.items.length > 0 && selectedItem) {
      price = selectedItem.price
    }
    
    // Apply size multiplier if it's an object with price
    const sizePrice = getSizePrice(selectedSize)
    if (typeof selectedSize === 'string') {
      const sizeObj = (treat.sizes as SizeOption[]).find(s => 
        typeof s === 'object' && s.name === selectedSize
      )
      if (sizeObj && sizeObj.price) {
        price = sizeObj.price
      }
    } else if (typeof selectedSize === 'object' && selectedSize.price) {
      price = selectedSize.price
    }
    
    return price * quantity
  }

  const totalPrice = getCurrentPrice()

  const handleAddToCart = () => {
    const cartItem = {
      title: treat.title,
      image: treat.image,
      price: getCurrentPrice() / quantity, // Price per item
      quantity,
      flavor: treat.flavors?.length > 0 ? selectedFlavor.name : undefined,
      size: typeof selectedSize === 'object' ? selectedSize.name : selectedSize,
      drink: selectedDrink || undefined,
      item: treat.items?.length > 0 ? selectedItem.name : undefined,
      category: treat.category || "treat",
      preparationTime: treat.preparationTime,
    }
    
    addItem(cartItem)
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
            <img src={treat.image || "/placeholder.svg"} alt={treat.title} />
          </div>

          <div className="modal-details">
            <h2>{treat.title}</h2>
            <p className="modal-description">{treat.description}</p>
            
            {treat.maxOrder && (
              <p className="max-order-info">
                <strong>Note:</strong> {treat.maxOrder}
              </p>
            )}
            
            <p className="prep-time-info">
              <strong>Preparation Time:</strong> {treat.preparationTime}
            </p>

            {treat.notes && (
              <div className="notes-section">
                <p><strong>Important:</strong> {treat.notes}</p>
              </div>
            )}

            {treat.packageContents && (
              <div className="package-contents">
                <h4>Package Includes:</h4>
                <ul>
                  {treat.packageContents.map((item, index) => (
                    <li key={index}>{item}</li>
                  ))}
                </ul>
              </div>
            )}

            {/* For add-ons with individual items */}
            {treat.items && treat.items.length > 0 && (
              <div className="option-group">
                <h4>Select Item:</h4>
                <div className="item-options">
                  {treat.items.map((item) => (
                    <button
                      key={item.name}
                      className={`option-btn ${selectedItem.name === item.name ? "active" : ""}`}
                      onClick={() => setSelectedItem(item)}
                    >
                      {item.name} - Ksh{item.price}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* For treats with flavors */}
            {treat.flavors && treat.flavors.length > 0 && (
              <div className="option-group">
                <h4>Select Flavor:</h4>
                <div className="flavor-options">
                  {treat.flavors.map((flavor) => (
                    <button
                      key={flavor.name}
                      className={`option-btn ${selectedFlavor.name === flavor.name ? "active" : ""}`}
                      onClick={() => setSelectedFlavor(flavor)}
                    >
                      {flavor.name} {flavor.price !== treat.basePrice ? `- Ksh${flavor.price}` : ''}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Size options */}
            {treat.sizes.length > 0 && (
              <div className="option-group">
                <h4>Select Size:</h4>
                <div className="size-options">
                  {treat.sizes.map((size) => {
                    const sizeName = typeof size === 'object' ? size.name : size
                    const sizePrice = typeof size === 'object' && size.price ? size.price : 
                                    (treat.flavors?.length > 0 ? selectedFlavor.price : treat.basePrice)
                    
                    return (
                      <button
                        key={sizeName}
                        className={`option-btn ${selectedSize === size ? "active" : ""}`}
                        onClick={() => setSelectedSize(size)}
                      >
                        {sizeName} {typeof size === 'object' && size.price ? `- Ksh${size.price}` : ''}
                      </button>
                    )
                  })}
                </div>
              </div>
            )}

            {/* Drink options */}
            {treat.drinkOptions && (
              <div className="option-group">
                <h4>Select Drink:</h4>
                <div className="drink-options">
                  {treat.drinkOptions.map((drink) => (
                    <button
                      key={drink}
                      className={`option-btn ${selectedDrink === drink ? "active" : ""}`}
                      onClick={() => setSelectedDrink(drink)}
                    >
                      {drink}
                    </button>
                  ))}
                </div>
              </div>
            )}

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
          max-width: 900px;
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
          height: 520px;
          object-fit: cover;
          border-radius: var(--border-radius);
          margin-top: 3rem;
        }

        .modal-details h2 {
          color: var(--primary-pink);
          margin-bottom: 1rem;
        }

        .modal-description {
          color: var(--dark-gray);
          margin-bottom: 1rem;
          line-height: 1.6;
        }

        .max-order-info,
        .prep-time-info {
          color: var(--primary-pink);
          font-weight: 500;
          margin-bottom: 0.5rem;
        }

        .notes-section {
          background: var(--soft-pink);
          padding: 1rem;
          border-radius: var(--border-radius);
          margin-bottom: 1rem;
        }

        .notes-section p {
          margin: 0;
          color: var(--dark-gray);
        }

        .package-contents {
          background: var(--soft-pink);
          padding: 1rem;
          border-radius: var(--border-radius);
          margin-bottom: 1.5rem;
        }

        .package-contents h4 {
          color: var(--primary-pink);
          margin-bottom: 0.5rem;
        }

        .package-contents ul {
          margin: 0;
          padding-left: 1.2rem;
        }

        .package-contents li {
          color: var(--dark-gray);
          margin-bottom: 0.25rem;
        }

        .option-group {
          margin-bottom: 1.5rem;
        }

        .option-group h4 {
          color: var(--dark-gray);
          margin-bottom: 0.75rem;
        }

        .flavor-options,
        .size-options,
        .drink-options,
        .item-options {
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
          text-align: left;
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
          margin: 1.5rem 0;
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
          .size-options,
          .drink-options,
          .item-options {
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