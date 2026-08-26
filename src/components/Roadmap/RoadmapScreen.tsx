import React from 'react';
import {
  CheckCircle,
  RefreshCw,
  Clock,
  Edit3,
  Plus,
  Target,
  Sparkles,
  ChevronRight
} from 'lucide-react';
import { RoadmapStep, UserProfile } from '../../types';

interface RoadmapScreenProps {
  userProfile: UserProfile;
  steps: RoadmapStep[];
  onOpenEditModal: () => void;
  onOpenAddStepModal: () => void;
  onStepClick: (step: RoadmapStep) => void;
}

export const RoadmapScreen: React.FC<RoadmapScreenProps> = ({
  userProfile,
  steps,
  onOpenEditModal,
  onOpenAddStepModal,
  onStepClick
}) => {
  const completedSteps = steps.filter((s) => s.status === 'completed').length;
  const inProgressSteps = steps.filter((s) => s.status === 'in_progress').length;
  const progressPercent = steps.length > 0 ? Math.round((completedSteps / steps.length) * 100) : 0;

  return (
    <div className="w-full max-w-[1200px] mx-auto px-4 sm:px-6 py-6 sm:py-8 flex flex-col gap-6 md:gap-8 pb-24 md:pb-12">
      {/* Roadmap Header Section */}
      <section className="text-center flex flex-col items-center">
        <div className="inline-flex items-center gap-1.5 bg-[#003fb1] text-white text-xs sm:text-sm font-bold px-3.5 py-1 rounded-full mb-3 shadow-xs">
          <Target className="w-3.5 h-3.5" />
          내 목표
        </div>
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-[#003fb1] tracking-tight mb-2">
          {userProfile.targetCompany} 합격 로드맵
        </h2>
        <p className="text-sm sm:text-base text-[#434654] font-medium max-w-md">
          체계적인 준비로 목표에 다가가세요.
        </p>

        {/* Quick Stats Pill */}
        <div className="mt-4 flex items-center gap-3 bg-white px-4 py-2 rounded-full border border-[#c3c5d7]/50 shadow-2xs text-xs sm:text-sm text-[#434654]">
          <span className="font-bold text-[#006a61]">완료 {completedSteps}개</span>
          <span className="text-[#c3c5d7]">•</span>
          <span className="font-bold text-[#003fb1]">진행 중 {inProgressSteps}개</span>
          <span className="text-[#c3c5d7]">•</span>
          <span className="font-bold text-[#121c2a]">진척도 {progressPercent}%</span>
        </div>
      </section>

      {/* Timeline Section */}
      <section className="relative bg-white rounded-2xl border border-[#c3c5d7]/60 p-6 sm:p-8 md:p-10 shadow-xs max-w-3xl mx-auto w-full">
        {/* Continuous Vertical Guide Line */}
        <div className="absolute left-[39px] sm:left-[47px] md:left-[55px] top-10 bottom-10 w-[2.5px] bg-[#dee9fd] z-0 rounded-full"></div>

        <div className="flex flex-col gap-8 relative z-10">
          {steps.map((step, index) => {
            const isCompleted = step.status === 'completed';
            const isInProgress = step.status === 'in_progress';
            const isPending = step.status === 'pending';

            return (
              <div
                key={step.id}
                onClick={() => onStepClick(step)}
                className={`relative flex gap-4 sm:gap-6 group cursor-pointer transition-all ${
                  isPending ? 'opacity-75 hover:opacity-100' : ''
                }`}
              >
                {/* Step Circle Node */}
                <div className="shrink-0">
                  {isCompleted && (
                    <div className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 bg-[#006a61] text-white rounded-full flex items-center justify-center border-4 border-white shadow-md group-hover:scale-105 transition-transform">
                      <CheckCircle className="w-6 h-6 sm:w-7 sm:h-7 stroke-[2.5]" />
                    </div>
                  )}

                  {isInProgress && (
                    <div className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 bg-[#003fb1] text-white rounded-full flex items-center justify-center border-4 border-white shadow-md ring-4 ring-[#dbe1ff] group-hover:scale-105 transition-transform">
                      <RefreshCw className="w-6 h-6 sm:w-7 sm:h-7 animate-spin-slow stroke-[2.5]" />
                    </div>
                  )}

                  {isPending && (
                    <div className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 bg-[#d9e3f7] text-[#434654] rounded-full flex items-center justify-center border-4 border-white shadow-xs group-hover:scale-105 transition-transform">
                      <Clock className="w-6 h-6 sm:w-7 sm:h-7" />
                    </div>
                  )}
                </div>

                {/* Step Content Card */}
                <div className="flex-grow pt-1 min-w-0">
                  <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-1 mb-2">
                    <h3
                      className={`text-base sm:text-lg font-bold tracking-tight truncate ${
                        isInProgress
                          ? 'text-[#003fb1]'
                          : isCompleted
                          ? 'text-[#121c2a]'
                          : 'text-[#434654]'
                      }`}
                    >
                      {step.title}
                    </h3>

                    {/* Step Status Badge */}
                    {isCompleted && (
                      <span className="text-xs font-bold text-[#006f66] bg-[#86f2e4] px-2.5 py-0.5 rounded-md self-start sm:self-auto shrink-0">
                        {step.badgeText || step.dateLabel}
                      </span>
                    )}

                    {isInProgress && (
                      <span className="text-xs font-bold text-[#003fb1] bg-[#dbe1ff] px-2.5 py-0.5 rounded-md self-start sm:self-auto shrink-0">
                        {step.badgeText || step.dateLabel}
                      </span>
                    )}

                    {isPending && (
                      <span className="text-xs font-semibold text-[#737686] bg-[#eff3ff] px-2.5 py-0.5 rounded-md self-start sm:self-auto shrink-0">
                        {step.badgeText || step.dateLabel}
                      </span>
                    )}
                  </div>

                  {/* Step Description / Notes Box */}
                  <div
                    className={`p-3.5 sm:p-4 rounded-xl text-sm leading-relaxed transition-all ${
                      isCompleted
                        ? 'bg-[#f9f9ff] border border-[#c3c5d7]/50 text-[#434654]'
                        : isInProgress
                        ? 'bg-[#eff3ff] border border-[#003fb1]/30 text-[#121c2a] shadow-xs'
                        : 'bg-[#f9f9ff] border border-dashed border-[#c3c5d7] text-[#737686]'
                    }`}
                  >
                    <p className="font-medium">{step.notes}</p>
                    <div className="mt-2 flex items-center justify-between text-xs">
                      <span className="text-[11px] font-semibold text-[#737686]">
                        {isCompleted ? '✓ 달성 완료' : isInProgress ? '● 집중 진행 중' : '○ 준비 예정'}
                      </span>
                      <span className="text-[#003fb1] font-semibold flex items-center gap-0.5 opacity-0 group-hover:opacity-100 transition-opacity">
                        수정하기 <ChevronRight className="w-3 h-3" />
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Action Buttons: Edit Plan & Add Step */}
      <section className="flex flex-col sm:flex-row items-center justify-center gap-3 mt-2">
        <button
          onClick={onOpenEditModal}
          className="w-full sm:w-auto bg-white text-[#006a61] border-2 border-[#006a61] font-bold text-sm sm:text-base px-6 py-3 rounded-full hover:bg-[#86f2e4]/30 transition-all shadow-xs flex items-center justify-center gap-2 cursor-pointer active:scale-98"
        >
          <Edit3 className="w-4 h-4 stroke-[2.5]" />
          계획 수정하기
        </button>
        <button
          onClick={onOpenAddStepModal}
          className="w-full sm:w-auto bg-[#003fb1] text-white font-bold text-sm sm:text-base px-6 py-3 rounded-full hover:bg-[#1a56db] transition-all shadow-xs flex items-center justify-center gap-2 cursor-pointer active:scale-98"
        >
          <Plus className="w-4 h-4 stroke-[2.5]" />
          새로운 단계 추가
        </button>
      </section>
    </div>
  );
};
