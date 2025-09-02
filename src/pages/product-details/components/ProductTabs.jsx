import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const ProductTabs = ({ product }) => {
  const [activeTab, setActiveTab] = useState('specifications');
  const [reviewFilter, setReviewFilter] = useState('all');
  const [showAllReviews, setShowAllReviews] = useState(false);

  const tabs = [
    { id: 'specifications', label: 'Specifications', icon: 'FileText' },
    { id: 'reviews', label: 'Reviews', icon: 'Star', count: product?.reviewCount },
    { id: 'qa', label: 'Q&A', icon: 'MessageCircle', count: product?.qaCount || 0 }
  ];

  const ratingDistribution = [
    { stars: 5, count: 1250, percentage: 65 },
    { stars: 4, count: 480, percentage: 25 },
    { stars: 3, count: 150, percentage: 8 },
    { stars: 2, count: 30, percentage: 1.5 },
    { stars: 1, count: 10, percentage: 0.5 }
  ];

  const reviews = [
    {
      id: 1,
      user: "Sarah Johnson",
      avatar: "https://randomuser.me/api/portraits/women/1.jpg",
      rating: 5,
      date: "2025-08-28",
      verified: true,
      helpful: 24,
      content: `Excellent product! The quality exceeded my expectations. The build quality is solid and it works exactly as described. Delivery was fast and packaging was secure. Highly recommended for anyone looking for this type of product.`,
      images: [
        "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=400",
        "https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?w=400"
      ]
    },
    {
      id: 2,
      user: "Michael Chen",
      avatar: "https://randomuser.me/api/portraits/men/2.jpg",
      rating: 4,
      date: "2025-08-25",
      verified: true,
      helpful: 18,
      content: `Good value for money. Works well but could be improved in some areas. The design is sleek and modern. Customer service was responsive when I had questions.`,
      images: []
    },
    {
      id: 3,
      user: "Emma Wilson",
      avatar: "https://randomuser.me/api/portraits/women/3.jpg",
      rating: 5,
      date: "2025-08-22",
      verified: false,
      helpful: 12,
      content: `Amazing quality and fast shipping! This product has made my daily routine so much easier. The features work perfectly and the price point is very reasonable.`,
      images: ["https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=400"]
    }
  ];

  const qaItems = [
    {
      id: 1,
      question: "Is this product compatible with older models?",
      answer: "Yes, this product is backward compatible with models from the last 3 years. Please check the compatibility list in the specifications section.",
      askedBy: "John D.",
      answeredBy: "Seller",
      date: "2025-08-30",
      helpful: 15
    },
    {
      id: 2,
      question: "What\'s the warranty period for this item?",
      answer: "This product comes with a 2-year manufacturer warranty covering defects and malfunctions. Extended warranty options are available at checkout.",
      askedBy: "Lisa M.",
      answeredBy: "Seller",
      date: "2025-08-28",
      helpful: 8
    }
  ];

  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, index) => (
      <Icon
        key={index}
        name="Star"
        size={16}
        className={`${
          index < rating ? 'text-warning fill-current' : 'text-muted'
        }`}
      />
    ));
  };

  const renderSpecifications = () => (
    <div className="space-y-6">
      {Object.entries(product?.specifications)?.map(([category, specs]) => (
        <div key={category} className="space-y-3">
          <h3 className="text-lg font-semibold text-foreground capitalize">
            {category?.replace(/([A-Z])/g, ' $1')?.trim()}
          </h3>
          <div className="bg-muted/30 rounded-lg overflow-hidden">
            {Object.entries(specs)?.map(([key, value], index) => (
              <div
                key={key}
                className={`flex py-3 px-4 ${
                  index % 2 === 0 ? 'bg-transparent' : 'bg-white/50'
                }`}
              >
                <div className="w-1/3 text-sm font-medium text-muted-foreground">
                  {key?.replace(/([A-Z])/g, ' $1')?.trim()}
                </div>
                <div className="w-2/3 text-sm text-foreground">{value}</div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );

  const renderReviews = () => (
    <div className="space-y-6">
      {/* Rating Summary */}
      <div className="bg-muted/30 rounded-lg p-6">
        <div className="grid md:grid-cols-2 gap-6">
          <div className="text-center">
            <div className="text-4xl font-bold text-foreground mb-2">
              {product?.rating}
            </div>
            <div className="flex justify-center mb-2">
              {renderStars(Math.floor(product?.rating))}
            </div>
            <div className="text-sm text-muted-foreground">
              Based on {product?.reviewCount?.toLocaleString()} reviews
            </div>
          </div>
          <div className="space-y-2">
            {ratingDistribution?.map((item) => (
              <div key={item?.stars} className="flex items-center space-x-3">
                <div className="flex items-center space-x-1 w-12">
                  <span className="text-sm">{item?.stars}</span>
                  <Icon name="Star" size={12} className="text-warning fill-current" />
                </div>
                <div className="flex-1 bg-muted rounded-full h-2">
                  <div
                    className="bg-warning h-2 rounded-full"
                    style={{ width: `${item?.percentage}%` }}
                  />
                </div>
                <div className="text-sm text-muted-foreground w-12 text-right">
                  {item?.count}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Review Filters */}
      <div className="flex flex-wrap gap-2">
        {['all', '5', '4', '3', '2', '1']?.map((filter) => (
          <Button
            key={filter}
            variant={reviewFilter === filter ? 'default' : 'outline'}
            size="sm"
            onClick={() => setReviewFilter(filter)}
          >
            {filter === 'all' ? 'All Reviews' : `${filter} Stars`}
          </Button>
        ))}
      </div>

      {/* Reviews List */}
      <div className="space-y-6">
        {reviews?.slice(0, showAllReviews ? reviews?.length : 3)?.map((review) => (
          <div key={review?.id} className="border-b border-border pb-6 last:border-b-0">
            <div className="flex items-start space-x-4">
              <img
                src={review?.avatar}
                alt={review?.user}
                className="w-10 h-10 rounded-full object-cover"
              />
              <div className="flex-1 space-y-3">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="flex items-center space-x-2">
                      <span className="font-medium text-foreground">{review?.user}</span>
                      {review?.verified && (
                        <span className="bg-success/10 text-success text-xs px-2 py-1 rounded">
                          Verified Purchase
                        </span>
                      )}
                    </div>
                    <div className="flex items-center space-x-2 mt-1">
                      <div className="flex">{renderStars(review?.rating)}</div>
                      <span className="text-sm text-muted-foreground">
                        {new Date(review.date)?.toLocaleDateString()}
                      </span>
                    </div>
                  </div>
                </div>
                <p className="text-foreground leading-relaxed">{review?.content}</p>
                {review?.images?.length > 0 && (
                  <div className="flex space-x-2">
                    {review?.images?.map((image, index) => (
                      <img
                        key={index}
                        src={image}
                        alt={`Review image ${index + 1}`}
                        className="w-16 h-16 rounded-lg object-cover cursor-pointer hover:opacity-80 transition-opacity"
                      />
                    ))}
                  </div>
                )}
                <div className="flex items-center space-x-4">
                  <Button variant="ghost" size="sm" iconName="ThumbsUp" iconPosition="left">
                    Helpful ({review?.helpful})
                  </Button>
                  <Button variant="ghost" size="sm">
                    Reply
                  </Button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {reviews?.length > 3 && (
        <div className="text-center">
          <Button
            variant="outline"
            onClick={() => setShowAllReviews(!showAllReviews)}
          >
            {showAllReviews ? 'Show Less' : `View All ${reviews?.length} Reviews`}
          </Button>
        </div>
      )}
    </div>
  );

  const renderQA = () => (
    <div className="space-y-6">
      <div className="bg-muted/30 rounded-lg p-4">
        <h3 className="font-medium text-foreground mb-3">Ask a Question</h3>
        <div className="space-y-3">
          <textarea
            placeholder="Type your question here..."
            className="w-full p-3 border border-border rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-primary"
            rows={3}
          />
          <Button size="sm">Submit Question</Button>
        </div>
      </div>

      <div className="space-y-6">
        {qaItems?.map((item) => (
          <div key={item?.id} className="space-y-3">
            <div className="flex items-start space-x-3">
              <Icon name="MessageCircle" size={20} className="text-primary mt-1" />
              <div className="flex-1">
                <p className="font-medium text-foreground">{item?.question}</p>
                <div className="text-sm text-muted-foreground mt-1">
                  Asked by {item?.askedBy} on {new Date(item.date)?.toLocaleDateString()}
                </div>
              </div>
            </div>
            <div className="ml-8 bg-muted/30 rounded-lg p-4">
              <p className="text-foreground mb-2">{item?.answer}</p>
              <div className="flex items-center justify-between">
                <div className="text-sm text-muted-foreground">
                  Answered by {item?.answeredBy}
                </div>
                <Button variant="ghost" size="sm" iconName="ThumbsUp" iconPosition="left">
                  Helpful ({item?.helpful})
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <div className="space-y-6">
      {/* Tab Navigation */}
      <div className="border-b border-border">
        <div className="flex space-x-8 overflow-x-auto">
          {tabs?.map((tab) => (
            <button
              key={tab?.id}
              onClick={() => setActiveTab(tab?.id)}
              className={`flex items-center space-x-2 py-4 px-1 border-b-2 transition-colors duration-200 whitespace-nowrap ${
                activeTab === tab?.id
                  ? 'border-primary text-primary' :'border-transparent text-muted-foreground hover:text-foreground'
              }`}
            >
              <Icon name={tab?.icon} size={18} />
              <span className="font-medium">{tab?.label}</span>
              {tab?.count && (
                <span className="bg-muted text-muted-foreground text-xs px-2 py-1 rounded-full">
                  {tab?.count}
                </span>
              )}
            </button>
          ))}
        </div>
      </div>
      {/* Tab Content */}
      <div className="min-h-[400px]">
        {activeTab === 'specifications' && renderSpecifications()}
        {activeTab === 'reviews' && renderReviews()}
        {activeTab === 'qa' && renderQA()}
      </div>
    </div>
  );
};

export default ProductTabs;