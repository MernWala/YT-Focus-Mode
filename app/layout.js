import { Inter } from "next/font/google";
import "./globals.css";
import { FaYoutube } from "react-icons/fa";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Focus Study",
  description: "This app is created for opening focus mode",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>

        {/* Navbar goes here */}
        <div className="bg-gray-500 w-full px-3 drop-shadow-2xl fixed top-0">
          
          <div className="flex gap-1 items-center">
            <div className='relative flex items-center justify-center'>
              <p className='m-0 bg-white w-[30px] h-[30px] absolute z-0'></p>
              <FaYoutube className='text-red-600 text-5xl relative z-1' />
            </div>

            <div>
              <span className="text-2xl text-white font-semibold">Focus Learning</span>
            </div>
          </div>


        </div>

        {children}
      </body>
    </html>
  );
}
