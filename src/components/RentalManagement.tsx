
import { useState } from "react";
import { Calendar, Clock, CheckCircle, XCircle, Package, User, MapPin } from "lucide-react";

const RentalManagement = () => {
  const [rentalRequests] = useState([
    {
      id: 1,
      productName: "MacBook Pro 16-inch",
      customerName: "John Smith",
      customerLocation: "New York, NY",
      startDate: "2024-06-15",
      endDate: "2024-06-22",
      dailyRate: 50,
      totalAmount: 350,
      status: "Pending",
      image: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=400"
    },
    {
      id: 2,
      productName: "Canon EOS R Camera",
      customerName: "Sarah Johnson",
      customerLocation: "Los Angeles, CA",
      startDate: "2024-06-10",
      endDate: "2024-06-17",
      dailyRate: 35,
      totalAmount: 245,
      status: "Rented",
      image: "https://images.unsplash.com/photo-1606983340126-99ab4feaa64a?w=400"
    },
    {
      id: 3,
      productName: "Professional Tripod",
      customerName: "Mike Chen",
      customerLocation: "Chicago, IL",
      startDate: "2024-06-01",
      endDate: "2024-06-08",
      dailyRate: 8,
      totalAmount: 56,
      status: "Returned",
      image: "https://images.unsplash.com/photo-1606918801925-e2c914c4b503?w=400"
    },
    {
      id: 4,
      productName: "Wireless Gaming Mouse",
      customerName: "Emma Davis",
      customerLocation: "Austin, TX",
      startDate: "2024-06-20",
      endDate: "2024-06-27",
      dailyRate: 5,
      totalAmount: 35,
      status: "Overdue",
      image: "https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=400"
    }
  ]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Pending":
        return "bg-gray-100 text-gray-800";
      case "Rented":
        return "bg-green-100 text-green-800";
      case "Returned":
        return "bg-blue-100 text-blue-800";
      case "Overdue":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const handleAction = (requestId: number, action: string) => {
    console.log(`${action} request ${requestId}`);
    // Here you would handle the accept/decline logic
  };

  const totalOnRent = rentalRequests.filter(r => r.status === "Rented").length;
  const overdueReturns = rentalRequests.filter(r => r.status === "Overdue").length;
  const dailyIncome = rentalRequests
    .filter(r => r.status === "Rented")
    .reduce((sum, r) => sum + r.dailyRate, 0);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-black mb-2">Rental Management</h1>
        <p className="text-gray-600">Manage your product rental requests and track active rentals.</p>
      </div>

      {/* Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Products on Rent</p>
              <p className="text-2xl font-bold text-green-600">{totalOnRent}</p>
            </div>
            <Package className="text-green-500" size={24} />
          </div>
        </div>
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Overdue Returns</p>
              <p className="text-2xl font-bold text-red-600">{overdueReturns}</p>
            </div>
            <Clock className="text-red-500" size={24} />
          </div>
        </div>
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Daily Rental Income</p>
              <p className="text-2xl font-bold text-black">${dailyIncome}</p>
            </div>
            <Calendar className="text-black" size={24} />
          </div>
        </div>
      </div>

      {/* Rental Requests */}
      <div className="bg-white rounded-lg border border-gray-200">
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-black">Rental Requests</h2>
        </div>

        {/* Desktop Table View */}
        <div className="hidden md:block overflow-hidden">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="text-left py-3 px-6 text-sm font-medium text-gray-500 uppercase tracking-wider">Product</th>
                <th className="text-left py-3 px-6 text-sm font-medium text-gray-500 uppercase tracking-wider">Customer</th>
                <th className="text-left py-3 px-6 text-sm font-medium text-gray-500 uppercase tracking-wider">Rental Period</th>
                <th className="text-left py-3 px-6 text-sm font-medium text-gray-500 uppercase tracking-wider">Amount</th>
                <th className="text-left py-3 px-6 text-sm font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="text-left py-3 px-6 text-sm font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {rentalRequests.map((request) => (
                <tr key={request.id} className="hover:bg-gray-50">
                  <td className="py-4 px-6">
                    <div className="flex items-center space-x-3">
                      <img
                        src={request.image}
                        alt={request.productName}
                        className="w-12 h-12 rounded-lg object-cover"
                      />
                      <div className="text-sm font-medium text-black">{request.productName}</div>
                    </div>
                  </td>
                  <td className="py-4 px-6">
                    <div>
                      <div className="text-sm text-black flex items-center">
                        <User size={14} className="mr-1" />
                        {request.customerName}
                      </div>
                      <div className="text-sm text-gray-500 flex items-center">
                        <MapPin size={14} className="mr-1" />
                        {request.customerLocation}
                      </div>
                    </div>
                  </td>
                  <td className="py-4 px-6">
                    <div className="text-sm text-black">
                      {new Date(request.startDate).toLocaleDateString()} - {new Date(request.endDate).toLocaleDateString()}
                    </div>
                    <div className="text-sm text-gray-500">
                      ${request.dailyRate}/day
                    </div>
                  </td>
                  <td className="py-4 px-6 text-sm font-medium text-black">${request.totalAmount}</td>
                  <td className="py-4 px-6">
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(request.status)}`}>
                      {request.status}
                    </span>
                  </td>
                  <td className="py-4 px-6">
                    {request.status === "Pending" && (
                      <div className="flex space-x-2">
                        <button
                          onClick={() => handleAction(request.id, "accept")}
                          className="flex items-center space-x-1 px-3 py-1 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors"
                        >
                          <CheckCircle size={14} />
                          <span>Accept</span>
                        </button>
                        <button
                          onClick={() => handleAction(request.id, "decline")}
                          className="flex items-center space-x-1 px-3 py-1 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors"
                        >
                          <XCircle size={14} />
                          <span>Decline</span>
                        </button>
                      </div>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Mobile Card View */}
        <div className="md:hidden space-y-4 p-4">
          {rentalRequests.map((request) => (
            <div key={request.id} className="bg-gray-50 rounded-lg p-4">
              <div className="flex items-start space-x-3 mb-3">
                <img
                  src={request.image}
                  alt={request.productName}
                  className="w-16 h-16 rounded-lg object-cover"
                />
                <div className="flex-1">
                  <div className="flex items-start justify-between">
                    <h3 className="text-sm font-medium text-black">{request.productName}</h3>
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(request.status)}`}>
                      {request.status}
                    </span>
                  </div>
                  <div className="mt-1 flex items-center text-sm text-gray-500">
                    <User size={14} className="mr-1" />
                    {request.customerName}
                  </div>
                  <div className="mt-1 flex items-center text-sm text-gray-500">
                    <MapPin size={14} className="mr-1" />
                    {request.customerLocation}
                  </div>
                </div>
              </div>
              
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">Rental Period:</span>
                  <span className="text-black">
                    {new Date(request.startDate).toLocaleDateString()} - {new Date(request.endDate).toLocaleDateString()}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Total Amount:</span>
                  <span className="text-black font-medium">${request.totalAmount}</span>
                </div>
              </div>

              {request.status === "Pending" && (
                <div className="flex space-x-2 mt-4">
                  <button
                    onClick={() => handleAction(request.id, "accept")}
                    className="flex-1 flex items-center justify-center space-x-1 px-3 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors"
                  >
                    <CheckCircle size={14} />
                    <span>Accept</span>
                  </button>
                  <button
                    onClick={() => handleAction(request.id, "decline")}
                    className="flex-1 flex items-center justify-center space-x-1 px-3 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors"
                  >
                    <XCircle size={14} />
                    <span>Decline</span>
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default RentalManagement;
