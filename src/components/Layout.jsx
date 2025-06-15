import React, { useState, useRef } from "react";
import Sidebar from "./Sidebar";
import ProductSearch from "./ProductSearch";
import Dashboard from "./Dashboard";
import AddProduct from "./AddProduct";
import MyProducts from "./MyProducts";
import RentalManagement from "./RentalManagement";
import Reviews from "./Reviews";
import RealTimeChat from "./RealTimeChat";
import ProfileSettings from "./ProfileSettings";
import Settings from "./Settings";
import LogoutScreen from "./LogoutScreen";
import SignUp from "./SignUp";
import { LogOut } from "lucide-react";

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

const tabComponents = {
  dashboard: Dashboard,
  "add-product": AddProduct,
  "my-products": MyProducts,
  "rental-management": RentalManagement,
  reviews: Reviews,
  chat: RealTimeChat,
  profile: ProfileSettings,
  settings: Settings,
  logout: LogoutScreen,
};

const Layout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("dashboard");
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [showSignUp, setShowSignUp] = useState(false);
  const [tabTransitioning, setTabTransitioning] = useState(false);
  const lastActiveTab = useRef(activeTab);

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

  const renderActiveComponent = () => {
    if (activeTab === "logout") {
      return <LogoutScreen onSignUpClick={() => setShowSignUp(true)} />;
    }
    const Component = tabComponents[activeTab] || Dashboard;
    return <Component />;
  };

  if (showSignUp) {
    return (
      <div className="animate-fade-in duration-300">
        <SignUp onSignUpSuccess={handleSignUpSuccess} />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 flex w-full">
      {/* Fixed Header */}
      <header className="fixed top-0 left-0 right-0 bg-white border-b border-gray-200 z-50 h-16">
        <div className="flex items-center justify-between h-full px-4">
          <div className="flex items-center space-x-4">
            {/* Hamburger/Menu icon - ONLY on mobile/tablet (hidden on lg and up) */}
            <button
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
              className="p-2 rounded-md text-gray-600 hover:bg-gray-100 transition-colors block lg:hidden"
              style={{ zIndex: 2 }}
              aria-label={isSidebarOpen ? "Close sidebar" : "Open sidebar"}
            >
              {isSidebarOpen ? (
                // Only show close (✖) icon when sidebar is open
                <span className="text-2xl">&times;</span>
              ) : (
                // Only show hamburger (☰) when sidebar is closed
                <span className="text-2xl">&#9776;</span>
              )}
            </button>
            <div className="text-xl font-bold text-black whitespace-nowrap ml-2 lg:ml-2">
              Seller Dashboard
            </div>
          </div>
          {/* Center: Search Bar - Hidden when sidebar is open on mobile */}
          {!isSidebarOpen && (
            <div className="hidden md:flex flex-1 max-w-md mx-4 md:mx-8 relative">
              <ProductSearch
                searchQuery={searchQuery}
                handleSearch={handleSearch}
                searchResults={searchResults}
                handleProductClick={handleProductClick}
                isMobile={false}
              />
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
            <ProductSearch
              searchQuery={searchQuery}
              handleSearch={handleSearch}
              searchResults={searchResults}
              handleProductClick={handleProductClick}
              isMobile={true}
            />
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
      <Sidebar
        isSidebarOpen={isSidebarOpen}
        activeTab={activeTab}
        handleTabClick={handleTabClick}
        tabTransitioning={tabTransitioning}
      />

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
          <div className="w-full max-w-full mx-auto">
            <div className="w-full">
              <div className="w-full">
                <div className="w-full block">
                  <div className="w-full">
                    {renderActiveComponent()}
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

export default Layout;
