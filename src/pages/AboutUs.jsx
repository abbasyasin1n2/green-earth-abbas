import { FaLeaf, FaSeedling, FaHeart, FaTruck } from 'react-icons/fa';
import { motion } from 'motion/react';

const AboutUs = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-green-50">
      {/* Hero Section */}
      <section className="bg-[#2F5233] text-white py-20 pt-28">
        <div className="container mx-auto px-4 lg:px-8">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-4xl md:text-5xl font-bold text-center font-serif mb-4"
          >
            About GreenNest
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-center text-green-100 text-lg max-w-2xl mx-auto"
          >
            Bringing nature closer to you, one plant at a time.
          </motion.p>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-16">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <img
                src="/assets/hero_images/3rd_swipe_leftside_image.jpg"
                alt="Our story"
                className="rounded-2xl shadow-lg w-full h-[400px] object-cover"
              />
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl font-bold text-[#2F5233] mb-6 font-serif">Our Story</h2>
              <p className="text-gray-600 mb-4 leading-relaxed">
                GreenNest started with a simple idea — everyone deserves a touch of nature in their space. 
                What began as a small passion project has grown into a community of plant lovers across Bangladesh.
              </p>
              <p className="text-gray-600 leading-relaxed">
                We carefully select each plant, ensuring they're healthy and ready to thrive in your home. 
                Our team of experts is always here to help you on your plant journey.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-16 bg-[#F5F1E8]">
        <div className="container mx-auto px-4 lg:px-8">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-3xl font-bold text-[#2F5233] text-center mb-12 font-serif"
          >
            What We Stand For
          </motion.h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="text-center p-6"
            >
              <div className="w-16 h-16 bg-[#4A7C59] rounded-full flex items-center justify-center mx-auto mb-4">
                <FaLeaf className="text-2xl text-white" />
              </div>
              <h3 className="text-xl font-semibold text-[#2F5233] mb-2">Quality Plants</h3>
              <p className="text-gray-600 text-sm">Hand-picked, healthy plants that are ready to thrive.</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              viewport={{ once: true }}
              className="text-center p-6"
            >
              <div className="w-16 h-16 bg-[#4A7C59] rounded-full flex items-center justify-center mx-auto mb-4">
                <FaSeedling className="text-2xl text-white" />
              </div>
              <h3 className="text-xl font-semibold text-[#2F5233] mb-2">Expert Guidance</h3>
              <p className="text-gray-600 text-sm">Free plant care tips and consultation for all customers.</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              viewport={{ once: true }}
              className="text-center p-6"
            >
              <div className="w-16 h-16 bg-[#4A7C59] rounded-full flex items-center justify-center mx-auto mb-4">
                <FaTruck className="text-2xl text-white" />
              </div>
              <h3 className="text-xl font-semibold text-[#2F5233] mb-2">Safe Delivery</h3>
              <p className="text-gray-600 text-sm">Careful packaging to ensure plants arrive healthy.</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              viewport={{ once: true }}
              className="text-center p-6"
            >
              <div className="w-16 h-16 bg-[#4A7C59] rounded-full flex items-center justify-center mx-auto mb-4">
                <FaHeart className="text-2xl text-white" />
              </div>
              <h3 className="text-xl font-semibold text-[#2F5233] mb-2">Customer Love</h3>
              <p className="text-gray-600 text-sm">Your satisfaction is our top priority, always.</p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-16">
        <div className="container mx-auto px-4 lg:px-8">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-3xl font-bold text-[#2F5233] text-center mb-12 font-serif"
          >
            Meet Our Team
          </motion.h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="text-center"
            >
              <img
                src="/assets/plant_experts/closeup-portrait-woman-smiling-holding-flower-florist-replanting-flowers-ceramic-pot-using-shovel-gloves-fertil-soil-flowers-house-decoration.jpg"
                alt="Emma Rodriguez"
                className="w-32 h-32 rounded-full object-cover mx-auto mb-4 shadow-lg"
              />
              <h3 className="text-lg font-semibold text-[#2F5233]">Emma Rodriguez</h3>
              <p className="text-[#4A7C59] text-sm">Plant Care Expert</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              viewport={{ once: true }}
              className="text-center"
            >
              <img
                src="/assets/plant_experts/medium-shot-man-looking-plant.jpg"
                alt="Michael Chen"
                className="w-32 h-32 rounded-full object-cover mx-auto mb-4 shadow-lg"
              />
              <h3 className="text-lg font-semibold text-[#2F5233]">Michael Chen</h3>
              <p className="text-[#4A7C59] text-sm">Tropical Specialist</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              viewport={{ once: true }}
              className="text-center"
            >
              <img
                src="/assets/plant_experts/portrait-man-growing-plants.jpg"
                alt="David Thompson"
                className="w-32 h-32 rounded-full object-cover mx-auto mb-4 shadow-lg"
              />
              <h3 className="text-lg font-semibold text-[#2F5233]">David Thompson</h3>
              <p className="text-[#4A7C59] text-sm">Succulent Expert</p>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutUs;
