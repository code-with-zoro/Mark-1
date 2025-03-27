// src/App.jsx
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Onboarding from './components/Onboarding';
import Profile from './components/Profile';
import Feed from './components/Feed';
import Messaging from './components/Messaging';

const App = () => {
  return (
    <Router>
      <div className="container mx-auto p-4">
        <Routes>
          <Route path="/" element={<Onboarding />} />
          <Route path="/profile" element={<Profile user={{ name: "John Doe", domain: "CSE" }} />} />
          <Route path="/feed" element={<Feed posts={[{ title: "Hello World", content: "This is my first post!" }]} />} />
          <Route path="/messages" element={<Messaging />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;