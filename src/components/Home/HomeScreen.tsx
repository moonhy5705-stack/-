import React, { useState } from 'react';
import {
  Timer,
  Plus,
  Check,
  CheckCircle2,
  ChevronRight,
  Bookmark,
  Zap,
  ArrowRight,
  Briefcase,
  Sparkles
} from 'lucide-react';
import { UserProfile, TaskItem, JobPosting, NavigationTab } from '../../types';

interface HomeScreenProps {
  userProfile: UserProfile;
  tasks: TaskItem[];
  jobs: JobPosting[];
  onToggleTask: (taskId: string) => void;
  onOpenAddTaskModal: () => void;
  onOpenAllScheduleModal: () => void;
  onToggleBookmarkJob: (jobId: string) => void;
  onSelectJob: (job: JobPosting) => void;
  onNavigateTab: (tab: NavigationTab) => void;
}

export const HomeScreen: React.FC<HomeScreenProps> = ({
  userProfile,
  tasks,
  jobs,
  onToggleTask,
  onOpenAddTaskModal,
  onOpenAllScheduleModal,
  onToggleBookmarkJob,
  onSelectJob,
  onNavigateTab
}) => {
  // Calculate completion percentage
  const completedCount = tasks.filter(t => t.completed).length;
  const totalCount = tasks.length;
  const taskProgress = totalCount > 0 ? Math.round((completedCount / totalCount) * 100) : 0;

  // SVG Circle Progress calculation (r = 45 -> circumference = 2 * Math.PI * 45 = 282.74)
  const radius = 45;
  const circumference = 2 * Math.PI * radius;
  const progressOffset = circumference - (userProfile.progressPercent / 100) * circumference;

  return (
    <div className="w-full max-w-[1200px] mx-auto px-4 sm:px-6 py-6 flex flex-col gap-6 md:gap-8 pb-24 md:pb-12">
      {/* Mobile Profile Greeting Card */}
      <section className="bg-white p-4 sm:p-5 rounded-2xl border border-[#c3c5d7]/50 shadow-xs flex items-center justify-between transition-all hover:border-[#003fb1]/30">
        <div className="flex items-center gap-4">
          <div className="relative">
            <img
              src={userProfile.avatarUrl}
              alt="프로필 사진"
              className="w-14 h-14 sm:w-16 sm:h-16 rounded-full object-cover border-2 border-[#1a56db]/30 shadow-xs"
            />
            <span className="absolute bottom-0 right-0 w-4 h-4 bg-[#006a61] border-2 border-white rounded-full"></span>
          </div>
          <div>
            <p className="text-xs sm:text-sm text-[#434654] font-medium">안녕하세요,</p>
            <h2 className="text-lg sm:text-xl font-bold text-[#003fb1] tracking-tight">
              {userProfile.name}님!
            </h2>
            <div className="flex items-center gap-1.5 mt-0.5">
              <span className="inline-block w-1.5 h-1.5 rounded-full bg-[#006a61]"></span>
              <p className="text-xs sm:text-sm text-[#006a61] font-semibold">
                목표: {userProfile.targetCompany} - {userProfile.targetRole}
              </p>
            </div>
          </div>
        </div>
        <button
          onClick={() => onNavigateTab('mypage')}
          className="hidden sm:flex items-center gap-1 text-xs font-semibold text-[#003fb1] hover:bg-[#eff3ff] px-3 py-1.5 rounded-full transition-colors"
        >
          목표 수정
          <ChevronRight className="w-3.5 h-3.5" />
        </button>
      </section>

      {/* Bento Grid: Progress Card + Today's Tasks */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
        {/* Progress Circular Widget */}
        <article className="bg-white p-6 sm:p-7 rounded-2xl border border-[#c3c5d7]/50 shadow-xs flex flex-col items-center justify-between relative overflow-hidden group hover:shadow-md transition-all">
          {/* Top D-Day Badge */}
          <div className="w-full flex justify-between items-center mb-4">
            <h3 className="text-lg sm:text-xl font-bold text-[#121c2a] tracking-tight">
              취업 준비 진행률
            </h3>
            <div className="bg-[#ffdad6] text-[#93000a] px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1 shadow-2xs">
              <Timer className="w-3.5 h-3.5" />
              {userProfile.dDayLabel}
            </div>
          </div>

          {/* Circular Progress Gauge */}
          <div className="relative w-44 h-44 sm:w-48 sm:h-48 flex items-center justify-center my-2">
            <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
              {/* Background Track */}
              <circle
                cx="50"
                cy="50"
                r={radius}
                className="text-[#dee9fd]"
                stroke="currentColor"
                strokeWidth="8"
                fill="none"
              />
              {/* Active Teal Progress Ring */}
              <circle
                cx="50"
                cy="50"
                r={radius}
                className="text-[#006a61] transition-all duration-1000 ease-out"
                stroke="currentColor"
                strokeWidth="8"
                strokeDasharray={circumference}
                strokeDashoffset={progressOffset}
                strokeLinecap="round"
                fill="none"
              />
            </svg>
            <div className="absolute flex flex-col items-center">
              <span className="text-3xl sm:text-4xl font-extrabold text-[#003fb1] tracking-tight">
                {userProfile.progressPercent}%
              </span>
              <span className="text-xs font-semibold text-[#434654] mt-0.5">달성</span>
            </div>
          </div>

          {/* Motivational Bottom Text */}
          <div className="text-center mt-2">
            <p className="text-sm text-[#434654] leading-relaxed">
              꾸준히 잘 하고 계십니다!
              <br />
              <span className="font-semibold text-[#121c2a]">목표까지 조금만 더 힘내세요.</span>
            </p>
          </div>
        </article>

        {/* Today's Tasks Widget */}
        <article className="bg-white p-6 sm:p-7 rounded-2xl border border-[#c3c5d7]/50 shadow-xs flex flex-col justify-between hover:shadow-md transition-all">
          <div>
            <div className="flex justify-between items-center mb-5">
              <div className="flex items-center gap-2">
                <h3 className="text-lg sm:text-xl font-bold text-[#121c2a] tracking-tight">
                  오늘의 할 일
                </h3>
                <span className="bg-[#eff3ff] text-[#003fb1] text-xs font-bold px-2.5 py-0.5 rounded-full">
                  {completedCount}/{totalCount}
                </span>
              </div>
              <button
                onClick={onOpenAddTaskModal}
                aria-label="할 일 추가"
                className="text-[#003fb1] hover:bg-[#eff3ff] p-2 rounded-full transition-colors flex items-center justify-center active:scale-95 cursor-pointer"
              >
                <Plus className="w-5 h-5" />
              </button>
            </div>

            {/* Task List */}
            <ul className="flex flex-col gap-2.5">
              {tasks.slice(0, 3).map((task) => (
                <li
                  key={task.id}
                  onClick={() => onToggleTask(task.id)}
                  className={`flex items-center gap-3 p-3.5 rounded-xl border transition-all cursor-pointer group select-none ${
                    task.completed
                      ? 'border-[#c3c5d7]/40 bg-[#f9f9ff] opacity-75'
                      : 'border-[#c3c5d7]/70 bg-white hover:border-[#003fb1]/50 hover:bg-[#eff3ff]/30 shadow-2xs'
                  }`}
                >
                  {/* Custom Checkbox circle matching design */}
                  <div
                    className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all shrink-0 ${
                      task.completed
                        ? 'bg-[#006a61] border-[#006a61] text-white'
                        : 'border-[#006a61] text-transparent group-hover:border-[#006a61] group-hover:bg-[#86f2e4]/30'
                    }`}
                  >
                    <Check className={`w-3.5 h-3.5 stroke-[3] ${task.completed ? 'opacity-100' : 'opacity-0 group-hover:opacity-60 text-[#006a61]'}`} />
                  </div>

                  <span
                    className={`text-sm sm:text-base flex-grow font-medium transition-colors ${
                      task.completed ? 'text-[#737686] line-through' : 'text-[#121c2a]'
                    }`}
                  >
                    {task.title}
                  </span>

                  {task.completed ? (
                    <CheckCircle2 className="w-5 h-5 text-[#006a61]/70 shrink-0" />
                  ) : (
                    <ChevronRight className="w-5 h-5 text-[#c3c5d7] group-hover:text-[#003fb1] group-hover:translate-x-0.5 transition-all shrink-0" />
                  )}
                </li>
              ))}
            </ul>
          </div>

          {/* View All Schedule CTA */}
          <button
            onClick={onOpenAllScheduleModal}
            className="mt-5 w-full py-2.5 border-2 border-[#003fb1] text-[#003fb1] font-bold text-sm rounded-xl hover:bg-[#003fb1] hover:text-white transition-all shadow-xs cursor-pointer active:scale-98 text-center"
          >
            전체 일정 보기
          </button>
        </article>
      </section>

      {/* Recommended Jobs Section */}
      <section className="mt-2">
        <div className="flex justify-between items-end mb-4">
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-xl sm:text-2xl font-bold text-[#121c2a] tracking-tight">
                나를 위한 맞춤 공고
              </h3>
              <span className="hidden sm:inline-flex items-center gap-1 text-[11px] font-bold bg-[#dbe1ff] text-[#003fb1] px-2 py-0.5 rounded-md">
                <Sparkles className="w-3 h-3" /> AI 추천
              </span>
            </div>
            <p className="text-xs sm:text-sm text-[#434654] mt-1">
              {userProfile.name}님의 스펙과 관심사에 기반한 추천
            </p>
          </div>
          <button
            onClick={() => onNavigateTab('roadmap')}
            className="text-xs sm:text-sm font-bold text-[#003fb1] flex items-center gap-0.5 hover:underline cursor-pointer"
          >
            더보기 <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        {/* Job Cards Bento List */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4 sm:gap-5">
          {jobs.map((job) => (
            <article
              key={job.id}
              onClick={() => onSelectJob(job)}
              className="bg-white rounded-2xl border border-[#c3c5d7]/60 shadow-xs hover:shadow-md transition-all overflow-hidden flex flex-col group cursor-pointer hover:border-[#003fb1]/40"
            >
              {/* Job Card Header */}
              <div className="p-4 sm:p-5 border-b border-[#eff3ff] bg-[#f9f9ff]/70">
                <div className="flex justify-between items-start mb-2.5">
                  <div className="h-9 px-3 bg-white border border-[#c3c5d7]/50 rounded-lg flex items-center justify-center shadow-2xs">
                    <span className="font-extrabold text-[#003fb1] text-xs sm:text-sm tracking-wider">
                      {job.company}
                    </span>
                  </div>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onToggleBookmarkJob(job.id);
                    }}
                    aria-label="공고 스크랩"
                    className="p-1.5 text-[#737686] hover:text-[#003fb1] hover:bg-[#eff3ff] rounded-full transition-colors cursor-pointer"
                  >
                    <Bookmark
                      className={`w-5 h-5 ${
                        job.bookmarked ? 'text-[#003fb1] fill-[#003fb1]' : ''
                      }`}
                    />
                  </button>
                </div>
                <h4 className="text-base sm:text-lg font-bold text-[#121c2a] line-clamp-1 group-hover:text-[#003fb1] transition-colors">
                  {job.title}
                </h4>
                <p className="text-xs sm:text-sm text-[#434654] mt-1 font-medium">
                  {job.role}
                </p>
              </div>

              {/* Job Card Footer / Meta */}
              <div className="p-4 sm:p-5 flex flex-col gap-3 flex-grow bg-white">
                <div className="flex gap-2 flex-wrap items-center">
                  <span className="bg-[#86f2e4] text-[#006f66] px-2.5 py-0.5 rounded-md text-xs font-bold">
                    {job.deadlineBadge}
                  </span>
                  <span className="bg-[#eff3ff] text-[#434654] px-2.5 py-0.5 rounded-md text-xs font-semibold">
                    {job.typeBadge}
                  </span>
                  <span className="bg-[#eff3ff] text-[#434654] px-2.5 py-0.5 rounded-md text-xs font-semibold">
                    {job.locationBadge}
                  </span>
                </div>

                <div className="mt-auto flex items-center justify-between pt-2 border-t border-[#eff3ff]">
                  <div className="flex items-center gap-1 text-[#006a61] font-bold text-xs sm:text-sm">
                    <Zap className="w-4 h-4 fill-[#006a61]" />
                    <span>합격 예측률 {job.matchRate}%</span>
                  </div>
                  <span className="text-xs text-[#003fb1] font-semibold flex items-center gap-0.5 group-hover:translate-x-0.5 transition-transform">
                    상세보기 <ChevronRight className="w-3.5 h-3.5" />
                  </span>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
};
