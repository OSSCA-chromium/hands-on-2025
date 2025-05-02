// jest-dom은 DOM 노드에 대한 assertion을 추가합니다
import '@testing-library/jest-dom';

// 필요한 전역 모의(mock) 설정
global.fetch = jest.fn();

// Next.js 관련 모듈 모킹
jest.mock('next/navigation', () => ({
  useRouter() {
    return {
      push: jest.fn(),
      replace: jest.fn(),
      prefetch: jest.fn(),
      back: jest.fn(),
      pathname: '/',
    };
  },
  usePathname() {
    return '/';
  },
}));

// 이미지 모듈 모킹
jest.mock('next/image', () => ({
  __esModule: true,
  default: (props) => {
    // eslint-disable-next-line jsx-a11y/alt-text
    return <img {...props} />;
  },
})); 