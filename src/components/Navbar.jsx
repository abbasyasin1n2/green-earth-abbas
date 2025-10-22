import { useContext, useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router';
import { AuthContext } from '../context/AuthProvider';
import { FaLeaf, FaBars, FaTimes } from 'react-icons/fa';

const Navbar = () => {
  const { user, logOut } = useContext(AuthContext);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  const handleLogout = () => {
    logOut()
      .then(() => {
        setIsMobileMenuOpen(false);
      })
      .catch(() => {
        // Error handling
      });
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  // Check if My Profile is active
  const isProfileActive = location.pathname === '/profile';

  return (
    <nav className="bg-white shadow-md fixed top-0 left-0 right-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link
            to="/"
            className="flex items-center gap-2 text-2xl font-bold text-[#2F5233] hover:text-[#4A7C59] transition-colors"
            onClick={closeMobileMenu}
          >
            <FaLeaf className="text-[#4A7C59]" />
            <span className="font-serif">GreenNest</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            {/* Navigation Links */}
            <div className="flex items-center gap-6">
              <NavLink
                to="/"
                className={({ isActive }) =>
                  `font-semibold transition-colors ${
                    isActive
                      ? 'text-[#4A7C59] border-b-2 border-[#4A7C59]'
                      : 'text-gray-700 hover:text-[#4A7C59]'
                  }`
                }
              >
                Home
              </NavLink>
              <NavLink
                to="/plants"
                className={({ isActive }) =>
                  `font-semibold transition-colors ${
                    isActive
                      ? 'text-[#4A7C59] border-b-2 border-[#4A7C59]'
                      : 'text-gray-700 hover:text-[#4A7C59]'
                  }`
                }
              >
                Plants
              </NavLink>
              <NavLink
                to="/profile"
                className={({ isActive }) =>
                  `font-semibold transition-colors ${
                    isActive
                      ? 'text-[#4A7C59] border-b-2 border-[#4A7C59]'
                      : 'text-gray-700 hover:text-[#4A7C59]'
                  }`
                }
              >
                My Profile
              </NavLink>
            </div>

            {/* Auth Section */}
            <div className="flex items-center gap-4">
              {user ? (
                // Logged In - Show Avatar & Dropdown
                <div className="dropdown dropdown-end">
                  <div
                    tabIndex={0}
                    role="button"
                    className="btn btn-ghost btn-circle avatar"
                  >
                    <div className="w-10 h-10 rounded-full ring-2 ring-[#4A7C59] ring-offset-2 overflow-hidden">
                      <img
                        src={user.photoURL || 'https://via.placeholder.com/40?text=User'}
                        alt={user.displayName || 'User'}
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          e.target.src = 'https://via.placeholder.com/40?text=User';
                        }}
                      />
                    </div>
                  </div>
                  <ul
                    tabIndex={0}
                    className="menu menu-sm dropdown-content bg-white rounded-lg shadow-lg mt-3 w-52 p-2 border border-gray-100"
                  >
                    <li className="menu-title px-4 py-2">
                      <span className="text-[#2F5233] font-bold">
                        {user.displayName || 'Plant Lover'}
                      </span>
                    </li>
                    <li>
                      <Link
                        to="/profile"
                        className="hover:bg-[#4A7C59] hover:text-white rounded-lg"
                      >
                        My Profile
                      </Link>
                    </li>
                    <li>
                      <button
                        onClick={handleLogout}
                        className="hover:bg-red-500 hover:text-white rounded-lg"
                      >
                        Logout
                      </button>
                    </li>
                  </ul>
                </div>
              ) : (
                // Logged Out - Show Login & Register
                <div className="flex items-center gap-3">
                  <Link
                    to="/login"
                    className="btn btn-outline border-[#4A7C59] text-[#4A7C59] hover:bg-[#4A7C59] hover:text-white hover:border-[#4A7C59] rounded-lg normal-case"
                  >
                    Login
                  </Link>
                  <Link
                    to="/signup"
                    className="btn bg-[#4A7C59] hover:bg-[#2F5233] text-white border-none rounded-lg normal-case"
                  >
                    Register
                  </Link>
                </div>
              )}
            </div>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={toggleMobileMenu}
            className="md:hidden btn btn-ghost btn-circle"
            aria-label="Toggle mobile menu"
          >
            {isMobileMenuOpen ? (
              <FaTimes className="text-2xl text-[#2F5233]" />
            ) : (
              <FaBars className="text-2xl text-[#2F5233]" />
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden bg-white border-t border-gray-100 py-4">
            {/* Mobile Navigation Links */}
            <div className="flex flex-col gap-2 mb-4">
              <NavLink
                to="/"
                onClick={closeMobileMenu}
                className={({ isActive }) =>
                  `px-4 py-2 font-semibold rounded-lg transition-colors ${
                    isActive
                      ? 'bg-[#4A7C59] text-white'
                      : 'text-gray-700 hover:bg-green-50'
                  }`
                }
              >
                Home
              </NavLink>
              <NavLink
                to="/plants"
                onClick={closeMobileMenu}
                className={({ isActive }) =>
                  `px-4 py-2 font-semibold rounded-lg transition-colors ${
                    isActive
                      ? 'bg-[#4A7C59] text-white'
                      : 'text-gray-700 hover:bg-green-50'
                  }`
                }
              >
                Plants
              </NavLink>
              <NavLink
                to="/profile"
                onClick={closeMobileMenu}
                className={({ isActive }) =>
                  `px-4 py-2 font-semibold rounded-lg transition-colors ${
                    isActive
                      ? 'bg-[#4A7C59] text-white'
                      : 'text-gray-700 hover:bg-green-50'
                  }`
                }
              >
                My Profile
              </NavLink>
            </div>

            {/* Mobile Auth Section */}
            <div className="px-4 pt-4 border-t border-gray-100">
              {user ? (
                // Logged In - Show User Info & Logout
                <div className="flex flex-col gap-3">
                  <div className="flex items-center gap-3 pb-3 border-b border-gray-100">
                    <div className="avatar">
                      <div className="w-12 h-12 rounded-full ring-2 ring-[#4A7C59] overflow-hidden">
                        <img
                          src={user.photoURL || 'https://via.placeholder.com/48?text=User'}
                          alt={user.displayName || 'User'}
                          className="w-full h-full object-cover"
                          onError={(e) => {
                            e.target.src = 'https://via.placeholder.com/48?text=User';
                          }}
                        />
                      </div>
                    </div>
                    <div>
                      <p className="font-bold text-[#2F5233]">
                        {user.displayName || 'Plant Lover'}
                      </p>
                      <p className="text-sm text-gray-500">{user.email}</p>
                    </div>
                  </div>
                  <button
                    onClick={handleLogout}
                    className="btn bg-red-500 hover:bg-red-600 text-white w-full rounded-lg normal-case"
                  >
                    Logout
                  </button>
                </div>
              ) : (
                // Logged Out - Show Login & Register
                <div className="flex flex-col gap-2">
                  <Link
                    to="/login"
                    onClick={closeMobileMenu}
                    className="btn btn-outline border-[#4A7C59] text-[#4A7C59] hover:bg-[#4A7C59] hover:text-white hover:border-[#4A7C59] w-full rounded-lg normal-case"
                  >
                    Login
                  </Link>
                  <Link
                    to="/signup"
                    onClick={closeMobileMenu}
                    className="btn bg-[#4A7C59] hover:bg-[#2F5233] text-white border-none w-full rounded-lg normal-case"
                  >
                    Register
                  </Link>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;

