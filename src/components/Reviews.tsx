
import { useState } from "react";
import { Star, MessageSquare, Heart, User, Calendar } from "lucide-react";

const Reviews = () => {
  const [reviews] = useState([
    {
      id: 1,
      productName: "MacBook Pro 16-inch",
      productImage: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=400",
      reviewerName: "John Smith",
      reviewerAvatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400",
      rating: 5,
      reviewText: "Excellent laptop! Works perfectly for my video editing needs. The seller was very responsive and helpful.",
      reviewImages: [],
      likes: 12,
      date: "2024-06-10",
      replied: false
    },
    {
      id: 2,
      productName: "Canon EOS R Camera",
      productImage: "https://images.unsplash.com/photo-1606983340126-99ab4feaa64a?w=400",
      reviewerName: "Sarah Johnson",
      reviewerAvatar: "https://images.unsplash.com/photo-1494790108755-2616b332c3f4?w=400",
      rating: 4,
      reviewText: "Great camera quality! Had some minor issues with the lens cap but overall satisfied with the rental experience.",
      reviewImages: ["https://images.unsplash.com/photo-1606983340126-99ab4feaa64a?w=200"],
      likes: 8,
      date: "2024-06-08",
      replied: true,
      sellerReply: "Thank you for the feedback! I'll make sure to include a better lens cap next time."
    },
    {
      id: 3,
      productName: "Professional Tripod",
      productImage: "https://images.unsplash.com/photo-1606918801925-e2c914c4b503?w=400",
      reviewerName: "Mike Chen",
      reviewerAvatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400",
      rating: 5,
      reviewText: "Perfect tripod for professional photography. Very stable and easy to adjust. Highly recommended!",
      reviewImages: [],
      likes: 15,
      date: "2024-06-05",
      replied: false
    },
    {
      id: 4,
      productName: "Wireless Gaming Mouse",
      productImage: "https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=400",
      reviewerName: "Emma Davis",
      reviewerAvatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400",
      rating: 3,
      reviewText: "Mouse works fine but the battery life could be better. Good for short gaming sessions.",
      reviewImages: [],
      likes: 5,
      date: "2024-06-03",
      replied: false
    }
  ]);

  const [replyTexts, setReplyTexts] = useState<{[key: number]: string}>({});
  const [showReplyForm, setShowReplyForm] = useState<{[key: number]: boolean}>({});

  const renderStars = (rating: number) => {
    return [...Array(5)].map((_, i) => (
      <Star
        key={i}
        size={16}
        className={i < rating ? "text-yellow-400 fill-current" : "text-gray-300"}
      />
    ));
  };

  const handleReply = (reviewId: number) => {
    const replyText = replyTexts[reviewId];
    if (replyText?.trim()) {
      console.log(`Reply to review ${reviewId}:`, replyText);
      // Here you would handle the reply submission
      setReplyTexts({ ...replyTexts, [reviewId]: "" });
      setShowReplyForm({ ...showReplyForm, [reviewId]: false });
    }
  };

  const toggleReplyForm = (reviewId: number) => {
    setShowReplyForm({ ...showReplyForm, [reviewId]: !showReplyForm[reviewId] });
  };

  const totalReviews = reviews.length;
  const averageRating = reviews.reduce((sum, review) => sum + review.rating, 0) / totalReviews;
  const totalLikes = reviews.reduce((sum, review) => sum + review.likes, 0);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-black mb-2">Customer Reviews</h1>
        <p className="text-gray-600">Manage and respond to customer reviews for your products.</p>
      </div>

      {/* Review Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Reviews</p>
              <p className="text-2xl font-bold text-black">{totalReviews}</p>
            </div>
            <MessageSquare className="text-black" size={24} />
          </div>
        </div>
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Average Rating</p>
              <div className="flex items-center space-x-2">
                <p className="text-2xl font-bold text-black">{averageRating.toFixed(1)}</p>
                <div className="flex">{renderStars(Math.round(averageRating))}</div>
              </div>
            </div>
            <Star className="text-yellow-400" size={24} />
          </div>
        </div>
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Likes</p>
              <p className="text-2xl font-bold text-black">{totalLikes}</p>
            </div>
            <Heart className="text-red-500" size={24} />
          </div>
        </div>
      </div>

      {/* Reviews List */}
      <div className="space-y-6">
        {reviews.map((review) => (
          <div key={review.id} className="bg-white rounded-lg border border-gray-200 p-6">
            {/* Product Info */}
            <div className="flex items-center space-x-3 mb-4 pb-4 border-b border-gray-100">
              <img
                src={review.productImage}
                alt={review.productName}
                className="w-12 h-12 rounded-lg object-cover"
              />
              <div>
                <h3 className="font-medium text-black">{review.productName}</h3>
                <div className="flex items-center space-x-2">
                  <div className="flex">{renderStars(review.rating)}</div>
                  <span className="text-sm text-gray-500">
                    {review.rating} out of 5 stars
                  </span>
                </div>
              </div>
            </div>

            {/* Reviewer Info */}
            <div className="flex items-start space-x-4">
              <img
                src={review.reviewerAvatar}
                alt={review.reviewerName}
                className="w-12 h-12 rounded-full object-cover"
              />
              <div className="flex-1">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center space-x-2">
                    <span className="font-medium text-black">{review.reviewerName}</span>
                    <span className="text-sm text-gray-500 flex items-center">
                      <Calendar size={14} className="mr-1" />
                      {new Date(review.date).toLocaleDateString()}
                    </span>
                  </div>
                  <div className="flex items-center space-x-1 text-sm text-gray-500">
                    <Heart size={14} />
                    <span>{review.likes}</span>
                  </div>
                </div>

                {/* Review Text */}
                <p className="text-gray-700 mb-3">{review.reviewText}</p>

                {/* Review Images */}
                {review.reviewImages.length > 0 && (
                  <div className="flex space-x-2 mb-3">
                    {review.reviewImages.map((image, index) => (
                      <img
                        key={index}
                        src={image}
                        alt={`Review image ${index + 1}`}
                        className="w-20 h-20 rounded-lg object-cover"
                      />
                    ))}
                  </div>
                )}

                {/* Seller Reply */}
                {review.replied && review.sellerReply && (
                  <div className="bg-gray-50 rounded-lg p-4 mb-3">
                    <div className="flex items-center space-x-2 mb-2">
                      <User size={16} className="text-gray-500" />
                      <span className="text-sm font-medium text-gray-700">Your Reply:</span>
                    </div>
                    <p className="text-gray-700">{review.sellerReply}</p>
                  </div>
                )}

                {/* Reply Form */}
                {showReplyForm[review.id] && (
                  <div className="mt-4">
                    <textarea
                      value={replyTexts[review.id] || ""}
                      onChange={(e) => setReplyTexts({ ...replyTexts, [review.id]: e.target.value })}
                      placeholder="Write your reply to this review..."
                      className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-transparent"
                      rows={3}
                    />
                    <div className="flex justify-end space-x-2 mt-2">
                      <button
                        onClick={() => toggleReplyForm(review.id)}
                        className="px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors"
                      >
                        Cancel
                      </button>
                      <button
                        onClick={() => handleReply(review.id)}
                        className="px-4 py-2 bg-black text-white rounded-lg hover:bg-gray-800 transition-colors"
                      >
                        Post Reply
                      </button>
                    </div>
                  </div>
                )}

                {/* Reply Button */}
                {!review.replied && !showReplyForm[review.id] && (
                  <button
                    onClick={() => toggleReplyForm(review.id)}
                    className="flex items-center space-x-2 text-gray-600 hover:text-black transition-colors mt-3"
                  >
                    <MessageSquare size={16} />
                    <span>Reply to this review</span>
                  </button>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Reviews;
