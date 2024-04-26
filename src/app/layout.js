import { Inter } from "next/font/google";
import "./globals.css";
import Home from "./page";
import dynamic from 'next/dynamic';
const inter = Inter({ subsets: ["latin"] });
export const metadata = {
  title: "Tt chatapp",
  description: "A Frontend Developer chatapp project",
  //line 5 to 8 is only addition to make in layout.js
  icons: {
    icon: "/images/rahul.png",
  },
};
export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div>
          <Home/>
        </div>
      </body>
    </html>
  );
}
