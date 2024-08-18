import { Inter } from "next/font/google";
import React from "react";

export const metadata = {
  title: "Auth",
};

const inter = Inter({ subsets: ["latin"] });
export default function layout({ children }) {
  return (
    <html lang='en'>
      <body className={inter.className}>
        <main>{children}</main>
      </body>
    </html>
  );
}
