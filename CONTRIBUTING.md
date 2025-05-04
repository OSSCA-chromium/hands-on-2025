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
- 새로운 기능이나 버그 수정을 제안하고 싶다면 새 이슈를 생성해 주세요. 적절한 이슈 템플릿을 골라 작성하세요.
- 기존 이슈 중 작업하고 싶은 것이 있다면 댓글을 남겨 작업 의사를 밝혀주세요.

### 3주차 진행 전 할 것
1. CLA 동의하기 https://cla.developers.google.com/about/google-individual 
2. 모든 건 실명으로 (영어이름 성)
3. https://chromium-review.googlesource.com 가입하기
4. git config user.name "실명 영어로"
5. git config.user.email "email 주소"
6. 하고 싶은 이슈에 댓글 달기
7. 멘토가 이슈를 assign 하면 작업 진행
8. Checklist 내용을 진행하면서 작업한 내용을 댓글로 달기

#### Checklist
- [ ] AUTHORS 파일에 이름, 이메일 추가
- [ ] 마크다운 문서 로컬에서 확인해보기 `./tools/md_browser/md_browser.py`
- [ ] 이슈에 써 있는 부분 외에 추가로 깨진 부분 있는지 확인해보기 (다른 링크도 눌러보기)
- [ ] https://source.chromium.org/chromium 에서 깨진 링크를 갖고 있는 파일이 또 있는지 찾아보기
- [ ] 언제 어떤 코드(gerrit 주소)로 이 내용이 추가 또는 수정되었는지 찾기
- [ ] 수정한 파일과 AUTHORS 파일 포함해서 commit 만들기 -> commit 메시지 GitHub에 댓글로 달아서 멘토 확인받기
- [ ] 업로드 후 해당 패치을 리뷰해줄 적절한 리뷰어 찾기 -> GitHub 댓글로 먼저 멘토에게 확인받기

### 패치 Gerrit 업로드 후 진행
1. `data/contributions/template.md` 파일을 `data/contribtutions/{ChromiumReviewId}.md` 파일로 복사합니다. 
2. 내용을 채우고 GitHub Pull Request 로 올려주세요. 


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
