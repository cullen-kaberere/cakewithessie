"use client"

import { useState } from "react"
import { useCart } from "@/contexts/cart-context"
import { HiX, HiMinus, HiPlus, HiShoppingCart, HiChevronDown, HiChevronUp } from "react-icons/hi"

interface CakeModalProps {
  cake: {
    id: number
    title: string
    image: string
    description: string
  }
  onClose: () => void
}

// Complete pricing matrix based on flavor and size
const flavorPriceMatrix: { [key: string]: { [size: string]: number } } = {
  "Vanilla": {
    "0.5kg": 1600,
    "1kg": 2000,
    "1.5kg": 3000,
    "2kg": 4000,
    "3kg": 6000
  },
  "Vanilla Oreo": {
    "0.5kg": 1800,
    "1kg": 2300,
    "1.5kg": 3400,
    "2kg": 4600,
    "3kg": 6900
  },
  "Chocolate": {
    "0.5kg": 2000,
    "1kg": 2500,
    "1.5kg": 3700,
    "2kg": 5000,
    "3kg": 7500
  },
  "Choc. Chip": {
    "0.5kg": 2300,
    "1kg": 2800,
    "1.5kg": 4200,
    "2kg": 5600,
    "3kg": 8400
  },
  "Choc. Mint": {
    "0.5kg": 2300,
    "1kg": 2800,
    "1.5kg": 4200,
    "2kg": 5600,
    "3kg": 8400
  },
  "Choc. Oreo": {
    "0.5kg": 2300,
    "1kg": 2800,
    "1.5kg": 4200,
    "2kg": 5600,
    "3kg": 8400
  },
  "Choc. Fudge": {
    "0.5kg": 2500,
    "1kg": 3000,
    "1.5kg": 4500,
    "2kg": 6000,
    "3kg": 9000
  },
  "Black Forest": {
    "0.5kg": 2500,
    "1kg": 3000,
    "1.5kg": 4500,
    "2kg": 6000,
    "3kg": 9000
  },
  "White Forest": {
    "0.5kg": 2500,
    "1kg": 3000,
    "1.5kg": 4500,
    "2kg": 6000,
    "3kg": 9000
  },
  "Red Velvet": {
    "0.5kg": 2500,
    "1kg": 3000,
    "1.5kg": 4500,
    "2kg": 6000,
    "3kg": 9000
  },
  "Vanilla Raspberry": {
    "0.5kg": 2500,
    "1kg": 3000,
    "1.5kg": 4500,
    "2kg": 6000,
    "3kg": 9000
  },
  "Fruit Cake": {
    "0.5kg": 2500,
    "1kg": 3000,
    "1.5kg": 4500,
    "2kg": 6000,
    "3kg": 9000
  },
  "Bubblegum": {
    "0.5kg": 2000,
    "1kg": 2500,
    "1.5kg": 3700,
    "2kg": 5000,
    "3kg": 7500
  },
  "Blueberry Layer": {
    "0.5kg": 2300,
    "1kg": 2800,
    "1.5kg": 4200,
    "2kg": 6400,
    "3kg": 9600
  },
  "Coconut": {
    "0.5kg": 1700,
    "1kg": 2800,
    "1.5kg": 4200,
    "2kg": 5600,
    "3kg": 8400
  },
  "Lemon": {
    "0.5kg": 1700,
    "1kg": 2200,
    "1.5kg": 3300,
    "2kg": 4400,
    "3kg": 6600
  },
  "Strawberry": {
    "0.5kg": 1700,
    "1kg": 2200,
    "1.5kg": 3300,
    "2kg": 4400,
    "3kg": 6600
  },
  "Mint": {
    "0.5kg": 1700,
    "1kg": 2200,
    "1.5kg": 3300,
    "2kg": 4400,
    "3kg": 6600
  },
  "Passion": {
    "0.5kg": 1700,
    "1kg": 2200,
    "1.5kg": 3300,
    "2kg": 4400,
    "3kg": 6600
  },
  "Pineapple": {
    "0.5kg": 1700,
    "1kg": 2200,
    "1.5kg": 3300,
    "2kg": 4400,
    "3kg": 6600
  },
  "Orange": {
    "0.5kg": 1700,
    "1kg": 2200,
    "1.5kg": 3300,
    "2kg": 4400,
    "3kg": 6600
  },
  "Pinacolada": {
    "0.5kg": 1700,
    "1kg": 2200,
    "1.5kg": 3300,
    "2kg": 4400,
    "3kg": 6600
  },
  "Blueberry": {
    "0.5kg": 1700,
    "1kg": 2200,
    "1.5kg": 3300,
    "2kg": 4400,
    "3kg": 6600
  },
  "Salted Caramel": {
    "0.5kg": 3000,
    "1kg": 3500,
    "1.5kg": 5200,
    "2kg": 7000,
    "3kg": 10500
  }
}

