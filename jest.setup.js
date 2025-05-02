// Jest DOM 확장을 가져와 전역 테스트 환경에 추가합니다
import '@testing-library/jest-dom';

// 필요한 모든 전역 모의 객체를 여기에 설정합니다
// 예: 글로벌 fetch, localStorage 등
global.fetch = jest.fn();

// 다른 전역 모의 설정들
// jest.mock('next/router', () => require('next-router-mock'));
// jest.mock('next/image', () => ({
//   __esModule: true,
//   default: (props) => {
//     return <img {...props} />;
//   },
// })); 