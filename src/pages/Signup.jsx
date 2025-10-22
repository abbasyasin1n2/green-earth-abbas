import { useState, useContext, useEffect } from 'react';
import { Link, useNavigate } from 'react-router';
import { AuthContext } from '../context/AuthProvider';
import { toast } from 'react-toastify';
import { FaGoogle, FaEye, FaEyeSlash, FaLeaf, FaCheck, FaTimes } from 'react-icons/fa';
import { Leaf } from 'lucide-react';
import { motion } from 'motion/react';

const Signup = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    photoURL: '',
    password: '',
  });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const { createUser, updateUserProfile, signInWithGoogle, user } = useContext(AuthContext);
  const navigate = useNavigate();

  // Redirect if already logged in
  useEffect(() => {
    if (user) {
      navigate('/');
    }
  }, [user, navigate]);

  // Password validation
  const hasUpperCase = /[A-Z]/.test(formData.password);
  const hasLowerCase = /[a-z]/.test(formData.password);
  const hasMinLength = formData.password.length >= 6;
  const isPasswordValid = hasUpperCase && hasLowerCase && hasMinLength;

  // Handle input changes
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate password
    if (!isPasswordValid) {
      toast.error('Please ensure your password meets all requirements');
      return;
    }

    // Validate photo URL only if provided
    if (formData.photoURL.trim()) {
      try {
        new URL(formData.photoURL);
      } catch {
        toast.error('Please enter a valid photo URL');
        return;
      }
    }

    setLoading(true);

    try {
      // Create user account
      await createUser(formData.email, formData.password);
      
      // Update profile with name and photo (use null if photoURL is empty)
      await updateUserProfile(
        formData.name, 
        formData.photoURL.trim() || null
      );
      
      toast.success('Account created successfully! Welcome to GreenNest');
      navigate('/');
    } catch (error) {
      
      // Handle specific Firebase errors
      switch (error.code) {
        case 'auth/email-already-in-use':
          toast.error('This email is already registered');
          break;
        case 'auth/invalid-email':
          toast.error('Please enter a valid email address');
          break;
        case 'auth/weak-password':
          toast.error('Password should be at least 6 characters');
          break;
        case 'auth/operation-not-allowed':
          toast.error('Operation not allowed. Please contact support');
          break;
        default:
          toast.error('Signup failed. Please try again');
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
      toast.success('Signed up with Google successfully!');
      navigate('/');
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
          <h1 className="text-4xl font-bold text-[#2F5233] mb-2 font-serif">Join GreenNest</h1>
          <p className="text-gray-600">Create your account and start your green journey</p>
        </motion.div>

        {/* Signup Form */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="bg-white rounded-2xl shadow-xl hover:shadow-2xl transition-shadow duration-300 p-8"
        >
          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Name Field */}
            <div className="form-control">
              <label className="label">
                <span className="label-text font-semibold text-gray-700">Full Name</span>
              </label>
              <input
                type="text"
                name="name"
                placeholder="Enter your full name"
                className="input input-bordered w-full bg-gray-50 text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#4A7C59] rounded-lg"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>

            {/* Email Field */}
            <div className="form-control">
              <label className="label">
                <span className="label-text font-semibold text-gray-700">Email</span>
              </label>
              <input
                type="email"
                name="email"
                placeholder="Enter your email"
                className="input input-bordered w-full bg-gray-50 text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#4A7C59] rounded-lg"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>

            {/* Photo URL Field */}
            <div className="form-control">
              <label className="label">
                <span className="label-text font-semibold text-gray-700">
                  Photo URL <span className="text-gray-400 text-sm font-normal">(Optional)</span>
                </span>
              </label>
              <input
                type="url"
                name="photoURL"
                placeholder="https://example.com/photo.jpg (optional)"
                className="input input-bordered w-full bg-gray-50 text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#4A7C59] rounded-lg"
                value={formData.photoURL}
                onChange={handleChange}
              />
              <label className="label">
                <span className="label-text-alt text-gray-500">
                  Leave blank to use a default avatar
                </span>
              </label>
            </div>

            {/* Password Field */}
            <div className="form-control">
              <label className="label">
                <span className="label-text font-semibold text-gray-700">Password</span>
              </label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  name="password"
                  placeholder="Create a password"
                  className="input input-bordered w-full bg-gray-50 text-gray-900 placeholder:text-gray-400 pr-12 focus:outline-none focus:ring-2 focus:ring-[#4A7C59] rounded-lg"
                  value={formData.password}
                  onChange={handleChange}
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

              {/* Password Validation Requirements */}
              {formData.password && (
                <div className="mt-3 space-y-2">
                  <div className="flex items-center gap-2 text-sm">
                    {hasUpperCase ? (
                      <FaCheck className="text-green-600" />
                    ) : (
                      <FaTimes className="text-red-600" />
                    )}
                    <span className={hasUpperCase ? 'text-green-600' : 'text-red-600'}>
                      At least one uppercase letter
                    </span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    {hasLowerCase ? (
                      <FaCheck className="text-green-600" />
                    ) : (
                      <FaTimes className="text-red-600" />
                    )}
                    <span className={hasLowerCase ? 'text-green-600' : 'text-red-600'}>
                      At least one lowercase letter
                    </span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    {hasMinLength ? (
                      <FaCheck className="text-green-600" />
                    ) : (
                      <FaTimes className="text-red-600" />
                    )}
                    <span className={hasMinLength ? 'text-green-600' : 'text-red-600'}>
                      Minimum 6 characters
                    </span>
                  </div>
                </div>
              )}
            </div>

            {/* Register Button */}
            <motion.button
              type="submit"
              disabled={loading || !isPasswordValid}
              whileHover={{ scale: (loading || !isPasswordValid) ? 1 : 1.02 }}
              whileTap={{ scale: (loading || !isPasswordValid) ? 1 : 0.98 }}
              className="btn w-full bg-[#4A7C59] hover:bg-[#2F5233] text-white border-none disabled:bg-gray-400 normal-case text-base rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
            >
              {loading ? (
                <>
                  <span className="loading loading-spinner loading-sm"></span>
                  Creating account...
                </>
              ) : (
                <span className="inline-flex items-center gap-2">
                  <Leaf size={18} /> Create Account
                </span>
              )}
            </motion.button>
          </form>

          {/* Divider */}
          <div className="divider my-6">OR</div>

          {/* Google Sign-Up Button */}
          <motion.button
            onClick={handleGoogleSignIn}
            disabled={loading}
            whileHover={{ scale: loading ? 1 : 1.02 }}
            whileTap={{ scale: loading ? 1 : 0.98 }}
            className="btn w-full bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-semibold border-none normal-case text-base flex items-center justify-center gap-3 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
          >
            <FaGoogle size={20} />
            <span>Sign up with Google</span>
          </motion.button>

          {/* Login Link */}
          <p className="text-center mt-6 text-gray-600">
            Already have an account?{' '}
            <Link to="/login" className="text-[#4A7C59] hover:text-[#2F5233] font-semibold transition-colors">
              Login here
            </Link>
          </p>
        </motion.div>
      </div>
    </div>
  );
};

export default Signup;
