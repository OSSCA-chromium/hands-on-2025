import Link from 'next/link';
import { getAllContributions } from '@/lib/contributions';

export default function Home() {
  // 최근 컨트리뷰션 3개만 가져오기
  const contributions = getAllContributions().slice(0, 3)

  return (
    <>
      <section className="mb-12">
        <h2 className="text-2xl font-bold mb-6">Recent contributions</h2>
        {contributions.length > 0 ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {contributions.map((contribution) => (
              <Link 
                href={`/contributions/${contribution.slug}`} 
                key={contribution.slug}
                className="block p-6 border rounded-lg hover:shadow-md transition-shadow"
              >
                <h3 className="text-xl font-semibold mb-2">{contribution.title}</h3>
                <div className="text-sm text-gray-500 mb-3">
                  {new Date(contribution.date).toLocaleDateString('ko-KR')} • {contribution.author}
                </div>
                <p className="text-gray-700">{contribution.excerpt}</p>
              </Link>
            ))}
          </div>
        ) : (
          <p className="text-gray-600">아직 등록된 컨트리뷰션이 없습니다.</p>
        )}
        <div className="mt-6">
          <Link 
            href="/contributions" 
            className="text-blue-600 hover:underline font-medium"
          >
            See all contributions →
          </Link>
        </div>
      </section>

      <section className="mb-12">
        <h2 className="text-2xl font-bold mb-6">유용한 링크</h2>
        <div className="grid md:grid-cols-2 gap-4">
          <a
            href="https://www.chromium.org/chromium-projects/"
            className="p-4 border rounded hover:bg-gray-50 transition-colors"
            target="_blank"
            rel="noopener noreferrer"
          >
            Chromium Projects
          </a>
          <a
            href="https://chromium.googlesource.com/chromium/src/+/main/docs"
            className="p-4 border rounded hover:bg-gray-50 transition-colors"
            target="_blank"
            rel="noopener noreferrer"
          >
            Chromium Docs
          </a>
          <a
            href="https://chromium.googlesource.com/chromium/src/+/main/docs/contributing.md"
            className="p-4 border rounded hover:bg-gray-50 transition-colors"
            target="_blank"
            rel="noopener noreferrer"
          >
            Chromium Contribution Guide
          </a>
          <a
            href="https://issues.chromium.org/u/1/issues"
            className="p-4 border rounded hover:bg-gray-50 transition-colors"
            target="_blank"
            rel="noopener noreferrer"
          >
            Chromium Issue Tracker
          </a>
        </div>
      </section>
    </>
  );
}
