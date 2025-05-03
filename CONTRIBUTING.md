# CONTRIBUTION GUIDE

이 문서는 Chromium 컨트리뷰션 핸즈온 프로젝트에 참여하는 방법을 안내합니다. 다음 지침을 따라 프로젝트에 기여해 주세요.

## 기여 과정 개요

1. 이슈 생성 또는 기존 이슈 선택하기
2. 프로젝트 포크 및 클론하기
3. 기능 브랜치 생성하기
4. 코드 작성 및 테스트하기
5. 변경 사항 커밋하기
6. 풀 리퀘스트 제출하기

## 상세 가이드

### 1. 이슈 생성 또는 기존 이슈 선택하기

- 새로운 컨트리뷰션을 시작하기 전에 먼저 [이슈 페이지](https://github.com/OSSCA-chromium/hands-on-2025/issues)를 확인해 주세요.
- 기존 이슈 중 작업하고 싶은 것이 있다면 댓글을 남겨 작업 의사를 밝혀주세요.
- 새로운 기능이나 버그 수정을 제안하고 싶다면 새 이슈를 생성해 주세요.

### 2. 프로젝트 포크 및 클론하기

1. GitHub에서 [OSSCA-chromium/hands-on-2025](https://github.com/OSSCA-chromium/hands-on-2025) 저장소를 포크합니다.
2. 로컬 환경에 포크한 저장소를 클론합니다:

```bash
git clone git@github.com:{본인의_사용자명}/hands-on-2025.git
cd hands-on-2025
```

3. 원본 저장소를 upstream으로 추가합니다:

```bash
git remote add upstream git@github.com:OSSCA-chromium/hands-on-2025.git
git fetch upstream
git branch -u upstream/main
```

### 3. 기능 브랜치 생성하기

새로운 기능이나 버그 수정을 위한 브랜치를 생성합니다:

```bash
git checkout -b {YYMMDD}-{GitHub_ID}-{기능_설명}
# 예: git checkout -b 250420-student1-add-contribution
```

### 4. 코드 작성 및 테스트하기

1. 프로젝트 종속성을 설치합니다:

```bash
npm install
```

2. 코드 작성 후 로컬에서 실행해 테스트합니다:

```bash
npm run dev
```

3. 작성한 코드가 lint 규칙을 준수하는지 확인합니다:

```bash
npm run lint
```

4. 테스트를 실행합니다:

```bash
npm test
```

5. 빌드를 통해 오류가 없는지 확인합니다:

```bash
npm run build
```

### 5. 새로운 컨트리뷰션 추가하기

새로운 Chromium 컨트리뷰션 내용을 추가하려면:

1. `data/contributions/` 디렉토리에 마크다운 파일을 생성합니다 (예: `my-contribution.md`).
2. 다음 형식으로 파일을 작성합니다:

```markdown
---
title: "컨트리뷰션 제목"
date: "2025-XX-XX"
author: "작성자 이름"
authorGithub: "GitHub_사용자명"
difficulty: "난이도 (beginner, intermediate, advanced)"
category: "카테고리 (예: Accessibility, Performance, Security)"
---

## 개요

(컨트리뷰션에 대한 간략한 설명)

## 문제 상황

(해결하려는 문제에 대한 설명)

## 해결 방법

(문제를 어떻게 해결했는지 설명)

## 링크

- [관련 Chromium 이슈](이슈 링크)
- [관련 코드 리뷰](코드 리뷰 링크)
```

### 6. 변경 사항 커밋하기

변경 사항을 커밋하고 포크한 저장소에 푸시합니다:

```bash
git add .
git commit -m "의미 있는 커밋 메시지"
git push origin {브랜치_이름}
```

### 7. 풀 리퀘스트 제출하기

1. GitHub에서 포크한 저장소로 이동합니다.
2. `Compare & pull request` 버튼을 클릭합니다.
3. PR 제목과 설명을 작성합니다. 이슈를 해결하는 경우 "Fixes #이슈번호"를 포함해 주세요.
4. 풀 리퀘스트를 제출합니다.

## 코드 스타일 가이드

- JavaScript/TypeScript 코드는 프로젝트의 ESLint 규칙을 따라야 합니다.
- 들여쓰기는 2칸 공백을 사용합니다.
- 파일 끝에 불필요한 공백이 없어야 합니다.
- 모든 파일은 빈 줄로 끝나야 합니다.

## 리뷰 프로세스

1. 모든 PR은 최소 한 명의 리뷰어의 승인이 필요합니다.
2. CI 테스트를 통과해야 합니다.
3. 리뷰에서 변경 요청이 있을 경우, 변경 사항을 적용한 후 다시 푸시해 주세요.

## 질문이 있으신가요?

질문이나 도움이 필요하면 [이슈](https://github.com/OSSCA-chromium/hands-on-2025/issues)를 통해 문의해 주세요.

Chromium 프로젝트 기여에 참여해 주셔서 감사합니다!
