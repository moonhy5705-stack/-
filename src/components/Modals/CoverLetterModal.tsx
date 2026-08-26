import React, { useState } from 'react';
import {
  X,
  CheckCircle2,
  Copy,
  Sparkles,
  Save,
  Check,
  ChevronDown,
  ChevronUp,
  FileText,
  Clock
} from 'lucide-react';
import { CoverLetter, CoverLetterQuestion } from '../../types';

interface CoverLetterModalProps {
  isOpen: boolean;
  onClose: () => void;
  coverLetter: CoverLetter | null;
  onSaveCoverLetter: (updated: CoverLetter) => void;
}

export const CoverLetterModal: React.FC<CoverLetterModalProps> = ({
  isOpen,
  onClose,
  coverLetter,
  onSaveCoverLetter
}) => {
  if (!isOpen || !coverLetter) return null;

  const [activeQuestionId, setActiveQuestionId] = useState<string>(
    coverLetter.questions[0]?.id || ''
  );
  const [questions, setQuestions] = useState<CoverLetterQuestion[]>(coverLetter.questions);
  const [copied, setCopied] = useState(false);

  const activeQuestion = questions.find((q) => q.id === activeQuestionId) || questions[0];

  const handleAnswerChange = (text: string) => {
    setQuestions((prev) =>
      prev.map((q) => {
        if (q.id === activeQuestionId) {
          return {
            ...q,
            answer: text,
            completed: text.trim().length > 50
          };
        }
        return q;
      })
    );
  };

  const handleToggleComplete = (qId: string) => {
    setQuestions((prev) =>
      prev.map((q) => {
        if (q.id === qId) {
          return { ...q, completed: !q.completed };
        }
        return q;
      })
    );
  };

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSave = () => {
    const completedCount = questions.filter((q) => q.completed).length;
    const progressPercent = Math.round((completedCount / questions.length) * 100);
    const status =
      progressPercent === 100
        ? 'completed'
        : progressPercent > 0
        ? 'in_progress'
        : 'not_started';

    onSaveCoverLetter({
      ...coverLetter,
      questions,
      completedQuestions: completedCount,
      progressPercent,
      status,
      lastModified: '방금 전'
    });
    onClose();
  };

  const completedCount = questions.filter((q) => q.completed).length;
  const progress = Math.round((completedCount / questions.length) * 100);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/50 backdrop-blur-xs animate-in fade-in duration-150">
      <div className="bg-white w-full max-w-4xl rounded-2xl shadow-2xl border border-[#c3c5d7]/60 overflow-hidden flex flex-col max-h-[92vh]">
        {/* Header */}
        <div className="p-5 border-b border-[#eff3ff] flex items-center justify-between bg-[#f9f9ff]">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-[#003fb1] bg-[#dbe1ff] px-2.5 py-0.5 rounded-md">
                {coverLetter.type}
              </span>
              <h3 className="text-lg sm:text-xl font-bold text-[#121c2a]">
                {coverLetter.company} 자기소개서
              </h3>
            </div>
            <p className="text-xs text-[#434654] mt-0.5 font-medium">
              직무: {coverLetter.role} • 완료율: {progress}% ({completedCount}/{questions.length} 문항)
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-[#737686] hover:text-[#121c2a] hover:bg-[#dee9fd] rounded-full transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body: Left Question Tabs + Right Editor */}
        <div className="flex-1 flex flex-col md:flex-row overflow-hidden">
          {/* Question List Sidebar */}
          <div className="w-full md:w-80 bg-[#f9f9ff] border-b md:border-b-0 md:border-r border-[#eff3ff] p-3 sm:p-4 overflow-y-auto flex md:flex-col gap-2 shrink-0">
            {questions.map((q, idx) => {
              const isSelected = q.id === activeQuestion?.id;
              return (
                <div
                  key={q.id}
                  onClick={() => setActiveQuestionId(q.id)}
                  className={`p-3 rounded-xl border text-left cursor-pointer transition-all flex flex-col gap-1.5 min-w-[200px] md:min-w-0 ${
                    isSelected
                      ? 'bg-white border-[#003fb1] shadow-xs ring-1 ring-[#003fb1]'
                      : 'bg-white/70 border-[#c3c5d7]/50 hover:bg-white'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-[#003fb1]">
                      문항 {idx + 1}
                    </span>
                    <span
                      className={`text-[10px] font-bold px-1.5 py-0.5 rounded ${
                        q.completed
                          ? 'bg-[#86f2e4] text-[#006f66]'
                          : 'bg-[#eff3ff] text-[#737686]'
                      }`}
                    >
                      {q.completed ? '작성 완료' : '작성 중'}
                    </span>
                  </div>
                  <p className="text-xs font-medium text-[#121c2a] line-clamp-2 leading-snug">
                    {q.prompt}
                  </p>
                  <div className="flex items-center justify-between text-[11px] text-[#737686] pt-1">
                    <span>
                      {q.answer.length} / {q.maxChars}자
                    </span>
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleToggleComplete(q.id);
                      }}
                      className={`p-0.5 rounded hover:bg-[#eff3ff] ${
                        q.completed ? 'text-[#006a61]' : 'text-[#c3c5d7]'
                      }`}
                    >
                      <CheckCircle2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Editor & AI Tip Area */}
          {activeQuestion && (
            <div className="flex-1 p-4 sm:p-6 overflow-y-auto flex flex-col gap-4 bg-white">
              {/* Question Prompt Box */}
              <div className="p-4 bg-[#eff3ff]/70 rounded-xl border border-[#c3c5d7]/40">
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-xs font-bold text-[#003fb1]">
                    문항 {activeQuestion.questionNumber || 1} 질문
                  </span>
                  <span className="text-xs text-[#737686]">
                    최대 {activeQuestion.maxChars}자
                  </span>
                </div>
                <p className="text-sm font-semibold text-[#121c2a] leading-relaxed">
                  {activeQuestion.prompt}
                </p>
              </div>

              {/* AI Tip / Guideline */}
              {activeQuestion.aiTip && (
                <div className="p-3.5 bg-[#dbe1ff]/40 rounded-xl border border-[#003fb1]/20 flex items-start gap-2.5">
                  <Sparkles className="w-4 h-4 text-[#003fb1] shrink-0 mt-0.5" />
                  <div className="text-xs text-[#121c2a] leading-relaxed">
                    <span className="font-bold text-[#003fb1]">합격 작성 TIP: </span>
                    {activeQuestion.aiTip}
                  </div>
                </div>
              )}

              {/* Textarea Editor */}
              <div className="flex-1 flex flex-col min-h-[220px]">
                <div className="flex justify-between items-center mb-1.5">
                  <label className="text-xs font-bold text-[#434654]">답변 내용</label>
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => handleCopy(activeQuestion.answer)}
                      className="text-xs text-[#003fb1] hover:underline flex items-center gap-1 font-semibold cursor-pointer"
                    >
                      {copied ? <Check className="w-3.5 h-3.5 text-[#006a61]" /> : <Copy className="w-3.5 h-3.5" />}
                      {copied ? '복사됨' : '복사하기'}
                    </button>
                    <span className="text-xs font-bold text-[#434654]">
                      {activeQuestion.answer.length} / {activeQuestion.maxChars}자
                    </span>
                  </div>
                </div>

                <textarea
                  value={activeQuestion.answer}
                  onChange={(e) => handleAnswerChange(e.target.value)}
                  placeholder="질문에 대한 구체적인 경험과 성과, 배운 점을 기술해 주세요."
                  className="w-full flex-1 min-h-[200px] p-4 bg-[#f9f9ff] border border-[#c3c5d7] rounded-xl text-sm text-[#121c2a] focus:outline-none focus:border-[#003fb1] focus:bg-white focus:ring-2 focus:ring-[#003fb1]/10 resize-y leading-relaxed font-sans"
                />
              </div>

              {/* Question Complete Toggle Button */}
              <div className="flex justify-between items-center pt-2">
                <button
                  type="button"
                  onClick={() => handleToggleComplete(activeQuestion.id)}
                  className={`flex items-center gap-2 text-xs font-bold px-3.5 py-2 rounded-xl border transition-colors cursor-pointer ${
                    activeQuestion.completed
                      ? 'bg-[#86f2e4] text-[#006f66] border-[#86f2e4]'
                      : 'bg-white text-[#434654] border-[#c3c5d7] hover:bg-[#eff3ff]'
                  }`}
                >
                  <CheckCircle2 className="w-4 h-4" />
                  {activeQuestion.completed ? '이 문항 작성 완료됨' : '문항 작성 완료로 표시'}
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-[#eff3ff] bg-[#f9f9ff] flex justify-end gap-2">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-[#eff3ff] text-[#434654] text-xs font-bold rounded-xl hover:bg-[#dee9fd]"
          >
            닫기
          </button>
          <button
            onClick={handleSave}
            className="px-5 py-2 bg-[#003fb1] text-white text-xs font-bold rounded-xl hover:bg-[#1a56db] flex items-center gap-1.5 shadow-xs"
          >
            <Save className="w-3.5 h-3.5" /> 저장하기
          </button>
        </div>
      </div>
    </div>
  );
};
