import { useState, useContext, useEffect } from 'react';
import { AuthContext } from '../context/AuthProvider';
import { FaUser, FaEnvelope, FaCamera, FaEdit, FaSave, FaTimes } from 'react-icons/fa';
import { Sparkles, Check } from 'lucide-react';
import { toast } from 'react-toastify';
import { motion, AnimatePresence } from 'motion/react';

const MyProfile = () => {
  const { user, updateUserProfile } = useContext(AuthContext);
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    displayName: '',
    photoURL: ''
  });

  useEffect(() => {
    if (user) {
      setFormData({
        displayName: user.displayName || '',
        photoURL: user.photoURL || ''
      });
    }
  }, [user]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validation
    if (!formData.displayName.trim()) {
      toast.error('Display name cannot be empty!');
      return;
    }

    if (formData.displayName.trim().length < 3) {
      toast.error('Display name must be at least 3 characters long!');
      return;
    }

    if (formData.photoURL && !isValidURL(formData.photoURL)) {
      toast.error('Please enter a valid photo URL!');
      return;
    }

    setLoading(true);

    try {
      await updateUserProfile(formData.displayName.trim(), formData.photoURL.trim() || null);
      toast.success('Profile updated successfully!');
      setIsEditing(false);
    } catch (error) {
      toast.error('Failed to update profile. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const isValidURL = (string) => {
    try {
      new URL(string);
      return true;
    } catch (_) {
      return false;
    }
  };

  const handleCancel = () => {
    setFormData({
      displayName: user?.displayName || '',
      photoURL: user?.photoURL || ''
    });
    setIsEditing(false);
  };

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <span className="loading loading-spinner loading-lg text-[#4A7C59]"></span>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-green-50 py-12 relative overflow-hidden">
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-20 left-20 w-72 h-72 bg-[#4A7C59] rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-[#8B9D83] rounded-full blur-3xl"></div>
      </div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h1 className="text-4xl md:text-5xl font-bold text-[#2F5233] font-serif mb-4">
              My Profile
            </h1>
            <p className="text-gray-600">Manage your account information</p>
          </motion.div>

          {/* Profile Card */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="card bg-white shadow-2xl hover:shadow-3xl transition-shadow duration-300"
          >
            <div className="card-body">
              {/* Profile Header with Avatar */}
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="flex flex-col items-center mb-8 pt-6"
              >
                <motion.div
                  className="avatar mb-4"
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="w-32 h-32 rounded-full ring-4 ring-[#4A7C59] ring-offset-4 overflow-hidden bg-white hover:ring-6 transition-all duration-300 cursor-pointer">
                    <img
                      src={user.photoURL || 'https://via.placeholder.com/150?text=User'}
                      alt={user.displayName || 'User'}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        e.target.src = 'https://via.placeholder.com/150?text=User';
                      }}
                    />
                  </div>
                </motion.div>
                <h2 className="text-3xl font-bold text-[#2F5233] font-serif">
                  {user.displayName || 'Plant Lover'}
                </h2>
                <p className="text-gray-500 text-sm">{user.email}</p>
              </motion.div>

              {/* Edit/View Mode Toggle */}
              <div className="flex justify-end mb-6">
                <AnimatePresence mode="wait">
                  {!isEditing ? (
                    <motion.button
                      key="edit-button"
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.9 }}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => setIsEditing(true)}
                      className="btn bg-[#4A7C59] hover:bg-[#2F5233] text-white rounded-xl normal-case inline-flex items-center gap-2 shadow-lg hover:shadow-xl transition-all duration-300 border-none"
                    >
                      <FaEdit /> Edit Profile
                    </motion.button>
                  ) : (
                    <motion.button
                      key="cancel-button"
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.9 }}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={handleCancel}
                      className="btn btn-outline border-gray-400 text-gray-600 hover:bg-gray-100 rounded-lg normal-case inline-flex items-center gap-2"
                    >
                      <FaTimes /> Cancel
                    </motion.button>
                  )}
                </AnimatePresence>
              </div>

              {/* Profile Information */}
              <AnimatePresence mode="wait">
                {!isEditing ? (
                  <motion.div
                    key="view-mode"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20 }}
                    transition={{ duration: 0.3 }}
                    className="space-y-4"
                  >
                  {/* Display Name */}
                  <div className="flex items-start gap-4 p-5 bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl border border-green-100 shadow-sm">
                    <FaUser className="text-[#4A7C59] text-xl mt-1" />
                    <div className="flex-1">
                      <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1">Display Name</p>
                      <p className="text-lg font-bold text-[#2F5233]">
                        {user.displayName || 'Not set'}
                      </p>
                    </div>
                  </div>

                  {/* Email */}
                  <div className="flex items-start gap-4 p-5 bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl border border-green-100 shadow-sm">
                    <FaEnvelope className="text-[#4A7C59] text-xl mt-1" />
                    <div className="flex-1">
                      <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1">Email Address</p>
                      <p className="text-lg font-bold text-[#2F5233] break-all">
                        {user.email}
                      </p>
                      <p className="text-xs text-gray-400 mt-2 italic">Email cannot be changed</p>
                    </div>
                  </div>

                  {/* Photo URL */}
                  <div className="flex items-start gap-4 p-5 bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl border border-green-100 shadow-sm">
                    <FaCamera className="text-[#4A7C59] text-xl mt-1" />
                    <div className="flex-1">
                      <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1">Profile Photo URL</p>
                      <p className="text-sm text-[#2F5233] break-all leading-relaxed">
                        {user.photoURL || 'Using default avatar'}
                      </p>
                    </div>
                  </div>
                </motion.div>
              ) : (
                <motion.form
                  key="edit-mode"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3 }}
                  onSubmit={handleSubmit}
                  className="space-y-6"
                >
                  {/* Display Name Input */}
                  <div className="form-control">
                    <label className="label">
                      <span className="label-text font-medium flex items-center gap-2">
                        <FaUser className="text-[#4A7C59]" />
                        Display Name *
                      </span>
                    </label>
                    <input
                      type="text"
                      name="displayName"
                      value={formData.displayName}
                      onChange={handleInputChange}
                      placeholder="Enter your display name"
                      className="input input-bordered bg-gray-50 text-gray-900 placeholder:text-gray-400 focus:outline-none focus:border-[#4A7C59] focus:ring-2 focus:ring-[#4A7C59] rounded-lg"
                      required
                      minLength={3}
                    />
                    <label className="label">
                      <span className="label-text-alt text-gray-500">
                        Minimum 3 characters required
                      </span>
                    </label>
                  </div>

                  {/* Photo URL Input */}
                  <div className="form-control">
                    <label className="label">
                      <span className="label-text font-medium flex items-center gap-2">
                        <FaCamera className="text-[#4A7C59]" />
                        Profile Photo URL
                      </span>
                    </label>
                    <input
                      type="url"
                      name="photoURL"
                      value={formData.photoURL}
                      onChange={handleInputChange}
                      placeholder="https://example.com/your-photo.jpg"
                      className="input input-bordered bg-gray-50 text-gray-900 placeholder:text-gray-400 focus:outline-none focus:border-[#4A7C59] focus:ring-2 focus:ring-[#4A7C59] rounded-lg"
                    />
                    <label className="label">
                      <span className="label-text-alt text-gray-500">
                        Enter a valid image URL or leave blank for default
                      </span>
                    </label>
                  </div>

                  {/* Email (Read-only) */}
                  <div className="form-control">
                    <label className="label">
                      <span className="label-text font-medium flex items-center gap-2">
                        <FaEnvelope className="text-[#4A7C59]" />
                        Email Address
                      </span>
                    </label>
                    <input
                      type="email"
                      value={user.email}
                      disabled
                      className="input input-bordered bg-gray-100 cursor-not-allowed rounded-lg"
                    />
                    <label className="label">
                      <span className="label-text-alt text-gray-500">
                        Email cannot be changed
                      </span>
                    </label>
                  </div>

                  {/* Submit Button */}
                  <div className="flex justify-end gap-4 pt-4">
                    <motion.button
                      type="button"
                      onClick={handleCancel}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="btn btn-outline rounded-xl normal-case border-2"
                      disabled={loading}
                    >
                      Cancel
                    </motion.button>
                    <motion.button
                      type="submit"
                      whileHover={{ scale: loading ? 1 : 1.05 }}
                      whileTap={{ scale: loading ? 1 : 0.95 }}
                      className="btn bg-[#4A7C59] hover:bg-[#2F5233] text-white rounded-xl normal-case shadow-lg hover:shadow-xl transition-all duration-300 border-none"
                      disabled={loading}
                    >
                      {loading ? (
                        <>
                          <span className="loading loading-spinner loading-sm"></span>
                          Updating...
                        </>
                      ) : (
                        <>
                          <FaSave /> Save Changes
                        </>
                      )}
                    </motion.button>
                  </div>
                </motion.form>
              )}
              </AnimatePresence>
            </div>
          </motion.div>

          {/* Additional Info Card */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="card bg-white shadow-md hover:shadow-xl transition-shadow duration-300 mt-8"
          >
            <div className="card-body">
              <h3 className="card-title text-[#2F5233] font-serif">Account Information</h3>
              <div className="divider"></div>
              <div className="space-y-4 text-sm">
                <div className="flex justify-between items-center py-3 border-b border-gray-100">
                  <span className="text-gray-600 font-medium">Account Status:</span>
                  <span className="badge bg-emerald-500 text-white border-none shadow-sm inline-flex items-center gap-1">
                    <Check size={14} /> Active
                  </span>
                </div>
                <div className="flex justify-between items-center py-3 border-b border-gray-100">
                  <span className="text-gray-600 font-medium">Member Since:</span>
                  <span className="font-semibold text-[#2F5233]">
                    {user.metadata?.creationTime
                      ? new Date(user.metadata.creationTime).toLocaleDateString('en-US', {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric'
                        })
                      : 'N/A'}
                  </span>
                </div>
                <div className="flex justify-between items-center py-3">
                  <span className="text-gray-600 font-medium">Last Sign In:</span>
                  <span className="font-semibold text-[#2F5233]">
                    {user.metadata?.lastSignInTime
                      ? new Date(user.metadata.lastSignInTime).toLocaleDateString('en-US', {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric'
                        })
                      : 'N/A'}
                  </span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default MyProfile;
