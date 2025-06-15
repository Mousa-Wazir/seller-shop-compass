
import { useState, useRef } from "react";
import { Menu, X, Search, User, MessageSquare, Star, Package, Plus, Settings as SettingsIcon, LogOut } from "lucide-react";
import Dashboard from "../components/Dashboard";
import AddProduct from "../components/AddProduct";
import MyProducts from "../components/MyProducts";
import RentalManagement from "../components/RentalManagement";
import Reviews from "../components/Reviews";
import RealTimeChat from "../components/RealTimeChat";
import ProfileSettings from "../components/ProfileSettings";
import Settings from "../components/Settings";
import LogoutScreen from "../components/LogoutScreen";
import SignUp from "../components/SignUp";

const Index = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("dashboard");
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [showSignUp, setShowSignUp] = useState(false);
  const [tabTransitioning, setTabTransitioning] = useState(false);
  const lastActiveTab = useRef(activeTab);

  const navigationItems = [
    { id: "profile", label: "Profile", icon: User },
    { id: "dashboard", label: "Dashboard Overview", icon: Package },
    { id: "my-products", label: "My Products", icon: Package },
    { id: "add-product", label: "Add Product", icon: Plus },
    { id: "rental-management", label: "Rental Management", icon: Package },
    { id: "reviews", label: "Reviews", icon: Star },
    { id: "chat", label: "Real-time Chat", icon: MessageSquare },
    { id: "settings", label: "Settings", icon: SettingsIcon },
  ];

  const mockProducts = [
    { id: 1, title: "Vintage Ceramic Table Lamp", category: "Home Decor", status: "In Stock", image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400" },
    { id: 2, title: "Modern Oak Dining Table", category: "Furniture", status: "Rented", image: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400" },
    { id: 3, title: "Designer Leather Handbag", category: "Clothing Accessories", status: "Out of Stock", image: "https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=400" },
    { id: 4, title: "Organic Skincare Set", category: "Health and Beauty", status: "In Stock", image: "https://images.unsplash.com/photo-1556228578-8c89e6adf883?w=400" },
    { id: 5, title: "Handmade Ceramic Pottery", category: "Handicrafts", status: "In Stock", image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400" },
    { id: 6, title: "Decorative Wall Mirror", category: "Home Decor", status: "Available", image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400" },
    { id: 7, title: "Leather Sofa Set", category: "Furniture", status: "In Stock", image: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400" },
    { id: 8, title: "Handwoven Basket Collection", category: "Handicrafts", status: "Available", image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400" },
  ];

  const handleTabClick = (tabId) => {
    if (tabId !== activeTab) {
      setTabTransitioning(true);
      setTimeout(() => {
        setActiveTab(tabId);
        setTabTransitioning(false);
        lastActiveTab.current = tabId;
      }, 220);
      setIsSidebarOpen(false);
    } else {
      setIsSidebarOpen(false);
    }
  };

  const handleLogout = () => {
    setActiveTab("logout");
    setIsSidebarOpen(false);
  };

  const handleSearch = (query) => {
    setSearchQuery(query);
    if (query.trim()) {
      const filtered = mockProducts.filter(product =>
        product.title.toLowerCase().includes(query.toLowerCase()) ||
        product.category.toLowerCase().includes(query.toLowerCase())
      );
      setSearchResults(filtered);
    } else {
      setSearchResults([]);
    }
  };

  const handleProductClick = (productId) => {
    setActiveTab("my-products");
    setSearchQuery("");
    setSearchResults([]);
    setIsSidebarOpen(false);
  };

  const handleSignUpSuccess = () => {
    setShowSignUp(false);
    setActiveTab("dashboard");
  };

  if (showSignUp) {
    return (
      <div className="animate-fade-in duration-300">
        <SignUp onSignUpSuccess={handleSignUpSuccess} />
      </div>
    );
  }

  const renderActiveComponent = () => {
    switch (activeTab) {
      case "dashboard":
        return <Dashboard />;
      case "add-product":
        return <AddProduct />;
      case "my-products":
        return <MyProducts />;
      case "rental-management":
        return <RentalManagement />;
      case "reviews":
        return <Reviews />;
      case "chat":
        return <RealTimeChat />;
      case "profile":
        return <ProfileSettings />;
      case "settings":
        return <Settings />;
      case "logout":
        return <LogoutScreen onSignUpClick={() => setShowSignUp(true)} />;
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
            {/* Hamburger/menu icon ONLY on mobile/tablet (hidden on lg and up) */}
            <button
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
              className="p-2 rounded-md text-gray-600 hover:bg-gray-100 transition-colors block lg:hidden"
              style={{ zIndex: 2 }}
              aria-label="Toggle sidebar"
            >
              {isSidebarOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
            {/* Dashboard Title: Responsive margin/padding */}
            <div className="text-xl font-bold text-black whitespace-nowrap ml-2 lg:ml-2">
              Seller Dashboard
            </div>
          </div>
          {/* Center: Search Bar - Hidden when sidebar is open on mobile */}
          {!isSidebarOpen && (
            <div className="hidden md:flex flex-1 max-w-md mx-4 md:mx-8 relative">
              <div className="relative w-full">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                <input
                  type="text"
                  placeholder="Search products by title or category..."
                  value={searchQuery}
                  onChange={(e) => handleSearch(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-transparent"
                />
                {searchResults.length > 0 && (
                  <div className="absolute top-full left-0 right-0 bg-white border border-gray-200 rounded-lg shadow-lg mt-1 max-h-60 overflow-y-auto z-50">
                    {searchResults.map((product) => (
                      <div
                        key={product.id}
                        onClick={() => handleProductClick(product.id)}
                        className="flex items-center space-x-3 p-3 hover:bg-gray-50 cursor-pointer border-b border-gray-100 last:border-b-0"
                      >
                        <img
                          src={product.image}
                          alt={product.title}
                          className="w-10 h-10 rounded-md object-cover"
                        />
                        <div className="flex-1">
                          <div className="text-sm font-medium text-black">{product.title}</div>
                          <div className="text-xs text-gray-500">{product.category}</div>
                        </div>
                        <span className={`px-2 py-1 text-xs rounded-full ${
                          product.status === "In Stock" || product.status === "Available" ? "bg-green-100 text-green-800" :
                          product.status === "Rented" ? "bg-blue-100 text-blue-800" :
                          "bg-red-100 text-red-800"
                        }`}>
                          {product.status}
                        </span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          )}
          {/* Right: Welcome + Logout */}
          <div className="flex items-center space-x-4">
            <div className="hidden md:block text-sm text-gray-600">
              Welcome, <span className="font-medium text-black">Ali Traders</span>
            </div>
            <button 
              onClick={handleLogout}
              className="flex items-center space-x-2 text-gray-700 hover:text-black transition-colors px-3 py-2 border border-gray-300 rounded-md hover:bg-gray-50"
            >
              <LogOut size={16} />
              <span className="hidden sm:inline">Logout</span>
            </button>
          </div>
        </div>
        {/* Mobile Search Bar - Hidden when sidebar is open */}
        {!isSidebarOpen && (
          <div className="md:hidden px-2 pb-3 pt-2">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              <input
                type="text"
                placeholder="Search products..."
                value={searchQuery}
                onChange={(e) => handleSearch(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-transparent"
              />
              {searchResults.length > 0 && (
                <div className="absolute top-full left-0 right-0 bg-white border border-gray-200 rounded-lg shadow-lg mt-1 max-h-48 overflow-y-auto z-50">
                  {searchResults.map((product) => (
                    <div
                      key={product.id}
                      onClick={() => handleProductClick(product.id)}
                      className="flex items-center space-x-3 p-3 hover:bg-gray-50 cursor-pointer border-b border-gray-100 last:border-b-0"
                    >
                      <img
                        src={product.image}
                        alt={product.title}
                        className="w-8 h-8 rounded-md object-cover"
                      />
                      <div className="flex-1">
                        <div className="text-sm font-medium text-black">{product.title}</div>
                        <div className="text-xs text-gray-500">{product.category}</div>
                      </div>
                      <span className={`px-2 py-1 text-xs rounded-full ${
                        product.status === "In Stock" || product.status === "Available" ? "bg-green-100 text-green-800" :
                        product.status === "Rented" ? "bg-blue-100 text-blue-800" :
                        "bg-red-100 text-red-800"
                      }`}>
                        {product.status}
                      </span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}
      </header>

      {/* Sidebar Overlay for Mobile */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden animate-fade-in"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed lg:static top-0 left-0 h-full bg-white border-r border-gray-200 z-40 w-64 transform transition-transform duration-300 ease-in-out
          ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"}
          lg:translate-x-0 lg:block pt-16 lg:pt-16`}
      >
        <div className="p-4 h-full overflow-y-auto">
          <nav className="space-y-2">
            {navigationItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id && !tabTransitioning;
              return (
                <button
                  key={item.id}
                  onClick={() => handleTabClick(item.id)}
                  className={`
                    w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-left transition-all duration-200
                    relative overflow-hidden group
                    ${isActive
                      ? "bg-black text-white animate-scale-in"
                      : "text-gray-700 hover:bg-gray-100"}
                    `}
                  style={{ outline: isActive ? "2px solid #000" : undefined }}
                  tabIndex={0}
                >
                  <span
                    className={`
                      mr-2 transition-transform duration-200 group-hover:scale-110 group-active:scale-105
                      ${isActive ? "scale-110" : ""}
                    `}
                  >
                    <Icon size={20} />
                  </span>
                  <span className="font-medium">{item.label}</span>
                </button>
              );
            })}
          </nav>
        </div>
      </aside>

      {/* Main Content Area with Animation */}
      <main
        className={`flex-1 pt-16 transition-all duration-300 ${
          isSidebarOpen ? "lg:ml-0" : ""
        } lg:ml-64`}
      >
        <div
          key={activeTab}
          className={`
            p-2 xs:p-3 sm:p-4 md:p-6
            max-w-full w-full
            transition-all duration-200
            ${tabTransitioning ? "animate-fade-out scale-95 opacity-60 pointer-events-none" : "animate-fade-in scale-100 opacity-100"}
          `}
          style={{
            minHeight: "calc(100vh - 4rem)",
            transition: "opacity 0.2s, transform 0.2s",
          }}
        >
          {/* Responsive container for dashboard content */}
          <div className="w-full max-w-full mx-auto">
            <div className="w-full">
              {/* Hide side padding for mobile, apply for md+ */}
              <div className="w-full">
                <div className="w-full">
                  <div className="w-full block">
                    {/* Responsive: content fits width, grid stacks on mobile */}
                    <div className="w-full">
                      {renderActiveComponent()}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Index;

