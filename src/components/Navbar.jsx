import { Link, NavLink, useNavigate, useLocation } from 'react-router';
import { useContext } from 'react';
import { FaLeaf, FaUser } from 'react-icons/fa';
import { AuthContext } from '../context/AuthProvider';
import { toast } from 'react-toastify';

const Navbar = () => {
  const { user, logOut } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();
  
  // Check if current path is profile
  const isProfileActive = location.pathname === '/profile';

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

  return (
    <div className="fixed top-0 left-0 right-0 z-50 bg-base-100 border-b border-gray-100 shadow-sm">
      <div className="navbar container mx-auto">
        {/* Navbar Start - Logo + Mobile Menu */}
        <div className="navbar-start">
          <div className="dropdown">
            <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
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
                  d="M4 6h16M4 12h8m-8 6h16"
                />
              </svg>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content bg-base-100 rounded-box z-50 mt-3 w-52 p-2 shadow"
            >
              <li>
                <NavLink to="/">Home</NavLink>
              </li>
              <li>
                <NavLink to="/plants">Plants</NavLink>
              </li>
              <li>
                {user ? (
                  <details>
                    <summary>{user.displayName || 'My Profile'}</summary>
                    <ul className="p-2">
                      <li>
                        <NavLink to="/profile">My Profile</NavLink>
                      </li>
                      <li>
                        <button onClick={handleLogout} className="text-red-600">
                          Logout
                        </button>
                      </li>
                    </ul>
                  </details>
                ) : (
                  <details>
                    <summary>My Profile</summary>
                    <ul className="p-2">
                      <li>
                        <Link to="/login">Login</Link>
                      </li>
                      <li>
                        <Link to="/signup">Register</Link>
                      </li>
                    </ul>
                  </details>
                )}
              </li>
            </ul>
          </div>
          <Link to="/" className="btn btn-ghost text-xl lg:text-2xl font-bold text-[#2F5233]">
            <FaLeaf className="text-[#4A7C59]" />
            <span className="font-serif">GreenNest</span>
          </Link>
        </div>

        {/* Navbar Center - Navigation Links */}
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1 gap-2">
            <li>
              <NavLink
                to="/"
                className={({ isActive }) =>
                  `text-base font-medium ${
                    isActive
                      ? 'text-[#2F5233] border-b-2 border-[#4A7C59]'
                      : 'text-gray-600 hover:text-[#4A7C59]'
                  }`
                }
              >
                Home
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/plants"
                className={({ isActive }) =>
                  `text-base font-medium ${
                    isActive
                      ? 'text-[#2F5233] border-b-2 border-[#4A7C59]'
                      : 'text-gray-600 hover:text-[#4A7C59]'
                  }`
                }
              >
                Plants
              </NavLink>
            </li>
            <li>
              {user ? (
                <details>
                  <summary
                    className={`text-base font-medium flex items-center gap-2 cursor-pointer ${
                      isProfileActive
                        ? 'text-[#2F5233] border-b-2 border-[#4A7C59]'
                        : 'text-gray-600 hover:text-[#4A7C59]'
                    }`}
                  >
                    <div className="avatar">
                      <div className="w-6 h-6 rounded-full ring-2 ring-[#4A7C59]">
                        <img
                          src={user.photoURL || 'https://via.placeholder.com/150'}
                          alt={user.displayName || 'User'}
                        />
                      </div>
                    </div>
                    {user.displayName || 'My Profile'}
                  </summary>
                  <ul className="p-2 bg-white rounded-lg shadow-xl border border-gray-100 w-52">
                    <li>
                      <NavLink to="/profile">My Profile</NavLink>
                    </li>
                    <li>
                      <button onClick={handleLogout} className="text-red-600 w-full text-left">
                        Logout
                      </button>
                    </li>
                  </ul>
                </details>
              ) : (
                <details>
                  <summary
                    className={`text-base font-medium cursor-pointer ${
                      isProfileActive
                        ? 'text-[#2F5233] border-b-2 border-[#4A7C59]'
                        : 'text-gray-600 hover:text-[#4A7C59]'
                    }`}
                  >
                    My Profile
                  </summary>
                  <ul className="p-2 bg-white rounded-lg shadow-xl border border-gray-100 w-52">
                    <li>
                      <Link to="/login">Login</Link>
                    </li>
                    <li>
                      <Link to="/signup">Register</Link>
                    </li>
                  </ul>
                </details>
              )}
            </li>
          </ul>
        </div>

        {/* Navbar End - Empty for now */}
        <div className="navbar-end"></div>
      </div>
    </div>
  );
};

export default Navbar;
