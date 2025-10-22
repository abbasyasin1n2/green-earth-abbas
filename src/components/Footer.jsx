import { FaInstagram, FaFacebook, FaPinterest, FaLeaf, FaHeart } from 'react-icons/fa';
import { Leaf, Sprout } from 'lucide-react';
import { motion } from 'motion/react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gradient-to-b from-[#1a2e1a] to-[#0d1a0d] text-white relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-0 left-0 w-64 h-64 bg-[#4A7C59] rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-[#8B9D83] rounded-full blur-3xl"></div>
      </div>
      
      <div className="container mx-auto px-4 lg:px-8 py-16 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-8">
          {/* Quick Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <h4 className="text-lg font-semibold mb-6 text-white flex items-center gap-2">
              <span className="w-1 h-6 bg-[#4A7C59] rounded"></span>
              Quick Links
            </h4>
            <ul className="space-y-3">
              <li>
                <motion.a
                  href="#"
                  className="text-gray-400 hover:text-white inline-flex items-center gap-2 group transition-all duration-200"
                  whileHover={{ x: 5 }}
                >
                  <span className="w-0 h-0.5 bg-[#4A7C59] group-hover:w-4 transition-all duration-200"></span>
                  About
                </motion.a>
              </li>
              <li>
                <motion.a
                  href="#"
                  className="text-gray-400 hover:text-white inline-flex items-center gap-2 group transition-all duration-200"
                  whileHover={{ x: 5 }}
                >
                  <span className="w-0 h-0.5 bg-[#4A7C59] group-hover:w-4 transition-all duration-200"></span>
                  Contact
                </motion.a>
              </li>
              <li>
                <motion.a
                  href="#"
                  className="text-gray-400 hover:text-white inline-flex items-center gap-2 group transition-all duration-200"
                  whileHover={{ x: 5 }}
                >
                  <span className="w-0 h-0.5 bg-[#4A7C59] group-hover:w-4 transition-all duration-200"></span>
                  Privacy Policy
                </motion.a>
              </li>
            </ul>
          </motion.div>

          {/* Social Media Icons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            viewport={{ once: true }}
          >
            <h4 className="text-lg font-semibold mb-6 text-white flex items-center gap-2">
              <span className="w-1 h-6 bg-[#4A7C59] rounded"></span>
              Follow Us
            </h4>
            <div className="flex gap-3">
              <motion.a
                href="#"
                className="w-12 h-12 rounded-full bg-white/10 hover:bg-gradient-to-br hover:from-purple-600 hover:to-pink-600 flex items-center justify-center text-gray-300 hover:text-white transition-all duration-300 shadow-lg hover:shadow-2xl"
                aria-label="Instagram"
                whileHover={{ scale: 1.15, rotate: 5 }}
                whileTap={{ scale: 0.9 }}
              >
                <FaInstagram size={22} />
              </motion.a>
              <motion.a
                href="#"
                className="w-12 h-12 rounded-full bg-white/10 hover:bg-blue-600 flex items-center justify-center text-gray-300 hover:text-white transition-all duration-300 shadow-lg hover:shadow-2xl"
                aria-label="Facebook"
                whileHover={{ scale: 1.15, rotate: -5 }}
                whileTap={{ scale: 0.9 }}
              >
                <FaFacebook size={22} />
              </motion.a>
              <motion.a
                href="#"
                className="w-12 h-12 rounded-full bg-white/10 hover:bg-red-600 flex items-center justify-center text-gray-300 hover:text-white transition-all duration-300 shadow-lg hover:shadow-2xl"
                aria-label="Pinterest"
                whileHover={{ scale: 1.15, rotate: 5 }}
                whileTap={{ scale: 0.9 }}
              >
                <FaPinterest size={22} />
              </motion.a>
            </div>
          </motion.div>

          {/* Copyright */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <div className="flex items-center gap-2 mb-4">
              <motion.div
                animate={{ rotate: [0, 360] }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              >
                <FaLeaf className="text-2xl text-[#8B9D83]" />
              </motion.div>
              <h4 className="text-xl font-bold font-serif">GreenNest</h4>
            </div>
            <p className="text-gray-300 mb-3 text-base inline-flex items-center gap-2">
              Bringing nature to your doorstep <Leaf className="inline" size={18} />
            </p>
            <p className="text-gray-400 text-sm flex items-center gap-1 flex-wrap">
              © {currentYear} GreenNest. Made with <motion.span
                animate={{ scale: [1, 1.3, 1] }}
                transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
              ><FaHeart className="text-red-500 inline mx-0.5" /></motion.span> for plant lovers
            </p>
          </motion.div>
        </div>

        {/* Bottom border decoration */}
        <div className="border-t border-white/10 pt-8 mt-8">
          <motion.p
            className="text-center text-gray-400 text-sm"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <span className="inline-flex items-center gap-2">
              <Sprout size={18} /> Cultivating green spaces, one plant at a time <Sprout size={18} />
            </span>
          </motion.p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

