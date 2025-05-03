// 마크다운 변환 테스트 스크립트
import { remark } from 'remark';
import html from 'remark-html';
import remarkGfm from 'remark-gfm';
import fs from 'fs';
import path from 'path';

async function markdownToHtml(markdown) {
  const result = await remark()
    .use(remarkGfm)
    .use(html, { sanitize: false })
    .process(markdown);
  return result.toString();
}

async function testMarkdownConversion() {
  try {
    const testFile = path.join(process.cwd(), 'data/contributions/test-headers.md');
    const fileContents = fs.readFileSync(testFile, 'utf8');
    
    // 프론트매터 제거
    const contentStart = fileContents.indexOf('---', 3) + 3;
    const markdown = fileContents.slice(contentStart).trim();
    
    console.log('원본 마크다운:');
    console.log('-------------------------------------');
    console.log(markdown);
    console.log('-------------------------------------\n');
    
    const htmlResult = await markdownToHtml(markdown);
    
    console.log('변환된 HTML:');
    console.log('-------------------------------------');
    console.log(htmlResult);
    console.log('-------------------------------------');
  } catch (error) {
    console.error('마크다운 변환 테스트 중 오류 발생:', error);
  }
}

testMarkdownConversion(); 