import { useState, useContext, useEffect } from 'react';
import { AuthContext } from '../context/AuthProvider';
import { FaUser, FaEnvelope, FaCamera, FaEdit, FaSave, FaTimes } from 'react-icons/fa';
import { toast } from 'react-toastify';

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

    // Validate photo URL if provided
    if (formData.photoURL && !isValidURL(formData.photoURL)) {
      toast.error('Please enter a valid photo URL!');
      return;
    }

    setLoading(true);

    try {
      await updateUserProfile(formData.displayName.trim(), formData.photoURL.trim() || null);
      toast.success('Profile updated successfully! ✨');
      setIsEditing(false);
    } catch (error) {
      console.error('Profile update error:', error);
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
    <div className="min-h-screen bg-gradient-to-b from-white to-green-50 py-12">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-[#2F5233] font-serif mb-4">
              My Profile
            </h1>
            <p className="text-gray-600">Manage your account information</p>
          </div>

          {/* Profile Card */}
          <div className="card bg-base-100 shadow-2xl bg-yellow-100">
            <div className="card-body">
              {/* Profile Header with Avatar */}
              <div className="flex flex-col items-center mb-8">
                <div className="avatar mb-4">
                  <div className="w-32 h-32 rounded-full ring-4 ring-[#4A7C59] ring-offset-4 overflow-hidden">
                    <img
                      src={user.photoURL || 'https://via.placeholder.com/150?text=User'}
                      alt={user.displayName || 'User'}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        e.target.src = 'https://via.placeholder.com/150?text=User';
                      }}
                    />
                  </div>
                </div>
                <h2 className="text-3xl font-bold text-[#2F5233]">
                  {user.displayName || 'Plant Lover'}
                </h2>
                <p className="text-gray-500">{user.email}</p>
              </div>

              {/* Edit/View Mode Toggle */}
              <div className="flex justify-end mb-6">
                {!isEditing ? (
                  <button
                    onClick={() => setIsEditing(true)}
                    className="btn bg-[#4A7C59] hover:bg-[#2F5233] text-white rounded-lg normal-case inline-flex items-center gap-2"
                  >
                    <FaEdit /> Edit Profile
                  </button>
                ) : (
                  <button
                    onClick={handleCancel}
                    className="btn btn-outline border-gray-400 text-gray-600 hover:bg-gray-100 rounded-lg normal-case inline-flex items-center gap-2"
                  >
                    <FaTimes /> Cancel
                  </button>
                )}
              </div>

              {/* Profile Information */}
              {!isEditing ? (
                <div className="space-y-6">
                  {/* Display Name */}
                  <div className="flex items-start gap-4 p-4 bg-green-50 rounded-lg">
                    <FaUser className="text-[#4A7C59] text-2xl mt-1" />
                    <div className="flex-1">
                      <p className="text-sm text-gray-500 mb-1">Display Name</p>
                      <p className="text-lg font-semibold text-[#2F5233]">
                        {user.displayName || 'Not set'}
                      </p>
                    </div>
                  </div>

                  {/* Email */}
                  <div className="flex items-start gap-4 p-4 bg-blue-50 rounded-lg">
                    <FaEnvelope className="text-blue-600 text-2xl mt-1" />
                    <div className="flex-1">
                      <p className="text-sm text-gray-500 mb-1">Email Address</p>
                      <p className="text-lg font-semibold text-[#2F5233]">
                        {user.email}
                      </p>
                      <p className="text-xs text-gray-500 mt-1">Email cannot be changed</p>
                    </div>
                  </div>

                  {/* Photo URL */}
                  <div className="flex items-start gap-4 p-4 bg-purple-50 rounded-lg">
                    <FaCamera className="text-purple-600 text-2xl mt-1" />
                    <div className="flex-1">
                      <p className="text-sm text-gray-500 mb-1">Profile Photo URL</p>
                      <p className="text-sm text-[#2F5233] break-all">
                        {user.photoURL || 'Default avatar'}
                      </p>
                    </div>
                  </div>
                </div>
              ) : (
                // Edit Form
                <form onSubmit={handleSubmit} className="space-y-6 bg-orange-50">
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
                    <button
                      type="button"
                      onClick={handleCancel}
                      className="btn btn-outline rounded-lg normal-case"
                      disabled={loading}
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="btn bg-[#4A7C59] hover:bg-[#2F5233] text-white rounded-lg normal-case"
                      disabled={loading}
                    >
                      {loading ? (
                        <>
                          <span className="loading loading-spinner"></span>
                          Updating...
                        </>
                      ) : (
                        <>
                          <FaSave /> Save Changes
                        </>
                      )}
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>

          {/* Additional Info Card */}
          <div className="card bg-base-100 shadow-md mt-8 bg-yellow-100">
            <div className="card-body">
              <h3 className="card-title text-[#2F5233]">Account Information</h3>
              <div className="divider"></div>
              <div className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">Account Status:</span>
                  <span className="badge badge-success text-white">Active</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Member Since:</span>
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
                <div className="flex justify-between">
                  <span className="text-gray-600">Last Sign In:</span>
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
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyProfile;
