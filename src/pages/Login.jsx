import { useState, useContext, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router';
import { AuthContext } from '../context/AuthProvider';
import { toast } from 'react-toastify';
import { FaGoogle, FaEye, FaEyeSlash, FaLeaf } from 'react-icons/fa';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [showForgotModal, setShowForgotModal] = useState(false);
  const [forgotEmail, setForgotEmail] = useState('');

  const { signIn, signInWithGoogle, resetPassword, user } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();

  // Redirect if already logged in
  useEffect(() => {
    if (user) {
      navigate('/');
    }
  }, [user, navigate]);

  const from = location.state?.from?.pathname || '/';

  // Handle email/password login
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await signIn(email, password);
      toast.success('Login successful! Welcome back 🌿');
      navigate(from, { replace: true });
    } catch (error) {
      console.error('Login error:', error);
      
      // Handle specific Firebase errors
      switch (error.code) {
        case 'auth/invalid-email':
          toast.error('Please enter a valid email address');
          break;
        case 'auth/user-disabled':
          toast.error('This account has been disabled');
          break;
        case 'auth/user-not-found':
          toast.error('No account found with this email');
          break;
        case 'auth/wrong-password':
          toast.error('Incorrect password. Please try again');
          break;
        case 'auth/invalid-credential':
          toast.error('Invalid email or password');
          break;
        default:
          toast.error('Login failed. Please try again');
      }
    } finally {
      setLoading(false);
    }
  };

  // Handle Google Sign-In
  const handleGoogleSignIn = async () => {
    setLoading(true);

    try {
      await signInWithGoogle();
      toast.success('Logged in with Google successfully! 🌿');
      navigate(from, { replace: true });
    } catch (error) {
      console.error('Google sign-in error:', error);
      
      if (error.code === 'auth/popup-closed-by-user') {
        toast.error('Sign-in popup was closed');
      } else {
        toast.error('Google sign-in failed. Please try again');
      }
    } finally {
      setLoading(false);
    }
  };

  // Handle Forgot Password
  const handleForgotPassword = async (e) => {
    e.preventDefault();

    if (!forgotEmail) {
      toast.error('Please enter your email address');
      return;
    }

    try {
      await resetPassword(forgotEmail);
      toast.success('Password reset email sent! Check your inbox 📧');
      setShowForgotModal(false);
      setForgotEmail('');
    } catch (error) {
      console.error('Reset password error:', error);
      
      switch (error.code) {
        case 'auth/invalid-email':
          toast.error('Please enter a valid email address');
          break;
        case 'auth/user-not-found':
          toast.error('No account found with this email');
          break;
        default:
          toast.error('Failed to send reset email. Please try again');
      }
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-12 bg-[#F5F1E8]">
      <div className="max-w-md w-full">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex justify-center mb-4">
            <FaLeaf className="text-6xl text-[#4A7C59]" />
          </div>
          <h1 className="text-4xl font-bold text-[#2F5233] mb-2">Welcome Back!</h1>
          <p className="text-gray-600">Login to continue your green journey</p>
        </div>

        {/* Login Form */}
        <div className="bg-white rounded-2xl shadow-xl p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Email Field */}
            <div className="form-control">
              <label className="label">
                <span className="label-text font-semibold text-gray-700">Email</span>
              </label>
              <input
                type="email"
                placeholder="Enter your email"
                className="input input-bordered w-full focus:outline-none focus:ring-2 focus:ring-[#4A7C59]"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            {/* Password Field */}
            <div className="form-control">
              <label className="label">
                <span className="label-text font-semibold text-gray-700">Password</span>
              </label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Enter your password"
                  className="input input-bordered w-full pr-12 focus:outline-none focus:ring-2 focus:ring-[#4A7C59]"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                <button
                  type="button"
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <FaEyeSlash size={20} /> : <FaEye size={20} />}
                </button>
              </div>
            </div>

            {/* Forgot Password Link */}
            <div className="text-right">
              <button
                type="button"
                onClick={() => setShowForgotModal(true)}
                className="text-sm text-[#4A7C59] hover:text-[#2F5233] font-medium"
              >
                Forgot Password?
              </button>
            </div>

            {/* Login Button */}
            <button
              type="submit"
              disabled={loading}
              className="btn w-full bg-[#4A7C59] hover:bg-[#2F5233] text-white border-none"
            >
              {loading ? (
                <>
                  <span className="loading loading-spinner"></span>
                  Logging in...
                </>
              ) : (
                'Login'
              )}
            </button>
          </form>

          {/* Divider */}
          <div className="divider my-6">OR</div>

          {/* Google Sign-In Button */}
          <button
            onClick={handleGoogleSignIn}
            disabled={loading}
            className="btn w-full bg-white hover:bg-gray-50 text-gray-700 border-2 border-gray-300"
          >
            <FaGoogle className="text-red-500" size={20} />
            Sign in with Google
          </button>

          {/* Signup Link */}
          <p className="text-center mt-6 text-gray-600">
            Don't have an account?{' '}
            <Link to="/signup" className="text-[#4A7C59] hover:text-[#2F5233] font-semibold">
              Register here
            </Link>
          </p>
        </div>
      </div>

      {/* Forgot Password Modal */}
      {showForgotModal && (
        <div className="modal modal-open">
          <div className="modal-box">
            <h3 className="font-bold text-lg text-[#2F5233] mb-4">Reset Password</h3>
            <form onSubmit={handleForgotPassword}>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Enter your email address</span>
                </label>
                <input
                  type="email"
                  placeholder="your@email.com"
                  className="input input-bordered w-full focus:outline-none focus:ring-2 focus:ring-[#4A7C59]"
                  value={forgotEmail}
                  onChange={(e) => setForgotEmail(e.target.value)}
                  required
                />
              </div>
              <div className="modal-action">
                <button
                  type="button"
                  onClick={() => {
                    setShowForgotModal(false);
                    setForgotEmail('');
                  }}
                  className="btn"
                >
                  Cancel
                </button>
                <button type="submit" className="btn bg-[#4A7C59] hover:bg-[#2F5233] text-white border-none">
                  Send Reset Email
                </button>
              </div>
            </form>
          </div>
          <div className="modal-backdrop" onClick={() => setShowForgotModal(false)}></div>
        </div>
      )}
    </div>
  );
};

export default Login;
