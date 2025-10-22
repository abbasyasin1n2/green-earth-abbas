import { useState, useEffect } from 'react';
import { Link } from 'react-router';
import { FaStar, FaSearch, FaFilter } from 'react-icons/fa';
import plantsData from '../data/plants.json';

const Plants = () => {
  const [plants, setPlants] = useState(plantsData);
  const [filteredPlants, setFilteredPlants] = useState(plantsData);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedDifficulty, setSelectedDifficulty] = useState('All');
  const [selectedLight, setSelectedLight] = useState('All');

  // Get unique categories, difficulties, and light requirements
  const categories = ['All', ...new Set(plants.map(plant => plant.category))];
  const difficulties = ['All', ...new Set(plants.map(plant => plant.difficulty))];
  const lightRequirements = ['All', ...new Set(plants.map(plant => plant.lightRequirement))];

  // Apply filters
  useEffect(() => {
    let result = plants;

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

    setFilteredPlants(result);
  }, [searchTerm, selectedCategory, selectedDifficulty, selectedLight, plants]);

  // Reset filters
  const resetFilters = () => {
    setSearchTerm('');
    setSelectedCategory('All');
    setSelectedDifficulty('All');
    setSelectedLight('All');
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-green-50">
      {/* Header Section */}
      <div className="bg-[#2F5233] text-white py-16 pt-28">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl md:text-5xl font-bold text-center font-serif mb-4">
            Our Plant Collection
          </h1>
          <p className="text-center text-green-100 text-lg max-w-2xl mx-auto">
            Discover the perfect green companion for your space. From easy-care beginners to exotic beauties.
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        {/* Search and Filter Section */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          {/* Search Bar */}
          <div className="mb-6">
            <div className="relative">
              <input
                type="text"
                placeholder="Search plants by name or scientific name..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="input input-bordered w-full pl-12 bg-white text-gray-900 placeholder:text-gray-400 focus:outline-none focus:border-[#4A7C59] focus:ring-2 focus:ring-[#4A7C59] rounded-lg"
              />
              <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
            </div>
          </div>

          {/* Filters */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {/* Category Filter */}
            <div>
              <label className="label">
                <span className="label-text font-medium">Category</span>
              </label>
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="select select-bordered w-full focus:outline-none focus:border-[#4A7C59]"
              >
                {categories.map(category => (
                  <option key={category} value={category}>{category}</option>
                ))}
              </select>
            </div>

            {/* Difficulty Filter */}
            <div>
              <label className="label">
                <span className="label-text font-medium">Difficulty</span>
              </label>
              <select
                value={selectedDifficulty}
                onChange={(e) => setSelectedDifficulty(e.target.value)}
                className="select select-bordered w-full focus:outline-none focus:border-[#4A7C59]"
              >
                {difficulties.map(difficulty => (
                  <option key={difficulty} value={difficulty}>{difficulty}</option>
                ))}
              </select>
            </div>

            {/* Light Requirement Filter */}
            <div>
              <label className="label">
                <span className="label-text font-medium">Light Need</span>
              </label>
              <select
                value={selectedLight}
                onChange={(e) => setSelectedLight(e.target.value)}
                className="select select-bordered w-full focus:outline-none focus:border-[#4A7C59]"
              >
                {lightRequirements.map(light => (
                  <option key={light} value={light}>{light}</option>
                ))}
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
          <div className="mt-4 text-center text-gray-600">
            Showing <span className="font-bold text-[#2F5233]">{filteredPlants.length}</span> of <span className="font-bold">{plants.length}</span> plants
          </div>
        </div>

        {/* Plants Grid */}
        {filteredPlants.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredPlants.map(plant => (
              <div key={plant.id} className="card bg-base-100 shadow-xl hover:shadow-2xl transition-shadow duration-300">
                <figure className="relative h-64 overflow-hidden">
                  <img
                    src={plant.image}
                    alt={plant.name}
                    className="w-full h-full object-cover hover:scale-110 transition-transform duration-300"
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
                    <div className="badge badge-outline border-[#4A7C59] text-[#4A7C59]">{plant.category}</div>
                  </h2>
                  <p className="text-sm text-gray-500 italic">{plant.scientificName}</p>
                  <p className="text-gray-600 line-clamp-2">{plant.description}</p>
                  
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
                      className="btn bg-[#4A7C59] hover:bg-[#2F5233] text-white w-full rounded-lg normal-case"
                    >
                      View Details
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <div className="text-6xl mb-4">🌱</div>
            <h3 className="text-2xl font-bold text-gray-700 mb-2">No plants found</h3>
            <p className="text-gray-500 mb-4">Try adjusting your filters or search term</p>
            <button onClick={resetFilters} className="btn bg-[#4A7C59] hover:bg-[#2F5233] text-white rounded-lg normal-case">
              Reset Filters
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Plants;
