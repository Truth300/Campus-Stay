
import { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useAuth } from "@/context/AuthContext";
import {
  Home, Building, Users, CreditCard, Settings, Wrench, 
  Bell, MessageCircle, BarChart2, DollarSign, Calendar,
  CheckCircle, XCircle, Clock, ChevronDown, ChevronUp,
  Trash, Edit, Plus, ChevronRight, ArrowUp, ArrowDown
} from "lucide-react";
import { hostels } from "@/data/mockData";

// Mock data for owner dashboard
const ownerHostels = hostels.filter(hostel => hostel.ownerId === "owner-1");

const mockApplications = [
  {
    id: "app-1",
    studentName: "Jane Smith",
    studentEmail: "jane.smith@example.com",
    hostelId: "1",
    roomId: "1-1",
    date: new Date(2025, 8, 15),
    status: "pending",
    message: "I'm interested in booking this room for the upcoming semester."
  },
  {
    id: "app-2",
    studentName: "Mike Johnson",
    studentEmail: "mike.j@example.com",
    hostelId: "3",
    roomId: "3-1",
    date: new Date(2025, 8, 10),
    status: "approved",
    message: "Looking for a place close to campus."
  },
  {
    id: "app-3",
    studentName: "Sarah Lee",
    studentEmail: "sarah.lee@example.com",
    hostelId: "1",
    roomId: "1-2",
    date: new Date(2025, 8, 5),
    status: "rejected",
    message: "I need a quiet place to study."
  }
];

const mockTenants = [
  {
    id: "tenant-1",
    name: "Alex Williams",
    email: "alex.w@example.com",
    roomId: "1-1",
    hostelId: "1",
    startDate: new Date(2025, 7, 1),
    endDate: new Date(2026, 6, 30),
    paymentStatus: "current"
  },
  {
    id: "tenant-2",
    name: "Taylor Brown",
    email: "taylor.b@example.com",
    roomId: "1-2",
    hostelId: "1",
    startDate: new Date(2025, 7, 15),
    endDate: new Date(2026, 1, 15),
    paymentStatus: "current"
  },
  {
    id: "tenant-3",
    name: "Jordan Rivera",
    email: "jordan.r@example.com",
    roomId: "3-2",
    hostelId: "3",
    startDate: new Date(2025, 8, 1),
    endDate: new Date(2026, 7, 31),
    paymentStatus: "overdue"
  }
];

const mockMaintenanceRequests = [
  {
    id: "maint-1",
    title: "Leaking faucet in bathroom",
    hostelId: "1",
    roomId: "1-1",
    tenantName: "Alex Williams",
    date: new Date(2025, 8, 10),
    status: "in-progress",
    priority: "medium",
    description: "The bathroom sink has a slow leak that needs to be fixed."
  },
  {
    id: "maint-2",
    title: "Broken window handle",
    hostelId: "3",
    roomId: "3-2",
    tenantName: "Jordan Rivera",
    date: new Date(2025, 8, 15),
    status: "pending",
    priority: "high",
    description: "The window handle in the bedroom is broken and won't close properly."
  },
  {
    id: "maint-3",
    title: "Light bulb replacement",
    hostelId: "1",
    roomId: "1-2",
    tenantName: "Taylor Brown",
    date: new Date(2025, 8, 5),
    status: "completed",
    priority: "low",
    description: "The ceiling light in the bedroom needs a new bulb."
  }
];

const mockRevenue = [
  { month: "Jan", amount: 2500 },
  { month: "Feb", amount: 2500 },
  { month: "Mar", amount: 3000 },
  { month: "Apr", amount: 3000 },
  { month: "May", amount: 2750 },
  { month: "Jun", amount: 3250 },
  { month: "Jul", amount: 4000 },
  { month: "Aug", amount: 4500 },
  { month: "Sep", amount: 4250 },
  { month: "Oct", amount: 3750 },
  { month: "Nov", amount: 3500 },
  { month: "Dec", amount: 3250 }
];

const mockStatistics = {
  totalRooms: 14,
  occupiedRooms: 8,
  vacantRooms: 6,
  occupancyRate: 57,
  totalTenants: 8,
  pendingApplications: 1,
  maintenanceIssues: 2,
  monthlyRevenue: 3500
};

