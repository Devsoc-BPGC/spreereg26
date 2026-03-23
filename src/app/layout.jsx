import "../styles/globals.css";
import Footer from "../../components/footer";
export const metadata = {
  title: "BITS Spree Registration 2026 | Register for Spree Goa",
  description:
    "Register for BITS Spree 2026, the annual sports festival of BITS Goa. Join athletes from across the country from April 3–5. Secure your spot now for Spree registration.",
  
  openGraph: {
    title: "BITS Spree Registration 2026",
    description:
      "Official registration portal for BITS Spree 2026. Sign up now and be part of the biggest sports festival at BITS Goa.",
    url: "https://register.bits-spree.in",
    siteName: "BITS Spree",
    type: "website",
  },

  icons: {
    icon: "/favicon.png",
  },
};


export const viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#0A0A0F",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="dark">
      <body className="noise-overlay">{children}

      <Footer />
      </body>
    </html>
  );
}
