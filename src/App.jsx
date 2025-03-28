import React, { lazy, Suspense } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { UserProvider, useUser } from './context/UserContext';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import PostCard from './components/PostCard';

// Lazy-loaded components with named exports for better debugging
const Onboarding = lazy(() => import('./components/Onboarding')
  .then(module => ({ default: module.Onboarding })));

const Profile = lazy(() => import('./pages/Profile'));
const Feed = lazy(() => import('./components/Feed')); // Moved to pages/
const Messaging = lazy(() => import('./components/Messaging')); // Moved to pages/

// Enhanced Protected Route with redirect state
const PrivateRoute = ({ children, requireOnboarding = false }) => {
  const { user, isAuthChecked } = useUser();
  
  if (!isAuthChecked) return <LoadingSpinner fullPage />;
  
  if (!user) {
    return <Navigate to="/signin" state={{ from: location.pathname }} replace />;
  }

  if (requireOnboarding && !user.isOnboarded) {
    return <Navigate to="/onboarding" replace />;
  }

  return children;
};

const App = () => {
  return (
    <UserProvider>
      <Router>
        <div className="flex flex-col min-h-screen">
          <Navbar />
          <main className="flex-grow container mx-auto p-4">
            <Suspense fallback={<LoadingSpinner fullPage />}>
              <Routes>
                {/* Public Routes */}
                <Route path="/signin" element={<SignIn />} />
                <Route path="/signup" element={<SignUp />} />
                <Route path="/onboarding" element={<Onboarding />} />

                {/* Protected Routes */}
                <Route path="/" element={
                  <PrivateRoute>
                    <Home />
                  </PrivateRoute>
                } />
                <Route path="/home" element={
                  <PrivateRoute requireOnboarding>
                    <Home />
                  </PrivateRoute>
                } />
                <Route path="/profile" element={
                  <PrivateRoute requireOnboarding>
                    <Profile />
                  </PrivateRoute>
                } />
                <Route path="/feed" element={
                  <PrivateRoute requireOnboarding>
                    <Feed />
                  </PrivateRoute>
                } />
                <Route path="/messages" element={
                  <PrivateRoute requireOnboarding>
                    <Messaging />
                  </PrivateRoute>
                } />
                <Route path="/post/:id" element={
                  <PrivateRoute>
                    <div className="max-w-2xl mx-auto">
                      <PostCard />
                    </div>
                  </PrivateRoute>
                } />

                {/* Admin Routes (example) */}
                <Route path="/admin/*" element={
                  <PrivateRoute>
                    <AdminLayout />
                  </PrivateRoute>
                } />

                {/* Fallback Redirect */}
                <Route path="*" element={<Navigate to="/" replace />} />
              </Routes>
            </Suspense>
          </main>
          <Footer /> {/* Add if you have one */}
        </div>
      </Router>
    </UserProvider>
  );
};

export default App;