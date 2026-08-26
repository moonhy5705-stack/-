export type NavigationTab = 'home' | 'roadmap' | 'coverletter' | 'community' | 'mypage';

export interface UserProfile {
  name: string;
  targetCompany: string;
  targetRole: string;
  avatarUrl: string;
  dDay: number;
  dDayLabel: string;
  progressPercent: number;
  completedTasksCount: number;
  totalTasksCount: number;
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
