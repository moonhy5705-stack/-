import React, { useState } from 'react';
import {
  Search,
  ThumbsUp,
  MessageSquare,
  Edit,
  User,
  Sparkles,
  Share2,
  Bookmark
} from 'lucide-react';
import { CommunityPost } from '../../types';

interface CommunityScreenProps {
  posts: CommunityPost[];
  onSelectPost: (post: CommunityPost) => void;
  onToggleLikePost: (postId: string, e: React.MouseEvent) => void;
  onOpenWriteModal: () => void;
}

export const CommunityScreen: React.FC<CommunityScreenProps> = ({
  posts,
  onSelectPost,
  onToggleLikePost,
  onOpenWriteModal
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('전체');

  const categories = ['전체', '면접후기', '자격증', 'Q&A', '합격후기', '꿀팁'];

  const filteredPosts = posts.filter((post) => {
    const matchesSearch =
      post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.author.toLowerCase().includes(searchTerm.toLowerCase());

    if (selectedCategory === '전체') return matchesSearch;
    if (selectedCategory === 'Q&A') return matchesSearch && (post.category === 'Q&A' || post.category === '질문');
    return matchesSearch && post.category === selectedCategory;
  });

  return (
    <div className="w-full max-w-[1200px] mx-auto px-4 sm:px-6 py-6 sm:py-8 flex flex-col gap-6 pb-28 md:pb-12">
      {/* Header Section */}
      <section className="flex flex-col gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-[#121c2a] tracking-tight">
            취업톡 커뮤니티
          </h1>
          <p className="text-xs sm:text-sm text-[#434654] mt-1">
            실시간 합격 후기, 현직자 멘토링, 취준 꿀팁을 나누어보세요.
          </p>
        </div>

        {/* Search Bar */}
        <div className="relative w-full max-w-2xl">
          <Search className="w-5 h-5 absolute left-4 top-1/2 -translate-y-1/2 text-[#737686]" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="관심있는 기업이나 직무를 검색해보세요"
            className="w-full h-12 pl-12 pr-4 bg-white border border-[#c3c5d7]/70 rounded-xl text-sm sm:text-base text-[#121c2a] placeholder:text-[#737686] focus:outline-none focus:border-[#003fb1] focus:ring-2 focus:ring-[#003fb1]/20 transition-all shadow-2xs"
          />
          {searchTerm && (
            <button
              onClick={() => setSearchTerm('')}
              className="absolute right-3.5 top-1/2 -translate-y-1/2 text-xs font-semibold text-[#737686] hover:text-[#121c2a]"
            >
              초기화
            </button>
          )}
        </div>

        {/* Category Tabs */}
        <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-none">
          {categories.map((cat) => {
            const isActive = selectedCategory === cat;
            return (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-5 py-2 rounded-full text-sm font-bold whitespace-nowrap transition-all cursor-pointer ${
                  isActive
                    ? 'bg-[#003fb1] text-white shadow-xs'
                    : 'bg-[#eff3ff] hover:bg-[#dee9fd] text-[#434654] border border-[#c3c5d7]/40'
                }`}
              >
                {cat}
              </button>
            );
          })}
        </div>
      </section>

      {/* Feed Section (Bento Grid Style) */}
      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
        {filteredPosts.map((post) => {
          // Tag color mappings
          let badgeBg = 'bg-[#eff3ff] text-[#434654]';
          if (post.category === '합격후기') {
            badgeBg = 'bg-[#86f2e4] text-[#006f66]';
          } else if (post.category === '꿀팁') {
            badgeBg = 'bg-[#d9e3f7] text-[#434654]';
          } else if (post.category === '질문' || post.category === 'Q&A') {
            badgeBg = 'bg-[#ffdad6] text-[#93000a]';
          } else if (post.category === '면접후기') {
            badgeBg = 'bg-[#dbe1ff] text-[#003fb1]';
          }

          return (
            <article
              key={post.id}
              onClick={() => onSelectPost(post)}
              className="bg-white border border-[#c3c5d7]/60 rounded-2xl p-5 flex flex-col justify-between hover:shadow-md hover:border-[#003fb1]/40 transition-all cursor-pointer group shadow-2xs"
            >
              <div>
                <div className="flex justify-between items-start mb-2.5">
                  <span className={`text-xs font-bold px-2.5 py-0.5 rounded-md ${badgeBg}`}>
                    {post.category}
                  </span>
                  <span className="text-xs text-[#737686]">{post.timeAgo}</span>
                </div>

                <h2 className="text-base sm:text-lg font-bold text-[#121c2a] line-clamp-2 group-hover:text-[#003fb1] transition-colors leading-snug mb-2">
                  {post.title}
                </h2>

                <p className="text-xs sm:text-sm text-[#434654] line-clamp-3 leading-relaxed mb-4">
                  {post.content}
                </p>
              </div>

              {/* Author and engagement footer */}
              <div className="flex items-center gap-2 pt-3 border-t border-[#eff3ff] text-[#434654] mt-auto">
                {/* Author Avatar logic */}
                {post.authorAvatar ? (
                  <div className="w-7 h-7 rounded-full overflow-hidden shrink-0 border border-[#c3c5d7]/50">
                    <img
                      src={post.authorAvatar}
                      alt={post.author}
                      className="w-full h-full object-cover"
                    />
                  </div>
                ) : post.isMentor ? (
                  <div className="w-7 h-7 rounded-full bg-[#006a61] text-white flex items-center justify-center text-[10px] font-bold shrink-0 shadow-2xs">
                    멘토
                  </div>
                ) : (
                  <div className="w-7 h-7 rounded-full bg-[#d0daef] text-[#434654] flex items-center justify-center shrink-0">
                    <User className="w-4 h-4" />
                  </div>
                )}

                <span className="text-xs font-bold text-[#121c2a] mr-auto truncate">
                  {post.author}
                </span>

                {/* Like Button */}
                <button
                  onClick={(e) => onToggleLikePost(post.id, e)}
                  className={`flex items-center gap-1 text-xs font-semibold px-2 py-1 rounded-lg transition-colors cursor-pointer ${
                    post.liked
                      ? 'text-[#003fb1] bg-[#eff3ff]'
                      : 'text-[#737686] hover:bg-[#eff3ff] hover:text-[#003fb1]'
                  }`}
                >
                  <ThumbsUp className={`w-3.5 h-3.5 ${post.liked ? 'fill-[#003fb1]' : ''}`} />
                  <span>{post.likes}</span>
                </button>

                {/* Comments Count */}
                <div className="flex items-center gap-1 text-xs font-semibold text-[#737686] px-1.5 py-1">
                  <MessageSquare className="w-3.5 h-3.5" />
                  <span>{post.commentsCount}</span>
                </div>
              </div>
            </article>
          );
        })}
      </section>

      {/* Floating Action Button (Write Post) */}
      <button
        onClick={onOpenWriteModal}
        aria-label="글쓰기"
        className="fixed bottom-20 md:bottom-10 right-5 md:right-10 w-14 h-14 bg-[#003fb1] text-white rounded-full shadow-xl flex items-center justify-center hover:bg-[#1a56db] hover:scale-105 active:scale-95 transition-all z-30 cursor-pointer"
      >
        <Edit className="w-6 h-6 stroke-[2.2]" />
      </button>
    </div>
  );
};
