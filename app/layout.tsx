import type React from "react"
import type { Metadata } from "next"
import { Playfair_Display, Inter } from "next/font/google"
import "./globals.css"
import { CartProvider } from "@/contexts/cart-context"
import CartModal from "@/components/cart-modal"

const playfair = Playfair_Display({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-playfair",
})

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
})

export const metadata: Metadata = {
  title: "Cakes With Essie - Custom Cakes & Treats",
  description: "Beautiful custom cakes, cupcakes, and treats for all occasions. Made with love by Essie.",
  generator: "v0.app",
  icons: {
  icon: "/Fav15.png",
},
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`${playfair.variable} ${inter.variable}`}>
      <body>
        <CartProvider>
          {children}
          <CartModal />
        </CartProvider>
      </body>
    </html>
  )
}
