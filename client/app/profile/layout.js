import { Inter } from "next/font/google";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SidNavProfile from "./sideNav";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({ children }) {
  return (
    
      <body className={inter.className}>
        <div className='flex'>
          <SidNavProfile />
          <div className='w-full'>
            <Header />
            <main>{children}</main>
          </div>
        </div>
      </body>
  );
}

// import { Inter } from "next/font/google";
// import Header from "@/components/Header";
// import Footer from "@/components/Footer";
// import SidNavProfile from "./sideNav";

// const inter = Inter({ subsets: ["latin"] });

// export default function RootLayout({ children }) {
//   return (
//     <html lang="en">
//       <body className={inter.className}>
//         <div className="flex min-h-screen">
//           {/* Side Navigation */}
//           <div className="w-1/4 md:w-1/5 bg-gray-100">
//             <SidNavProfile />
//           </div>

//           {/* Main Content */}
//           <div className="w-3/4 md:w-4/5 flex flex-col">
//             <Header />
//             <main className="flex-grow">{children}</main>
//             <Footer />
//           </div>
//         </div>
//       </body>
//     </html>
//   );
// }
