export type NavigationTab = 'home' | 'roadmap' | 'coverletter' | 'community' | 'messaging' | 'calendar' | 'mypage';

export interface SchoolRecord {
  academicScore: number;
  serviceScore: number;
  certificationScore: number;
  awardScore: number;
  totalScore: number;
  rank: number;
  totalStudents: number;
  serviceHours: number;
  certificationsCount: number;
  awardsCount: number;
  attendanceRate: number;
}

export interface UserProfile {
  name: string;
  schoolName: string;
  grade: number;
  classNumber: number;
  studentNumber: number;
  targetCompany: string;
  targetRole: string;
  avatarUrl: string;
  dDay: number;
  dDayLabel: string;
  progressPercent: number;
  completedTasksCount: number;
  totalTasksCount: number;
  schoolRecord: SchoolRecord;
}

export interface TaskItem {
  id: string;
  title: string;
  completed: boolean;
  dueDate?: string;
  category?: string;
}

export interface JobPosting {
  id: string;
  company: string;
  title: string;
  role: string;
  deadlineBadge: string;
  typeBadge: string;
  locationBadge: string;
  matchRate: number;
  bookmarked: boolean;
  brandColor?: string;
  logoText?: string;
  salary?: string;
  experience?: string;
  description?: string;
  techStack?: string[];
}

export interface RoadmapStep {
  id: string;
  stepNumber: number;
  title: string;
  category: string;
  status: 'completed' | 'in_progress' | 'pending';
  dateLabel: string;
  notes: string;
  badgeText: string;
}

export interface CoverLetterQuestion {
  id: string;
  questionNumber: number;
  prompt: string;
  maxChars: number;
  answer: string;
  completed: boolean;
  aiTip?: string;
}

export interface CoverLetter {
  id: string;
  company: string;
  type: string;
  role: string;
  status: 'completed' | 'in_progress' | 'not_started';
  progressPercent: number;
  completedQuestions: number;
  totalQuestions: number;
  lastModified?: string;
  deadline?: string;
  questions: CoverLetterQuestion[];
}

export interface PostComment {
  id: string;
  author: string;
  authorRole?: string;
  content: string;
  timeAgo: string;
  isAuthor?: boolean;
}

export interface CommunityPost {
  id: string;
  category: '합격후기' | '꿀팁' | '질문' | '면접후기' | '자격증' | 'Q&A' | '전체';
  title: string;
  content: string;
  author: string;
  authorRole: string;
  authorAvatar?: string;
  isMentor?: boolean;
  isAnonymous?: boolean;
  timeAgo: string;
  likes: number;
  liked: boolean;
  commentsCount: number;
  comments: PostComment[];
}

export interface AppNotification {
  id: string;
  title: string;
  message: string;
  timeAgo: string;
  read: boolean;
  type: 'job' | 'roadmap' | 'community' | 'task';
}

export interface Friend {
  id: string;
  name: string;
  role: string;
  avatarUrl: string;
  company?: string;
  status: 'online' | 'offline' | 'away';
  lastOnline?: string;
  mutualFriends?: number;
  isFriend: boolean;
}

export interface DirectMessage {
  id: string;
  senderId: string;
  senderName: string;
  senderAvatar: string;
  content: string;
  timestamp: string;
  timeAgo: string;
  isRead: boolean;
}

export interface DirectMessageThread {
  id: string;
  participantId: string;
  participantName: string;
  participantAvatar: string;
  participantRole: string;
  participantStatus: 'online' | 'offline' | 'away';
  lastMessage: string;
  lastMessageTime: string;
  unreadCount: number;
  messages: DirectMessage[];
}

export interface InterviewQuestion {
  id: string;
  questionNumber: number;
  text: string;
  timeLimit: number; // seconds
}

export interface InterviewAnswer {
  questionId: string;
  content: string;
  recordedDuration: number; // seconds
  feedback?: string;
  score?: number; // 0-100
}

export type InterviewerStyle =
  | '압박면접관'
  | '편안한 면접관'
  | '냉정한 대기업 면접관'
  | '현장 실무자';

export interface MockInterview {
  id: string;
  coverLetterId: string;
  companyName: string;
  role: string;
  interviewerStyle?: InterviewerStyle;
  startedAt: string;
  completedAt?: string;
  status: 'in_progress' | 'completed' | 'pending';
  questions: InterviewQuestion[];
  answers: InterviewAnswer[];
  overallScore?: number;
  overallFeedback?: string;
}

export interface CalendarEvent {
  id: string;
  title: string;
  date: string; // YYYY-MM-DD
  type: 'exam' | 'deadline' | 'interview' | 'task' | 'personal';
  company?: string;
  description?: string;
  dDay?: number;
  color?: string;
  completed?: boolean;
}
