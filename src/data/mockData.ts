import {
  UserProfile,
  TaskItem,
  JobPosting,
  RoadmapStep,
  CoverLetter,
  CommunityPost,
  AppNotification
} from '../types';

export const initialUserProfile: UserProfile = {
  name: '김취준',
  targetCompany: '삼성전자',
  targetRole: 'UX디자이너',
  avatarUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCtYn0GRotRZAQZ4vsT71tvIqbNL2Rw9xqJDA7-lMN3CG1d3PfEUTtvhjfs31CT6TpFO-rs-PGCOQtSmro6xCBjBx7D0p9zotpmc2HBFO8IKqn0wDHN4KYNEPIdAd641a5QI8NMlYvhdGBDpt2oMO4tMTRso6n0-KElzNyYQcRcJk5wxVn4p43XvKyFFmdC64O4ivLTfyQmhkN_2Xt4mRX9NFveeYBmxxmH4g2AO-3N6MyR-Becmk0DSw',
  dDay: 30,
  dDayLabel: 'D-30 하반기 공채',
  progressPercent: 75,
  completedTasksCount: 12,
  totalTasksCount: 16,
};

export const initialTasks: TaskItem[] = [
  {
    id: 'task-1',
    title: '포트폴리오 3차 수정',
    completed: false,
    dueDate: '오늘',
    category: '포트폴리오'
  },
  {
    id: 'task-2',
    title: '어학 성적 증명서 등록',
    completed: false,
    dueDate: '오늘',
    category: '서류'
  },
  {
    id: 'task-3',
    title: '삼성전자 자소서 초안 작성',
    completed: true,
    dueDate: '어제',
    category: '자소서'
  },
  {
    id: 'task-4',
    title: 'UX 케이스 스터디 슬라이드 정리',
    completed: false,
    dueDate: '내일',
    category: '포트폴리오'
  },
  {
    id: 'task-5',
    title: '오픽 모의고사 1세트 녹음 및 피드백',
    completed: true,
    dueDate: '3일 전',
    category: '어학'
  }
];

export const initialJobs: JobPosting[] = [
  {
    id: 'job-1',
    company: 'SAMSUNG',
    title: '삼성전자 하반기 3급 신입사원 채용',
    role: 'UX/UI 디자인 직무',
    deadlineBadge: 'D-15',
    typeBadge: '신입',
    locationBadge: '수원',
    matchRate: 82,
    bookmarked: false,
    brandColor: '#003fb1',
    logoText: 'SAMSUNG',
    salary: '연봉 5,300만원 + 성과급',
    experience: '신입 (졸업예정자 포함)',
    description: '차세대 갤럭시 디바이스 및 스마트싱스 생태계의 사용자 경험을 혁신할 열정적인 UX 디자이너를 모십니다. 디자인 시스템 구축 및 글로벌 사용자 리서치에 참여하게 됩니다.',
    techStack: ['Figma', 'Protopie', 'Design System', 'User Research']
  },
  {
    id: 'job-2',
    company: 'NAVER',
    title: '네이버 웹서비스 프로덕트 디자이너 채용',
    role: 'Product Design',
    deadlineBadge: '상시채용',
    typeBadge: '경력무관',
    locationBadge: '분당',
    matchRate: 78,
    bookmarked: false,
    brandColor: '#03C75A',
    logoText: 'NAVER',
    salary: '회사 내규에 따름 (업계 최고 수준)',
    experience: '신입 또는 1~3년 경력',
    description: '네이버 검색, 포털 및 신규 버티컬 서비스의 엔드투엔드 프로덕트 디자인을 담당합니다. 데이터 기반의 가설 검증과 빠른 프로토타이핑을 주도합니다.',
    techStack: ['Figma', 'UI/UX Design', 'Data-driven Design', 'Interaction']
  },
  {
    id: 'job-3',
    company: 'HYUNDAI',
    title: '현대자동차 인포테인먼트 UX/UI 설계 신입 채용',
    role: 'ccOS 차량 인터페이스 디자이너',
    deadlineBadge: 'D-7',
    typeBadge: '신입',
    locationBadge: '서울 양재',
    matchRate: 85,
    bookmarked: true,
    brandColor: '#002C5F',
    logoText: 'HYUNDAI',
    salary: '연봉 5,400만원 수준',
    experience: '신입',
    description: 'SDV(소프트웨어 중심 자동차) 시대를 이끌 스마트 모빌리티 콕핏 및 클러스터 인터랙션 설계를 담당합니다.',
    techStack: ['Figma', '3D Motion', 'Automotive UX', 'GUI']
  },
  {
    id: 'job-4',
    company: 'KAKAO',
    title: '카카오 프론트엔드 및 프로덕트 디자인 영입',
    role: '카카오톡 서비스 UX 파트',
    deadlineBadge: 'D-21',
    typeBadge: '신입/경력',
    locationBadge: '판교',
    matchRate: 74,
    bookmarked: false,
    brandColor: '#FEE500',
    logoText: 'kakao',
    salary: '회사 내규 협의',
    experience: '경력무관',
    description: '5,000만 국민이 매일 사용하는 카카오톡의 핵심 기능과 신규 실험적 기능을 기획하고 설계합니다.',
    techStack: ['Figma', 'Design Ops', 'User Journey Mapping']
  }
];