// All available flavors
const ALL_FLAVORS = [
  "Vanilla", "Vanilla Oreo", "Chocolate", "Choc. Chip", "Choc. Mint", 
  "Choc. Oreo", "Choc. Fudge", "Black Forest", "White Forest", 
  "Red Velvet", "Vanilla Raspberry", "Fruit Cake", "Bubblegum", 
  "Blueberry Layer", "Coconut", "Lemon", "Strawberry", "Mint", 
  "Passion", "Pineapple", "Orange", "Pinacolada", "Blueberry", 
  "Salted Caramel"
]

// All available sizes
const ALL_SIZES = ["0.5kg", "1kg", "1.5kg", "2kg", "3kg"]

// Flavored cakes sub-options
const FLAVORED_CAKES_OPTIONS = [
  "Lemon", "Strawberry", "Mint", "Passion", "Pineapple", 
  "Orange", "Pinacolada", "Blueberry"
]

// Extras pricing
const EXTRAS = {
  BLACK_FROSTING: 350,
  WHIPPING_CREAM: 700
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

export default function CakeModal({ cake, onClose }: CakeModalProps) {
  const [selectedFlavor, setSelectedFlavor] = useState("Vanilla")
  const [selectedFlavoredCake, setSelectedFlavoredCake] = useState("Lemon")
  const [selectedSize, setSelectedSize] = useState("0.5kg")
  const [quantity, setQuantity] = useState(1)
  const [selectedExtras, setSelectedExtras] = useState({
    blackFrosting: false,
    whippingCream: false,
    customTopper: false
  })
  const [selectedAddons, setSelectedAddons] = useState<{id: string, name: string, price: number}[]>([])
  const [dropdownOpen, setDropdownOpen] = useState({
    edible: false,
    nonEdible: false
  })
  const { addItem } = useCart()

  const getPrice = (flavor: string, size: string) => {
    // For flavored cakes, use the specific flavored cake price
    const actualFlavor = flavor === "Flavored Cakes" ? selectedFlavoredCake : flavor;
    const flavorPrices = flavorPriceMatrix[actualFlavor];
    
    if (flavorPrices && flavorPrices[size]) {
      return flavorPrices[size];
    }
    
    // Default to Vanilla pricing if not found
    return flavorPriceMatrix["Vanilla"]?.[size] || 0;
  }

  const calculateExtrasPrice = () => {
    let extrasTotal = 0;
    if (selectedExtras.blackFrosting) extrasTotal += EXTRAS.BLACK_FROSTING;
    if (selectedExtras.whippingCream) extrasTotal += EXTRAS.WHIPPING_CREAM;
    return extrasTotal;
  }

  const calculateAddonsPrice = () => {
    return selectedAddons.reduce((total, addon) => total + addon.price, 0);
  }

  const basePrice = getPrice(selectedFlavor, selectedSize);
  const extrasPrice = calculateExtrasPrice();
  const addonsPrice = calculateAddonsPrice();
  const totalPrice = (basePrice + extrasPrice + addonsPrice) * quantity;

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
    const extrasDescription = [];
    if (selectedExtras.blackFrosting) extrasDescription.push("Black Frosting");
    if (selectedExtras.whippingCream) extrasDescription.push("Whipping Cream");
    if (selectedExtras.customTopper) extrasDescription.push("Custom Topper");

    const addonsDescription = selectedAddons.map(addon => addon.name);

    const actualFlavor = selectedFlavor === "Flavored Cakes" 
      ? `${selectedFlavoredCake} (Flavored Cake)`
      : selectedFlavor;

    const extrasText = extrasDescription.length > 0 ? ` with ${extrasDescription.join(", ")}` : "";
    const addonsText = addonsDescription.length > 0 ? ` with ${addonsDescription.join(", ")}` : "";

    addItem({
      title: `${cake.title} - ${actualFlavor} (${selectedSize})${extrasText}${addonsText}`,
      image: cake.image,
      price: basePrice + extrasPrice + addonsPrice,
      quantity,
    })
    onClose()
  }

  const toggleExtra = (extra: keyof typeof selectedExtras) => {
    setSelectedExtras(prev => ({
      ...prev,
      [extra]: !prev[extra]
    }))
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
              <div className="cake-badge">Custom Order</div>
            </div>
          </div>

          <div className="modal-details">
            <div className="modal-header">
              <h2>{cake.title}</h2>
              <p className="modal-description">{cake.description}</p>
              <p className="price-note">
                * Prices vary by flavor and size. Select options to see exact pricing.
              </p>
            </div>

            <div className="options-container">
              <div className="option-group">
                <div className="option-header">
                  <h4>Select Flavor</h4>
                  <span className="selected-indicator">
                    {selectedFlavor === "Flavored Cakes" ? selectedFlavoredCake : selectedFlavor}
                  </span>
                </div>
                <div className="flavor-options">
                  {ALL_FLAVORS.map((flavor) => (
                    <button
                      key={flavor}
                      className={`flavor-option ${selectedFlavor === flavor ? "active" : ""}`}
                      onClick={() => setSelectedFlavor(flavor)}
                    >
                      <span className="flavor-dot"></span>
                      {flavor}
                      <span className="flavor-price">
                        Ksh{getPrice(flavor, "0.5kg")} (0.5kg)
                      </span>
                    </button>
                  ))}
                </div>

                {/* Flavored Cakes Sub-selection */}
                {selectedFlavor === "Flavored Cakes" && (
                  <div className="flavored-cakes-suboptions">
                    <h5>Choose Specific Flavor:</h5>
                    <div className="sub-flavor-options">
                      {FLAVORED_CAKES_OPTIONS.map((flavor) => (
                        <button
                          key={flavor}
                          className={`sub-flavor-option ${selectedFlavoredCake === flavor ? "active" : ""}`}
                          onClick={() => setSelectedFlavoredCake(flavor)}
                        >
                          {flavor}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              <div className="option-group">
                <div className="option-header">
                  <h4>Choose Size</h4>
                  <span className="size-guide">Tier cakes available from 3kg+</span>
                </div>
                <div className="size-options">
                  {ALL_SIZES.map((size) => (
                    <button
                      key={size}
                      className={`size-option ${selectedSize === size ? "active" : ""}`}
                      onClick={() => setSelectedSize(size)}
                    >
                      <span className="size-label">{size}</span>
                      <span className="size-price">Ksh{getPrice(selectedFlavor, size)}</span>
                      {size === "3kg" && <span className="tier-badge">Tier Available</span>}
                    </button>
                  ))}
                </div>
              </div>

              <div className="option-group">
                <div className="option-header">
                  <h4>Optional Extras</h4>
                </div>
                <div className="extras-options">
                  <label className="extra-option">
                    <input
                      type="checkbox"
                      checked={selectedExtras.blackFrosting}
                      onChange={() => toggleExtra('blackFrosting')}
                    />
                    <span className="checkmark"></span>
                    Black Frosting/Cakes (+ Ksh {EXTRAS.BLACK_FROSTING})
                  </label>
                  
                  <label className="extra-option">
                    <input
                      type="checkbox"
                      checked={selectedExtras.whippingCream}
                      onChange={() => toggleExtra('whippingCream')}
                    />
                    <span className="checkmark"></span>
                    Whipping Cream (+ Ksh {EXTRAS.WHIPPING_CREAM})
                  </label>
                  
                  <label className="extra-option">
                    <input
                      type="checkbox"
                      checked={selectedExtras.customTopper}
                      onChange={() => toggleExtra('customTopper')}
                    />
                    <span className="checkmark"></span>
                    Custom Topper (Price on request)
                  </label>
                </div>
              </div>

              {/* Addons Section */}
              <div className="option-group">
                <div className="option-header">
                  <h4>Select Addons</h4>
                </div>
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
                  <span>Base Price ({selectedFlavor === "Flavored Cakes" ? selectedFlavoredCake : selectedFlavor}, {selectedSize}):</span>
                  <span>Ksh{basePrice}</span>
                </div>
                
                {selectedExtras.blackFrosting && (
                  <div className="price-line extra-line">
                    <span>Black Frosting:</span>
                    <span>+ Ksh {EXTRAS.BLACK_FROSTING}</span>
                  </div>
                )}
                
                {selectedExtras.whippingCream && (
                  <div className="price-line extra-line">
                    <span>Whipping Cream:</span>
                    <span>+ Ksh {EXTRAS.WHIPPING_CREAM}</span>
                  </div>
                )}
                
                {selectedExtras.customTopper && (
                  <div className="price-line extra-line">
                    <span>Custom Topper:</span>
                    <span>Price on request</span>
                  </div>
                )}

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
          max-width: 1000px;
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
          grid-template-columns: 1fr 1.2fr;
          min-height: 500px;
        }

        .modal-image-section {
          position: relative;
          background: linear-gradient(135deg, var(--soft-pink) 0%, var(--light-gray) 100%);
          display: flex;
          //align-items: center;
          justify-content: center;
          padding: 2rem;
        }

        .modal-image {
          position: relative;
          margin-top: 30px;
          width: 100%;
          height: 520px;
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
          margin-bottom: 0.5rem;
        }

        .price-note {
          color: var(--muted-foreground);
          font-size: 0.8rem;
          font-style: italic;
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

        .selected-indicator {
          background: var(--soft-pink);
          color: var(--primary-pink);
          padding: 0.3rem 0.8rem;
          border-radius: 12px;
          font-size: 0.8rem;
          font-weight: 500;
        }

        .size-guide {
          color: var(--muted-foreground);
          font-size: 0.8rem;
        }

        .flavor-options {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(140px, 1fr));
          gap: 0.5rem;
          max-height: 200px;
          overflow-y: auto;
          padding: 0.5rem;
        }

        .flavor-option {
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          gap: 0.25rem;
          padding: 0.8rem;
          border: 2px solid var(--light-gray);
          background: white;
          border-radius: 12px;
          cursor: pointer;
          transition: all 0.3s ease;
          font-size: 0.9rem;
          text-align: left;
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

        .flavor-price {
          font-size: 0.7rem;
          color: var(--primary-pink);
          font-weight: 600;
        }

        .flavored-cakes-suboptions {
          margin-top: 1rem;
          padding: 1rem;
          background: var(--light-gray);
          border-radius: 12px;
        }

        .flavored-cakes-suboptions h5 {
          margin: 0 0 0.5rem 0;
          color: var(--dark-gray);
          font-size: 1rem;
        }

        .sub-flavor-options {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(100px, 1fr));
          gap: 0.5rem;
        }

        .sub-flavor-option {
          padding: 0.5rem;
          border: 2px solid var(--light-gray);
          background: white;
          border-radius: 8px;
          cursor: pointer;
          transition: all 0.3s ease;
          font-size: 0.8rem;
          text-align: center;
        }

        .sub-flavor-option:hover,
        .sub-flavor-option.active {
          border-color: var(--primary-pink);
          background: var(--soft-pink);
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
          position: relative;
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

        .tier-badge {
          position: absolute;
          top: -8px;
          right: -8px;
          background: var(--primary-pink);
          color: white;
          padding: 0.2rem 0.5rem;
          border-radius: 10px;
          font-size: 0.7rem;
          font-weight: 600;
        }

        .extras-options {
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
        }

        .extra-option {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          padding: 0.5rem;
          cursor: pointer;
          transition: all 0.3s ease;
          border-radius: 8px;
        }

        .extra-option:hover {
          background: var(--light-gray);
        }

        .extra-option input {
          display: none;
        }

        .checkmark {
          width: 18px;
          height: 18px;
          border: 2px solid var(--light-gray);
          border-radius: 4px;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: all 0.3s ease;
        }

        .extra-option input:checked + .checkmark {
          background: var(--primary-pink);
          border-color: var(--primary-pink);
        }

        .extra-option input:checked + .checkmark::after {
          content: "✓";
          color: white;
          font-size: 0.8rem;
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
          
          .flavor-options {
            grid-template-columns: repeat(2, 1fr);
          }
          
          .size-options {
            grid-template-columns: repeat(2, 1fr);
          }
          
          .addons-grid {
            grid-template-columns: 1fr;
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
            margin-bottom: 0.5rem;
          }
          
          .flavor-options {
            grid-template-columns: 1fr;
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
        .dark .size-option,
        .dark .sub-flavor-option,
        .dark .addon-option {
          background: var(--muted);
          border-color: var(--border);
          color: var(--foreground);
        }
        
        .dark .flavor-option.active,
        .dark .size-option.active,
        .dark .sub-flavor-option.active,
        .dark .addon-option.selected {
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
        
        .dark .extra-option:hover,
        .dark .addon-option:hover {
          background: var(--muted);
        }
        
        .dark .flavored-cakes-suboptions {
          background: var(--muted);
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
      `}</style>
    </div>
  )
}