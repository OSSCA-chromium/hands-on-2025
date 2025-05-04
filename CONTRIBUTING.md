# CONTRIBUTION GUIDE

## 공통

1. OSSCA-chromium/hands-on-2025 프로젝트 Fork
2. 로컬 환경에 Fork한 프로젝트 clone

```bash
$ git clone git@github.com:{본인 ID}/hands-on-2025.git
```

3. upstream (org repo) remote 추가

```bash
# 프로젝트 이동
$ cd hands-on-2025
# upstream remote 추가
$ git remote add upstream git@github.com:OSSCA-chromium/hands-on-2025.git
# upstream repo fetch
$ git fetch upstream
# 로컬 main 브랜치는 upstream 의 main 브랜치를 tracking 하도록 설정
$ git branch -u upstream/main
```

4. 브랜치 생성, 작업 후 origin(개인 repo)에 push

```
$ git checkout -b 250420-test
# commit 생성 후
$ git push origin 250420-test
```

5. Pull Request 생성

## Chromium Issue 진행

### 이슈 생성 또는 기존 이슈 선택하기

- 새로운 컨트리뷰션을 시작하기 전에 먼저 [이슈 페이지](https://github.com/OSSCA-chromium/hands-on-2025/issues)를 확인해 주세요.
- 기존 이슈 중 작업하고 싶은 것이 있다면 댓글을 남겨 작업 의사를 밝혀주세요.
- 멘토가 assign 을 해주면 작업을 시작하세요.
- 새로운 기능이나 버그 수정을 제안하고 싶다면 새 이슈를 생성해 주세요. 적절한 이슈 템플릿을 골라 작성하세요.

###

새로운 Chromium 컨트리뷰션 내용을 추가하려면:

1. `data/contributions/` 디렉토리에 마크다운 파일을 생성합니다 (예: `my-contribution.md`).
2. 다음 형식으로 파일을 작성합니다:

```markdown
---
title: "컨트리뷰션 제목"
date: "2025-XX-XX"
author: "작성자 이름"
authorGithub: "GitHub_사용자명"
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

## 웹사이트 실행 및 확인

1. Install

```bash
npm install
```

2. Run Dev Server

```bash
npm run dev
# 웹브라우저에서 localhost:3000/hands-on-2025 접속
```

3. Lint

```bash
npm run lint
```

4. Test

```bash
npm test
```

5. Build

```bash
npm run build
```
