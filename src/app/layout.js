import './globals.css'
import Link from 'next/link'

export const metadata = {
  title: 'Chromium 컨트리뷰션 가이드',
  description: 'Chromium 프로젝트에 기여하는 방법을 배우고 실습하는 가이드',
}

export default function RootLayout({ children }) {
  return (
    <html lang="ko">
      <body>
        <header className="header">
          <div className="container">
            <Link href="/" className="title-link">Chromium 컨트리뷰션 가이드</Link>
            <nav className="nav">
              <Link href="/getting-started" className="nav-link">시작하기</Link>
              <Link href="/contributing" className="nav-link">컨트리뷰션 가이드</Link>
              <Link href="/contributions" className="nav-link">학생 컨트리뷰션</Link>
            </nav>
          </div>
        </header>
        <main className="main">
          <div className="container">
            {children}
          </div>
        </main>
        <footer className="footer">
          <div className="container">
            <p>© {new Date().getFullYear()} OSSCA Chromium. All rights reserved.</p>
          </div>
        </footer>
      </body>
    </html>
  )
} 