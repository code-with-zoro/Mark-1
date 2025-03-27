import { useState, useEffect } from 'react';
import { useUser } from '../context/UserContext';
import PostCard from './PostCard';

// Mock post generator
const generateMockPosts = (count, userDomain) => {
  const domains = ["Computer Science", "Commerce", "Electronics"];
  const mockUsers = [
    { name: "Priya K.", avatar: "https://i.pravatar.cc/150?img=5", domain: "Computer Science" },
    { name: "Rahul M.", avatar: "https://i.pravatar.cc/150?img=7", domain: "Commerce" },
    { name: "Alex T.", avatar: "https://i.pravatar.cc/150?img=9", domain: "Electronics" }
  ];

  return Array.from({ length: count }, (_, i) => {
    const randomUser = mockUsers[i % mockUsers.length];
    const isSameDomain = randomUser.domain === userDomain;
    
    return {
      id: `post-${i}`,
      content: isSameDomain 
        ? `Hey fellow ${userDomain} students! Check this out (#${i+1})` 
        : `Interesting perspective from ${randomUser.domain} (#${i+1})`,
      user: randomUser,
      likes: Math.floor(Math.random() * 50),
      comments: Math.floor(Math.random() * 10),
      createdAt: new Date(Date.now() - Math.random() * 7 * 24 * 60 * 60 * 1000).toISOString(),
      isLiked: false,
      domain: randomUser.domain
    };
  });
};

const Feed = () => {
  const { user } = useUser();
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all'); // 'all' or 'domain'

  useEffect(() => {
    // Simulate API fetch delay
    const timer = setTimeout(() => {
      if (user?.domain) {
        const mockPosts = generateMockPosts(12, user.domain);
        setPosts(mockPosts);
        setLoading(false);
      }
    }, 800);

    return () => clearTimeout(timer);
  }, [user?.domain, filter]);

  const handleLike = (postId) => {
    setPosts(prev => prev.map(post => 
      post.id === postId 
        ? { 
            ...post, 
            likes: post.isLiked ? post.likes - 1 : post.likes + 1,
            isLiked: !post.isLiked 
          } 
        : post
    ));
  };

  const filteredPosts = filter === 'domain' && user?.domain
    ? posts.filter(post => post.domain === user.domain)
    : posts;

  if (loading) {
    return (
      <div className="flex justify-center py-20">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-500"></div>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">
          {filter === 'domain' ? 'Your Domain Feed' : 'Global Feed'}
        </h1>
        {user?.domain && (
          <div className="flex space-x-2">
            <button
              onClick={() => setFilter('all')}
              className={`px-4 py-2 rounded-full text-sm ${
                filter === 'all' 
                  ? 'bg-green-100 text-green-800' 
                  : 'bg-gray-100 hover:bg-gray-200'
              }`}
            >
              All
            </button>
            <button
              onClick={() => setFilter('domain')}
              className={`px-4 py-2 rounded-full text-sm ${
                filter === 'domain' 
                  ? 'bg-green-100 text-green-800' 
                  : 'bg-gray-100 hover:bg-gray-200'
              }`}
            >
              {user.domain}
            </button>
          </div>
        )}
      </div>

      <div className="space-y-6">
        {filteredPosts.length > 0 ? (
          filteredPosts.map(post => (
            <PostCard
              key={post.id}
              post={post}
              onLike={() => handleLike(post.id)}
              currentUser={user}
            />
          ))
        ) : (
          <div className="text-center py-10 text-gray-500">
            No posts found. Start a conversation!
          </div>
        )}
      </div>
    </div>
  );
};

export default Feed;