
import { useState } from "react";
import { Menu, X, Bell, Home, Package, ShoppingCart, Truck, CreditCard, User, Plus, BarChart3 } from "lucide-react";
import Dashboard from "../components/Dashboard";
import AddProduct from "../components/AddProduct";
import MyProducts from "../components/MyProducts";
import RentalProducts from "../components/RentalProducts";
import DeliveryTracking from "../components/DeliveryTracking";
import Payments from "../components/Payments";
import ProfileSettings from "../components/ProfileSettings";

const Index = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("dashboard");

  const navigationItems = [
    { id: "dashboard", label: "Dashboard Overview", icon: BarChart3 },
    { id: "add-product", label: "Add / Update Product", icon: Plus },
    { id: "my-products", label: "My Products", icon: Package },
    { id: "rental-products", label: "Rental Products", icon: ShoppingCart },
    { id: "delivery-tracking", label: "Delivery Tracking", icon: Truck },
    { id: "payments", label: "Payments", icon: CreditCard },
    { id: "profile", label: "Profile Settings", icon: User },
  ];

  const handleTabClick = (tabId: string) => {
    setActiveTab(tabId);
    setIsSidebarOpen(false); // Close sidebar on mobile after selection
  };

  const renderActiveComponent = () => {
    switch (activeTab) {
      case "dashboard":
        return <Dashboard />;
      case "add-product":
        return <AddProduct />;
      case "my-products":
        return <MyProducts />;
      case "rental-products":
        return <RentalProducts />;
      case "delivery-tracking":
        return <DeliveryTracking />;
      case "payments":
        return <Payments />;
      case "profile":
        return <ProfileSettings />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex w-full">
      {/* Fixed Header */}
      <header className="fixed top-0 left-0 right-0 bg-white border-b border-gray-200 z-50 h-16">
        <div className="flex items-center justify-between h-full px-4">
          {/* Left: Logo + Mobile Menu */}
          <div className="flex items-center space-x-4">
            <button
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
              className="lg:hidden p-2 rounded-md text-gray-600 hover:bg-gray-100 transition-colors"
            >
              {isSidebarOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
            <div className="text-xl font-bold text-gray-900">SellerHub</div>
          </div>

          {/* Center: Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <a href="#" className="text-gray-700 hover:text-gray-900 transition-colors">Home</a>
            <a href="#" className="text-gray-700 hover:text-gray-900 transition-colors">Products</a>
            <a href="#" className="text-gray-700 hover:text-gray-900 transition-colors">Contact Us</a>
            <a href="#" className="text-gray-700 hover:text-gray-900 transition-colors">About Us</a>
          </nav>

          {/* Right: Notifications + Logout */}
          <div className="flex items-center space-x-4">
            <button className="relative p-2 text-gray-600 hover:bg-gray-100 rounded-full transition-colors">
              <Bell size={20} />
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">3</span>
            </button>
            <button className="text-gray-700 hover:text-gray-900 transition-colors px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50">
              Logout
            </button>
          </div>
        </div>
      </header>

      {/* Sidebar Overlay for Mobile */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed lg:static top-16 left-0 h-full bg-white border-r border-gray-200 z-40 w-64 transform transition-transform duration-300 ease-in-out ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        } lg:translate-x-0 lg:block`}
      >
        <div className="p-4 h-full overflow-y-auto">
          <nav className="space-y-2">
            {navigationItems.map((item) => {
              const Icon = item.icon;
              return (
                <button
                  key={item.id}
                  onClick={() => handleTabClick(item.id)}
                  className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-left transition-colors ${
                    activeTab === item.id
                      ? "bg-gray-900 text-white"
                      : "text-gray-700 hover:bg-gray-100"
                  }`}
                >
                  <Icon size={20} />
                  <span className="font-medium">{item.label}</span>
                </button>
              );
            })}
          </nav>
        </div>
      </aside>

      {/* Main Content */}
      <main className={`flex-1 pt-16 transition-all duration-300 ${isSidebarOpen ? "lg:ml-0" : ""} lg:ml-64`}>
        <div className="p-6">
          {renderActiveComponent()}
        </div>
      </main>
    </div>
  );
};

export default Index;
