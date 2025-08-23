"use client"

import { useCart } from "@/contexts/cart-context"

export default function CartModal() {
  const { items, removeItem, updateQuantity, clearCart, getTotalPrice, isCartOpen, setIsCartOpen } = useCart()

  if (!isCartOpen) return null

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
    <div className="cart-overlay" onClick={() => setIsCartOpen(false)}>
      <div className="cart-modal" onClick={(e) => e.stopPropagation()}>
        <div className="cart-header">
          <h2>Your Cart</h2>
          <button className="cart-close" onClick={() => setIsCartOpen(false)}>
            ×
          </button>
        </div>

        <div className="cart-content">
          {items.length === 0 ? (
            <div className="empty-cart">
              <p>Your cart is empty</p>
              <button className="btn btn-primary" onClick={() => setIsCartOpen(false)}>
                Continue Shopping
              </button>
            </div>
          ) : (
            <>
              <div className="cart-items">
                {items.map((item) => (
                  <div key={item.id} className="cart-item">
                    <div className="item-image">
                      <img src={item.image || "/placeholder.svg"} alt={item.title} />
                    </div>
                    <div className="item-details">
                      <h4>{item.title}</h4>
                      {item.flavor && <p>Flavor: {item.flavor}</p>}
                      {item.size && <p>Size: {item.size}</p>}
                      {item.drink && <p>Drink: {item.drink}</p>}
                      <p className="item-price">Ksh{item.price} each</p>
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
                      <button className="remove-btn" onClick={() => removeItem(item.id)}>
                        Remove
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              <div className="cart-footer">
                <div className="cart-total">
                  <h3>Total: Ksh{getTotalPrice()}</h3>
                </div>
                <div className="cart-actions">
                  <button className="btn btn-secondary" onClick={clearCart}>
                    Clear Cart
                  </button>
                  <button className="btn btn-primary" onClick={handleCheckout}>
                    Checkout via WhatsApp
                  </button>
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
          background: rgba(0, 0, 0, 0.5);
          z-index: 1000;
          display: flex;
          justify-content: flex-end;
        }

        .cart-modal {
          background: white;
          width: 100%;
          max-width: 500px;
          height: 100vh;
          overflow-y: auto;
          display: flex;
          flex-direction: column;
        }

        .cart-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 1.5rem;
          border-bottom: 1px solid var(--border);
          background: var(--soft-pink);
        }

        .cart-header h2 {
          color: var(--primary-pink);
          margin: 0;
        }

        .cart-close {
          background: none;
          border: none;
          font-size: 2rem;
          cursor: pointer;
          color: var(--primary-pink);
          width: 40px;
          height: 40px;
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 50%;
          transition: var(--transition);
        }

        .cart-close:hover {
          background: rgba(255, 105, 180, 0.1);
        }

        .cart-content {
          flex: 1;
          display: flex;
          flex-direction: column;
        }

        .empty-cart {
          flex: 1;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          padding: 2rem;
          text-align: center;
        }

        .empty-cart p {
          color: var(--dark-gray);
          margin-bottom: 2rem;
          font-size: 1.1rem;
        }

        .cart-items {
          flex: 1;
          padding: 1rem;
        }

        .cart-item {
          display: grid;
          grid-template-columns: 80px 1fr auto;
          gap: 1rem;
          padding: 1rem;
          border-bottom: 1px solid var(--border);
          align-items: start;
        }

        .item-image {
          width: 80px;
          height: 80px;
          border-radius: var(--border-radius);
          overflow: hidden;
        }

        .item-image img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        .item-details h4 {
          color: var(--primary-pink);
          margin: 0 0 0.5rem 0;
          font-size: 1rem;
        }

        .item-details p {
          color: var(--dark-gray);
          margin: 0.25rem 0;
          font-size: 0.9rem;
        }

        .item-price {
          color: var(--primary-pink);
          font-weight: 600;
        }

        .item-controls {
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
          align-items: center;
        }

        .quantity-controls {
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }

        .quantity-btn {
          width: 30px;
          height: 30px;
          border: 1px solid var(--primary-pink);
          background: white;
          color: var(--primary-pink);
          border-radius: 50%;
          cursor: pointer;
          transition: var(--transition);
          font-size: 1rem;
          font-weight: bold;
        }

        .quantity-btn:hover {
          background: var(--primary-pink);
          color: white;
        }

        .quantity-display {
          font-weight: bold;
          color: var(--dark-gray);
          min-width: 20px;
          text-align: center;
        }

        .remove-btn {
          background: none;
          border: none;
          color: #dc3545;
          cursor: pointer;
          font-size: 0.8rem;
          text-decoration: underline;
          transition: var(--transition);
        }

        .remove-btn:hover {
          color: #c82333;
        }

        .cart-footer {
          border-top: 1px solid var(--border);
          padding: 1.5rem;
          background: var(--light-gray);
        }

        .cart-total {
          text-align: center;
          margin-bottom: 1rem;
        }

        .cart-total h3 {
          color: var(--primary-pink);
          margin: 0;
          font-size: 1.5rem;
        }

        .cart-actions {
          display: flex;
          gap: 1rem;
        }

        .cart-actions .btn {
          flex: 1;
          padding: 0.75rem;
          text-align: center;
        }

        @media (max-width: 768px) {
          .cart-modal {
            max-width: 100%;
          }
          
          .cart-item {
            grid-template-columns: 60px 1fr auto;
            gap: 0.75rem;
          }
          
          .item-image {
            width: 60px;
            height: 60px;
          }
          
          .cart-actions {
            flex-direction: column;
          }
        }
      `}</style>
    </div>
  )
}
