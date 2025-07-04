
import { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useAuth } from "@/context/AuthContext";
import {
  Home, FileText, CreditCard, Settings, Wrench, Bell, MessageCircle,
  Calendar, BedDouble, ChevronRight, Clipboard, ArrowRight
} from "lucide-react";
import { hostels } from "@/data/mockData";

// Mock data for student dashboard
const mockReservation = {
  id: "res-1",
  hostelId: "1",
  roomId: "1-1",
  startDate: new Date(2025, 7, 15),
  endDate: new Date(2026, 5, 30),
  status: "active",
  paymentStatus: "current"
};

const mockPayments = [
  {
    id: "pay-1",
    date: new Date(2025, 7, 15),
    amount: 450,
    type: "Security Deposit",
    status: "paid"
  },
  {
    id: "pay-2",
    date: new Date(2025, 8, 1),
    amount: 450,
    type: "First Month Rent",
    status: "paid"
  },
  {
    id: "pay-3",
    date: new Date(2025, 9, 1),
    amount: 450,
    type: "Monthly Rent",
    status: "paid"
  },
  {
    id: "pay-4",
    date: new Date(2025, 10, 1),
    amount: 450,
    type: "Monthly Rent",
    status: "upcoming"
  }
];

const mockMaintenanceRequests = [
  {
    id: "maint-1",
    title: "Leaking faucet in bathroom",
    date: new Date(2025, 8, 10),
    status: "in-progress",
    description: "The bathroom sink has a slow leak that needs to be fixed.",
    comments: [
      {
        author: "Maintenance Staff",
        date: new Date(2025, 8, 11),
        text: "We've scheduled a repair for tomorrow afternoon."
      }
    ]
  },
  {
    id: "maint-2",
    title: "Light bulb replacement",
    date: new Date(2025, 9, 5),
    status: "completed",
    description: "The ceiling light in the bedroom is not working.",
    comments: [
      {
        author: "Maintenance Staff",
        date: new Date(2025, 9, 5),
        text: "We've replaced the light bulb and tested it. All working now."
      }
    ]
  }
];

const mockNotifications = [
  {
    id: "notif-1",
    title: "Rent Reminder",
    date: new Date(2025, 9, 28),
    read: false,
    message: "Your monthly rent payment of $450 is due in 3 days."
  },
  {
    id: "notif-2",
    title: "Maintenance Update",
    date: new Date(2025, 8, 11),
    read: true,
    message: "Your maintenance request for the leaking faucet has been scheduled."
  },
  {
    id: "notif-3",
    title: "Community Event",
    date: new Date(2025, 8, 20),
    read: true,
    message: "Join us for a welcome party in the common area this Saturday at 7 PM."
  }
];