export const initialRoadmapSteps: RoadmapStep[] = [
  {
    id: 'step-1',
    stepNumber: 1,
    title: '1단계: 자격증 (정보처리기사)',
    category: '자격증',
    status: 'completed',
    dateLabel: '완료: 2023.08.15',
    notes: '기출문제 5회독 완료. 실기 한 번에 합격!',
    badgeText: '완료: 2023.08.15'
  },
  {
    id: 'step-2',
    stepNumber: 2,
    title: '2단계: 어학 (오픽 AL)',
    category: '어학',
    status: 'in_progress',
    dateLabel: '예상 완료: 2023.10.31',
    notes: '현재 스크립트 작성 중. 매일 1시간 쉐도잉 연습 지속하기.',
    badgeText: '예상 완료: 2023.10.31'
  },
  {
    id: 'step-3',
    stepNumber: 3,
    title: '3단계: 직무 공부 (UX 방법론)',
    category: '직무',
    status: 'pending',
    dateLabel: '예상 시작: 2023.11.01',
    notes: '인프런 강의 수강 및 실무 사례 분석 리포트 작성 예정.',
    badgeText: '예상 시작: 2023.11.01'
  },
  {
    id: 'step-4',
    stepNumber: 4,
    title: '4단계: 자소서/면접 준비',
    category: '취업전형',
    status: 'pending',
    dateLabel: '예상 시작: 2023.12.01',
    notes: '이전 경험 정리 및 면접 스터디 합류.',
    badgeText: '예상 시작: 2023.12.01'
  }
];

