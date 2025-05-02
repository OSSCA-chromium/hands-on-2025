import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { remark } from 'remark';
import html from 'remark-html';

const contributionsDirectory = path.join(process.cwd(), 'data/contributions');

// 컨트리뷰션 타입 정의
export interface Contribution {
  slug: string;
  title: string;
  date: string;
  author: string;
  contributionUrl?: string;
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

        return {
          slug,
          title: matterResult.data.title || '제목 없음',
          date: matterResult.data.date || new Date().toISOString(),
          author: matterResult.data.author || '익명',
          contributionUrl: matterResult.data.contribution_url || '',
          excerpt: matterResult.content.substring(0, 160).trim() + '...',
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
    const processedContent = await remark()
      .use(html)
      .process(matterResult.content);
    const contentHtml = processedContent.toString();

    return {
      slug,
      title: matterResult.data.title || '제목 없음',
      date: matterResult.data.date || new Date().toISOString(),
      author: matterResult.data.author || '익명',
      contributionUrl: matterResult.data.contribution_url || '',
      excerpt: matterResult.content.substring(0, 160).trim() + '...',
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