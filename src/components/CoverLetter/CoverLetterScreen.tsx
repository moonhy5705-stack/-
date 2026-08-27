import React, { useState } from 'react';
import {
  Search,
  CheckCircle,
  Edit2,
  Clock,
  ChevronRight,
  Plus,
  FileEdit,
  Sparkles,
  Layers
} from 'lucide-react';
import { CoverLetter } from '../../types';

interface CoverLetterScreenProps {
  coverLetters: CoverLetter[];
  onSelectCoverLetter: (cl: CoverLetter) => void;
  onOpenNewCoverLetterModal: () => void;
  onOpenMockInterview: (cl: CoverLetter) => void;
}

export const CoverLetterScreen: React.FC<CoverLetterScreenProps> = ({
  coverLetters,
  onSelectCoverLetter,
  onOpenNewCoverLetterModal,
  onOpenMockInterview
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeFilter, setActiveFilter] = useState<'all' | 'completed' | 'in_progress' | 'not_started'>('all');

  const filteredLetters = coverLetters.filter((cl) => {
    const matchesSearch =
      cl.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
      cl.role.toLowerCase().includes(searchTerm.toLowerCase()) ||
      cl.type.toLowerCase().includes(searchTerm.toLowerCase());

    if (activeFilter === 'all') return matchesSearch;
    return matchesSearch && cl.status === activeFilter;
  });

  return (
    <div className="w-full max-w-[1200px] mx-auto px-4 sm:px-6 py-6 sm:py-8 flex flex-col gap-6 pb-28 md:pb-12">
      {/* Header Section */}
      <section className="flex flex-col gap-4 max-w-2xl">
        <div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-[#121c2a] tracking-tight">
            나의 자소서 관리
          </h2>
          <p className="text-xs sm:text-sm text-[#434654] mt-1">
            지원 기업별 자기소개서 문항 작성과 수정 내역을 한눈에 관리하세요.
          </p>
        </div>

        {/* Search Bar */}
        <div className="relative w-full">
          <Search className="w-5 h-5 absolute left-4 top-1/2 -translate-y-1/2 text-[#737686]" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="기업명 또는 직무 검색"
            className="w-full h-12 pl-12 pr-4 bg-white border border-[#c3c5d7]/70 rounded-xl text-sm sm:text-base text-[#121c2a] placeholder:text-[#737686] focus:outline-none focus:border-[#003fb1] focus:ring-2 focus:ring-[#003fb1]/20 transition-all shadow-2xs"
          />
          {searchTerm && (
            <button
              onClick={() => setSearchTerm('')}
              className="absolute right-3.5 top-1/2 -translate-y-1/2 text-xs font-semibold text-[#737686] hover:text-[#121c2a]"
            >
              지우기
            </button>
          )}
        </div>

        {/* Status Filter Chips */}
        <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-none">
          <button
            onClick={() => setActiveFilter('all')}
            className={`px-3.5 py-1.5 rounded-full text-xs font-bold whitespace-nowrap transition-all cursor-pointer ${
              activeFilter === 'all'
                ? 'bg-[#003fb1] text-white shadow-xs'
                : 'bg-white text-[#434654] border border-[#c3c5d7]/60 hover:bg-[#eff3ff]'
            }`}
          >
            전체 ({coverLetters.length})
          </button>
          <button
            onClick={() => setActiveFilter('completed')}
            className={`px-3.5 py-1.5 rounded-full text-xs font-bold whitespace-nowrap transition-all cursor-pointer ${
              activeFilter === 'completed'
                ? 'bg-[#006a61] text-white shadow-xs'
                : 'bg-white text-[#434654] border border-[#c3c5d7]/60 hover:bg-[#eff3ff]'
            }`}
          >
            작성 완료
          </button>
          <button
            onClick={() => setActiveFilter('in_progress')}
            className={`px-3.5 py-1.5 rounded-full text-xs font-bold whitespace-nowrap transition-all cursor-pointer ${
              activeFilter === 'in_progress'
                ? 'bg-[#1a56db] text-white shadow-xs'
                : 'bg-white text-[#434654] border border-[#c3c5d7]/60 hover:bg-[#eff3ff]'
            }`}
          >
            작성 중
          </button>
          <button
            onClick={() => setActiveFilter('not_started')}
            className={`px-3.5 py-1.5 rounded-full text-xs font-bold whitespace-nowrap transition-all cursor-pointer ${
              activeFilter === 'not_started'
                ? 'bg-[#737686] text-white shadow-xs'
                : 'bg-white text-[#434654] border border-[#c3c5d7]/60 hover:bg-[#eff3ff]'
            }`}
          >
            시작 전
          </button>
        </div>
      </section>

      {/* Cover Letter Cards List */}
      <section className="flex flex-col gap-4 max-w-2xl">
        {filteredLetters.length === 0 ? (
          <div className="bg-white rounded-2xl border border-dashed border-[#c3c5d7] p-8 text-center flex flex-col items-center gap-3">
            <Layers className="w-10 h-10 text-[#c3c5d7]" />
            <p className="text-sm font-semibold text-[#434654]">
              검색 조건에 맞는 자기소개서가 없습니다.
            </p>
            <button
              onClick={onOpenNewCoverLetterModal}
              className="mt-2 text-xs font-bold bg-[#003fb1] text-white px-4 py-2 rounded-xl shadow-xs hover:bg-[#1a56db]"
            >
              새 자소서 작성하기
            </button>
          </div>
        ) : (
          filteredLetters.map((cl) => {
            const isCompleted = cl.status === 'completed';
            const isInProgress = cl.status === 'in_progress';
            const isNotStarted = cl.status === 'not_started';

            return (
              <article
                key={cl.id}
                className="bg-white border border-[#c3c5d7]/60 rounded-2xl p-5 flex flex-col gap-3.5 hover:shadow-md hover:border-[#003fb1]/40 transition-all group shadow-2xs"
              >
                <div className="flex justify-between items-start gap-4">
                  <div className="flex flex-col" onClick={() => onSelectCoverLetter(cl)}>
                    <h3 className="text-lg sm:text-xl font-bold text-[#121c2a] group-hover:text-[#003fb1] transition-colors cursor-pointer">
                      {cl.company}
                    </h3>
                    <p className="text-xs sm:text-sm text-[#434654] font-medium mt-0.5">
                      {cl.type} • {cl.role}
                    </p>
                  </div>

                  {/* Status Badge */}
                  {isCompleted && (
                    <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-[#86f2e4] text-[#006f66] text-xs font-bold whitespace-nowrap shadow-2xs">
                      <CheckCircle className="w-3.5 h-3.5 fill-[#006f66] text-white" />
                      작성 완료
                    </span>
                  )}

                  {isInProgress && (
                    <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-[#003fb1] text-white text-xs font-bold whitespace-nowrap shadow-2xs">
                      <Edit2 className="w-3.5 h-3.5" />
                      작성 중 ({cl.completedQuestions}/{cl.totalQuestions} 문항)
                    </span>
                  )}

                  {isNotStarted && (
                    <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-[#d9e3f7] text-[#434654] text-xs font-bold whitespace-nowrap shadow-2xs">
                      <Clock className="w-3.5 h-3.5" />
                      시작 전
                    </span>
                  )}
                </div>

                {/* Progress Bar Indicator */}
                <div className="w-full h-2 bg-[#eff3ff] rounded-full overflow-hidden">
                  <div
                    className={`h-full rounded-full transition-all duration-500 ${
                      isCompleted
                        ? 'bg-[#006a61] w-full'
                        : isInProgress
                        ? 'bg-[#003fb1]'
                        : 'bg-transparent w-0'
                    }`}
                    style={{ width: `${cl.progressPercent}%` }}
                  />
                </div>

                {/* Card Footer */}
                <div className="flex justify-between items-center border-t border-[#eff3ff] pt-3 text-xs text-[#737686] gap-2">
                  <span>
                    {cl.lastModified
                      ? `최종 수정: ${cl.lastModified}`
                      : `마감일: ${cl.deadline || '상시'}`}
                  </span>
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => onOpenMockInterview(cl)}
                      className="px-2.5 py-1.5 rounded-lg bg-[#dbe1ff] text-[#003fb1] font-bold hover:bg-[#cddcff] transition-colors cursor-pointer"
                    >
                      모의면접
                    </button>
                    <button
                      type="button"
                      onClick={() => onSelectCoverLetter(cl)}
                      className="flex items-center gap-0.5 text-[#003fb1] font-semibold group-hover:translate-x-0.5 transition-transform cursor-pointer"
                    >
                      문항 열람 <ChevronRight className="w-4 h-4 text-[#737686] group-hover:text-[#003fb1]" />
                    </button>
                  </div>
                </div>
              </article>
            );
          })
        )}
      </section>

      {/* Floating Action Button (+) */}
      <button
        onClick={onOpenNewCoverLetterModal}
        aria-label="새 자소서 작성"
        className="fixed bottom-20 md:bottom-10 right-5 md:right-10 w-14 h-14 bg-[#003fb1] text-white rounded-2xl shadow-xl flex items-center justify-center hover:bg-[#1a56db] hover:scale-105 active:scale-95 transition-all z-30 cursor-pointer"
      >
        <Plus className="w-7 h-7 stroke-[2.5]" />
      </button>
    </div>
  );
};
