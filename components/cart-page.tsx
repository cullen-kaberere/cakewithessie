"use client"

import { useCart } from "@/contexts/cart-context"
import Link from "next/link"

export default function CartPage() {
  const { items, removeItem, updateQuantity, clearCart, getTotalPrice } = useCart()

  const handleCheckout = () => {
    if (items.length === 0) return

    let orderDetails = `🛒 *Complete Order from Cakes With Essie*\n\n`

    items.forEach((item, index) => {
      orderDetails += `*${index + 1}. ${item.title}*\n`
      if (item.flavor) orderDetails += `   Flavor: ${item.flavor}\n`
      if (item.size) orderDetails += `   Size: ${item.size}\n`
      if (item.drink) orderDetails += `   Drink: ${item.drink}\n`
      orderDetails += `   Quantity: ${item.quantity}\n`
      orderDetails += `   Price: $${item.price * item.quantity}\n`
      if (item.preparationTime) orderDetails += `   Prep Time: ${item.preparationTime}\n`
      orderDetails += `\n`
    })

    orderDetails += `*Total Amount: $${getTotalPrice()}*\n\n`
    orderDetails += `Please confirm this order and let me know the next steps for payment and delivery. Thank you!`

    const whatsappUrl = `https://wa.me/1234567890?text=${encodeURIComponent(orderDetails)}`
    window.open(whatsappUrl, "_blank")
  }

  return (
    <section className="section">
      <div className="container">
        <h1 style={{ color: "var(--primary-pink)", textAlign: "center", marginBottom: "2rem" }}>Your Cart</h1>

        {items.length === 0 ? (
          <div style={{ textAlign: "center", padding: "3rem 0" }}>
            <p style={{ fontSize: "1.2rem", color: "var(--dark-gray)", marginBottom: "2rem" }}>Your cart is empty</p>
            <Link href="/cakes" className="btn btn-primary" style={{ marginRight: "1rem" }}>
              Browse Cakes
            </Link>
            <Link href="/treats" className="btn btn-secondary">
              Browse Treats
            </Link>
          </div>
        ) : (
          <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr", gap: "3rem", alignItems: "start" }}>
            <div className="cart-items-list">
              {items.map((item) => (
                <div key={item.id} className="cart-item-card">
                  <div className="item-image">
                    <img src={item.image || "/placeholder.svg"} alt={item.title} />
                  </div>
                  <div className="item-info">
                    <h3>{item.title}</h3>
                    {item.flavor && <p>Flavor: {item.flavor}</p>}
                    {item.size && <p>Size: {item.size}</p>}
                    {item.drink && <p>Drink: {item.drink}</p>}
                    {item.preparationTime && <p>Prep Time: {item.preparationTime}</p>}
                  </div>
                  <div className="item-controls">
                    <div className="quantity-controls">
                      <button className="quantity-btn" onClick={() => updateQuantity(item.id, item.quantity - 1)}>
                        -
                      </button>
                      <span className="quantity-display">{item.quantity}</span>
                      <button className="quantity-btn" onClick={() => updateQuantity(item.id, item.quantity + 1)}>
                        +
                      </button>
                    </div>
                    <p className="item-price">${item.price * item.quantity}</p>
                    <button className="remove-btn" onClick={() => removeItem(item.id)}>
                      Remove
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <div className="cart-summary">
              <div className="summary-card">
                <h3>Order Summary</h3>
                <div className="summary-line">
                  <span>Items ({items.reduce((total, item) => total + item.quantity, 0)})</span>
                  <span>${getTotalPrice()}</span>
                </div>
                <div className="summary-total">
                  <span>Total</span>
                  <span>${getTotalPrice()}</span>
                </div>
                <button className="btn btn-primary checkout-btn" onClick={handleCheckout}>
                  Checkout via WhatsApp
                </button>
                <button className="btn btn-secondary" onClick={clearCart} style={{ marginTop: "1rem" }}>
                  Clear Cart
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      <style jsx>{`
        .cart-items-list {
          display: flex;
          flex-direction: column;
          gap: 1.5rem;
        }

        .cart-item-card {
          display: grid;
          grid-template-columns: 120px 1fr auto;
          gap: 1.5rem;
          padding: 1.5rem;
          background: white;
          border-radius: var(--border-radius);
          box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
          align-items: center;
        }

        .item-image {
          width: 120px;
          height: 120px;
          border-radius: var(--border-radius);
          overflow: hidden;
        }

        .item-image img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        .item-info h3 {
          color: var(--primary-pink);
          margin-bottom: 0.5rem;
        }

        .item-info p {
          color: var(--dark-gray);
          margin: 0.25rem 0;
          font-size: 0.9rem;
        }

        .item-controls {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 1rem;
        }

        .quantity-controls {
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }

        .quantity-btn {
          width: 35px;
          height: 35px;
          border: 2px solid var(--primary-pink);
          background: white;
          color: var(--primary-pink);
          border-radius: 50%;
          cursor: pointer;
          transition: var(--transition);
          font-weight: bold;
        }

        .quantity-btn:hover {
          background: var(--primary-pink);
          color: white;
        }

        .quantity-display {
          font-weight: bold;
          color: var(--dark-gray);
          min-width: 30px;
          text-align: center;
        }

        .item-price {
          color: var(--primary-pink);
          font-weight: 600;
          font-size: 1.1rem;
          margin: 0;
        }

        .remove-btn {
          background: none;
          border: none;
          color: #dc3545;
          cursor: pointer;
          font-size: 0.9rem;
          text-decoration: underline;
        }

        .remove-btn:hover {
          color: #c82333;
        }

        .summary-card {
          background: white;
          padding: 2rem;
          border-radius: var(--border-radius);
          box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
          position: sticky;
          top: 100px;
        }

        .summary-card h3 {
          color: var(--primary-pink);
          margin-bottom: 1.5rem;
          text-align: center;
        }

        .summary-line {
          display: flex;
          justify-content: space-between;
          margin-bottom: 1rem;
          color: var(--dark-gray);
        }

        .summary-total {
          display: flex;
          justify-content: space-between;
          font-weight: bold;
          font-size: 1.2rem;
          color: var(--primary-pink);
          border-top: 2px solid var(--light-pink);
          padding-top: 1rem;
          margin-bottom: 2rem;
        }

        .checkout-btn {
          width: 100%;
          padding: 1rem;
          font-size: 1.1rem;
        }

        @media (max-width: 768px) {
          div[style*="grid-template-columns: 2fr 1fr"] {
            grid-template-columns: 1fr !important;
          }
          
          .cart-item-card {
            grid-template-columns: 80px 1fr auto;
            gap: 1rem;
            padding: 1rem;
          }
          
          .item-image {
            width: 80px;
            height: 80px;
          }
          
          .summary-card {
            position: static;
          }
        }
      `}</style>
    </section>
  )
}
