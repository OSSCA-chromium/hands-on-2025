import fs from 'fs';
import matter from 'gray-matter';
import hljs from 'highlight.js';
import { marked } from 'marked';
import 'highlight.js/styles/atom-one-dark.css';

// 마크다운 컨텐츠 타입
interface MarkdownContent {
  title: string;
  date: string;
  author: string;
  content: string;
  contentHtml: string;
  excerpt: string;
  contribution_url?: string;
  labels?: string[];
  status?: string;
}

// HTML 이스케이프
function escapeHtml(text: string): string {
  return text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

// marked 설정
const renderer = new marked.Renderer();
marked.use({
  renderer,
  gfm: true,
  breaks: true,
  async: false
});

// 코드 하이라이팅 설정
renderer.code = ({ text, lang }) => {
  if (lang && hljs.getLanguage(lang)) {
    try {
      const highlighted = hljs.highlight(text, { language: lang }).value;
      return `<pre class="bg-gray-800 rounded-md my-4 overflow-x-auto"><code class="hljs language-${lang} p-4 block text-sm font-mono">${highlighted}</code></pre>`;
    } catch (err) {
      console.error('코드 하이라이팅 오류:', err);
    }
  }
  return `<pre class="bg-gray-800 rounded-md my-4 overflow-x-auto"><code class="hljs language-plaintext p-4 block text-sm font-mono">${escapeHtml(text)}</code></pre>`;
};

// 마크다운을 HTML로 변환
function markdownToHtml(markdown: string): string {
  if (markdown.startsWith('<') && markdown.includes('</')) {
    return markdown;
  }

  try {
    const html = marked.parse(markdown) as string;
    
    // 추가 스타일링 적용
    return html
      .replace(/<code>/g, '<code class="bg-gray-100 px-1 py-0.5 rounded text-red-600">')
      .replace(/<a href=/g, '<a class="text-[#5893f4] hover:underline" target="_blank" rel="noopener noreferrer" href=')
      .replace(/<blockquote>/g, '<blockquote class="pl-4 border-l-4 border-gray-300 text-gray-700 italic my-4">')
      .replace(/<h1>/g, '<h1 class="text-3xl font-bold mt-6 mb-4">')
      .replace(/<h2>/g, '<h2 class="text-2xl font-semibold mt-6 mb-3">')
      .replace(/<h3>/g, '<h3 class="text-xl font-semibold mt-5 mb-2">')
      .replace(/<h4>/g, '<h4 class="text-lg font-semibold mt-4 mb-2">')
      .replace(/<h5>/g, '<h5 class="text-base font-semibold mt-3 mb-1">')
      .replace(/<h6>/g, '<h6 class="text-base font-semibold mt-3 mb-1">')
      .replace(/<p>/g, '<p class="my-4">')
      .replace(/<ul>/g, '<ul class="list-disc pl-8 my-4">')
      .replace(/<ol>/g, '<ol class="list-decimal pl-8 my-4">');

  } catch (error) {
    console.error('마크다운 변환 중 오류:', error);
    return `<p>${escapeHtml(markdown)}</p>`;
  }
}

// 마크다운 파일 읽기
async function getMarkdownContent(filePath: string): Promise<MarkdownContent | null> {
  try {
    if (!fs.existsSync(filePath)) {
      console.error('파일을 찾을 수 없습니다:', filePath);
      return null;
    }

    const fileContents = fs.readFileSync(filePath, 'utf8');
    const matterResult = matter(fileContents);
    
    const contentHtml = markdownToHtml(matterResult.content);
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
      contribution_url: matterResult.data.contribution_url,
      labels: matterResult.data.labels,
      status: matterResult.data.status,
    };
  } catch (error) {
    console.error('마크다운 데이터 가져오기 오류:', error);
    return null;
  }
}

export { markdownToHtml, getMarkdownContent, type MarkdownContent }; 