import { notFound } from 'next/navigation';
import { getAllContributionSlugs } from '@/lib/contributions';
import { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import React from 'react';
import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import hljs from 'highlight.js';
import 'highlight.js/styles/atom-one-dark.css';

// 마크다운 파일이 저장된 디렉토리
const contributionsDirectory = path.join(process.cwd(), 'data/contributions');

// Next.js 15.3.1 타입 정의
interface ParamsProps {
  params: Promise<{ slug: string }>
}

// 마크다운을 HTML로 간단히 변환하는 함수
function simpleMarkdownToHtml(markdown: string): string {
  // 코드 블록 처리 (```...```) - 가장 먼저 처리해야 함
  let html = markdown.replace(/```([a-z]*)\n([\s\S]+?)\n```/g, (match, language, code) => {
    let highlighted;
    const escapedCode = code.replace(/</g, '&lt;').replace(/>/g, '&gt;');
    
    if (language && hljs.getLanguage(language)) {
      try {
        // 언어가 지정되어 있고 highlight.js가 지원하는 경우
        highlighted = hljs.highlight(escapedCode, { language }).value;
      } catch {
        highlighted = escapedCode;
      }
    } else {
      // 언어가 지정되지 않았거나 지원하지 않는 경우
      highlighted = escapedCode;
    }
    
    return `<pre class="bg-gray-800 rounded-md my-4 overflow-x-auto"><code class="hljs p-4 block">${highlighted}</code></pre>`;
  });
  
  // 헤더 변환 (h1~h6)
  html = html
    .replace(/^# (.+)$/gm, '<h1 class="text-4xl font-bold my-6">$1</h1>')
    .replace(/^## (.+)$/gm, '<h2 class="text-3xl font-bold my-5">$1</h2>')
    .replace(/^### (.+)$/gm, '<h3 class="text-2xl font-bold my-4">$1</h3>')
    .replace(/^#### (.+)$/gm, '<h4 class="text-xl font-bold my-3">$1</h4>')
    .replace(/^##### (.+)$/gm, '<h5 class="text-lg font-bold my-2">$1</h5>')
    .replace(/^###### (.+)$/gm, '<h6 class="text-base font-bold my-2">$1</h6>');

  // 목록 변환 (단순화)
  // 순서 없는 목록 처리 (-, *, +로 시작)
  html = html.replace(/^\s*[-*+]\s+(.+)$/gm, '<li class="ml-6 list-disc my-1">$1</li>');
  html = html.replace(/(<li[^>]*>.*<\/li>\n*)+/g, '<ul class="my-4">$&</ul>');
  
  // 순서 있는 목록 처리 (1., 2. 등으로 시작)
  html = html.replace(/^\s*(\d+)\.\s+(.+)$/gm, '<li class="ml-6 list-decimal my-1">$2</li>');
  
  // 순서 있는 목록 항목을 <ol> 태그로 묶기
  const tempHtml = html.split('\n');
  let inOrderedList = false;
  let processedLines = [];
  
  for (let i = 0; i < tempHtml.length; i++) {
    const line = tempHtml[i];
    
    if (line.includes('list-decimal')) {
      if (!inOrderedList) {
        processedLines.push('<ol class="my-4">');
        inOrderedList = true;
      }
      processedLines.push(line);
    } else if (inOrderedList && !line.includes('<li')) {
      processedLines.push('</ol>');
      inOrderedList = false;
      processedLines.push(line);
    } else {
      processedLines.push(line);
    }
  }
  
  if (inOrderedList) {
    processedLines.push('</ol>');
  }
  
  html = processedLines.join('\n');
  
  // 인라인 코드
  html = html.replace(/`([^`]+)`/g, '<code class="bg-gray-100 px-1 py-0.5 rounded text-red-600">$1</code>');
  
  // 볼드, 이탤릭
  html = html.replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>');
  html = html.replace(/\*([^*]+)\*/g, '<em>$1</em>');
  
  // 링크
  html = html.replace(/\[([^\]]+)\]\(([^)]+)\)/g, 
    '<a href="$2" class="text-[#5893f4] hover:underline">$1</a>');
  
  // 인용문 처리 (> 로 시작하는 라인)
  html = html.replace(/^>\s*(.+)$/gm, (match, content) => {
    return `<blockquote class="pl-4 border-l-4 border-gray-300 text-gray-700 italic my-4">${content}</blockquote>`;
  });
  
  // 단락 (명시적으로 p 태그 추가)
  html = html.split(/\n\s*\n/)
    .map(p => {
      p = p.trim();
      if (p === '') return '';
      if (p.startsWith('<h') || p.startsWith('<ul') || p.startsWith('<pre')) return p;
      return `<p class="my-4">${p}</p>`;
    })
    .join('\n');
  
  return html;
}

// 직접 컨트리뷰션 데이터 가져오기
async function getContributionDirect(slug: string) {
  try {
    const fullPath = path.join(contributionsDirectory, `${slug}.md`);
    
    if (!fs.existsSync(fullPath)) {
      return null;
    }
    
    const fileContents = fs.readFileSync(fullPath, 'utf8');
    const matterResult = matter(fileContents);
    
    // 직접 HTML로 변환
    const contentHtml = simpleMarkdownToHtml(matterResult.content);
    
    const excerpt = matterResult.content
      .split('\n\n')
      .slice(0, 2)
      .join('\n\n')
      .replace(/^#+\s+.+$/gm, '')
      .substring(0, 160)
      .trim() + '...';
    
    return {
      slug,
      title: matterResult.data.title || '제목 없음',
      date: matterResult.data.date || new Date().toISOString(),
      author: matterResult.data.author || '익명',
      contributionUrl: matterResult.data.contribution_url || '',
      labels: Array.isArray(matterResult.data.labels) ? matterResult.data.labels : 
             (matterResult.data.labels ? [matterResult.data.labels] : []),
      status: matterResult.data.status || '',
      excerpt,
      content: matterResult.content,
      contentHtml,
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
            contribution.labels.map((label, index) => (
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