
import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { 
  Star, MapPin, Calendar, ArrowLeft, Globe, Share2, Heart,
  BedDouble, Users, BadgeInfo, Check, X
} from "lucide-react";
import { hostels, amenities as allAmenities } from "@/data/mockData";
import { useAuth } from "@/context/AuthContext";
import { useToast } from "@/hooks/use-toast";

const HostelDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const hostel = hostels.find((h) => h.id === id);
  const { user } = useAuth();

  
  const [selectedImage, setSelectedImage] = useState(hostel?.images[0] || "");
  const [selectedRoomId, setSelectedRoomId] = useState("");
  const [showReservationForm, setShowReservationForm] = useState(false);
  
  // Form state
  const [name, setName] = useState(user?.name || "");
  const [email, setEmail] = useState(user?.email || "");
  const [phone, setPhone] = useState("");
  const [moveInDate, setMoveInDate] = useState("");
  const [moveOutDate, setMoveOutDate] = useState("");
  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!hostel) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Hostel Not Found</h1>
          <p className="text-gray-600 mb-6">The hostel you are looking for doesn't exist or has been removed.</p>
          <Link to="/hostels" className="btn-primary">
            Browse Other Hostels
          </Link>
        </div>
      </div>
    );
  }

  const selectedRoom = selectedRoomId 
    ? hostel.rooms.find(room => room.id === selectedRoomId)
    : hostel.rooms[0];

  const handleReservation = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!selectedRoom) {
      toast({
        title: "Room Selection Required",
        description: "Please select a room before submitting your application.",
        variant: "destructive"
      });
      return;
    }
    
    if (!moveInDate || !moveOutDate) {
      toast({
        title: "Dates Required",
        description: "Please select your preferred move-in and move-out dates.",
        variant: "destructive"
      });
      return;
    }
    
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      toast({
        title: "Application Submitted",
        description: `Your application for ${selectedRoom.name} at ${hostel.name} has been submitted successfully!`,
      });
      
      setIsSubmitting(false);
      setShowReservationForm(false);
      
      // Reset form
      setPhone("");
      setMoveInDate("");
      setMoveOutDate("");
      setMessage("");
    }, 1500);
  };

  const handleBookmark = () => {
    toast({
      title: "Hostel Saved",
      description: `${hostel.name} has been added to your favorites.`,
    });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-6">
          <Link to="/hostels" className="flex items-center text-hostel-primary hover:text-hostel-secondary transition-colors">
            <ArrowLeft size={20} className="mr-2" />
            <span>Back to Hostels</span>
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {/* Hostel Images */}
            <div className="bg-white rounded-lg shadow-sm overflow-hidden mb-6">
              <div className="relative">
                <img 
                  src={selectedImage} 
                  alt={hostel.name}
                  className="w-full h-80 object-cover"
                />
                <div className="absolute top-4 right-4 flex space-x-2">
                  <button 
                    onClick={handleBookmark}
                    className="p-2 bg-white rounded-full shadow-md hover:bg-gray-100 transition-colors"
                  >
                    <Heart size={20} className="text-hostel-primary" />
                  </button>
                  <button className="p-2 bg-white rounded-full shadow-md hover:bg-gray-100 transition-colors">
                    <Share2 size={20} className="text-hostel-primary" />
                  </button>
                </div>
              </div>
              <div className="p-4 border-t">
                <div className="grid grid-cols-4 gap-2">
                  {hostel.images.map((image, index) => (
                    <img
                      key={index}
                      src={image}
                      alt={`${hostel.name} ${index + 1}`}
                      className={`w-full h-20 object-cover rounded cursor-pointer ${
                        selectedImage === image ? "ring-2 ring-hostel-primary" : ""
                      }`}
                      onClick={() => setSelectedImage(image)}
                    />
                  ))}
                </div>
              </div>
            </div>

            {/* Hostel Info */}
            <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h1 className="text-2xl md:text-3xl font-bold text-hostel-dark mb-2">{hostel.name}</h1>
                  <div className="flex items-center text-gray-600 mb-2">
                    <MapPin size={18} className="mr-1" />
                    <span>{hostel.address}</span>
                  </div>
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center">
                      <Star className="w-5 h-5 text-yellow-500" fill="currentColor" />
                      <span className="ml-1 font-medium">{hostel.rating}</span>
                      <span className="text-gray-500 ml-1">({hostel.reviewCount} reviews)</span>
                    </div>
                    <div className="text-sm bg-green-100 text-green-800 py-1 px-2 rounded-full">
                      {hostel.distance}
                    </div>
                  </div>
                </div>
                <div className="hidden md:block">
                  <Link 
                    to={`https://maps.google.com/?q=${hostel.address}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center text-hostel-primary hover:text-hostel-secondary transition-colors"
                  >
                    <Globe size={18} className="mr-1" />
                    <span>View on Map</span>
                  </Link>
                </div>
              </div>

              <div className="border-t border-b py-4 my-4">
                <h3 className="text-lg font-semibold mb-3">Description</h3>
                <p className="text-gray-700">{hostel.description}</p>
              </div>

              <div className="py-4">
                <h3 className="text-lg font-semibold mb-3">Amenities</h3>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {hostel.amenities.map((amenityId) => {
                    const amenity = allAmenities.find(a => a.id === amenityId);
                    return amenity ? (
                      <div key={amenity.id} className="flex items-center">
                        <div className="w-8 h-8 bg-hostel-accent rounded-full flex items-center justify-center mr-3">
                          <span className="text-hostel-primary">{amenity.icon}</span>
                        </div>
                        <span className="text-gray-700">{amenity.name}</span>
                      </div>
                    ) : null;
                  })}
                </div>
              </div>
            </div>

            {/* Available Rooms */}
            <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
              <h3 className="text-lg font-semibold mb-4">Available Rooms</h3>
              
              <div className="space-y-4">
                {hostel.rooms.map((room) => (
                  <div 
                    key={room.id} 
                    className={`border rounded-lg p-4 ${
                      selectedRoomId === room.id ? 'border-hostel-primary bg-hostel-accent/20' : ''
                    }`}
                  >
                    <div className="flex flex-col md:flex-row md:items-center">
                      <div className="md:w-1/4 mb-4 md:mb-0">
                        <img 
                          src={room.images[0]} 
                          alt={room.name} 
                          className="w-full h-32 object-cover rounded"
                        />
                      </div>
                      <div className="md:w-1/2 md:px-4">
                        <h4 className="text-lg font-semibold text-hostel-dark mb-1">{room.name}</h4>
                        <p className="text-gray-700 mb-2">{room.description}</p>
                        <div className="flex flex-wrap gap-2 mb-2">
                          <div className="flex items-center text-sm text-gray-700">
                            <BedDouble size={16} className="mr-1" />
                            <span>{room.type}</span>
                          </div>
                          <div className="flex items-center text-sm text-gray-700">
                            <Users size={16} className="mr-1" />
                            <span>Fits {room.capacity} {room.capacity === 1 ? 'person' : 'people'}</span>
                          </div>
                          <div className="flex items-center text-sm text-gray-700">
                            <BadgeInfo size={16} className="mr-1" />
                            <span>{room.available} available</span>
                          </div>
                        </div>
                      </div>
                      <div className="md:w-1/4 flex flex-col items-start md:items-end">
                        <div className="text-xl font-bold text-hostel-primary mb-2">GHc{room.price}/Year</div>
                        <button 
                          onClick={() => {
                            setSelectedRoomId(room.id);
                            setShowReservationForm(true);
                          }}
                          className={`btn-primary text-sm ${room.available === 0 ? 'opacity-50 cursor-not-allowed' : ''}`}
                          disabled={room.available === 0}
                        >
                          Apply Now
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Reviews - Simplified for MVP */}
            <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold">Reviews</h3>
                <div className="flex items-center">
                  <Star className="w-5 h-5 text-yellow-500" fill="currentColor" />
                  <span className="ml-1 font-medium">{hostel.rating}</span>
                  <span className="text-gray-500 ml-1">({hostel.reviewCount} reviews)</span>
                </div>
              </div>
              
              <div className="text-center py-8">
                <p className="text-gray-600">
                  Reviews will be available in a future update.
                </p>
              </div>
            </div>
          </div>

          {/* Sidebar - Reservation Form */}
          <div className="lg:col-span-1">
            <div className="sticky top-6">
              <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
                <h3 className="text-lg font-semibold mb-4">Reserve Your Room</h3>
                
                {showReservationForm ? (
                  <form onSubmit={handleReservation} className="space-y-4">
                    <div>
                      <label htmlFor="room" className="block text-sm font-medium text-gray-700 mb-1">
                        Selected Room
                      </label>
                      <select
                        id="room"
                        value={selectedRoomId}
                        onChange={(e) => setSelectedRoomId(e.target.value)}
                        className="form-input w-full"
                        required
                      >
                        <option value="">Select a room</option>
                        {hostel.rooms.map((room) => (
                          <option key={room.id} value={room.id} disabled={room.available === 0}>
                            {room.name} - ${room.price}/month {room.available === 0 ? '(No Availability)' : ''}
                          </option>
                        ))}
                      </select>
                    </div>
                    
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                        Full Name
                      </label>
                      <input
                        id="name"
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="form-input w-full"
                        required
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                        Email Address
                      </label>
                      <input
                        id="email"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="form-input w-full"
                        required
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                        Phone Number
                      </label>
                      <input
                        id="phone"
                        type="tel"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        className="form-input w-full"
                        required
                      />
                    </div>
                    
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label htmlFor="moveIn" className="block text-sm font-medium text-gray-700 mb-1">
                          Move-in Date
                        </label>
                        <div className="relative">
                          <input
                            id="moveIn"
                            type="date"
                            value={moveInDate}
                            onChange={(e) => setMoveInDate(e.target.value)}
                            className="form-input w-full"
                            required
                          />
                          <Calendar className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
                        </div>
                      </div>
                      <div>
                        <label htmlFor="moveOut" className="block text-sm font-medium text-gray-700 mb-1">
                          Move-out Date
                        </label>
                        <div className="relative">
                          <input
                            id="moveOut"
                            type="date"
                            value={moveOutDate}
                            onChange={(e) => setMoveOutDate(e.target.value)}
                            className="form-input w-full"
                            required
                          />
                          <Calendar className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
                        </div>
                      </div>
                    </div>
                    
                    <div>
                      <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                        Additional Notes (Optional)
                      </label>
                      <textarea
                        id="message"
                        rows={3}
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        className="form-input w-full"
                        placeholder="Any special requirements or questions..."
                      />
                    </div>
                    
                    <div className="flex space-x-3">
                      <button
                        type="button"
                        onClick={() => setShowReservationForm(false)}
                        className="w-1/2 py-2 border border-gray-300 rounded-md text-center text-sm hover:bg-gray-50 transition-colors"
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        className={`w-1/2 py-2 bg-hostel-primary text-white rounded-md text-center text-sm hover:bg-hostel-secondary transition-colors ${
                          isSubmitting ? 'opacity-75 cursor-not-allowed' : ''
                        }`}
                        disabled={isSubmitting}
                      >
                        {isSubmitting ? 'Submitting...' : 'Submit Application'}
                      </button>
                    </div>
                  </form>
                ) : (
                  <div className="text-center py-4">
                    {user ? (
                      <div className="space-y-6">
                        <div>
                          {selectedRoom ? (
                            <div className="mb-4">
                              <p className="text-xl font-bold text-hostel-primary mb-1">
                                ${selectedRoom.price}
                                <span className="text-gray-600 text-sm font-normal">/month</span>
                              </p>
                              <p className="text-gray-700">{selectedRoom.name}</p>
                            </div>
                          ) : (
                            <p className="text-gray-700 mb-4">
                              Select a room from the options above to apply
                            </p>
                          )}
                          <button
                            onClick={() => setShowReservationForm(true)}
                            className="btn-primary w-full py-3"
                          >
                            Apply Now
                          </button>
                        </div>
                        <div className="border-t pt-4">
                          <p className="text-sm text-gray-600 mb-4">
                            Secure your accommodation in this hostel with just a few clicks. Fill out the application form to express your interest.
                          </p>
                          <div className="space-y-2">
                            {[
                              "No booking fees",
                              "Secure online application",
                              "Instant confirmation",
                              "Flexible move-in dates"
                            ].map((feature, index) => (
                              <div key={index} className="flex items-start">
                                <Check size={16} className="text-green-500 mr-2 mt-1" />
                                <span className="text-sm text-gray-700">{feature}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    ) : (
                      <div className="space-y-4">
                        <p className="text-gray-700">
                          Sign in to apply for this hostel
                        </p>
                        <div className="flex space-x-3">
                          <Link
                            to="/login"
                            className="w-1/2 py-2 border border-hostel-primary text-hostel-primary rounded-md text-center hover:bg-hostel-accent transition-colors"
                          >
                            Sign In
                          </Link>
                          <Link
                            to="/signup"
                            className="w-1/2 py-2 bg-hostel-primary text-white rounded-md text-center hover:bg-hostel-secondary transition-colors"
                          >
                            Sign Up
                          </Link>
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </div>
              
              <div className="bg-white rounded-lg shadow-sm p-6">
                <h3 className="text-lg font-semibold mb-4">Hostel Policies</h3>
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <div className="mr-2 text-hostel-primary">
                      <Check size={18} />
                    </div>
                    <p className="text-sm text-gray-700">
                      One-time security deposit equivalent to one month's rent
                    </p>
                  </li>
                  <li className="flex items-start">
                    <div className="mr-2 text-hostel-primary">
                      <Check size={18} />
                    </div>
                    <p className="text-sm text-gray-700">
                      Monthly rent payments due by the 5th of each month
                    </p>
                  </li>
                  <li className="flex items-start">
                    <div className="mr-2 text-red-500">
                      <X size={18} />
                    </div>
                    <p className="text-sm text-gray-700">
                      No smoking allowed on the premises
                    </p>
                  </li>
                  <li className="flex items-start">
                    <div className="mr-2 text-red-500">
                      <X size={18} />
                    </div>
                    <p className="text-sm text-gray-700">
                      No pets allowed (except service animals)
                    </p>
                  </li>
                  <li className="flex items-start">
                    <div className="mr-2 text-hostel-primary">
                      <Check size={18} />
                    </div>
                    <p className="text-sm text-gray-700">
                      Quiet hours from 10 PM to 7 AM
                    </p>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HostelDetailPage;
