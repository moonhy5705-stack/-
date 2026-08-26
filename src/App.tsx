/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { TopAppBar } from './components/Navigation/TopAppBar';
import { BottomNavBar } from './components/Navigation/BottomNavBar';
import { HomeScreen } from './components/Home/HomeScreen';
import { RoadmapScreen } from './components/Roadmap/RoadmapScreen';
import { CoverLetterScreen } from './components/CoverLetter/CoverLetterScreen';
import { CommunityScreen } from './components/Community/CommunityScreen';
import { MyPageScreen } from './components/MyPage/MyPageScreen';

import { TaskModal } from './components/Modals/TaskModal';
import { RoadmapEditModal } from './components/Modals/RoadmapEditModal';
import { CoverLetterModal } from './components/Modals/CoverLetterModal';
import { NewCoverLetterModal } from './components/Modals/NewCoverLetterModal';
import { JobDetailModal } from './components/Modals/JobDetailModal';
import { CommunityWriteModal } from './components/Modals/CommunityWriteModal';
import { PostDetailModal } from './components/Modals/PostDetailModal';

import {
  NavigationTab,
  UserProfile,
  TaskItem,
  JobPosting,
  RoadmapStep,
  CoverLetter,
  CommunityPost,
  AppNotification
} from './types';

import {
  initialUserProfile,
  initialTasks,
  initialJobs,
  initialRoadmapSteps,
  initialCoverLetters,
  initialCommunityPosts,
  initialNotifications
} from './data/mockData';

