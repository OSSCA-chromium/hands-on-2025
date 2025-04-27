## CONTRIBUTION GUIDE 
1. OSSCA-chromium/hands-on-2025 프로젝트 Fork
2. 로컬 환경에 Fork한 프로젝트 clone
```bash
$ git clone git@github.com:amoseui/hands-on-2025.git
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
$ git checkout -b 250420-euisang-test
# commit 생성 후
$ git push origin 250420-euisang-test
```
5. Pull Request 생성
