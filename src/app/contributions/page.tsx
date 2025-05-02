import Link from 'next/link';
import { getAllContributions } from '@/lib/contributions';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: '학생 컨트리뷰션 | Chromium 컨트리뷰션 가이드',
  description: 'Chromium 프로젝트에 대한 학생들의 컨트리뷰션 모음입니다.',
};

export default function ContributionsPage() {
  const contributions = getAllContributions();

  return (
    <div>
      <h1 className="text-3xl font-bold mb-8">학생 컨트리뷰션</h1>

      {contributions.length > 0 ? (
        <div className="grid gap-6">
          {contributions.map((contribution) => (
            <Link
              href={`/contributions/${contribution.slug}`}
              key={contribution.slug}
              className="block p-6 border rounded-lg hover:shadow-md transition-shadow"
            >
              <h2 className="text-xl font-semibold mb-2">{contribution.title}</h2>
              <div className="text-sm text-gray-500 mb-3">
                {new Date(contribution.date).toLocaleDateString('ko-KR')} • {contribution.author}
              </div>
              <p className="text-gray-700">{contribution.excerpt}</p>
            </Link>
          ))}
        </div>
      ) : (
        <div className="text-center py-12 text-gray-600">
          <p className="mb-4">아직 등록된 컨트리뷰션이 없습니다.</p>
          <p>학생들의 컨트리뷰션이 이곳에 등록될 예정입니다.</p>
        </div>
      )}
    </div>
  );
} 