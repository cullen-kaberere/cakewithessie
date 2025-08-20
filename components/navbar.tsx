"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { useCart } from "@/contexts/cart-context"

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
          Cakes With Essie
        </Link>

        <ul className="nav-links">
          <li>
            <Link href="/" className="nav-link">
              Home
            </Link>
          </li>
          <li>
            <Link href="/cakes" className="nav-link">
              Cakes
            </Link>
          </li>
          <li>
            <Link href="/treats" className="nav-link">
              Treats
            </Link>
          </li>
          <li>
            <Link href="/gallery" className="nav-link">
              Gallery
            </Link>
          </li>
          <li>
            <button className="cart-icon" onClick={() => setIsCartOpen(true)}>
              🛒{cartCount > 0 && <span className="cart-count">{cartCount}</span>}
            </button>
          </li>
        </ul>

        <button className="mobile-menu-toggle">☰</button>
      </div>
    </nav>
  )
}
