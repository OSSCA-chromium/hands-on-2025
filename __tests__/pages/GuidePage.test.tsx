import { render, screen } from '@testing-library/react';
import { notFound } from 'next/navigation';
import GuidePage from '@/app/guide/page';
import * as markdownModule from '@/lib/markdown';

// next/navigation의 notFound 모킹
jest.mock('next/navigation', () => ({
  notFound: jest.fn()
}));

// markdown 모듈 모킹
jest.mock('@/lib/markdown', () => ({
  getMarkdownContent: jest.fn()
}));

// React.useEffect 사용으로 인한 경고 무시
global.console.error = jest.fn();

describe('가이드 페이지', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('가이드 페이지가 없을 경우 notFound를 호출합니다', async () => {
    // getMarkdownContent가 null을 반환하도록 설정
    (markdownModule.getMarkdownContent as jest.Mock).mockResolvedValue(null);

    try {
      await GuidePage();
    } catch (error) {
      // notFound는 예외를 발생시키므로 여기서 캐치합니다
    }

    expect(notFound).toHaveBeenCalled();
  });

  it('가이드 페이지의 제목과 메타데이터가 올바르게 표시됩니다', async () => {
    // 샘플 가이드 데이터 생성
    const mockGuideContent = {
      title: 'Chromium 프로젝트 가이드',
      date: '2025-01-01',
      author: 'OSSCA Chromium 팀',
      contentHtml: '<p>가이드 내용입니다.</p>',
      content: '가이드 내용입니다.',
      excerpt: '가이드 내용입니다...'
    };

    (markdownModule.getMarkdownContent as jest.Mock).mockResolvedValue(mockGuideContent);

    const { container } = render(await GuidePage());

    expect(screen.getByText('Chromium 프로젝트 가이드')).toBeInTheDocument();
    expect(screen.getByText('OSSCA Chromium 팀')).toBeInTheDocument();
    expect(container.querySelector('.markdown-content')).toContainHTML('<p>가이드 내용입니다.</p>');
  });

  it('날짜가 올바른 형식으로 표시됩니다', async () => {
    const mockGuideContent = {
      title: 'Chromium 프로젝트 가이드',
      date: '2025-01-01',
      author: 'OSSCA Chromium 팀',
      contentHtml: '<p>가이드 내용입니다.</p>',
      content: '가이드 내용입니다.',
      excerpt: '가이드 내용입니다...'
    };

    (markdownModule.getMarkdownContent as jest.Mock).mockResolvedValue(mockGuideContent);

    render(await GuidePage());

    // 한국어 날짜 형식으로 표시되는지 확인
    // 2025. 1. 1. 형태로 표시됨
    expect(screen.getByText(/2025\. 1\. 1\./)).toBeInTheDocument();
  });

  it('기본값이 없는 경우 기본 제목과 작성자가 표시됩니다', async () => {
    // title과 author가 없는 경우의 모의 데이터
    const mockGuideContent = {
      date: '2025-01-01',
      contentHtml: '<p>가이드 내용입니다.</p>',
      content: '가이드 내용입니다.',
      excerpt: '가이드 내용입니다...'
    };

    (markdownModule.getMarkdownContent as jest.Mock).mockResolvedValue(mockGuideContent);

    render(await GuidePage());

    expect(screen.getByText('Chromium 프로젝트 소개 및 컨트리뷰션 가이드')).toBeInTheDocument();
    expect(screen.getByText('OSSCA Chromium 팀')).toBeInTheDocument();
  });
}); 