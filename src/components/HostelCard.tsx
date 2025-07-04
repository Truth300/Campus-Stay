
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Star, MapPin, User } from "lucide-react";
import { Hostel, amenities as allAmenities } from "@/data/mockData";

interface HostelCardProps {
  hostel: Hostel;
}

const HostelCard = ({ hostel }: HostelCardProps) => {
  const amenityIcons = hostel.amenities.slice(0, 4);
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300"
    >
      <div className="relative">
        <img 
          src={hostel.images[0]} 
          alt={hostel.name} 
          className="w-full h-48 object-cover"
        />
        <div className="absolute top-4 right-4 bg-hostel-primary text-white px-2 py-1 rounded-md text-sm font-medium flex items-center">
          <Star className="w-4 h-4 mr-1" fill="white" strokeWidth={0} />
          {hostel.rating}
        </div>
      </div>
      
      <div className="p-4">
        <Link to={`/hostels/${hostel.id}`}>
          <h3 className="text-xl font-semibold text-hostel-dark hover:text-hostel-primary transition-colors">
            {hostel.name}
          </h3>
        </Link>
        
        <div className="flex items-center text-gray-500 mt-1 mb-2">
          <MapPin className="w-4 h-4 mr-1" />
          <span className="text-sm">{hostel.location} · {hostel.distance}</span>
        </div>
        
        <p className="text-gray-600 text-sm line-clamp-2 mb-3">
          {hostel.description}
        </p>
        
        <div className="flex flex-wrap gap-2 mb-4">
          {amenityIcons.map((amenityId) => {
            const amenity = allAmenities.find(a => a.id === amenityId);
            return amenity ? (
              <div 
                key={amenity.id}
                className="bg-hostel-accent text-xs px-2 py-1 rounded-full text-hostel-dark"
              >
                {amenity.name}
              </div>
            ) : null;
          })}
          {hostel.amenities.length > 4 && (
            <div className="bg-hostel-accent text-xs px-2 py-1 rounded-full text-hostel-dark">
              +{hostel.amenities.length - 4} more
            </div>
          )}
        </div>
        
        <div className="flex items-center justify-between pt-3 border-t border-gray-100">
          <div className="text-hostel-primary font-bold">
            From GHc{hostel.rooms.length > 0 ? 
              Math.min(...hostel.rooms.map(room => room.price)) : 0}/Year
          </div>
          <Link 
            to={`/hostels/${hostel.id}`}
            className="btn-primary text-sm"
          >
            View Details
          </Link>
        </div>
      </div>
    </motion.div>
  );
};

export default HostelCard;
