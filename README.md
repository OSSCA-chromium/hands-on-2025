# hands-on-2025
2025 오픈소스 컨트리뷰션 아카데미 체험형

## URLs
- [Chromium Projects](https://www.chromium.org/chromium-projects/)
- [Chromium Docs](https://chromium.googlesource.com/chromium/src/+/main/docs)
- [Chromium Contribution Guide](https://chromium.googlesource.com/chromium/src/+/main/docs/contributing.md)
- [Chromium-dev group](https://groups.google.com/u/2/a/chromium.org/g/chromium-dev)
- [blink-dev group](https://groups.google.com/a/chromium.org/g/blink-dev)
- [Chromium Issue Tracker](https://issues.chromium.org/u/1/issues)
- [Chromium Gerrit](https://chromium-review.googlesource.com/)
- [Chromium Code Search](https://source.chromium.org/chromium)
- [Chromium Design Doc Template](https://docs.google.com/document/d/14YBYKgk-uSfjfwpKFlp_omgUq5hwMVazy_M965s_1KA/edit?tab=t.0#heading=h.7nki9mck5t64)
- [WPT(web-platform-tests) Project](https://github.com/web-platform-tests/wpt/)
- [WPT(web-platform-tests) Results](https://wpt.fyi/results/)
- [WHATWG GitHub](https://github.com/whatwg)
- [W3C GitHub](https://github.com/w3c)
- [Chromium Release Cycle](https://chromium.googlesource.com/chromium/src/+/HEAD/docs/process/release_cycle.md)
- [Chromium Dash](https://chromiumdash.appspot.com)
- [Chrome Platform Status](https://chromestatus.com/)
- [Chrome Release Notes](https://developer.chrome.com/release-notes)
- [Chrome Blog](https://developer.chrome.com/blog )
- [Chromium Blog](https://blog.chromium.org/)
- [Web Dev Blog](https://web.dev/blog)
- [Chrome for Developers YouTube](https://www.youtube.com/@ChromeDevs)
- [BlinkOn YouTube](https://www.youtube.com/@blinkontalks)
- [MDN docs](https://developer.mozilla.org/docs/Web)
- [Can I Use](https://caniuse.com) 

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

## CONTRIBUTORS
|구분|이름|github|
|---|---|---|
|멘토|임의상|https://github.com/amoseui|
