import { Inter } from "next/font/google";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SidNavProfile from "./sideNav";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="flex">
          <SidNavProfile/>
          <div className="w-full">
            <Header />
            {children}
          </div>
        </div>
      </body>
    </html>
  );
}
