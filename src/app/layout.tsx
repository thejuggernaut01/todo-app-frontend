import type { Metadata } from "next";
import { Sora } from "next/font/google";
import "./globals.css";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const sora = Sora({
  subsets: ["latin"],
  style: "normal",
  weight: ["100", "200", "300", "400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
  title: "Todo App",
  description: "Organize your work and keep track of your tasks.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={sora.className}>
        {children}
        <ToastContainer role="alert" draggablePercent={60} />
      </body>
    </html>
  );
}
