/* eslint-disable react-refresh/only-export-components */
import { lazy, Suspense } from 'react';
import { createBrowserRouter } from 'react-router';
import ProtectedLayout from '../features/auth/components/ProtectedLayout.jsx';
import PageSkeleton from '../components/ui/PageSkeleton.jsx';

const Login = lazy(() => import('../features/auth/pages/Login.jsx'));
const Register = lazy(() => import('../features/auth/pages/Register.jsx'));
const Home = lazy(() => import('../features/ai/pages/Home.jsx'));
const Applications = lazy(() => import('../features/ai/pages/Applications.jsx'));
const GenerateReport = lazy(() => import('../features/ai/pages/GenerateReport.jsx'));
const Profile = lazy(() => import('../features/ai/pages/Profile.jsx'));
const InterviewReport = lazy(() => import('../features/ai/pages/InterviewReport.jsx'));
/* eslint-enable react-refresh/only-export-components */

export let router = createBrowserRouter([
  {
    path: '/register',
    element: (
      <Suspense fallback={<PageSkeleton />}>
        <Register />
      </Suspense>
    ),
  },
  {
    path: '/login',
    element: (
      <Suspense fallback={<PageSkeleton />}>
        <Login />
      </Suspense>
    ),
  },
  {
    path: '/',
    element: <ProtectedLayout />,
    children: [
      {
        index: true,
        element: (
          <Suspense fallback={<PageSkeleton />}>
            <Home />
          </Suspense>
        ),
      },
      {
        path: 'dashboard',
        element: (
          <Suspense fallback={<PageSkeleton />}>
            <Home />
          </Suspense>
        ),
      },
      {
        path: 'applications',
        element: (
          <Suspense fallback={<PageSkeleton />}>
            <Applications />
          </Suspense>
        ),
      },
      {
        path: 'generatereport',
        element: (
          <Suspense fallback={<PageSkeleton />}>
            <GenerateReport />
          </Suspense>
        ),
      },
      {
        path: 'profile',
        element: (
          <Suspense fallback={<PageSkeleton />}>
            <Profile />
          </Suspense>
        ),
      },
      {
        path: 'interview/:interviewId',
        element: (
          <Suspense fallback={<PageSkeleton />}>
            <InterviewReport />
          </Suspense>
        ),
      },
    ],
  },
]);
