"use client"

import { useState } from "react"
import { useCart } from "@/contexts/cart-context"
import { HiX, HiMinus, HiPlus, HiShoppingCart, HiChevronDown, HiChevronUp } from "react-icons/hi"

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

// Addons pricing
const ADDONS = {
  EDIBLE: [
    { id: "edible-1", name: "Black Grad Cap", price: 500 },
    { id: "edible-2", name: "Custom Grad Cap", price: 600 },
    { id: "edible-3", name: "Fondant Rose", price: 300 },
    { id: "edible-4", name: "Pearls (sweets)", price: 100 },
    { id: "edible-5", name: "Chocolate Toppers", price: 300 },
    { id: "edible-6", name: "Oreos", price: 250 },
    { id: "edible-7", name: "Custom Bow (large)", price: 1000 },
    { id: "edible-8", name: "Rainbow", price: 1000 },
    { id: "edible-9", name: "Custom Unicorn Horn (large)", price: 1000 },
    { id: "edible-10", name: "Teddy Bear", price: 600 },
    { id: "edible-11", name: "Animated Doll (medium)", price: 600 },
    { id: "edible-12", name: "Strawberries (berry fruits)", price: 400 },
    { id: "edible-13", name: "Baby Shoes", price: 500 },
    { id: "edible-14", name: "Cupcake/Cake Edible Print", price: 1000 }
  ],
  NON_EDIBLE: [
    { id: "non-edible-1", name: "A6 Custom Card", price: 250 },
    { id: "non-edible-2", name: "Ribbons (6)", price: 200 },
    { id: "non-edible-3", name: "Animated Paper Toppers", price: 1000 },
    { id: "non-edible-4", name: "Acrylic Name Toppers", price: 600 },
    { id: "non-edible-5", name: "Paper Name Toppers", price: 300 },
    { id: "non-edible-6", name: "Wavy Candles", price: 350 },
    { id: "non-edible-7", name: "Butterflies", price: 350 },
    { id: "non-edible-8", name: "Placard Numbers", price: 300 },
    { id: "non-edible-9", name: "Candle Numbers", price: 150 },
    { id: "non-edible-10", name: "Small Tiara", price: 400 },
    { id: "non-edible-11", name: "Big Tiara", price: 500 },
    { id: "non-edible-12", name: "Polaroids (10)", price: 500 },
    { id: "non-edible-13", name: "Spheres", price: 1000 },
    { id: "non-edible-14", name: "Flowers (40-50 stems)", price: 2000 }
  ]
}

