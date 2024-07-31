export default function AuthLayout({ children }) {

  return (
    <html lang='en'>
      <body>
            <div className='flex'>
              <div className='w-full'>
                {children}
              </div>
            </div>
      </body>
    </html>
  );
}
