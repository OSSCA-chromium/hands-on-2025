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
      <body className={`${inter.className} bg-gray-100 text-black`}>
        <header className="bg-[#4285F4] text-white py-4 shadow-md">
          <div className="container mx-auto px-4">
            <nav className="flex flex-col md:flex-row justify-between items-center">
              <Link href="/" className="text-2xl font-bold mb-2 md:mb-0 flex items-center">
                <Image src={LogoImage} alt="OSSCA Chromium 로고" width={32} height={32} className="mr-2" />
                OSSCA Chromium
              </Link>
              <div className="flex gap-6">
                <Link href="/getting-started" className="hover:text-gray-200">
                  시작하기
                </Link>
                <Link href="/contributing" className="hover:text-gray-200">
                  컨트리뷰션 가이드
                </Link>
                <Link href="/contributions" className="hover:text-gray-200">
                  Contributions
                </Link>
              </div>
            </nav>
          </div>
        </header>
        <main className="container mx-auto px-4 py-8">
          <div className="bg-white rounded-lg p-6">
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
