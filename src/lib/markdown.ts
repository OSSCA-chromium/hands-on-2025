import fs from 'fs';
import matter from 'gray-matter';
import hljs from 'highlight.js';
import 'highlight.js/styles/atom-one-dark.css';

// 마크다운 컨텐츠의 메타데이터 타입 정의
export interface MarkdownContent {
  title: string;
  date: string;
  author: string;
  content: string;
  contentHtml: string;
  excerpt: string;
  contribution_url?: string;
  labels?: string[] | string;
  status?: string;
  [key: string]: any; // 기타 메타데이터 필드를 위한 인덱스 시그니처
}

// 마크다운을 HTML로 변환하는 함수
export function markdownToHtml(markdown: string): string {
  // 이미 HTML로 변환된 내용이라면 그대로 반환
  if (markdown.startsWith('<') && markdown.includes('</')) {
    return markdown;
  }

  try {
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
      .replace(/^# (.+)$/gm, '<h1 class="text-3xl font-bold mt-6 mb-4">$1</h1>')
      .replace(/^## (.+)$/gm, '<h2 class="text-2xl font-semibold mt-6 mb-3">$1</h2>')
      .replace(/^### (.+)$/gm, '<h3 class="text-xl font-semibold mt-5 mb-2">$1</h3>')
      .replace(/^#### (.+)$/gm, '<h4 class="text-lg font-semibold mt-4 mb-2">$1</h4>')
      .replace(/^##### (.+)$/gm, '<h5 class="text-base font-semibold mt-3 mb-1">$1</h5>')
      .replace(/^###### (.+)$/gm, '<h6 class="text-base font-semibold mt-3 mb-1">$1</h6>');

    // 목록 처리 (들여쓰기 깊이 처리 추가)
    const lines = html.split('\n');
    let result = [];
    let inList = false;
    let listType = '';
    let listStack: { type: string; indent: number }[] = [];
    
    for (let i = 0; i < lines.length; i++) {
      const line = lines[i];
      
      // 목록 항목 매칭 (들여쓰기 레벨 포함)
      const listMatch = line.match(/^(\s*)([*+-]|\d+\.)\s+(.+)$/);
      
      if (listMatch) {
        const indent = listMatch[1].length;
        const marker = listMatch[2];
        const content = listMatch[3];
        const isOrdered = /^\d+\./.test(marker);
        const currentListType = isOrdered ? 'ol' : 'ul';
        
        if (!inList) {
          // 첫 번째 목록 시작
          inList = true;
          listType = currentListType;
          listStack.push({ type: listType, indent: indent });
          result.push(`<${listType} class="${listType === 'ul' ? 'list-disc' : 'list-decimal'} pl-8 my-4">`);
        } else {
          // 현재 활성화된 목록 스택의 마지막 항목 확인
          const currentList = listStack[listStack.length - 1];
          
          if (indent > currentList.indent) {
            // 들여쓰기가 증가: 새로운 중첩 목록 시작
            listType = currentListType;
            listStack.push({ type: listType, indent: indent });
            result.push(`<${listType} class="${listType === 'ul' ? 'list-disc' : 'list-decimal'} pl-6">`);
          } else if (indent < currentList.indent) {
            // 들여쓰기가 감소: 중첩 목록 종료
            while (listStack.length > 0 && indent < listStack[listStack.length - 1].indent) {
              const poppedList = listStack.pop();
              if (poppedList) {
                result.push(`</${poppedList.type}>`);
              }
            }
            
            // 목록 유형이 변경된 경우
            if (listStack.length > 0 && listStack[listStack.length - 1].type !== currentListType) {
              const poppedList = listStack.pop();
              if (poppedList) {
                result.push(`</${poppedList.type}>`);
              }
              listType = currentListType;
              listStack.push({ type: listType, indent: indent });
              result.push(`<${listType} class="${listType === 'ul' ? 'list-disc' : 'list-decimal'} pl-8 my-4">`);
            }
          } else if (currentList.type !== currentListType) {
            // 같은 들여쓰기 레벨이지만 목록 유형이 변경된 경우
            result.push(`</${currentList.type}>`);
            listStack.pop();
            listType = currentListType;
            listStack.push({ type: listType, indent: indent });
            result.push(`<${listType} class="${listType === 'ul' ? 'list-disc' : 'list-decimal'} pl-8 my-4">`);
          }
        }
        
        result.push(`<li>${content}</li>`);
      } else if (inList && line.trim() === '') {
        // 빈 줄을 만나면 모든 목록 종료
        while (listStack.length > 0) {
          const poppedList = listStack.pop();
          if (poppedList) {
            result.push(`</${poppedList.type}>`);
          }
        }
        inList = false;
        result.push('');
      } else {
        // 목록이 아니면서 목록 내부에 있었다면, 목록 종료
        if (inList) {
          while (listStack.length > 0) {
            const poppedList = listStack.pop();
            if (poppedList) {
              result.push(`</${poppedList.type}>`);
            }
          }
          inList = false;
        }
        result.push(line);
      }
    }
    
    // 닫히지 않은 목록 태그 닫기
    while (listStack.length > 0) {
      const poppedList = listStack.pop();
      if (poppedList) {
        result.push(`</${poppedList.type}>`);
      }
    }
    
    html = result.join('\n');
    
    // 인라인 코드 처리
    html = html.replace(/`([^`]+)`/g, '<code class="bg-gray-100 px-1 py-0.5 rounded text-red-600">$1</code>');
    
    // URL 스키마가 있는 텍스트를 자동으로 링크로 변환 (마크다운 링크 외의 URL에 대한 처리)
    html = html.replace(/(?:^|\s|-\s+)(https?:\/\/[^\s<]+)/g, 
      (match, url, offset, string) => {
        // 이미 링크 내부에 있는 URL은 변환하지 않음
        const prevContent = string.substring(0, offset);
        if (prevContent.lastIndexOf('<a') > prevContent.lastIndexOf('</a>')) {
          return match;
        }
        // 목록 항목 내의 URL 링크로 변환
        return match.replace(url, `<a href="${url}" class="text-[#5893f4] hover:underline" target="_blank" rel="noopener noreferrer">${url}</a>`);
      }
    );
    
    // 기존 마크다운 링크 처리
    html = html.replace(/\[([^\]]+)\]\(([^)]+)\)/g, 
      '<a href="$2" class="text-[#5893f4] hover:underline" target="_blank" rel="noopener noreferrer">$1</a>');
    
    // 인용문 처리 (> 로 시작하는 라인)
    html = html.replace(/^>\s*(.+)$/gm, (match, content) => {
      return `<blockquote class="pl-4 border-l-4 border-gray-300 text-gray-700 italic my-4">${content}</blockquote>`;
    });
    
    // 볼드, 이탤릭 처리
    html = html
      .replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>')
      .replace(/\*([^*]+)\*/g, '<em>$1</em>');

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
    
    return html;
  } catch (error) {
    console.error('마크다운 변환 중 오류:', error);
    return `<p>${markdown}</p>`;
  }
}

// 마크다운 파일을 읽고 처리하는 함수
export async function getMarkdownContent(filePath: string): Promise<MarkdownContent | null> {
  try {
    if (!fs.existsSync(filePath)) {
      console.error('파일을 찾을 수 없습니다:', filePath);
      return null;
    }

    const fileContents = fs.readFileSync(filePath, 'utf8');
    const matterResult = matter(fileContents);
    
    // 마크다운을 HTML로 변환
    const contentHtml = markdownToHtml(matterResult.content);

    // 발췌문 생성
    const excerpt = matterResult.content
      .split('\n\n')
      .slice(0, 2)
      .join('\n\n')
      .replace(/^#+\s+.+$/gm, '')
      .substring(0, 160)
      .trim() + '...';

    return {
      title: matterResult.data.title || '제목 없음',
      date: matterResult.data.date || new Date().toISOString(),
      author: matterResult.data.author || '익명',
      content: matterResult.content,
      contentHtml,
      excerpt,
      ...matterResult.data, // 다른 모든 frontmatter 데이터 포함
    };
  } catch (error) {
    console.error('마크다운 데이터 가져오기 오류:', error);
    return null;
  }
} 