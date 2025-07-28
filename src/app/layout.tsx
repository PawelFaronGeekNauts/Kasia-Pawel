import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { QueryProvider } from "@/providers/query-provider";
import { ToastProvider } from "@/providers/toast-provider";
import { Cinzel_Decorative, Quicksand, Cinzel } from 'next/font/google';
import Navbar from "@/components/navbar";

const inter = Inter({ subsets: ["latin"] });

const cinzelDecorative = Cinzel_Decorative({
  weight: ['400', '700', '900'],
  subsets: ['latin'],
  variable: '--font-cinzel-decorative',
});

const quicksand = Quicksand({
  weight: ['300', '400', '500', '600', '700'],
  subsets: ['latin'],
  variable: '--font-quicksand',
});

const cinzel = Cinzel({
  weight: ['400', '500', '600', '700'],
  subsets: ['latin'],
  variable: '--font-cinzel',
});

export const metadata: Metadata = {
  title: "Kasia & Paweł - Ślub 2026",
  description: "Zapraszamy na nasze wesele! 17.07.2026",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const showNavbar = new Date() >= new Date('2026-07-15T00:00:00+02:00');
  
  return (
    <html lang="pl">
      <body className={`${inter.className} ${cinzelDecorative.variable} ${quicksand.variable} ${cinzel.variable}`}>
        <QueryProvider>
        {showNavbar && <Navbar />}
          {children} 
          <ToastProvider />
        </QueryProvider>
      </body>
    </html>
  );
}
