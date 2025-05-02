const nextJest = require('next/jest');

const createJestConfig = nextJest({
  // Next.js 앱의 경로를 지정
  dir: './',
});

// Jest에 전달할 사용자 정의 설정
const customJestConfig = {
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
  testEnvironment: 'jest-environment-jsdom',
  moduleNameMapper: {
    // 절대 경로 및 모듈 별칭 처리
    '^@/(.*)$': '<rootDir>/src/$1',
  },
  testPathIgnorePatterns: [
    '<rootDir>/node_modules/',
    '<rootDir>/.next/',
    '<rootDir>/out/',
    '<rootDir>/__tests__/types.d.ts',
  ],
  testMatch: [
    '**/__tests__/**/*.[jt]s?(x)',
    '**/?(*.)+(spec|test).[jt]s?(x)'
  ],
};

// createJestConfig는 next/jest가 비동기 Next.js 구성을 로드할 수 있도록 내보내기
module.exports = createJestConfig(customJestConfig); 