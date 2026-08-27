import React from 'react';
import { BriefcaseBusiness, MessageSquareMore, Bell } from 'lucide-react';
import { NavigationTab, AppNotification } from '../../types';

interface TopAppBarProps {
  currentTab: NavigationTab;
  onTabChange: (tab: NavigationTab) => void;
  notifications: AppNotification[];
  onMarkNotificationRead: (id: string) => void;
  isNotifOpen: boolean;
  setIsNotifOpen: (open: boolean) => void;
}

export const TopAppBar: React.FC<TopAppBarProps> = ({
  currentTab,
  onTabChange,
  notifications,
  onMarkNotificationRead,
  isNotifOpen,
  setIsNotifOpen
}) => {
  const unreadCount = notifications.filter(n => !n.read).length;

  return (
    <header className="bg-[#f9f9ff] text-[#003fb1] flex justify-between items-center w-full px-4 sm:px-6 h-16 sticky top-0 z-40 border-b border-[#c3c5d7]/50 backdrop-blur-md bg-opacity-95">
      <div 
        onClick={() => onTabChange('home')}
        className="flex items-center gap-2 cursor-pointer select-none group"
      >
        <div className="relative w-10 h-10 rounded-2xl bg-[#dbe1ff] flex items-center justify-center text-[#003fb1] group-hover:scale-105 transition-transform shadow-xs overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-[#dbe1ff] to-[#bfd2ff]" />
          <BriefcaseBusiness className="relative w-5 h-5 text-[#003fb1]" />
          <MessageSquareMore className="absolute right-1.5 bottom-1.5 w-3 h-3 text-[#006a61] bg-white rounded-full p-0.5 border border-[#dbe1ff]" />
        </div>
        <span className="text-xl font-bold tracking-tight text-[#003fb1]">취업톡</span>
      </div>

      {/* Desktop Navigation Links */}
      <nav className="hidden md:flex items-center gap-1 bg-[#eff3ff] p-1 rounded-full border border-[#c3c5d7]/40">
        <button
          onClick={() => onTabChange('home')}
          className={`px-4 py-1.5 rounded-full text-sm font-semibold transition-all ${
            currentTab === 'home'
              ? 'bg-[#003fb1] text-white shadow-sm'
              : 'text-[#434654] hover:text-[#003fb1] hover:bg-[#e6eeff]'
          }`}
        >
          홈
        </button>
        <button
          onClick={() => onTabChange('roadmap')}
          className={`px-4 py-1.5 rounded-full text-sm font-semibold transition-all ${
            currentTab === 'roadmap'
              ? 'bg-[#003fb1] text-white shadow-sm'
              : 'text-[#434654] hover:text-[#003fb1] hover:bg-[#e6eeff]'
          }`}
        >
          로드맵
        </button>
        <button
          onClick={() => onTabChange('coverletter')}
          className={`px-4 py-1.5 rounded-full text-sm font-semibold transition-all ${
            currentTab === 'coverletter'
              ? 'bg-[#003fb1] text-white shadow-sm'
              : 'text-[#434654] hover:text-[#003fb1] hover:bg-[#e6eeff]'
          }`}
        >
          자소서
        </button>
        <button
          onClick={() => onTabChange('community')}
          className={`px-4 py-1.5 rounded-full text-sm font-semibold transition-all ${
            currentTab === 'community'
              ? 'bg-[#003fb1] text-white shadow-sm'
              : 'text-[#434654] hover:text-[#003fb1] hover:bg-[#e6eeff]'
          }`}
        >
          커뮤니티
        </button>
        <button
          onClick={() => onTabChange('messaging')}
          className={`px-4 py-1.5 rounded-full text-sm font-semibold transition-all ${
            currentTab === 'messaging'
              ? 'bg-[#003fb1] text-white shadow-sm'
              : 'text-[#434654] hover:text-[#003fb1] hover:bg-[#e6eeff]'
          }`}
        >
          메시지
        </button>
        <button
          onClick={() => onTabChange('calendar')}
          className={`px-4 py-1.5 rounded-full text-sm font-semibold transition-all ${
            currentTab === 'calendar'
              ? 'bg-[#003fb1] text-white shadow-sm'
              : 'text-[#434654] hover:text-[#003fb1] hover:bg-[#e6eeff]'
          }`}
        >
          일정
        </button>
        <button
          onClick={() => onTabChange('mypage')}
          className={`px-4 py-1.5 rounded-full text-sm font-semibold transition-all ${
            currentTab === 'mypage'
              ? 'bg-[#003fb1] text-white shadow-sm'
              : 'text-[#434654] hover:text-[#003fb1] hover:bg-[#e6eeff]'
          }`}
        >
          마이
        </button>
      </nav>

      {/* Notifications trigger */}
      <div className="relative">
        <button
          onClick={() => setIsNotifOpen(!isNotifOpen)}
          aria-label="알림"
          className="relative p-2 rounded-full hover:bg-[#eff3ff] text-[#434654] transition-colors active:scale-95 flex items-center justify-center cursor-pointer"
        >
          <Bell className="w-6 h-6" />
          {unreadCount > 0 && (
            <span className="absolute top-1.5 right-1.5 w-2.5 h-2.5 bg-[#ba1a1a] rounded-full ring-2 ring-white"></span>
          )}
        </button>

        {/* Notifications Dropdown */}
        {isNotifOpen && (
          <div className="absolute right-0 mt-2 w-80 sm:w-96 bg-white rounded-2xl shadow-xl border border-[#c3c5d7]/60 py-3 z-50 animate-in fade-in slide-in-from-top-2 duration-150">
            <div className="flex items-center justify-between px-4 pb-2 border-b border-[#c3c5d7]/30">
              <h4 className="font-bold text-sm text-[#121c2a]">알림 내역</h4>
              <span className="text-xs text-[#003fb1] font-semibold">
                안 읽음 {unreadCount}개
              </span>
            </div>
            <div className="max-h-72 overflow-y-auto divide-y divide-[#eff3ff]">
              {notifications.length === 0 ? (
                <div className="py-6 text-center text-xs text-[#434654]">
                  새로운 알림이 없습니다.
                </div>
              ) : (
                notifications.map((notif) => (
                  <div
                    key={notif.id}
                    onClick={() => onMarkNotificationRead(notif.id)}
                    className={`p-3.5 hover:bg-[#eff3ff]/70 transition-colors cursor-pointer flex items-start gap-3 ${
                      !notif.read ? 'bg-[#f9f9ff]' : ''
                    }`}
                  >
                    <div className={`w-2 h-2 mt-1.5 rounded-full shrink-0 ${!notif.read ? 'bg-[#003fb1]' : 'bg-transparent'}`} />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <p className="text-xs font-bold text-[#121c2a] truncate">{notif.title}</p>
                        <span className="text-[10px] text-[#737686]">{notif.timeAgo}</span>
                      </div>
                      <p className="text-xs text-[#434654] mt-0.5 line-clamp-2">{notif.message}</p>
                    </div>
                  </div>
                ))
              )}
            </div>
            <div className="pt-2 px-4 border-t border-[#c3c5d7]/30 text-center">
              <button 
                onClick={() => notifications.forEach(n => onMarkNotificationRead(n.id))}
                className="text-xs text-[#003fb1] hover:underline font-semibold"
              >
                모두 읽음으로 표시
              </button>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};
