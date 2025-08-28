"use client"

import { useCart } from "@/contexts/cart-context"

export default function CartModal() {
  const { items, removeItem, updateQuantity, clearCart, getTotalPrice, isCartOpen, setIsCartOpen } = useCart()

  if (!isCartOpen) return null

  const handleCheckout = () => {
    if (items.length === 0) return

    let orderDetails = ` *Hey, I would like to Order from Cakes With Essie* \n\n`

    items.forEach((item, index) => {
      orderDetails += `*${index + 1}. ${item.title}*\n`
      if (item.flavor) orderDetails += `    Flavor: ${item.flavor}\n`
      if (item.size) orderDetails += `    Size: ${item.size}\n`
      if (item.drink) orderDetails += `    Drink: ${item.drink}\n`
      orderDetails += `   ✖️ Quantity: ${item.quantity}\n`
      orderDetails += `   💰 Price: Ksh${item.price * item.quantity}\n`
      if (item.preparationTime) orderDetails += `   ⏰ Prep Time: ${item.preparationTime}\n`
      orderDetails += `\n`
    })

    orderDetails += `*💰 Total Amount: Ksh${getTotalPrice()}*\n\n`
    orderDetails += `Please confirm this order and let me know the next steps for payment and delivery. Thank you! 💖`

    const whatsappUrl = `https://wa.me/254747109922?text=${encodeURIComponent(orderDetails)}`
    window.open(whatsappUrl, "_blank")
  }

  return (
    <div className="cart-overlay" onClick={() => setIsCartOpen(false)}>
      <div className="cart-modal" onClick={(e) => e.stopPropagation()}>
        {/* Header */}
        <div className="cart-header">
          <div className="header-content">
            <h2>Your Cart </h2>
            <p>{items.length} item{items.length !== 1 ? 's' : ''} in your basket</p>
          </div>
          <button className="cart-close" onClick={() => setIsCartOpen(false)}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M18 6L6 18M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div className="cart-content">
          {items.length === 0 ? (
            <div className="empty-cart">
              <div className="empty-icon">
                <svg width="80" height="80" viewBox="0 0 24 24" fill="none" stroke="var(--primary-pink)" strokeWidth="1.5">
                  <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z" />
                  <path d="M3 6h18" />
                  <path d="M16 10a4 4 0 0 1-8 0" />
                </svg>
              </div>
              <h3>Your cart is empty</h3>
              <p>Add some sweet treats to get started!</p>
              <button className="btn btn-primary" onClick={() => setIsCartOpen(false)}>
                Browse Treats
              </button>
            </div>
          ) : (
            <>
              <div className="cart-items">
                {items.map((item) => (
                  <div key={item.id} className="cart-item">
                    <div className="item-image">
                      <img src={item.image || "/placeholder.svg"} alt={item.title} />
                      <div className="item-badge">{item.quantity}</div>
                    </div>
                    
                    <div className="item-details">
                      <h4>{item.title}</h4>
                      <div className="item-meta">
                        {item.flavor && (
                          <span className="meta-tag">
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                              <path d="M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0z" />
                            </svg>
                            {item.flavor}
                          </span>
                        )}
                        {item.size && (
                          <span className="meta-tag">
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                              <rect x="3" y="3" width="18" height="18" rx="2" />
                            </svg>
                            {item.size}
                          </span>
                        )}
                        {item.drink && (
                          <span className="meta-tag">
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                              <path d="M4 4h16c1.1 0 2 .9 2 2v2c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                              <path d="M4 10h16c1.1 0 2 .9 2 2v6c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2v-6c0-1.1.9-2 2-2z" />
                            </svg>
                            {item.drink}
                          </span>
                        )}
                      </div>
                      <p className="item-price">Ksh{(item.price * item.quantity).toLocaleString()}</p>
                    </div>
                    
                    <div className="item-controls">
                      <div className="quantity-controls">
                        <button 
                          className="quantity-btn" 
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          disabled={item.quantity <= 1}
                        >
                          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                            <path d="M5 12h14" />
                          </svg>
                        </button>
                        <span className="quantity-display">{item.quantity}</span>
                        <button className="quantity-btn" onClick={() => updateQuantity(item.id, item.quantity + 1)}>
                          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                            <path d="M12 5v14M5 12h14" />
                          </svg>
                        </button>
                      </div>
                      <button className="remove-btn" onClick={() => removeItem(item.id)}>
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <path d="M3 6h18M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
                        </svg>
                        Remove
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              <div className="cart-footer">
                <div className="order-summary">
                  <div className="summary-row">
                    <span>Subtotal</span>
                    <span>Ksh{getTotalPrice().toLocaleString()}</span>
                  </div>
                  <div className="summary-row">
                    <span>Delivery</span>
                    {/* <span className="free-delivery">Free</span> */}
                  </div>
                  <div className="summary-divider"></div>
                  <div className="summary-total">
                    <span>Total</span>
                    <span className="total-price">Ksh{getTotalPrice().toLocaleString()}</span>
                  </div>
                </div>

                <div className="cart-actions">
                  <button className="btn btn-secondary" onClick={clearCart}>
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M3 6h18M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
                    </svg>
                    Clear Cart
                  </button>
                  <button className="btn btn-primary checkout-btn" onClick={handleCheckout}>
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M20 12H4M12 4l8 8-8 8" />
                    </svg>
                    Checkout via WhatsApp
                  </button>
                </div>

                <div className="security-notice">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                  </svg>
                  <span>Secure checkout • No payment required here</span>
                </div>
              </div>
            </>
          )}
        </div>
      </div>

      <style jsx>{`
        .cart-overlay {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(0, 0, 0, 0.6);
          backdrop-filter: blur(8px);
          z-index: 1000;
          display: flex;
          justify-content: flex-end;
          animation: fadeIn 0.3s ease;
        }

        .cart-modal {
          background: linear-gradient(135deg, var(--white) 0%, var(--light-gray) 100%);
          width: 100%;
          max-width: 480px;
          height: 100vh;
          overflow-y: auto;
          display: flex;
          flex-direction: column;
          box-shadow: -4px 0 40px rgba(0, 0, 0, 0.15);
          animation: slideIn 0.3s ease;
        }

        .cart-header {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          padding: 2rem 1.5rem 1.5rem;
          background: linear-gradient(135deg, var(--primary-pink) 0%, #ff85c1 100%);
          color: white;
          position: relative;
        }

        .header-content h2 {
          margin: 0 0 0.25rem 0;
          font-size: 1.8rem;
          font-weight: 700;
          font-family: var(--font-serif);
          color: white;
        }

        .header-content p {
          margin: 0;
          opacity: 0.9;
          font-size: 0.95rem;
        }

        .cart-close {
          background: rgba(255, 255, 255, 0.2);
          border: none;
          border-radius: 50%;
          width: 40px;
          height: 40px;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: all 0.3s ease;
          color: white;
        }

        .cart-close:hover {
          background: rgba(255, 255, 255, 0.3);
          transform: rotate(90deg);
        }

        .cart-content {
          flex: 1;
          display: flex;
          flex-direction: column;
          padding: 0;
        }

        .empty-cart {
          flex: 1;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          padding: 3rem 2rem;
          text-align: center;
        }

        .empty-icon {
          margin-bottom: 1.5rem;
          opacity: 0.7;
        }

        .empty-cart h3 {
          color: var(--primary-pink);
          margin: 0 0 0.5rem 0;
          font-size: 1.5rem;
          font-family: var(--font-serif);
        }

        .empty-cart p {
          color: var(--dark-gray);
          margin: 0 0 2rem 0;
          opacity: 0.8;
        }

        .cart-items {
          flex: 1;
          padding: 1.5rem;
          overflow-y: auto;
        }

        .cart-item {
          display: grid;
          grid-template-columns: 70px 1fr auto;
          gap: 1rem;
          padding: 1.25rem;
          margin-bottom: 1rem;
          background: white;
          border-radius: 16px;
          box-shadow: 0 4px 20px rgba(255, 105, 180, 0.15);
          border: 1px solid var(--soft-pink);
          transition: all 0.3s ease;
          align-items: start;
        }

        .cart-item:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 30px rgba(255, 105, 180, 0.2);
        }

        .item-image {
          position: relative;
          width: 70px;
          height: 70px;
          border-radius: 12px;
          overflow: hidden;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
        }

        .item-image img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        .item-badge {
          position: absolute;
          top: -6px;
          right: -6px;
          background: var(--primary-pink);
          color: white;
          border-radius: 50%;
          width: 24px;
          height: 24px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 0.75rem;
          font-weight: 700;
          box-shadow: 0 2px 8px rgba(255, 105, 180, 0.4);
        }

        .item-details h4 {
          color: var(--dark-gray);
          margin: 0 0 0.75rem 0;
          font-size: 1rem;
          font-weight: 600;
          line-height: 1.3;
        }

        .item-meta {
          display: flex;
          flex-wrap: wrap;
          gap: 0.5rem;
          margin-bottom: 0.75rem;
        }

        .meta-tag {
          display: inline-flex;
          align-items: center;
          gap: 0.25rem;
          padding: 0.25rem 0.5rem;
          background: var(--soft-pink);
          color: var(--primary-pink);
          border-radius: 20px;
          font-size: 0.75rem;
          font-weight: 500;
        }

        .meta-tag svg {
          flex-shrink: 0;
        }

        .item-price {
          color: var(--primary-pink);
          font-weight: 700;
          font-size: 1.1rem;
          margin: 0;
        }

        .item-controls {
          display: flex;
          flex-direction: column;
          gap: 1rem;
          align-items: center;
        }

        .quantity-controls {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          background: var(--light-gray);
          padding: 0.5rem;
          border-radius: 12px;
        }

        .quantity-btn {
          width: 32px;
          height: 32px;
          border: none;
          background: white;
          color: var(--primary-pink);
          border-radius: 10px;
          cursor: pointer;
          transition: all 0.3s ease;
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
        }

        .quantity-btn:hover:not(:disabled) {
          background: var(--primary-pink);
          color: white;
          transform: scale(1.1);
        }

        .quantity-btn:disabled {
          opacity: 0.5;
          cursor: not-allowed;
        }

        .quantity-display {
          font-weight: 700;
          color: var(--dark-gray);
          min-width: 24px;
          text-align: center;
          font-size: 0.95rem;
        }

        .remove-btn {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          background: none;
          border: none;
          color: #dc3545;
          cursor: pointer;
          font-size: 0.8rem;
          font-weight: 500;
          padding: 0.5rem;
          border-radius: 8px;
          transition: all 0.3s ease;
        }

        .remove-btn:hover {
          background: rgba(220, 53, 69, 0.1);
          transform: translateY(-1px);
        }

        .cart-footer {
          border-top: 1px solid var(--border);
          padding: 2rem 1.5rem;
          background: white;
          margin-top: auto;
        }

        .order-summary {
          margin-bottom: 1.5rem;
        }

        .summary-row {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 0.75rem;
          color: var(--dark-gray);
          font-size: 0.95rem;
        }

        .free-delivery {
          color: #28a745;
          font-weight: 600;
        }

        .summary-divider {
          height: 1px;
          background: var(--border);
          margin: 1rem 0;
        }

        .summary-total {
          display: flex;
          justify-content: space-between;
          align-items: center;
          font-size: 1.2rem;
          font-weight: 700;
        }

        .total-price {
          color: var(--primary-pink);
          font-size: 1.4rem;
        }

        .cart-actions {
          display: flex;
          gap: 1rem;
          margin-bottom: 1rem;
        }

        .cart-actions .btn {
          flex: 1;
          padding: 1rem 1.5rem;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.5rem;
          font-weight: 600;
          border-radius: 12px;
          transition: all 0.3s ease;
        }

        .checkout-btn {
          background: linear-gradient(135deg, var(--primary-pink) 0%, #ff1493 100%);
          box-shadow: 0 4px 20px rgba(255, 105, 180, 0.3);
        }

        .checkout-btn:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 30px rgba(255, 105, 180, 0.4);
        }

        .security-notice {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.5rem;
          color: var(--muted-foreground);
          font-size: 0.8rem;
          padding: 1rem;
          background: var(--light-gray);
          border-radius: 12px;
          margin-top: 1rem;
        }

        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }

        @keyframes slideIn {
          from { transform: translateX(100%); }
          to { transform: translateX(0); }
        }

        @media (max-width: 768px) {
          .cart-modal {
            max-width: 100%;
          }
          
          .cart-header {
            padding: 1.5rem 1rem 1rem;
          }
          
          .header-content h2 {
            font-size: 1.5rem;
          }
          
          .cart-item {
            grid-template-columns: 60px 1fr;
            grid-template-rows: auto auto;
            gap: 1rem;
          }
          
          .item-controls {
            grid-column: 1 / -1;
            flex-direction: row;
            justify-content: space-between;
            align-items: center;
          }
          
          .cart-actions {
            flex-direction: column;
          }
        }

        /* Dark mode support */
        .dark .cart-modal {
          background: linear-gradient(135deg, var(--card) 0%, var(--muted) 100%);
        }

        .dark .cart-item {
          background: var(--card);
          border-color: var(--border);
        }

        .dark .quantity-controls {
          background: var(--muted);
        }

        .dark .quantity-btn {
          background: var(--background);
        }

        .dark .cart-footer {
          background: var(--card);
          border-color: var(--border);
        }

        .dark .security-notice {
          background: var(--muted);
        }
      `}</style>
    </div>
  )
}