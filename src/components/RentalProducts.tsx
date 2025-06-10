
import { useState } from "react";
import { Calendar, User, MapPin, Clock } from "lucide-react";

const RentalProducts = () => {
  const [rentals] = useState([
    {
      id: 1,
      productName: "MacBook Pro 16-inch",
      renterName: "John Smith",
      renterLocation: "New York, NY",
      startDate: "2024-06-05",
      endDate: "2024-06-12",
      dailyRate: 50,
      totalAmount: 350,
      status: "Active",
      image: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=400"
    },
    {
      id: 2,
      productName: "Canon EOS R Camera",
      renterName: "Sarah Johnson",
      renterLocation: "Los Angeles, CA",
      startDate: "2024-06-01",
      endDate: "2024-06-08",
      dailyRate: 35,
      totalAmount: 245,
      status: "Overdue",
      image: "https://images.unsplash.com/photo-1606983340126-99ab4feaa64a?w=400"
    },
    {
      id: 3,
      productName: "Professional Tripod",
      renterName: "Mike Chen",
      renterLocation: "Chicago, IL",
      startDate: "2024-05-28",
      endDate: "2024-06-03",
      dailyRate: 8,
      totalAmount: 48,
      status: "Returned",
      image: "https://images.unsplash.com/photo-1606918801925-e2c914c4b503?w=400"
    },
    {
      id: 4,
      productName: "Wireless Gaming Mouse",
      renterName: "Emma Davis",
      renterLocation: "Austin, TX",
      startDate: "2024-06-08",
      endDate: "2024-06-15",
      dailyRate: 5,
      totalAmount: 35,
      status: "Active",
      image: "https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=400"
    }
  ]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Active":
        return "bg-green-100 text-green-800";
      case "Overdue":
        return "bg-red-100 text-red-800";
      case "Returned":
        return "bg-gray-100 text-gray-800";
      default:
        return "bg-blue-100 text-blue-800";
    }
  };

  const getDaysRemaining = (endDate: string) => {
    const end = new Date(endDate);
    const today = new Date();
    const diffTime = end.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Rental Products</h1>
        <p className="text-gray-600">Track all your products that are currently being rented out.</p>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Active Rentals</p>
              <p className="text-2xl font-bold text-green-600">
                {rentals.filter(r => r.status === "Active").length}
              </p>
            </div>
            <Clock className="text-green-500" size={24} />
          </div>
        </div>
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Overdue Returns</p>
              <p className="text-2xl font-bold text-red-600">
                {rentals.filter(r => r.status === "Overdue").length}
              </p>
            </div>
            <Calendar className="text-red-500" size={24} />
          </div>
        </div>
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Revenue</p>
              <p className="text-2xl font-bold text-purple-600">
                ${rentals.reduce((sum, r) => sum + r.totalAmount, 0)}
              </p>
            </div>
            <Calendar className="text-purple-500" size={24} />
          </div>
        </div>
      </div>

      {/* Desktop Table View */}
      <div className="hidden md:block bg-white rounded-lg border border-gray-200 overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="text-left py-3 px-6 text-sm font-medium text-gray-500 uppercase tracking-wider">Product</th>
              <th className="text-left py-3 px-6 text-sm font-medium text-gray-500 uppercase tracking-wider">Renter</th>
              <th className="text-left py-3 px-6 text-sm font-medium text-gray-500 uppercase tracking-wider">Rental Period</th>
              <th className="text-left py-3 px-6 text-sm font-medium text-gray-500 uppercase tracking-wider">Rate</th>
              <th className="text-left py-3 px-6 text-sm font-medium text-gray-500 uppercase tracking-wider">Total</th>
              <th className="text-left py-3 px-6 text-sm font-medium text-gray-500 uppercase tracking-wider">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {rentals.map((rental) => (
              <tr key={rental.id} className="hover:bg-gray-50">
                <td className="py-4 px-6">
                  <div className="flex items-center space-x-3">
                    <img
                      src={rental.image}
                      alt={rental.productName}
                      className="w-12 h-12 rounded-lg object-cover"
                    />
                    <div className="text-sm font-medium text-gray-900">{rental.productName}</div>
                  </div>
                </td>
                <td className="py-4 px-6">
                  <div>
                    <div className="text-sm text-gray-900 flex items-center">
                      <User size={14} className="mr-1" />
                      {rental.renterName}
                    </div>
                    <div className="text-sm text-gray-500 flex items-center">
                      <MapPin size={14} className="mr-1" />
                      {rental.renterLocation}
                    </div>
                  </div>
                </td>
                <td className="py-4 px-6">
                  <div className="text-sm text-gray-900">
                    {new Date(rental.startDate).toLocaleDateString()} - {new Date(rental.endDate).toLocaleDateString()}
                  </div>
                  <div className="text-sm text-gray-500">
                    {rental.status === "Active" && (
                      <>
                        {getDaysRemaining(rental.endDate) > 0 
                          ? `${getDaysRemaining(rental.endDate)} days remaining`
                          : "Due today"
                        }
                      </>
                    )}
                  </div>
                </td>
                <td className="py-4 px-6 text-sm text-gray-900">${rental.dailyRate}/day</td>
                <td className="py-4 px-6 text-sm font-medium text-gray-900">${rental.totalAmount}</td>
                <td className="py-4 px-6">
                  <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(rental.status)}`}>
                    {rental.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile Card View */}
      <div className="md:hidden space-y-4">
        {rentals.map((rental) => (
          <div key={rental.id} className="bg-white rounded-lg border border-gray-200 p-4">
            <div className="flex items-start space-x-3">
              <img
                src={rental.image}
                alt={rental.productName}
                className="w-16 h-16 rounded-lg object-cover"
              />
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between">
                  <h3 className="text-sm font-medium text-gray-900">{rental.productName}</h3>
                  <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(rental.status)}`}>
                    {rental.status}
                  </span>
                </div>
                <div className="mt-1 flex items-center text-sm text-gray-500">
                  <User size={14} className="mr-1" />
                  {rental.renterName}
                </div>
                <div className="mt-1 flex items-center text-sm text-gray-500">
                  <MapPin size={14} className="mr-1" />
                  {rental.renterLocation}
                </div>
                <div className="mt-2 flex items-center justify-between">
                  <div className="text-sm">
                    <span className="text-gray-900 font-medium">${rental.totalAmount}</span>
                    <span className="text-gray-500 ml-1">(${rental.dailyRate}/day)</span>
                  </div>
                  <div className="text-xs text-gray-500">
                    {new Date(rental.startDate).toLocaleDateString()} - {new Date(rental.endDate).toLocaleDateString()}
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RentalProducts;
