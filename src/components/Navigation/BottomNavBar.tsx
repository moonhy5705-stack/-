import React from 'react';
import { LayoutGrid, TrendingUp, FileText, MessageSquare, User } from 'lucide-react';
import { NavigationTab } from '../../types';

interface BottomNavBarProps {
  currentTab: NavigationTab;
  onTabChange: (tab: NavigationTab) => void;
}

export const BottomNavBar: React.FC<BottomNavBarProps> = ({ currentTab, onTabChange }) => {
  const navItems: { tab: NavigationTab; label: string; icon: React.ReactNode; activeIcon: React.ReactNode }[] = [
    {
      tab: 'home',
      label: '홈',
      icon: <LayoutGrid className="w-5 h-5 mb-1 text-[#434654]" />,
      activeIcon: <LayoutGrid className="w-5 h-5 mb-1 text-[#003fb1] stroke-[2.5]" />
    },
    {
      tab: 'roadmap',
      label: '로드맵',
      icon: <TrendingUp className="w-5 h-5 mb-1 text-[#434654]" />,
      activeIcon: <TrendingUp className="w-5 h-5 mb-1 text-[#003fb1] stroke-[2.5]" />
    },
    {
      tab: 'coverletter',
      label: '자소서',
      icon: <FileText className="w-5 h-5 mb-1 text-[#434654]" />,
      activeIcon: <FileText className="w-5 h-5 mb-1 text-[#003fb1] stroke-[2.5]" />
    },
    {
      tab: 'community',
      label: '커뮤니티',
      icon: <MessageSquare className="w-5 h-5 mb-1 text-[#434654]" />,
      activeIcon: <MessageSquare className="w-5 h-5 mb-1 text-[#003fb1] stroke-[2.5]" />
    },
    {
      tab: 'mypage',
      label: '마이',
      icon: <User className="w-5 h-5 mb-1 text-[#434654]" />,
      activeIcon: <User className="w-5 h-5 mb-1 text-[#003fb1] stroke-[2.5]" />
    }
  ];

  return (
    <nav className="bg-[#f9f9ff] fixed bottom-0 left-0 w-full z-40 flex justify-around items-center h-16 pb-safe px-2 border-t border-[#c3c5d7]/50 md:hidden backdrop-blur-md bg-opacity-95">
      {navItems.map((item) => {
        const isActive = currentTab === item.tab;
        return (
          <button
            key={item.tab}
            onClick={() => onTabChange(item.tab)}
            className={`flex flex-col items-center justify-center flex-1 h-full rounded-xl transition-all duration-150 cursor-pointer ${
              isActive
                ? 'text-[#003fb1] font-bold scale-100'
                : 'text-[#434654] font-medium hover:bg-[#e6eeff]/60 active:scale-95'
            }`}
          >
            {isActive ? item.activeIcon : item.icon}
            <span className={`text-[12px] leading-none ${isActive ? 'text-[#003fb1] font-bold' : 'text-[#434654]'}`}>
              {item.label}
            </span>
          </button>
        );
      })}
    </nav>
  );
};
