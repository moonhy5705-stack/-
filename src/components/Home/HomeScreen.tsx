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
  Sparkles,
  Building2,
  Award,
  Users,
  TrendingUp
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

  const similarProfiles = [
    {
      name: '김서연',
      role: 'UX/UI 디자인',
      match: 92,
      targetCompanies: ['삼성전자', '네이버', '카카오'],
      certs: ['GTQ', 'ADsP', '컴활 1급']
    },
    {
      name: '최현우',
      role: '프론트엔드',
      match: 89,
      targetCompanies: ['네이버', '카카오', '당근'],
      certs: ['정보처리기사', 'SQLD', 'TOEIC 900']
    },
    {
      name: '박지민',
      role: '기획/서비스',
      match: 86,
      targetCompanies: ['배달의민족', '토스', 'CJ ENM'],
      certs: ['ADsP', 'GICC', '컴활 1급']
    }
  ];

  const popularCompanies = [
    { name: '삼성전자', count: 32, accent: 'bg-[#dbe1ff] text-[#003fb1]' },
    { name: '네이버', count: 28, accent: 'bg-[#dff6ee] text-[#006a61]' },
    { name: '카카오', count: 24, accent: 'bg-[#ffdad6] text-[#93000a]' },
    { name: '현대자동차', count: 18, accent: 'bg-[#e9f1ff] text-[#003fb1]' }
  ];

  const popularCerts = [
    { name: 'ADsP', count: 41, accent: 'bg-[#eff3ff] text-[#003fb1]' },
    { name: 'TOEIC', count: 36, accent: 'bg-[#dff6ee] text-[#006a61]' },
    { name: 'GTQ', count: 27, accent: 'bg-[#ecf4ff] text-[#003fb1]' },
    { name: '정보처리기사', count: 22, accent: 'bg-[#fff2d7] text-[#7a4d00]' }
  ];

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
            <p className="text-[11px] text-[#434654] font-medium mt-0.5">
              {userProfile.schoolName} {userProfile.grade}학년 {userProfile.classNumber}반 {userProfile.studentNumber}번
            </p>
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

      <section className="grid grid-cols-1 xl:grid-cols-2 gap-4 sm:gap-6">
        {/* School Portal Highlight Card */}
        <section className="bg-gradient-to-br from-[#003fb1] via-[#1a56db] to-[#0a4ebd] p-6 sm:p-8 rounded-3xl shadow-lg border border-[#003fb1]/30 relative overflow-hidden group min-h-[280px]">
          <div className="absolute top-0 right-0 w-52 h-52 bg-white/5 rounded-full -mr-24 -mt-24 group-hover:scale-110 transition-transform duration-500"></div>
          <div className="absolute bottom-0 left-0 w-40 h-40 bg-white/5 rounded-full -ml-18 -mb-18"></div>

          <div className="relative z-10 flex flex-col gap-4 h-full">
            <div className="flex items-center justify-between gap-3">
              <div>
                <p className="text-xs sm:text-sm font-bold text-[#86f2e4] uppercase tracking-wider">YES 시스템</p>
                <h3 className="text-2xl sm:text-4xl font-extrabold text-white mt-1 tracking-tight">
                  {userProfile.schoolName}
                </h3>
              </div>
              <div className="bg-white/10 border border-white/20 px-3 py-1.5 rounded-full text-xs font-bold text-white">
                학생 포털
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-sm text-[#dfe8ff]">
              <div className="bg-white/8 rounded-2xl p-3 border border-white/10 backdrop-blur-sm">
                <div className="text-[11px] uppercase tracking-wide text-[#c3dbff]">학적</div>
                <div className="mt-1 font-bold text-white">{userProfile.grade}학년 {userProfile.classNumber}반</div>
              </div>
              <div className="bg-white/8 rounded-2xl p-3 border border-white/10 backdrop-blur-sm">
                <div className="text-[11px] uppercase tracking-wide text-[#c3dbff]">출결</div>
                <div className="mt-1 font-bold text-white">정상 98.2%</div>
              </div>
              <div className="bg-white/8 rounded-2xl p-3 border border-white/10 backdrop-blur-sm">
                <div className="text-[11px] uppercase tracking-wide text-[#c3dbff]">봉사</div>
                <div className="mt-1 font-bold text-white">32시간</div>
              </div>
            </div>

            <div className="flex flex-wrap gap-3 pt-2 mt-auto">
              <button
                onClick={() => onNavigateTab('mypage')}
                className="px-4 py-2 bg-white text-[#003fb1] font-bold text-sm rounded-lg shadow-lg active:scale-95 cursor-pointer"
              >
                생기부 열람
              </button>
              <button
                onClick={() => window.open('https://www.yeosupetro.hs.kr', '_blank', 'noopener,noreferrer')}
                className="px-4 py-2 bg-white/10 text-white font-bold text-sm rounded-lg border border-white/20 hover:bg-white/15 cursor-pointer"
              >
                학교 홈페이지
              </button>
            </div>
          </div>
        </section>

        {/* Target Company Highlight Card */}
        <section className="bg-gradient-to-br from-[#003fb1] via-[#003fb1] to-[#1a56db] p-6 sm:p-8 rounded-3xl shadow-lg border border-[#003fb1]/30 relative overflow-hidden group min-h-[280px]">
        {/* Decorative Background Elements */}
        <div className="absolute top-0 right-0 w-48 h-48 bg-white/5 rounded-full -mr-24 -mt-24 group-hover:scale-110 transition-transform duration-500"></div>
        <div className="absolute bottom-0 left-0 w-32 h-32 bg-white/5 rounded-full -ml-16 -mb-16"></div>
        
        <div className="relative z-10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-2">
              <Briefcase className="w-5 h-5 sm:w-6 sm:h-6 text-[#86f2e4] flex-shrink-0" />
              <span className="text-xs sm:text-sm font-bold text-[#86f2e4] uppercase tracking-wider">
                목표 기업
              </span>
            </div>
            <h3 className="text-3xl sm:text-5xl font-extrabold text-white mb-2 tracking-tight leading-tight">
              {userProfile.targetCompany}
            </h3>
            <div className="flex flex-col gap-2">
              <p className="text-base sm:text-lg text-[#c3dbff] font-semibold">
                직무: <span className="text-white font-bold">{userProfile.targetRole}</span>
              </p>
              <div className="flex items-center gap-3 pt-2">
                <div className="flex items-center gap-2">
                  <span className="inline-block w-2 h-2 rounded-full bg-[#86f2e4]"></span>
                  <span className="text-sm text-[#c3dbff]">
                    {userProfile.dDayLabel}
                  </span>
                </div>
                <span className="text-[#c3dbff]/50">•</span>
                <span className="text-sm text-[#c3dbff]">
                  달성도: <span className="font-bold text-[#86f2e4]">{userProfile.progressPercent}%</span>
                </span>
              </div>
            </div>
          </div>

          {/* D-Day Progress Ring */}
          <div className="w-28 h-28 sm:w-32 sm:h-32 flex-shrink-0 relative">
            <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
              <circle
                cx="50"
                cy="50"
                r="40"
                className="text-white/20"
                stroke="currentColor"
                strokeWidth="6"
                fill="none"
              />
              <circle
                cx="50"
                cy="50"
                r="40"
                className="text-[#86f2e4] transition-all duration-1000 ease-out"
                stroke="currentColor"
                strokeWidth="6"
                strokeDasharray={`${(userProfile.progressPercent / 100) * 251.3}, 251.3`}
                strokeLinecap="round"
                fill="none"
              />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className="text-2xl sm:text-3xl font-extrabold text-white">
                {userProfile.progressPercent}%
              </span>
              <span className="text-xs font-bold text-[#c3dbff]">진행도</span>
            </div>
          </div>
        </div>

        {/* Action Button */}
        <div className="relative z-10 mt-6 pt-4 border-t border-white/20 flex items-center justify-between sm:justify-start gap-3">
          <p className="text-sm text-[#c3dbff]">
            <span className="font-bold text-white">{userProfile.completedTasksCount}</span>개 완료 • 
            <span className="font-bold text-white ml-1">{userProfile.totalTasksCount - userProfile.completedTasksCount}</span>개 남음
          </p>
          <button
            onClick={() => onNavigateTab('roadmap')}
            className="ml-auto sm:ml-4 px-4 py-2 bg-white/95 hover:bg-white text-[#003fb1] font-bold text-sm rounded-lg transition-all shadow-lg active:scale-95 cursor-pointer"
          >
            로드맵 보기
          </button>
        </div>
        </section>
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

      {/* Similar Profile Insights Section */}
      <section className="mt-2">
        <div className="flex justify-between items-end mb-4">
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-xl sm:text-2xl font-bold text-[#121c2a] tracking-tight">
                나와 비슷한 스펙의 사람들은
              </h3>
              <span className="hidden sm:inline-flex items-center gap-1 text-[11px] font-bold bg-[#dbe1ff] text-[#003fb1] px-2 py-0.5 rounded-md">
                <Users className="w-3 h-3" /> 맞춤 분석
              </span>
            </div>
            <p className="text-xs sm:text-sm text-[#434654] mt-1">
              {userProfile.name}님과 비슷한 취준생들이 어떤 기업과 자격증을 함께 준비하는지 확인해보세요.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-[1.1fr_1fr_1fr] gap-4 sm:gap-5">
          <article className="bg-white rounded-2xl border border-[#c3c5d7]/60 shadow-xs hover:shadow-md transition-all overflow-hidden">
            <div className="p-5 border-b border-[#eff3ff] bg-[#f9f9ff]/70">
              <div className="flex items-center gap-2">
                <Users className="w-4 h-4 text-[#003fb1]" />
                <h4 className="font-bold text-[#121c2a]">유사 프로필 TOP 3</h4>
              </div>
            </div>
            <div className="p-5 space-y-4">
              {similarProfiles.map((profile) => (
                <div key={profile.name} className="rounded-2xl border border-[#eff3ff] bg-[#f9f9ff] p-3.5">
                  <div className="flex items-center justify-between gap-3 mb-2.5">
                    <div className="flex items-center gap-2.5 min-w-0">
                      <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#dbe1ff] to-[#bfd2ff] text-[#003fb1] flex items-center justify-center font-bold text-sm shrink-0">
                        {profile.name.slice(0, 1)}
                      </div>
                      <div className="min-w-0">
                        <p className="font-bold text-[#121c2a] text-sm truncate">{profile.name}</p>
                        <p className="text-[11px] text-[#434654] truncate">{profile.role}</p>
                      </div>
                    </div>
                    <div className="bg-[#eff3ff] text-[#003fb1] px-2 py-1 rounded-full text-[10px] font-extrabold">
                      스펙 유사도 {profile.match}%
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-1.5 mb-2.5">
                    {profile.targetCompanies.map((company) => (
                      <span key={company} className="px-2 py-1 text-[10px] rounded-full bg-[#dbe1ff] text-[#003fb1] font-semibold">
                        {company}
                      </span>
                    ))}
                  </div>

                  <div className="flex flex-wrap gap-1.5">
                    {profile.certs.map((cert) => (
                      <span key={cert} className="px-2 py-1 text-[10px] rounded-full bg-[#eafaf5] text-[#006a61] font-semibold">
                        {cert}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </article>

          <article className="bg-white rounded-2xl border border-[#c3c5d7]/60 shadow-xs hover:shadow-md transition-all overflow-hidden">
            <div className="p-5 border-b border-[#eff3ff] bg-[#f9f9ff]/70">
              <div className="flex items-center gap-2">
                <Building2 className="w-4 h-4 text-[#003fb1]" />
                <h4 className="font-bold text-[#121c2a]">많이 준비하는 기업</h4>
              </div>
            </div>
            <div className="p-5 space-y-4">
              {popularCompanies.map((company, index) => (
                <div key={company.name}>
                  <div className="flex items-center justify-between mb-1.5">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-bold text-[#434654]">{index + 1}</span>
                      <span className="font-bold text-[#121c2a] text-sm">{company.name}</span>
                    </div>
                    <span className="text-xs text-[#434654] font-semibold">{company.count}%</span>
                  </div>
                  <div className="w-full bg-[#eef2ff] rounded-full h-2.5 overflow-hidden">
                    <div
                      className={`h-full rounded-full ${company.accent.includes('bg-[#dbe1ff]') ? 'bg-[#003fb1]' : company.accent.includes('bg-[#dff6ee]') ? 'bg-[#006a61]' : company.accent.includes('bg-[#ffdad6]') ? 'bg-[#93000a]' : 'bg-[#4d7ae5]'}`}
                      style={{ width: `${company.count}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </article>

          <article className="bg-white rounded-2xl border border-[#c3c5d7]/60 shadow-xs hover:shadow-md transition-all overflow-hidden">
            <div className="p-5 border-b border-[#eff3ff] bg-[#f9f9ff]/70">
              <div className="flex items-center gap-2">
                <Award className="w-4 h-4 text-[#003fb1]" />
                <h4 className="font-bold text-[#121c2a]">자격증 준비 경향</h4>
              </div>
            </div>
            <div className="p-5 space-y-4">
              {popularCerts.map((cert, index) => (
                <div key={cert.name}>
                  <div className="flex items-center justify-between mb-1.5">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-bold text-[#434654]">{index + 1}</span>
                      <span className="font-bold text-[#121c2a] text-sm">{cert.name}</span>
                    </div>
                    <span className="text-xs text-[#434654] font-semibold">{cert.count}%</span>
                  </div>
                  <div className="w-full bg-[#eef2ff] rounded-full h-2.5 overflow-hidden">
                    <div
                      className={`h-full rounded-full ${cert.accent.includes('bg-[#eff3ff]') ? 'bg-[#003fb1]' : cert.accent.includes('bg-[#dff6ee]') ? 'bg-[#006a61]' : cert.accent.includes('bg-[#ecf4ff]') ? 'bg-[#1a56db]' : 'bg-[#d19300]'}`}
                      style={{ width: `${cert.count}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </article>
        </div>

        <div className="mt-5 bg-gradient-to-r from-[#003fb1] via-[#1a56db] to-[#0058d6] rounded-2xl border border-[#003fb1]/30 p-5 shadow-lg text-white">
          <div className="flex items-center gap-2 mb-2">
            <TrendingUp className="w-4 h-4 text-[#86f2e4]" />
            <span className="text-xs font-bold uppercase tracking-wider text-[#86f2e4]">추천 인사이트</span>
          </div>
          <p className="text-sm sm:text-base leading-relaxed text-[#ecf4ff]">
            비슷한 스펙의 취준생들은 <span className="font-bold text-white">삼성전자·네이버·카카오</span>를 가장 많이 준비하고,
            <span className="font-bold text-white"> ADsP, TOEIC, GTQ </span> 조합을 함께 준비하는 패턴이 많습니다.
            당신의 커리어 루트도 이 흐름에 맞춰 준비하면 경쟁력을 더 높일 수 있어요.
          </p>
        </div>
      </section>
    </div>
  );
};
