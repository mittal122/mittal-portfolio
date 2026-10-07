import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Field from '@/components/Field';
import Shell from '@/components/Shell';
import HomePage from '@/pages/HomePage';

// Home ships in the main bundle; every other route loads on demand.
const ProjectsPage = lazy(() => import('@/pages/ProjectsPage'));
const AboutPage = lazy(() => import('@/pages/AboutPage'));
const SkillsPage = lazy(() => import('@/pages/SkillsPage'));
const CoursesPage = lazy(() => import('@/pages/CoursesPage'));
const ContactPage = lazy(() => import('@/pages/ContactPage'));
const NotFoundPage = lazy(() => import('@/pages/NotFoundPage'));

export default function App() {
  return (
    <Router future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
      <Field />
      <Shell>
        <Suspense fallback={<div className="min-h-[100dvh]" />}>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/projects" element={<ProjectsPage />} />
            {/* old URL, kept so shared links don't 404 */}
            <Route path="/experience" element={<Navigate to="/projects" replace />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/skills" element={<SkillsPage />} />
            <Route path="/certifications" element={<CoursesPage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </Suspense>
      </Shell>
    </Router>
  );
}
