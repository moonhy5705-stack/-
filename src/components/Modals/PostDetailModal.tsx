import React, { useState } from 'react';
import {
  X,
  ThumbsUp,
  MessageSquare,
  Send,
  User,
  Share2,
  Bookmark
} from 'lucide-react';
import { CommunityPost } from '../../types';

interface PostDetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  post: CommunityPost | null;
  onToggleLike: (postId: string) => void;
  onAddComment: (postId: string, commentText: string) => void;
}

export const PostDetailModal: React.FC<PostDetailModalProps> = ({
  isOpen,
  onClose,
  post,
  onToggleLike,
  onAddComment
}) => {
  if (!isOpen || !post) return null;

  const [commentText, setCommentText] = useState('');

  const handleCommentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!commentText.trim()) return;
    onAddComment(post.id, commentText.trim());
    setCommentText('');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/50 backdrop-blur-xs animate-in fade-in duration-150">
      <div className="bg-white w-full max-w-2xl rounded-2xl shadow-2xl border border-[#c3c5d7]/60 overflow-hidden flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="p-4 sm:p-5 border-b border-[#eff3ff] flex items-center justify-between bg-[#f9f9ff]">
          <span className="text-xs font-bold bg-[#86f2e4] text-[#006f66] px-2.5 py-0.5 rounded-md">
            {post.category}
          </span>
          <button
            onClick={onClose}
            className="p-1.5 text-[#737686] hover:text-[#121c2a] hover:bg-[#dee9fd] rounded-full transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Post & Comments Body */}
        <div className="p-4 sm:p-6 overflow-y-auto flex-1 flex flex-col gap-5">
          {/* Post Header & Author */}
          <div>
            <h2 className="text-lg sm:text-xl font-bold text-[#121c2a] leading-snug">
              {post.title}
            </h2>
            <div className="flex items-center gap-2.5 mt-3 text-xs text-[#434654]">
              {post.authorAvatar ? (
                <div className="w-8 h-8 rounded-full overflow-hidden shrink-0 border border-[#c3c5d7]/50">
                  <img
                    src={post.authorAvatar}
                    alt={post.author}
                    className="w-full h-full object-cover"
                  />
                </div>
              ) : post.isMentor ? (
                <div className="w-8 h-8 rounded-full bg-[#006a61] text-white flex items-center justify-center text-xs font-bold shrink-0">
                  멘토
                </div>
              ) : (
                <div className="w-8 h-8 rounded-full bg-[#d0daef] text-[#434654] flex items-center justify-center shrink-0">
                  <User className="w-4 h-4" />
                </div>
              )}
              <div>
                <p className="font-bold text-[#121c2a]">{post.author}</p>
                <p className="text-[11px] text-[#737686]">{post.timeAgo}</p>
              </div>
            </div>
          </div>

          {/* Post Body */}
          <div className="text-sm text-[#121c2a] leading-relaxed whitespace-pre-wrap bg-[#f9f9ff]/50 p-4 rounded-xl border border-[#eff3ff]">
            {post.content}
          </div>

          {/* Post Engagement Bar */}
          <div className="flex items-center justify-between pt-2 border-b border-[#eff3ff] pb-4">
            <button
              onClick={() => onToggleLike(post.id)}
              className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                post.liked
                  ? 'bg-[#003fb1] text-white shadow-xs'
                  : 'bg-[#eff3ff] text-[#434654] hover:bg-[#dee9fd]'
              }`}
            >
              <ThumbsUp className={`w-4 h-4 ${post.liked ? 'fill-white' : ''}`} />
              <span>도움돼요 {post.likes}</span>
            </button>

            <div className="flex items-center gap-1 text-xs font-bold text-[#434654]">
              <MessageSquare className="w-4 h-4 text-[#003fb1]" />
              <span>댓글 {post.comments.length}개</span>
            </div>
          </div>

          {/* Comments Section */}
          <div className="flex flex-col gap-3">
            <h4 className="text-xs font-bold text-[#434654]">댓글 목록</h4>
            {post.comments.length === 0 ? (
              <p className="text-xs text-[#737686] py-3 text-center">
                아직 작성된 댓글이 없습니다. 첫 번째 댓글을 남겨보세요!
              </p>
            ) : (
              post.comments.map((c) => (
                <div
                  key={c.id}
                  className={`p-3 rounded-xl border text-xs leading-relaxed ${
                    c.isAuthor
                      ? 'bg-[#eff3ff]/70 border-[#003fb1]/30'
                      : 'bg-white border-[#c3c5d7]/50'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1">
                    <div className="flex items-center gap-1.5">
                      <span className="font-bold text-[#121c2a]">{c.author}</span>
                      {c.isAuthor && (
                        <span className="text-[10px] font-bold bg-[#003fb1] text-white px-1.5 py-0.2 rounded">
                          작성자
                        </span>
                      )}
                      {c.authorRole && (
                        <span className="text-[10px] text-[#737686]">({c.authorRole})</span>
                      )}
                    </div>
                    <span className="text-[10px] text-[#737686]">{c.timeAgo}</span>
                  </div>
                  <p className="text-[#434654]">{c.content}</p>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Comment Input Footer */}
        <form
          onSubmit={handleCommentSubmit}
          className="p-3.5 bg-[#f9f9ff] border-t border-[#eff3ff] flex gap-2"
        >
          <input
            type="text"
            value={commentText}
            onChange={(e) => setCommentText(e.target.value)}
            placeholder="댓글을 작성해 보세요..."
            className="flex-1 h-10 px-3.5 bg-white border border-[#c3c5d7] rounded-xl text-xs sm:text-sm focus:outline-none focus:border-[#003fb1]"
          />
          <button
            type="submit"
            className="px-4 h-10 bg-[#003fb1] text-white text-xs font-bold rounded-xl hover:bg-[#1a56db] flex items-center gap-1 shrink-0 shadow-xs cursor-pointer"
          >
            <Send className="w-3.5 h-3.5" /> 등록
          </button>
        </form>
      </div>
    </div>
  );
};
