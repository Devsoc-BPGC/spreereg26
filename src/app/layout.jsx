import "../styles/globals.css";
import Footer from "../../components/footer";
export const metadata = {
  title: "SPREE 2026",
  description:
    "Annual Sports Festival of BITS Goa, SPREE 2026 is a three-day extravaganza of sports, camaraderie, and unforgettable moments.SPREE 2026 promises to be the ultimate arena for athletes and sports enthusiasts alike. Join us from April 3rd to 4th for an unforgettable experience where champions are made and legends are born.",
  openGraph: {
    title: "SPREE Registration 2026",
    description: "Spree 2026 is the annual sports festival of BITS Goa, held from April 3rd to 4th. Join us for an unforgettable experience where champions are made and legends are born.",
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
