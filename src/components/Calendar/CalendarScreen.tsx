import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, Calendar, Plus, Clock, MapPin, CheckCircle2 } from 'lucide-react';
import { CalendarEvent } from '../../types';

interface CalendarScreenProps {
  events: CalendarEvent[];
  onEventClick: (event: CalendarEvent) => void;
  onAddEvent: () => void;
}

export const CalendarScreen: React.FC<CalendarScreenProps> = ({
  events,
  onEventClick,
  onAddEvent
}) => {
  const [currentDate, setCurrentDate] = useState(new Date(2026, 8, 26)); // September 26, 2026

  const daysInMonth = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
  };

  const firstDayOfMonth = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth(), 1).getDay();
  };

  const monthName = (date: Date) => {
    return date.toLocaleString('ko-KR', { month: 'long', year: 'numeric' });
  };

  const getDateString = (day: number) => {
    return `${currentDate.getFullYear()}-${String(currentDate.getMonth() + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
  };

  const getEventsForDate = (day: number) => {
    const dateStr = getDateString(day);
    return events.filter((e) => e.date === dateStr);
  };

  const calculateDDay = (dateStr: string) => {
    const today = new Date(2026, 8, 26);
    const eventDate = new Date(dateStr);
    const timeDiff = eventDate.getTime() - today.getTime();
    const daysDiff = Math.ceil(timeDiff / (1000 * 3600 * 24));
    return daysDiff;
  };

  const getEventColor = (type: string) => {
    const colors: Record<string, string> = {
      exam: 'bg-[#fef3c7] text-[#92400e] border-[#fcd34d]',
      deadline: 'bg-[#fee2e2] text-[#7f1d1d] border-[#fca5a5]',
      interview: 'bg-[#d1fae5] text-[#065f46] border-[#6ee7b7]',
      task: 'bg-[#ede9fe] text-[#5b21b6] border-[#c4b5fd]',
      personal: 'bg-[#d1e7f5] text-[#1e40af] border-[#93c5fd]'
    };
    return colors[type] || colors.personal;
  };

  const typeLabel: Record<string, string> = {
    exam: '시험',
    deadline: '마감',
    interview: '면접',
    task: '할 일',
    personal: '일정'
  };

  const days = Array.from({ length: daysInMonth(currentDate) }, (_, i) => i + 1);
  const emptyDays = Array.from({ length: firstDayOfMonth(currentDate) }, (_, i) => i);
  const dayLabels = ['일', '월', '화', '수', '목', '금', '토'];

  const previousMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1));
  };

  const nextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1));
  };

  const today = new Date(2026, 8, 26);
  const isToday = (day: number) => {
    return (
      day === today.getDate() &&
      currentDate.getMonth() === today.getMonth() &&
      currentDate.getFullYear() === today.getFullYear()
    );
  };

  // Get upcoming events (next 10 days)
  const upcomingEvents = events
    .filter((e) => {
      const dDay = calculateDDay(e.date);
      return dDay >= 0 && dDay <= 10;
    })
    .sort((a, b) => calculateDDay(a.date) - calculateDDay(b.date))
    .slice(0, 10);

  return (
    <div className="w-full max-w-[1200px] mx-auto px-4 sm:px-6 py-6 sm:py-8 flex flex-col gap-6 pb-28 md:pb-12">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-[#121c2a] tracking-tight">
            일정 관리
          </h1>
          <p className="text-xs sm:text-sm text-[#434654] mt-1">
            공채 일정, 시험, 면접 등을 한눈에 관리하세요
          </p>
        </div>
        <button
          onClick={onAddEvent}
          className="px-4 py-2.5 bg-[#003fb1] hover:bg-[#1a56db] text-white font-bold text-sm rounded-lg flex items-center gap-2 transition-colors cursor-pointer active:scale-95"
        >
          <Plus className="w-4 h-4" />
          <span className="hidden sm:inline">일정 추가</span>
        </button>
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Calendar */}
        <div className="lg:col-span-2">
          <div className="bg-white border border-[#c3c5d7]/50 rounded-2xl shadow-xs p-6">
            {/* Month Navigation */}
            <div className="flex items-center justify-between mb-6">
              <button
                onClick={previousMonth}
                className="p-2 text-[#737686] hover:text-[#003fb1] hover:bg-[#eff3ff] rounded-lg transition-colors cursor-pointer"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>

              <h2 className="text-xl font-bold text-[#121c2a] min-w-[150px] text-center">
                {monthName(currentDate)}
              </h2>

              <button
                onClick={nextMonth}
                className="p-2 text-[#737686] hover:text-[#003fb1] hover:bg-[#eff3ff] rounded-lg transition-colors cursor-pointer"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>

            {/* Day Labels */}
            <div className="grid grid-cols-7 gap-2 mb-3">
              {dayLabels.map((day) => (
                <div
                  key={day}
                  className="text-center text-sm font-bold text-[#737686] py-2"
                >
                  {day}
                </div>
              ))}
            </div>

            {/* Calendar Grid */}
            <div className="grid grid-cols-7 gap-2">
              {emptyDays.map((_, i) => (
                <div key={`empty-${i}`} className="aspect-square"></div>
              ))}

              {days.map((day) => {
                const dayEvents = getEventsForDate(day);
                const isTodayDate = isToday(day);

                return (
                  <div
                    key={day}
                    className={`aspect-square p-2 rounded-xl border-2 transition-all cursor-pointer flex flex-col ${
                      isTodayDate
                        ? 'bg-[#003fb1] border-[#003fb1]'
                        : dayEvents.length > 0
                          ? 'bg-[#eff3ff] border-[#dbe1ff]'
                          : 'bg-white border-[#c3c5d7]/30 hover:border-[#c3c5d7]/60'
                    }`}
                  >
                    <span
                      className={`text-xs sm:text-sm font-bold ${
                        isTodayDate ? 'text-white' : 'text-[#121c2a]'
                      }`}
                    >
                      {day}
                    </span>

                    {dayEvents.length > 0 && (
                      <div className="flex-1 flex flex-col gap-0.5 mt-1 min-w-0">
                        {dayEvents.slice(0, 2).map((event) => (
                          <button
                            key={event.id}
                            onClick={(e) => {
                              e.stopPropagation();
                              onEventClick(event);
                            }}
                            className={`text-[9px] sm:text-[10px] px-1 py-0.5 rounded font-bold truncate transition-opacity hover:opacity-80 ${getEventColor(event.type)}`}
                          >
                            {event.title}
                          </button>
                        ))}
                        {dayEvents.length > 2 && (
                          <span className="text-[9px] text-[#737686] px-1">
                            +{dayEvents.length - 2}개
                          </span>
                        )}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Upcoming Events Sidebar */}
        <div className="lg:col-span-1">
          <div className="bg-white border border-[#c3c5d7]/50 rounded-2xl shadow-xs p-6 sticky top-24">
            <h3 className="text-lg font-bold text-[#121c2a] mb-4 flex items-center gap-2 tracking-tight">
              <Calendar className="w-5 h-5 text-[#003fb1]" />
              다가오는 일정
            </h3>

            <div className="space-y-3 max-h-[600px] overflow-y-auto">
              {upcomingEvents.length === 0 ? (
                <p className="text-sm text-[#737686] text-center py-8">
                  예정된 일정이 없습니다
                </p>
              ) : (
                upcomingEvents.map((event) => {
                  const dDay = calculateDDay(event.date);
                  const eventDate = new Date(event.date);

                  return (
                    <button
                      key={event.id}
                      onClick={() => onEventClick(event)}
                      className={`w-full p-3 rounded-xl border-2 text-left transition-all hover:shadow-md active:scale-95 cursor-pointer ${getEventColor(event.type)}`}
                    >
                      <div className="flex items-start justify-between mb-2">
                        <span className="text-xs font-bold uppercase tracking-wider">
                          {typeLabel[event.type]}
                        </span>
                        <span className="text-sm font-extrabold text-[#003fb1]">
                          D-{dDay}
                        </span>
                      </div>

                      <p className="font-bold text-sm line-clamp-2 mb-2">
                        {event.title}
                      </p>

                      <div className="space-y-1 text-xs">
                        <div className="flex items-center gap-2">
                          <Clock className="w-3.5 h-3.5 flex-shrink-0" />
                          <span>
                            {eventDate.toLocaleDateString('ko-KR', {
                              month: '2-digit',
                              day: '2-digit',
                              weekday: 'short'
                            })}
                          </span>
                        </div>

                        {event.company && (
                          <div className="flex items-center gap-2">
                            <MapPin className="w-3.5 h-3.5 flex-shrink-0" />
                            <span>{event.company}</span>
                          </div>
                        )}

                        {event.description && (
                          <p className="text-[11px] opacity-75 line-clamp-2 mt-2">
                            {event.description}
                          </p>
                        )}
                      </div>
                    </button>
                  );
                })
              )}
            </div>
          </div>
        </div>
      </div>

      {/* All Events Table */}
      <div className="bg-white border border-[#c3c5d7]/50 rounded-2xl shadow-xs overflow-hidden">
        <div className="p-6 border-b border-[#eff3ff]">
          <h3 className="text-lg font-bold text-[#121c2a] tracking-tight">
            전체 일정
          </h3>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-[#f9f9ff] border-b border-[#eff3ff]">
              <tr>
                <th className="px-6 py-4 text-left text-sm font-bold text-[#434654]">
                  일정
                </th>
                <th className="px-6 py-4 text-left text-sm font-bold text-[#434654]">
                  날짜
                </th>
                <th className="px-6 py-4 text-left text-sm font-bold text-[#434654]">
                  유형
                </th>
                <th className="px-6 py-4 text-left text-sm font-bold text-[#434654]">
                  D-DAY
                </th>
                <th className="px-6 py-4 text-left text-sm font-bold text-[#434654]">
                  회사
                </th>
              </tr>
            </thead>
            <tbody>
              {events.map((event, index) => {
                const dDay = calculateDDay(event.date);
                const eventDate = new Date(event.date);

                return (
                  <tr
                    key={event.id}
                    onClick={() => onEventClick(event)}
                    className={`border-b border-[#eff3ff] hover:bg-[#f9f9ff] transition-colors cursor-pointer ${
                      index % 2 === 0 ? 'bg-white' : 'bg-[#fafbff]'
                    }`}
                  >
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <span
                          className={`text-xs font-bold px-2.5 py-1 rounded-md ${getEventColor(event.type)}`}
                        >
                          {typeLabel[event.type]}
                        </span>
                        <span className="text-sm font-semibold text-[#121c2a] line-clamp-1">
                          {event.title}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-sm text-[#434654]">
                        {eventDate.toLocaleDateString('ko-KR')}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-sm text-[#737686]">
                        {typeLabel[event.type]}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <span
                        className={`text-sm font-bold ${
                          dDay <= 7
                            ? 'text-[#dc2626]'
                            : dDay <= 14
                              ? 'text-[#f59e0b]'
                              : 'text-[#003fb1]'
                        }`}
                      >
                        D-{dDay}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-sm text-[#434654]">
                        {event.company || '-'}
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
