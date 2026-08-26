import React, { useState } from 'react';
import { X, Plus, Trash2, Building, Briefcase, Calendar } from 'lucide-react';
import { CoverLetter } from '../../types';

interface NewCoverLetterModalProps {
  isOpen: boolean;
  onClose: () => void;
  onCreate: (newLetter: CoverLetter) => void;
}

export const NewCoverLetterModal: React.FC<NewCoverLetterModalProps> = ({
  isOpen,
  onClose,
  onCreate
}) => {
  const [company, setCompany] = useState('');
  const [role, setRole] = useState('');
  const [type, setType] = useState('신입 공채');
  const [deadline, setDeadline] = useState('2024.01.30');
  const [questionPrompts, setQuestionPrompts] = useState<string[]>([
    '지원한 동기와 입사 후 이루고 싶은 목표를 구체적으로 기술해 주십시오.',
    '지원 직무와 관련된 전공 지식, 프로젝트 경험 및 본인의 핵심 역량을 작성해 주십시오.',
    '팀 활동이나 협업 중 발생한 어려움을 극복하고 성과를 달성한 사례를 서술해 주십시오.'
  ]);

  if (!isOpen) return null;

  const handleAddQuestion = () => {
    setQuestionPrompts([...questionPrompts, '']);
  };

  const handleRemoveQuestion = (index: number) => {
    setQuestionPrompts(questionPrompts.filter((_, i) => i !== index));
  };

  const handleQuestionChange = (index: number, val: string) => {
    const updated = [...questionPrompts];
    updated[index] = val;
    setQuestionPrompts(updated);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!company.trim() || !role.trim()) return;

    const validPrompts = questionPrompts.filter((p) => p.trim().length > 0);
    const questions = (validPrompts.length > 0 ? validPrompts : ['지원 동기를 작성해 주세요.']).map(
      (prompt, idx) => ({
        id: `q-${Date.now()}-${idx}`,
        questionNumber: idx + 1,
        prompt,
        maxChars: 1000,
        answer: '',
        completed: false,
        aiTip: '구체적인 수치와 액션 위주로 작성하여 신뢰도를 높여보세요.'
      })
    );

    const newLetter: CoverLetter = {
      id: `cl-${Date.now()}`,
      company: company.trim(),
      role: role.trim(),
      type,
      deadline,
      status: 'not_started',
      progressPercent: 0,
      completedQuestions: 0,
      totalQuestions: questions.length,
      questions
    };

    onCreate(newLetter);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs animate-in fade-in duration-150">
      <div className="bg-white w-full max-w-xl rounded-2xl shadow-2xl border border-[#c3c5d7]/60 overflow-hidden flex flex-col max-h-[90vh]">
        <div className="p-5 border-b border-[#eff3ff] flex items-center justify-between bg-[#f9f9ff]">
          <h3 className="text-lg font-bold text-[#121c2a]">새 자기소개서 등록</h3>
          <button
            onClick={onClose}
            className="p-1 text-[#737686] hover:text-[#121c2a] hover:bg-[#dee9fd] rounded-full transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-5 overflow-y-auto flex-1 flex flex-col gap-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-bold text-[#434654] mb-1">기업명</label>
              <input
                type="text"
                value={company}
                onChange={(e) => setCompany(e.target.value)}
                placeholder="예: 카카오, 토스, LG전자"
                className="w-full h-10 px-3 bg-[#f9f9ff] border border-[#c3c5d7] rounded-xl text-sm focus:outline-none focus:border-[#003fb1]"
                required
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-[#434654] mb-1">지원 직무</label>
              <input
                type="text"
                value={role}
                onChange={(e) => setRole(e.target.value)}
                placeholder="예: 프론트엔드 엔지니어"
                className="w-full h-10 px-3 bg-[#f9f9ff] border border-[#c3c5d7] rounded-xl text-sm focus:outline-none focus:border-[#003fb1]"
                required
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-[#434654] mb-1">채용 구분</label>
              <select
                value={type}
                onChange={(e) => setType(e.target.value)}
                className="w-full h-10 px-3 bg-[#f9f9ff] border border-[#c3c5d7] rounded-xl text-sm focus:outline-none focus:border-[#003fb1]"
              >
                <option value="신입 공채">신입 공채</option>
                <option value="수시 채용">수시 채용</option>
                <option value="인턴십">인턴십</option>
                <option value="경력 채용">경력 채용</option>
              </select>
            </div>
            <div>
              <label className="block text-xs font-bold text-[#434654] mb-1">접수 마감일</label>
              <input
                type="text"
                value={deadline}
                onChange={(e) => setDeadline(e.target.value)}
                placeholder="예: 2024.02.15"
                className="w-full h-10 px-3 bg-[#f9f9ff] border border-[#c3c5d7] rounded-xl text-sm focus:outline-none focus:border-[#003fb1]"
              />
            </div>
          </div>

          <div className="pt-2">
            <div className="flex justify-between items-center mb-2">
              <label className="text-xs font-bold text-[#121c2a]">
                자기소개서 문항 ({questionPrompts.length}개)
              </label>
              <button
                type="button"
                onClick={handleAddQuestion}
                className="text-xs text-[#003fb1] font-bold hover:underline flex items-center gap-0.5"
              >
                <Plus className="w-3.5 h-3.5" /> 문항 추가
              </button>
            </div>

            <div className="flex flex-col gap-2.5">
              {questionPrompts.map((prompt, idx) => (
                <div key={idx} className="flex gap-2 items-center">
                  <span className="text-xs font-bold text-[#003fb1] w-12 shrink-0">
                    문항 {idx + 1}
                  </span>
                  <input
                    type="text"
                    value={prompt}
                    onChange={(e) => handleQuestionChange(idx, e.target.value)}
                    placeholder={`문항 ${idx + 1} 질문 내용을 입력하세요.`}
                    className="flex-1 h-9 px-3 bg-[#f9f9ff] border border-[#c3c5d7] rounded-lg text-xs sm:text-sm focus:outline-none focus:border-[#003fb1]"
                    required
                  />
                  {questionPrompts.length > 1 && (
                    <button
                      type="button"
                      onClick={() => handleRemoveQuestion(idx)}
                      className="p-1 text-[#c3c5d7] hover:text-[#ba1a1a] rounded"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>

          <div className="pt-4 border-t border-[#eff3ff] flex justify-end gap-2 mt-auto">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-[#eff3ff] text-[#434654] text-xs font-bold rounded-xl hover:bg-[#dee9fd]"
            >
              취소
            </button>
            <button
              type="submit"
              className="px-5 py-2 bg-[#003fb1] text-white text-xs font-bold rounded-xl hover:bg-[#1a56db] shadow-xs"
            >
              자소서 보관함에 등록
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
