import { render, screen } from '@testing-library/react';
import NotFound from '@/app/not-found';

// next/link 모듈 모킹
jest.mock('next/link', () => {
  return ({ children, href, className }: { children: React.ReactNode; href: string; className?: string }) => {
    return (
      <a href={href} className={className} data-testid="link">
        {children}
      </a>
    );
  };
});

describe('404 페이지', () => {
  it('404 오류 페이지를 올바르게 렌더링합니다', () => {
    render(<NotFound />);
    
    // 404 텍스트 확인
    expect(screen.getByText('404')).toBeInTheDocument();
    expect(screen.getByText('페이지를 찾을 수 없습니다')).toBeInTheDocument();
    
    // 안내 메시지 확인
    expect(
      screen.getByText('요청하신 페이지가 존재하지 않거나 이동되었을 수 있습니다.')
    ).toBeInTheDocument();
    
    // 홈으로 돌아가는 링크 확인
    const homeLink = screen.getByTestId('link');
    expect(homeLink).toBeInTheDocument();
    expect(homeLink).toHaveAttribute('href', '/');
    expect(screen.getByText('홈으로 돌아가기')).toBeInTheDocument();
  });
}); 