
import React from "react";
import { User, MessageSquare, Star, Package, Plus, Settings as SettingsIcon } from "lucide-react";

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

const Sidebar = ({
  isSidebarOpen,
  activeTab,
  handleTabClick,
  tabTransitioning,
}) => (
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
);

export default Sidebar;
