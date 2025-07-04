
import { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useAuth } from "@/context/AuthContext";
import { Menu, X, User, LogOut, Search, Home, BedDouble, Bell } from "lucide-react";

const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { user, isAuthenticated, logout } = useAuth();

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const handleLogout = () => {
    logout();
  };

  return (
    <header className="bg-white shadow-sm">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center py-4">
          <Link to="/" className="flex items-center space-x-2">
            <BedDouble className="h-8 w-8 text-hostel-primary" />
            <span className="text-2xl font-bold text-hostel-dark">
              Campus<span className="text-hostel-primary">Stay</span>Pro
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-6">
            <Link 
              to="/" 
              className="text-gray-600 hover:text-hostel-primary transition-colors font-medium"
            >
              Home
            </Link>
            <Link 
              to="/hostels" 
              className="text-gray-600 hover:text-hostel-primary transition-colors font-medium"
            >
              Find Hostels
            </Link>
            {isAuthenticated && user?.role === "owner" && (
              <Link 
                to="/owner-dashboard" 
                className="text-gray-600 hover:text-hostel-primary transition-colors font-medium"
              >
                Owner Dashboard
              </Link>
            )}
            {isAuthenticated && user?.role === "student" && (
              <Link 
                to="/student-dashboard" 
                className="text-gray-600 hover:text-hostel-primary transition-colors font-medium"
              >
                My Dashboard
              </Link>
            )}
            <Link 
              to="/about" 
              className="text-gray-600 hover:text-hostel-primary transition-colors font-medium"
            >
              About Us
            </Link>

            {!isAuthenticated ? (
              <div className="flex items-center space-x-3">
                <Link 
                  to="/login" 
                  className="px-4 py-2 text-hostel-primary border border-hostel-primary rounded-md hover:bg-hostel-primary hover:text-white transition-colors"
                >
                  Login
                </Link>
                <Link 
                  to="/signup" 
                  className="px-4 py-2 bg-hostel-primary text-white rounded-md hover:bg-hostel-secondary transition-colors"
                >
                  Sign Up
                </Link>
              </div>
            ) : (
              <div className="flex items-center space-x-4">
                <Link 
                  to="/notifications" 
                  className="relative text-gray-600 hover:text-hostel-primary transition-colors"
                >
                  <Bell size={20} />
                  <span className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">
                    3
                  </span>
                </Link>
                <div className="relative group">
                  <button className="flex items-center space-x-2 text-gray-600 focus:outline-none">
                    <div className="w-8 h-8 rounded-full bg-hostel-primary text-white flex items-center justify-center">
                      {user.name.charAt(0)}
                    </div>
                  </button>
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-10 hidden group-hover:block">
                    <div className="px-4 py-2 border-b border-gray-100">
                      <p className="text-sm font-medium text-gray-900">{user.name}</p>
                      <p className="text-xs text-gray-500">{user.email}</p>
                    </div>
                    <Link 
                      to="/profile" 
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center"
                    >
                      <User size={16} className="mr-2" />
                      Your Profile
                    </Link>
                    <button 
                      onClick={handleLogout}
                      className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center"
                    >
                      <LogOut size={16} className="mr-2" />
                      Sign out
                    </button>
                  </div>
                </div>
              </div>
            )}
          </nav>

          {/* Mobile Menu Button */}
          <button 
            onClick={toggleMobileMenu}
            className="md:hidden text-gray-600 focus:outline-none"
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <motion.div 
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          exit={{ opacity: 0, height: 0 }}
          className="md:hidden bg-white border-t"
        >
          <div className="px-4 py-2 space-y-3">
            <Link 
              to="/" 
              className="block py-2 text-base text-gray-600"
              onClick={() => setMobileMenuOpen(false)}
            >
              Home
            </Link>
            <Link 
              to="/hostels" 
              className="block py-2 text-base text-gray-600"
              onClick={() => setMobileMenuOpen(false)}
            >
              Find Hostels
            </Link>
            {isAuthenticated && user?.role === "owner" && (
              <Link 
                to="/owner-dashboard" 
                className="block py-2 text-base text-gray-600"
                onClick={() => setMobileMenuOpen(false)}
              >
                Owner Dashboard
              </Link>
            )}
            {isAuthenticated && user?.role === "student" && (
              <Link 
                to="/student-dashboard" 
                className="block py-2 text-base text-gray-600"
                onClick={() => setMobileMenuOpen(false)}
              >
                My Dashboard
              </Link>
            )}
            <Link 
              to="/about" 
              className="block py-2 text-base text-gray-600"
              onClick={() => setMobileMenuOpen(false)}
            >
              About Us
            </Link>
            
            {!isAuthenticated ? (
              <div className="pt-2 flex flex-col space-y-2">
                <Link 
                  to="/login" 
                  className="w-full px-4 py-2 text-center text-hostel-primary border border-hostel-primary rounded-md"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Login
                </Link>
                <Link 
                  to="/signup" 
                  className="w-full px-4 py-2 text-center bg-hostel-primary text-white rounded-md"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Sign Up
                </Link>
              </div>
            ) : (
              <div className="pt-2 border-t border-gray-100">
                <div className="flex items-center space-x-3 py-3">
                  <div className="w-10 h-10 rounded-full bg-hostel-primary text-white flex items-center justify-center">
                    {user.name.charAt(0)}
                  </div>
                  <div>
                    <p className="text-sm font-medium">{user.name}</p>
                    <p className="text-xs text-gray-500">{user.email}</p>
                  </div>
                </div>
                <Link 
                  to="/profile" 
                  className="block py-2 text-base text-gray-600"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Your Profile
                </Link>
                <Link 
                  to="/notifications" 
                  className="block py-2 text-base text-gray-600"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Notifications (3)
                </Link>
                <button 
                  onClick={() => {
                    handleLogout();
                    setMobileMenuOpen(false);
                  }}
                  className="block py-2 text-base text-gray-600 w-full text-left"
                >
                  Sign out
                </button>
              </div>
            )}
          </div>
        </motion.div>
      )}
    </header>
  );
};

export default Navbar;
