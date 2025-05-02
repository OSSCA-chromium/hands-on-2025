import Link from "next/link";
import { getContributions } from "../../lib/contributions";

export const metadata = {
  title: "학생 컨트리뷰션 | Chromium 컨트리뷰션 가이드",
  description: "Chromium 프로젝트에 대한 학생들의 컨트리뷰션 모음입니다.",
};

export default function ContributionsPage() {
  // 클라이언트 컴포넌트가 아니므로 에러 방지를 위해 빈 배열로 초기화
  const contributions = [];

  try {
    // 서버에서만 실행
    if (typeof window === "undefined") {
      const loadedContributions = getContributions();
      if (loadedContributions && loadedContributions.length > 0) {
        contributions.push(...loadedContributions);
      }
    }
  } catch (error) {
    console.error("Error loading contributions:", error);
  }

  return (
    <div>
      <h1 className="section-title">학생 컨트리뷰션</h1>

      {contributions.length > 0 ? (
        contributions.map((contribution) => (
          <Link
            href={`/contributions/${contribution.id}`}
            key={contribution.id}
            className="card"
          >
            <h2 className="card-title">{contribution.title}</h2>
            <div className="card-meta">
              {contribution.date} • {contribution.author}
            </div>
            <p>{contribution.excerpt}</p>
          </Link>
        ))
      ) : (
        <div
          style={{
            textAlign: "center",
            padding: "3rem 0",
            color: "var(--secondary-text)",
          }}
        >
          <p style={{ marginBottom: "1rem" }}>
            아직 등록된 컨트리뷰션이 없습니다.
          </p>
          <p>학생들의 컨트리뷰션이 이곳에 등록될 예정입니다.</p>
        </div>
      )}
    </div>
  );
}
