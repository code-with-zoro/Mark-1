import React, { lazy, Suspense } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { UserProvider } from './context/UserContext'; // ✅ Import User Context
import Navbar from './components/Navbar'; // ✅ Import Navbar
import Home from './components/Home'; // ✅ Import Home Component
import SignIn from './components/SignIn'; // ✅ Import Sign In Page

const Onboarding = lazy(() => import('./components/Onboarding'));
const Profile = lazy(() => import('./components/Profile'));
const Feed = lazy(() => import('./components/Feed'));
const Messaging = lazy(() => import('./components/Messaging'));

const App = () => {
  return (
    <UserProvider> {/* ✅ Wrap the whole app inside UserProvider */}
      <Router>
        <Navbar /> {/* ✅ Navbar appears on all pages */}
        <div className="container mx-auto p-4">
          <Suspense fallback={<div>Loading...</div>}>
            <Routes>
              <Route path="/" element={<Home />} /> {/* ✅ Home Page */}
              <Route path="/signin" element={<SignIn />} /> {/* ✅ Sign In Page */}
              <Route path="/onboarding" element={<Onboarding />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/feed" element={<Feed />} />
              <Route path="/messages" element={<Messaging />} />
            </Routes>
          </Suspense>
        </div>
      </Router>
    </UserProvider>
  );
};

export default App;
