"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { useCart } from "@/contexts/cart-context"
import { 
  HiShoppingCart, 
  HiHome, 
  HiCake, 
  HiSparkles,
  HiPhotograph
} from "react-icons/hi"
import { HiBars3 } from "react-icons/hi2"

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false)
  const { getTotalItems, setIsCartOpen } = useCart()

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const cartCount = getTotalItems()

  return (
    <nav className={`navbar ${isScrolled ? "scrolled" : ""}`}>
      <div className="navbar-container">
        <Link href="/" className="logo">
          {/* <HiSparkles className="logo-icon" /> */}
          <span className="logo-text">Cakes With Essie</span>
        </Link>

        <ul className="nav-links">
          <li>
            <Link href="/" className="nav-link">
              <HiHome className="nav-icon" />
              <span className="nav-text">Home</span>
            </Link>
          </li>
          <li>
            <Link href="/cakes" className="nav-link">
              <HiCake className="nav-icon" />
              <span className="nav-text">Cakes</span>
            </Link>
          </li>
          <li>
            <Link href="/treats" className="nav-link">
              <HiSparkles className="nav-icon" />
              <span className="nav-text">Treats</span>
            </Link>
          </li>
          <li>
            <Link href="/gallery" className="nav-link">
              <HiPhotograph className="nav-icon" />
              <span className="nav-text">Gallery</span>
            </Link>
          </li>
          <li>
            <button 
              className="nav-link cart-button" 
              onClick={() => setIsCartOpen(true)}
              aria-label="Open shopping cart"
            >
              <HiShoppingCart className="nav-icon" />
              <span className="nav-text">Cart</span>
              {cartCount > 0 && <span className="cart-count">{cartCount}</span>}
            </button>
          </li>
        </ul>

        <button className="mobile-menu-toggle" aria-label="Open mobile menu">
          <HiBars3 />
        </button>
      </div>

      <style jsx>{`
        .logo {
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }
        
        .logo-icon {
          font-size: 1.5rem;
          color: var(--primary-pink);
        }
        
        .nav-link {
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }
        
        .nav-icon {
          font-size: 1.2rem;
        }
        
        .cart-button {
          background: none;
          border: none;
          cursor: pointer;
          font-family: inherit;
          font-size: inherit;
          padding: 0;
        }
        
        @media (max-width: 768px) {
          .nav-text {
            display: none;
          }
          
          .nav-link {
            padding: 0.5rem;
          }
          
          .logo-text {
            font-size: 1.5rem;
          }
        }
      `}</style>
    </nav>
  )
}