import React, { useState } from 'react';
import { X, Plus, Trash2, CheckCircle2, Calendar, Clock } from 'lucide-react';
import { TaskItem } from '../../types';

interface TaskModalProps {
  isOpen: boolean;
  onClose: () => void;
  tasks: TaskItem[];
  onToggleTask: (id: string) => void;
  onAddTask: (newTask: { title: string; category?: string; dueDate?: string }) => void;
  onDeleteTask: (id: string) => void;
}

export const TaskModal: React.FC<TaskModalProps> = ({
  isOpen,
  onClose,
  tasks,
  onToggleTask,
  onAddTask,
  onDeleteTask
}) => {
  const [newTitle, setNewTitle] = useState('');
  const [newCategory, setNewCategory] = useState('자소서');
  const [newDueDate, setNewDueDate] = useState('오늘');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim()) return;
    onAddTask({
      title: newTitle.trim(),
      category: newCategory,
      dueDate: newDueDate
    });
    setNewTitle('');
  };

  const completedCount = tasks.filter(t => t.completed).length;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs animate-in fade-in duration-150">
      <div className="bg-white w-full max-w-lg rounded-2xl shadow-2xl border border-[#c3c5d7]/60 overflow-hidden flex flex-col max-h-[85vh]">
        {/* Modal Header */}
        <div className="p-5 border-b border-[#eff3ff] flex items-center justify-between bg-[#f9f9ff]">
          <div className="flex items-center gap-2">
            <h3 className="text-lg font-bold text-[#121c2a]">전체 일정 및 할 일 관리</h3>
            <span className="text-xs font-bold bg-[#eff3ff] text-[#003fb1] px-2.5 py-0.5 rounded-full">
              {completedCount}/{tasks.length} 완료
            </span>
          </div>
          <button
            onClick={onClose}
            className="p-1 text-[#737686] hover:text-[#121c2a] hover:bg-[#dee9fd] rounded-full transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Task Creation Form */}
        <form onSubmit={handleSubmit} className="p-4 bg-white border-b border-[#eff3ff] flex flex-col gap-3">
          <div className="flex gap-2">
            <input
              type="text"
              value={newTitle}
              onChange={(e) => setNewTitle(e.target.value)}
              placeholder="새로운 할 일을 입력하세요 (예: 코딩테스트 3문제 풀기)"
              className="flex-1 h-10 px-3.5 bg-[#f9f9ff] border border-[#c3c5d7] rounded-xl text-sm focus:outline-none focus:border-[#003fb1]"
              required
            />
            <button
              type="submit"
              className="px-4 h-10 bg-[#003fb1] text-white text-xs font-bold rounded-xl hover:bg-[#1a56db] flex items-center gap-1 shrink-0 shadow-xs cursor-pointer"
            >
              <Plus className="w-4 h-4" /> 추가
            </button>
          </div>
          <div className="flex gap-2 text-xs">
            <select
              value={newCategory}
              onChange={(e) => setNewCategory(e.target.value)}
              className="px-2.5 py-1.5 bg-[#eff3ff] border border-[#c3c5d7]/50 rounded-lg text-[#434654] font-medium"
            >
              <option value="자소서">자소서</option>
              <option value="포트폴리오">포트폴리오</option>
              <option value="어학">어학</option>
              <option value="자격증">자격증</option>
              <option value="서류">서류/증명서</option>
              <option value="면접">면접준비</option>
            </select>
            <select
              value={newDueDate}
              onChange={(e) => setNewDueDate(e.target.value)}
              className="px-2.5 py-1.5 bg-[#eff3ff] border border-[#c3c5d7]/50 rounded-lg text-[#434654] font-medium"
            >
              <option value="오늘">오늘 마감</option>
              <option value="내일">내일 마감</option>
              <option value="이번 주">이번 주 마감</option>
              <option value="D-3">D-3</option>
              <option value="D-7">D-7</option>
            </select>
          </div>
        </form>

        {/* Tasks List */}
        <div className="p-4 overflow-y-auto flex-1 flex flex-col gap-2.5">
          {tasks.map((task) => (
            <div
              key={task.id}
              className={`p-3.5 rounded-xl border flex items-center justify-between gap-3 transition-all ${
                task.completed
                  ? 'bg-[#f9f9ff] border-[#c3c5d7]/40 opacity-70'
                  : 'bg-white border-[#c3c5d7]/70 shadow-2xs hover:border-[#003fb1]/40'
              }`}
            >
              <div
                onClick={() => onToggleTask(task.id)}
                className="flex items-center gap-3 flex-1 cursor-pointer select-none"
              >
                <div
                  className={`w-5 h-5 rounded-full border-2 flex items-center justify-center shrink-0 ${
                    task.completed ? 'bg-[#006a61] border-[#006a61] text-white' : 'border-[#006a61]'
                  }`}
                >
                  {task.completed && <CheckCircle2 className="w-3.5 h-3.5" />}
                </div>
                <div className="flex flex-col">
                  <span
                    className={`text-sm font-medium ${
                      task.completed ? 'line-through text-[#737686]' : 'text-[#121c2a]'
                    }`}
                  >
                    {task.title}
                  </span>
                  <div className="flex gap-1.5 items-center mt-0.5">
                    {task.category && (
                      <span className="text-[10px] bg-[#eff3ff] text-[#003fb1] px-1.5 py-0.2 rounded font-semibold">
                        {task.category}
                      </span>
                    )}
                    {task.dueDate && (
                      <span className="text-[10px] text-[#737686]">
                        {task.dueDate}
                      </span>
                    )}
                  </div>
                </div>
              </div>

              <button
                onClick={() => onDeleteTask(task.id)}
                className="p-1.5 text-[#c3c5d7] hover:text-[#ba1a1a] hover:bg-[#ffdad6]/30 rounded-lg transition-colors"
                title="삭제"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          ))}
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-[#eff3ff] bg-[#f9f9ff] flex justify-end">
          <button
            onClick={onClose}
            className="px-5 py-2 bg-[#003fb1] text-white text-xs font-bold rounded-xl hover:bg-[#1a56db] transition-colors"
          >
            확인
          </button>
        </div>
      </div>
    </div>
  );
};
