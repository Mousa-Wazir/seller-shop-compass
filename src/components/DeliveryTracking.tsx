
import { useState } from "react";
import { Package, MapPin, Clock, CheckCircle, Truck } from "lucide-react";

const DeliveryTracking = () => {
  const [deliveries, setDeliveries] = useState([
    {
      id: 1,
      orderId: "ORD-001",
      productName: "MacBook Pro 16-inch",
      buyerName: "Alice Wilson",
      buyerLocation: "Seattle, WA",
      orderDate: "2024-06-08",
      status: "Pending",
      estimatedDelivery: "2024-06-12",
      trackingNumber: "",
      image: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=400"
    },
    {
      id: 2,
      orderId: "ORD-002",
      productName: "Wireless Gaming Mouse",
      buyerName: "Bob Chen",
      buyerLocation: "Phoenix, AZ",
      orderDate: "2024-06-07",
      status: "Dispatched",
      estimatedDelivery: "2024-06-10",
      trackingNumber: "1Z999AA123456789",
      image: "https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=400"
    },
    {
      id: 3,
      orderId: "ORD-003",
      productName: "Professional Tripod",
      buyerName: "Carol Davis",
      buyerLocation: "Miami, FL",
      orderDate: "2024-06-05",
      status: "Delivered",
      estimatedDelivery: "2024-06-09",
      trackingNumber: "1Z999BB987654321",
      image: "https://images.unsplash.com/photo-1606918801925-e2c914c4b503?w=400"
    }
  ]);

  const updateDeliveryStatus = (id: number, newStatus: string) => {
    setDeliveries(prev => prev.map(delivery => 
      delivery.id === id 
        ? { ...delivery, status: newStatus, trackingNumber: newStatus === "Dispatched" ? `1Z999${Math.random().toString(36).substr(2, 9).toUpperCase()}` : delivery.trackingNumber }
        : delivery
    ));
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "Pending":
        return <Clock className="text-orange-500" size={20} />;
      case "Dispatched":
        return <Truck className="text-blue-500" size={20} />;
      case "Delivered":
        return <CheckCircle className="text-green-500" size={20} />;
      default:
        return <Package className="text-gray-500" size={20} />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Pending":
        return "bg-orange-100 text-orange-800";
      case "Dispatched":
        return "bg-blue-100 text-blue-800";
      case "Delivered":
        return "bg-green-100 text-green-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Delivery Tracking</h1>
        <p className="text-gray-600">Track and manage the delivery status of your sold products.</p>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Pending Dispatch</p>
              <p className="text-2xl font-bold text-orange-600">
                {deliveries.filter(d => d.status === "Pending").length}
              </p>
            </div>
            <Clock className="text-orange-500" size={24} />
          </div>
        </div>
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">In Transit</p>
              <p className="text-2xl font-bold text-blue-600">
                {deliveries.filter(d => d.status === "Dispatched").length}
              </p>
            </div>
            <Truck className="text-blue-500" size={24} />
          </div>
        </div>
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Delivered</p>
              <p className="text-2xl font-bold text-green-600">
                {deliveries.filter(d => d.status === "Delivered").length}
              </p>
            </div>
            <CheckCircle className="text-green-500" size={24} />
          </div>
        </div>
      </div>

      {/* Desktop Table View */}
      <div className="hidden md:block bg-white rounded-lg border border-gray-200 overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="text-left py-3 px-6 text-sm font-medium text-gray-500 uppercase tracking-wider">Order</th>
              <th className="text-left py-3 px-6 text-sm font-medium text-gray-500 uppercase tracking-wider">Buyer</th>
              <th className="text-left py-3 px-6 text-sm font-medium text-gray-500 uppercase tracking-wider">Order Date</th>
              <th className="text-left py-3 px-6 text-sm font-medium text-gray-500 uppercase tracking-wider">Est. Delivery</th>
              <th className="text-left py-3 px-6 text-sm font-medium text-gray-500 uppercase tracking-wider">Status</th>
              <th className="text-left py-3 px-6 text-sm font-medium text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {deliveries.map((delivery) => (
              <tr key={delivery.id} className="hover:bg-gray-50">
                <td className="py-4 px-6">
                  <div className="flex items-center space-x-3">
                    <img
                      src={delivery.image}
                      alt={delivery.productName}
                      className="w-12 h-12 rounded-lg object-cover"
                    />
                    <div>
                      <div className="text-sm font-medium text-gray-900">{delivery.productName}</div>
                      <div className="text-sm text-gray-500">{delivery.orderId}</div>
                      {delivery.trackingNumber && (
                        <div className="text-xs text-blue-600">Tracking: {delivery.trackingNumber}</div>
                      )}
                    </div>
                  </div>
                </td>
                <td className="py-4 px-6">
                  <div>
                    <div className="text-sm text-gray-900">{delivery.buyerName}</div>
                    <div className="text-sm text-gray-500 flex items-center">
                      <MapPin size={14} className="mr-1" />
                      {delivery.buyerLocation}
                    </div>
                  </div>
                </td>
                <td className="py-4 px-6 text-sm text-gray-900">
                  {new Date(delivery.orderDate).toLocaleDateString()}
                </td>
                <td className="py-4 px-6 text-sm text-gray-900">
                  {new Date(delivery.estimatedDelivery).toLocaleDateString()}
                </td>
                <td className="py-4 px-6">
                  <div className="flex items-center space-x-2">
                    {getStatusIcon(delivery.status)}
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(delivery.status)}`}>
                      {delivery.status}
                    </span>
                  </div>
                </td>
                <td className="py-4 px-6">
                  <div className="flex space-x-2">
                    {delivery.status === "Pending" && (
                      <button
                        onClick={() => updateDeliveryStatus(delivery.id, "Dispatched")}
                        className="px-3 py-1 bg-blue-600 text-white text-xs rounded-md hover:bg-blue-700 transition-colors"
                      >
                        Mark Dispatched
                      </button>
                    )}
                    {delivery.status === "Dispatched" && (
                      <button
                        onClick={() => updateDeliveryStatus(delivery.id, "Delivered")}
                        className="px-3 py-1 bg-green-600 text-white text-xs rounded-md hover:bg-green-700 transition-colors"
                      >
                        Mark Delivered
                      </button>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile Card View */}
      <div className="md:hidden space-y-4">
        {deliveries.map((delivery) => (
          <div key={delivery.id} className="bg-white rounded-lg border border-gray-200 p-4">
            <div className="flex items-start space-x-3">
              <img
                src={delivery.image}
                alt={delivery.productName}
                className="w-16 h-16 rounded-lg object-cover"
              />
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="text-sm font-medium text-gray-900">{delivery.productName}</h3>
                    <p className="text-sm text-gray-500">{delivery.orderId}</p>
                    {delivery.trackingNumber && (
                      <p className="text-xs text-blue-600">Tracking: {delivery.trackingNumber}</p>
                    )}
                  </div>
                  <div className="flex items-center space-x-1">
                    {getStatusIcon(delivery.status)}
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(delivery.status)}`}>
                      {delivery.status}
                    </span>
                  </div>
                </div>
                <div className="mt-2">
                  <div className="text-sm text-gray-900">{delivery.buyerName}</div>
                  <div className="text-sm text-gray-500 flex items-center">
                    <MapPin size={14} className="mr-1" />
                    {delivery.buyerLocation}
                  </div>
                </div>
                <div className="mt-2 flex items-center justify-between">
                  <div className="text-xs text-gray-500">
                    Ordered: {new Date(delivery.orderDate).toLocaleDateString()}
                  </div>
                  <div className="text-xs text-gray-500">
                    Est. Delivery: {new Date(delivery.estimatedDelivery).toLocaleDateString()}
                  </div>
                </div>
                <div className="mt-3">
                  {delivery.status === "Pending" && (
                    <button
                      onClick={() => updateDeliveryStatus(delivery.id, "Dispatched")}
                      className="w-full px-3 py-2 bg-blue-600 text-white text-sm rounded-md hover:bg-blue-700 transition-colors"
                    >
                      Mark as Dispatched
                    </button>
                  )}
                  {delivery.status === "Dispatched" && (
                    <button
                      onClick={() => updateDeliveryStatus(delivery.id, "Delivered")}
                      className="w-full px-3 py-2 bg-green-600 text-white text-sm rounded-md hover:bg-green-700 transition-colors"
                    >
                      Mark as Delivered
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DeliveryTracking;
