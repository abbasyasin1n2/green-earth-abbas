import { Link } from 'react-router';
import { FaLeaf } from 'react-icons/fa';

const ErrorPage = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-white to-green-50 px-4">
      <div className="text-center max-w-md">
        <FaLeaf className="text-6xl text-[#2F5233] mb-6 mx-auto animate-pulse" />
        <h1 className="text-7xl font-bold text-[#2F5233] font-serif mb-4">404</h1>
        <p className="text-2xl font-semibold text-gray-700 mb-3">Oops! This page seems to have wandered off...</p>
        <p className="text-gray-600 mb-8">The page you're looking for doesn't exist. Let's get you back home!</p>
        <Link 
          to="/" 
          className="btn bg-[#4A7C59] hover:bg-[#2F5233] text-white border-none rounded-lg normal-case text-lg px-8"
        >
          🏠 Go Back Home
        </Link>
      </div>
    </div>
  );
};

export default ErrorPage;

