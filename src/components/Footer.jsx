import { FaInstagram, FaFacebook, FaPinterest, FaLeaf } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="bg-gradient-to-b from-[#1a2e1a] to-[#0d1a0d] text-white">
      <div className="container mx-auto px-4 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-8">
          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-6 text-white">Quick Links</h4>
            <ul className="space-y-3">
              <li>
                <a href="#" className="text-gray-400 hover:text-white hover:translate-x-1 inline-block transition-all duration-200">
                  About
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-white hover:translate-x-1 inline-block transition-all duration-200">
                  Contact
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-white hover:translate-x-1 inline-block transition-all duration-200">
                  Privacy Policy
                </a>
              </li>
            </ul>
          </div>

          {/* Social Media Icons */}
          <div>
            <h4 className="text-lg font-semibold mb-6 text-white">Social Media</h4>
            <div className="flex gap-3">
              <a
                href="#"
                className="w-10 h-10 rounded-full bg-white/10 hover:bg-[#4A7C59] flex items-center justify-center text-gray-400 hover:text-white transition-all duration-200"
                aria-label="Instagram"
              >
                <FaInstagram size={18} />
              </a>
              <a
                href="#"
                className="w-10 h-10 rounded-full bg-white/10 hover:bg-[#4A7C59] flex items-center justify-center text-gray-400 hover:text-white transition-all duration-200"
                aria-label="Facebook"
              >
                <FaFacebook size={18} />
              </a>
              <a
                href="#"
                className="w-10 h-10 rounded-full bg-white/10 hover:bg-[#4A7C59] flex items-center justify-center text-gray-400 hover:text-white transition-all duration-200"
                aria-label="Pinterest"
              >
                <FaPinterest size={18} />
              </a>
            </div>
          </div>

          {/* Copyright */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <FaLeaf className="text-2xl text-[#8B9D83]" />
              <h4 className="text-xl font-bold font-serif">GreenNest</h4>
            </div>
            <p className="text-gray-400">
              © 2025 GreenNest. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

