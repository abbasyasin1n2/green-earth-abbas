import { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router';
import { AuthContext } from '../context/AuthProvider';
import { toast } from 'react-toastify';
import { FaLeaf, FaArrowLeft } from 'react-icons/fa';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const { resetPassword } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email) {
      toast.error('Please enter your email address');
      return;
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      toast.error('Please enter a valid email address');
      return;
    }

    setLoading(true);

    try {
      await resetPassword(email);
      toast.success('Password reset email sent! Check your inbox 📧');
      setEmail('');
      
      // Redirect to login after 2 seconds
      setTimeout(() => {
        navigate('/login');
      }, 2000);
    } catch (error) {
      console.error('Password reset error:', error);
      
      switch (error.code) {
        case 'auth/user-not-found':
          toast.error('No account found with this email address');
          break;
        case 'auth/invalid-email':
          toast.error('Please enter a valid email address');
          break;
        case 'auth/too-many-requests':
          toast.error('Too many requests. Please try again later');
          break;
        default:
          toast.error('Failed to send reset email. Please try again');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-50 to-green-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full">
        {/* Header */}
        <div className="text-center mb-8">
          <Link to="/" className="inline-flex items-center justify-center gap-2 mb-6">
            <FaLeaf className="text-4xl text-[#4A7C59]" />
            <h1 className="text-3xl font-bold text-[#2F5233] font-serif">GreenNest</h1>
          </Link>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Reset Your Password</h2>
          <p className="text-gray-600">
            Enter your email address and we'll send you a link to reset your password
          </p>
        </div>

        {/* Forgot Password Form Card */}
        <div className="bg-white rounded-xl shadow-2xl p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Email Field */}
            <div className="form-control">
              <label className="label">
                <span className="label-text font-semibold text-gray-700">Email Address</span>
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                className="input input-bordered w-full bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#4A7C59] focus:border-[#4A7C59]"
                required
                disabled={loading}
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="btn bg-[#4A7C59] hover:bg-[#2F5233] text-white w-full border-none"
            >
              {loading ? (
                <>
                  <span className="loading loading-spinner"></span>
                  Sending...
                </>
              ) : (
                'Send Reset Link'
              )}
            </button>
          </form>

          {/* Divider */}
          <div className="divider my-6">OR</div>

          {/* Back to Login */}
          <div className="text-center">
            <Link
              to="/login"
              className="btn btn-outline border-[#4A7C59] text-[#4A7C59] hover:bg-[#4A7C59] hover:text-white w-full"
            >
              <FaArrowLeft />
              Back to Login
            </Link>
          </div>
        </div>

        {/* Sign Up Link */}
        <p className="text-center text-gray-600 mt-6">
          Don't have an account?{' '}
          <Link to="/signup" className="text-[#4A7C59] hover:text-[#2F5233] font-semibold">
            Sign Up
          </Link>
        </p>
      </div>
    </div>
  );
};

export default ForgotPassword;

