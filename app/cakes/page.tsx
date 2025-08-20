import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import CakesGallery from "@/components/cakes-gallery"

export default function CakesPage() {
  return (
    <>
      <Navbar />
      <main style={{ paddingTop: "80px" }}>
        <section className="section">
          <div className="container">
            <div style={{ textAlign: "center", marginBottom: "3rem" }}>
              <h1 style={{ color: "var(--primary-pink)" }}>Our Beautiful Cakes</h1>
              <p style={{ fontSize: "1.2rem", color: "var(--dark-gray)", maxWidth: "600px", margin: "0 auto" }}>
                Discover our collection of custom cakes for every special occasion
              </p>
            </div>
            <CakesGallery />
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