export default function App() {
  // Navigation State
  const [currentTab, setCurrentTab] = useState<NavigationTab>('home');

  // Core Data States with localStorage fallback
  const [userProfile, setUserProfile] = useState<UserProfile>(() => {
    const saved = localStorage.getItem('career_user_profile');
    return saved ? JSON.parse(saved) : initialUserProfile;
  });

  const [tasks, setTasks] = useState<TaskItem[]>(() => {
    const saved = localStorage.getItem('career_tasks');
    return saved ? JSON.parse(saved) : initialTasks;
  });

  const [jobs, setJobs] = useState<JobPosting[]>(() => {
    const saved = localStorage.getItem('career_jobs');
    return saved ? JSON.parse(saved) : initialJobs;
  });

  const [roadmapSteps, setRoadmapSteps] = useState<RoadmapStep[]>(() => {
    const saved = localStorage.getItem('career_roadmap_steps');
    return saved ? JSON.parse(saved) : initialRoadmapSteps;
  });

  const [coverLetters, setCoverLetters] = useState<CoverLetter[]>(() => {
    const saved = localStorage.getItem('career_cover_letters');
    return saved ? JSON.parse(saved) : initialCoverLetters;
  });

  const [communityPosts, setCommunityPosts] = useState<CommunityPost[]>(() => {
    const saved = localStorage.getItem('career_community_posts');
    return saved ? JSON.parse(saved) : initialCommunityPosts;
  });

  const [notifications, setNotifications] = useState<AppNotification[]>(() => {
    const saved = localStorage.getItem('career_notifications');
    return saved ? JSON.parse(saved) : initialNotifications;
  });

  // Modal States
  const [isTaskModalOpen, setIsTaskModalOpen] = useState(false);
  const [isRoadmapEditModalOpen, setIsRoadmapEditModalOpen] = useState(false);
  const [selectedCoverLetter, setSelectedCoverLetter] = useState<CoverLetter | null>(null);
  const [isNewCoverLetterModalOpen, setIsNewCoverLetterModalOpen] = useState(false);
  const [selectedJob, setSelectedJob] = useState<JobPosting | null>(null);
  const [isCommunityWriteModalOpen, setIsCommunityWriteModalOpen] = useState(false);
  const [selectedPost, setSelectedPost] = useState<CommunityPost | null>(null);
  const [isNotifOpen, setIsNotifOpen] = useState(false);

  // Sync to LocalStorage
  useEffect(() => {
    localStorage.setItem('career_user_profile', JSON.stringify(userProfile));
  }, [userProfile]);

  useEffect(() => {
    localStorage.setItem('career_tasks', JSON.stringify(tasks));
  }, [tasks]);

  useEffect(() => {
    localStorage.setItem('career_jobs', JSON.stringify(jobs));
  }, [jobs]);

  useEffect(() => {
    localStorage.setItem('career_roadmap_steps', JSON.stringify(roadmapSteps));
  }, [roadmapSteps]);

  useEffect(() => {
    localStorage.setItem('career_cover_letters', JSON.stringify(coverLetters));
  }, [coverLetters]);

  useEffect(() => {
    localStorage.setItem('career_community_posts', JSON.stringify(communityPosts));
  }, [communityPosts]);

  useEffect(() => {
    localStorage.setItem('career_notifications', JSON.stringify(notifications));
  }, [notifications]);

  // Task Handlers
  const handleToggleTask = (taskId: string) => {
    setTasks((prev) =>
      prev.map((t) => (t.id === taskId ? { ...t, completed: !t.completed } : t))
    );
  };

  const handleAddTask = (newTask: { title: string; category?: string; dueDate?: string }) => {
    const item: TaskItem = {
      id: `task-${Date.now()}`,
      title: newTask.title,
      category: newTask.category || '기타',
      dueDate: newTask.dueDate || '오늘',
      completed: false
    };
    setTasks((prev) => [item, ...prev]);
  };

  const handleDeleteTask = (taskId: string) => {
    setTasks((prev) => prev.filter((t) => t.id !== taskId));
  };

  // Job Bookmark Handler
  const handleToggleBookmarkJob = (jobId: string) => {
    setJobs((prev) =>
      prev.map((j) => (j.id === jobId ? { ...j, bookmarked: !j.bookmarked } : j))
    );
  };

  // Roadmap Step Click & Update
  const handleStepClick = (step: RoadmapStep) => {
    setIsRoadmapEditModalOpen(true);
  };

  const handleUpdateRoadmapSteps = (updatedSteps: RoadmapStep[]) => {
    setRoadmapSteps(updatedSteps);
  };

  const handleUpdateTarget = (targetCompany: string, targetRole: string) => {
    setUserProfile((prev) => ({ ...prev, targetCompany, targetRole }));
  };

  // Cover Letter Handlers
  const handleSaveCoverLetter = (updated: CoverLetter) => {
    setCoverLetters((prev) =>
      prev.map((cl) => (cl.id === updated.id ? updated : cl))
    );
    setSelectedCoverLetter(null);
  };

  const handleCreateCoverLetter = (newLetter: CoverLetter) => {
    setCoverLetters((prev) => [newLetter, ...prev]);
  };

  // Community Handlers
  const handleToggleLikePost = (postId: string, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    setCommunityPosts((prev) =>
      prev.map((p) => {
        if (p.id === postId) {
          const liked = !p.liked;
          const likes = liked ? p.likes + 1 : p.likes - 1;
          return { ...p, liked, likes };
        }
        return p;
      })
    );

    if (selectedPost && selectedPost.id === postId) {
      setSelectedPost((prev) => {
        if (!prev) return null;
        const liked = !prev.liked;
        const likes = liked ? prev.likes + 1 : prev.likes - 1;
        return { ...prev, liked, likes };
      });
    }
  };

  const handleAddCommunityPost = (
    newPostData: Omit<CommunityPost, 'id' | 'likes' | 'liked' | 'commentsCount' | 'comments' | 'timeAgo'>
  ) => {
    const post: CommunityPost = {
      ...newPostData,
      id: `post-${Date.now()}`,
      likes: 0,
      liked: false,
      commentsCount: 0,
      comments: [],
      timeAgo: '방금 전'
    };
    setCommunityPosts((prev) => [post, ...prev]);
  };

  const handleAddComment = (postId: string, commentText: string) => {
    const newComment = {
      id: `c-${Date.now()}`,
      author: userProfile.name,
      authorRole: '취준생',
      content: commentText,
      timeAgo: '방금 전'
    };

    setCommunityPosts((prev) =>
      prev.map((p) => {
        if (p.id === postId) {
          return {
            ...p,
            commentsCount: p.commentsCount + 1,
            comments: [...p.comments, newComment]
          };
        }
        return p;
      })
    );

    if (selectedPost && selectedPost.id === postId) {
      setSelectedPost((prev) =>
        prev
          ? {
              ...prev,
              commentsCount: prev.commentsCount + 1,
              comments: [...prev.comments, newComment]
            }
          : null
      );
    }
  };

  // Notification Handlers
  const handleMarkNotificationRead = (id: string) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, read: true } : n))
    );
  };

  // Profile Update Handler
  const handleUpdateProfile = (updated: Partial<UserProfile>) => {
    setUserProfile((prev) => ({ ...prev, ...updated }));
  };

  return (
    <div className="min-h-screen bg-[#f9f9ff] text-[#121c2a] flex flex-col selection:bg-[#dbe1ff] selection:text-[#00174d] font-sans">
      {/* Top App Bar */}
      <TopAppBar
        currentTab={currentTab}
        onTabChange={setCurrentTab}
        notifications={notifications}
        onMarkNotificationRead={handleMarkNotificationRead}
        isNotifOpen={isNotifOpen}
        setIsNotifOpen={setIsNotifOpen}
      />

      {/* Main Content Area */}
      <main className="flex-1 w-full" onClick={() => isNotifOpen && setIsNotifOpen(false)}>
        {currentTab === 'home' && (
          <HomeScreen
            userProfile={userProfile}
            tasks={tasks}
            jobs={jobs}
            onToggleTask={handleToggleTask}
            onOpenAddTaskModal={() => setIsTaskModalOpen(true)}
            onOpenAllScheduleModal={() => setIsTaskModalOpen(true)}
            onToggleBookmarkJob={handleToggleBookmarkJob}
            onSelectJob={(job) => setSelectedJob(job)}
            onNavigateTab={setCurrentTab}
          />
        )}

        {currentTab === 'roadmap' && (
          <RoadmapScreen
            userProfile={userProfile}
            steps={roadmapSteps}
            onOpenEditModal={() => setIsRoadmapEditModalOpen(true)}
            onOpenAddStepModal={() => setIsRoadmapEditModalOpen(true)}
            onStepClick={handleStepClick}
          />
        )}

        {currentTab === 'coverletter' && (
          <CoverLetterScreen
            coverLetters={coverLetters}
            onSelectCoverLetter={(cl) => setSelectedCoverLetter(cl)}
            onOpenNewCoverLetterModal={() => setIsNewCoverLetterModalOpen(true)}
          />
        )}

        {currentTab === 'community' && (
          <CommunityScreen
            posts={communityPosts}
            onSelectPost={(post) => setSelectedPost(post)}
            onToggleLikePost={handleToggleLikePost}
            onOpenWriteModal={() => setIsCommunityWriteModalOpen(true)}
          />
        )}

        {currentTab === 'mypage' && (
          <MyPageScreen
            userProfile={userProfile}
            onUpdateProfile={handleUpdateProfile}
            bookmarkedJobs={jobs.filter((j) => j.bookmarked)}
            coverLetters={coverLetters}
            onSelectJob={(job) => setSelectedJob(job)}
            onSelectCoverLetter={(cl) => setSelectedCoverLetter(cl)}
          />
        )}
      </main>

      {/* Mobile Bottom Navigation Bar */}
      <BottomNavBar currentTab={currentTab} onTabChange={setCurrentTab} />

      {/* Interactive Modals */}
      <TaskModal
        isOpen={isTaskModalOpen}
        onClose={() => setIsTaskModalOpen(false)}
        tasks={tasks}
        onToggleTask={handleToggleTask}
        onAddTask={handleAddTask}
        onDeleteTask={handleDeleteTask}
      />

      <RoadmapEditModal
        isOpen={isRoadmapEditModalOpen}
        onClose={() => setIsRoadmapEditModalOpen(false)}
        steps={roadmapSteps}
        userProfile={userProfile}
        onUpdateSteps={handleUpdateRoadmapSteps}
        onUpdateTarget={handleUpdateTarget}
      />

      <CoverLetterModal
        isOpen={!!selectedCoverLetter}
        onClose={() => setSelectedCoverLetter(null)}
        coverLetter={selectedCoverLetter}
        onSaveCoverLetter={handleSaveCoverLetter}
      />

      <NewCoverLetterModal
        isOpen={isNewCoverLetterModalOpen}
        onClose={() => setIsNewCoverLetterModalOpen(false)}
        onCreate={handleCreateCoverLetter}
      />

      <JobDetailModal
        isOpen={!!selectedJob}
        onClose={() => setSelectedJob(null)}
        job={selectedJob}
        onToggleBookmark={handleToggleBookmarkJob}
      />

      <CommunityWriteModal
        isOpen={isCommunityWriteModalOpen}
        onClose={() => setIsCommunityWriteModalOpen(false)}
        onAddPost={handleAddCommunityPost}
        currentUserName={userProfile.name}
      />

      <PostDetailModal
        isOpen={!!selectedPost}
        onClose={() => setSelectedPost(null)}
        post={selectedPost}
        onToggleLike={(postId) => handleToggleLikePost(postId)}
        onAddComment={handleAddComment}
      />
    </div>
  );
}
