import { notFound } from 'next/navigation';
import { getContributionBySlug, getAllContributionSlugs } from '@/lib/contributions';
import { Metadata } from 'next';

export async function generateMetadata({ params }: any): Promise<Metadata> {
  const contribution = await getContributionBySlug(params.slug);

  if (!contribution) {
    return {
      title: '컨트리뷰션을 찾을 수 없습니다',
    };
  }

  return {
    title: `${contribution.title} | Chromium 컨트리뷰션 가이드`,
    description: contribution.excerpt,
  };
}

// 정적 생성을 위한 경로 생성 함수
export async function generateStaticParams() {
  const contributions = getAllContributionSlugs();
  
  return contributions.map((contribution) => ({
    slug: contribution.slug,
  }));
}

export default async function ContributionPage({ params }: any) {
  const contribution = await getContributionBySlug(params.slug);

  if (!contribution) {
    notFound();
  }

  return (
    <article className="max-w-3xl mx-auto">
      <h1 className="text-3xl font-bold mb-3">{contribution.title}</h1>
      <div className="text-gray-500 mb-8">
        {new Date(contribution.date).toLocaleDateString('ko-KR')} • {contribution.author}
      </div>
      
      <div 
        className="prose prose-blue max-w-none mb-8"
        dangerouslySetInnerHTML={{ __html: contribution.contentHtml || '' }}
      />

      {contribution.contributionUrl && (
        <div className="border-t pt-6 mt-8">
          <h3 className="text-lg font-medium mb-2">컨트리뷰션 링크</h3>
          <a
            href={contribution.contributionUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 hover:underline"
          >
            {contribution.contributionUrl}
          </a>
        </div>
      )}
    </article>
  );
} 