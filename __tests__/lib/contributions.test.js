import fs from 'fs';
import path from 'path';
import { getContributions, getContribution } from '../../src/lib/contributions';

// 파일 시스템 모듈을 모킹합니다
jest.mock('fs');
jest.mock('path');
jest.mock('gray-matter', () => {
  return jest.fn().mockImplementation(content => {
    return {
      data: JSON.parse(content.split('---')[1].trim()),
      content: content.split('---')[2].trim()
    };
  });
});
jest.mock('remark', () => {
  return {
    remark: jest.fn().mockImplementation(() => {
      return {
        use: jest.fn().mockReturnThis(),
        process: jest.fn().mockResolvedValue({
          toString: jest.fn().mockReturnValue('<p>HTML 변환된 내용</p>')
        })
      };
    })
  };
});
jest.mock('remark-html', () => {
  return jest.fn();
});

describe('contributions 라이브러리', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    
    // process.cwd() 모킹
    process.cwd = jest.fn().mockReturnValue('/mock/path');
    
    // path.join 모킹
    path.join = jest.fn((dir, subdir) => {
      if (subdir.includes('/')) {
        return `${dir}${subdir}`;
      }
      return `${dir}/${subdir}`;
    });

    // 기본 경로 설정
    fs.existsSync = jest.fn().mockReturnValue(true);
  });

  describe('getContributions', () => {
    it('컨트리뷰션 목록을 정상적으로 반환합니다', () => {
      // fs.readdirSync 모킹
      fs.readdirSync = jest.fn().mockReturnValue(['post1.md', 'post2.md']);
      
      // fs.readFileSync 모킹
      fs.readFileSync = jest.fn()
        .mockReturnValueOnce(`---
{
  "title": "첫 번째 기여",
  "date": "2025-01-01",
  "author": "홍길동",
  "contribution_url": "https://example.com"
}
---
첫 번째 기여 내용입니다.`)
        .mockReturnValueOnce(`---
{
  "title": "두 번째 기여",
  "date": "2025-01-02",
  "author": "김철수",
  "contribution_url": "https://example.com/2"
}
---
두 번째 기여 내용입니다.`);
      
      const result = getContributions();
      
      expect(result.length).toBe(2);
      expect(result[0].title).toBe('두 번째 기여');
      expect(result[1].title).toBe('첫 번째 기여');
      expect(result[0].author).toBe('김철수');
      expect(result[1].author).toBe('홍길동');
    });

    it('컨트리뷰션 디렉토리가 없을 경우 빈 배열을 반환합니다', () => {
      fs.existsSync = jest.fn().mockReturnValue(false);
      
      const result = getContributions();
      
      expect(result).toEqual([]);
      expect(fs.readdirSync).not.toHaveBeenCalled();
    });

    it('파일이 없을 경우 빈 배열을 반환합니다', () => {
      fs.readdirSync = jest.fn().mockReturnValue([]);
      
      const result = getContributions();
      
      expect(result).toEqual([]);
    });

    it('메타데이터가 없을 경우 기본값을 설정합니다', () => {
      fs.readdirSync = jest.fn().mockReturnValue(['post.md']);
      fs.readFileSync = jest.fn().mockReturnValue(`---
{}
---
내용입니다.`);
      
      const result = getContributions();
      
      expect(result[0].title).toBe('제목 없음');
      expect(result[0].author).toBe('익명');
      expect(result[0].contributionUrl).toBe('');
    });
  });

  describe('getContribution', () => {
    it('특정 컨트리뷰션을 정상적으로 반환합니다', async () => {
      fs.readFileSync = jest.fn().mockReturnValue(`---
{
  "title": "테스트 기여",
  "date": "2025-01-01",
  "author": "홍길동",
  "contribution_url": "https://example.com"
}
---
테스트 기여 내용입니다.`);
      
      const result = await getContribution('test-post');
      
      expect(result.title).toBe('테스트 기여');
      expect(result.author).toBe('홍길동');
      expect(result.contentHtml).toBe('<p>HTML 변환된 내용</p>');
    });

    it('컨트리뷰션이 없을 경우 null을 반환합니다', async () => {
      fs.existsSync = jest.fn()
        .mockReturnValueOnce(true)  // 디렉토리 존재
        .mockReturnValueOnce(false); // 파일 없음
      
      const result = await getContribution('non-exist');
      
      expect(result).toBeNull();
    });

    it('디렉토리가 없을 경우 null을 반환합니다', async () => {
      fs.existsSync = jest.fn().mockReturnValue(false);
      
      const result = await getContribution('test');
      
      expect(result).toBeNull();
    });
  });
}); 