import { useEffect, useState } from 'react';
import { Link } from 'react-router';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, Navigation, EffectFade } from 'swiper/modules';
import { FaStar, FaStarHalfAlt, FaWater, FaSun, FaSeedling, FaLeaf, FaArrowRight } from 'react-icons/fa';
import { motion } from 'motion/react';
import plantsData from '../data/plants.json';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import 'swiper/css/effect-fade';

// Hero images
const heroImage1 = '/assets/hero_images/1st_swipe_image.webp';
const heroImage2 = '/assets/hero_images/2md_swipe_image.png';
const heroImage3 = '/assets/hero_images/3rd_swipe_leftside_image.jpg';

// Expert images
const expert1 = '/assets/plant_experts/closeup-portrait-woman-smiling-holding-flower-florist-replanting-flowers-ceramic-pot-using-shovel-gloves-fertil-soil-flowers-house-decoration.jpg';
const expert2 = '/assets/plant_experts/medium-shot-man-looking-plant.jpg';
const expert3 = '/assets/plant_experts/portrait-man-growing-plants.jpg';

const Home = () => {
  const [topPlants, setTopPlants] = useState([]);

  useEffect(() => {
    // Get top rated plants (rating >= 4.7)
    const topRated = plantsData.filter(plant => plant.rating >= 4.7).slice(0, 6);
    setTopPlants(topRated);
  }, []);

  // Render star rating
  const renderStars = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;

    for (let i = 0; i < fullStars; i++) {
      stars.push(<FaStar key={i} className="text-yellow-500" />);
    }
    if (hasHalfStar) {
      stars.push(<FaStarHalfAlt key="half" className="text-yellow-500" />);
    }
    return stars;
  };

  // Plant care tips data
  const careTips = [
    {
      icon: <FaWater className="text-4xl text-blue-500" />,
      title: 'Proper Watering',
      description: 'Water when the top inch of soil is dry. Overwatering is the #1 killer of houseplants. Most plants need less water than you think!',
    },
    {
      icon: <FaSun className="text-4xl text-yellow-500" />,
      title: 'Sunlight Requirements',
      description: 'Understand your plant\'s light needs. Most indoor plants thrive in bright, indirect light. Avoid direct sunlight that can scorch leaves.',
    },
    {
      icon: <FaSeedling className="text-4xl text-green-600" />,
      title: 'Fertilizing Guide',
      description: 'Feed your plants during growing season (spring & summer). Use balanced fertilizer monthly. Less is more - avoid over-fertilizing.',
    },
    {
      icon: <FaLeaf className="text-4xl text-[#4A7C59]" />,
      title: 'Temperature & Humidity',
      description: 'Most houseplants prefer 65-75°F (18-24°C). Increase humidity by misting, grouping plants, or using a humidifier.',
    },
  ];

  // Experts data
  const experts = [
    {
      image: expert1,
      name: 'Emma Rodriguez',
      specialization: 'Indoor Plant Specialist',
      description: '10+ years helping plant parents thrive',
    },
    {
      image: expert2,
      name: 'Michael Chen',
      specialization: 'Tropical Plant Expert',
      description: 'Specializing in rare & exotic species',
    },
    {
      image: expert3,
      name: 'David Thompson',
      specialization: 'Succulent & Cacti Care',
      description: 'Master of low-maintenance greenery',
    },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section with Swiper */}
      <section className="container mx-auto px-4 lg:px-8 pt-4">
        <div className="relative h-[50vh] md:h-[55vh] lg:h-[60vh] rounded-2xl overflow-hidden">
        <Swiper
          modules={[Autoplay, Pagination, Navigation, EffectFade]}
          effect="fade"
          autoplay={{
            delay: 5000,
            disableOnInteraction: false,
          }}
          pagination={{
            clickable: true,
          }}
          navigation={true}
          loop={true}
          className="h-full"
        >
          {/* Slide 1 */}
          <SwiperSlide>
            <div
              className="relative h-full bg-cover bg-center"
              style={{ backgroundImage: `url(${heroImage1})` }}
            >
              <div className="absolute inset-0 bg-black/40"></div>
              <div className="relative h-full container mx-auto px-4 lg:px-8 flex items-center">
                <div className="text-white max-w-2xl">
                  <motion.h1
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    className="text-5xl lg:text-7xl font-bold mb-6 font-serif leading-tight"
                  >
                    Bring Nature to Your Home
                  </motion.h1>
                  <motion.p
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.4 }}
                    className="text-xl lg:text-2xl mb-8 text-gray-200"
                  >
                    Discover our collection of beautiful, healthy indoor plants that purify your air and brighten your space
                  </motion.p>
                  <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.6 }}
                  >
                    <Link
                      to="/plants"
                      className="btn bg-[#4A7C59] hover:bg-[#2F5233] text-white border-none px-8 py-4 text-lg rounded-lg normal-case inline-flex items-center gap-2 shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105"
                    >
                      Shop Now <FaArrowRight />
                    </Link>
                  </motion.div>
                </div>
              </div>
            </div>
          </SwiperSlide>

          {/* Slide 2 */}
          <SwiperSlide>
            <div
              className="relative h-full bg-cover bg-center"
              style={{ backgroundImage: `url(${heroImage2})` }}
            >
              <div className="absolute inset-0 bg-black/40"></div>
              <div className="relative h-full container mx-auto px-4 lg:px-8 flex items-center">
                <div className="text-white max-w-2xl">
                  <motion.h1
                    initial={{ opacity: 0, x: -30 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    className="text-5xl lg:text-7xl font-bold mb-6 font-serif leading-tight"
                  >
                    Greener Living Starts Here
                  </motion.h1>
                  <motion.p
                    initial={{ opacity: 0, x: -30 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8, delay: 0.4 }}
                    className="text-xl lg:text-2xl mb-8 text-gray-200"
                  >
                    Expert care guides, premium plants, and everything you need for a thriving indoor garden
                  </motion.p>
                  <motion.div
                    initial={{ opacity: 0, x: -30 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8, delay: 0.6 }}
                  >
                    <Link
                      to="/plants"
                      className="btn bg-[#4A7C59] hover:bg-[#2F5233] text-white border-none px-8 py-4 text-lg rounded-lg normal-case inline-flex items-center gap-2 shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105"
                    >
                      Explore Plants <FaArrowRight />
                    </Link>
                  </motion.div>
                </div>
              </div>
            </div>
          </SwiperSlide>

          {/* Slide 3 */}
          <SwiperSlide>
            <div
              className="relative h-full bg-cover bg-center"
              style={{ backgroundImage: `url(${heroImage3})` }}
            >
              <div className="absolute inset-0 bg-black/40"></div>
              <div className="relative h-full container mx-auto px-4 lg:px-8 flex items-center">
                <div className="text-white max-w-2xl">
                  <motion.h1
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    className="text-5xl lg:text-7xl font-bold mb-6 font-serif leading-tight"
                  >
                    Your Plant Journey Begins
                  </motion.h1>
                  <motion.p
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.8, delay: 0.4 }}
                    className="text-xl lg:text-2xl mb-8 text-gray-200"
                  >
                    From beginner-friendly to rare species, find the perfect plant companion today
                  </motion.p>
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.8, delay: 0.6 }}
                  >
                    <Link
                      to="/plants"
                      className="btn bg-[#4A7C59] hover:bg-[#2F5233] text-white border-none px-8 py-4 text-lg rounded-lg normal-case inline-flex items-center gap-2 shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105"
                    >
                      Get Started <FaArrowRight />
                    </Link>
                  </motion.div>
                </div>
              </div>
            </div>
          </SwiperSlide>
        </Swiper>
        </div>
      </section>

      {/* Top Rated Indoor Plants Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
              className="text-[#4A7C59] font-semibold mb-2 tracking-wide uppercase text-sm"
            >
              Best Sellers
            </motion.p>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              viewport={{ once: true }}
              className="section-heading"
            >
              Top Rated Indoor Plants
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              viewport={{ once: true }}
              className="section-subtitle"
            >
              Handpicked collection of our most loved plants, perfect for creating your urban jungle
            </motion.p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {topPlants.map((plant, index) => (
              <motion.div
                key={plant.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ y: -8 }}
                className="card bg-white shadow-xl hover:shadow-2xl transition-all duration-300 group"
              >
                <figure className="relative px-0 pt-0 h-64 overflow-hidden rounded-t-2xl">
                  <img
                    src={plant.image}
                    alt={plant.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    onError={(e) => {
                      e.target.src = 'https://via.placeholder.com/400x300?text=Plant+Image';
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  {plant.inStock && (
                    <motion.div
                      initial={{ scale: 0, rotate: -180 }}
                      animate={{ scale: 1, rotate: 0 }}
                      transition={{ type: 'spring', stiffness: 200, delay: 0.2 + index * 0.1 }}
                      className="absolute top-4 right-4"
                    >
                      <span className="badge badge-success text-white font-semibold shadow-lg px-3 py-2">
                        In Stock
                      </span>
                    </motion.div>
                  )}
                </figure>
                <div className="card-body">
                  <h2 className="card-title text-[#2F5233] font-serif text-xl">
                    {plant.name}
                  </h2>
                  <p className="text-sm text-gray-500 italic mb-1">{plant.scientificName}</p>
                  <div className="badge badge-outline border-[#4A7C59] text-[#4A7C59] mb-2">
                    {plant.category}
                  </div>
                  <p className="text-gray-600 text-sm line-clamp-2 leading-relaxed">{plant.description}</p>
                  
                  {/* Plant Info */}
                  <div className="flex flex-wrap gap-2 mt-3">
                    <div className="badge badge-sm bg-emerald-50 text-emerald-700 border-emerald-200 font-medium">
                      {plant.difficulty}
                    </div>
                    <div className="badge badge-sm bg-amber-50 text-amber-700 border-amber-200 font-medium">
                      {plant.lightRequirement}
                    </div>
                  </div>

                  {/* Rating and Price */}
                  <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-100">
                    <div className="flex items-center gap-1">
                      <FaStar className="text-yellow-500 text-lg" />
                      <span className="font-bold text-lg text-green-500">{plant.rating}</span>
                      <span className="text-gray-400 text-sm">/5</span>
                    </div>
                    <div className="text-2xl font-bold text-[#4A7C59]">
                      ৳{plant.price}
                    </div>
                  </div>

                  {/* View Details Button */}
                  <div className="card-actions mt-4">
                    <Link
                      to={`/plant/${plant.id}`}
                      className="btn bg-[#4A7C59] hover:bg-[#2F5233] text-white w-full rounded-lg normal-case shadow-md hover:shadow-xl transition-all duration-300 border-none"
                    >
                      View Details
                    </Link>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mt-12"
          >
            <Link
              to="/plants"
              className="btn bg-[#4A7C59] hover:bg-[#2F5233] text-white border-none px-8 rounded-lg normal-case inline-flex items-center gap-2 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
            >
              View All Plants <FaArrowRight />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Plant Care Tips Section */}
      <section className="py-20 bg-[#F5F1E8] relative overflow-hidden">
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-20 left-10 w-72 h-72 bg-[#4A7C59] rounded-full blur-3xl"></div>
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-[#8B9D83] rounded-full blur-3xl"></div>
        </div>
        
        <div className="container mx-auto px-4 lg:px-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <p className="text-[#4A7C59] font-semibold mb-2 tracking-wide uppercase text-sm">
              Expert Advice
            </p>
            <h2 className="section-heading">Plant Care Tips</h2>
            <p className="section-subtitle">
              Essential care guidelines to keep your plants thriving and healthy
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {careTips.map((tip, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ y: -8, scale: 1.02 }}
                className="bg-white p-8 rounded-xl shadow-md hover:shadow-2xl transition-all duration-300 group cursor-pointer"
              >
                <motion.div
                  className="mb-4"
                  whileHover={{ rotate: [0, -10, 10, -10, 0], scale: 1.1 }}
                  transition={{ duration: 0.5 }}
                >
                  {tip.icon}
                </motion.div>
                <h3 className="text-xl font-bold text-[#2F5233] mb-3 font-serif group-hover:text-[#4A7C59] transition-colors">
                  {tip.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">{tip.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Meet Our Green Experts Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <p className="text-[#4A7C59] font-semibold mb-2 tracking-wide uppercase text-sm">
              Our Team
            </p>
            <h2 className="section-heading">Meet Our Green Experts</h2>
            <p className="section-subtitle">
              Passionate plant care specialists ready to help you succeed
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {experts.map((expert, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                viewport={{ once: true }}
                whileHover={{ y: -8 }}
                className="group text-center transition-transform duration-300 cursor-pointer"
              >
                <div className="relative mb-6 overflow-hidden rounded-2xl shadow-lg group-hover:shadow-2xl transition-shadow duration-300">
                  <img
                    src={expert.image}
                    alt={expert.name}
                    className="w-full h-80 object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#2F5233]/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-center pb-6">
                    <motion.p
                      initial={{ y: 20, opacity: 0 }}
                      whileInView={{ y: 0, opacity: 1 }}
                      transition={{ delay: 0.2 }}
                      className="text-white font-semibold opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    >
                      Connect with {expert.name.split(' ')[0]}
                    </motion.p>
                  </div>
                </div>
                <h3 className="text-2xl font-bold text-[#2F5233] mb-2 font-serif group-hover:text-[#4A7C59] transition-colors">
                  {expert.name}
                </h3>
                <p className="text-[#4A7C59] font-semibold mb-2">{expert.specialization}</p>
                <p className="text-gray-600">{expert.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Extra Section - Plant of the Week */}
      <section className="py-20 bg-gradient-to-br from-[#2F5233] to-[#1a2e1a] text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute -top-20 -left-20 w-96 h-96 bg-[#4A7C59] rounded-full blur-3xl"></div>
          <div className="absolute -bottom-20 -right-20 w-96 h-96 bg-[#8B9D83] rounded-full blur-3xl"></div>
        </div>
        
        <div className="container mx-auto px-4 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <p className="text-[#8B9D83] font-semibold mb-2 tracking-wide uppercase text-sm">
                Featured This Week
              </p>
              <h2 className="text-4xl lg:text-5xl font-bold mb-6 font-serif">
                Plant of the Week
              </h2>
              <p className="text-xl text-gray-300 mb-8 leading-relaxed">
                Discover our handpicked featured plant! This week we're showcasing the stunning Aglaonema Red, a perfect blend of beauty and air-purifying power. Transform your space with this low-maintenance showstopper.
              </p>
              <ul className="space-y-4 mb-8">
                <li className="flex items-start gap-3">
                  <FaStar className="text-yellow-500 mt-1 flex-shrink-0" />
                  <span>Rated 4.9/5 by our community</span>
                </li>
                <li className="flex items-start gap-3">
                  <FaLeaf className="text-green-400 mt-1 flex-shrink-0" />
                  <span>Natural air purifier & mood booster</span>
                </li>
                <li className="flex items-start gap-3">
                  <FaSeedling className="text-green-400 mt-1 flex-shrink-0" />
                  <span>Easy care - perfect for beginners</span>
                </li>
              </ul>
              <div className="flex gap-4">
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Link
                    to="/plant/6"
                    className="btn bg-white text-[#2F5233] hover:bg-gray-100 border-none px-8 shadow-xl hover:shadow-2xl transition-all duration-300"
                  >
                    View Details
                  </Link>
                </motion.div>
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Link
                    to="/plants"
                    className="btn btn-outline text-white hover:bg-white hover:text-[#2F5233] border-white px-8 shadow-lg hover:shadow-xl transition-all duration-300"
                  >
                    Explore All
                  </Link>
                </motion.div>
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="relative"
            >
              <div className="absolute -top-10 -right-10 w-64 h-64 bg-[#4A7C59] rounded-full blur-3xl opacity-20 float-animation"></div>
              <motion.img
                whileHover={{ scale: 1.03, rotate: 1 }}
                transition={{ duration: 0.3 }}
                src="/assets/plant_images/Aglaonema_red.jpg"
                alt="Plant of the Week"
                className="relative rounded-2xl shadow-2xl w-full h-[500px] object-cover hover:shadow-3xl transition-shadow duration-300"
                onError={(e) => {
                  e.target.src = 'https://via.placeholder.com/500x500?text=Featured+Plant';
                }}
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Newsletter/CTA Section */}
      <section className="py-16 bg-[#8B9D83] relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-1/4 w-64 h-64 bg-white rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-[#4A7C59] rounded-full blur-3xl"></div>
        </div>
        
        <div className="container mx-auto px-4 lg:px-8 text-center relative z-10">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-3xl lg:text-4xl font-bold text-white mb-4 font-serif"
          >
            Get Weekly Plant Care Tips
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className="text-white/90 text-lg mb-8 max-w-2xl mx-auto"
          >
            Join our community of plant lovers and receive expert care tips, exclusive offers, and new arrivals directly to your inbox.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            viewport={{ once: true }}
            className="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto"
          >
            <input
              type="email"
              placeholder="Enter your email"
              className="input input-bordered flex-1 bg-white text-gray-900 placeholder:text-gray-400 focus:ring-2 focus:ring-white focus:outline-none rounded-lg shadow-md"
            />
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="btn bg-[#2F5233] hover:bg-[#1a2e1a] text-white border-none px-8 rounded-lg normal-case shadow-lg hover:shadow-xl transition-all duration-300"
            >
              Subscribe
            </motion.button>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Home;
