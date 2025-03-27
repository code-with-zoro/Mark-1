// src/components/Feed.jsx
import React from 'react';

const Feed = ({ posts }) => {
  return (
    <div className="bg-white p-6 rounded shadow-md">
      <h2 className="text-xl font-bold mb-4">Feed</h2>
      {posts.map((post, index) => (
        <div key={index} className="border-b py-4">
          <h3 className="font-semibold">{post.title}</h3>
          <p>{post.content}</p>
        </div>
      ))}
    </div>
  );
};

export default Feed;