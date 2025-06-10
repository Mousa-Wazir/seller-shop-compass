
import { useState } from "react";
import { Upload, Image as ImageIcon, Save, X } from "lucide-react";

const AddProduct = () => {
  const [product, setProduct] = useState({
    name: "",
    category: "",
    price: "",
    rentPrice: "",
    description: "",
    quantity: "",
    availableForRent: false,
    images: [] as string[]
  });

  const categories = [
    "Electronics",
    "Clothing",
    "Home & Garden",
    "Sports & Outdoors",
    "Automotive",
    "Books",
    "Toys & Games",
    "Other"
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Product saved:", product);
    // Here you would typically send the data to your backend
    alert("Product saved successfully!");
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      // In a real app, you'd upload these files and get URLs back
      const newImages = Array.from(files).map(file => URL.createObjectURL(file));
      setProduct(prev => ({
        ...prev,
        images: [...prev.images, ...newImages].slice(0, 5) // Limit to 5 images
      }));
    }
  };

  const removeImage = (index: number) => {
    setProduct(prev => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index)
    }));
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Add / Update Product</h1>
        <p className="text-gray-600">Create or modify your product listings for the marketplace.</p>
      </div>

      <form onSubmit={handleSubmit} className="bg-white rounded-lg border border-gray-200 p-6 space-y-6">
        {/* Product Images */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-3">Product Images</label>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-4">
            {product.images.map((image, index) => (
              <div key={index} className="relative">
                <img
                  src={image}
                  alt={`Product ${index + 1}`}
                  className="w-full h-24 object-cover rounded-lg border border-gray-200"
                />
                <button
                  type="button"
                  onClick={() => removeImage(index)}
                  className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600 transition-colors"
                >
                  <X size={14} />
                </button>
              </div>
            ))}
            {product.images.length < 5 && (
              <label className="border-2 border-dashed border-gray-300 rounded-lg p-4 h-24 flex flex-col items-center justify-center cursor-pointer hover:border-gray-400 transition-colors">
                <Upload className="text-gray-400 mb-1" size={20} />
                <span className="text-xs text-gray-500">Upload</span>
                <input
                  type="file"
                  accept="image/*"
                  multiple
                  onChange={handleImageUpload}
                  className="hidden"
                />
              </label>
            )}
          </div>
          <p className="text-sm text-gray-500">Upload up to 5 images. First image will be the main product image.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Product Name */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Product Name</label>
            <input
              type="text"
              value={product.name}
              onChange={(e) => setProduct(prev => ({ ...prev, name: e.target.value }))}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-transparent"
              placeholder="Enter product name"
              required
            />
          </div>

          {/* Category */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
            <select
              value={product.category}
              onChange={(e) => setProduct(prev => ({ ...prev, category: e.target.value }))}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-transparent"
              required
            >
              <option value="">Select a category</option>
              {categories.map(category => (
                <option key={category} value={category}>{category}</option>
              ))}
            </select>
          </div>

          {/* Sale Price */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Sale Price ($)</label>
            <input
              type="number"
              value={product.price}
              onChange={(e) => setProduct(prev => ({ ...prev, price: e.target.value }))}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-transparent"
              placeholder="0.00"
              min="0"
              step="0.01"
              required
            />
          </div>

          {/* Rent Price */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Rent Price ($/day)</label>
            <input
              type="number"
              value={product.rentPrice}
              onChange={(e) => setProduct(prev => ({ ...prev, rentPrice: e.target.value }))}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-transparent"
              placeholder="0.00"
              min="0"
              step="0.01"
            />
          </div>

          {/* Quantity */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Quantity Available</label>
            <input
              type="number"
              value={product.quantity}
              onChange={(e) => setProduct(prev => ({ ...prev, quantity: e.target.value }))}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-transparent"
              placeholder="0"
              min="0"
              required
            />
          </div>

          {/* Available for Rent Toggle */}
          <div className="flex items-center">
            <label className="flex items-center space-x-3 cursor-pointer">
              <input
                type="checkbox"
                checked={product.availableForRent}
                onChange={(e) => setProduct(prev => ({ ...prev, availableForRent: e.target.checked }))}
                className="w-5 h-5 text-gray-600 border-gray-300 rounded focus:ring-gray-500"
              />
              <span className="text-sm font-medium text-gray-700">Available for Rent</span>
            </label>
          </div>
        </div>

        {/* Description */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Product Description</label>
          <textarea
            value={product.description}
            onChange={(e) => setProduct(prev => ({ ...prev, description: e.target.value }))}
            rows={4}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-transparent"
            placeholder="Describe your product features, condition, and any important details..."
            required
          />
        </div>

        {/* Submit Button */}
        <div className="flex justify-end space-x-4">
          <button
            type="button"
            className="px-6 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 transition-colors"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-6 py-2 bg-gray-900 text-white rounded-md hover:bg-gray-800 transition-colors flex items-center space-x-2"
          >
            <Save size={18} />
            <span>Save Product</span>
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddProduct;
