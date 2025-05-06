import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Link from "next/link";
import React from "react";
import Image from "next/image";
import LogoImage from "../../public/logo.png";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "OSSCA Chromium",
  description: "2025 OSSCA 참여형 Chromium 프로젝트",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko" className="bg-gray-100">
      <body className={`${inter.className} bg-gray-100 text-black min-h-screen flex flex-col`}>
        <header className="bg-[#4285F4] text-white py-4 shadow-md sticky top-0 z-10">
          <div className="container mx-auto px-4 lg:px-6">
            <nav className="flex flex-col sm:flex-row justify-between items-center">
              <Link href="/" className="text-2xl font-bold mb-3 sm:mb-0 flex items-center">
                <Image src={LogoImage} alt="OSSCA Chromium 로고" width={32} height={32} className="mr-2" />
                OSSCA Chromium
              </Link>
              <div className="flex gap-6">
                <Link href="/guide" className="hover:text-gray-200 font-medium">
                  Guide
                </Link>
                <Link href="/contributions" className="hover:text-gray-200 font-medium">
                  Contributions
                </Link>
              </div>
            </nav>
          </div>
        </header>
        <main className="container mx-auto px-4 py-6 flex-grow">
          <div className="bg-white rounded-lg p-4 sm:p-6 shadow-sm overflow-hidden">
            {children}
          </div>
        </main>
        <footer className="bg-gray-100 text-gray-600 py-4 mt-6">
          <div className="container mx-auto px-4 text-center">
            <p>© {new Date().getFullYear()} OSSCA Chromium. All rights reserved.</p>
          </div>
        </footer>
      </body>
    </html>
  );
}