const OwnerDashboard = () => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState("overview");
  const [expandedHostel, setExpandedHostel] = useState<string | null>(null);
  const [applicationView, setApplicationView] = useState("all");

  // Simplified navigation for owner dashboard
  const navigation = [
    { name: "Overview", icon: Home, tab: "overview" },
    { name: "My Hostels", icon: Building, tab: "hostels" },
    { name: "Tenants", icon: Users, tab: "tenants" },
    { name: "Applications", icon: CheckCircle, tab: "applications", count: mockApplications.filter(a => a.status === "pending").length },
    { name: "Finances", icon: DollarSign, tab: "finances" },
    { name: "Maintenance", icon: Wrench, tab: "maintenance" },
    { name: "Messages", icon: MessageCircle, tab: "messages", count: 3 },
    { name: "Settings", icon: Settings, tab: "settings" }
  ];

  if (!user || user.role !== "owner") {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Access Denied</h1>
          <p className="text-gray-600 mb-6">This dashboard is only available to hostel owners.</p>
          <Link to="/" className="btn-primary">
            Return to Home
          </Link>
        </div>
      </div>
    );
  }

  const toggleHostelExpand = (id: string) => {
    if (expandedHostel === id) {
      setExpandedHostel(null);
    } else {
      setExpandedHostel(id);
    }
  };

  // Filter applications based on the selected view
  const filteredApplications = mockApplications.filter(app => {
    if (applicationView === "all") return true;
    return app.status === applicationView;
  });

  // Render the appropriate tab content
  const renderTabContent = () => {
    switch (activeTab) {
      case "overview":
        return (
          <div className="space-y-6">
            {/* Welcome Message */}
            <div className="bg-gradient-to-r from-hostel-primary to-hostel-secondary rounded-lg text-white p-6 shadow-sm">
              <div className="flex flex-col md:flex-row md:items-center justify-between">
                <div>
                  <h2 className="text-2xl font-bold mb-2">Welcome back, {user.name}!</h2>
                  <p className="opacity-90">
                    Manage your hostels, tenants, and bookings from your personal dashboard.
                  </p>
                </div>
                <div className="mt-4 md:mt-0">
                  <Link
                    to="/create-hostel"
                    className="inline-flex items-center bg-white text-hostel-primary hover:bg-gray-100 transition-colors px-4 py-2 rounded-md"
                  >
                    <Plus size={18} className="mr-2" />
                    Add New Hostel
                  </Link>
                </div>
              </div>
            </div>

            {/* Statistics Overview */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-500">Occupancy Rate</p>
                    <h4 className="text-2xl font-bold text-hostel-dark">{mockStatistics.occupancyRate}%</h4>
                  </div>
                  <div className="w-12 h-12 bg-hostel-accent rounded-full flex items-center justify-center">
                    <Users className="text-hostel-primary" />
                  </div>
                </div>
                <div className="mt-2">
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-hostel-primary h-2 rounded-full"
                      style={{ width: `${mockStatistics.occupancyRate}%` }}
                    ></div>
                  </div>
                </div>
                <div className="mt-2 text-xs text-gray-500 flex justify-between">
                  <span>{mockStatistics.occupiedRooms} occupied</span>
                  <span>{mockStatistics.vacantRooms} vacant</span>
                </div>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-sm">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-500">Monthly Revenue</p>
                    <h4 className="text-2xl font-bold text-hostel-dark">
                      ${mockStatistics.monthlyRevenue}
                    </h4>
                  </div>
                  <div className="w-12 h-12 bg-hostel-accent rounded-full flex items-center justify-center">
                    <DollarSign className="text-hostel-primary" />
                  </div>
                </div>
                <div className="mt-2 text-xs text-gray-500 flex items-center">
                  <ArrowUp className="text-green-500 mr-1" size={14} />
                  <span className="text-green-500 font-medium">12%</span>
                  <span className="ml-1">vs last month</span>
                </div>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-sm">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-500">Total Tenants</p>
                    <h4 className="text-2xl font-bold text-hostel-dark">
                      {mockStatistics.totalTenants}
                    </h4>
                  </div>
                  <div className="w-12 h-12 bg-hostel-accent rounded-full flex items-center justify-center">
                    <Users className="text-hostel-primary" />
                  </div>
                </div>
                <div className="mt-2 text-xs text-gray-500">
                  <span>{mockStatistics.pendingApplications} pending application(s)</span>
                </div>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-sm">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-500">Maintenance Issues</p>
                    <h4 className="text-2xl font-bold text-hostel-dark">
                      {mockStatistics.maintenanceIssues}
                    </h4>
                  </div>
                  <div className="w-12 h-12 bg-hostel-accent rounded-full flex items-center justify-center">
                    <Wrench className="text-hostel-primary" />
                  </div>
                </div>
                <div className="mt-2 text-xs text-gray-500">
                  <span>
                    {
                      mockMaintenanceRequests.filter(
                        (req) => req.status === "pending" || req.status === "in-progress"
                      ).length
                    }{" "}
                    open request(s)
                  </span>
                </div>
              </div>
            </div>

            {/* Revenue Chart */}
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-lg font-semibold text-hostel-dark">Revenue Overview</h3>
                <select className="form-input py-1 px-3 text-sm">
                  <option>2025</option>
                  <option>2024</option>
                </select>
              </div>

              <div className="h-64">
                <div className="flex h-full">
                  {mockRevenue.map((item, index) => (
                    <div
                      key={index}
                      className="flex-1 flex flex-col justify-end items-center"
                    >
                      <div
                        className="w-5/6 bg-hostel-primary hover:bg-hostel-secondary transition-colors rounded-t"
                        style={{ height: `${(item.amount / 5000) * 100}%` }}
                      ></div>
                      <div className="text-xs text-gray-600 mt-2">{item.month}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Recent Applications and Maintenance */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Recent Applications */}
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-lg font-semibold text-hostel-dark">Recent Applications</h3>
                  <button 
                    onClick={() => setActiveTab("applications")}
                    className="text-sm text-hostel-primary hover:text-hostel-secondary"
                  >
                    View All
                  </button>
                </div>

                <div className="space-y-4">
                  {mockApplications.slice(0, 3).map((app) => (
                    <div
                      key={app.id}
                      className="border rounded-lg p-4 hover:border-hostel-primary transition-colors"
                    >
                      <div className="flex justify-between">
                        <h4 className="font-medium text-hostel-dark">{app.studentName}</h4>
                        <span
                          className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                            app.status === "approved"
                              ? "bg-green-100 text-green-800"
                              : app.status === "rejected"
                              ? "bg-red-100 text-red-800"
                              : "bg-yellow-100 text-yellow-800"
                          }`}
                        >
                          {app.status === "approved"
                            ? "Approved"
                            : app.status === "rejected"
                            ? "Rejected"
                            : "Pending"}
                        </span>
                      </div>
                      <p className="text-sm text-gray-600 mt-1">
                        {
                          hostels
                            .find((h) => h.id === app.hostelId)
                            ?.rooms.find((r) => r.id === app.roomId)?.name
                        }{" "}
                        at{" "}
                        {hostels.find((h) => h.id === app.hostelId)?.name}
                      </p>
                      <p className="text-xs text-gray-500 mt-1">
                        Applied on {app.date.toLocaleDateString()}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Maintenance Requests */}
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-lg font-semibold text-hostel-dark">Maintenance Requests</h3>
                  <button 
                    onClick={() => setActiveTab("maintenance")}
                    className="text-sm text-hostel-primary hover:text-hostel-secondary"
                  >
                    View All
                  </button>
                </div>

                <div className="space-y-4">
                  {mockMaintenanceRequests.slice(0, 3).map((req) => (
                    <div
                      key={req.id}
                      className="border rounded-lg p-4 hover:border-hostel-primary transition-colors"
                    >
                      <div className="flex justify-between">
                        <h4 className="font-medium text-hostel-dark">{req.title}</h4>
                        <span
                          className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                            req.status === "completed"
                              ? "bg-green-100 text-green-800"
                              : req.status === "in-progress"
                              ? "bg-blue-100 text-blue-800"
                              : "bg-yellow-100 text-yellow-800"
                          }`}
                        >
                          {req.status === "completed"
                            ? "Completed"
                            : req.status === "in-progress"
                            ? "In Progress"
                            : "Pending"}
                        </span>
                      </div>
                      <p className="text-sm text-gray-600 mt-1">
                        {req.tenantName} -{" "}
                        {hostels.find((h) => h.id === req.hostelId)?.name}
                      </p>
                      <div className="flex justify-between items-center mt-2">
                        <span
                          className={`inline-flex items-center px-2 py-1 rounded-full text-xs ${
                            req.priority === "high"
                              ? "bg-red-100 text-red-800"
                              : req.priority === "medium"
                              ? "bg-yellow-100 text-yellow-800"
                              : "bg-green-100 text-green-800"
                          }`}
                        >
                          {req.priority} priority
                        </span>
                        <p className="text-xs text-gray-500">
                          Reported on {req.date.toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        );
        
      case "hostels":
        return (
          <div className="space-y-6">
            <div className="bg-white rounded-lg shadow-sm p-6">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6">
                <h2 className="text-xl font-semibold text-hostel-dark">My Hostels</h2>
                <Link
                  to="/create-hostel"
                  className="mt-4 sm:mt-0 btn-primary flex items-center"
                >
                  <Plus size={18} className="mr-2" />
                  Add New Hostel
                </Link>
              </div>

              {ownerHostels.length > 0 ? (
                <div className="space-y-6">
                  {ownerHostels.map((hostel) => (
                    <div 
                      key={hostel.id}
                      className="border rounded-lg overflow-hidden"
                    >
                      {/* Hostel Header */}
                      <div className="bg-gray-50 p-4 flex flex-col sm:flex-row justify-between">
                        <div className="flex items-start space-x-4">
                          <img 
                            src={hostel.images[0]} 
                            alt={hostel.name}
                            className="w-24 h-24 object-cover rounded"
                          />
                          <div>
                            <h3 className="font-semibold text-hostel-dark mb-1">{hostel.name}</h3>
                            <p className="text-sm text-gray-600 mb-1">{hostel.address}</p>
                            <div className="flex items-center">
                              <div className="bg-green-100 text-green-800 rounded-full px-2 py-0.5 text-xs font-medium">
                                {
                                  Math.round(
                                    (mockTenants.filter(t => t.hostelId === hostel.id).length / 
                                    hostel.rooms.reduce((acc, room) => acc + room.capacity, 0)) * 100
                                  )
                                }% occupied
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="flex mt-4 sm:mt-0 space-x-2">
                          <Link
                            to={`/edit-hostel/${hostel.id}`}
                            className="px-3 py-1 border border-gray-300 rounded text-gray-700 hover:bg-gray-50 transition-colors flex items-center text-sm"
                          >
                            <Edit size={15} className="mr-1" />
                            Edit
                          </Link>
                          <Link
                            to={`/hostels/${hostel.id}`}
                            className="px-3 py-1 border border-hostel-primary text-hostel-primary rounded hover:bg-hostel-accent transition-colors flex items-center text-sm"
                          >
                            View
                          </Link>
                          <button
                            onClick={() => toggleHostelExpand(hostel.id)}
                            className="px-3 py-1 bg-hostel-primary text-white rounded hover:bg-hostel-secondary transition-colors flex items-center text-sm"
                          >
                            {expandedHostel === hostel.id ? (
                              <ChevronUp size={15} className="mr-1" />
                            ) : (
                              <ChevronDown size={15} className="mr-1" />
                            )}
                            {expandedHostel === hostel.id ? "Collapse" : "Details"}
                          </button>
                        </div>
                      </div>

                      {/* Expandable Details */}
                      {expandedHostel === hostel.id && (
                        <div className="p-4 border-t">
                          <div className="mb-4">
                            <h4 className="font-medium text-gray-700 mb-2">Room Summary</h4>
                            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                              {hostel.rooms.map((room) => {
                                const occupiedCount = mockTenants.filter(
                                  (t) => t.hostelId === hostel.id && t.roomId === room.id
                                ).length;
                                
                                return (
                                  <div
                                    key={room.id}
                                    className="border rounded p-3"
                                  >
                                    <div className="flex justify-between items-start">
                                      <h5 className="font-medium text-hostel-dark">{room.name}</h5>
                                      <span className="text-sm text-gray-500">
                                        ${room.price}/month
                                      </span>
                                    </div>
                                    <div className="mt-2">
                                      <div className="text-sm text-gray-600">
                                        Capacity: {room.capacity}
                                      </div>
                                      <div className="text-sm text-gray-600">
                                        Occupied: {occupiedCount}
                                      </div>
                                      <div className="text-sm text-gray-600">
                                        Available: {room.available}
                                      </div>
                                    </div>
                                  </div>
                                );
                              })}
                            </div>
                          </div>

                          <div>
                            <h4 className="font-medium text-gray-700 mb-2">Tenants</h4>
                            {mockTenants.filter(t => t.hostelId === hostel.id).length > 0 ? (
                              <div className="overflow-x-auto">
                                <table className="min-w-full divide-y divide-gray-200">
                                  <thead>
                                    <tr>
                                      <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">
                                        Name
                                      </th>
                                      <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">
                                        Room
                                      </th>
                                      <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">
                                        Period
                                      </th>
                                      <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">
                                        Status
                                      </th>
                                      <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">
                                        Actions
                                      </th>
                                    </tr>
                                  </thead>
                                  <tbody>
                                    {mockTenants
                                      .filter(t => t.hostelId === hostel.id)
                                      .map((tenant) => (
                                        <tr key={tenant.id}>
                                          <td className="px-4 py-3 text-sm">
                                            {tenant.name}
                                          </td>
                                          <td className="px-4 py-3 text-sm">
                                            {
                                              hostel.rooms.find(
                                                (r) => r.id === tenant.roomId
                                              )?.name
                                            }
                                          </td>
                                          <td className="px-4 py-3 text-sm">
                                            {tenant.startDate.toLocaleDateString()} - 
                                            {tenant.endDate.toLocaleDateString()}
                                          </td>
                                          <td className="px-4 py-3 text-sm">
                                            <span
                                              className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${
                                                tenant.paymentStatus === "current"
                                                  ? "bg-green-100 text-green-800"
                                                  : "bg-red-100 text-red-800"
                                              }`}
                                            >
                                              {tenant.paymentStatus === "current" ? "Current" : "Overdue"}
                                            </span>
                                          </td>
                                          <td className="px-4 py-3 text-sm">
                                            <button className="text-hostel-primary hover:text-hostel-secondary">
                                              View Profile
                                            </button>
                                          </td>
                                        </tr>
                                      ))}
                                  </tbody>
                                </table>
                              </div>
                            ) : (
                              <p className="text-gray-500 text-sm italic">No tenants currently.</p>
                            )}
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-12">
                  <div className="mb-4">
                    <Building size={48} className="mx-auto text-gray-400" />
                  </div>
                  <h3 className="text-lg font-medium text-gray-700 mb-2">No Hostels Listed</h3>
                  <p className="text-gray-600 mb-6">
                    You haven't listed any hostels yet. Add your first hostel to start receiving applications.
                  </p>
                  <Link to="/create-hostel" className="btn-primary">
                    Add Your First Hostel
                  </Link>
                </div>
              )}
            </div>
          </div>
        );
       
      case "applications":
        return (
          <div className="space-y-6">
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-xl font-semibold text-hostel-dark mb-6">Student Applications</h2>
              
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6">
                <div className="flex mb-4 sm:mb-0">
                  <button
                    onClick={() => setApplicationView("all")}
                    className={`px-4 py-2 text-sm rounded-l-md ${
                      applicationView === "all"
                        ? "bg-hostel-primary text-white"
                        : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                    }`}
                  >
                    All
                  </button>
                  <button
                    onClick={() => setApplicationView("pending")}
                    className={`px-4 py-2 text-sm ${
                      applicationView === "pending"
                        ? "bg-hostel-primary text-white"
                        : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                    }`}
                  >
                    Pending
                  </button>
                  <button
                    onClick={() => setApplicationView("approved")}
                    className={`px-4 py-2 text-sm ${
                      applicationView === "approved"
                        ? "bg-hostel-primary text-white"
                        : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                    }`}
                  >
                    Approved
                  </button>
                  <button
                    onClick={() => setApplicationView("rejected")}
                    className={`px-4 py-2 text-sm rounded-r-md ${
                      applicationView === "rejected"
                        ? "bg-hostel-primary text-white"
                        : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                    }`}
                  >
                    Rejected
                  </button>
                </div>
                
                <div className="w-full sm:w-auto">
                  <input
                    type="text"
                    placeholder="Search applications..."
                    className="form-input w-full"
                  />
                </div>
              </div>
              
              {filteredApplications.length > 0 ? (
                <div className="space-y-4">
                  {filteredApplications.map((app) => {
                    const hostel = hostels.find((h) => h.id === app.hostelId);
                    const room = hostel?.rooms.find((r) => r.id === app.roomId);
                    
                    return (
                      <div 
                        key={app.id}
                        className="border rounded-lg p-4 hover:border-hostel-primary transition-colors"
                      >
                        <div className="flex flex-col sm:flex-row justify-between">
                          <div className="mb-4 sm:mb-0">
                            <div className="flex items-start space-x-4">
                              <div className="w-10 h-10 rounded-full bg-hostel-accent flex items-center justify-center text-hostel-primary">
                                {app.studentName.charAt(0)}
                              </div>
                              <div>
                                <h3 className="font-medium text-hostel-dark">{app.studentName}</h3>
                                <p className="text-sm text-gray-600">{app.studentEmail}</p>
                                <div className="text-sm text-gray-700 mt-1">
                                  <span className="font-medium">Applied for:</span> {room?.name} at {hostel?.name}
                                </div>
                                <div className="text-xs text-gray-500 mt-1">
                                  Applied on {app.date.toLocaleDateString()}
                                </div>
                              </div>
                            </div>
                          </div>
                          
                          <div className="flex flex-col items-end">
                            <span
                              className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium mb-2 ${
                                app.status === "approved"
                                  ? "bg-green-100 text-green-800"
                                  : app.status === "rejected"
                                  ? "bg-red-100 text-red-800"
                                  : "bg-yellow-100 text-yellow-800"
                              }`}
                            >
                              {app.status === "approved"
                                ? "Approved"
                                : app.status === "rejected"
                                ? "Rejected"
                                : "Pending"}
                            </span>
                            
                            {app.status === "pending" && (
                              <div className="flex space-x-2">
                                <button className="px-3 py-1 bg-green-100 text-green-800 rounded hover:bg-green-200 transition-colors text-sm">
                                  Approve
                                </button>
                                <button className="px-3 py-1 bg-red-100 text-red-800 rounded hover:bg-red-200 transition-colors text-sm">
                                  Reject
                                </button>
                              </div>
                            )}
                          </div>
                        </div>
                        
                        <div className="mt-4 pt-4 border-t">
                          <p className="text-sm text-gray-700">
                            <span className="font-medium">Message:</span> {app.message}
                          </p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              ) : (
                <div className="text-center py-12">
                  <div className="mb-4">
                    <CheckCircle size={48} className="mx-auto text-gray-400" />
                  </div>
                  <h3 className="text-lg font-medium text-gray-700 mb-2">No Applications Found</h3>
                  <p className="text-gray-600">
                    There are no {applicationView !== "all" ? applicationView : ""} applications at the moment.
                  </p>
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
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-sm overflow-hidden">
              <div className="p-6 border-b border-gray-100">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-hostel-primary rounded-full flex items-center justify-center text-white text-xl font-medium">
                    {user.name.charAt(0)}
                  </div>
                  <div>
                    <h3 className="font-medium text-hostel-dark">{user.name}</h3>
                    <p className="text-sm text-gray-600">Hostel Owner</p>
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
                  to="/create-hostel"
                  className="flex items-center justify-center space-x-2 text-hostel-primary hover:text-hostel-secondary transition-colors"
                >
                  <Plus size={16} />
                  <span>Add New Hostel</span>
                </Link>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-4">
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

export default OwnerDashboard;
