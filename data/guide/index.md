---
title: Chromium 프로젝트 소개 및 컨트리뷰션 가이드
date: 2025-01-01
author: OSSCA Chromium 팀
---

# Chromium 프로젝트 소개 및 컨트리뷰션 가이드

## 개요

Chromium은 Google Chrome, Microsoft Edge, Opera 등 다양한 웹 브라우저의 기반이 되는 오픈 소스 웹 브라우저 프로젝트입니다. 이 가이드에서는 Chromium 프로젝트에 기여하는 방법을 단계별로 안내합니다.

## 준비 사항

- Git에 대한 기본 지식
- C++, JavaScript 등 프로그래밍 언어에 대한 이해
- 리눅스/macOS/Windows 개발 환경
- 약 25GB 이상의 디스크 공간 (소스 코드 및 빌드 환경)

## 소스 코드 설정

1. **Depot Tools 설치하기**

   Depot Tools는 Chromium 개발에 필요한 도구 모음입니다.

   ```
   git clone https://chromium.googlesource.com/chromium/tools/depot_tools.git
   export PATH="$PATH:/path/to/depot_tools"
   ```

2. **Chromium 소스 코드 다운로드**

   다음 명령어를 사용하여 Chromium 소스 코드를 다운로드합니다.

   ```
   mkdir chromium && cd chromium
   fetch --nohooks chromium
   cd src
   git checkout main
   ```

3. **빌드 의존성 설치**

   ```
   ./build/install-build-deps.sh  # Linux의 경우
   # macOS나 Windows는 해당 문서를 참조하세요
   ```

## 첫 번째 빌드

Chromium을 빌드하려면 다음 단계를 따르세요:

```
gn gen out/Default
autoninja -C out/Default chrome
```

이 과정은 시스템 사양에 따라 30분에서 몇 시간까지 소요될 수 있습니다.

## 컨트리뷰션 워크플로우

Chromium 프로젝트에 기여하는 일반적인 워크플로우는 다음과 같습니다:

1. 해결할 이슈 찾기
2. 로컬에서 코드 변경하기
3. 변경 사항 테스트하기
4. 코드 리뷰를 위해 CL(Change List) 제출하기
5. 리뷰어의 피드백 반영하기
6. 변경 사항 제출(커밋)하기

## 이슈 찾기

첫 번째 컨트리뷰션을 위한 이슈를 찾는 좋은 방법은 `good-first-bug` 레이블이 있는 이슈를 찾는 것입니다.

[Good First Bugs 목록 보기](https://bugs.chromium.org/p/chromium/issues/list?q=label:good-first-bug)

또한 자신의 관심 영역이나 전문 분야와 관련된 이슈를 찾아보는 것도 좋은 방법입니다.

## 코드 변경하기

이슈를 선택했다면, 다음 단계를 따라 코드를 변경합니다:

1. **새 브랜치 생성하기**

   ```
   git checkout -b my_feature origin/main
   ```

2. **코드 수정하기**

   선호하는 코드 에디터를 사용하여 필요한 변경을 가합니다.

3. **로컬에서 변경 사항 테스트하기**

   변경한 코드가 제대로 작동하는지 확인합니다.

   ```
   autoninja -C out/Default chrome
   out/Default/chrome  # 빌드된 Chrome 실행
   ```

## 코드 스타일 및 리뷰 준비

Chromium은 엄격한 코드 스타일 가이드라인을 따릅니다. 코드 리뷰를 준비하기 전에:

- 코드 포맷팅이 Chromium 스타일 가이드를 따르는지 확인
- 적절한 테스트 코드 추가
- 코드 변경 사항에 대한 명확한 커밋 메시지 작성

### 커밋 메시지 형식

```
[컴포넌트]: 변경 사항에 대한 간결한 설명

버그: 123456
변경에 대한 상세 설명.

Change-Id: I1234567890abcdef
```

## 코드 리뷰 요청하기

Chromium은 Gerrit을 사용하여 코드 리뷰를 진행합니다:

1. **변경 사항 업로드하기**

   ```
   git cl upload
   ```

   이 명령어는 변경 사항을 Gerrit에 업로드하고 코드 리뷰 URL을 제공합니다.

2. **리뷰어 추가하기**

   Gerrit UI에서 관련 분야의 전문가나 코드 소유자를 리뷰어로 추가합니다.

3. **자동화된 테스트 확인하기**

   CL이 업로드되면 자동으로 여러 테스트가 실행됩니다.
   모든 테스트가 통과하는지 확인하세요.

## 리뷰 피드백 반영 및 제출

리뷰어가 제공한 피드백을 반영하여 코드를 개선하세요:

1. **피드백에 따라 코드 수정하기**

   ```
   # 코드 수정 후
   git add 수정된_파일
   git commit --amend
   git cl upload
   ```

2. **승인 받기**

   변경 사항에 대해 LGTM(Looks Good To Me)을 받았다면,
   CL 제출 권한이 있는 커미터에게 승인을 요청합니다.

3. **CL 제출하기**

   필요한 승인을 받았다면, CL을 제출합니다:

   ```
   git cl land
   ```

축하합니다! 이제 여러분은 Chromium 프로젝트에 기여한 개발자입니다.
