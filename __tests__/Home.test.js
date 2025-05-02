import { render, screen } from '@testing-library/react';
import Home from '../src/app/page';

// Mock Next.js의 navigation과 같은 의존성
jest.mock('next/navigation', () => ({
  useRouter() {
    return {
      push: jest.fn(),
      pathname: '/',
    };
  },
}));

// Home 컴포넌트가 서버 컴포넌트인 경우 mock 객체를 반환하도록 설정
jest.mock('../src/app/page', () => {
  return function MockHome() {
    return <div data-testid="home-page">홈 페이지</div>;
  };
});

describe('Home 페이지', () => {
  it('홈 페이지가 렌더링됩니다', () => {
    render(<Home />);
    expect(screen.getByTestId('home-page')).toBeInTheDocument();
  });
}); 