import { useState } from "react";
import { Upload, X, Plus, Eye } from "lucide-react";

const AddProduct = () => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: "",
    price: "",
    quantity: "",
    dailyRentalPrice: "",
    minDays: "",
    maxDays: "",
    isRentalAvailable: false
  });

  const [images, setImages] = useState<string[]>([]);
  const [showPreview, setShowPreview] = useState(false);

  // Updated categories as requested
  const categories = [
    "Home Decor",
    "Furniture", 
    "Clothing Accessories",
    "Health and Beauty",
    "Handicrafts"
  ];

  // Updated category images to match the new categories
  const categoryImages = {
    "Home Decor": "https://images.unsplash.com/photo-1721322800607-8c38375eef04?w=400",
    "Furniture": "https://images.unsplash.com/photo-1721322800607-8c38375eef04?w=400",
    "Clothing Accessories": "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=400",
    "Health and Beauty": "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=400",
    "Handicrafts": "https://images.unsplash.com/photo-1618160702438-9b02ab6515c9?w=400"
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === "checkbox" ? (e.target as HTMLInputElement).checked : value
    }));
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      const newImages = Array.from(files).slice(0, 10 - images.length).map(file => URL.createObjectURL(file));
      setImages(prev => [...prev, ...newImages]);
    }
  };

  const removeImage = (index: number) => {
    setImages(prev => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Product submitted:", { ...formData, images });
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-black mb-2">Add New Product</h1>
        <p className="text-gray-600">Fill in the details below to add a new product to your store.</p>
      </div>

      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Basic Information */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-2">
                Product Title *
              </label>
              <input
                type="text"
                id="title"
                name="title"
                value={formData.title}
                onChange={handleInputChange}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-transparent"
                placeholder="Enter product title"
              />
            </div>

            <div>
              <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-2">
                Category *
              </label>
              <select
                id="category"
                name="category"
                value={formData.category}
                onChange={handleInputChange}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-transparent"
              >
                <option value="">Select a category</option>
                {categories.map(category => (
                  <option key={category} value={category}>{category}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Description */}
          <div>
            <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-2">
              Description *
            </label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              required
              rows={4}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-transparent"
              placeholder="Describe your product in detail"
            />
          </div>

          {/* Pricing and Quantity */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <label htmlFor="price" className="block text-sm font-medium text-gray-700 mb-2">
                Sale Price ($) *
              </label>
              <input
                type="number"
                id="price"
                name="price"
                value={formData.price}
                onChange={handleInputChange}
                required
                min="0"
                step="0.01"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-transparent"
                placeholder="0.00"
              />
            </div>

            <div>
              <label htmlFor="quantity" className="block text-sm font-medium text-gray-700 mb-2">
                Quantity Available *
              </label>
              <input
                type="number"
                id="quantity"
                name="quantity"
                value={formData.quantity}
                onChange={handleInputChange}
                required
                min="1"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-transparent"
                placeholder="1"
              />
            </div>

            <div className="flex items-end">
              <label className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  name="isRentalAvailable"
                  checked={formData.isRentalAvailable}
                  onChange={handleInputChange}
                  className="h-4 w-4 text-black focus:ring-black border-gray-300 rounded"
                />
                <span className="text-sm font-medium text-gray-700">Available for Rent</span>
              </label>
            </div>
          </div>

          {/* Rental Options */}
          {formData.isRentalAvailable && (
            <div className="bg-gray-50 p-4 rounded-lg">
              <h3 className="text-lg font-medium text-black mb-4">Rental Options</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label htmlFor="dailyRentalPrice" className="block text-sm font-medium text-gray-700 mb-2">
                    Daily Rental Price ($)
                  </label>
                  <input
                    type="number"
                    id="dailyRentalPrice"
                    name="dailyRentalPrice"
                    value={formData.dailyRentalPrice}
                    onChange={handleInputChange}
                    min="0"
                    step="0.01"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-transparent"
                    placeholder="0.00"
                  />
                </div>

                <div>
                  <label htmlFor="minDays" className="block text-sm font-medium text-gray-700 mb-2">
                    Minimum Days
                  </label>
                  <input
                    type="number"
                    id="minDays"
                    name="minDays"
                    value={formData.minDays}
                    onChange={handleInputChange}
                    min="1"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-transparent"
                    placeholder="1"
                  />
                </div>

                <div>
                  <label htmlFor="maxDays" className="block text-sm font-medium text-gray-700 mb-2">
                    Maximum Days
                  </label>
                  <input
                    type="number"
                    id="maxDays"
                    name="maxDays"
                    value={formData.maxDays}
                    onChange={handleInputChange}
                    min="1"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-transparent"
                    placeholder="30"
                  />
                </div>
              </div>
            </div>
          )}

          {/* Image Upload */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Product Images (Max 10)
            </label>
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-6">
              <div className="text-center">
                <Upload className="mx-auto h-12 w-12 text-gray-400" />
                <div className="mt-4">
                  <label htmlFor="images" className="cursor-pointer">
                    <span className="mt-2 block text-sm font-medium text-gray-900">
                      Click to upload or drag and drop
                    </span>
                    <span className="mt-1 block text-xs text-gray-500">
                      PNG, JPG, GIF up to 10MB
                    </span>
                  </label>
                  <input
                    id="images"
                    name="images"
                    type="file"
                    multiple
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="hidden"
                  />
                </div>
              </div>
            </div>

            {/* Image Preview */}
            {images.length > 0 && (
              <div className="mt-4 grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
                {images.map((image, index) => (
                  <div key={index} className="relative">
                    <img
                      src={image}
                      alt={`Preview ${index + 1}`}
                      className="h-24 w-full object-cover rounded-lg"
                    />
                    <button
                      type="button"
                      onClick={() => removeImage(index)}
                      className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600"
                    >
                      <X size={16} />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 pt-6 border-t border-gray-200">
            <button
              type="button"
              onClick={() => setShowPreview(!showPreview)}
              className="flex items-center justify-center px-6 py-3 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
            >
              <Eye size={20} className="mr-2" />
              {showPreview ? "Hide Preview" : "Show Preview"}
            </button>
            
            <button
              type="submit"
              className="flex items-center justify-center px-6 py-3 bg-black text-white rounded-lg hover:bg-gray-800 transition-colors"
            >
              <Plus size={20} className="mr-2" />
              Add Product
            </button>
          </div>
        </form>

        {/* Product Preview */}
        {showPreview && (
          <div className="mt-8 p-6 bg-gray-50 rounded-lg">
            <h3 className="text-lg font-medium text-black mb-4">Product Preview</h3>
            <div className="bg-white rounded-lg border border-gray-200 p-4">
              <div className="flex flex-col md:flex-row gap-4">
                <div className="flex-shrink-0">
                  <img
                    src={images[0] || (formData.category ? categoryImages[formData.category as keyof typeof categoryImages] : "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=400")}
                    alt={formData.title || "Product"}
                    className="h-32 w-32 object-cover rounded-lg"
                  />
                </div>
                <div className="flex-1">
                  <h4 className="text-lg font-medium text-black">{formData.title || "Product Title"}</h4>
                  <p className="text-sm text-gray-500">{formData.category || "Category"}</p>
                  <p className="text-gray-700 mt-2">{formData.description || "Product description will appear here..."}</p>
                  <div className="flex items-center space-x-4 mt-3">
                    <span className="text-xl font-bold text-black">${formData.price || "0.00"}</span>
                    {formData.isRentalAvailable && formData.dailyRentalPrice && (
                      <span className="text-sm text-gray-600">
                        Rent: ${formData.dailyRentalPrice}/day
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AddProduct;
