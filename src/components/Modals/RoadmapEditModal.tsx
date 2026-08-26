import React, { useState } from 'react';
import { X, Plus, Trash2, CheckCircle2, RefreshCw, Clock, Save } from 'lucide-react';
import { RoadmapStep, UserProfile } from '../../types';

interface RoadmapEditModalProps {
  isOpen: boolean;
  onClose: () => void;
  steps: RoadmapStep[];
  userProfile: UserProfile;
  onUpdateSteps: (steps: RoadmapStep[]) => void;
  onUpdateTarget: (company: string, role: string) => void;
}

export const RoadmapEditModal: React.FC<RoadmapEditModalProps> = ({
  isOpen,
  onClose,
  steps,
  userProfile,
  onUpdateSteps,
  onUpdateTarget
}) => {
  const [localSteps, setLocalSteps] = useState<RoadmapStep[]>(steps);
  const [targetCompany, setTargetCompany] = useState(userProfile.targetCompany);
  const [targetRole, setTargetRole] = useState(userProfile.targetRole);

  const [newTitle, setNewTitle] = useState('');
  const [newNotes, setNewNotes] = useState('');
  const [newDate, setNewDate] = useState('예상 완료: 2024.01.15');
  const [newStatus, setNewStatus] = useState<'completed' | 'in_progress' | 'pending'>('pending');

  if (!isOpen) return null;

  const handleStepStatusChange = (id: string, status: 'completed' | 'in_progress' | 'pending') => {
    setLocalSteps((prev) =>
      prev.map((step) => {
        if (step.id === id) {
          let badgeText = step.badgeText;
          if (status === 'completed') badgeText = '완료: ' + new Date().toISOString().slice(0, 10);
          if (status === 'in_progress') badgeText = '진행 중';
          if (status === 'pending') badgeText = '예상 시작';
          return { ...step, status, badgeText };
        }
        return step;
      })
    );
  };

  const handleDeleteStep = (id: string) => {
    setLocalSteps((prev) => prev.filter((s) => s.id !== id));
  };

  const handleAddStep = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim()) return;

    const newStepItem: RoadmapStep = {
      id: `step-${Date.now()}`,
      stepNumber: localSteps.length + 1,
      title: `${localSteps.length + 1}단계: ${newTitle.trim()}`,
      category: '직무/자격증',
      status: newStatus,
      dateLabel: newDate,
      badgeText: newDate,
      notes: newNotes.trim() || '목표 달성을 위한 상세 계획 수립'
    };

    setLocalSteps((prev) => [...prev, newStepItem]);
    setNewTitle('');
    setNewNotes('');
  };

  const handleSaveAll = () => {
    onUpdateTarget(targetCompany, targetRole);
    onUpdateSteps(localSteps);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs animate-in fade-in duration-150">
      <div className="bg-white w-full max-w-2xl rounded-2xl shadow-2xl border border-[#c3c5d7]/60 overflow-hidden flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="p-5 border-b border-[#eff3ff] flex items-center justify-between bg-[#f9f9ff]">
          <h3 className="text-lg font-bold text-[#121c2a]">합격 로드맵 계획 수정</h3>
          <button
            onClick={onClose}
            className="p-1 text-[#737686] hover:text-[#121c2a] hover:bg-[#dee9fd] rounded-full transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-5 overflow-y-auto flex-1 flex flex-col gap-6">
          {/* Target Company & Role */}
          <div className="bg-[#eff3ff]/60 p-4 rounded-xl border border-[#c3c5d7]/40 flex flex-col sm:flex-row gap-3">
            <div className="flex-1">
              <label className="block text-xs font-bold text-[#434654] mb-1">목표 기업</label>
              <input
                type="text"
                value={targetCompany}
                onChange={(e) => setTargetCompany(e.target.value)}
                className="w-full h-9 px-3 bg-white border border-[#c3c5d7] rounded-lg text-sm focus:outline-none focus:border-[#003fb1]"
              />
            </div>
            <div className="flex-1">
              <label className="block text-xs font-bold text-[#434654] mb-1">목표 직무</label>
              <input
                type="text"
                value={targetRole}
                onChange={(e) => setTargetRole(e.target.value)}
                className="w-full h-9 px-3 bg-white border border-[#c3c5d7] rounded-lg text-sm focus:outline-none focus:border-[#003fb1]"
              />
            </div>
          </div>

          {/* Existing Steps List */}
          <div>
            <h4 className="text-sm font-bold text-[#121c2a] mb-3">단계별 현황 관리</h4>
            <div className="flex flex-col gap-3">
              {localSteps.map((step, idx) => (
                <div
                  key={step.id}
                  className="p-3.5 bg-[#f9f9ff] border border-[#c3c5d7]/60 rounded-xl flex flex-col sm:flex-row sm:items-center justify-between gap-3"
                >
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-sm text-[#121c2a] truncate">
                        {step.title}
                      </span>
                    </div>
                    <p className="text-xs text-[#737686] mt-0.5 truncate">{step.notes}</p>
                  </div>

                  <div className="flex items-center gap-2 self-end sm:self-center shrink-0">
                    <select
                      value={step.status}
                      onChange={(e) =>
                        handleStepStatusChange(
                          step.id,
                          e.target.value as 'completed' | 'in_progress' | 'pending'
                        )
                      }
                      className={`text-xs font-bold px-2.5 py-1.5 rounded-lg border cursor-pointer ${
                        step.status === 'completed'
                          ? 'bg-[#86f2e4] text-[#006f66] border-[#86f2e4]'
                          : step.status === 'in_progress'
                          ? 'bg-[#dbe1ff] text-[#003fb1] border-[#dbe1ff]'
                          : 'bg-white text-[#737686] border-[#c3c5d7]'
                      }`}
                    >
                      <option value="completed">완료</option>
                      <option value="in_progress">진행 중</option>
                      <option value="pending">준비 예정</option>
                    </select>

                    <button
                      onClick={() => handleDeleteStep(step.id)}
                      className="p-1.5 text-[#c3c5d7] hover:text-[#ba1a1a] hover:bg-[#ffdad6]/40 rounded-lg transition-colors"
                      title="삭제"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Add New Step Form */}
          <form
            onSubmit={handleAddStep}
            className="p-4 bg-white border border-[#c3c5d7]/60 rounded-xl flex flex-col gap-3"
          >
            <h4 className="text-xs font-bold text-[#003fb1] flex items-center gap-1">
              <Plus className="w-3.5 h-3.5" /> 새 로드맵 단계 추가
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <input
                type="text"
                value={newTitle}
                onChange={(e) => setNewTitle(e.target.value)}
                placeholder="단계 제목 (예: 토익 스피킹 180점 달성)"
                className="h-9 px-3 bg-[#f9f9ff] border border-[#c3c5d7] rounded-lg text-xs sm:text-sm focus:outline-none focus:border-[#003fb1]"
                required
              />
              <input
                type="text"
                value={newDate}
                onChange={(e) => setNewDate(e.target.value)}
                placeholder="목표 일정 (예: 예상 완료: 2024.02.28)"
                className="h-9 px-3 bg-[#f9f9ff] border border-[#c3c5d7] rounded-lg text-xs sm:text-sm focus:outline-none focus:border-[#003fb1]"
              />
            </div>
            <textarea
              value={newNotes}
              onChange={(e) => setNewNotes(e.target.value)}
              placeholder="상세 실행 계획이나 메모를 입력하세요."
              rows={2}
              className="p-2.5 bg-[#f9f9ff] border border-[#c3c5d7] rounded-lg text-xs sm:text-sm focus:outline-none focus:border-[#003fb1] resize-none"
            />
            <div className="flex justify-between items-center">
              <select
                value={newStatus}
                onChange={(e) =>
                  setNewStatus(e.target.value as 'completed' | 'in_progress' | 'pending')
                }
                className="text-xs px-2.5 py-1.5 bg-[#eff3ff] border border-[#c3c5d7]/50 rounded-lg text-[#434654] font-medium"
              >
                <option value="pending">준비 예정</option>
                <option value="in_progress">진행 중</option>
                <option value="completed">완료</option>
              </select>
              <button
                type="submit"
                className="px-4 py-1.5 bg-[#006a61] text-white text-xs font-bold rounded-lg hover:bg-[#005049] transition-colors"
              >
                단계 리스트에 추가
              </button>
            </div>
          </form>
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-[#eff3ff] bg-[#f9f9ff] flex justify-end gap-2">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-[#eff3ff] text-[#434654] text-xs font-bold rounded-xl hover:bg-[#dee9fd]"
          >
            취소
          </button>
          <button
            onClick={handleSaveAll}
            className="px-5 py-2 bg-[#003fb1] text-white text-xs font-bold rounded-xl hover:bg-[#1a56db] flex items-center gap-1.5 shadow-xs font-bold"
          >
            <Save className="w-3.5 h-3.5" /> 변경 사항 저장
          </button>
        </div>
      </div>
    </div>
  );
};
