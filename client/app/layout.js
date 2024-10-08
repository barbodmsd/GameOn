"use client";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SidNav from "@/components/SideNav";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import store, { persistor } from "@/Store";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <main>
          <Provider store={store}>
            <PersistGate persistor={persistor}>
              <div className="flex">
                <SidNav />
                <div className="w-full">
                  <Header />
                  {children}
                  <Footer />
                </div>
              </div>
            </PersistGate>
          </Provider>
        </main>
      </body>
    </html>
  );
}
