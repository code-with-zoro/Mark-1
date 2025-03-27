import { useState } from 'react';
import { useUser } from '../context/UserContext';

export default function PostCard({ post, onLike, currentUser }) {
  const [isCommenting, setIsCommenting] = useState(false);
  const [comment, setComment] = useState('');
  const [localLikes, setLocalLikes] = useState(post.likes);
  const [isLocalLiked, setIsLocalLiked] = useState(false);

  const handleLike = () => {
    const newLikeStatus = !isLocalLiked;
    setIsLocalLiked(newLikeStatus);
    setLocalLikes(prev => newLikeStatus ? prev + 1 : prev - 1);
    if (onLike) onLike(post.id);
  };

  const handleCommentSubmit = (e) => {
    e.preventDefault();
    if (comment.trim()) {
      // In a real app, this would call an API
      console.log(`Comment submitted: ${comment}`);
      setComment('');
      setIsCommenting(false);
    }
  };

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  return (
    <div className="bg-white rounded-xl shadow-sm p-6 mb-6 transition-all hover:shadow-md">
      {/* Post Header */}
      <div className="flex items-center space-x-3 mb-4">
        <img 
          src={post.user.avatar} 
          className="w-10 h-10 rounded-full object-cover"
          alt={post.user.name}
        />
        <div>
          <h4 className="font-semibold">{post.user.name}</h4>
          <p className="text-gray-500 text-sm">
            {post.domain} • {formatDate(post.createdAt)}
            {post.domain === currentUser?.domain && (
              <span className="ml-2 px-2 py-0.5 bg-green-100 text-green-800 text-xs rounded-full">
                Same Domain
              </span>
            )}
          </p>
        </div>
      </div>

      {/* Post Content */}
      <p className="text-gray-800 mb-4 whitespace-pre-line">{post.content}</p>
      
      {/* Post Actions */}
      <div className="flex space-x-4 text-gray-500 border-t border-gray-100 pt-3">
        <button 
          onClick={handleLike}
          className={`flex items-center space-x-1 transition-colors ${
            isLocalLiked ? "text-red-500" : "hover:text-red-400"
          }`}
        >
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            className="h-5 w-5" 
            fill={isLocalLiked ? "currentColor" : "none"} 
            viewBox="0 0 24 24" 
            stroke="currentColor"
          >
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth={isLocalLiked ? 0 : 2} 
              d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" 
            />
          </svg>
          <span>{localLikes}</span>
        </button>

        <button 
          onClick={() => setIsCommenting(!isCommenting)}
          className={`flex items-center space-x-1 transition-colors hover:text-blue-400`}
        >
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            className="h-5 w-5" 
            fill="none" 
            viewBox="0 0 24 24" 
            stroke="currentColor"
          >
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth={2} 
              d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" 
            />
          </svg>
          <span>{post.comments}</span>
        </button>
      </div>

      {/* Comment Input (conditional) */}
      {isCommenting && (
        <form onSubmit={handleCommentSubmit} className="mt-4">
          <div className="flex space-x-2">
            <input
              type="text"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder="Write a comment..."
              className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              autoFocus
            />
            <button 
              type="submit"
              className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
            >
              Post
            </button>
          </div>
        </form>
      )}
    </div>
  );
}