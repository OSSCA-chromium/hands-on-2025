import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Link from "next/link";
import React from "react";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Chromium 컨트리뷰션 가이드",
  description: "Chromium 프로젝트에 기여하는 방법을 배우고 실습하는 가이드",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body className={inter.className}>
        <header className="bg-blue-700 text-white py-4">
          <div className="container mx-auto px-4">
            <nav className="flex flex-col md:flex-row justify-between items-center">
              <Link href="/" className="text-xl font-bold mb-2 md:mb-0">
                Chromium 컨트리뷰션 가이드
              </Link>
              <div className="flex gap-6">
                <Link href="/getting-started" className="hover:underline">
                  시작하기
                </Link>
                <Link href="/contributing" className="hover:underline">
                  컨트리뷰션 가이드
                </Link>
                <Link href="/contributions" className="hover:underline">
                  학생 컨트리뷰션
                </Link>
              </div>
            </nav>
          </div>
        </header>
        <main className="container mx-auto px-4 py-8">
          {children}
        </main>
        <footer className="bg-gray-100 py-6 mt-12">
          <div className="container mx-auto px-4 text-center text-gray-600">
            <p>© {new Date().getFullYear()} OSSCA Chromium. All rights reserved.</p>
          </div>
        </footer>
      </body>
    </html>
  );
}
