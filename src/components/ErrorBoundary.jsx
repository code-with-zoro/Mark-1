import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function ErrorBoundary({ children }) {
  const [hasError, setHasError] = useState(false);
  const navigate = useNavigate();

  const handleReset = () => {
    setHasError(false);
    navigate('/');
  };

  if (hasError) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
        <div className="bg-white p-8 rounded-xl shadow-md text-center max-w-md">
          <h2 className="text-2xl font-bold mb-4 text-red-600">Something Went Wrong</h2>
          <p className="mb-6 text-gray-600">
            The app encountered an unexpected error. Please try again.
          </p>
          <button
            onClick={handleReset}
            className="bg-green-600 hover:bg-green-700 text-white font-medium py-2 px-6 rounded-lg transition-colors"
          >
            Return Home
          </button>
        </div>
      </div>
    );
  }

  return children;
}