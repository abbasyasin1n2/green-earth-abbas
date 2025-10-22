import { Link, NavLink, useNavigate } from 'react-router';
import { useContext } from 'react';
import { FaLeaf, FaUser } from 'react-icons/fa';
import { AuthContext } from '../context/AuthProvider';
import { toast } from 'react-toastify';

const Navbar = () => {
  const { user, logOut } = useContext(AuthContext);
  const navigate = useNavigate();

  // Handle logout
  const handleLogout = async () => {
    try {
      await logOut();
      toast.success('Logged out successfully! 👋');
      navigate('/');
    } catch (error) {
      console.error('Logout error:', error);
      toast.error('Failed to logout. Please try again');
    }
  };

  const navLinks = (
    <>
      <li>
        <NavLink
          to="/"
          className={({ isActive }) =>
            isActive
              ? 'text-[#2F5233] font-semibold'
              : 'text-gray-700 hover:text-[#4A7C59]'
          }
        >
          Home
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/plants"
          className={({ isActive }) =>
            isActive
              ? 'text-[#2F5233] font-semibold'
              : 'text-gray-700 hover:text-[#4A7C59]'
          }
        >
          Plants
        </NavLink>
      </li>
    </>
  );

  return (
    <nav className="sticky top-0 z-50 bg-white/90 backdrop-blur-md shadow-md">
      <div className="navbar container mx-auto px-4">
        {/* Logo */}
        <div className="flex-1">
          <Link to="/" className="flex items-center gap-2 text-2xl font-bold text-[#2F5233]">
            <FaLeaf className="text-[#4A7C59]" />
            <span>GreenNest</span>
          </Link>
        </div>

        {/* Desktop Navigation */}
        <div className="flex-none hidden lg:flex">
          <ul className="menu menu-horizontal px-1 gap-2">
            {navLinks}
            
            {/* My Profile Dropdown - Conditional Rendering */}
            <li>
              <div className="dropdown dropdown-hover dropdown-end">
                {user ? (
                  // Logged In - Show Avatar and Name
                  <div tabIndex={0} role="button" className="flex items-center gap-2 text-gray-700 hover:text-[#4A7C59]">
                    <div className="avatar">
                      <div className="w-10 rounded-full ring ring-[#4A7C59] ring-offset-2">
                        <img src={user.photoURL || 'https://via.placeholder.com/150'} alt={user.displayName || 'User'} />
                      </div>
                    </div>
                    <span className="font-medium">{user.displayName || 'User'}</span>
                  </div>
                ) : (
                  // Logged Out - Show Icon and Text
                  <div tabIndex={0} role="button" className="flex items-center gap-2 text-gray-700 hover:text-[#4A7C59]">
                    <FaUser />
                    <span>My Profile</span>
                  </div>
                )}
                
                <ul
                  tabIndex={0}
                  className="dropdown-content menu bg-base-100 rounded-box z-1 w-52 p-2 shadow-lg mt-2"
                >
                  {user ? (
                    // Logged In Dropdown
                    <>
                      <li>
                        <Link to="/profile" className="hover:bg-[#F5F1E8]">
                          Update Profile
                        </Link>
                      </li>
                      <li>
                        <button onClick={handleLogout} className="hover:bg-[#F5F1E8] text-red-600">
                          Logout
                        </button>
                      </li>
                    </>
                  ) : (
                    // Logged Out Dropdown
                    <>
                      <li>
                        <Link to="/login" className="hover:bg-[#F5F1E8]">
                          Login
                        </Link>
                      </li>
                      <li>
                        <Link to="/signup" className="hover:bg-[#F5F1E8]">
                          Register
                        </Link>
                      </li>
                    </>
                  )}
                </ul>
              </div>
            </li>
          </ul>
        </div>

        {/* Mobile Menu */}
        <div className="flex-none lg:hidden">
          <div className="dropdown dropdown-end">
            <div tabIndex={0} role="button" className="btn btn-ghost">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow-lg"
            >
              {navLinks}
              
              {/* Mobile User Section */}
              {user ? (
                <>
                  <li className="menu-title">
                    <div className="flex items-center gap-2">
                      <div className="avatar">
                        <div className="w-8 rounded-full">
                          <img src={user.photoURL || 'https://via.placeholder.com/150'} alt={user.displayName || 'User'} />
                        </div>
                      </div>
                      <span className="text-sm">{user.displayName || 'User'}</span>
                    </div>
                  </li>
                  <li>
                    <Link to="/profile">Update Profile</Link>
                  </li>
                  <li>
                    <button onClick={handleLogout} className="text-red-600">
                      Logout
                    </button>
                  </li>
                </>
              ) : (
                <>
                  <li>
                    <Link to="/login">Login</Link>
                  </li>
                  <li>
                    <Link to="/signup">Register</Link>
                  </li>
                </>
              )}
            </ul>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