export const initialCoverLetters: CoverLetter[] = [
  {
    id: 'cl-1',
    company: '삼성전자',
    type: '하반기 신입',
    role: 'UX/UI 디자인',
    status: 'completed',
    progressPercent: 100,
    completedQuestions: 4,
    totalQuestions: 4,
    lastModified: '2시간 전',
    deadline: '2023.10.20',
    questions: [
      {
        id: 'q1',
        questionNumber: 1,
        prompt: '삼성전자를 지원한 이유와 입사 후 회사에서 이루고 싶은 꿈을 기술하십시오.',
        maxChars: 700,
        answer: '삼성전자의 사용자 중심 인터페이스 철학에 깊이 공감하여 지원했습니다. 대학 시절 모바일 헬스케어 앱 프로젝트를 진행하며 노인 사용자의 접근성 문제를 해결한 경험이 있습니다. 입사 후 글로벌 사용자 모두가 직관적으로 사용할 수 있는 유니버설 UX 가이드라인을 정립하고 싶습니다.',
        completed: true,
        aiTip: '지원 동기에 구체적인 사용자 문제 해결 경험이 잘 녹아있습니다. 입사 후 기여할 수 있는 디바이스(스마트폰/가전)를 명시하면 더 좋습니다.'
      },
      {
        id: 'q2',
        questionNumber: 2,
        prompt: '본인의 성장과정을 간략히 기술하되 현재의 자신에게 가장 큰 영향을 끼친 사건, 인물 등을 포함하여 기술하시기 바랍니다.',
        maxChars: 1500,
        answer: '공학과 디자인의 접점에서 소통하는 중재자로서의 태도를 길렀습니다. 컴퓨터공학 부전공을 병행하며 개발자와 디자이너 간의 시각차를 줄이는 디자인 토큰 시스템을 주도한 경험이 제 커리어의 결정적 계기가 되었습니다.',
        completed: true,
        aiTip: '협업 역량과 기술적 이해도가 돋보이는 모범적인 사례입니다.'
      },
      {
        id: 'q3',
        questionNumber: 3,
        prompt: '최근 사회 이슈 중 중요하다고 생각되는 한 가지를 선택하고 이에 관한 자신의 견해를 기술해 주시기 바랍니다.',
        maxChars: 1000,
        answer: '생성형 AI 시대의 사용자 신뢰 및 프라이버시 인터랙션이 핵심 과제라고 생각합니다. AI 추천 결과에 대한 설명 가능성을 높이는 투명한 UI 피드백 구조가 요구됩니다.',
        completed: true,
        aiTip: '최신 AI 트렌드와 UX의 접점을 논리적으로 풀어냈습니다.'
      },
      {
        id: 'q4',
        questionNumber: 4,
        prompt: '지원한 직무 관련 본인이 갖고 있는 전문지식/경험을 작성하고, 이를 바탕으로 본인이 지원 직무에 적합한 사유를 기술하십시오.',
        maxChars: 1000,
        answer: '실제 1만 DAU 서비스의 리디자인을 진행하여 이탈률을 24% 개선한 정량적 데이터 기반 UX 리서치 경험이 있습니다. 피그마 컴포넌트 아키텍처 구축과 유저 테스트 전 과정을 리드했습니다.',
        completed: true,
        aiTip: '수치화된 성과(24% 개선)가 설득력을 극대화합니다.'
      }
    ]
  },
  {
    id: 'cl-2',
    company: '현대자동차',
    type: '수시 채용',
    role: '차량 인포테인먼트 UX',
    status: 'in_progress',
    progressPercent: 50,
    completedQuestions: 2,
    totalQuestions: 4,
    lastModified: '1일 전',
    deadline: '2023.11.05',
    questions: [
      {
        id: 'h-q1',
        questionNumber: 1,
        prompt: '현대자동차에 지원하게 된 동기와 해당 직무(모빌리티 UX)를 선택한 이유를 작성해 주세요.',
        maxChars: 1000,
        answer: '주행 중 운전자의 시선 분산을 최소화하는 HUD 및 음성 결합 멀티모달 인터랙션에 관심이 깊어 현대자동차 ccOS UX팀에 지원했습니다.',
        completed: true,
        aiTip: '모빌리티 특화 안전성과 멀티모달 UX 키워드가 매우 적절합니다.'
      },
      {
        id: 'h-q2',
        questionNumber: 2,
        prompt: '자신이 주도적으로 문제를 해결했던 가장 도전적인 프로젝트 경험을 기술해 주세요.',
        maxChars: 1000,
        answer: '교내 자율주행 경진대회 관제 대시보드 디자인 당시, 급박한 이상 상황 알림을 0.5초 내에 인지할 수 있는 시각 계층을 설계하여 최우수상을 수상했습니다.',
        completed: true,
        aiTip: '인지 심리학적 접근과 수상 결과가 잘 연결되어 있습니다.'
      },
      {
        id: 'h-q3',
        questionNumber: 3,
        prompt: '타인과의 협업 중 갈등이 발생했을 때 이를 극복한 사례를 기술해 주세요.',
        maxChars: 1000,
        answer: '',
        completed: false,
        aiTip: '직무 관련 갈등(디자이너 vs 개발자 리소스 충돌 등)을 데이터 기반으로 합의 도출한 경험을 작성해보세요.'
      },
      {
        id: 'h-q4',
        questionNumber: 4,
        prompt: '입사 후 현대자동차에서 실현하고 싶은 중장기 비전을 서술해 주세요.',
        maxChars: 1000,
        answer: '',
        completed: false,
        aiTip: 'SDV 전환 및 PBV(목적 기반 모빌리티) 공간 경험 혁신을 주제로 작성하는 것을 추천합니다.'
      }
    ]
  },
  {
    id: 'cl-3',
    company: '네이버',
    type: '서비스 기획',
    role: 'Product Designer',
    status: 'not_started',
    progressPercent: 0,
    completedQuestions: 0,
    totalQuestions: 3,
    deadline: '2023.11.15',
    questions: [
      {
        id: 'n-q1',
        questionNumber: 1,
        prompt: '자신을 가장 잘 표현할 수 있는 키워드 3가지와 그 이유를 설명해 주세요.',
        maxChars: 800,
        answer: '',
        completed: false,
        aiTip: '데이터 탐구자, 연결자, 사용자 대변인 등의 직무 연계 키워드를 고려해 보세요.'
      },
      {
        id: 'n-q2',
        questionNumber: 2,
        prompt: '네이버 서비스 중 개선이 필요하다고 생각하는 서비스 1개를 선정하고 구체적인 개선안을 제시해 주세요.',
        maxChars: 1500,
        answer: '',
        completed: false,
        aiTip: '현재의 Pain Point, 타깃 유저 정의, 가설, 구체적 UI/UX 솔루션 및 기대효과 순서로 구성하세요.'
      },
      {
        id: 'n-q3',
        questionNumber: 3,
        prompt: '포트폴리오에 기재된 대표 프로젝트 1개의 기여도 및 핵심 문제 해결 과정을 기술해 주세요.',
        maxChars: 1000,
        answer: '',
        completed: false,
        aiTip: '내가 직접 고민하고 실행한 부분(My Role)에 집중하여 서술하세요.'
      }
    ]
  }
];

