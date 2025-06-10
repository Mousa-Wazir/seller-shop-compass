
import { Package, ShoppingCart, Truck, DollarSign, TrendingUp, Clock, CheckCircle, AlertCircle } from "lucide-react";

const Dashboard = () => {
  const stats = [
    { label: "Total Products", value: "24", icon: Package, color: "bg-blue-500" },
    { label: "Rented Products", value: "8", icon: ShoppingCart, color: "bg-green-500" },
    { label: "Pending Deliveries", value: "3", icon: Truck, color: "bg-orange-500" },
    { label: "Total Earnings", value: "$2,340", icon: DollarSign, color: "bg-purple-500" },
  ];

  const recentNotifications = [
    { id: 1, message: "New rental request for MacBook Pro", time: "2 hours ago", type: "info" },
    { id: 2, message: "Payment received for Camera Lens", time: "4 hours ago", type: "success" },
    { id: 3, message: "Delivery overdue for Laptop Stand", time: "1 day ago", type: "warning" },
    { id: 4, message: "Product inventory low for Wireless Mouse", time: "2 days ago", type: "alert" },
  ];

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case "success":
        return <CheckCircle className="text-green-500" size={16} />;
      case "warning":
        return <Clock className="text-orange-500" size={16} />;
      case "alert":
        return <AlertCircle className="text-red-500" size={16} />;
      default:
        return <Package className="text-blue-500" size={16} />;
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Dashboard Overview</h1>
        <p className="text-gray-600">Welcome back! Here's what's happening with your store today.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <div key={index} className="bg-white rounded-lg border border-gray-200 p-6 hover:shadow-md transition-shadow">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">{stat.label}</p>
                  <p className="text-2xl font-bold text-gray-900 mt-1">{stat.value}</p>
                </div>
                <div className={`${stat.color} p-3 rounded-lg`}>
                  <Icon className="text-white" size={24} />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Activity */}
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold text-gray-900">Recent Notifications</h2>
            <TrendingUp className="text-gray-400" size={20} />
          </div>
          <div className="space-y-4">
            {recentNotifications.map((notification) => (
              <div key={notification.id} className="flex items-start space-x-3 p-3 bg-gray-50 rounded-lg">
                {getNotificationIcon(notification.type)}
                <div className="flex-1">
                  <p className="text-sm text-gray-900">{notification.message}</p>
                  <p className="text-xs text-gray-500 mt-1">{notification.time}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Quick Actions</h2>
          <div className="grid grid-cols-1 gap-3">
            <button className="flex items-center space-x-3 p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors text-left">
              <Package className="text-blue-500" size={20} />
              <span className="text-gray-900">Add New Product</span>
            </button>
            <button className="flex items-center space-x-3 p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors text-left">
              <Truck className="text-green-500" size={20} />
              <span className="text-gray-900">Update Delivery Status</span>
            </button>
            <button className="flex items-center space-x-3 p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors text-left">
              <DollarSign className="text-purple-500" size={20} />
              <span className="text-gray-900">View Earnings</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
