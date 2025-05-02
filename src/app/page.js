import Link from 'next/link';
import { getContributions } from '../lib/contributions';

export default function HomePage() {
  // 클라이언트 컴포넌트가 아니므로 에러 방지를 위해 빈 배열로 초기화
  const contributions = [];
  
  try {
    // 서버에서만 실행
    if (typeof window === 'undefined') {
      const loadedContributions = getContributions();
      if (loadedContributions && loadedContributions.length > 0) {
        contributions.push(...loadedContributions.slice(0, 3));
      }
    }
  } catch (error) {
    console.error('Error loading contributions:', error);
  }
  
  return (
    <>
      <section className="hero">
        <h1>Chromium 컨트리뷰션 가이드</h1>
        <p>Chromium 프로젝트에 기여하는 방법을 배우고 실습하는 가이드입니다.</p>
      </section>
      
      <section className="section">
        <h2 className="section-title">최근 컨트리뷰션</h2>
        {contributions.length > 0 ? (
          contributions.map((contribution) => (
            <Link href={`/contributions/${contribution.id}`} key={contribution.id} className="card">
              <h3 className="card-title">{contribution.title}</h3>
              <div className="card-meta">
                {contribution.date} • {contribution.author}
              </div>
              <p>{contribution.excerpt}</p>
            </Link>
          ))
        ) : (
          <p>아직 등록된 컨트리뷰션이 없습니다.</p>
        )}
        <div style={{ marginTop: '1.5rem' }}>
          <Link href="/contributions" style={{ color: 'var(--primary-color)' }}>
            모든 컨트리뷰션 보기 →
          </Link>
        </div>
      </section>
      
      <section className="section">
        <h2 className="section-title">유용한 링크</h2>
        <a href="https://www.chromium.org/chromium-projects/" className="resource-link" target="_blank" rel="noopener noreferrer">
          Chromium Projects
        </a>
        <a href="https://chromium.googlesource.com/chromium/src/+/main/docs" className="resource-link" target="_blank" rel="noopener noreferrer">
          Chromium Docs
        </a>
        <a href="https://chromium.googlesource.com/chromium/src/+/main/docs/contributing.md" className="resource-link" target="_blank" rel="noopener noreferrer">
          Chromium Contribution Guide
        </a>
        <a href="https://issues.chromium.org/u/1/issues" className="resource-link" target="_blank" rel="noopener noreferrer">
          Chromium Issue Tracker
        </a>
        <a href="https://chromium-review.googlesource.com/" className="resource-link" target="_blank" rel="noopener noreferrer">
          Chromium Gerrit
        </a>
      </section>
    </>
  );
} 