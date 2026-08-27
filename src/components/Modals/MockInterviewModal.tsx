import React, { useState } from 'react';
import { X, Mic, Volume2, Play, Pause, SkipForward, CheckCircle2, AlertCircle, ShieldCheck } from 'lucide-react';
import { MockInterview, InterviewAnswer, InterviewerStyle } from '../../types';

interface MockInterviewModalProps {
  interview: MockInterview | null;
  onClose: () => void;
  onSaveAnswer: (questionId: string, answer: InterviewAnswer) => void;
}

export const MockInterviewModal: React.FC<MockInterviewModalProps> = ({
  interview,
  onClose,
  onSaveAnswer
}) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [isRecording, setIsRecording] = useState(false);
  const [recordedDuration, setRecordedDuration] = useState(0);
  const [answerContent, setAnswerContent] = useState('');
  const [selectedStyle, setSelectedStyle] = useState<InterviewerStyle>(
    interview?.interviewerStyle || '편안한 면접관'
  );

  if (!interview) return null;

  const interviewerStyles: { key: InterviewerStyle; tone: string; description: string }[] = [
    { key: '압박면접관', tone: 'bg-red-50 text-red-700 border-red-200', description: '질문을 빠르게 던지고 답을 압박해요' },
    { key: '편안한 면접관', tone: 'bg-emerald-50 text-emerald-700 border-emerald-200', description: '편안하게 대화를 풀어가며 가볍게 체크해요' },
    { key: '냉정한 대기업 면접관', tone: 'bg-blue-50 text-blue-700 border-blue-200', description: '대기업식 냉정한 기준으로 깊게 봐요' },
    { key: '현장 실무자', tone: 'bg-amber-50 text-amber-700 border-amber-200', description: '실무 중심으로 실전 대응력을 확인해요' }
  ];

  const currentQuestion = interview.questions[currentQuestionIndex];
  const currentAnswer = interview.answers.find(
    (a) => a.questionId === currentQuestion?.id
  );
  const isCompleted = interview.status === 'completed';

  const handleStartRecording = () => {
    setIsRecording(true);
    setRecordedDuration(0);
  };

  const handleStopRecording = () => {
    setIsRecording(false);
  };

  const handleSaveAnswer = () => {
    if (currentQuestion && (answerContent || recordedDuration > 0)) {
      onSaveAnswer(currentQuestion.id, {
        questionId: currentQuestion.id,
        content: answerContent,
        recordedDuration: recordedDuration,
        feedback: currentAnswer?.feedback,
        score: currentAnswer?.score
      });
    }
  };

  const handleNext = () => {
    if (currentQuestionIndex < interview.questions.length - 1) {
      handleSaveAnswer();
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setAnswerContent('');
      setRecordedDuration(0);
    }
  };

  const handlePrevious = () => {
    if (currentQuestionIndex > 0) {
      handleSaveAnswer();
      setCurrentQuestionIndex(currentQuestionIndex - 1);
      setAnswerContent('');
      setRecordedDuration(0);
    }
  };

  const progressPercent = Math.round(
    ((currentQuestionIndex + 1) / interview.questions.length) * 100
  );

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#0f172a]/75 backdrop-blur-sm p-2 sm:p-3">
      <div className="bg-[#101827] rounded-[32px] shadow-[0_35px_110px_rgba(0,0,0,0.45)] w-[96vw] max-w-[1500px] h-[95vh] min-h-[720px] max-h-[95vh] overflow-hidden flex flex-col border border-[#26334d]">
        {/* Header */}
        <div className="flex items-center justify-between p-5 sm:p-6 border-b border-[#eff3ff] bg-gradient-to-r from-[#003fb1] via-[#174bd6] to-[#0c57d0]">
          <div>
            <p className="text-sm text-[#c3dbff] font-semibold">모의면접</p>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white mt-1 tracking-tight">
              {interview.companyName} {interview.role}
            </h2>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-white hover:bg-white/20 rounded-xl transition-colors cursor-pointer"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="px-5 sm:px-6 pt-5 sm:pt-6 bg-[#101827]">
          <div className="rounded-2xl border border-[#2a3a58] bg-[#111f33] p-3 sm:p-4">
            <div className="flex items-center justify-between gap-3 mb-3">
              <div className="flex items-center gap-2 text-[#edf4ff]">
                <ShieldCheck className="w-4 h-4 text-[#86f2e4]" />
                <span className="text-sm font-bold">면접관 스타일</span>
              </div>
              <span className="text-xs font-bold text-[#dbeaff] bg-[#1a2b4d] px-2 py-1 rounded-full">
                {selectedStyle}
              </span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {interviewerStyles.map((style) => {
                const isSelected = selectedStyle === style.key;
                return (
                  <button
                    key={style.key}
                    type="button"
                    onClick={() => setSelectedStyle(style.key)}
                    className={`text-left rounded-xl border px-3 py-2.5 transition-all ${
                      isSelected
                        ? `${style.tone} shadow-sm ring-2 ring-[#86f2e4]/20`
                        : 'bg-[#17243d] text-[#dfe8ff] border-[#2a3a58] hover:border-[#4d7ae5] hover:bg-[#1b2d4f]'
                    }`}
                  >
                    <div className="font-bold text-sm">{style.key}</div>
                    <div className="text-[11px] mt-1 opacity-80">{style.description}</div>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="px-5 sm:px-6 pt-5 bg-[#101827]">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-bold text-[#edf4ff]">
              질문 {currentQuestionIndex + 1} / {interview.questions.length}
            </span>
            <span className="text-sm font-bold text-[#86f2e4]">{progressPercent}%</span>
          </div>
          <div className="w-full h-2.5 bg-[#1d2b43] rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-[#86f2e4] to-[#4d7ae5] transition-all duration-300 rounded-full"
              style={{ width: `${progressPercent}%` }}
            ></div>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-5 sm:p-6 bg-[#101827] text-[#edf4ff]">
          {/* Question */}
          <div className="mb-6">
            <div className="flex items-center justify-between gap-3 mb-3">
              <p className="text-xs font-bold text-[#006a61] uppercase tracking-wider">
                질문 {currentQuestionIndex + 1}
              </p>
              <div className="px-2.5 py-1 rounded-full bg-[#ecf4ff] text-[#003fb1] text-[10px] font-bold">
                {selectedStyle}
              </div>
            </div>
            <h3 className="text-xl sm:text-2xl font-bold text-[#edf4ff] leading-relaxed">
              {currentQuestion?.text}
            </h3>
            <p className="text-sm text-[#b6c2d9] mt-3">
              ⏱️ 답변 시간: 최대 {currentQuestion && Math.floor(currentQuestion.timeLimit / 60)}분
            </p>
          </div>

          {/* Answer Section */}
          {isCompleted && currentAnswer ? (
            <div className="space-y-4">
              {/* Recorded Answer */}
              <div className="bg-[#121f35] border border-[#2a3a58] rounded-xl p-4">
                <p className="text-xs font-bold text-[#b6c2d9] uppercase mb-3">
                  당신의 답변
                </p>
                <div className="flex items-center gap-3 mb-4">
                  <button className="w-12 h-12 rounded-full bg-[#003fb1] text-white flex items-center justify-center hover:bg-[#1a56db] transition-colors cursor-pointer">
                    <Play className="w-5 h-5 fill-white" />
                  </button>
                  <div className="flex-1">
                    <div className="h-1 bg-[#dee9fd] rounded-full mb-1"></div>
                    <span className="text-xs text-[#737686]">
                      {currentAnswer.recordedDuration}초
                    </span>
                  </div>
                </div>
                <p className="text-sm text-[#edf4ff] bg-[#0f1a2d] rounded-lg p-3 border border-[#2a3a58]">
                  {currentAnswer.content}
                </p>
              </div>

              {/* Feedback */}
              {currentAnswer.feedback && (
                <div className="bg-[#eff3ff] border border-[#dbe1ff] rounded-xl p-4">
                  <div className="flex items-start gap-3">
                    <div className="flex-shrink-0 mt-1">
                      <AlertCircle className="w-5 h-5 text-[#003fb1]" />
                    </div>
                    <div>
                      <p className="text-xs font-bold text-[#003fb1] uppercase mb-2">
                        피드백
                      </p>
                      <p className="text-sm text-[#434654] leading-relaxed">
                        {currentAnswer.feedback}
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {/* Score */}
              {currentAnswer.score && (
                <div className="bg-gradient-to-r from-[#86f2e4]/20 to-[#006a61]/20 border border-[#86f2e4] rounded-xl p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="w-5 h-5 text-[#006a61]" />
                      <span className="text-sm font-bold text-[#006a61]">평가 점수</span>
                    </div>
                    <span className="text-2xl font-extrabold text-[#006a61]">
                      {currentAnswer.score}/100
                    </span>
                  </div>
                </div>
              )}

              {/* Overall Feedback (Last Question) */}
              {currentQuestionIndex === interview.questions.length - 1 &&
                interview.overallFeedback && (
                  <div className="bg-[#dbe1ff] border border-[#003fb1] rounded-xl p-4 mt-6">
                    <div className="flex items-start gap-3">
                      <CheckCircle2 className="w-5 h-5 text-[#003fb1] flex-shrink-0 mt-0.5" />
                      <div>
                        <p className="text-xs font-bold text-[#003fb1] uppercase mb-2">
                          종합 평가
                        </p>
                        <p className="text-sm text-[#121c2a] leading-relaxed font-medium">
                          {interview.overallFeedback}
                        </p>
                        <p className="text-lg font-extrabold text-[#003fb1] mt-3">
                          종합 점수: {interview.overallScore}/100
                        </p>
                      </div>
                    </div>
                  </div>
                )}
            </div>
          ) : (
            <div className="space-y-4">
              {/* Recording Interface */}
              <div className="bg-[#f9f9ff] border border-[#c3c5d7]/50 rounded-2xl p-6 sm:p-8 text-center shadow-inner">
                <div className="mb-6">
                  <button
                    onClick={
                      isRecording ? handleStopRecording : handleStartRecording
                    }
                    className={`w-24 h-24 sm:w-28 sm:h-28 rounded-full flex items-center justify-center mx-auto transition-all cursor-pointer shadow-lg ${
                      isRecording
                        ? 'bg-red-500 hover:bg-red-600 animate-pulse'
                        : 'bg-[#003fb1] hover:bg-[#1a56db]'
                    }`}
                  >
                    <Mic className="w-12 h-12 sm:w-14 sm:h-14 text-white" />
                  </button>
                </div>
                <p className="text-2xl font-extrabold text-[#121c2a]">
                  {isRecording ? '녹음 중...' : '녹음을 시작하세요'}
                </p>
                <p className="text-sm text-[#737686] mt-2">
                  {isRecording ? `${recordedDuration}초 기록됨` : '마이크 버튼을 클릭하여 시작하세요'}
                </p>
              </div>

              {/* Text Alternative */}
              <div>
                <label className="text-xs font-bold text-[#434654] uppercase mb-2 block">
                  또는 텍스트로 답변하기
                </label>
                <textarea
                  value={answerContent}
                  onChange={(e) => setAnswerContent(e.target.value)}
                  placeholder="답변을 입력하세요..."
                  className="w-full h-32 p-4 bg-white border border-[#c3c5d7]/60 rounded-xl text-sm text-[#121c2a] placeholder:text-[#737686] focus:outline-none focus:border-[#003fb1] focus:ring-2 focus:ring-[#003fb1]/10 transition-all resize-none shadow-xs"
                />
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-5 sm:p-6 border-t border-[#26334d] bg-[#0d1729] flex items-center justify-between gap-3">
          <button
            onClick={handlePrevious}
            disabled={currentQuestionIndex === 0}
            className="px-5 py-3 border-2 border-[#4d7ae5] text-[#dbeaff] font-bold rounded-xl disabled:opacity-50 disabled:cursor-not-allowed hover:bg-[#1a2b4d] transition-colors cursor-pointer active:scale-95 min-w-[88px]"
          >
            이전
          </button>

          <div className="text-xs font-semibold text-[#737686]">
            {currentQuestionIndex + 1} / {interview.questions.length}
          </div>

          <button
            onClick={handleNext}
            disabled={currentQuestionIndex === interview.questions.length - 1}
            className="px-5 py-3 bg-gradient-to-r from-[#3b82f6] to-[#1d4ed8] hover:brightness-110 text-white font-bold rounded-xl disabled:opacity-50 disabled:cursor-not-allowed transition-colors cursor-pointer active:scale-95 min-w-[88px]"
          >
            {currentQuestionIndex === interview.questions.length - 1
              ? '완료'
              : '다음'}
          </button>
        </div>
      </div>
    </div>
  );
};
