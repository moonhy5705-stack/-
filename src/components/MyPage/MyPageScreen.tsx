import React, { useState } from 'react';
import {
  User,
  Settings,
  Target,
  Bookmark,
  FileText,
  Award,
  Bell,
  ChevronRight,
  Shield,
  LogOut,
  Save,
  Building,
  Briefcase
} from 'lucide-react';
import { UserProfile, JobPosting, CoverLetter } from '../../types';

interface MyPageScreenProps {
  userProfile: UserProfile;
  onUpdateProfile: (updated: Partial<UserProfile>) => void;
  bookmarkedJobs: JobPosting[];
  coverLetters: CoverLetter[];
  onSelectJob: (job: JobPosting) => void;
  onSelectCoverLetter: (cl: CoverLetter) => void;
}

export const MyPageScreen: React.FC<MyPageScreenProps> = ({
  userProfile,
  onUpdateProfile,
  bookmarkedJobs,
  coverLetters,
  onSelectJob,
  onSelectCoverLetter
}) => {
  const [isEditingGoal, setIsEditingGoal] = useState(false);
  const [targetCompany, setTargetCompany] = useState(userProfile.targetCompany);
  const [targetRole, setTargetRole] = useState(userProfile.targetRole);
  const [dDay, setDDay] = useState(userProfile.dDay.toString());
  const [name, setName] = useState(userProfile.name);

  const handleSaveGoal = (e: React.FormEvent) => {
    e.preventDefault();
    const parsedDDay = parseInt(dDay, 10) || 30;
    onUpdateProfile({
      name,
      targetCompany,
      targetRole,
      dDay: parsedDDay,
      dDayLabel: `D-${parsedDDay} 하반기 공채`
    });
    setIsEditingGoal(false);
  };

  return (
    <div className="w-full max-w-[1200px] mx-auto px-4 sm:px-6 py-6 sm:py-8 flex flex-col gap-6 pb-28 md:pb-12">
      {/* Profile Overview Card */}
      <section className="bg-white rounded-2xl border border-[#c3c5d7]/60 p-6 shadow-xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <img
              src={userProfile.avatarUrl}
              alt="프로필 이미지"
              className="w-16 h-16 sm:w-20 sm:h-20 rounded-full object-cover border-2 border-[#1a56db]/30 shadow-xs"
            />
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-xl sm:text-2xl font-bold text-[#121c2a]">
                  {userProfile.name}님
                </h2>
                <span className="bg-[#86f2e4] text-[#006f66] text-xs font-bold px-2 py-0.5 rounded-md">
                  취준 회원
                </span>
              </div>
              <p className="text-xs sm:text-sm text-[#434654] mt-1 font-medium">
                목표 기업: <span className="font-bold text-[#003fb1]">{userProfile.targetCompany}</span> | 직무: <span className="font-bold text-[#006a61]">{userProfile.targetRole}</span>
              </p>
              <p className="text-xs text-[#737686] mt-0.5">
                남은 디데이: <span className="font-bold text-[#ba1a1a]">D-{userProfile.dDay}</span>
              </p>
            </div>
          </div>

          <button
            onClick={() => setIsEditingGoal(!isEditingGoal)}
            className="self-start sm:self-center px-4 py-2 border border-[#003fb1] text-[#003fb1] text-xs sm:text-sm font-bold rounded-xl hover:bg-[#eff3ff] transition-colors cursor-pointer"
          >
            {isEditingGoal ? '닫기' : '목표 & 프로필 수정'}
          </button>
        </div>

        {/* Profile Edit Form */}
        {isEditingGoal && (
          <form
            onSubmit={handleSaveGoal}
            className="mt-6 pt-6 border-t border-[#eff3ff] grid grid-cols-1 sm:grid-cols-2 gap-4 animate-in fade-in"
          >
            <div>
              <label className="block text-xs font-bold text-[#434654] mb-1.5">이름 / 닉네임</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full h-10 px-3.5 bg-[#f9f9ff] border border-[#c3c5d7] rounded-xl text-sm focus:outline-none focus:border-[#003fb1]"
                required
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-[#434654] mb-1.5">목표 기업</label>
              <input
                type="text"
                value={targetCompany}
                onChange={(e) => setTargetCompany(e.target.value)}
                placeholder="예: 삼성전자, 현대자동차"
                className="w-full h-10 px-3.5 bg-[#f9f9ff] border border-[#c3c5d7] rounded-xl text-sm focus:outline-none focus:border-[#003fb1]"
                required
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-[#434654] mb-1.5">목표 직무</label>
              <input
                type="text"
                value={targetRole}
                onChange={(e) => setTargetRole(e.target.value)}
                placeholder="예: UX디자이너, 프론트엔드 개발자"
                className="w-full h-10 px-3.5 bg-[#f9f9ff] border border-[#c3c5d7] rounded-xl text-sm focus:outline-none focus:border-[#003fb1]"
                required
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-[#434654] mb-1.5">D-Day 잔여일수</label>
              <input
                type="number"
                min="1"
                max="365"
                value={dDay}
                onChange={(e) => setDDay(e.target.value)}
                className="w-full h-10 px-3.5 bg-[#f9f9ff] border border-[#c3c5d7] rounded-xl text-sm focus:outline-none focus:border-[#003fb1]"
                required
              />
            </div>
            <div className="sm:col-span-2 flex justify-end gap-2 mt-2">
              <button
                type="button"
                onClick={() => setIsEditingGoal(false)}
                className="px-4 py-2 bg-[#eff3ff] text-[#434654] text-xs font-bold rounded-xl hover:bg-[#dee9fd]"
              >
                취소
              </button>
              <button
                type="submit"
                className="px-5 py-2 bg-[#003fb1] text-white text-xs font-bold rounded-xl hover:bg-[#1a56db] flex items-center gap-1.5 shadow-xs"
              >
                <Save className="w-3.5 h-3.5" /> 저장하기
              </button>
            </div>
          </form>
        )}
      </section>

      {/* Activity Stats Bento Grid */}
      <section className="grid grid-cols-2 sm:grid-cols-4 gap-3.5">
        <div className="bg-white p-4 rounded-2xl border border-[#c3c5d7]/50 shadow-2xs flex flex-col items-center justify-center text-center">
          <span className="text-2xl sm:text-3xl font-extrabold text-[#003fb1]">
            {userProfile.progressPercent}%
          </span>
          <span className="text-xs font-semibold text-[#434654] mt-1">취업 준비율</span>
        </div>
        <div className="bg-white p-4 rounded-2xl border border-[#c3c5d7]/50 shadow-2xs flex flex-col items-center justify-center text-center">
          <span className="text-2xl sm:text-3xl font-extrabold text-[#006a61]">
            {coverLetters.length}개
          </span>
          <span className="text-xs font-semibold text-[#434654] mt-1">작성 자소서</span>
        </div>
        <div className="bg-white p-4 rounded-2xl border border-[#c3c5d7]/50 shadow-2xs flex flex-col items-center justify-center text-center">
          <span className="text-2xl sm:text-3xl font-extrabold text-[#1a56db]">
            {bookmarkedJobs.length}개
          </span>
          <span className="text-xs font-semibold text-[#434654] mt-1">스크랩 공고</span>
        </div>
        <div className="bg-white p-4 rounded-2xl border border-[#c3c5d7]/50 shadow-2xs flex flex-col items-center justify-center text-center">
          <span className="text-2xl sm:text-3xl font-extrabold text-[#737686]">
            D-{userProfile.dDay}
          </span>
          <span className="text-xs font-semibold text-[#434654] mt-1">공채 D-Day</span>
        </div>
      </section>

      {/* Bookmarked Jobs Section */}
      <section className="bg-white rounded-2xl border border-[#c3c5d7]/60 p-5 sm:p-6 shadow-xs">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <Bookmark className="w-5 h-5 text-[#003fb1]" />
            <h3 className="text-base sm:text-lg font-bold text-[#121c2a]">
              관심 스크랩 공고 ({bookmarkedJobs.length})
            </h3>
          </div>
        </div>

        {bookmarkedJobs.length === 0 ? (
          <div className="py-8 text-center text-xs text-[#737686]">
            홈 화면에서 관심 공고의 북마크 아이콘을 눌러 저장해보세요.
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {bookmarkedJobs.map((job) => (
              <div
                key={job.id}
                onClick={() => onSelectJob(job)}
                className="p-4 rounded-xl border border-[#eff3ff] bg-[#f9f9ff] hover:bg-[#eff3ff] hover:border-[#003fb1]/30 transition-all cursor-pointer flex justify-between items-center group"
              >
                <div>
                  <span className="text-[10px] font-bold text-[#003fb1] bg-[#dbe1ff] px-2 py-0.5 rounded">
                    {job.company}
                  </span>
                  <h4 className="text-sm font-bold text-[#121c2a] mt-1.5 line-clamp-1 group-hover:text-[#003fb1]">
                    {job.title}
                  </h4>
                  <p className="text-xs text-[#434654] mt-0.5">{job.role}</p>
                </div>
                <ChevronRight className="w-4 h-4 text-[#c3c5d7] group-hover:text-[#003fb1] shrink-0" />
              </div>
            ))}
          </div>
        )}
      </section>

      {/* Account & Settings List */}
      <section className="bg-white rounded-2xl border border-[#c3c5d7]/60 p-5 sm:p-6 shadow-xs">
        <h3 className="text-base sm:text-lg font-bold text-[#121c2a] mb-4">
          앱 설정 및 지원
        </h3>
        <div className="divide-y divide-[#eff3ff] text-sm">
          <div className="py-3 flex items-center justify-between cursor-pointer hover:text-[#003fb1]">
            <span className="font-medium text-[#434654]">실시간 공채 마감일 푸시 알림</span>
            <input type="checkbox" defaultChecked className="w-4 h-4 accent-[#003fb1] cursor-pointer" />
          </div>
          <div className="py-3 flex items-center justify-between cursor-pointer hover:text-[#003fb1]">
            <span className="font-medium text-[#434654]">커뮤니티 댓글 및 멘토 답변 알림</span>
            <input type="checkbox" defaultChecked className="w-4 h-4 accent-[#003fb1] cursor-pointer" />
          </div>
          <div className="py-3 flex items-center justify-between cursor-pointer hover:text-[#003fb1]">
            <span className="font-medium text-[#434654]">취업톡 서비스 이용약관 및 개인정보 처리방침</span>
            <ChevronRight className="w-4 h-4 text-[#c3c5d7]" />
          </div>
          <div className="py-3 flex items-center justify-between cursor-pointer text-[#737686] hover:text-[#ba1a1a]">
            <span className="font-medium">버전 정보: v2.4.0 (최신 버전)</span>
          </div>
        </div>
      </section>
    </div>
  );
};
