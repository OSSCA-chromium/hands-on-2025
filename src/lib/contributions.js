import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { remark } from "remark";
import html from "remark-html";

const contributionsDirectory = path.join(process.cwd(), "data/contributions");

// 마크다운 파일이 존재하지 않을 경우 디렉토리 생성
try {
  if (!fs.existsSync(contributionsDirectory)) {
    fs.mkdirSync(contributionsDirectory, { recursive: true });
  }
} catch (error) {
  console.error("Error creating directory:", error);
}

export function getContributions() {
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
      .filter((fileName) => fileName.endsWith(".md"))
      .map((fileName) => {
        // 파일 이름에서 .md 확장자 제거
        const id = fileName.replace(/\.md$/, "");

        // 마크다운 파일의 전체 경로
        const fullPath = path.join(contributionsDirectory, fileName);

        // 파일 내용 읽기
        const fileContents = fs.readFileSync(fullPath, "utf8");

        // gray-matter로 마크다운의 메타데이터와 내용을 파싱
        const matterResult = matter(fileContents);

        return {
          id,
          title: matterResult.data.title || "제목 없음",
          date: matterResult.data.date || new Date().toISOString(),
          author: matterResult.data.author || "익명",
          contributionUrl: matterResult.data.contribution_url || "",
          excerpt: matterResult.content.substring(0, 160).trim() + "...",
        };
      });

    // 날짜순 정렬
    return contributions.sort((a, b) => new Date(b.date) - new Date(a.date));
  } catch (error) {
    console.error("Error getting contributions:", error);
    return [];
  }
}

export async function getContribution(id) {
  try {
    if (!fs.existsSync(contributionsDirectory)) {
      return null;
    }

    const fullPath = path.join(contributionsDirectory, `${id}.md`);

    if (!fs.existsSync(fullPath)) {
      return null;
    }

    const fileContents = fs.readFileSync(fullPath, "utf8");
    const matterResult = matter(fileContents);

    // 마크다운을 HTML로 변환
    const processedContent = await remark()
      .use(html)
      .process(matterResult.content);
    const contentHtml = processedContent.toString();

    return {
      id,
      title: matterResult.data.title || "제목 없음",
      date: matterResult.data.date || new Date().toISOString(),
      author: matterResult.data.author || "익명",
      contributionUrl: matterResult.data.contribution_url || "",
      contentHtml,
      excerpt: matterResult.content.substring(0, 160).trim() + "...",
    };
  } catch (error) {
    console.error("Error getting contribution:", error);
    return null;
  }
}
