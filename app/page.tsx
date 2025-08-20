import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import HeroSlider from "@/components/hero-slider"
import FeaturedSection from "@/components/featured-section"
import TestimonialsSection from "@/components/testimonials-section"

export default function HomePage() {
  return (
    <>
      <Navbar />
      <main>
        <HeroSlider />
        <FeaturedSection />
        <TestimonialsSection />
      </main>
      <Footer />
    </>
  )
}
