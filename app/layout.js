import { Inter } from "next/font/google";
import "./(components)/globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Citizen Phage Library Dashboard",
  description: "Where the phage magic happens",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
