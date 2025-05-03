import Link from 'next/link';
import Image from 'next/image';
import { getAllContributions } from '@/lib/contributions';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: '학생 컨트리뷰션 | Chromium 컨트리뷰션 가이드',
  description: 'Chromium 프로젝트에 대한 학생들의 컨트리뷰션 모음입니다.',
};

export default function ContributionsPage() {
  const contributions = getAllContributions();
  
  // 상태별로 컨트리뷰션 필터링
  const inReviewContributions = contributions.filter(
    (contribution) => contribution.status === 'in review'
  );
  
  const mergedContributions = contributions.filter(
    (contribution) => contribution.status === 'merged'
  );

  return (
    <div>
      {contributions.length > 0 ? (
        <>
          {/* In Review 컨트리뷰션 */}
          {inReviewContributions.length > 0 && (
            <div className="mb-8">
              <h1 className="text-2xl font-semibold mb-3 text-blue-600">In Review</h1>
              <div className="grid gap-4">
                {inReviewContributions.map((contribution) => (
                  <Link
                    href={`/contributions/${contribution.slug}`}
                    key={contribution.slug}
                    className="block p-6 border border-gray-200 rounded-lg hover:shadow-md transition-shadow bg-white"
                  >
                    <div className="flex flex-col mb-1">
                      <h2 className="text-xl font-semibold text-black">{contribution.title}</h2>
                    
                      {/* Status 배지 및 Labels */}
                      <div className="flex flex-wrap gap-2 mb-1 mt-1">
                        {/* Status 배지 */}
                        {contribution.status && (
                          <span className={`px-3 py-1 text-xs text-white rounded-full font-medium ${
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
                              className="px-3 py-1 bg-purple-100 text-purple-800 text-xs rounded-full"
                            >
                              {label}
                            </span>
                          ))
                        }
                      </div>
                    </div>
                    
                    <div className="text-sm text-gray-500 mb-3 flex items-center">
                      <span className="flex items-center">{new Date(contribution.date).toLocaleDateString('ko-KR')}</span> 
                      {/* GitHub 유저 이름 형식인지 확인 */}
                      {contribution.author && !/\s/.test(contribution.author) && /^[a-zA-Z0-9-]+$/.test(contribution.author) ? (
                        <span className="flex items-center ml-2">
                          <Image 
                            src={`https://github.com/${contribution.author}.png?size=18`} 
                            alt={`${contribution.author} 프로필 이미지`}
                            width={18}
                            height={18}
                            className="rounded-full mr-1"
                          />
                          <span className="inline-block align-middle">{contribution.author}</span>
                        </span>
                      ) : (
                        <span className="ml-2 flex items-center">{contribution.author}</span>
                      )}
                    </div>
                    
                    <p className="text-black">{contribution.excerpt}</p>
                    
                    <div className="mt-4 text-[#6ea0f4] text-sm font-medium">
                      더 읽기 →
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}

          {/* Merged 컨트리뷰션 */}
          {mergedContributions.length > 0 && (
            <div className="mb-8">
              <h1 className="text-2xl font-semibold mb-3 text-green-600">Merged</h1>
              <div className="grid gap-4">
                {mergedContributions.map((contribution) => (
                  <Link
                    href={`/contributions/${contribution.slug}`}
                    key={contribution.slug}
                    className="block p-6 border border-gray-200 rounded-lg hover:shadow-md transition-shadow bg-white"
                  >
                    <div className="flex flex-col mb-1">
                      <h2 className="text-xl font-semibold text-black">{contribution.title}</h2>
                    
                      {/* Status 배지 및 Labels */}
                      <div className="flex flex-wrap gap-2 mb-1 mt-1">
                        {/* Status 배지 */}
                        {contribution.status && (
                          <span className={`px-3 py-1 text-xs text-white rounded-full font-medium ${
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
                              className="px-3 py-1 bg-purple-100 text-purple-800 text-xs rounded-full"
                            >
                              {label}
                            </span>
                          ))
                        }
                      </div>
                    </div>
                    
                    <div className="text-sm text-gray-500 mb-3 flex items-center">
                      <span className="flex items-center">{new Date(contribution.date).toLocaleDateString('ko-KR')}</span> 
                      {/* GitHub 유저 이름 형식인지 확인 */}
                      {contribution.author && !/\s/.test(contribution.author) && /^[a-zA-Z0-9-]+$/.test(contribution.author) ? (
                        <span className="flex items-center ml-2">
                          <Image 
                            src={`https://github.com/${contribution.author}.png?size=18`} 
                            alt={`${contribution.author} 프로필 이미지`}
                            width={18}
                            height={18}
                            className="rounded-full mr-1"
                          />
                          <span className="inline-block align-middle">{contribution.author}</span>
                        </span>
                      ) : (
                        <span className="ml-2 flex items-center">{contribution.author}</span>
                      )}
                    </div>
                    
                    <p className="text-black">{contribution.excerpt}</p>
                    
                    <div className="mt-4 text-[#6ea0f4] text-sm font-medium">
                      더 읽기 →
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </>
      ) : (
        <div className="text-center py-12 text-black">
          <p className="mb-4">아직 등록된 컨트리뷰션이 없습니다.</p>
          <p>학생들의 컨트리뷰션이 이곳에 등록될 예정입니다.</p>
        </div>
      )}
    </div>
  );
} 