import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-plus-jakarta",
});

export const metadata: Metadata = {
  title: "Ampara Explore | 25KM Radial Horizon",
  description: "Explore pristine reservoirs, sacred centuries-old stupas, and roaming wild elephant herds nestled within a 25 km radial horizon in Ampara, Sri Lanka.",
};

import { LanguageProvider } from "@/context/LanguageContext";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${plusJakartaSans.variable} font-sans`}>
      <body className="min-h-screen bg-slate-50 text-slate-900 antialiased selection:bg-[#0284c7] selection:text-white">
        <LanguageProvider>{children}</LanguageProvider>
      </body>
    </html>
  );
}

