import { FaInstagram, FaFacebook, FaPinterest, FaLeaf } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="bg-[#2F5233] text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* About Section */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <FaLeaf className="text-2xl text-[#8B9D83]" />
              <h3 className="text-2xl font-bold">GreenNest</h3>
            </div>
            <p className="text-gray-300">
              Bringing nature to your home, one plant at a time. Your trusted partner for healthy, beautiful indoor plants.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-gray-300 hover:text-white transition-colors">
                  About
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-300 hover:text-white transition-colors">
                  Contact
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-300 hover:text-white transition-colors">
                  Privacy Policy
                </a>
              </li>
            </ul>
          </div>

          {/* Follow Us */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Follow Us</h4>
            <div className="flex gap-4">
              <a
                href="#"
                className="text-2xl text-gray-300 hover:text-white transition-colors"
                aria-label="Instagram"
              >
                <FaInstagram />
              </a>
              <a
                href="#"
                className="text-2xl text-gray-300 hover:text-white transition-colors"
                aria-label="Facebook"
              >
                <FaFacebook />
              </a>
              <a
                href="#"
                className="text-2xl text-gray-300 hover:text-white transition-colors"
                aria-label="Pinterest"
              >
                <FaPinterest />
              </a>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="divider my-6"></div>

        {/* Copyright */}
        <div className="text-center text-gray-300">
          <p>&copy; 2025 GreenNest. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

