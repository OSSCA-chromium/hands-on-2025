import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import path from 'path';
import fs from 'fs';
import matter from 'gray-matter';

export const metadata: Metadata = {
  title: 'Chromium 프로젝트 소개 및 컨트리뷰션 가이드',
  description: 'Chromium 프로젝트 소개 및 컨트리뷰션에 대한 자세한 가이드입니다.',
};

// 마크다운을 HTML로 변환하는 함수
function simpleMarkdownToHtml(markdown: string): string {
  // 이미 HTML로 변환된 내용이라면 그대로 반환
  if (markdown.startsWith('<') && markdown.includes('</')) {
    return markdown;
  }

  try {
    // 제목 변환
    let html = markdown
      .replace(/^# (.+)$/gm, '<h1 class="text-3xl font-bold mt-6 mb-4">$1</h1>')
      .replace(/^## (.+)$/gm, '<h2 class="text-2xl font-semibold mt-6 mb-3">$1</h2>')
      .replace(/^### (.+)$/gm, '<h3 class="text-xl font-semibold mt-5 mb-2">$1</h3>')
      .replace(/^#### (.+)$/gm, '<h4 class="text-lg font-semibold mt-4 mb-2">$1</h4>')
      .replace(/^##### (.+)$/gm, '<h5 class="text-base font-semibold mt-3 mb-1">$1</h5>');

    // 코드 블록 처리
    html = html.replace(/```([\s\S]+?)```/g, '<pre class="bg-gray-100 p-4 rounded my-4 overflow-x-auto"><code>$1</code></pre>');
    
    // 인라인 코드 처리
    html = html.replace(/`([^`]+)`/g, '<code class="bg-gray-100 px-1 rounded">$1</code>');

    // 링크 처리
    html = html.replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" class="text-blue-600 hover:underline" target="_blank" rel="noopener noreferrer">$1</a>');

    // 목록 처리
    const listRegex = /^(\s*)([-*+]|\d+\.)\s+(.+)$/gm;
    const lines = html.split('\n');
    let inList = false;
    let listType = '';
    let result = [];

    for (let i = 0; i < lines.length; i++) {
      const line = lines[i];
      const listMatch = line.match(listRegex);

      if (listMatch) {
        // listMatch 그룹이 모두 존재하는지 확인
        if (!listMatch[1] || !listMatch[2] || !listMatch[3]) {
          result.push(line);
          continue;
        }
        
        const listMarker = listMatch[2];
        const content = listMatch[3];
        const isOrdered = /^\d+\./.test(listMarker);
        const newListType = isOrdered ? 'ol' : 'ul';

        if (!inList) {
          inList = true;
          listType = newListType;
          result.push(`<${listType} class="${listType === 'ul' ? 'list-disc' : 'list-decimal'} pl-6 my-4 space-y-2">`);
        } else if (listType !== newListType) {
          result.push(`</${listType}>`);
          listType = newListType;
          result.push(`<${listType} class="${listType === 'ul' ? 'list-disc' : 'list-decimal'} pl-6 my-4 space-y-2">`);
        }

        result.push(`<li>${content}</li>`);
      } else if (inList && line.trim() === '') {
        result.push(`</${listType}>`);
        inList = false;
        result.push('');
      } else {
        if (inList) {
          result.push(`</${listType}>`);
          inList = false;
        }
        result.push(line);
      }
    }

    if (inList) {
      result.push(`</${listType}>`);
    }

    html = result.join('\n');

    // 단락 처리
    const paragraphs = html.split(/\n\s*\n/);
    html = paragraphs.map(p => {
      p = p.trim();
      if (p === '') return '';
      
      // 이미 HTML 태그로 시작하면 그대로 반환
      if (p.startsWith('<') && !p.startsWith('<code>')) {
        return p;
      }
      
      // 나머지는 <p> 태그로 감싸기
      return `<p class="my-4">${p}</p>`;
    }).join('\n\n');
    
    // 볼드, 이탤릭 처리
    html = html
      .replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>')
      .replace(/\*([^*]+)\*/g, '<em>$1</em>');
    
    return html;
  } catch (error) {
    console.error('마크다운 변환 중 오류:', error);
    return `<p>${markdown}</p>`;
  }
}

// guide 마크다운 파일을 읽어오는 함수
async function getGuideContent() {
  const guideDirectory = path.join(process.cwd(), 'data/guide');
  const fullPath = path.join(guideDirectory, 'index.md');
  
  try {
    if (!fs.existsSync(fullPath)) {
      console.error('Guide 파일을 찾을 수 없습니다.');
      return null;
    }

    const fileContents = fs.readFileSync(fullPath, 'utf8');
    const matterResult = matter(fileContents);
    
    // 마크다운을 HTML로 변환
    const contentHtml = simpleMarkdownToHtml(matterResult.content);

    return {
      title: matterResult.data.title || 'Chromium 프로젝트 소개 및 컨트리뷰션 가이드',
      date: matterResult.data.date || new Date().toISOString(),
      author: matterResult.data.author || 'OSSCA Chromium 팀',
      content: matterResult.content,
      contentHtml,
    };
  } catch (error) {
    console.error('Guide 데이터 가져오기 오류:', error);
    return null;
  }
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