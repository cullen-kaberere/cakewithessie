import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import TreatsGallery from "@/components/treats-gallery"

export default function TreatsPage() {
  return (
    <>
      <Navbar />
      <main style={{ paddingTop: "80px" }}>
        <section className="section">
          <div className="container">
            <div style={{ textAlign: "center", marginBottom: "3rem" }}>
              <h1 style={{ color: "var(--primary-pink)" }}>Delicious Treats & Packages</h1>
              <p style={{ fontSize: "1.2rem", color: "var(--dark-gray)", maxWidth: "600px", margin: "0 auto" }}>
                From cupcakes to complete celebration packages, we have something sweet for every occasion
              </p>
            </div>
            <TreatsGallery />
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
