import { notFound } from "next/navigation";
import { getContribution, getContributions } from "../../../lib/contributions";

export async function generateMetadata({ params }) {
  try {
    const contribution = await getContribution(params.id);

    if (!contribution) {
      return {
        title: "컨트리뷰션을 찾을 수 없습니다",
      };
    }

    return {
      title: `${contribution.title} | Chromium 컨트리뷰션 가이드`,
      description: contribution.excerpt,
    };
  } catch (error) {
    console.error("Error generating metadata:", error);
    return {
      title: "오류 발생",
      description: "컨트리뷰션 정보를 불러오는 중 오류가 발생했습니다.",
    };
  }
}

export async function generateStaticParams() {
  try {
    const contributions = getContributions();
    return contributions.map((contribution) => ({
      id: contribution.id,
    }));
  } catch (error) {
    console.error("Error generating static params:", error);
    return [];
  }
}

export default async function ContributionPage({ params }) {
  try {
    const contribution = await getContribution(params.id);

    if (!contribution) {
      notFound();
    }

    return (
      <article className="contribution">
        <h1 className="contribution-title">{contribution.title}</h1>
        <div className="contribution-meta">
          {contribution.date} • {contribution.author}
        </div>
        <div
          className="contribution-content"
          dangerouslySetInnerHTML={{ __html: contribution.contentHtml }}
        />

        {contribution.contributionUrl && (
          <div className="contribution-link">
            <h3>컨트리뷰션 링크</h3>
            <a
              href={contribution.contributionUrl}
              target="_blank"
              rel="noopener noreferrer"
            >
              {contribution.contributionUrl}
            </a>
          </div>
        )}
      </article>
    );
  } catch (error) {
    console.error("Error rendering contribution page:", error);
    return (
      <div>
        <h1>오류 발생</h1>
        <p>컨트리뷰션 정보를 불러오는 중 오류가 발생했습니다.</p>
      </div>
    );
  }
}
