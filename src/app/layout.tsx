import type { Metadata } from "next";
import { Inter } from "next/font/google";

import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "MP Donations App",
  description: "Donations app using Mercado Pago, developed with Next Js, TypeScript, MercadoPago SDK, Supabase, Tailwind and Shadcn.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} dark max-w-lg m-auto `}>
        {children}
      </body>
    </html>
  );
}
