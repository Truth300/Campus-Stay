
import { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Search, MapPin, Check, ArrowRight } from "lucide-react";
import { hostels } from "@/data/mockData";
import HostelCard from "@/components/HostelCard";

const HomePage = () => {
  const [location, setLocation] = useState("");
  const featuredHostels = hostels.slice(0, 3);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, this would search hostels based on the location
    console.log("Searching for hostels near:", location);
  };

  return (
    <div>
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-hostel-primary to-hostel-secondary py-20 md:py-32">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl text-center mx-auto">
            <motion.h1 
              className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              Find Your Perfect Student Accommodation
            </motion.h1>
            
            <motion.p 
              className="text-xl text-white/90 mb-10"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              Search through hundreds of quality hostels near your campus.
              Book online and secure your stay in minutes.
            </motion.p>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              <form 
                onSubmit={handleSearch}
                className="flex flex-col sm:flex-row gap-3 max-w-xl mx-auto"
              >
                <div className="flex-1 relative">
                  <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Enter university or location..."
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    className="w-full py-3 px-10 rounded-md focus:outline-none focus:ring-2 focus:ring-white/50"
                  />
                </div>
                <button 
                  type="submit"
                  className="bg-white text-hostel-primary hover:bg-gray-100 transition-colors py-3 px-6 rounded-md font-medium flex items-center justify-center"
                >
                  <Search className="mr-2" size={20} />
                  Search
                </button>
              </form>
            </motion.div>
          </div>
        </div>
        
        {/* Decorative elements */}
        <div className="absolute bottom-0 left-0 w-full overflow-hidden">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 1440 320"
            className="w-full h-auto"
            preserveAspectRatio="none"
          >
            <path
              fill="#ffffff"
              fillOpacity="1"
              d="M0,288L48,272C96,256,192,224,288,197.3C384,171,480,149,576,165.3C672,181,768,235,864,250.7C960,267,1056,245,1152,224C1248,203,1344,181,1392,170.7L1440,160L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
            ></path>
          </svg>
        </div>
      </section>

      {/* Featured Hostels Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-hostel-dark mb-4">Featured Hostels</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Discover some of our top-rated hostels with excellent amenities and convenient locations.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredHostels.map((hostel) => (
              <HostelCard key={hostel.id} hostel={hostel} />
            ))}
          </div>
          
          <div className="text-center mt-10">
            <Link 
              to="/hostels"
              className="btn-primary inline-flex items-center"
            >
              View All Hostels
              <ArrowRight className="ml-2" size={18} />
            </Link>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-hostel-dark mb-4">How It Works</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Finding your perfect student accommodation is easy with CampusStayPro.
              Follow these simple steps to secure your stay.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                step: "1",
                title: "Search & Compare",
                description: "Browse through various hostels, filter by location, price, and amenities to find the perfect match."
              },
              {
                step: "2",
                title: "Apply Online",
                description: "Submit your application directly through our platform with just a few clicks."
              },
              {
                step: "3",
                title: "Secure Your Stay",
                description: "Once approved, make a payment to confirm your booking and get ready to move in!"
              }
            ].map((item, index) => (
              <motion.div
                key={index}
                className="bg-white rounded-lg shadow-md p-6 text-center"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <div className="w-12 h-12 bg-hostel-primary rounded-full flex items-center justify-center text-white font-bold mx-auto mb-4">
                  {item.step}
                </div>
                <h3 className="text-xl font-semibold text-hostel-dark mb-3">{item.title}</h3>
                <p className="text-gray-600">{item.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center gap-12">
            <div className="w-full md:w-1/2">
              <img 
                src="https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1000&q=80" 
                alt="Student Accommodation" 
                className="rounded-lg shadow-lg w-full h-auto"
              />
            </div>
            
            <div className="w-full md:w-1/2">
              <h2 className="text-3xl font-bold text-hostel-dark mb-6">
                Why Choose CampusStayPro?
              </h2>
              
              <div className="space-y-4">
                {[
                  "Verified hostel listings with real reviews from students",
                  "Secure online payments and no hidden fees",
                  "Easy maintenance requests and quick resolution",
                  "Direct communication with hostel owners",
                  "24/7 support for any accommodation issues"
                ].map((benefit, index) => (
                  <motion.div 
                    key={index}
                    className="flex items-start"
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.4, delay: index * 0.1 }}
                    viewport={{ once: true }}
                  >
                    <div className="bg-hostel-accent rounded-full p-1 mr-3 mt-1">
                      <Check className="w-4 h-4 text-hostel-primary" />
                    </div>
                    <p className="text-gray-700">{benefit}</p>
                  </motion.div>
                ))}
              </div>
              
              <div className="mt-8">
                <Link 
                  to="/signup"
                  className="btn-primary"
                >
                  Get Started Today
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-hostel-dark">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold text-white mb-6">
              Are You a Hostel Owner?
            </h2>
            <p className="text-xl text-gray-300 mb-8">
              List your property on CampusStayPro and reach thousands of students looking for quality accommodation.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Link 
                to="/owner-signup"
                className="bg-white text-hostel-primary hover:bg-gray-100 transition-colors py-3 px-8 rounded-md font-medium"
              >
                List Your Property
              </Link>
              <Link 
                to="/owner-info"
                className="bg-transparent text-white border border-white hover:bg-white/10 transition-colors py-3 px-8 rounded-md font-medium"
              >
                Learn More
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
