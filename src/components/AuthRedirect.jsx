import { Link } from 'react-router-dom';
import { useUser } from '../context/UserContext';

export default function AuthRedirect() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="bg-white p-8 rounded-xl shadow-md text-center max-w-md">
        <h2 className="text-2xl font-bold mb-4 text-gray-800">Please Sign In</h2>
        <p className="mb-6 text-gray-600">
          You need to be signed in to access this page.
        </p>
        <Link
          to="/signin"
          className="inline-block bg-green-600 hover:bg-green-700 text-white font-medium py-2 px-6 rounded-lg transition-colors"
        >
          Go to Sign In
        </Link>
      </div>
    </div>
  );
}