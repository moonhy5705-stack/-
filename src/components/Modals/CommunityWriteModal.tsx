import React, { useState } from 'react';
import { X, Send, UserCheck, ShieldCheck } from 'lucide-react';
import { CommunityPost } from '../../types';

interface CommunityWriteModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddPost: (post: Omit<CommunityPost, 'id' | 'likes' | 'liked' | 'commentsCount' | 'comments' | 'timeAgo'>) => void;
  currentUserName: string;
}

export const CommunityWriteModal: React.FC<CommunityWriteModalProps> = ({
  isOpen,
  onClose,
  onAddPost,
  currentUserName
}) => {
  const [category, setCategory] = useState<'합격후기' | '꿀팁' | '질문' | '면접후기' | '자격증' | 'Q&A'>('질문');
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [isAnonymous, setIsAnonymous] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !content.trim()) return;

    onAddPost({
      category,
      title: title.trim(),
      content: content.trim(),
      author: isAnonymous ? '익명' : currentUserName || '김취준',
      authorRole: isAnonymous ? '익명' : '취준생',
      isAnonymous
    });

    setTitle('');
    setContent('');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs animate-in fade-in duration-150">
      <div className="bg-white w-full max-w-xl rounded-2xl shadow-2xl border border-[#c3c5d7]/60 overflow-hidden flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="p-5 border-b border-[#eff3ff] flex items-center justify-between bg-[#f9f9ff]">
          <h3 className="text-lg font-bold text-[#121c2a]">커뮤니티 글쓰기</h3>
          <button
            onClick={onClose}
            className="p-1 text-[#737686] hover:text-[#121c2a] hover:bg-[#dee9fd] rounded-full transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-5 overflow-y-auto flex-1 flex flex-col gap-4">
          {/* Category Select */}
          <div>
            <label className="block text-xs font-bold text-[#434654] mb-1.5">카테고리 선택</label>
            <div className="flex flex-wrap gap-2">
              {(['질문', '합격후기', '꿀팁', '면접후기', '자격증', 'Q&A'] as const).map((cat) => (
                <button
                  key={cat}
                  type="button"
                  onClick={() => setCategory(cat)}
                  className={`px-3 py-1.5 rounded-full text-xs font-bold transition-all cursor-pointer ${
                    category === cat
                      ? 'bg-[#003fb1] text-white shadow-xs'
                      : 'bg-[#eff3ff] text-[#434654] hover:bg-[#dee9fd]'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* Title */}
          <div>
            <label className="block text-xs font-bold text-[#434654] mb-1.5">제목</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="제목을 입력하세요 (예: 하반기 삼성전자 면접 질문 후기)"
              className="w-full h-10 px-3.5 bg-[#f9f9ff] border border-[#c3c5d7] rounded-xl text-sm focus:outline-none focus:border-[#003fb1]"
              required
            />
          </div>

          {/* Content */}
          <div>
            <label className="block text-xs font-bold text-[#434654] mb-1.5">본문 내용</label>
            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="취준생 및 멘토들과 나누고 싶은 경험이나 질문을 자유롭게 작성해 주세요."
              rows={6}
              className="w-full p-3.5 bg-[#f9f9ff] border border-[#c3c5d7] rounded-xl text-sm focus:outline-none focus:border-[#003fb1] leading-relaxed resize-none"
              required
            />
          </div>

          {/* Anonymous Option */}
          <div className="flex items-center gap-2 pt-1">
            <input
              type="checkbox"
              id="anon-check"
              checked={isAnonymous}
              onChange={(e) => setIsAnonymous(e.target.checked)}
              className="w-4 h-4 accent-[#003fb1] cursor-pointer"
            />
            <label htmlFor="anon-check" className="text-xs text-[#434654] font-medium cursor-pointer">
              익명으로 작성하기
            </label>
          </div>

          {/* Footer Submit */}
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
              className="px-5 py-2 bg-[#003fb1] text-white text-xs font-bold rounded-xl hover:bg-[#1a56db] flex items-center gap-1.5 shadow-xs cursor-pointer"
            >
              <Send className="w-3.5 h-3.5" /> 등록하기
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
