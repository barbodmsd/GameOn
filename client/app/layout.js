import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SidNav from "@/components/SideNav";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};
import { persistStore } from "redux-persist";
import { PersistGate } from "redux-persist/integration/react";
import { Provider } from "react-redux";
import store from "@/Store";
const persistor = persistStore(store);
export default function RootLayout({ children }) {
  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <html lang='en'>
          <body className={inter.className}>
            <div className='flex'>
              <SidNav />
              <div className='w-full'>
                <Header />
                {children}
                <Footer />
              </div>
            </div>
          </body>
        </html>
      </PersistGate>
    </Provider>
  );
}
