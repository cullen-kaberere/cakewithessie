import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import MasonryGallery from "@/components/masonry-gallery"
import VideoSection from "@/components/video-section"
import CompletionShowcase from "@/components/completion-showcase"

export default function GalleryPage() {
  return (
    <>
      <Navbar />
      <main style={{ paddingTop: "80px" }}>
        <section className="section">
          <div className="container">
            <div style={{ textAlign: "center", marginBottom: "3rem" }}>
              <h1 style={{ color: "var(--primary-pink)" }}>Our Gallery</h1>
              <p style={{ fontSize: "1.2rem", color: "var(--dark-gray)", maxWidth: "600px", margin: "0 auto" }}>
                Explore our beautiful collection of cakes, treats, and memorable moments
              </p>
            </div>
          </div>
        </section>

        <MasonryGallery />
        <VideoSection />
        <CompletionShowcase />
      </main>
      <Footer />
    </>
  )
}
