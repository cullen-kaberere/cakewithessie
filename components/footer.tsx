"use client"

import Link from "next/link"
import { FiInstagram, FiFacebook, FiTwitter, FiMessageCircle, FiPhone, FiMail, FiMapPin } from "react-icons/fi"

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-content">
          {/* Brand Section */}
          <div className="footer-section">
            <div className="brand-info">
              <h3 className="brand-title">Cakes With Essie</h3>
              <p className="brand-description">
                Creating beautiful, delicious cakes and treats for all your special occasions. 
                Made with love and the finest ingredients.
              </p>
              <div className="contact-info">
                <div className="contact-item">
                  <FiPhone className="contact-icon" />
                  <span>+254 712 345 678</span>
                </div>
                <div className="contact-item">
                  <FiMail className="contact-icon" />
                  <span>info@cakeswithesie.com</span>
                </div>
                <div className="contact-item">
                  <FiMapPin className="contact-icon" />
                  <span>Nairobi, Kenya</span>
                </div>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div className="footer-section">
            <h4 className="section-title">Quick Links</h4>
            <ul className="footer-links">
              <li>
                <Link href="/" className="footer-link">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/cakes" className="footer-link">
                  Cakes
                </Link>
              </li>
              <li>
                <Link href="/treats" className="footer-link">
                  Treats & Packages
                </Link>
              </li>
              <li>
                <Link href="/gallery" className="footer-link">
                  Gallery
                </Link>
              </li>
              <li>
                <Link href="/about" className="footer-link">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/contact" className="footer-link">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Social Media & Contact */}
          <div className="footer-section">
            <h4 className="section-title">Connect With Us</h4>
            <p className="social-description">
              Follow us for the latest updates, promotions, and behind-the-scenes content!
            </p>
            
            <div className="social-links">
              <a
                href="https://instagram.com/cakeswithesie"
                target="_blank"
                rel="noopener noreferrer"
                className="social-link"
                aria-label="Instagram"
              >
                <FiInstagram size={20} />
              </a>
              <a
                href="https://facebook.com/cakeswithesie"
                target="_blank"
                rel="noopener noreferrer"
                className="social-link"
                aria-label="Facebook"
              >
                <FiFacebook size={20} />
              </a>
              <a
                href="https://twitter.com/cakeswithesie"
                target="_blank"
                rel="noopener noreferrer"
                className="social-link"
                aria-label="Twitter"
              >
                <FiTwitter size={20} />
              </a>
              <a
                href="https://wa.me/254712345678"
                target="_blank"
                rel="noopener noreferrer"
                className="social-link"
                aria-label="WhatsApp"
              >
                <FiMessageCircle size={20} />
              </a>
            </div>

            {/* <div className="newsletter">
              <h5 className="newsletter-title">Stay Updated</h5>
              <p className="newsletter-text">Get exclusive offers and updates</p>
              <div className="newsletter-form">
                <input 
                  type="email" 
                  placeholder="Enter your email" 
                  className="newsletter-input"
                />
                <button className="newsletter-btn">
                  Subscribe
                </button>
              </div>
            </div> */}
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="footer-bottom">
          <div className="footer-bottom-content">
            <p className="copyright">
              &copy; 2025 Cakes With Essie. All rights reserved.
            </p>
            {/* <div className="legal-links">
              <Link href="/privacy" className="legal-link">
                Privacy Policy
              </Link>
              <Link href="/terms" className="legal-link">
                Terms of Service
              </Link>
              <Link href="/refund" className="legal-link">
                Refund Policy
              </Link>
            </div> */}
          </div>
        </div>
      </div>

      <style jsx>{`
        .footer {
          background: linear-gradient(135deg, var(--soft-pink) 0%, var(--light-gray) 100%);
          padding: 4rem 0 0;
          margin-top: auto;
        }

        .footer-content {
          display: grid;
          grid-template-columns: 2fr 1fr 1.5fr;
          gap: 3rem;
          margin-bottom: 3rem;
        }

        .footer-section {
          display: flex;
          flex-direction: column;
        }

        .brand-title {
          color: var(--primary-pink);
          font-size: 1.5rem;
          font-weight: 700;
          margin-bottom: 1rem;
          font-family: var(--font-serif);
        }

        .brand-description {
          color: var(--dark-gray);
          line-height: 1.6;
          margin-bottom: 1.5rem;
          font-size: 0.95rem;
        }

        .contact-info {
          display: flex;
          flex-direction: column;
          gap: 0.75rem;
        }

        .contact-item {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          color: var(--dark-gray);
          font-size: 0.9rem;
        }

        .contact-icon {
          color: var(--primary-pink);
          flex-shrink: 0;
        }

        .section-title {
          color: var(--primary-pink);
          font-size: 1.1rem;
          font-weight: 600;
          margin-bottom: 1.25rem;
          position: relative;
        }

        .section-title::after {
          content: '';
          position: absolute;
          bottom: -0.5rem;
          left: 0;
          width: 30px;
          height: 2px;
          background: var(--primary-pink);
        }

        .footer-links {
          list-style: none;
          display: flex;
          flex-direction: column;
          gap: 0.75rem;
        }

        .footer-link {
          color: var(--dark-gray);
          text-decoration: none;
          font-size: 0.95rem;
          transition: var(--transition);
          display: inline-block;
        }

        .footer-link:hover {
          color: var(--primary-pink);
          transform: translateX(5px);
        }

        .social-description {
          color: var(--dark-gray);
          font-size: 0.9rem;
          margin-bottom: 1.5rem;
          line-height: 1.5;
        }

        .social-links {
          display: flex;
          gap: 1rem;
          margin-bottom: 2rem;
        }

        .social-link {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 45px;
          height: 45px;
          background: var(--white);
          color: var(--primary-pink);
          border-radius: 50%;
          text-decoration: none;
          transition: var(--transition);
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
        }

        .social-link:hover {
          background: var(--primary-pink);
          color: var(--white);
          transform: translateY(-2px);
          box-shadow: 0 4px 12px rgba(255, 105, 180, 0.3);
        }

        .newsletter {
          background: var(--white);
          padding: 1.5rem;
          border-radius: 12px;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
        }

        .newsletter-title {
          color: var(--primary-pink);
          font-size: 1rem;
          font-weight: 600;
          margin-bottom: 0.5rem;
        }

        .newsletter-text {
          color: var(--dark-gray);
          font-size: 0.85rem;
          margin-bottom: 1rem;
        }

        .newsletter-form {
          display: flex;
          gap: 0.5rem;
        }

        .newsletter-input {
          flex: 1;
          padding: 0.75rem;
          border: 1px solid var(--border);
          border-radius: 8px;
          font-size: 0.9rem;
          outline: none;
          transition: var(--transition);
        }

        .newsletter-input:focus {
          border-color: var(--primary-pink);
          box-shadow: 0 0 0 3px rgba(255, 105, 180, 0.1);
        }

        .newsletter-btn {
          padding: 0.75rem 1rem;
          background: var(--primary-pink);
          color: var(--white);
          border: none;
          border-radius: 8px;
          font-weight: 600;
          font-size: 0.9rem;
          cursor: pointer;
          transition: var(--transition);
          white-space: nowrap;
        }

        .newsletter-btn:hover {
          background: #ff1493;
          transform: translateY(-1px);
        }

        .footer-bottom {
          border-top: 1px solid var(--light-pink);
          padding: 1.5rem 0;
          background: rgba(255, 255, 255, 0.5);
          width: 100%;
          text-align: center;
        }

        .footer-bottom-content {
          display: flex;
          justify-content: space-between;
          align-items: center;
          width: 100%;
          text-align: center;
        }

        .copyright {
          color: var(--dark-gray);
          font-size: 0.9rem;
          margin: 0;
        }

        .legal-links {
          display: flex;
          gap: 1.5rem;
        }

        .legal-link {
          color: var(--dark-gray);
          text-decoration: none;
          font-size: 0.85rem;
          transition: var(--transition);
        }

        .legal-link:hover {
          color: var(--primary-pink);
        }

        /* Responsive Design */
        @media (max-width: 1024px) {
          .footer-content {
            grid-template-columns: 1fr 1fr;
            gap: 2rem;
          }
        }

        @media (max-width: 768px) {
          .footer {
            padding: 3rem 0 0;
          }

          .footer-content {
            grid-template-columns: 1fr;
            gap: 2.5rem;
          }

          .footer-bottom-content {
            flex-direction: column;
            gap: 1rem;
            text-align: center;
          }

          .legal-links {
            justify-content: center;
          }

          .social-links {
            justify-content: center;
          }

          .newsletter-form {
            flex-direction: column;
          }
        }

        @media (max-width: 480px) {
          .footer {
            padding: 2rem 0 0;
          }

          .legal-links {
            flex-direction: column;
            gap: 0.5rem;
          }

          .contact-item {
            font-size: 0.85rem;
          }
        }

        /* Dark Mode Support */
        .dark .footer {
          background: linear-gradient(135deg, var(--muted) 0%, var(--card) 100%);
        }

        .dark .brand-description,
        .dark .contact-item,
        .dark .footer-link,
        .dark .social-description,
        .dark .copyright,
        .dark .legal-link {
          color: var(--muted-foreground);
        }

        .dark .social-link {
          background: var(--card);
          color: var(--primary-pink);
        }

        .dark .social-link:hover {
          background: var(--primary-pink);
          color: var(--white);
        }

        .dark .newsletter {
          background: var(--card);
          border: 1px solid var(--border);
        }

        .dark .newsletter-input {
          background: var(--background);
          border-color: var(--border);
          color: var(--foreground);
        }

        .dark .footer-bottom {
          background: rgba(0, 0, 0, 0.2);
          border-top-color: var(--border);
        }
      `}</style>
    </footer>
  )
}