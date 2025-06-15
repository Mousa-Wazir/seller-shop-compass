
import React from "react";
import { Search } from "lucide-react";

const ProductSearch = ({
  searchQuery,
  handleSearch,
  searchResults,
  handleProductClick,
  isMobile = false,
}) => (
  <div className="relative w-full">
    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
    <input
      type="text"
      placeholder={isMobile ? "Search products..." : "Search products by title or category..."}
      value={searchQuery}
      onChange={(e) => handleSearch(e.target.value)}
      className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-transparent"
    />
    {searchResults.length > 0 && (
      <div className={`absolute top-full left-0 right-0 bg-white border border-gray-200 rounded-lg shadow-lg mt-1 max-h-${isMobile ? "48" : "60"} overflow-y-auto z-50`}>
        {searchResults.map((product) => (
          <div
            key={product.id}
            onClick={() => handleProductClick(product.id)}
            className="flex items-center space-x-3 p-3 hover:bg-gray-50 cursor-pointer border-b border-gray-100 last:border-b-0"
          >
            <img
              src={product.image}
              alt={product.title}
              className={isMobile ? "w-8 h-8 rounded-md object-cover" : "w-10 h-10 rounded-md object-cover"}
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
);

export default ProductSearch;
