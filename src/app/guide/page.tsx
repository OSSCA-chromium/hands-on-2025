import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import path from 'path';
import { getMarkdownContent } from '@/lib/markdown';

export const metadata: Metadata = {
  title: 'Guide | OSSCA Chromium',
  description: 'Chromium 프로젝트 소개 및 컨트리뷰션에 대한 자세한 가이드입니다.',
};

// guide 마크다운 파일을 읽어오는 함수
async function getGuideContent() {
  const guideDirectory = path.join(process.cwd(), 'data/guide');
  const fullPath = path.join(guideDirectory, 'index.md');
  
  const content = await getMarkdownContent(fullPath);
  
  if (!content) {
    return null;
  }
  
  return {
    title: content.title || 'Chromium 프로젝트 소개 및 컨트리뷰션 가이드',
    date: content.date,
    author: content.author || 'OSSCA Chromium 팀',
    contentHtml: content.contentHtml,
  };
}

export default async function GuidePage() {
  const guide = await getGuideContent();

  if (!guide) {
    notFound();
  }

  return (
    <article className="max-w-4xl mx-auto p-4">
      {/* 헤더 정보 */}
      <header className="mb-6">
        <h1 className="text-4xl font-bold mb-2 text-black">{guide.title}</h1>
        
        <div className="flex items-center text-gray-500 mb-4">
          <span className="mr-4">{new Date(guide.date).toLocaleDateString('ko-KR')}</span>
          <span>{guide.author}</span>
        </div>
      </header>
      
      {/* HTML Content - 직접 스타일 적용 */}
      <main 
        className="markdown-content text-black"
        dangerouslySetInnerHTML={{ __html: guide.contentHtml }}
      />
    </article>
  );
} 