export default function TreatModal({ treat, onClose }: TreatModalProps) {
  const [selectedFlavor, setSelectedFlavor] = useState<FlavorOption>(treat.flavors?.[0] || { name: "", price: treat.basePrice })
  const [selectedSize, setSelectedSize] = useState(treat.sizes[0])
  const [selectedDrink, setSelectedDrink] = useState(treat.drinkOptions?.[0] || "")
  const [selectedItem, setSelectedItem] = useState(treat.items?.[0] || { name: "", price: treat.basePrice })
  const [quantity, setQuantity] = useState(1)
  const [selectedAddons, setSelectedAddons] = useState<{id: string, name: string, price: number}[]>([])
  const [dropdownOpen, setDropdownOpen] = useState({
    edible: false,
    nonEdible: false
  })
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

  const calculateAddonsPrice = () => {
    return selectedAddons.reduce((total, addon) => total + addon.price, 0);
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
    
    return (price + calculateAddonsPrice()) * quantity
  }

  const totalPrice = getCurrentPrice()

  const handleAddonToggle = (addon: {id: string, name: string, price: number}) => {
    if (selectedAddons.some(a => a.id === addon.id)) {
      setSelectedAddons(prev => prev.filter(a => a.id !== addon.id));
    } else {
      setSelectedAddons(prev => [...prev, addon]);
    }
  }

  const toggleDropdown = (type: 'edible' | 'nonEdible') => {
    setDropdownOpen(prev => ({
      ...prev,
      [type]: !prev[type]
    }));
  }

  const handleAddToCart = () => {
    const addonsDescription = selectedAddons.map(addon => addon.name);
    const addonsText = addonsDescription.length > 0 ? ` with ${addonsDescription.join(", ")}` : '';

    const cartItem = {
      title: `${treat.title}${addonsText}`,
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
          <HiX />
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

            {/* Addons Section with Modern Dropdowns */}
            <div className="option-group">
              <div className="dropdown-header" onClick={() => toggleDropdown('edible')}>
                <h4>Edible Toppers</h4>
                {dropdownOpen.edible ? <HiChevronUp /> : <HiChevronDown />}
              </div>
              {dropdownOpen.edible && (
                <div className="dropdown-content">
                  <div className="addons-grid">
                    {ADDONS.EDIBLE.map((addon) => (
                      <label 
                        key={addon.id}
                        className={`addon-option ${selectedAddons.some(a => a.id === addon.id) ? "selected" : ""}`}
                      >
                        <input
                          type="checkbox"
                          checked={selectedAddons.some(a => a.id === addon.id)}
                          onChange={() => handleAddonToggle(addon)}
                        />
                        <span className="addon-checkmark"></span>
                        <span className="addon-info">
                          <span className="addon-name">{addon.name}</span>
                          <span className="addon-price">+ Ksh {addon.price}</span>
                        </span>
                      </label>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <div className="option-group">
              <div className="dropdown-header" onClick={() => toggleDropdown('nonEdible')}>
                <h4>Non-Edible Toppers</h4>
                {dropdownOpen.nonEdible ? <HiChevronUp /> : <HiChevronDown />}
              </div>
              {dropdownOpen.nonEdible && (
                <div className="dropdown-content">
                  <div className="addons-grid">
                    {ADDONS.NON_EDIBLE.map((addon) => (
                      <label 
                        key={addon.id}
                        className={`addon-option ${selectedAddons.some(a => a.id === addon.id) ? "selected" : ""}`}
                      >
                        <input
                          type="checkbox"
                          checked={selectedAddons.some(a => a.id === addon.id)}
                          onChange={() => handleAddonToggle(addon)}
                        />
                        <span className="addon-checkmark"></span>
                        <span className="addon-info">
                          <span className="addon-name">{addon.name}</span>
                          <span className="addon-price">+ Ksh {addon.price}</span>
                        </span>
                      </label>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <div className="option-group">
              <h4>Quantity:</h4>
              <div className="quantity-controls">
                <button className="quantity-btn" onClick={() => setQuantity(Math.max(1, quantity - 1))}>
                  <HiMinus />
                </button>
                <span className="quantity-display">{quantity}</span>
                <button className="quantity-btn" onClick={() => setQuantity(quantity + 1)}>
                  <HiPlus />
                </button>
              </div>
            </div>

            <div className="price-summary">
              <div className="price-details">
                <div className="price-line">
                  <span>Base Price:</span>
                  <span>Ksh{treat.basePrice}</span>
                </div>
                
                {selectedAddons.map((addon) => (
                  <div key={addon.id} className="price-line extra-line">
                    <span>{addon.name}:</span>
                    <span>+ Ksh {addon.price}</span>
                  </div>
                ))}
                
                <div className="price-line">
                  <span>Quantity:</span>
                  <span>{quantity}</span>
                </div>
                
                <div className="total-price">
                  <span>Total:</span>
                  <span>Ksh{totalPrice}</span>
                </div>
              </div>
            </div>

            <button className="btn btn-primary add-to-cart-btn" onClick={handleAddToCart}>
              <HiShoppingCart className="cart-icon" />
              Add to Cart - Ksh{totalPrice}
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
          border-radius: 16px;
          margin-top: 3rem;
          box-shadow: 0 10px 40px rgba(0, 0, 0, 0.2);
        }

        .modal-details h2 {
          color: var(--primary-pink);
          margin-bottom: 1rem;
          font-size: 1.8rem;
          font-weight: 700;
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
          border-radius: 12px;
          margin-bottom: 1rem;
        }

        .notes-section p {
          margin: 0;
          color: var(--dark-gray);
        }

        .package-contents {
          background: var(--soft-pink);
          padding: 1rem;
          border-radius: 12px;
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
          font-size: 1.1rem;
          font-weight: 600;
        }

        .dropdown-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 0.75rem 1rem;
          background: var(--soft-pink);
          border-radius: 12px;
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .dropdown-header:hover {
          background: var(--light-pink);
        }

        .dropdown-header h4 {
          color: var(--primary-pink);
          margin: 0;
          font-size: 1.1rem;
          font-weight: 600;
        }

        .dropdown-content {
          padding: 1rem;
          background: var(--light-gray);
          border-radius: 12px;
          animation: slideDown 0.3s ease;
        }

        @keyframes slideDown {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
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
          border-radius: 8px;
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

        /* Addons Styles */
        .addons-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
          gap: 0.5rem;
          max-height: 300px;
          overflow-y: auto;
          padding: 0.5rem;
        }

        .addon-option {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          padding: 0.75rem;
          border: 2px solid var(--light-gray);
          background: white;
          border-radius: 8px;
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .addon-option:hover,
        .addon-option.selected {
          border-color: var(--primary-pink);
          background: var(--soft-pink);
        }

        .addon-option input {
          display: none;
        }

        .addon-checkmark {
          width: 18px;
          height: 18px;
          border: 2px solid var(--light-gray);
          border-radius: 4px;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: all 0.3s ease;
          flex-shrink: 0;
        }

        .addon-option input:checked + .addon-checkmark {
          background: var(--primary-pink);
          border-color: var(--primary-pink);
        }

        .addon-option input:checked + .addon-checkmark::after {
          content: "✓";
          color: white;
          font-size: 0.8rem;
        }

        .addon-info {
          display: flex;
          flex-direction: column;
          gap: 0.1rem;
        }

        .addon-name {
          font-size: 0.85rem;
          font-weight: 500;
          color: var(--dark-gray);
        }

        .addon-price {
          font-size: 0.75rem;
          color: var(--primary-pink);
          font-weight: 600;
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

        .price-summary {
          margin: 1.5rem 0;
          padding: 1rem;
          background: var(--soft-pink);
          border-radius: 12px;
        }

        .price-details {
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
        }

        .price-line {
          display: flex;
          justify-content: space-between;
          color: var(--dark-gray);
          font-size: 0.9rem;
        }

        .extra-line {
          color: var(--primary-pink);
          font-weight: 500;
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
          
          .addons-grid {
            grid-template-columns: 1fr;
          }
        }

        @media (max-width: 480px) {
          .modal-content {
            border-radius: 16px;
          }
          
          .modal-image img {
            height: 200px;
          }
          
          .modal-details h2 {
            font-size: 1.5rem;
            margin-bottom: 0.5rem;
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
        
        .dark .modal-details h2 {
          color: var(--primary-pink);
        }
        
        .dark .modal-description {
          color: var(--muted-foreground);
        }
        
        .dark .option-btn {
          background: var(--muted);
          border-color: var(--border);
          color: var(--foreground);
        }
        
        .dark .option-btn.active {
          background: var(--primary-pink);
          color: white;
          border-color: var(--primary-pink);
        }
        
        .dark .quantity-controls {
          background: var(--muted);
        }
        
        .dark .quantity-btn {
          background: var(--card);
          color: var(--primary-pink);
        }
        
        .dark .addon-option {
          background: var(--muted);
          border-color: var(--border);
          color: var(--foreground);
        }
        
        .dark .addon-option.selected {
          background: var(--soft-pink);
          border-color: var(--primary-pink);
        }
        
        .dark .dropdown-header {
          background: var(--muted);
        }
        
        .dark .dropdown-header:hover {
          background: var(--soft-pink);
        }
        
        .dark .dropdown-content {
          background: var(--muted);
        }
        
        .dark .notes-section,
        .dark .package-contents,
        .dark .price-summary {
          background: var(--muted);
        }
      `}</style>
    </div>
  )
}