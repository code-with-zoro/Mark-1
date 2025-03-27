import { useState } from 'react';
import PostCard from './PostCard'; // Reuse your component

const Profile = () => {
  const [activeTab, setActiveTab] = useState('posts');
  const [isFollowing, setIsFollowing] = useState(false);

  // Mock data - no backend needed
  const mockUser = {
    name: "Alex Johnson",
    domain: "Computer Science",
    bio: "Final year CSE student | AI Enthusiast | Open Source Contributor",
    avatar: "https://i.pravatar.cc/150?img=3",
    stats: {
      posts: 24,
      connections: 142,
      distance: "3km away"
    }
  };

  const mockPosts = [
    {
      _id: "1",
      content: "Just built a neural network from scratch! 🚀 #MachineLearning",
      likes: 15,
      comments: 4,
      createdAt: "2023-10-05T14:30:00Z"
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Cover Photo */}
      <div className="h-48 bg-gradient-to-r from-blue-500 to-green-600"></div>

      {/* Profile Header */}
      <div className="px-4 md:px-6 max-w-4xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end gap-6 -mt-16">
          <img 
            src={mockUser.avatar} 
            alt="Profile"
            className="w-32 h-32 rounded-full border-4 border-white shadow-lg"
          />
          
          <div className="space-y-2">
            <h1 className="text-3xl font-bold">{mockUser.name}</h1>
            <p className="text-gray-600">{mockUser.domain} • {mockUser.stats.distance}</p>
            <p className="text-gray-800">{mockUser.bio}</p>
            
            <button 
              onClick={() => setIsFollowing(!isFollowing)}
              className={`px-6 py-2 rounded-full font-medium mt-4 ${
                isFollowing 
                  ? "bg-gray-200 text-gray-800" 
                  : "bg-green-600 text-white"
              }`}
            >
              {isFollowing ? "Following" : "Follow"}
            </button>
          </div>
        </div>

        {/* Stats */}
        <div className="flex gap-8 my-6 text-center">
          <div>
            <p className="text-2xl font-bold">{mockUser.stats.posts}</p>
            <p className="text-gray-600">Posts</p>
          </div>
          <div>
            <p className="text-2xl font-bold">{mockUser.stats.connections}</p>
            <p className="text-gray-600">Connections</p>
          </div>
        </div>

        {/* Tabs */}
        <div className="border-b flex">
          <button
            onClick={() => setActiveTab('posts')}
            className={`px-6 py-3 font-medium ${
              activeTab === 'posts' 
                ? "text-green-600 border-b-2 border-green-600" 
                : "text-gray-500"
            }`}
          >
            Posts
          </button>
          <button
            onClick={() => setActiveTab('connections')}
            className={`px-6 py-3 font-medium ${
              activeTab === 'connections' 
                ? "text-green-600 border-b-2 border-green-600" 
                : "text-gray-500"
            }`}
          >
            Connections
          </button>
        </div>

        {/* Tab Content */}
        <div className="py-6">
          {activeTab === 'posts' ? (
            <div className="space-y-6">
              {mockPosts.map(post => (
                <PostCard 
                  key={post._id} 
                  post={{ ...post, user: mockUser }} // Attach mock user data
                />
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="bg-white p-4 rounded-lg shadow text-center">
                  <img 
                    src={`https://i.pravatar.cc/80?img=${i+10}`} 
                    className="w-16 h-16 rounded-full mx-auto mb-2"
                  />
                  <p className="font-medium">User {i+1}</p>
                  <p className="text-sm text-gray-600">CSE</p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;