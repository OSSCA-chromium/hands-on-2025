import Link from 'next/link';
import Image from 'next/image';
import { getAllContributions, getUniqueContributors, isValidGithubUsername } from '@/lib/contributions';

export default function Home() {
  // 최근 컨트리뷰션 3개만 가져오기
  const contributions = getAllContributions().slice(0, 3);
  // 고유한 기여자 목록 가져오기
  const contributors = getUniqueContributors();

  return (
    <>
      <section className="mb-9">
        <h2 className="text-2xl font-bold mb-5 text-black">Recent contributions</h2>
        {contributions.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {contributions.map((contribution) => (
              <Link 
                href={`/contributions/${contribution.slug}`} 
                key={contribution.slug}
                className="block p-5 border border-gray-200 rounded-lg hover:shadow-md transition-shadow bg-white h-full flex flex-col"
              >
                <h3 className="text-xl font-semibold mb-2 text-black line-clamp-2">{contribution.title}</h3>
                
                {/* Status 배지 및 Labels */}
                <div className="flex flex-wrap gap-2 mb-3">
                  {/* Status 배지 */}
                  {contribution.status && (
                    <span className={`px-2 py-1 text-xs text-white rounded-full font-medium ${
                      contribution.status === 'in review' 
                        ? 'bg-[#2563eb]' 
                        : contribution.status === 'merged' 
                          ? 'bg-[#16a34a]' 
                          : 'bg-gray-600'
                    }`}>
                      {contribution.status === 'in review' ? 'IN REVIEW' : 
                       contribution.status === 'merged' ? 'MERGED' : 
                       contribution.status.toUpperCase()}
                    </span>
                  )}
                  
                  {/* Labels 칩 - 최대 2개만 표시 */}
                  {contribution.labels && contribution.labels.length > 0 && 
                    contribution.labels.slice(0, 2).map((label, index) => (
                      <span 
                        key={index} 
                        className="px-2 py-1 bg-purple-100 text-purple-800 text-xs rounded-full"
                      >
                        {label}
                      </span>
                    ))
                  }
                </div>
                
                <div className="text-sm text-gray-500 mb-3 flex items-center">
                  <span>{new Date(contribution.date).toLocaleDateString('ko-KR')}</span> 
                  {/* GitHub 유저 이름 형식인지 확인 */}
                  {isValidGithubUsername(contribution.author) ? (
                    <span className="flex items-center ml-2">
                      <Image 
                        src={`https://github.com/${contribution.author}.png?size=18`} 
                        alt={`${contribution.author} 프로필 이미지`}
                        width={18}
                        height={18}
                        className="rounded-full mr-1"
                      />
                      <span>{contribution.author}</span>
                    </span>
                  ) : (
                    <span className="ml-2">{contribution.author}</span>
                  )}
                </div>
                
                <p className="text-black mb-4 flex-grow line-clamp-3">{contribution.excerpt}</p>
                
                <div className="text-[#5893f4] text-sm font-medium mt-auto">
                  더 읽기 →
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <p className="text-black">아직 등록된 컨트리뷰션이 없습니다.</p>
        )}
        <div className="mt-6">
          <Link 
            href="/contributions" 
            className="text-[#5893f4] hover:underline font-medium inline-flex items-center"
          >
            모든 컨트리뷰션 보기
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </Link>
        </div>
      </section>

      <section className="mb-9">
        <h2 className="text-2xl font-bold mb-5 text-black">Contributors</h2>
        {contributors.length > 0 ? (
          <div className="flex flex-wrap gap-[18px]">
            {contributors.map((contributor, index) => (
              <div key={index} className="flex flex-col items-center">
                {contributor.isValidGithubUser ? (
                  <a 
                    href={`https://github.com/${contributor.username}`}
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="flex flex-col items-center hover:opacity-80 transition-opacity"
                  >
                    <Image 
                      src={`https://github.com/${contributor.username}.png?size=64`}
                      alt={`${contributor.username} 프로필 이미지`}
                      width={64}
                      height={64}
                      className="rounded-full"
                    />
                  </a>
                ) : (
                  <div className="flex flex-col items-center">
                    <div className="w-16 h-16 rounded-full bg-[#5893f4] flex items-center justify-center">
                      <span className="text-white font-bold text-lg">
                        {contributor.username.charAt(0).toUpperCase()}
                      </span>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        ) : (
          <p className="text-black">등록된 컨트리뷰터가 없습니다.</p>
        )}
      </section>
    </>
  );
}
