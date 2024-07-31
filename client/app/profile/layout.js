import Header from "@/components/Header";
import Footer from "@/components/Footer";




export default function ProfileLayout({ children }) {

  return (
    <html lang='en'>
      <body>
            <div className='flex'>
              <div className='w-full'>
                <Header />
                {children}
                <Footer />
              </div>
            </div>
      </body>
    </html>
  );
}
