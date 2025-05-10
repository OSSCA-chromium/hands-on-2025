---
title: Fix broken link in device/vr/README.md
date: 2025-05-04
author: gugukorn
contribution_url: https://crrev.com/c/6508330 # https://chromium-review.googlesource.com/c/chromium/src/+/6508330
labels: ["docs", "vr"] # directory name and detail
status: in review # in review, merged 중 하나 선택
---

device/vr/README.md에서 참조하는 파일 경로를 수정했습니다

## 문제 설명

device/vr/README.md파일에서 참조 중인 xr_browser_tests.md 파일의 경로가 잘못되어 있었습니다.

## 해결 내용

xr_browser_tests.md 파일을 검색해 실제로 존재하는 경로를 찾아 수정했습니다.

```markdown
chrome/browser/vr/test/xr_browser_tests.md
```

## 테스트 방법

실제 경로 상의 파일을 확인했습니다.

## 배운 점
- 전반적인 오픈소스 컨트리뷰션 과정에 대해 이해하고 실습했습니다.
  - commit format에 따른 commit message 작성
  - 적절한 리뷰어 지정

## 참고 자료