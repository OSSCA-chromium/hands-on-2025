---
title: CL 3979423 리뷰 제출 경험
date: 2022-05-01
author: amoseui
contribution_url: https://chromium-review.googlesource.com/c/chromium/src/+/3979423
labels: ["UI", "refactoring", "code-health"]
status: merged
---

# 크로미움 접근성 개선 작업

Chrome의 접근성 기능 개선을 위한 패치를 제출했습니다. 화면 읽기 프로그램과의 호환성을 높이는 작업을 수행했습니다.

## 문제 배경

시각 장애인 사용자들이 Chrome을 사용할 때 일부 UI 요소가 화면 읽기 프로그램(스크린 리더)에 제대로 인식되지 않는 문제가 있었습니다. 특히 설정 메뉴의 고급 설정 영역에서 ARIA 속성이 올바르게 설정되어 있지 않아 탐색이 어려웠습니다.

## 개선 내용

다음과 같은 접근성 개선 작업을 수행했습니다:

1. 설정 페이지 UI 컴포넌트에 적절한 ARIA 속성 추가
2. 키보드 탐색 순서 개선
3. 색상 대비 문제 수정
4. 화면 확대 시 레이아웃 깨짐 현상 수정

## 구현 방법

접근성 개선을 위해 WebUI 코드를 수정했습니다:

```javascript
// ARIA 속성 추가 예시
const settingsSection = document.querySelector(".settings-section");
settingsSection.setAttribute("role", "region");
settingsSection.setAttribute("aria-labelledby", "settings-title");
```

또한 WCAG(Web Content Accessibility Guidelines) 2.1 AA 수준을 충족하기 위해 색상 대비를 조정했습니다.

## 테스트 방법

1. NVDA, JAWS, VoiceOver 등 다양한 스크린 리더로 테스트
2. 키보드만으로 모든 기능 사용 가능 여부 확인
3. Lighthouse Accessibility 검사 수행
4. 실제 시각 장애인 사용자 피드백 수집

## 결과 및 배운 점

이번 작업을 통해 웹 접근성의 중요성과 구현 방법에 대해 깊이 이해할 수 있었습니다. 또한 Chromium 프로젝트에서 접근성 문제를 다루는 방식과 코드 리뷰 과정에서 접근성 관련 피드백을 반영하는 방법을 배웠습니다.

앞으로도 Chrome의 접근성을 개선하는 작업에 지속적으로 기여하고 싶습니다.
