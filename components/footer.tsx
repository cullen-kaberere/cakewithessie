import Link from "next/link"

export default function Footer() {
  return (
    <footer style={{ backgroundColor: "var(--light-gray)", padding: "3rem 0 1rem" }}>
      <div className="container">
        <div className="grid grid-3" style={{ marginBottom: "2rem" }}>
          <div>
            <h3 style={{ color: "var(--primary-pink)", marginBottom: "1rem" }}>Cakes With Essie</h3>
            <p style={{ color: "var(--dark-gray)" }}>
              Creating beautiful, delicious cakes and treats for all your special occasions.
            </p>
          </div>

          <div>
            <h4 style={{ marginBottom: "1rem" }}>Quick Links</h4>
            <ul style={{ listStyle: "none" }}>
              <li style={{ marginBottom: "0.5rem" }}>
                <Link href="/" style={{ color: "var(--dark-gray)", textDecoration: "none" }}>
                  Home
                </Link>
              </li>
              <li style={{ marginBottom: "0.5rem" }}>
                <Link href="/cakes" style={{ color: "var(--dark-gray)", textDecoration: "none" }}>
                  Cakes
                </Link>
              </li>
              <li style={{ marginBottom: "0.5rem" }}>
                <Link href="/treats" style={{ color: "var(--dark-gray)", textDecoration: "none" }}>
                  Treats
                </Link>
              </li>
              <li style={{ marginBottom: "0.5rem" }}>
                <Link href="/gallery" style={{ color: "var(--dark-gray)", textDecoration: "none" }}>
                  Gallery
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 style={{ marginBottom: "1rem" }}>Follow Us</h4>
            <div style={{ display: "flex", gap: "1rem" }}>
              <a href="#" style={{ fontSize: "1.5rem", textDecoration: "none" }}>
                📷
              </a>
              <a href="#" style={{ fontSize: "1.5rem", textDecoration: "none" }}>
                📘
              </a>
              <a href="#" style={{ fontSize: "1.5rem", textDecoration: "none" }}>
                🎵
              </a>
              <a href="#" style={{ fontSize: "1.5rem", textDecoration: "none" }}>
                💬
              </a>
            </div>
          </div>
        </div>

        <div
          style={{
            borderTop: "1px solid var(--light-pink)",
            paddingTop: "1rem",
            textAlign: "center",
            color: "var(--dark-gray)",
          }}
        >
          <p>&copy; Cakes With Essie 2025. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
