import React, { lazy, Suspense } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { UserProvider, useUser } from './context/UserContext';
import Navbar from './components/Navbar';
import Home from './components/Home';
import SignIn from './components/SignIn';
import SignUp from './components/SignUp';
import PostCard from './components/PostCard';

// Lazy-loaded components
const Onboarding = lazy(() => import('./components/Onboarding'));
const Profile = lazy(() => import('./components/Profile'));
const Feed = lazy(() => import('./components/Feed'));
const Messaging = lazy(() => import('./components/Messaging'));

// Protected Route Wrapper
const PrivateRoute = ({ children }) => {
  const { user, isAuthChecked } = useUser();
  if (!isAuthChecked) return <div className="text-center py-20">Loading...</div>;
  return user ? children : <Navigate to="/signin" replace />;
};

const App = () => {
  return (
    <UserProvider>
      <Router>
        <Navbar />
        <div className="container mx-auto p-4">
          <Suspense fallback={<div className="text-center py-20">Loading...</div>}>
            <Routes>
              {/* Public Routes */}
              <Route path="/signin" element={<SignIn />} />
              <Route path="/signup" element={<SignUp />} />
              <Route path="/onboarding" element={<Onboarding />} />

              {/* Protected Routes */}
              <Route
                path="/"
                element={
                  <PrivateRoute>
                    <Home />
                  </PrivateRoute>
                }
              />
              <Route
                path="/home"
                element={
                  <PrivateRoute>
                    <Home />
                  </PrivateRoute>
                }
              />
              <Route
                path="/profile"
                element={
                  <PrivateRoute>
                    <Profile />
                  </PrivateRoute>
                }
              />
              <Route
                path="/feed"
                element={
                  <PrivateRoute>
                    <Feed />
                  </PrivateRoute>
                }
              />
              <Route
                path="/messages"
                element={
                  <PrivateRoute>
                    <Messaging />
                  </PrivateRoute>
                }
              />
              <Route
                path="/post/:id"
                element={
                  <PrivateRoute>
                    <div className="max-w-2xl mx-auto">
                      <PostCard />
                    </div>
                  </PrivateRoute>
                }
              />

              {/* Fallback Redirect */}
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </Suspense>
        </div>
      </Router>
    </UserProvider>
  );
};

export default App;