export const initialCommunityPosts: CommunityPost[] = [
  {
    id: 'post-1',
    category: '합격후기',
    title: '삼성전자 최종 합격 후기 공유합니다!',
    content: '안녕하세요, 이번 하반기 공채로 삼성전자에 최종 합격하게 되어 후기를 남깁니다. 서류부터 GSAT, 면접까지 제 경험이 조금이나마 도움이 되었으면 좋겠습니다. 특히 직무 면접에서는 포트폴리오의 실패 사례를 어떻게 극복했는지 질문을 깊게 하셨는데 솔직하고 논리적으로 답변했던 것이 좋은 평가를 받은 것 같습니다.',
    author: '취업성공선배',
    authorRole: '취업성공선배',
    authorAvatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDqolLxtIQ8Dg0Wa2vvW4okKGlGlVyS6KeyhjF5gf_4olo2k8Doyj2lJPIQfhoQoW9td1lyXU6vd89wllrzpSM0Z4JMW1F6UyckQ75NIFIqkAaP348hA95jwna0IeGtdSGz2yOPeqFks9nshrA3pOxAft7L1GD9RTuo856stg_qNArcx29hvkKs-ml4D84LUP2xO9cAvBuMzOneWh_BBjY1W9fYKSCpHxqt3WCWel1_EKJi6VoQggl0Wg',
    timeAgo: '방금 전',
    likes: 45,
    liked: false,
    commentsCount: 12,
    comments: [
      {
        id: 'c-1',
        author: '디자인꿈나무',
        authorRole: '취준생',
        content: '합격 진심으로 축하드립니다!! 혹시 포폴 페이지 수는 몇 장 정도로 구성하셨는지 여쭤봐도 될까요?',
        timeAgo: '5분 전'
      },
      {
        id: 'c-2',
        author: '취업성공선배',
        authorRole: '작성자',
        content: '감사합니다! 저는 프로젝트 3개로 총 18페이지 정도로 핵심만 압축해서 제출했습니다 :)',
        timeAgo: '3분 전',
        isAuthor: true
      },
      {
        id: 'c-3',
        author: '코딩하는취준생',
        authorRole: '취준생',
        content: 'GSAT 문제집은 몇 권 정도 푸셨나요? 팁 부탁드립니다!',
        timeAgo: '1분 전'
      }
    ]
  },
  {
    id: 'post-2',
    category: '꿀팁',
    title: '비전공자 코딩 테스트 준비 꿀팁',
    content: '비전공자로서 코딩 테스트를 준비하면서 겪었던 시행착오와 효과적이었던 공부 방법을 정리해봤습니다. 알고리즘 기본기부터 시작해서 백준 골드 달성까지 매일 3문제씩 꾸준히 푼 루틴을 공유합니다. 1. 구현/DFS/BFS부터 탄탄하게 2. 오답 노트는 깃허브에 필수로 기록하기 3. 시간 복잡도 먼저 계산하는 습관 들이기!',
    author: '개발자멘토',
    authorRole: '멘토',
    isMentor: true,
    timeAgo: '2시간 전',
    likes: 30,
    liked: true,
    commentsCount: 8,
    comments: [
      {
        id: 'c-4',
        author: '파이썬초보',
        authorRole: '취준생',
        content: '비전공자라 늘 막막했는데 큰 용기 얻고 갑니다! 감사합니다 멘토님.',
        timeAgo: '1시간 전'
      },
      {
        id: 'c-5',
        author: '개발자멘토',
        authorRole: '멘토',
        content: '꾸준함이 최고의 무기입니다. 막히는 문제는 40분 고민 후 해설을 보고 체화하세요!',
        timeAgo: '30분 전',
        isAuthor: true
      }
    ]
  },
  {
    id: 'post-3',
    category: '질문',
    title: '오픽 시험 볼 때 주의할 점 있나요?',
    content: '다음 주에 처음으로 오픽 시험을 보러 갑니다. 긴장이 많이 되는데, 시험장 분위기나 꼭 챙겨야 할 팁 같은 게 있을까요? 서베이 선택 팁이나 필러(filler words) 자연스럽게 쓰는 법도 궁금합니다!',
    author: '익명',
    authorRole: '익명',
    isAnonymous: true,
    timeAgo: '어제',
    likes: 5,
    liked: false,
    commentsCount: 15,
    comments: [
      {
        id: 'c-6',
        author: '영어정복자',
        authorRole: 'AL보유자',
        content: '신분증 꼭 챙기시고, 다른 사람들 말소리에 흔들리지 않게 헤드폰 볼륨 조절 잘하세요! You know, I mean 같은 필러 적절히 섞으면 좋습니다.',
        timeAgo: '20시간 전'
      },
      {
        id: 'c-7',
        author: '취준생A',
        authorRole: '취준생',
        content: '서베이에서 일관성 있게 묶는 게 핵심입니다! (예: 공원가기 + 조깅하기 + 걷기)',
        timeAgo: '18시간 전'
      }
    ]
  },
  {
    id: 'post-4',
    category: '면접후기',
    title: '현대자동차 1차 직무면접 생생 후기 (AI 역량평가 포함)',
    content: '현대자동차 R&D 부문 1차 직무면접 보고 왔습니다. PT 면접 15분 + 직무 Q&A 30분으로 진행되었고, 사전에 제출한 프로젝트의 기술적 의사결정 이유를 깊게 물어보셨습니다. 꼬리 질문이 날카로우니 본인이 짠 코드나 디자인 산출물은 한 줄도 빠짐없이 숙지하셔야 합니다.',
    author: '모빌리티러버',
    authorRole: '취준생',
    timeAgo: '3일 전',
    likes: 28,
    liked: false,
    commentsCount: 9,
    comments: []
  },
  {
    id: 'post-5',
    category: '자격증',
    title: '정보처리기사 실기 3주 단기 완성 공부법 요약',
    content: '전공/비전공 상관없이 정처기 실기 합격률 높이는 방법 공유합니다. 1. SQL 파트는 무조건 만점 목표 2. 프로그래밍 언어(C/Java/Python) 포인터 및 상속 문제 집중 3. 신기술 용어는 매일 10개씩 암기 4. 시나공/수제비 모의고사 10회분 풀기.',
    author: '자격증마스터',
    authorRole: '합격자',
    timeAgo: '5일 전',
    likes: 52,
    liked: false,
    commentsCount: 21,
    comments: []
  }
];

export const initialNotifications: AppNotification[] = [
  {
    id: 'notif-1',
    title: 'D-30 공채 알림',
    message: '삼성전자 하반기 공채 접수 마감이 15일 남았습니다.',
    timeAgo: '10분 전',
    read: false,
    type: 'job'
  },
  {
    id: 'notif-2',
    title: '오늘의 할 일 리마인더',
    message: '포트폴리오 3차 수정 및 어학 증명서 등록 일정이 있습니다.',
    timeAgo: '1시간 전',
    read: false,
    type: 'task'
  },
  {
    id: 'notif-3',
    title: '커뮤니티 댓글',
    message: '취업성공선배님이 회원님의 질문에 댓글을 남겼습니다.',
    timeAgo: '3시간 전',
    read: true,
    type: 'community'
  }
];
