import React, { useState } from 'react';
import {
  X,
  Bookmark,
  Zap,
  MapPin,
  Calendar,
  Briefcase,
  DollarSign,
  CheckCircle,
  ExternalLink,
  Sparkles
} from 'lucide-react';
import { JobPosting } from '../../types';

interface JobDetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  job: JobPosting | null;
  onToggleBookmark: (jobId: string) => void;
}

export const JobDetailModal: React.FC<JobDetailModalProps> = ({
  isOpen,
  onClose,
  job,
  onToggleBookmark
}) => {
  if (!isOpen || !job) return null;

  const [applied, setApplied] = useState(false);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs animate-in fade-in duration-150">
      <div className="bg-white w-full max-w-xl rounded-2xl shadow-2xl border border-[#c3c5d7]/60 overflow-hidden flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="p-5 border-b border-[#eff3ff] flex items-start justify-between bg-[#f9f9ff]">
          <div className="flex items-center gap-3">
            <div className="h-10 px-3 bg-white border border-[#c3c5d7]/60 rounded-xl flex items-center justify-center shadow-2xs font-extrabold text-[#003fb1] text-sm">
              {job.company}
            </div>
            <div>
              <span className="text-xs font-bold text-[#003fb1] bg-[#dbe1ff] px-2 py-0.5 rounded">
                {job.role}
              </span>
              <h3 className="text-lg font-bold text-[#121c2a] mt-1 leading-snug">
                {job.title}
              </h3>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-[#737686] hover:text-[#121c2a] hover:bg-[#dee9fd] rounded-full transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-5 overflow-y-auto flex-1 flex flex-col gap-5">
          {/* Match Rate Banner */}
          <div className="p-3.5 bg-[#86f2e4]/30 rounded-xl border border-[#006a61]/20 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-[#006a61] text-white flex items-center justify-center shadow-2xs">
                <Zap className="w-4 h-4 fill-white" />
              </div>
              <div>
                <p className="text-xs font-bold text-[#006f66]">AI 합격 예측률</p>
                <p className="text-sm font-extrabold text-[#006a61]">{job.matchRate}% 매칭</p>
              </div>
            </div>
            <span className="text-[11px] text-[#006f66] font-semibold bg-white/80 px-2.5 py-1 rounded-full">
              보유 스펙 적합도 높음
            </span>
          </div>

          {/* Key Overview Grid */}
          <div className="grid grid-cols-2 gap-3 text-xs bg-[#f9f9ff] p-4 rounded-xl border border-[#eff3ff]">
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4 text-[#003fb1]" />
              <div>
                <span className="text-[#737686] block">접수 마감</span>
                <span className="font-bold text-[#121c2a]">{job.deadlineBadge}</span>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <MapPin className="w-4 h-4 text-[#003fb1]" />
              <div>
                <span className="text-[#737686] block">근무 지역</span>
                <span className="font-bold text-[#121c2a]">{job.locationBadge}</span>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Briefcase className="w-4 h-4 text-[#003fb1]" />
              <div>
                <span className="text-[#737686] block">고용 형태</span>
                <span className="font-bold text-[#121c2a]">{job.typeBadge}</span>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <DollarSign className="w-4 h-4 text-[#003fb1]" />
              <div>
                <span className="text-[#737686] block">예상 처우</span>
                <span className="font-bold text-[#121c2a]">{job.salary || '회사 내규 협의'}</span>
              </div>
            </div>
          </div>

          {/* Job Description */}
          <div>
            <h4 className="text-sm font-bold text-[#121c2a] mb-2">직무 및 포지션 소개</h4>
            <p className="text-xs sm:text-sm text-[#434654] leading-relaxed bg-white p-3.5 rounded-xl border border-[#eff3ff]">
              {job.description ||
                '글로벌 프로덕트의 사용자 경험을 혁신하고 주도적인 가설 검증과 데이터 기반 설계를 진행합니다.'}
            </p>
          </div>

          {/* Tech Stack / Requirements */}
          {job.techStack && job.techStack.length > 0 && (
            <div>
              <h4 className="text-sm font-bold text-[#121c2a] mb-2">우대 스택 및 역량</h4>
              <div className="flex flex-wrap gap-1.5">
                {job.techStack.map((tech) => (
                  <span
                    key={tech}
                    className="text-xs font-semibold bg-[#eff3ff] text-[#003fb1] px-2.5 py-1 rounded-lg border border-[#c3c5d7]/40"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Footer Actions */}
        <div className="p-4 border-t border-[#eff3ff] bg-[#f9f9ff] flex items-center gap-2">
          <button
            onClick={() => onToggleBookmark(job.id)}
            className={`p-2.5 rounded-xl border flex items-center justify-center transition-colors cursor-pointer ${
              job.bookmarked
                ? 'bg-[#dbe1ff] border-[#003fb1] text-[#003fb1]'
                : 'bg-white border-[#c3c5d7] text-[#737686] hover:text-[#003fb1]'
            }`}
          >
            <Bookmark className={`w-5 h-5 ${job.bookmarked ? 'fill-[#003fb1]' : ''}`} />
          </button>

          <button
            onClick={() => setApplied(true)}
            className={`flex-1 py-3 rounded-xl font-bold text-xs sm:text-sm flex items-center justify-center gap-1.5 transition-all shadow-xs cursor-pointer ${
              applied
                ? 'bg-[#006a61] text-white'
                : 'bg-[#003fb1] text-white hover:bg-[#1a56db]'
            }`}
          >
            {applied ? (
              <>
                <CheckCircle className="w-4 h-4" /> 지원 준비 목록에 담김
              </>
            ) : (
              <>
                <ExternalLink className="w-4 h-4" /> 채용 사이트 지원하러 가기
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};
