import { useState, useContext, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router';
import { FaStar, FaLeaf, FaSun, FaTint, FaSeedling, FaCheckCircle } from 'react-icons/fa';
import { Leaf, Phone, Calendar } from 'lucide-react';
import { motion } from 'motion/react';
import { AuthContext } from '../context/AuthProvider';
import { toast } from 'react-toastify';
import plantsData from '../data/plants.json';

const PlantDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);
  const [plant, setPlant] = useState(null);
  const [notFound, setNotFound] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    preferredDate: '',
    message: ''
  });

  useEffect(() => {
    // Find plant by ID
    const foundPlant = plantsData.find(p => p.id === parseInt(id));
    if (foundPlant) {
      setPlant(foundPlant);
      setNotFound(false);
    } else {
      setNotFound(true);
    }
  }, [id]);

  useEffect(() => {
    // Pre-fill user data if logged in
    if (user) {
      setFormData(prev => ({
        ...prev,
        name: user.displayName || '',
        email: user.email || ''
      }));
    }
  }, [user]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    
    // For phone number, only allow digits and limit to 11 characters
    if (name === 'phone') {
      const digitsOnly = value.replace(/\D/g, '').slice(0, 11);
      setFormData(prev => ({ ...prev, [name]: digitsOnly }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    try {
      // Validation
      if (!formData.name || !formData.email || !formData.phone || !formData.preferredDate) {
        toast.error('Please fill in all required fields!');
        return;
      }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      toast.error('Please enter a valid email address!');
      return;
    }

    // Phone validation (11 digits)
    const phoneRegex = /^[0-9]{11}$/;
    if (!phoneRegex.test(formData.phone.replace(/\s/g, ''))) {
      toast.error('Please enter a valid 11-digit phone number!');
      return;
    }

    // Success (no backend, just UI)
    toast.success(`Consultation booked for ${plant.name}! We'll contact you soon.`);
    
    // Debug info for Chrome issues
    console.log('Consultation form submitted successfully:', {
      plant: plant.name,
      user: user?.email || 'Guest',
      timestamp: new Date().toISOString(),
      browser: navigator.userAgent
    });
    
      // Reset form
      setFormData({
        name: user?.displayName || '',
        email: user?.email || '',
        phone: '',
        preferredDate: '',
        message: ''
      });

      // Scroll to top
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } catch (error) {
      console.error('Consultation form error:', error);
      toast.error('Something went wrong. Please try again.');
    }
  };

  // Loading state
  if (!plant && !notFound) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-white to-green-50">
        <div className="text-center">
          <span className="loading loading-spinner loading-lg text-[#4A7C59]"></span>
          <p className="mt-4 text-gray-600">Loading plant details...</p>
        </div>
      </div>
    );
  }

  // 404 - Plant not found
  if (notFound) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-white to-green-50">
        <div className="text-center px-4">
          <div className="mb-6 flex justify-center">
            <Leaf className="text-[#4A7C59]" size={96} />
          </div>
          <h1 className="text-4xl font-bold text-[#2F5233] mb-4 font-serif">
            Plant Not Found
          </h1>
          <p className="text-xl text-gray-600 mb-8">
            Sorry, we couldn't find the plant you're looking for.
          </p>
          <div className="flex gap-4 justify-center">
            <button
              onClick={() => navigate('/plants')}
              className="btn bg-[#4A7C59] hover:bg-[#2F5233] text-white rounded-lg normal-case"
            >
              Browse All Plants
            </button>
            <button
              onClick={() => navigate('/')}
              className="btn btn-outline border-[#4A7C59] text-[#4A7C59] hover:bg-[#4A7C59] hover:text-white rounded-lg normal-case"
            >
              Go Home
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-green-50">
      {/* Plant Details Section */}
      <div className="container mx-auto px-4 py-12">
        {/* Back Button */}
        <motion.button
          onClick={() => navigate('/plants')}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          whileHover={{ x: -5 }}
          className="btn btn-ghost text-[#4A7C59] mb-6"
        >
          ← Back to Plants
        </motion.button>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Image Section */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="relative"
          >
            <motion.img
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.3 }}
              src={plant.image}
              alt={plant.name}
              className="w-full h-[500px] object-cover rounded-2xl shadow-2xl hover:shadow-3xl transition-shadow duration-300"
              onError={(e) => {
                e.target.src = 'https://via.placeholder.com/500x500?text=Plant+Image';
              }}
            />
            {plant.inStock && (
              <motion.div
                initial={{ scale: 0, rotate: -180 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ type: 'spring', stiffness: 200, delay: 0.3 }}
                className="badge badge-success absolute top-6 right-6 text-white font-semibold p-4 shadow-lg"
              >
                <FaCheckCircle className="mr-2" /> In Stock
              </motion.div>
            )}
          </motion.div>

          {/* Details Section */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="badge badge-outline border-[#4A7C59] text-[#4A7C59] mb-4">
              {plant.category}
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-[#2F5233] font-serif mb-2">
              {plant.name}
            </h1>
            <p className="text-xl text-gray-500 italic mb-4">{plant.scientificName}</p>

            {/* Rating and Price */}
            <div className="flex items-center gap-6 mb-6 pb-6 border-b border-gray-100">
              <div className="flex items-center gap-2">
                <FaStar className="text-yellow-500 text-2xl" />
                <span className="text-2xl font-bold">{plant.rating}</span>
                <span className="text-gray-400">/5</span>
              </div>
              <div className="text-4xl font-bold text-[#4A7C59]">
                ৳{plant.price}
              </div>
            </div>

            {/* Quick Info Cards */}
            <div className="grid grid-cols-2 gap-4 mb-6">
              {[
                { icon: <FaSeedling className="text-[#4A7C59] text-2xl mb-2" />, label: 'Difficulty', value: plant.difficulty, color: 'border-[#4A7C59]', bgColor: 'bg-emerald-50', delay: 0 },
                { icon: <FaSun className="text-amber-500 text-2xl mb-2" />, label: 'Light', value: plant.lightRequirement, color: 'border-amber-500', bgColor: 'bg-amber-50', delay: 0.1 },
                { icon: <FaTint className="text-blue-500 text-2xl mb-2" />, label: 'Watering', value: plant.wateringFrequency, color: 'border-blue-500', bgColor: 'bg-blue-50', delay: 0.2 },
                { icon: <FaLeaf className="text-emerald-500 text-2xl mb-2" />, label: 'Category', value: plant.category, color: 'border-emerald-500', bgColor: 'bg-emerald-50', delay: 0.3 }
              ].map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.4 + item.delay }}
                  whileHover={{ y: -5, scale: 1.02 }}
                  className={`${item.bgColor} p-5 rounded-xl shadow-md hover:shadow-xl transition-all duration-300 border-l-4 ${item.color} cursor-pointer`}
                >
                  <motion.div whileHover={{ rotate: 360 }} transition={{ duration: 0.6 }}>
                    {item.icon}
                  </motion.div>
                  <p className="text-gray-600 text-xs font-semibold uppercase tracking-wide mb-1">{item.label}</p>
                  <p className="font-bold text-[#2F5233] text-lg">{item.value}</p>
                </motion.div>
              ))}
            </div>

            {/* Book Consultation Button */}
            <motion.a
              href="#consultation-form"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="btn bg-[#4A7C59] hover:bg-[#2F5233] text-white text-lg w-full mb-3 border-none normal-case rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 inline-flex items-center justify-center gap-2"
            >
              <Phone size={20} /> Book Free Consultation
            </motion.a>

            <p className="text-center text-gray-500 text-sm leading-relaxed inline-flex items-center justify-center gap-1">
              Get expert advice on how to care for your {plant.name} <Leaf size={16} />
            </p>
          </motion.div>
        </div>

        {/* Detailed Information Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-16"
        >
          <div role="tablist" className="tabs tabs-boxed bg-white shadow-lg rounded-xl p-2 gap-3">
            <input 
              type="radio" 
              name="plant_tabs" 
              role="tab" 
              className="tab text-base font-semibold px-6 py-3 rounded-lg transition-all duration-300 data-[state=active]:bg-[#4A7C59] data-[state=active]:text-white hover:bg-green-50" 
              aria-label="Description" 
              defaultChecked 
            />
            <div role="tabpanel" className="tab-content bg-white border border-gray-100 rounded-xl shadow-md p-8 mt-6">
              <h2 className="text-2xl md:text-3xl font-bold text-[#2F5233] mb-6 font-serif flex items-center gap-3">
                <span className="w-1.5 h-8 bg-[#4A7C59] rounded-full"></span>
                About This Plant
              </h2>
              <p className="text-gray-700 leading-relaxed text-lg">{plant.description}</p>
            </div>

            <input 
              type="radio" 
              name="plant_tabs" 
              role="tab" 
              className="tab text-base font-semibold px-6 py-3 rounded-lg transition-all duration-300 data-[state=active]:bg-[#4A7C59] data-[state=active]:text-white hover:bg-green-50" 
              aria-label="Care Guide" 
            />
            <div role="tabpanel" className="tab-content bg-white border border-gray-100 rounded-xl shadow-md p-8 mt-6">
              <h2 className="text-2xl md:text-3xl font-bold text-[#2F5233] mb-6 font-serif flex items-center gap-3">
                <span className="w-1.5 h-8 bg-[#4A7C59] rounded-full"></span>
                Care Instructions
              </h2>
              <p className="text-gray-700 leading-relaxed text-lg">{plant.careInstructions}</p>
            </div>

            <input 
              type="radio" 
              name="plant_tabs" 
              role="tab" 
              className="tab text-base font-semibold px-6 py-3 rounded-lg transition-all duration-300 data-[state=active]:bg-[#4A7C59] data-[state=active]:text-white hover:bg-green-50" 
              aria-label="Benefits" 
            />
            <div role="tabpanel" className="tab-content bg-white border border-gray-100 rounded-xl shadow-md p-8 mt-6">
              <h2 className="text-2xl md:text-3xl font-bold text-[#2F5233] mb-6 font-serif flex items-center gap-3">
                <span className="w-1.5 h-8 bg-[#4A7C59] rounded-full"></span>
                Benefits
              </h2>
              <p className="text-gray-700 leading-relaxed text-lg">{plant.benefits}</p>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Consultation Form Section */}
      <div id="consultation-form" className="bg-white py-16 relative overflow-hidden">
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-0 left-0 w-64 h-64 bg-[#4A7C59] rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-[#8B9D83] rounded-full blur-3xl"></div>
        </div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="text-center mb-10"
            >
              <h2 className="text-3xl md:text-4xl font-bold text-[#2F5233] mb-4 font-serif">
                Book Consultation for {plant.name}
              </h2>
              <p className="text-gray-600 text-lg">
                Fill in your details and our plant experts will contact you soon!
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
              className="bg-white shadow-2xl rounded-2xl p-8 border border-gray-100 hover:shadow-3xl transition-shadow duration-300"
            >
              <form onSubmit={handleSubmit}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Name */}
                  <div className="form-control">
                    <label className="label">
                      <span className="label-text font-semibold text-gray-700">Name *</span>
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      placeholder="Your full name"
                      className="input input-bordered w-full bg-gray-50 text-gray-900 placeholder:text-gray-400 focus:outline-none focus:border-[#4A7C59] focus:ring-2 focus:ring-[#4A7C59] rounded-lg"
                      required
                    />
                  </div>

                  {/* Email */}
                  <div className="form-control">
                    <label className="label">
                      <span className="label-text font-semibold text-gray-700">Email *</span>
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      placeholder="your.email@example.com"
                      className="input input-bordered w-full bg-gray-50 text-gray-900 placeholder:text-gray-400 focus:outline-none focus:border-[#4A7C59] focus:ring-2 focus:ring-[#4A7C59] rounded-lg"
                      required
                    />
                  </div>

                  {/* Phone */}
                  <div className="form-control">
                    <label className="label">
                      <span className="label-text font-semibold text-gray-700">Phone Number *</span>
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      placeholder="11-digit mobile number"
                      maxLength="11"
                      pattern="[0-9]{11}"
                      className="input input-bordered w-full bg-gray-50 text-gray-900 placeholder:text-gray-400 focus:outline-none focus:border-[#4A7C59] focus:ring-2 focus:ring-[#4A7C59] rounded-lg"
                      required
                    />
                  </div>

                  {/* Preferred Date */}
                  <div className="form-control">
                    <label className="label">
                      <span className="label-text font-semibold text-gray-700">Preferred Date *</span>
                    </label>
                    <input
                      type="date"
                      name="preferredDate"
                      value={formData.preferredDate}
                      onChange={handleInputChange}
                      min={new Date().toISOString().split('T')[0]}
                      className="input input-bordered w-full bg-gray-50 text-gray-900 placeholder:text-gray-400 focus:outline-none focus:border-[#4A7C59] focus:ring-2 focus:ring-[#4A7C59] rounded-lg"
                      required
                    />
                  </div>
                </div>

                {/* Message - Full Width */}
                <div className="form-control mt-6">
                  <label className="label">
                    <span className="label-text font-semibold text-gray-700">Message (Optional)</span>
                  </label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    placeholder="Any specific questions or concerns?"
                    className="textarea textarea-bordered h-32 w-full bg-gray-50 text-gray-900 placeholder:text-gray-400 focus:outline-none focus:border-[#4A7C59] focus:ring-2 focus:ring-[#4A7C59] rounded-lg"
                  />
                </div>

                {/* Submit Button */}
                <motion.div
                  className="mt-8"
                  whileHover={{ scale: 1.01 }}
                  whileTap={{ scale: 0.99 }}
                >
                  <button
                    type="submit"
                    className="btn bg-[#4A7C59] hover:bg-[#2F5233] text-white text-lg w-full border-none normal-case rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 inline-flex items-center justify-center gap-2"
                  >
                    <Calendar size={20} /> Book Consultation
                  </button>
                </motion.div>
              </form>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlantDetails;
