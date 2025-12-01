import { useState, useEffect } from 'react';
import { Link } from 'react-router';
import { FaStar, FaSearch, FaFilter, FaSortAmountDown, FaSortAmountUp } from 'react-icons/fa';
import { Sprout } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import plantsData from '../data/plants.json';

const Plants = () => {
  const [plants, setPlants] = useState(plantsData);
  const [filteredPlants, setFilteredPlants] = useState(plantsData);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedDifficulty, setSelectedDifficulty] = useState('All');
  const [selectedLight, setSelectedLight] = useState('All');
  const [sortOrder, setSortOrder] = useState('default');

  // Get unique categories, difficulties, and light requirements
  const categories = ['All', ...new Set(plants.map(plant => plant.category))];
  const difficulties = ['All', ...new Set(plants.map(plant => plant.difficulty))];
  const lightRequirements = ['All', ...new Set(plants.map(plant => plant.lightRequirement))];

  // Apply filters and sorting
  useEffect(() => {
    let result = [...plants];

    // Search filter
    if (searchTerm) {
      result = result.filter(plant =>
        plant.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        plant.scientificName.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Category filter
    if (selectedCategory !== 'All') {
      result = result.filter(plant => plant.category === selectedCategory);
    }

    // Difficulty filter
    if (selectedDifficulty !== 'All') {
      result = result.filter(plant => plant.difficulty === selectedDifficulty);
    }

    // Light requirement filter
    if (selectedLight !== 'All') {
      result = result.filter(plant => plant.lightRequirement === selectedLight);
    }

    // Price sorting
    if (sortOrder === 'asc') {
      result.sort((a, b) => a.price - b.price);
    } else if (sortOrder === 'desc') {
      result.sort((a, b) => b.price - a.price);
    }

    setFilteredPlants(result);
  }, [searchTerm, selectedCategory, selectedDifficulty, selectedLight, sortOrder, plants]);

  // Reset filters
  const resetFilters = () => {
    setSearchTerm('');
    setSelectedCategory('All');
    setSelectedDifficulty('All');
    setSelectedLight('All');
    setSortOrder('default');
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-green-50">
      {/* Header Section */}
      <div className="bg-[#2F5233] text-white py-16 pt-28 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 right-0 w-96 h-96 bg-[#4A7C59] rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-[#8B9D83] rounded-full blur-3xl"></div>
        </div>
        
        <div className="container mx-auto px-4 relative z-10">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-4xl md:text-5xl font-bold text-center font-serif mb-4"
          >
            Our Plant Collection
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-center text-green-100 text-lg max-w-2xl mx-auto"
          >
            Discover the perfect green companion for your space. From easy-care beginners to exotic beauties.
          </motion.p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        {/* Search and Filter Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-white rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 p-6 mb-8"
        >
          {/* Search Bar */}
          <div className="mb-6">
            <div className="relative">
              <input
                type="text"
                placeholder="Search plants by name or scientific name..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="input input-bordered w-full pl-12 bg-gray-50 text-gray-900 placeholder:text-gray-400 focus:outline-none focus:border-[#4A7C59] focus:ring-2 focus:ring-[#4A7C59] rounded-lg"
              />
              <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
            </div>
          </div>

          {/* Filters */}
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {/* Category Filter */}
            <div>
              <label className="label">
                <span className="label-text font-medium text-gray-700">Category</span>
              </label>
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="select select-bordered w-full bg-gray-50 text-gray-900 focus:outline-none focus:border-[#4A7C59] focus:ring-2 focus:ring-[#4A7C59] rounded-lg"
              >
                {categories.map(category => (
                  <option key={category} value={category}>{category}</option>
                ))}
              </select>
            </div>

            {/* Difficulty Filter */}
            <div>
              <label className="label">
                <span className="label-text font-medium text-gray-700">Difficulty</span>
              </label>
              <select
                value={selectedDifficulty}
                onChange={(e) => setSelectedDifficulty(e.target.value)}
                className="select select-bordered w-full bg-gray-50 text-gray-900 focus:outline-none focus:border-[#4A7C59] focus:ring-2 focus:ring-[#4A7C59] rounded-lg"
              >
                {difficulties.map(difficulty => (
                  <option key={difficulty} value={difficulty}>{difficulty}</option>
                ))}
              </select>
            </div>

            {/* Light Requirement Filter */}
            <div>
              <label className="label">
                <span className="label-text font-medium text-gray-700">Light Need</span>
              </label>
              <select
                value={selectedLight}
                onChange={(e) => setSelectedLight(e.target.value)}
                className="select select-bordered w-full bg-gray-50 text-gray-900 focus:outline-none focus:border-[#4A7C59] focus:ring-2 focus:ring-[#4A7C59] rounded-lg"
              >
                {lightRequirements.map(light => (
                  <option key={light} value={light}>{light}</option>
                ))}
              </select>
            </div>

            {/* Price Sort */}
            <div>
              <label className="label">
                <span className="label-text font-medium text-gray-700">Sort by Price</span>
              </label>
              <select
                value={sortOrder}
                onChange={(e) => setSortOrder(e.target.value)}
                className="select select-bordered w-full bg-gray-50 text-gray-900 focus:outline-none focus:border-[#4A7C59] focus:ring-2 focus:ring-[#4A7C59] rounded-lg"
              >
                <option value="default">Default</option>
                <option value="asc">Price: Low to High</option>
                <option value="desc">Price: High to Low</option>
              </select>
            </div>

            {/* Reset Button */}
            <div className="flex items-end">
              <button
                onClick={resetFilters}
                className="btn btn-outline w-full border-[#4A7C59] text-[#4A7C59] hover:bg-[#4A7C59] hover:text-white hover:border-[#4A7C59] rounded-lg normal-case inline-flex items-center justify-center gap-2"
              >
                <FaFilter /> Reset Filters
              </button>
            </div>
          </div>

          {/* Results Count */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="mt-4 text-center text-gray-600"
          >
            Showing <span className="font-bold text-[#2F5233]">{filteredPlants.length}</span> of <span className="font-bold">{plants.length}</span> plants
          </motion.div>
        </motion.div>

        {/* Plants Grid */}
        <AnimatePresence mode="wait">
          {filteredPlants.length > 0 ? (
            <motion.div
              key="plants-grid"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
            >
              {filteredPlants.map((plant, index) => (
                <motion.div
                  key={plant.id}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -30 }}
                  transition={{ duration: 0.4, delay: index * 0.05 }}
                  whileHover={{ y: -8 }}
                  className="card bg-white shadow-xl hover:shadow-2xl transition-all duration-300 group"
                >
                <figure className="relative h-64 overflow-hidden rounded-t-2xl">
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
                      transition={{ type: 'spring', stiffness: 200, delay: 0.2 + index * 0.05 }}
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
                      <span className="font-bold text-lg">{plant.rating}</span>
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
          </motion.div>
        ) : (
          <motion.div
            key="no-plants"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.3 }}
            className="text-center py-16"
          >
            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="mb-4 flex justify-center"
            >
              <Sprout className="text-[#4A7C59]" size={64} />
            </motion.div>
            <h3 className="text-2xl font-bold text-gray-700 mb-2">No plants found</h3>
            <p className="text-gray-500 mb-4">Try adjusting your filters or search term</p>
            <motion.button
              onClick={resetFilters}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="btn bg-[#4A7C59] hover:bg-[#2F5233] text-white rounded-lg normal-case shadow-md hover:shadow-lg border-none"
            >
              Reset Filters
            </motion.button>
          </motion.div>
        )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default Plants;
