// jest-dom은 DOM 노드에 대한 assertion을 추가합니다
import '@testing-library/jest-dom';

// 필요한 전역 모의(mock) 설정
global.fetch = jest.fn();

// Mock Next.js navigation API
jest.mock('next/navigation', () => ({
  useRouter: () => ({
    push: jest.fn(),
    replace: jest.fn(),
    prefetch: jest.fn(),
  }),
  usePathname: () => '',
  useSearchParams: () => ({
    get: () => undefined,
  }),
}));

// Mock Next.js image component
jest.mock('next/image', () => ({
  __esModule: true,
  default: ({ src, alt, width, height, ...props }) => {
    // eslint-disable-next-line @next/next/no-img-element
    return (
      <img
        src={src}
        alt={alt}
        width={width}
        height={height}
        {...props}
      />
    );
  },
})); 