import { Metadata } from 'next';

export const metadata: Metadata = {
  title: '컨트리뷰션 가이드 | Chromium 컨트리뷰션 가이드',
  description: 'Chromium 프로젝트에 기여하는 방법에 대한 자세한 가이드입니다.',
};

export default function ContributingPage() {
  return (
    <div className="max-w-3xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Chromium 컨트리뷰션 가이드</h1>
      
      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">컨트리뷰션 워크플로우</h2>
        <p className="mb-4">
          Chromium 프로젝트에 기여하는 일반적인 워크플로우는 다음과 같습니다:
        </p>
        <ol className="list-decimal pl-6 space-y-3">
          <li>해결할 이슈 찾기</li>
          <li>로컬에서 코드 변경하기</li>
          <li>변경 사항 테스트하기</li>
          <li>코드 리뷰를 위해 CL(Change List) 제출하기</li>
          <li>리뷰어의 피드백 반영하기</li>
          <li>변경 사항 제출(커밋)하기</li>
        </ol>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">이슈 찾기</h2>
        <p className="mb-4">
          첫 번째 컨트리뷰션을 위한 이슈를 찾는 좋은 방법은 <code>good-first-bug</code> 
          레이블이 있는 이슈를 찾는 것입니다.
        </p>
        <div className="bg-blue-50 p-4 rounded mb-4">
          <a 
            href="https://bugs.chromium.org/p/chromium/issues/list?q=label:good-first-bug" 
            className="text-blue-600 hover:underline"
            target="_blank"
            rel="noopener noreferrer"
          >
            Good First Bugs 목록 보기
          </a>
        </div>
        <p>
          또한 자신의 관심 영역이나 전문 분야와 관련된 이슈를 찾아보는 것도 좋은 방법입니다.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">코드 변경하기</h2>
        <p className="mb-4">
          이슈를 선택했다면, 다음 단계를 따라 코드를 변경합니다:
        </p>
        <ol className="list-decimal pl-6 space-y-3">
          <li>
            <strong>새 브랜치 생성하기</strong>
            <pre className="bg-gray-100 p-3 rounded mt-2 overflow-x-auto">
              <code>
                git checkout -b my_feature origin/main
              </code>
            </pre>
          </li>
          <li>
            <strong>코드 수정하기</strong>
            <p className="mt-2">
              선호하는 코드 에디터를 사용하여 필요한 변경을 가합니다.
            </p>
          </li>
          <li>
            <strong>로컬에서 변경 사항 테스트하기</strong>
            <p className="mt-2">
              변경한 코드가 제대로 작동하는지 확인합니다.
            </p>
            <pre className="bg-gray-100 p-3 rounded mt-2 overflow-x-auto">
              <code>
                autoninja -C out/Default chrome{'\n'}
                out/Default/chrome  # 빌드된 Chrome 실행
              </code>
            </pre>
          </li>
        </ol>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">코드 스타일 및 리뷰 준비</h2>
        <p className="mb-4">
          Chromium은 엄격한 코드 스타일 가이드라인을 따릅니다. 코드 리뷰를 준비하기 전에:
        </p>
        <ul className="list-disc pl-6 space-y-2">
          <li>코드 포맷팅이 Chromium 스타일 가이드를 따르는지 확인</li>
          <li>적절한 테스트 코드 추가</li>
          <li>코드 변경 사항에 대한 명확한 커밋 메시지 작성</li>
        </ul>
        <div className="bg-yellow-50 p-4 rounded mt-4">
          <h3 className="font-semibold mb-2">커밋 메시지 형식</h3>
          <pre className="bg-gray-100 p-3 rounded overflow-x-auto">
            <code>
              [컴포넌트]: 변경 사항에 대한 간결한 설명{'\n\n'}
              버그: 123456{'\n'}
              변경에 대한 상세 설명.{'\n\n'}
              Change-Id: I1234567890abcdef
            </code>
          </pre>
        </div>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">코드 리뷰 요청하기</h2>
        <p className="mb-4">
          Chromium은 Gerrit을 사용하여 코드 리뷰를 진행합니다:
        </p>
        <ol className="list-decimal pl-6 space-y-3">
          <li>
            <strong>변경 사항 업로드하기</strong>
            <pre className="bg-gray-100 p-3 rounded mt-2 overflow-x-auto">
              <code>
                git cl upload
              </code>
            </pre>
            <p className="mt-2">
              이 명령어는 변경 사항을 Gerrit에 업로드하고 코드 리뷰 URL을 제공합니다.
            </p>
          </li>
          <li>
            <strong>리뷰어 추가하기</strong>
            <p className="mt-2">
              Gerrit UI에서 관련 분야의 전문가나 코드 소유자를 리뷰어로 추가합니다.
            </p>
          </li>
          <li>
            <strong>자동화된 테스트 확인하기</strong>
            <p className="mt-2">
              CL이 업로드되면 자동으로 여러 테스트가 실행됩니다.
              모든 테스트가 통과하는지 확인하세요.
            </p>
          </li>
        </ol>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">리뷰 피드백 반영 및 제출</h2>
        <p className="mb-4">
          리뷰어가 제공한 피드백을 반영하여 코드를 개선하세요:
        </p>
        <ol className="list-decimal pl-6 space-y-3">
          <li>
            <strong>피드백에 따라 코드 수정하기</strong>
            <pre className="bg-gray-100 p-3 rounded mt-2 overflow-x-auto">
              <code>
                # 코드 수정 후{'\n'}
                git add 수정된_파일{'\n'}
                git commit --amend{'\n'}
                git cl upload
              </code>
            </pre>
          </li>
          <li>
            <strong>승인 받기</strong>
            <p className="mt-2">
              변경 사항에 대해 LGTM(Looks Good To Me)을 받았다면, 
              CL 제출 권한이 있는 커미터에게 승인을 요청합니다.
            </p>
          </li>
          <li>
            <strong>CL 제출하기</strong>
            <p className="mt-2">
              필요한 승인을 받았다면, CL을 제출합니다:
            </p>
            <pre className="bg-gray-100 p-3 rounded mt-2 overflow-x-auto">
              <code>
                git cl land
              </code>
            </pre>
          </li>
        </ol>
        <div className="bg-green-50 p-4 rounded mt-6">
          <p className="font-semibold">
            축하합니다! 이제 여러분은 Chromium 프로젝트에 기여한 개발자입니다.
          </p>
        </div>
      </section>
    </div>
  );
} 