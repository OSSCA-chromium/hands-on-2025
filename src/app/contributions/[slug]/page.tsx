import { notFound } from 'next/navigation';
import { getAllContributionSlugs } from '@/lib/contributions';
import { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import React from 'react';
import path from 'path';
import { getMarkdownContent } from '@/lib/markdown';

// 마크다운 파일이 저장된 디렉토리
const contributionsDirectory = path.join(process.cwd(), 'data/contributions');

// Next.js 15.3.1 타입 정의
interface ParamsProps {
  params: Promise<{ slug: string }>
}

// 컨트리뷰션 데이터 타입 정의
interface ContributionData {
  slug: string;
  title: string;
  date: string;
  author: string;
  contributionUrl: string;
  labels: string[];
  status: string;
  excerpt: string;
  contentHtml: string;
}

// 직접 컨트리뷰션 데이터 가져오기
async function getContributionDirect(slug: string): Promise<ContributionData | null> {
  try {
    const fullPath = path.join(contributionsDirectory, `${slug}.md`);
    
    const content = await getMarkdownContent(fullPath);
    
    if (!content) {
      return null;
    }
    
    return {
      slug,
      title: content.title || '제목 없음',
      date: content.date,
      author: content.author || '익명',
      contributionUrl: content.contribution_url || '',
      labels: Array.isArray(content.labels) ? content.labels : 
             (content.labels ? [content.labels] : []),
      status: content.status || '',
      excerpt: content.excerpt,
      contentHtml: content.contentHtml,
    };
  } catch (error) {
    console.error('컨트리뷰션 데이터 가져오기 오류:', error);
    return null;
  }
}

export async function generateMetadata({ params }: ParamsProps): Promise<Metadata> {
  const resolvedParams = await params;
  const slug = resolvedParams.slug;
  const contribution = await getContributionDirect(slug);

  if (!contribution) {
    return {
      title: '컨트리뷰션을 찾을 수 없습니다',
    };
  }

  return {
    title: `${contribution.title} | OSSCA Chromium`,
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

export default async function ContributionPage({ params }: ParamsProps) {
  const resolvedParams = await params;
  const slug = resolvedParams.slug;
  console.log('Page slug direct:', slug);
  
  const contribution = await getContributionDirect(slug);

  if (!contribution) {
    notFound();
  }

  return (
    <article className="max-w-4xl mx-auto p-4">
      {/* 헤더 정보 */}
      <header className="mb-4">
        <h1 className="text-4xl font-bold mb-2 text-black">{contribution.title}</h1>
        
        {/* Status 배지를 먼저 표시하고 labels를 보여주기 */}
        <div className="flex flex-wrap gap-2 mb-2">
          {/* Status 배지 */}
          {contribution.status && (
            <span className={`px-3 py-1 text-sm text-white rounded-full font-medium ${
              contribution.status === 'in review' 
                ? 'bg-blue-600' 
                : contribution.status === 'merged' 
                  ? 'bg-green-600' 
                  : 'bg-gray-600'
            }`}>
              {contribution.status === 'in review' ? 'IN REVIEW' : 
               contribution.status === 'merged' ? 'MERGED' : 
               contribution.status.toUpperCase()}
            </span>
          )}
          
          {/* Labels 칩 */}
          {contribution.labels && contribution.labels.length > 0 && 
            contribution.labels.map((label: string, index: number) => (
              <span 
                key={index} 
                className="px-3 py-1 bg-purple-100 text-purple-800 text-sm rounded-full"
              >
                {label}
              </span>
            ))
          }
        </div>
        
        <div className="flex items-center text-gray-500 mb-4">
          <span className="mr-2">{new Date(contribution.date).toLocaleDateString('ko-KR')}</span>
          <span className="flex items-center">
            {/* GitHub 유저 이름 형식인지 확인 - 공백이 없고 특수문자가 없으면 GitHub 이름으로 간주 */}
            {contribution.author && !/\s/.test(contribution.author) && /^[a-zA-Z0-9-]+$/.test(contribution.author) ? (
              <a 
                href={`https://github.com/${contribution.author}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center hover:text-blue-600"
              >
                <Image 
                  src={`https://github.com/${contribution.author}.png?size=24`} 
                  alt={`${contribution.author} 프로필 이미지`}
                  width={24}
                  height={24}
                  className="rounded-full mr-2"
                />
                {contribution.author}
              </a>
            ) : (
              <span>{contribution.author}</span>
            )}
          </span>
        </div>
      </header>
      
      {/* 컨트리뷰션 링크 */}
      {contribution.contributionUrl && (
        <div className="mb-4">
          <a
            href={contribution.contributionUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center text-[#5893f4] hover:underline"
          >
            {contribution.contributionUrl}
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
            </svg>
          </a>
        </div>
      )}
      
      {/* HTML Content - 직접 스타일 적용 */}
      <main 
        className="markdown-content text-black"
        dangerouslySetInnerHTML={{ __html: contribution.contentHtml }}
      />

      {/* 다른 컨트리뷰션 목록으로 돌아가기 */}
      <div className="border-t pt-6 mt-8">
        <Link 
          href="/contributions" 
          className="inline-flex items-center text-[#5893f4] hover:underline"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          모든 컨트리뷰션 보기
        </Link>
      </div>
    </article>
  );
} 