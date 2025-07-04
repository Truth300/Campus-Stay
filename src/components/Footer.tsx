
import { Link } from "react-router-dom";
import { Facebook, Twitter, Instagram, Mail, Phone, MapPin } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-hostel-dark text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div>
            <Link to="/" className="flex items-center space-x-2 mb-4">
              <span className="text-2xl font-bold">
                Campus<span className="text-hostel-primary">Stay</span>Pro
              </span>
            </Link>
            <p className="text-gray-300 mb-6">
              Find the perfect student accommodation with our easy-to-use platform connecting students with quality hostel options.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-white hover:text-hostel-primary transition-colors">
                <Facebook size={20} />
              </a>
              <a href="#" className="text-white hover:text-hostel-primary transition-colors">
                <Twitter size={20} />
              </a>
              <a href="#" className="text-white hover:text-hostel-primary transition-colors">
                <Instagram size={20} />
              </a>
            </div>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4 border-b border-hostel-primary pb-2">Quick Links</h3>
            <ul className="space-y-3">
              <li>
                <Link to="/" className="text-gray-300 hover:text-hostel-primary transition-colors">Home</Link>
              </li>
              <li>
                <Link to="/hostels" className="text-gray-300 hover:text-hostel-primary transition-colors">Find Hostels</Link>
              </li>
              <li>
                <Link to="/about" className="text-gray-300 hover:text-hostel-primary transition-colors">About Us</Link>
              </li>
              <li>
                <Link to="/login" className="text-gray-300 hover:text-hostel-primary transition-colors">Login</Link>
              </li>
              <li>
                <Link to="/signup" className="text-gray-300 hover:text-hostel-primary transition-colors">Sign Up</Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4 border-b border-hostel-primary pb-2">For Students</h3>
            <ul className="space-y-3">
              <li>
                <Link to="/how-it-works" className="text-gray-300 hover:text-hostel-primary transition-colors">How It Works</Link>
              </li>
              <li>
                <Link to="/faq" className="text-gray-300 hover:text-hostel-primary transition-colors">FAQ</Link>
              </li>
              <li>
                <Link to="/maintenance" className="text-gray-300 hover:text-hostel-primary transition-colors">Maintenance Requests</Link>
              </li>
              <li>
                <Link to="/payment-guide" className="text-gray-300 hover:text-hostel-primary transition-colors">Payment Guide</Link>
              </li>
              <li>
                <Link to="/testimonials" className="text-gray-300 hover:text-hostel-primary transition-colors">Student Reviews</Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4 border-b border-hostel-primary pb-2">Contact Us</h3>
            <ul className="space-y-4">
              <li className="flex items-start space-x-3">
                <MapPin size={20} className="text-hostel-primary mt-1 flex-shrink-0" />
                <span className="text-gray-300">University of Mines and Technology - Tarkwa</span>
              </li>
              <li className="flex items-center space-x-3">
                <Phone size={20} className="text-hostel-primary flex-shrink-0" />
                <span className="text-gray-300">(+233) 594948955</span>
              </li>
              <li className="flex items-center space-x-3">
                <Mail size={20} className="text-hostel-primary flex-shrink-0" />
                <span className="text-gray-300">info@campusstaypro.com</span>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="mt-12 pt-6 border-t border-gray-700 text-center">
          <p className="text-gray-400 text-sm">
            © {new Date().getFullYear()} CampusStayPro. All rights reserved - DennisNyaaba.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
