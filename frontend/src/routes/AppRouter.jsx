import { Routes, Route } from "react-router-dom";

import ProtectedRoute from "./ProtectedRoute";
import MainLayout from "../layouts/MainLayout";

import HomePage from "../pages/home/HomePage";
import LoginPage from "../pages/auth/LoginPage";
import RegisterPage from "../pages/auth/RegisterPage";

import DashboardPage from "../pages/dashboard/DashboardPage";
import AiChatPage from "../pages/ai-chat/AiChatPage";
import AiNotesPage from "../pages/ai-notes/AiNotesPage";

import AiQuizPage from "../pages/ai-quiz/AiQuizPage";
import QuizAttemptPage from "../pages/ai-quiz/QuizAttemptPage";
import QuizResultPage from "../pages/ai-quiz/QuizResultPage";

import ResumeReviewPage from "../pages/resume-review/ResumeReviewPage";
import ResumeReviewDetailsPage from "../pages/resume-review/ResumeReviewDetailsPage";

import AiRoadmapPage from "../pages/roadmap/AiRoadmapPage";
import RoadmapDetailsPage from "../pages/roadmap/RoadmapDetailsPage";
import NotificationsPage from "../pages/notifications/NotificationsPage";
import SearchPage from "../pages/search/SearchPage";

function AppRouter() {
  return (
    <Routes>
      {/* Public Routes */}

      <Route
        path="/"
        element={<HomePage />}
      />

      <Route
        path="/login"
        element={<LoginPage />}
      />

      <Route
        path="/register"
        element={<RegisterPage />}
      />

      {/* Protected Routes */}

      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <MainLayout>
              <DashboardPage />
            </MainLayout>
          </ProtectedRoute>
        }
      />

      {/* AI Chat */}

      <Route
        path="/ai-chat"
        element={
          <ProtectedRoute>
            <MainLayout>
              <AiChatPage />
            </MainLayout>
          </ProtectedRoute>
        }
      />

      {/* AI Notes */}

      <Route
        path="/ai-notes"
        element={
          <ProtectedRoute>
            <MainLayout>
              <AiNotesPage />
            </MainLayout>
          </ProtectedRoute>
        }
      />

      {/* AI Quiz */}

      <Route
        path="/ai-quiz"
        element={
          <ProtectedRoute>
            <MainLayout>
              <AiQuizPage />
            </MainLayout>
          </ProtectedRoute>
        }
      />

      <Route
        path="/ai-quiz/:quizId/attempt"
        element={
          <ProtectedRoute>
            <MainLayout>
              <QuizAttemptPage />
            </MainLayout>
          </ProtectedRoute>
        }
      />

      <Route
        path="/ai-quiz/attempts/:attemptId/result"
        element={
          <ProtectedRoute>
            <MainLayout>
              <QuizResultPage />
            </MainLayout>
          </ProtectedRoute>
        }
      />

      {/* Resume Review */}

      <Route
        path="/resume-review"
        element={
          <ProtectedRoute>
            <MainLayout>
              <ResumeReviewPage />
            </MainLayout>
          </ProtectedRoute>
        }
      />

      <Route
        path="/resume-review/:reviewId"
        element={
          <ProtectedRoute>
            <MainLayout>
              <ResumeReviewDetailsPage />
            </MainLayout>
          </ProtectedRoute>
        }
      />

      {/* AI Roadmap */}

      <Route
        path="/ai-roadmap"
        element={
          <ProtectedRoute>
            <MainLayout>
              <AiRoadmapPage />
            </MainLayout>
          </ProtectedRoute>
        }
      />

      <Route
        path="/ai-roadmap/:roadmapId"
        element={
          <ProtectedRoute>
            <MainLayout>
              <RoadmapDetailsPage />
            </MainLayout>
          </ProtectedRoute>
        }
      />

      {/* Search */}

      <Route
        path="/search"
        element={
          <ProtectedRoute>
            <MainLayout>
              <SearchPage />
            </MainLayout>
          </ProtectedRoute>
        }
      />

      {/* Notifications */}

      <Route
        path="/notifications"
        element={
          <ProtectedRoute>
            <MainLayout>
              <NotificationsPage />
            </MainLayout>
          </ProtectedRoute>
        }
      />

      {/* 404 */}

      <Route
        path="*"
        element={
          <div className="flex min-h-screen items-center justify-center bg-slate-950 text-white">
            <div className="text-center">
              <h1 className="text-6xl font-bold">
                404
              </h1>

              <p className="mt-3 text-slate-400">
                Page not found
              </p>
            </div>
          </div>
        }
      />
    </Routes>
  );
}

export default AppRouter;