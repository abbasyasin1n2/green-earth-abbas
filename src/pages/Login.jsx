import { useState, useContext, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router';
import { AuthContext } from '../context/AuthProvider';
import { toast } from 'react-toastify';
import { FaGoogle, FaEye, FaEyeSlash, FaLeaf } from 'react-icons/fa';
import { Leaf } from 'lucide-react';
import { motion } from 'motion/react';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const { signIn, signInWithGoogle, user } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (user) {
      navigate('/');
    }
  }, [user, navigate]);

  const from = location.state?.from?.pathname || '/';

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await signIn(email, password);
      toast.success('Login successful! Welcome back');
      navigate(from, { replace: true });
    } catch (error) {
      
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
      toast.success('Logged in with Google successfully!');
      navigate(from, { replace: true });
    } catch (error) {
      
      if (error.code === 'auth/popup-closed-by-user') {
        toast.error('Sign-in popup was closed');
      } else {
        toast.error('Google sign-in failed. Please try again');
      }
    } finally {
      setLoading(false);
    }
  };


  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-12 bg-[#F5F1E8] relative overflow-hidden">
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-20 left-20 w-72 h-72 bg-[#4A7C59] rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-[#8B9D83] rounded-full blur-3xl"></div>
      </div>
      
      <div className="max-w-md w-full relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-8"
        >
          <motion.div
            className="flex justify-center mb-4"
            animate={{ rotate: [0, 360] }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          >
            <FaLeaf className="text-6xl text-[#4A7C59]" />
          </motion.div>
          <h1 className="text-4xl font-bold text-[#2F5233] mb-2 font-serif">Welcome Back!</h1>
          <p className="text-gray-600">Login to continue your green journey</p>
        </motion.div>

        {/* Login Form */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="bg-white rounded-2xl shadow-xl hover:shadow-2xl transition-shadow duration-300 p-8"
        >
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Email Field */}
            <div className="form-control">
              <label className="label">
                <span className="label-text font-semibold text-gray-700">Email</span>
              </label>
              <input
                type="email"
                placeholder="Enter your email"
                className="input input-bordered w-full bg-gray-50 text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#4A7C59] rounded-lg"
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
                  className="input input-bordered w-full bg-gray-50 text-gray-900 placeholder:text-gray-400 pr-12 focus:outline-none focus:ring-2 focus:ring-[#4A7C59] rounded-lg"
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
              <Link
                to="/forgot-password"
                className="text-sm text-[#4A7C59] hover:text-[#2F5233] font-medium"
              >
                Forgot Password?
              </Link>
            </div>

            {/* Login Button */}
            <motion.button
              type="submit"
              disabled={loading}
              whileHover={{ scale: loading ? 1 : 1.02 }}
              whileTap={{ scale: loading ? 1 : 0.98 }}
              className="btn w-full bg-[#4A7C59] hover:bg-[#2F5233] text-white border-none normal-case text-base rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
            >
              {loading ? (
                <>
                  <span className="loading loading-spinner loading-sm"></span>
                  Logging in...
                </>
              ) : (
                <span className="inline-flex items-center gap-2">
                  <Leaf size={18} /> Login
                </span>
              )}
            </motion.button>
          </form>

          {/* Divider */}
          <div className="divider my-6">OR</div>

          {/* Google Sign-In Button */}
          <motion.button
            onClick={handleGoogleSignIn}
            disabled={loading}
            whileHover={{ scale: loading ? 1 : 1.02 }}
            whileTap={{ scale: loading ? 1 : 0.98 }}
            className="btn w-full bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-semibold border-none normal-case text-base flex items-center justify-center gap-3 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
          >
            <FaGoogle size={20} />
            <span>Sign in with Google</span>
          </motion.button>

          {/* Signup Link */}
          <p className="text-center mt-6 text-gray-600">
            Don't have an account?{' '}
            <Link to="/signup" className="text-[#4A7C59] hover:text-[#2F5233] font-semibold transition-colors">
              Register here
            </Link>
          </p>
        </motion.div>
      </div>
    </div>
  );
};

export default Login;
