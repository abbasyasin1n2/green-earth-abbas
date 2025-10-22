import { Link } from 'react-router';
import { FaLeaf } from 'react-icons/fa';

const ErrorPage = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#F5F1E8]">
      <FaLeaf className="text-6xl text-[#2F5233] mb-4" />
      <h1 className="text-6xl font-bold text-[#2F5233]">404</h1>
      <p className="text-xl mt-4 text-gray-700">Oops! This page seems to have wandered off...</p>
      <p className="text-gray-600 mt-2">The page you're looking for doesn't exist.</p>
      <Link to="/" className="btn btn-primary mt-6 bg-[#4A7C59] border-none hover:bg-[#2F5233]">
        🏠 Go Back Home
      </Link>
    </div>
  );
};

export default ErrorPage;

