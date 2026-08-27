import React, { useState } from 'react';
import {
  Send,
  Search,
  Phone,
  Video,
  MoreVertical,
  Plus,
  User,
  Check,
  CheckCheck,
  Clock
} from 'lucide-react';
import { DirectMessageThread, Friend } from '../../types';

interface MessagingScreenProps {
  threads: DirectMessageThread[];
  friends: Friend[];
  selectedThreadId: string | null;
  onSelectThread: (threadId: string) => void;
  onSendMessage: (threadId: string, content: string) => void;
  onAddFriend: (friendId: string) => void;
  onStartChat: (friendId: string) => void;
}

export const MessagingScreen: React.FC<MessagingScreenProps> = ({
  threads,
  friends,
  selectedThreadId,
  onSelectThread,
  onSendMessage,
  onAddFriend,
  onStartChat
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [messageText, setMessageText] = useState('');
  const [showFriendsList, setShowFriendsList] = useState(false);

  const selectedThread = threads.find((t) => t.id === selectedThreadId);

  const filteredThreads = threads.filter((thread) =>
    thread.participantName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const nonChatFriends = friends.filter(
    (f) => !threads.some((t) => t.participantId === f.id)
  );

  const handleSendMessage = () => {
    if (messageText.trim() && selectedThreadId) {
      onSendMessage(selectedThreadId, messageText);
      setMessageText('');
    }
  };

  return (
    <div className="w-full h-screen max-w-[1200px] mx-auto flex gap-4 sm:gap-6 px-4 sm:px-6 py-4 sm:py-6 bg-[#f9f9ff]">
      {/* Sidebar - Conversations List */}
      <div className="w-full sm:w-80 flex flex-col border border-[#c3c5d7]/50 bg-white rounded-2xl shadow-xs overflow-hidden">
        {/* Header */}
        <div className="p-4 sm:p-5 border-b border-[#eff3ff]">
          <h2 className="text-xl font-bold text-[#121c2a] mb-4 tracking-tight">
            메시지
          </h2>

          {/* Search */}
          <div className="relative mb-4">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-[#737686]" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="친구 검색..."
              className="w-full h-10 pl-10 pr-4 bg-[#f9f9ff] border border-[#c3c5d7]/50 rounded-lg text-sm text-[#121c2a] placeholder:text-[#737686] focus:outline-none focus:border-[#003fb1] focus:ring-2 focus:ring-[#003fb1]/10 transition-all"
            />
          </div>

          {/* New Chat Button */}
          <button
            onClick={() => setShowFriendsList(!showFriendsList)}
            className="w-full h-10 bg-[#003fb1] hover:bg-[#1a56db] text-white font-bold text-sm rounded-lg flex items-center justify-center gap-2 transition-colors cursor-pointer active:scale-95"
          >
            <Plus className="w-4 h-4" />
            새 대화
          </button>
        </div>

        {/* Friends List (When adding new chat) */}
        {showFriendsList && nonChatFriends.length > 0 && (
          <div className="border-b border-[#eff3ff] max-h-56 overflow-y-auto">
            {nonChatFriends.map((friend) => (
              <button
                key={friend.id}
                onClick={() => {
                  onStartChat(friend.id);
                  setShowFriendsList(false);
                }}
                className="w-full p-3 flex items-center gap-3 hover:bg-[#f9f9ff] border-b border-[#eff3ff]/50 transition-colors text-left cursor-pointer"
              >
                <div className="w-10 h-10 rounded-full overflow-hidden flex-shrink-0">
                  <img
                    src={friend.avatarUrl}
                    alt={friend.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-bold text-[#121c2a] truncate">
                    {friend.name}
                  </p>
                  <p className="text-xs text-[#737686] truncate">
                    {friend.role}
                  </p>
                </div>
                <span
                  className={`w-2.5 h-2.5 rounded-full flex-shrink-0 ${
                    friend.status === 'online'
                      ? 'bg-[#006a61]'
                      : friend.status === 'away'
                        ? 'bg-[#f59e0b]'
                        : 'bg-[#d1d5db]'
                  }`}
                ></span>
              </button>
            ))}
          </div>
        )}

        {/* Conversations List */}
        <div className="flex-1 overflow-y-auto">
          {filteredThreads.length === 0 ? (
            <div className="p-6 text-center">
              <p className="text-sm text-[#737686]">
                진행 중인 대화가 없습니다
              </p>
            </div>
          ) : (
            filteredThreads.map((thread) => (
              <button
                key={thread.id}
                onClick={() => onSelectThread(thread.id)}
                className={`w-full p-4 flex gap-3 border-b border-[#eff3ff]/50 hover:bg-[#f9f9ff] transition-all text-left cursor-pointer ${
                  selectedThreadId === thread.id
                    ? 'bg-[#eff3ff] border-l-4 border-l-[#003fb1]'
                    : ''
                }`}
              >
                <div className="relative flex-shrink-0">
                  <div className="w-12 h-12 rounded-full overflow-hidden">
                    <img
                      src={thread.participantAvatar}
                      alt={thread.participantName}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <span
                    className={`absolute bottom-0 right-0 w-3 h-3 rounded-full border-2 border-white ${
                      thread.participantStatus === 'online'
                        ? 'bg-[#006a61]'
                        : thread.participantStatus === 'away'
                          ? 'bg-[#f59e0b]'
                          : 'bg-[#d1d5db]'
                    }`}
                  ></span>
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-1">
                    <p className="text-sm font-bold text-[#121c2a] truncate">
                      {thread.participantName}
                    </p>
                    <span className="text-xs text-[#737686] flex-shrink-0">
                      {thread.lastMessageTime}
                    </span>
                  </div>
                  <p className="text-xs text-[#737686] line-clamp-1 truncate">
                    {thread.lastMessage}
                  </p>
                </div>

                {thread.unreadCount > 0 && (
                  <div className="w-5 h-5 rounded-full bg-[#003fb1] text-white text-xs font-bold flex items-center justify-center flex-shrink-0">
                    {thread.unreadCount}
                  </div>
                )}
              </button>
            ))
          )}
        </div>
      </div>

      {/* Chat Area */}
      {selectedThread ? (
        <div className="hidden sm:flex flex-1 flex-col border border-[#c3c5d7]/50 bg-white rounded-2xl shadow-xs overflow-hidden">
          {/* Chat Header */}
          <div className="p-4 sm:p-5 border-b border-[#eff3ff] flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="relative">
                <div className="w-10 h-10 rounded-full overflow-hidden">
                  <img
                    src={selectedThread.participantAvatar}
                    alt={selectedThread.participantName}
                    className="w-full h-full object-cover"
                  />
                </div>
                <span
                  className={`absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full border-2 border-white ${
                    selectedThread.participantStatus === 'online'
                      ? 'bg-[#006a61]'
                      : selectedThread.participantStatus === 'away'
                        ? 'bg-[#f59e0b]'
                        : 'bg-[#d1d5db]'
                  }`}
                ></span>
              </div>
              <div>
                <p className="text-sm font-bold text-[#121c2a]">
                  {selectedThread.participantName}
                </p>
                <p className="text-xs text-[#737686]">
                  {selectedThread.participantStatus === 'online'
                    ? '온라인'
                    : selectedThread.participantStatus === 'away'
                      ? '자리 비움'
                      : '오프라인'}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button className="p-2 text-[#737686] hover:text-[#003fb1] hover:bg-[#eff3ff] rounded-lg transition-colors cursor-pointer">
                <Phone className="w-5 h-5" />
              </button>
              <button className="p-2 text-[#737686] hover:text-[#003fb1] hover:bg-[#eff3ff] rounded-lg transition-colors cursor-pointer">
                <Video className="w-5 h-5" />
              </button>
              <button className="p-2 text-[#737686] hover:text-[#003fb1] hover:bg-[#eff3ff] rounded-lg transition-colors cursor-pointer">
                <MoreVertical className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Messages Area */}
          <div className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-4 bg-[#fafbff]">
            {selectedThread.messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex gap-2 ${msg.senderId === 'me' ? 'justify-end' : 'justify-start'}`}
              >
                {msg.senderId !== 'me' && (
                  <div className="w-8 h-8 rounded-full overflow-hidden flex-shrink-0">
                    <img
                      src={msg.senderAvatar}
                      alt={msg.senderName}
                      className="w-full h-full object-cover"
                    />
                  </div>
                )}

                <div
                  className={`max-w-xs px-4 py-3 rounded-2xl ${
                    msg.senderId === 'me'
                      ? 'bg-[#003fb1] text-white rounded-br-none'
                      : 'bg-white border border-[#c3c5d7]/50 text-[#121c2a] rounded-bl-none'
                  }`}
                >
                  <p className="text-sm break-words">{msg.content}</p>
                  <div
                    className={`flex items-center justify-end gap-1 mt-1 text-xs ${
                      msg.senderId === 'me' ? 'text-[#86f2e4]' : 'text-[#737686]'
                    }`}
                  >
                    <span>{msg.timeAgo}</span>
                    {msg.senderId === 'me' && (
                      msg.isRead ? (
                        <CheckCheck className="w-3.5 h-3.5" />
                      ) : (
                        <Check className="w-3.5 h-3.5" />
                      )
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Message Input */}
          <div className="p-4 sm:p-5 border-t border-[#eff3ff] flex gap-2 bg-white">
            <input
              type="text"
              value={messageText}
              onChange={(e) => setMessageText(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' && !e.shiftKey) {
                  e.preventDefault();
                  handleSendMessage();
                }
              }}
              placeholder="메시지를 입력하세요..."
              className="flex-1 h-11 px-4 bg-[#f9f9ff] border border-[#c3c5d7]/50 rounded-lg text-sm text-[#121c2a] placeholder:text-[#737686] focus:outline-none focus:border-[#003fb1] focus:ring-2 focus:ring-[#003fb1]/10 transition-all"
            />
            <button
              onClick={handleSendMessage}
              disabled={!messageText.trim()}
              className="w-11 h-11 bg-[#003fb1] hover:bg-[#1a56db] text-white rounded-lg flex items-center justify-center transition-colors disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer active:scale-95"
            >
              <Send className="w-5 h-5" />
            </button>
          </div>
        </div>
      ) : (
        <div className="hidden sm:flex flex-1 items-center justify-center bg-white rounded-2xl border border-[#c3c5d7]/50">
          <div className="text-center">
            <div className="w-16 h-16 rounded-full bg-[#eff3ff] flex items-center justify-center mx-auto mb-4">
              <User className="w-8 h-8 text-[#003fb1]" />
            </div>
            <p className="text-base font-bold text-[#121c2a] mb-1">
              대화를 선택하세요
            </p>
            <p className="text-sm text-[#737686]">
              대화 목록에서 친구를 선택하여 메시지를 시작하세요
            </p>
          </div>
        </div>
      )}
    </div>
  );
};
