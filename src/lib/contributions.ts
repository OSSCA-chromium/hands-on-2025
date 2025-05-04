import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

const contributionsDirectory = path.join(process.cwd(), 'data/contributions');

// 컨트리뷰션 타입 정의
export interface Contribution {
  slug: string;
  title: string;
  date: string;
  author: string;
  difficulty?: string;
  category?: string;
  contributionUrl?: string;
  labels?: string[];
  status?: 'in review' | 'merged' | 'draft';
  excerpt: string;
  content?: string;
  contentHtml?: string;
}

// 컨트리뷰션 폴더가 없으면 생성
try {
  if (!fs.existsSync(contributionsDirectory)) {
    fs.mkdirSync(contributionsDirectory, { recursive: true });
  }
} catch (error) {
  console.error('Error creating directory:', error);
}

// 모든 컨트리뷰션 데이터 가져오기
export function getAllContributions(): Contribution[] {
  try {
    // 디렉토리가 없으면 빈 배열 반환
    if (!fs.existsSync(contributionsDirectory)) {
      return [];
    }

    const fileNames = fs.readdirSync(contributionsDirectory);

    if (!fileNames.length) {
      return [];
    }

    const contributions = fileNames
      .filter(fileName => fileName.endsWith('.md'))
      .map(fileName => {
        // 파일 이름에서 .md 확장자 제거
        const slug = fileName.replace(/\.md$/, '');

        // 마크다운 파일의 전체 경로
        const fullPath = path.join(contributionsDirectory, fileName);

        // 파일 내용 읽기
        const fileContents = fs.readFileSync(fullPath, 'utf8');

        // gray-matter로 마크다운의 메타데이터와 내용을 파싱
        const matterResult = matter(fileContents);

        // 첫 두 문단 정도를 발췌문으로 사용
        const excerpt = matterResult.content
          .split('\n\n')
          .slice(0, 2)
          .join('\n\n')
          .replace(/^#+\s+.+$/gm, '') // 헤더 제거
          .substring(0, 160)
          .trim();

        return {
          slug,
          title: matterResult.data.title || '제목 없음',
          date: matterResult.data.date || new Date().toISOString(),
          author: matterResult.data.author || '익명',
          difficulty: matterResult.data.difficulty || '',
          category: matterResult.data.category || '',
          contributionUrl: matterResult.data.contribution_url || '',
          labels: Array.isArray(matterResult.data.labels) ? matterResult.data.labels : 
                 (matterResult.data.labels ? [matterResult.data.labels] : []),
          status: matterResult.data.status || '',
          excerpt: excerpt,
          content: matterResult.content,
        };
      });

    // 날짜순 정렬 (최신순)
    return contributions.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  } catch (error) {
    console.error('Error getting contributions:', error);
    return [];
  }
}

// 마크다운을 HTML로 변환
async function markdownToHtml(markdown: string) {
  try {
    // 사용자 정의 마크다운 변환
    // 1. 헤더 변환 (#, ##, ###, ####, #####, ######)
    let html = markdown
      .replace(/^# (.+)$/gm, '<h1>$1</h1>')
      .replace(/^## (.+)$/gm, '<h2>$1</h2>')
      .replace(/^### (.+)$/gm, '<h3>$1</h3>')
      .replace(/^#### (.+)$/gm, '<h4>$1</h4>')
      .replace(/^##### (.+)$/gm, '<h5>$1</h5>')
      .replace(/^###### (.+)$/gm, '<h6>$1</h6>');

    // 2. 코드 블록 처리 (```...```)
    html = html.replace(/```([\s\S]+?)```/g, '<pre><code>$1</code></pre>');
    
    // 3. 인라인 코드 처리 (`...`)
    html = html.replace(/`([^`]+)`/g, '<code>$1</code>');
    
    // 4. 순서 없는 목록 처리
    const lines = html.split('\n');
    let processedLines: string[] = [];
    let inList = false;
    
    for (let i = 0; i < lines.length; i++) {
      const line = lines[i];
      const trimmedLine = line.trim();
      
      // 목록 항목 (-, *, +로 시작하는 라인)
      if (/^[-*+]\s+(.+)$/.test(trimmedLine)) {
        const content = trimmedLine.replace(/^[-*+]\s+(.+)$/, '$1');
        
        if (!inList) {
          processedLines.push('<ul>');
          inList = true;
        }
        
        processedLines.push(`<li>${content}</li>`);
      } 
      // 목록이 아닌 경우 목록 종료
      else if (inList && trimmedLine !== '') {
        processedLines.push('</ul>');
        inList = false;
        processedLines.push(line);
      }
      // 일반 텍스트
      else {
        processedLines.push(line);
      }
    }
    
    // 열린 목록 태그가 있다면 닫기
    if (inList) {
      processedLines.push('</ul>');
    }
    
    html = processedLines.join('\n');
    
    // 5. 단락 처리 (빈 줄로 구분된 텍스트 블록)
    const paragraphs = html.split(/\n\s*\n/);
    html = paragraphs.map(p => {
      p = p.trim();
      if (p === '') return '';
      
      // 이미 HTML 태그로 시작하면 그대로 반환
      if (p.startsWith('<') && !p.startsWith('<code>')) {
        return p;
      }
      
      // 나머지는 <p> 태그로 감싸기
      return `<p>${p}</p>`;
    }).join('\n\n');
    
    // 6. 강조 (볼드, 이탤릭) 및 링크 처리
    html = html
      .replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>')
      .replace(/\*([^*]+)\*/g, '<em>$1</em>')
      .replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2">$1</a>')
      .replace(/\n/g, ''); // 줄바꿈 제거
    
    console.log('변환 결과:', html);
    return html;
  } catch (error) {
    console.error('마크다운 변환 중 오류:', error);
    return `<p>${markdown}</p>`;
  }
}

// 특정 컨트리뷰션 데이터 가져오기
export async function getContributionBySlug(slug: string): Promise<Contribution | null> {
  try {
    if (!fs.existsSync(contributionsDirectory)) {
      return null;
    }

    const fullPath = path.join(contributionsDirectory, `${slug}.md`);

    if (!fs.existsSync(fullPath)) {
      return null;
    }

    const fileContents = fs.readFileSync(fullPath, 'utf8');
    const matterResult = matter(fileContents);

    // 마크다운을 HTML로 변환
    const contentHtml = await markdownToHtml(matterResult.content);

    // 첫 두 문단 정도를 발췌문으로 사용
    const excerpt = matterResult.content
      .split('\n\n')
      .slice(0, 2)
      .join('\n\n')
      .replace(/^#+\s+.+$/gm, '') // 헤더 제거
      .substring(0, 160)
      .trim();

    return {
      slug,
      title: matterResult.data.title || '제목 없음',
      date: matterResult.data.date || new Date().toISOString(),
      author: matterResult.data.author || '익명',
      difficulty: matterResult.data.difficulty || '',
      category: matterResult.data.category || '',
      contributionUrl: matterResult.data.contribution_url || '',
      labels: Array.isArray(matterResult.data.labels) ? matterResult.data.labels : 
             (matterResult.data.labels ? [matterResult.data.labels] : []),
      status: matterResult.data.status || '',
      excerpt: excerpt,
      content: matterResult.content,
      contentHtml,
    };
  } catch (error) {
    console.error('Error getting contribution:', error);
    return null;
  }
}

// 모든 컨트리뷰션 슬러그 가져오기
export function getAllContributionSlugs(): { slug: string }[] {
  try {
    if (!fs.existsSync(contributionsDirectory)) {
      return [];
    }

    const fileNames = fs.readdirSync(contributionsDirectory);

    return fileNames
      .filter(fileName => fileName.endsWith('.md'))
      .map(fileName => {
        return {
          slug: fileName.replace(/\.md$/, '')
        };
      });
  } catch (error) {
    console.error('Error getting contribution slugs:', error);
    return [];
  }
}

// 유효한 GitHub 사용자 이름인지 확인하는 함수
export function isValidGithubUsername(username: string): boolean {
  return Boolean(username && !/\s/.test(username) && /^[a-zA-Z0-9-]+$/.test(username));
}

// 고유한 컨트리뷰터 목록 가져오기
export function getUniqueContributors(): { username: string; isValidGithubUser: boolean }[] {
  const contributions = getAllContributions();
  const contributors = new Map<string, boolean>();
  
  contributions.forEach(contribution => {
    if (contribution.author) {
      const isValidUser = isValidGithubUsername(contribution.author);
      contributors.set(contribution.author, isValidUser);
    }
  });
  
  return Array.from(contributors.entries()).map(([username, isValidGithubUser]) => ({
    username,
    isValidGithubUser
  }));
} 