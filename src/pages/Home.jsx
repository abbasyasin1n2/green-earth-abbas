import { useEffect, useState } from 'react';
import { Link } from 'react-router';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, Navigation, EffectFade } from 'swiper/modules';
import { FaStar, FaStarHalfAlt, FaWater, FaSun, FaSeedling, FaLeaf, FaArrowRight } from 'react-icons/fa';
import plantsData from '../data/plants.json';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import 'swiper/css/effect-fade';

// Import hero images
import heroImage1 from '../assets/hero_images/1st_swipe_image.webp';
import heroImage2 from '../assets/hero_images/2md_swipe_image.png';
import heroImage3 from '../assets/hero_images/3rd_swipe_leftside_image.jpg';

// Import expert images
import expert1 from '../assets/plant_experts/closeup-portrait-woman-smiling-holding-flower-florist-replanting-flowers-ceramic-pot-using-shovel-gloves-fertil-soil-flowers-house-decoration.jpg';
import expert2 from '../assets/plant_experts/medium-shot-man-looking-plant.jpg';
import expert3 from '../assets/plant_experts/portrait-man-growing-plants.jpg';

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
      <section className="relative h-[600px] lg:h-[700px]">
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
              <div className="relative h-full container mx-auto px-4 flex items-center">
                <div className="text-white max-w-2xl">
                  <h1 className="text-5xl lg:text-7xl font-bold mb-6 font-serif leading-tight">
                    Bring Nature to Your Home
                  </h1>
                  <p className="text-xl lg:text-2xl mb-8 text-gray-200">
                    Discover our collection of beautiful, healthy indoor plants that purify your air and brighten your space
                  </p>
                  <Link
                    to="/plants"
                    className="btn bg-[#4A7C59] hover:bg-[#2F5233] text-white border-none px-8 py-4 text-lg"
                  >
                    Shop Now <FaArrowRight className="ml-2" />
                  </Link>
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
              <div className="relative h-full container mx-auto px-4 flex items-center">
                <div className="text-white max-w-2xl">
                  <h1 className="text-5xl lg:text-7xl font-bold mb-6 font-serif leading-tight">
                    Greener Living Starts Here
                  </h1>
                  <p className="text-xl lg:text-2xl mb-8 text-gray-200">
                    Expert care guides, premium plants, and everything you need for a thriving indoor garden
                  </p>
                  <Link
                    to="/plants"
                    className="btn bg-[#4A7C59] hover:bg-[#2F5233] text-white border-none px-8 py-4 text-lg"
                  >
                    Explore Plants <FaArrowRight className="ml-2" />
                  </Link>
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
              <div className="relative h-full container mx-auto px-4 flex items-center">
                <div className="text-white max-w-2xl">
                  <h1 className="text-5xl lg:text-7xl font-bold mb-6 font-serif leading-tight">
                    Your Plant Journey Begins
                  </h1>
                  <p className="text-xl lg:text-2xl mb-8 text-gray-200">
                    From beginner-friendly to rare species, find the perfect plant companion today
                  </p>
                  <Link
                    to="/plants"
                    className="btn bg-[#4A7C59] hover:bg-[#2F5233] text-white border-none px-8 py-4 text-lg"
                  >
                    Get Started <FaArrowRight className="ml-2" />
                  </Link>
                </div>
              </div>
            </div>
          </SwiperSlide>
        </Swiper>
      </section>

      {/* Top Rated Indoor Plants Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="text-center mb-16">
            <p className="text-[#4A7C59] font-semibold mb-2 tracking-wide uppercase text-sm">
              Best Sellers
            </p>
            <h2 className="section-heading">Top Rated Indoor Plants</h2>
            <p className="section-subtitle">
              Handpicked collection of our most loved plants, perfect for creating your urban jungle
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {topPlants.map((plant) => (
              <div
                key={plant.id}
                className="card bg-base-100 shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-2"
              >
                <figure className="relative px-0 pt-0 h-64 overflow-hidden">
                  <img
                    src={plant.image}
                    alt={plant.name}
                    className="w-full h-full object-cover hover:scale-110 transition-transform duration-500"
                    onError={(e) => {
                      e.target.src = 'https://via.placeholder.com/400x300?text=Plant+Image';
                    }}
                  />
                  {plant.inStock && (
                    <div className="badge badge-success absolute top-4 right-4 text-white font-semibold">
                      In Stock
                    </div>
                  )}
                </figure>
                <div className="card-body">
                  <h2 className="card-title text-[#2F5233] font-serif">
                    {plant.name}
                    <div className="badge badge-outline border-[#4A7C59] text-[#4A7C59]">
                      {plant.category}
                    </div>
                  </h2>
                  <p className="text-sm text-gray-500 italic">{plant.scientificName}</p>
                  <p className="text-gray-600 text-sm line-clamp-2">{plant.description}</p>
                  
                  {/* Plant Info */}
                  <div className="flex flex-wrap gap-2 mt-2">
                    <div className="badge badge-sm bg-green-100 text-green-700 border-green-200">
                      {plant.difficulty}
                    </div>
                    <div className="badge badge-sm bg-yellow-100 text-yellow-700 border-yellow-200">
                      {plant.lightRequirement}
                    </div>
                  </div>

                  {/* Rating and Price */}
                  <div className="flex items-center justify-between mt-4">
                    <div className="flex items-center gap-1">
                      <FaStar className="text-yellow-500" />
                      <span className="font-bold">{plant.rating}</span>
                      <span className="text-gray-500 text-sm">/5</span>
                    </div>
                    <div className="text-2xl font-bold text-[#2F5233]">
                      ৳{plant.price}
                    </div>
                  </div>

                  {/* View Details Button */}
                  <div className="card-actions justify-end mt-4">
                    <Link
                      to={`/plant/${plant.id}`}
                      className="btn bg-[#4A7C59] hover:bg-[#2F5233] text-white w-full"
                    >
                      View Details
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link
              to="/plants"
              className="btn bg-[#4A7C59] hover:bg-[#2F5233] text-white border-none px-8"
            >
              View All Plants <FaArrowRight className="ml-2" />
            </Link>
          </div>
        </div>
      </section>

      {/* Plant Care Tips Section */}
      <section className="py-20 bg-[#F5F1E8]">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="text-center mb-16">
            <p className="text-[#4A7C59] font-semibold mb-2 tracking-wide uppercase text-sm">
              Expert Advice
            </p>
            <h2 className="section-heading">Plant Care Tips</h2>
            <p className="section-subtitle">
              Essential care guidelines to keep your plants thriving and healthy
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {careTips.map((tip, index) => (
              <div
                key={index}
                className="bg-white p-8 rounded-xl shadow-md hover:shadow-xl transition-shadow duration-300"
              >
                <div className="mb-4">{tip.icon}</div>
                <h3 className="text-xl font-bold text-[#2F5233] mb-3 font-serif">
                  {tip.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">{tip.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Meet Our Green Experts Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="text-center mb-16">
            <p className="text-[#4A7C59] font-semibold mb-2 tracking-wide uppercase text-sm">
              Our Team
            </p>
            <h2 className="section-heading">Meet Our Green Experts</h2>
            <p className="section-subtitle">
              Passionate plant care specialists ready to help you succeed
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {experts.map((expert, index) => (
              <div
                key={index}
                className="group text-center hover:-translate-y-2 transition-transform duration-300"
              >
                <div className="relative mb-6 overflow-hidden rounded-2xl shadow-lg">
                  <img
                    src={expert.image}
                    alt={expert.name}
                    className="w-full h-80 object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </div>
                <h3 className="text-2xl font-bold text-[#2F5233] mb-2 font-serif">
                  {expert.name}
                </h3>
                <p className="text-[#4A7C59] font-semibold mb-2">{expert.specialization}</p>
                <p className="text-gray-600">{expert.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Extra Section - Plant of the Week */}
      <section className="py-20 bg-gradient-to-br from-[#2F5233] to-[#1a2e1a] text-white">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
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
                <Link
                  to="/plant/6"
                  className="btn bg-white text-[#2F5233] hover:bg-gray-100 border-none px-8"
                >
                  View Details
                </Link>
                <Link
                  to="/plants"
                  className="btn btn-outline text-white hover:bg-white hover:text-[#2F5233] border-white px-8"
                >
                  Explore All
                </Link>
              </div>
            </div>
            <div className="relative">
              <div className="absolute -top-10 -right-10 w-64 h-64 bg-[#4A7C59] rounded-full blur-3xl opacity-20"></div>
              <img
                src="/src/assets/plant_images/Aglaonema_red.jpg"
                alt="Plant of the Week"
                className="relative rounded-2xl shadow-2xl w-full h-[500px] object-cover"
                onError={(e) => {
                  e.target.src = 'https://via.placeholder.com/500x500?text=Featured+Plant';
                }}
              />
            </div>
          </div>
        </div>
      </section>

      {/* Newsletter/CTA Section */}
      <section className="py-16 bg-[#8B9D83]">
        <div className="container mx-auto px-4 lg:px-8 text-center">
          <h2 className="text-3xl lg:text-4xl font-bold text-white mb-4 font-serif">
            Get Weekly Plant Care Tips
          </h2>
          <p className="text-white/90 text-lg mb-8 max-w-2xl mx-auto">
            Join our community of plant lovers and receive expert care tips, exclusive offers, and new arrivals directly to your inbox.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto">
            <input
              type="email"
              placeholder="Enter your email"
              className="input input-bordered flex-1 bg-white"
            />
            <button className="btn bg-[#2F5233] hover:bg-[#1a2e1a] text-white border-none px-8">
              Subscribe
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
