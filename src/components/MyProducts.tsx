
import { useState } from "react";
import { Edit, Eye, MoreVertical, Package } from "lucide-react";

const MyProducts = () => {
  const [products] = useState([
    {
      id: 1,
      name: "MacBook Pro 16-inch",
      category: "Electronics",
      price: 2499,
      rentPrice: 50,
      quantity: 2,
      status: "Active",
      rentAvailable: true,
      image: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=400"
    },
    {
      id: 2,
      name: "Canon EOS R Camera",
      category: "Electronics",
      price: 1800,
      rentPrice: 35,
      quantity: 1,
      status: "Rented",
      rentAvailable: true,
      image: "https://images.unsplash.com/photo-1606983340126-99ab4feaa64a?w=400"
    },
    {
      id: 3,
      name: "Vintage Leather Jacket",
      category: "Clothing",
      price: 150,
      rentPrice: 0,
      quantity: 0,
      status: "Out of Stock",
      rentAvailable: false,
      image: "https://images.unsplash.com/photo-1551028719-00167b16eac5?w=400"
    },
    {
      id: 4,
      name: "Wireless Gaming Mouse",
      category: "Electronics",
      price: 89,
      rentPrice: 5,
      quantity: 15,
      status: "Active",
      rentAvailable: true,
      image: "https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=400"
    },
    {
      id: 5,
      name: "Professional Tripod",
      category: "Electronics",
      price: 120,
      rentPrice: 8,
      quantity: 3,
      status: "Active",
      rentAvailable: true,
      image: "https://images.unsplash.com/photo-1606918801925-e2c914c4b503?w=400"
    }
  ]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Active":
        return "bg-green-100 text-green-800";
      case "Rented":
        return "bg-blue-100 text-blue-800";
      case "Out of Stock":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">My Products</h1>
          <p className="text-gray-600">Manage all your listed products and their availability.</p>
        </div>
        <div className="text-sm text-gray-500">
          Total: {products.length} products
        </div>
      </div>

      {/* Desktop Table View */}
      <div className="hidden md:block bg-white rounded-lg border border-gray-200 overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="text-left py-3 px-6 text-sm font-medium text-gray-500 uppercase tracking-wider">Product</th>
              <th className="text-left py-3 px-6 text-sm font-medium text-gray-500 uppercase tracking-wider">Category</th>
              <th className="text-left py-3 px-6 text-sm font-medium text-gray-500 uppercase tracking-wider">Price</th>
              <th className="text-left py-3 px-6 text-sm font-medium text-gray-500 uppercase tracking-wider">Rent Price</th>
              <th className="text-left py-3 px-6 text-sm font-medium text-gray-500 uppercase tracking-wider">Quantity</th>
              <th className="text-left py-3 px-6 text-sm font-medium text-gray-500 uppercase tracking-wider">Status</th>
              <th className="text-left py-3 px-6 text-sm font-medium text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {products.map((product) => (
              <tr key={product.id} className="hover:bg-gray-50">
                <td className="py-4 px-6">
                  <div className="flex items-center space-x-3">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-12 h-12 rounded-lg object-cover"
                    />
                    <div>
                      <div className="text-sm font-medium text-gray-900">{product.name}</div>
                      {product.rentAvailable && (
                        <div className="text-xs text-green-600">Available for rent</div>
                      )}
                    </div>
                  </div>
                </td>
                <td className="py-4 px-6 text-sm text-gray-500">{product.category}</td>
                <td className="py-4 px-6 text-sm text-gray-900">${product.price}</td>
                <td className="py-4 px-6 text-sm text-gray-900">
                  {product.rentPrice > 0 ? `$${product.rentPrice}/day` : "N/A"}
                </td>
                <td className="py-4 px-6 text-sm text-gray-900">{product.quantity}</td>
                <td className="py-4 px-6">
                  <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(product.status)}`}>
                    {product.status}
                  </span>
                </td>
                <td className="py-4 px-6">
                  <div className="flex items-center space-x-2">
                    <button className="p-1 text-gray-400 hover:text-gray-600 transition-colors">
                      <Eye size={16} />
                    </button>
                    <button className="p-1 text-gray-400 hover:text-gray-600 transition-colors">
                      <Edit size={16} />
                    </button>
                    <button className="p-1 text-gray-400 hover:text-gray-600 transition-colors">
                      <MoreVertical size={16} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile Card View */}
      <div className="md:hidden space-y-4">
        {products.map((product) => (
          <div key={product.id} className="bg-white rounded-lg border border-gray-200 p-4">
            <div className="flex items-start space-x-3">
              <img
                src={product.image}
                alt={product.name}
                className="w-16 h-16 rounded-lg object-cover"
              />
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="text-sm font-medium text-gray-900 truncate">{product.name}</h3>
                    <p className="text-sm text-gray-500">{product.category}</p>
                  </div>
                  <button className="p-1 text-gray-400">
                    <MoreVertical size={16} />
                  </button>
                </div>
                <div className="mt-2 flex items-center justify-between">
                  <div className="text-sm">
                    <span className="text-gray-900 font-medium">${product.price}</span>
                    {product.rentPrice > 0 && (
                      <span className="text-gray-500 ml-2">· ${product.rentPrice}/day</span>
                    )}
                  </div>
                  <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(product.status)}`}>
                    {product.status}
                  </span>
                </div>
                <div className="mt-2 flex items-center justify-between">
                  <span className="text-sm text-gray-500">Qty: {product.quantity}</span>
                  <div className="flex items-center space-x-2">
                    <button className="p-1 text-gray-400 hover:text-gray-600">
                      <Eye size={16} />
                    </button>
                    <button className="p-1 text-gray-400 hover:text-gray-600">
                      <Edit size={16} />
                    </button>
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

export default MyProducts;
