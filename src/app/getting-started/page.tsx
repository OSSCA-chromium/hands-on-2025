import { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: '시작하기 | Chromium 컨트리뷰션 가이드',
  description: 'Chromium 프로젝트에 기여하는 방법을 시작하는 가이드입니다.',
};

export default function GettingStartedPage() {
  return (
    <div className="max-w-3xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Chromium 컨트리뷰션 시작하기</h1>
      
      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">개요</h2>
        <p className="mb-4">
          Chromium은 Google Chrome, Microsoft Edge, Opera 등 다양한 웹 브라우저의 
          기반이 되는 오픈 소스 웹 브라우저 프로젝트입니다. 이 가이드에서는 
          Chromium 프로젝트에 기여하는 방법을 단계별로 안내합니다.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">준비 사항</h2>
        <ul className="list-disc pl-6 space-y-2">
          <li>Git에 대한 기본 지식</li>
          <li>C++, JavaScript 등 프로그래밍 언어에 대한 이해</li>
          <li>리눅스/macOS/Windows 개발 환경</li>
          <li>약 25GB 이상의 디스크 공간 (소스 코드 및 빌드 환경)</li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">소스 코드 설정</h2>
        <ol className="list-decimal pl-6 space-y-4">
          <li>
            <strong>Depot Tools 설치하기</strong>
            <p className="mt-2">
              Depot Tools는 Chromium 개발에 필요한 도구 모음입니다.
            </p>
            <pre className="bg-gray-100 p-3 rounded mt-2 overflow-x-auto">
              <code>
                git clone https://chromium.googlesource.com/chromium/tools/depot_tools.git{'\n'}
                export PATH=&quot;$PATH:/path/to/depot_tools&quot;
              </code>
            </pre>
          </li>
          <li>
            <strong>Chromium 소스 코드 다운로드</strong>
            <p className="mt-2">
              다음 명령어를 사용하여 Chromium 소스 코드를 다운로드합니다.
            </p>
            <pre className="bg-gray-100 p-3 rounded mt-2 overflow-x-auto">
              <code>
                mkdir chromium && cd chromium{'\n'}
                fetch --nohooks chromium{'\n'}
                cd src{'\n'}
                git checkout main
              </code>
            </pre>
          </li>
          <li>
            <strong>빌드 의존성 설치</strong>
            <pre className="bg-gray-100 p-3 rounded mt-2 overflow-x-auto">
              <code>
                ./build/install-build-deps.sh  # Linux의 경우{'\n'}
                # macOS나 Windows는 해당 문서를 참조하세요
              </code>
            </pre>
          </li>
        </ol>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">첫 번째 빌드</h2>
        <p className="mb-4">
          Chromium을 빌드하려면 다음 단계를 따르세요:
        </p>
        <pre className="bg-gray-100 p-3 rounded mb-4 overflow-x-auto">
          <code>
            gn gen out/Default{'\n'}
            autoninja -C out/Default chrome
          </code>
        </pre>
        <p>
          이 과정은 시스템 사양에 따라 30분에서 몇 시간까지 소요될 수 있습니다.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">다음 단계</h2>
        <p className="mb-4">
          Chromium을 성공적으로 빌드했다면, 이제 다음 단계로 넘어갈 준비가 되었습니다:
        </p>
        <ul className="list-disc pl-6 space-y-2">
          <li>
            <Link 
              href="/contributing" 
              className="text-blue-600 hover:underline"
            >
              컨트리뷰션 가이드 읽기
            </Link>
          </li>
          <li>
            <a 
              href="https://bugs.chromium.org/p/chromium/issues/list?q=label:good-first-bug" 
              className="text-blue-600 hover:underline"
              target="_blank"
              rel="noopener noreferrer"
            >
              초보자를 위한 이슈 찾기 (good-first-bug)
            </a>
          </li>
          <li>
            <Link 
              href="/contributions" 
              className="text-blue-600 hover:underline"
            >
              다른 학생들의 컨트리뷰션 보기
            </Link>
          </li>
        </ul>
      </section>
    </div>
  );
} 