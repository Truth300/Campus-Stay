
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Search, Filter, X } from "lucide-react";
import { hostels, amenities } from "@/data/mockData";
import HostelCard from "@/components/HostelCard";

const HostelsPage = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedAmenities, setSelectedAmenities] = useState<string[]>([]);
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 9000]);
  const [filteredHostels, setFilteredHostels] = useState(hostels);
  const [showFilters, setShowFilters] = useState(false);

  // Filter hostels based on search query, amenities, and price range
  useEffect(() => {
    const filtered = hostels.filter((hostel) => {
      // Search filter
      const matchesSearch =
        searchQuery === "" ||
        hostel.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        hostel.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
        hostel.description.toLowerCase().includes(searchQuery.toLowerCase());

      // Amenities filter
      const matchesAmenities =
        selectedAmenities.length === 0 ||
        selectedAmenities.every((amenity) => hostel.amenities.includes(amenity));

      // Price filter
      const minRoomPrice = Math.min(...hostel.rooms.map((room) => room.price));
      const matchesPrice = minRoomPrice >= priceRange[0] && minRoomPrice <= priceRange[1];

      return matchesSearch && matchesAmenities && matchesPrice;
    });

    setFilteredHostels(filtered);
  }, [searchQuery, selectedAmenities, priceRange]);

  const toggleAmenity = (amenityId: string) => {
    if (selectedAmenities.includes(amenityId)) {
      setSelectedAmenities(selectedAmenities.filter((id) => id !== amenityId));
    } else {
      setSelectedAmenities([...selectedAmenities, amenityId]);
    }
  };

  const clearFilters = () => {
    setSearchQuery("");
    setSelectedAmenities([]);
    setPriceRange([0, 1000]);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-gradient-to-r from-hostel-primary to-hostel-secondary py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-3xl md:text-4xl font-bold text-white mb-6">
              Find Your Perfect Student Hostel
            </h1>
            
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search by name, location, or features..."
                className="w-full py-3 pl-10 pr-4 rounded-md focus:outline-none focus:ring-2 focus:ring-white/50"
              />
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row gap-6">
          {/* Filters - Desktop */}
          <div className="hidden md:block w-64 bg-white rounded-lg shadow-sm p-4">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-hostel-dark">Filters</h3>
              <button 
                onClick={clearFilters}
                className="text-sm text-hostel-primary hover:text-hostel-secondary"
              >
                Clear all
              </button>
            </div>
            
            <div className="mb-6">
              <h4 className="text-sm font-medium text-gray-700 mb-3">Price Range</h4>
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-gray-600">${priceRange[0]}</span>
                <span className="text-sm text-gray-600">${priceRange[1]}</span>
              </div>
              <input
                type="range"
                min={0}
                max={9000}
                value={priceRange[1]}
                onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value)])}
                className="w-full"
              />
            </div>
            
            <div>
              <h4 className="text-sm font-medium text-gray-700 mb-3">Amenities</h4>
              <div className="space-y-2">
                {amenities.map((amenity) => (
                  <div key={amenity.id} className="flex items-center">
                    <input
                      type="checkbox"
                      id={`amenity-${amenity.id}`}
                      checked={selectedAmenities.includes(amenity.id)}
                      onChange={() => toggleAmenity(amenity.id)}
                      className="h-4 w-4 text-hostel-primary rounded focus:ring-hostel-primary"
                    />
                    <label
                      htmlFor={`amenity-${amenity.id}`}
                      className="ml-2 text-sm text-gray-700"
                    >
                      {amenity.name}
                    </label>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Mobile Filter Toggle Button */}
          <div className="md:hidden flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold text-hostel-dark">
              {filteredHostels.length} {filteredHostels.length === 1 ? 'hostel' : 'hostels'} found
            </h2>
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center space-x-1 bg-white px-3 py-2 rounded-md shadow-sm text-sm"
            >
              <Filter size={16} />
              <span>Filters</span>
            </button>
          </div>

          {/* Mobile Filters */}
          {showFilters && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              className="md:hidden fixed inset-0 bg-gray-900 bg-opacity-50 z-50 flex justify-center items-center"
            >
              <div className="bg-white rounded-lg w-11/12 max-w-md max-h-[90vh] overflow-y-auto p-5">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-lg font-semibold text-hostel-dark">Filters</h3>
                  <button onClick={() => setShowFilters(false)}>
                    <X size={20} className="text-gray-500" />
                  </button>
                </div>
                
                <div className="mb-6">
                  <h4 className="text-sm font-medium text-gray-700 mb-3">Price Range</h4>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-gray-600">${priceRange[0]}</span>
                    <span className="text-sm text-gray-600">${priceRange[1]}</span>
                  </div>
                  <input
                    type="range"
                    min={0}
                    max={1000}
                    value={priceRange[1]}
                    onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value)])}
                    className="w-full"
                  />
                </div>
                
                <div className="mb-6">
                  <h4 className="text-sm font-medium text-gray-700 mb-3">Amenities</h4>
                  <div className="space-y-2">
                    {amenities.map((amenity) => (
                      <div key={amenity.id} className="flex items-center">
                        <input
                          type="checkbox"
                          id={`mobile-amenity-${amenity.id}`}
                          checked={selectedAmenities.includes(amenity.id)}
                          onChange={() => toggleAmenity(amenity.id)}
                          className="h-4 w-4 text-hostel-primary rounded focus:ring-hostel-primary"
                        />
                        <label
                          htmlFor={`mobile-amenity-${amenity.id}`}
                          className="ml-2 text-sm text-gray-700"
                        >
                          {amenity.name}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>
                
                <div className="flex space-x-3">
                  <button
                    onClick={clearFilters}
                    className="w-1/2 py-2 border border-gray-300 rounded-md text-center text-sm"
                  >
                    Clear all
                  </button>
                  <button
                    onClick={() => setShowFilters(false)}
                    className="w-1/2 py-2 bg-hostel-primary text-white rounded-md text-center text-sm"
                  >
                    Apply Filters
                  </button>
                </div>
              </div>
            </motion.div>
          )}

          {/* Hostel Listings */}
          <div className="flex-1">
            <div className="hidden md:flex justify-between items-center mb-6">
              <h2 className="text-xl font-semibold text-hostel-dark">
                {filteredHostels.length} {filteredHostels.length === 1 ? 'hostel' : 'hostels'} found
              </h2>
              
              <div className="flex items-center space-x-2">
                <span className="text-sm text-gray-600">Sort by:</span>
                <select className="form-input py-1 px-3 text-sm">
                  <option>Price: Low to High</option>
                  <option>Price: High to Low</option>
                  <option>Rating: High to Low</option>
                  <option>Distance to Campus</option>
                </select>
              </div>
            </div>
            
            {filteredHostels.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
                {filteredHostels.map((hostel) => (
                  <HostelCard key={hostel.id} hostel={hostel} />
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <div className="mb-4 text-gray-500">
                  <Search size={48} className="mx-auto" />
                </div>
                <h3 className="text-xl font-semibold text-hostel-dark mb-2">No hostels found</h3>
                <p className="text-gray-600 mb-6">
                  Try adjusting your search or filter criteria to find more options.
                </p>
                <button 
                  onClick={clearFilters}
                  className="btn-primary"
                >
                  Clear all filters
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default HostelsPage;
