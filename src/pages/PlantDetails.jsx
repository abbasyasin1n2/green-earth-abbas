import { useState, useContext, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router';
import { FaStar, FaLeaf, FaSun, FaTint, FaSeedling, FaCheckCircle } from 'react-icons/fa';
import { AuthContext } from '../context/AuthProvider';
import { toast } from 'react-toastify';
import plantsData from '../data/plants.json';

const PlantDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);
  const [plant, setPlant] = useState(null);
  const [showModal, setShowModal] = useState(false);
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
    } else {
      toast.error('Plant not found!');
      navigate('/plants');
    }
  }, [id, navigate]);

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
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

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

    // Phone validation (basic)
    const phoneRegex = /^[0-9]{10}$/;
    if (!phoneRegex.test(formData.phone.replace(/\s/g, ''))) {
      toast.error('Please enter a valid 10-digit phone number!');
      return;
    }

    // Success (no backend, just UI)
    toast.success(`Consultation booked for ${plant.name}! We'll contact you soon. 🌿`);
    setShowModal(false);
    
    // Reset form
    setFormData({
      name: user?.displayName || '',
      email: user?.email || '',
      phone: '',
      preferredDate: '',
      message: ''
    });
  };

  if (!plant) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <span className="loading loading-spinner loading-lg text-[#4A7C59]"></span>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-green-50">
      {/* Plant Details Section */}
      <div className="container mx-auto px-4 py-12">
        {/* Back Button */}
        <button
          onClick={() => navigate('/plants')}
          className="btn btn-ghost text-[#4A7C59] mb-6"
        >
          ← Back to Plants
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Image Section */}
          <div className="relative">
            <img
              src={plant.image}
              alt={plant.name}
              className="w-full h-[500px] object-cover rounded-2xl shadow-2xl"
            />
            {plant.inStock && (
              <div className="badge badge-success absolute top-6 right-6 text-white font-semibold p-4">
                <FaCheckCircle className="mr-2" /> In Stock
              </div>
            )}
          </div>

          {/* Details Section */}
          <div>
            <div className="badge badge-outline border-[#4A7C59] text-[#4A7C59] mb-4">
              {plant.category}
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-[#2F5233] font-serif mb-2">
              {plant.name}
            </h1>
            <p className="text-xl text-gray-500 italic mb-4">{plant.scientificName}</p>

            {/* Rating and Price */}
            <div className="flex items-center gap-6 mb-6">
              <div className="flex items-center gap-2">
                <FaStar className="text-yellow-500 text-2xl" />
                <span className="text-2xl font-bold">{plant.rating}</span>
                <span className="text-gray-500">/5</span>
              </div>
              <div className="text-4xl font-bold text-[#2F5233]">
                ৳{plant.price}
              </div>
            </div>

            {/* Quick Info Cards */}
            <div className="grid grid-cols-2 gap-4 mb-6">
              <div className="bg-white p-4 rounded-lg shadow-md border-l-4 border-[#4A7C59]">
                <FaSeedling className="text-[#4A7C59] text-2xl mb-2" />
                <p className="text-gray-600 text-sm">Difficulty</p>
                <p className="font-bold text-[#2F5233]">{plant.difficulty}</p>
              </div>
              <div className="bg-white p-4 rounded-lg shadow-md border-l-4 border-yellow-500">
                <FaSun className="text-yellow-500 text-2xl mb-2" />
                <p className="text-gray-600 text-sm">Light</p>
                <p className="font-bold text-[#2F5233]">{plant.lightRequirement}</p>
              </div>
              <div className="bg-white p-4 rounded-lg shadow-md border-l-4 border-blue-500">
                <FaTint className="text-blue-500 text-2xl mb-2" />
                <p className="text-gray-600 text-sm">Watering</p>
                <p className="font-bold text-[#2F5233]">{plant.wateringFrequency}</p>
              </div>
              <div className="bg-white p-4 rounded-lg shadow-md border-l-4 border-green-500">
                <FaLeaf className="text-green-500 text-2xl mb-2" />
                <p className="text-gray-600 text-sm">Category</p>
                <p className="font-bold text-[#2F5233]">{plant.category}</p>
              </div>
            </div>

            {/* Book Consultation Button */}
            <button
              onClick={() => setShowModal(true)}
              className="btn bg-[#4A7C59] hover:bg-[#2F5233] text-white text-lg w-full mb-4"
            >
              Book Free Consultation
            </button>

            <p className="text-center text-gray-500 text-sm">
              Get expert advice on how to care for your {plant.name}
            </p>
          </div>
        </div>

        {/* Detailed Information Tabs */}
        <div className="mt-16">
          <div role="tablist" className="tabs tabs-boxed bg-white shadow-md">
            <input type="radio" name="plant_tabs" role="tab" className="tab" aria-label="Description" defaultChecked />
            <div role="tabpanel" className="tab-content bg-base-100 border-base-300 rounded-box p-6 mt-6">
              <h2 className="text-2xl font-bold text-[#2F5233] mb-4">About This Plant</h2>
              <p className="text-gray-700 leading-relaxed">{plant.description}</p>
            </div>

            <input type="radio" name="plant_tabs" role="tab" className="tab" aria-label="Care Guide" />
            <div role="tabpanel" className="tab-content bg-base-100 border-base-300 rounded-box p-6 mt-6">
              <h2 className="text-2xl font-bold text-[#2F5233] mb-4">Care Instructions</h2>
              <p className="text-gray-700 leading-relaxed">{plant.careInstructions}</p>
            </div>

            <input type="radio" name="plant_tabs" role="tab" className="tab" aria-label="Benefits" />
            <div role="tabpanel" className="tab-content bg-base-100 border-base-300 rounded-box p-6 mt-6">
              <h2 className="text-2xl font-bold text-[#2F5233] mb-4">Benefits</h2>
              <p className="text-gray-700 leading-relaxed">{plant.benefits}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Consultation Modal */}
      {showModal && (
        <div className="modal modal-open">
          <div className="modal-box max-w-2xl">
            <h3 className="font-bold text-2xl text-[#2F5233] mb-4">
              Book Consultation for {plant.name}
            </h3>
            <p className="text-gray-600 mb-6">
              Fill in your details and our plant experts will contact you soon!
            </p>

            <form onSubmit={handleSubmit}>
              {/* Name */}
              <div className="form-control mb-4">
                <label className="label">
                  <span className="label-text font-medium">Name *</span>
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder="Your full name"
                  className="input input-bordered focus:outline-none focus:border-[#4A7C59]"
                  required
                />
              </div>

              {/* Email */}
              <div className="form-control mb-4">
                <label className="label">
                  <span className="label-text font-medium">Email *</span>
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="your.email@example.com"
                  className="input input-bordered focus:outline-none focus:border-[#4A7C59]"
                  required
                />
              </div>

              {/* Phone */}
              <div className="form-control mb-4">
                <label className="label">
                  <span className="label-text font-medium">Phone Number *</span>
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  placeholder="10-digit mobile number"
                  className="input input-bordered focus:outline-none focus:border-[#4A7C59]"
                  required
                />
              </div>

              {/* Preferred Date */}
              <div className="form-control mb-4">
                <label className="label">
                  <span className="label-text font-medium">Preferred Date *</span>
                </label>
                <input
                  type="date"
                  name="preferredDate"
                  value={formData.preferredDate}
                  onChange={handleInputChange}
                  min={new Date().toISOString().split('T')[0]}
                  className="input input-bordered focus:outline-none focus:border-[#4A7C59]"
                  required
                />
              </div>

              {/* Message */}
              <div className="form-control mb-6">
                <label className="label">
                  <span className="label-text font-medium">Message (Optional)</span>
                </label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  placeholder="Any specific questions or concerns?"
                  className="textarea textarea-bordered h-24 focus:outline-none focus:border-[#4A7C59]"
                />
              </div>

              {/* Buttons */}
              <div className="modal-action">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="btn btn-outline"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="btn bg-[#4A7C59] hover:bg-[#2F5233] text-white"
                >
                  Book Consultation
                </button>
              </div>
            </form>
          </div>
          <div className="modal-backdrop" onClick={() => setShowModal(false)}></div>
        </div>
      )}
    </div>
  );
};

export default PlantDetails;
