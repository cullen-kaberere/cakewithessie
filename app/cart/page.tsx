import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import CartPage from "@/components/cart-page"

export default function Cart() {
  return (
    <>
      <Navbar />
      <main style={{ paddingTop: "80px" }}>
        <CartPage />
      </main>
      <Footer />
    </>
  )
}
