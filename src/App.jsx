import React, { lazy, Suspense } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate, Link } from 'react-router-dom';
import { UserProvider } from './context/UserContext';
import Navbar from './components/Navbar';
import ErrorBoundary from './components/ErrorBoundary';
import LoadingSpinner from './components/LoadingSpinner';
import AuthRedirect from './components/AuthRedirect';

// Lazy-loaded components
const Home = lazy(() => import('./pages/Home'));
const SignIn = lazy(() => import('./pages/SignIn'));
const SignUp = lazy(() => import('./pages/SignUp'));
const Profile = lazy(() => import('./pages/Profile'));
const Feed = lazy(() => import('./pages/Feed'));
const Messaging = lazy(() => import('./pages/Messaging'));
const Onboarding = lazy(() => import('./pages/Onboarding'));

// Protected Route Wrapper
const PrivateRoute = ({ children, fallback = <AuthRedirect /> }) => {
  const { user, isAuthChecked } = useUser();
  
  if (!isAuthChecked) return <LoadingSpinner fullPage />;
  return user ? children : fallback;
};

const App = () => {
  return (
    <ErrorBoundary>
      <UserProvider>
        <Router>
          <div className="flex flex-col min-h-screen">
            <Navbar />
            <main className="flex-grow">
              <Suspense fallback={<LoadingSpinner fullPage />}>
                <Routes>
                  {/* Public Routes */}
                  <Route path="/signin" element={<SignIn />} />
                  <Route path="/signup" element={<SignUp />} />
                  
                  {/* Protected Routes */}
                  <Route path="/" element={
                    <PrivateRoute>
                      <Navigate to="/home" replace />
                    </PrivateRoute>
                  } />
                  <Route path="/home" element={
                    <PrivateRoute>
                      <Home />
                    </PrivateRoute>
                  } />
                  <Route path="/profile" element={
                    <PrivateRoute>
                      <Profile />
                    </PrivateRoute>
                  } />
                  <Route path="/feed" element={
                    <PrivateRoute>
                      <Feed />
                    </PrivateRoute>
                  } />
                  <Route path="/messages" element={
                    <PrivateRoute>
                      <Messaging />
                    </PrivateRoute>
                  } />
                  <Route path="/onboarding" element={
                    <PrivateRoute>
                      <Onboarding />
                    </PrivateRoute>
                  } />

                  {/* Fallback */}
                  <Route path="*" element={<Navigate to="/" replace />} />
                </Routes>
              </Suspense>
            </main>
          </div>
        </Router>
      </UserProvider>
    </ErrorBoundary>
  );
};

export default App;