const StudentDashboard = () => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState("overview");
  
  const hostel = user ? hostels.find((h) => h.id === mockReservation.hostelId) : null;
  const room = hostel ? hostel.rooms.find(r => r.id === mockReservation.roomId) : null;
  
  // Simplified navigation for student dashboard
  const navigation = [
    { name: "Overview", icon: Home, tab: "overview" },
    { name: "Reservations", icon: BedDouble, tab: "reservations" },
    { name: "Payments", icon: CreditCard, tab: "payments" },
    { name: "Maintenance", icon: Wrench, tab: "maintenance" },
    { name: "Messages", icon: MessageCircle, tab: "messages", count: 2 },
    { name: "Settings", icon: Settings, tab: "settings" }
  ];

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Access Denied</h1>
          <p className="text-gray-600 mb-6">Please sign in to access your student dashboard.</p>
          <Link to="/login" className="btn-primary">
            Sign In
          </Link>
        </div>
      </div>
    );
  }

  // Render the appropriate tab content
  const renderTabContent = () => {
    switch (activeTab) {
      case "overview":
        return (
          <div className="space-y-6">
            {/* Welcome Card */}
            <div className="bg-gradient-to-r from-hostel-primary to-hostel-secondary rounded-lg text-white p-6">
              <h2 className="text-2xl font-bold mb-2">Welcome back, {user.name}!</h2>
              <p className="opacity-90 mb-4">
                Manage your accommodation, payments, and maintenance requests from your personal dashboard.
              </p>
              {hostel ? (
                <div className="flex items-center">
                  <Calendar className="w-5 h-5 mr-2" />
                  <span>
                    Your stay: {mockReservation.startDate.toLocaleDateString()} - {mockReservation.endDate.toLocaleDateString()}
                  </span>
                </div>
              ) : (
                <Link to="/hostels" className="inline-flex items-center bg-white/20 hover:bg-white/30 transition-colors px-4 py-2 rounded-md">
                  Find a Hostel
                  <ChevronRight size={16} className="ml-2" />
                </Link>
              )}
            </div>

            {/* Current Reservation */}
            {hostel && room ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-white rounded-lg shadow-sm p-6">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="text-lg font-semibold text-hostel-dark">Current Reservation</h3>
                      <p className="text-gray-600">Your active hostel booking</p>
                    </div>
                    <div className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs font-medium">
                      Active
                    </div>
                  </div>

                  <div className="flex items-start space-x-4">
                    <img 
                      src={hostel.images[0]} 
                      alt={hostel.name} 
                      className="w-24 h-24 object-cover rounded"
                    />
                    <div>
                      <h4 className="font-medium text-hostel-dark">{hostel.name}</h4>
                      <p className="text-sm text-gray-600 mb-1">{room.name}</p>
                      <p className="text-sm text-gray-600 mb-2">{hostel.location}</p>
                      <Link 
                        to={`/hostels/${hostel.id}`}
                        className="text-sm text-hostel-primary hover:text-hostel-secondary"
                      >
                        View Details
                      </Link>
                    </div>
                  </div>
                </div>

                <div className="bg-white rounded-lg shadow-sm p-6">
                  <h3 className="text-lg font-semibold text-hostel-dark mb-4">Payment Summary</h3>
                  
                  <div className="mb-4">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-gray-600">Monthly Rent</span>
                      <span className="font-medium">${room.price}</span>
                    </div>
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-gray-600">Payment Status</span>
                      <span className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs font-medium">
                        Current
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">Next Payment Due</span>
                      <span className="font-medium">Nov 1, 2025</span>
                    </div>
                  </div>
                  
                  <Link 
                    to="#"
                    onClick={() => setActiveTab("payments")}
                    className="text-sm text-hostel-primary hover:text-hostel-secondary flex items-center"
                  >
                    View All Payments
                    <ChevronRight size={16} className="ml-1" />
                  </Link>
                </div>
              </div>
            ) : (
              <div className="bg-white rounded-lg shadow-sm p-6 text-center">
                <div className="mb-4">
                  <BedDouble size={48} className="mx-auto text-gray-400" />
                </div>
                <h3 className="text-xl font-semibold text-hostel-dark mb-2">No Active Reservation</h3>
                <p className="text-gray-600 mb-6">
                  You don't have any active reservation. Browse hostels to find your perfect accommodation.
                </p>
                <Link 
                  to="/hostels"
                  className="btn-primary"
                >
                  Find a Hostel
                </Link>
              </div>
            )}

            {/* Maintenance & Notifications */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Quick Actions */}
              <div className="bg-white rounded-lg shadow-sm p-6">
                <h3 className="text-lg font-semibold text-hostel-dark mb-4">Quick Actions</h3>
                
                <div className="grid grid-cols-2 gap-4">
                  <Link 
                    to="#"
                    onClick={() => setActiveTab("maintenance")}
                    className="flex flex-col items-center justify-center p-4 border rounded-lg hover:bg-hostel-accent/20 hover:border-hostel-primary transition-colors"
                  >
                    <Wrench size={24} className="text-hostel-primary mb-2" />
                    <span className="text-sm text-center">Submit Maintenance Request</span>
                  </Link>
                  <Link 
                    to="#"
                    onClick={() => setActiveTab("payments")}
                    className="flex flex-col items-center justify-center p-4 border rounded-lg hover:bg-hostel-accent/20 hover:border-hostel-primary transition-colors"
                  >
                    <CreditCard size={24} className="text-hostel-primary mb-2" />
                    <span className="text-sm text-center">Make a Payment</span>
                  </Link>
                  <Link 
                    to="#"
                    onClick={() => setActiveTab("messages")}
                    className="flex flex-col items-center justify-center p-4 border rounded-lg hover:bg-hostel-accent/20 hover:border-hostel-primary transition-colors"
                  >
                    <MessageCircle size={24} className="text-hostel-primary mb-2" />
                    <span className="text-sm text-center">Contact Owner</span>
                  </Link>
                  <Link 
                    to="#"
                    onClick={() => setActiveTab("settings")}
                    className="flex flex-col items-center justify-center p-4 border rounded-lg hover:bg-hostel-accent/20 hover:border-hostel-primary transition-colors"
                  >
                    <FileText size={24} className="text-hostel-primary mb-2" />
                    <span className="text-sm text-center">View Documents</span>
                  </Link>
                </div>
              </div>

              {/* Recent Notifications */}
              <div className="bg-white rounded-lg shadow-sm p-6">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-lg font-semibold text-hostel-dark">Recent Notifications</h3>
                  <Bell size={20} className="text-hostel-primary" />
                </div>
                
                <div className="space-y-4">
                  {mockNotifications.slice(0, 3).map((notification) => (
                    <div 
                      key={notification.id}
                      className={`flex items-start p-3 rounded-md ${notification.read ? "" : "bg-hostel-accent/10 border-l-2 border-hostel-primary"}`}
                    >
                      <div className="flex-grow">
                        <div className="flex justify-between">
                          <h4 className={`text-sm font-medium ${notification.read ? "text-gray-700" : "text-hostel-dark"}`}>
                            {notification.title}
                          </h4>
                          <span className="text-xs text-gray-500">
                            {notification.date.toLocaleDateString()}
                          </span>
                        </div>
                        <p className="text-sm text-gray-600 mt-1">
                          {notification.message}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
                
                {mockNotifications.length > 3 && (
                  <Link 
                    to="#"
                    onClick={() => setActiveTab("messages")}
                    className="text-sm text-hostel-primary hover:text-hostel-secondary flex items-center justify-center mt-4"
                  >
                    View All Notifications
                    <ChevronRight size={16} className="ml-1" />
                  </Link>
                )}
              </div>
            </div>
          </div>
        );
        
      case "maintenance":
        return (
          <div className="space-y-6">
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-xl font-semibold text-hostel-dark mb-6">Maintenance Requests</h2>
              
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-lg text-gray-700">Your Requests</h3>
                <button 
                  className="btn-primary flex items-center"
                >
                  <Clipboard className="mr-2" size={16} />
                  New Request
                </button>
              </div>
              
              {mockMaintenanceRequests.length > 0 ? (
                <div className="space-y-4">
                  {mockMaintenanceRequests.map((request) => (
                    <div 
                      key={request.id} 
                      className="border rounded-lg p-4 hover:border-hostel-primary transition-colors"
                    >
                      <div className="flex justify-between items-start">
                        <div>
                          <h4 className="font-medium text-hostel-dark">{request.title}</h4>
                          <p className="text-sm text-gray-600 mb-2">
                            Submitted on {request.date.toLocaleDateString()}
                          </p>
                          <p className="text-sm text-gray-700">{request.description}</p>
                        </div>
                        <div>
                          <span 
                            className={`px-2 py-1 rounded-full text-xs font-medium ${
                              request.status === "completed" 
                                ? "bg-green-100 text-green-800" 
                                : request.status === "in-progress"
                                ? "bg-blue-100 text-blue-800"
                                : "bg-yellow-100 text-yellow-800"
                            }`}
                          >
                            {request.status === "completed" 
                              ? "Completed" 
                              : request.status === "in-progress"
                              ? "In Progress"
                              : "Pending"}
                          </span>
                        </div>
                      </div>
                      
                      {request.comments && request.comments.length > 0 && (
                        <div className="mt-4 pt-4 border-t">
                          <h5 className="text-sm font-medium text-gray-700 mb-2">Comments:</h5>
                          {request.comments.map((comment, idx) => (
                            <div key={idx} className="bg-gray-50 p-3 rounded-md mb-2">
                              <div className="flex justify-between text-xs text-gray-500 mb-1">
                                <span>{comment.author}</span>
                                <span>{comment.date.toLocaleDateString()}</span>
                              </div>
                              <p className="text-sm text-gray-700">{comment.text}</p>
                            </div>
                          ))}
                        </div>
                      )}
                      
                      <div className="mt-4 flex justify-end">
                        <button className="text-sm text-hostel-primary hover:text-hostel-secondary">
                          View Details
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-12">
                  <div className="mb-4">
                    <Wrench size={48} className="mx-auto text-gray-400" />
                  </div>
                  <h4 className="text-lg font-medium text-gray-700 mb-2">No Maintenance Requests</h4>
                  <p className="text-gray-600 mb-6">
                    You haven't submitted any maintenance requests yet.
                  </p>
                  <button className="btn-primary">
                    Create New Request
                  </button>
                </div>
              )}
            </div>
          </div>
        );
        
      case "payments":
        return (
          <div className="space-y-6">
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-xl font-semibold text-hostel-dark mb-6">Payments</h2>
              
              {hostel && room ? (
                <>
                  <div className="bg-gray-50 rounded-lg p-4 mb-6">
                    <div className="flex flex-col md:flex-row justify-between md:items-center">
                      <div>
                        <h3 className="font-medium text-hostel-dark mb-2">Current Payment Plan</h3>
                        <p className="text-gray-700 mb-1">
                          <span className="font-medium">{hostel.name}</span> - {room.name}
                        </p>
                        <p className="text-gray-600 text-sm mb-4 md:mb-0">
                          Monthly rent: <span className="font-medium">${room.price}</span> due on the 1st of each month
                        </p>
                      </div>
                      
                      <button className="btn-primary">
                        Make Payment
                      </button>
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="font-medium text-hostel-dark mb-4">Payment History</h3>
                    
                    <div className="overflow-x-auto">
                      <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                          <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                              Date
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                              Type
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                              Amount
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                              Status
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                              Actions
                            </th>
                          </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                          {mockPayments.map((payment) => (
                            <tr key={payment.id}>
                              <td className="px-6 py-4 whitespace-nowrap">
                                <div className="text-sm text-gray-900">
                                  {payment.date.toLocaleDateString()}
                                </div>
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap">
                                <div className="text-sm text-gray-900">
                                  {payment.type}
                                </div>
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap">
                                <div className="text-sm font-medium text-gray-900">
                                  ${payment.amount}
                                </div>
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap">
                                <span className={`px-2 py-1 text-xs rounded-full font-medium ${
                                  payment.status === "paid" 
                                    ? "bg-green-100 text-green-800" 
                                    : payment.status === "upcoming"
                                    ? "bg-yellow-100 text-yellow-800"
                                    : "bg-red-100 text-red-800"
                                }`}>
                                  {payment.status === "paid" 
                                    ? "Paid" 
                                    : payment.status === "upcoming"
                                    ? "Upcoming"
                                    : "Overdue"}
                                </span>
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm">
                                {payment.status === "paid" ? (
                                  <button className="text-hostel-primary hover:text-hostel-secondary">
                                    View Receipt
                                  </button>
                                ) : payment.status === "upcoming" ? (
                                  <button className="text-hostel-primary hover:text-hostel-secondary">
                                    Pay Now
                                  </button>
                                ) : (
                                  <button className="text-red-600 hover:text-red-800">
                                    Pay Immediately
                                  </button>
                                )}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </>
              ) : (
                <div className="text-center py-12">
                  <div className="mb-4">
                    <CreditCard size={48} className="mx-auto text-gray-400" />
                  </div>
                  <h4 className="text-lg font-medium text-gray-700 mb-2">No Payment History</h4>
                  <p className="text-gray-600 mb-6">
                    You don't have any active reservations or payment history yet.
                  </p>
                  <Link 
                    to="/hostels"
                    className="btn-primary"
                  >
                    Find a Hostel
                  </Link>
                </div>
              )}
            </div>
          </div>
        );
        
      // Simple placeholder for other tabs
      default:
        return (
          <div className="bg-white rounded-lg shadow-sm p-6 text-center">
            <h2 className="text-xl font-semibold text-hostel-dark mb-4">
              {activeTab.charAt(0).toUpperCase() + activeTab.slice(1)}
            </h2>
            <p className="text-gray-600 mb-6">
              This feature will be available in the next update.
            </p>
            <button 
              onClick={() => setActiveTab("overview")}
              className="btn-primary"
            >
              Return to Overview
            </button>
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {/* Sidebar */}
          <div className="md:col-span-1">
            <div className="bg-white rounded-lg shadow-sm overflow-hidden">
              <div className="p-6 border-b border-gray-100">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-hostel-primary rounded-full flex items-center justify-center text-white text-xl font-medium">
                    {user.name.charAt(0)}
                  </div>
                  <div>
                    <h3 className="font-medium text-hostel-dark">{user.name}</h3>
                    <p className="text-sm text-gray-600">Student</p>
                  </div>
                </div>
              </div>
              
              <nav className="p-4">
                <ul className="space-y-1">
                  {navigation.map((item) => (
                    <li key={item.tab}>
                      <button
                        onClick={() => setActiveTab(item.tab)}
                        className={`w-full flex items-center justify-between px-4 py-2 rounded-md ${
                          activeTab === item.tab
                            ? "bg-hostel-accent text-hostel-primary"
                            : "text-gray-700 hover:bg-gray-50"
                        }`}
                      >
                        <div className="flex items-center">
                          <item.icon
                            className={`mr-3 h-5 w-5 ${
                              activeTab === item.tab
                                ? "text-hostel-primary"
                                : "text-gray-500"
                            }`}
                          />
                          <span>{item.name}</span>
                        </div>
                        {item.count && (
                          <span className="bg-hostel-primary text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">
                            {item.count}
                          </span>
                        )}
                      </button>
                    </li>
                  ))}
                </ul>
              </nav>
              
              <div className="p-4 border-t border-gray-100">
                <Link
                  to="/hostels"
                  className="flex items-center justify-center space-x-2 text-hostel-primary hover:text-hostel-secondary transition-colors"
                >
                  <Home size={16} />
                  <span>Browse Hostels</span>
                </Link>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="md:col-span-3">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              {renderTabContent()}
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentDashboard;
