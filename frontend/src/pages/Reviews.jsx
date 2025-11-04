import React, { useState, useEffect } from 'react';
import { Star, Filter, Search, ThumbsUp, MessageCircle, Calendar, User, Building, Award, X, Plus, Send, Image, ChevronDown, Trash2, Edit3, Heart, Users, Globe, Briefcase, TrendingUp, CheckCircle } from 'lucide-react';

const ReviewsPage = () => {
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('newest');
  const [filteredReviews, setFilteredReviews] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [likedReviews, setLikedReviews] = useState(new Set());
  const [savedReviews, setSavedReviews] = useState(new Set());
  const [visibleReviews, setVisibleReviews] = useState(6);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);

  // Form state for new review
  const [newReview, setNewReview] = useState({
    studentName: '',
    currentRole: '',
    experience: '',
    rating: 0,
    review: '',
    category: 'platform',
    email: ''
  });

  const [reviewsData, setReviewsData] = useState([
    {
      id: 1,
      studentName: "Priya Sharma",
      currentRole: "Software Engineering Intern at Google",
      experience: "Found internship through portal",
      rating: 5,
      date: "2024-07-15",
      review: "This internship portal completely changed my career trajectory! The interface is incredibly user-friendly and I found my dream internship at Google within just 2 weeks of searching. The application tracking system helped me stay organized, and the interview preparation resources were invaluable. Highly recommend to all students!",
      likes: 42,
      replies: 8,
      helpful: true,
      avatar: null,
      category: "platform",
      verified: true
    },
    {
      id: 2,
      studentName: "Rahul Kumar",
      currentRole: "Marketing Intern at Flipkart",
      experience: "3 months internship experience",
      rating: 4,
      date: "2024-07-10",
      review: "Great platform with lots of opportunities! I landed my marketing internship through this portal. The search filters are really helpful and the company profiles give good insights. Would love to see more startup opportunities added. The notification system keeps you updated on application status.",
      likes: 28,
      replies: 5,
      helpful: true,
      avatar: null,
      category: "experience",
      verified: true
    },
    {
      id: 3,
      studentName: "Ananya Patel",
      currentRole: "Data Science Intern at Microsoft",
      experience: "Used portal features extensively",
      rating: 5,
      date: "2024-07-05",
      review: "Absolutely love this platform! The AI-powered job matching feature is fantastic - it suggested roles I wouldn't have found otherwise. The resume builder tool helped me create a professional resume, and the mock interview feature boosted my confidence. Secured my Microsoft internship thanks to this portal!",
      likes: 56,
      replies: 12,
      helpful: true,
      avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face",
      category: "platform",
      verified: true
    },
    {
      id: 4,
      studentName: "Arjun Singh",
      currentRole: "UX Design Intern at Zomato",
      experience: "Portfolio feedback helped",
      rating: 4,
      date: "2024-06-28",
      review: "The portfolio review feature is amazing! Got valuable feedback from industry professionals which helped me improve my design skills. The internship I got through this portal has been an incredible learning experience. Great community support too!",
      likes: 34,
      replies: 6,
      helpful: true,
      avatar: null,
      category: "experience",
      verified: false
    },
    {
      id: 5,
      studentName: "Sneha Reddy",
      currentRole: "Finance Intern at HDFC Bank",
      experience: "Mentorship program participant",
      rating: 5,
      date: "2024-06-20",
      review: "The mentorship program through this portal is exceptional! My mentor guided me throughout my internship application process and even during my internship. The webinars and skill development sessions are top-notch. This platform truly cares about student success!",
      likes: 48,
      replies: 9,
      helpful: true,
      avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&h=100&fit=crop&crop=face",
      category: "mentorship",
      verified: true
    },
    {
      id: 6,
      studentName: "Vikash Jain",
      currentRole: "Full Stack Developer Intern",
      experience: "Skill assessment helped",
      rating: 4,
      date: "2024-06-15",
      review: "The skill assessment tests on the platform helped me identify my strengths and areas for improvement. Based on the results, I focused on improving my backend skills before applying. Got placed as a Full Stack Developer intern! The learning resources are comprehensive.",
      likes: 29,
      replies: 4,
      helpful: true,
      avatar: null,
      category: "platform",
      verified: true
    },
    {
      id: 7,
      studentName: "Meera Gupta",
      currentRole: "Content Writing Intern",
      experience: "First-time internship seeker",
      rating: 3,
      date: "2024-06-10",
      review: "Good platform for beginners like me. The interface is clean and easy to navigate. However, I wish there were more content writing opportunities available. The application process is straightforward, and customer support is responsive when needed.",
      likes: 15,
      replies: 3,
      helpful: false,
      avatar: "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=100&h=100&fit=crop&crop=face",
      category: "experience",
      verified: false
    },
    {
      id: 8,
      studentName: "Karthik Naidu",
      currentRole: "Business Analyst Intern at Accenture",
      experience: "Premium member benefits",
      rating: 5,
      date: "2024-06-05",
      review: "Upgraded to premium membership and it was worth every penny! Priority application processing, exclusive internship opportunities, and one-on-one career counseling sessions. The platform's career guidance helped me transition from engineering to business analysis successfully!",
      likes: 38,
      replies: 7,
      helpful: true,
      avatar: null,
      category: "platform",
      verified: true
    }
  ]);

  const stats = {
    totalReviews: reviewsData.length,
    averageRating: (reviewsData.reduce((sum, review) => sum + review.rating, 0) / reviewsData.length).toFixed(1),
    fiveStars: reviewsData.filter(r => r.rating === 5).length,
    fourStars: reviewsData.filter(r => r.rating === 4).length,
    threeStars: reviewsData.filter(r => r.rating === 3).length,
    twoStars: reviewsData.filter(r => r.rating === 2).length,
    oneStar: reviewsData.filter(r => r.rating === 1).length
  };

  const filters = [
    { key: 'all', label: 'All Reviews', count: reviewsData.length, icon: MessageCircle },
    { key: 'platform', label: 'Platform Experience', count: reviewsData.filter(r => r.category === 'platform').length, icon: Globe },
    { key: 'experience', label: 'Internship Experience', count: reviewsData.filter(r => r.category === 'experience').length, icon: Briefcase },
    { key: 'mentorship', label: 'Mentorship', count: reviewsData.filter(r => r.category === 'mentorship').length, icon: Users },
    { key: 'success', label: 'Success Stories', count: reviewsData.filter(r => r.rating === 5).length, icon: TrendingUp }
  ];

  const categories = [
    { value: 'platform', label: 'Platform Experience' },
    { value: 'experience', label: 'Internship Experience' },
    { value: 'mentorship', label: 'Mentorship Program' },
    { value: 'features', label: 'Platform Features' },
    { value: 'support', label: 'Customer Support' },
    { value: 'other', label: 'Other' }
  ];

  const experiences = [
    'Found internship through portal',
    'Currently interning',
    'Completed internship',
    'Using platform features',
    'Mentorship program participant',
    'Premium member',
    'First-time user',
    'Returning user'
  ];

  useEffect(() => {
    let filtered = reviewsData;

    // Apply category filter
    if (selectedFilter !== 'all') {
      if (selectedFilter === 'success') {
        filtered = filtered.filter(review => review.rating === 5);
      } else {
        filtered = filtered.filter(review => review.category === selectedFilter);
      }
    }

    // Apply search filter
    if (searchTerm) {
      filtered = filtered.filter(review => 
        review.studentName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        review.currentRole.toLowerCase().includes(searchTerm.toLowerCase()) ||
        review.experience.toLowerCase().includes(searchTerm.toLowerCase()) ||
        review.review.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Apply sorting
    if (sortBy === 'newest') {
      filtered.sort((a, b) => new Date(b.date) - new Date(a.date));
    } else if (sortBy === 'oldest') {
      filtered.sort((a, b) => new Date(a.date) - new Date(b.date));
    } else if (sortBy === 'rating') {
      filtered.sort((a, b) => b.rating - a.rating);
    } else if (sortBy === 'helpful') {
      filtered.sort((a, b) => b.likes - a.likes);
    }

    setFilteredReviews(filtered);
  }, [selectedFilter, searchTerm, sortBy, reviewsData]);

  const handleLike = (reviewId) => {
    const newLikedReviews = new Set(likedReviews);
    const updatedReviews = reviewsData.map(review => {
      if (review.id === reviewId) {
        if (likedReviews.has(reviewId)) {
          newLikedReviews.delete(reviewId);
          return { ...review, likes: review.likes - 1 };
        } else {
          newLikedReviews.add(reviewId);
          return { ...review, likes: review.likes + 1 };
        }
      }
      return review;
    });
    
    setLikedReviews(newLikedReviews);
    setReviewsData(updatedReviews);
  };

  const handleSave = (reviewId) => {
    const newSavedReviews = new Set(savedReviews);
    if (savedReviews.has(reviewId)) {
      newSavedReviews.delete(reviewId);
    } else {
      newSavedReviews.add(reviewId);
    }
    setSavedReviews(newSavedReviews);
  };

  const handleSubmitReview = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));

    const newReviewData = {
      id: reviewsData.length + 1,
      studentName: newReview.studentName,
      currentRole: newReview.currentRole,
      experience: newReview.experience,
      rating: newReview.rating,
      date: new Date().toISOString().split('T')[0],
      review: newReview.review,
      likes: 0,
      replies: 0,
      helpful: false,
      avatar: null,
      category: newReview.category,
      verified: false
    };

    setReviewsData([newReviewData, ...reviewsData]);
    setIsModalOpen(false);
    setIsSubmitting(false);
    setShowSuccessMessage(true);
    
    // Reset form
    setNewReview({
      studentName: '',
      currentRole: '',
      experience: '',
      rating: 0,
      review: '',
      category: 'platform',
      email: ''
    });

    // Hide success message after 5 seconds
    setTimeout(() => {
      setShowSuccessMessage(false);
    }, 5000);
  };

  const renderStars = (rating, interactive = false, onStarClick = null) => {
    return Array.from({ length: 5 }, (_, index) => (
      <Star
        key={index}
        className={`w-4 h-4 ${
          index < rating 
            ? 'text-yellow-400 fill-current' 
            : 'text-gray-300'
        } ${interactive ? 'cursor-pointer hover:text-yellow-300' : ''} transition-colors`}
        onClick={interactive && onStarClick ? () => onStarClick(index + 1) : undefined}
      />
    ));
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric' 
    });
  };

  const loadMoreReviews = () => {
    setVisibleReviews(prev => prev + 6);
  };

  const renderAvatar = (review) => {
    if (review.avatar) {
      return (
        <img
          src={review.avatar}
          alt={review.studentName}
          className="w-12 h-12 rounded-full object-cover ring-2 ring-purple-100"
        />
      );
    } else {
      return (
        <div className="w-12 h-12 rounded-full bg-gradient-to-br from-purple-500 to-indigo-600 flex items-center justify-center ring-2 ring-purple-100">
          <User className="w-6 h-6 text-white" />
        </div>
      );
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Success Message */}
      {showSuccessMessage && (
        <div className="fixed top-4 right-4 z-50 bg-green-500 text-white p-4 rounded-lg shadow-lg flex items-center space-x-3 animate-fade-in">
          <CheckCircle className="w-6 h-6" />
          <div>
            <p className="font-semibold">Review Submitted Successfully!</p>
            <p className="text-sm">Thank you for sharing your experience.</p>
          </div>
          <button 
            onClick={() => setShowSuccessMessage(false)}
            className="text-white hover:bg-green-600 p-1 rounded"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* Header */}
      <div className="bg-gradient-to-r from-purple-900 via-purple-700 to-indigo-800 text-white py-8 px-4 relative overflow-hidden">
        <div className="absolute inset-0 bg-purple-900 bg-opacity-10"></div>
        <div className="max-w-6xl mx-auto text-center relative z-10">
          <h1 className="text-3xl md:text-4xl font-bold mb-3 bg-gradient-to-r from-white to-purple-200 bg-clip-text text-transparent">
            Student Reviews & Experiences
          </h1>
          <p className="text-base md:text-lg text-purple-100 mb-6 max-w-2xl mx-auto">
            Real experiences from our community - discover how our internship portal transforms careers
          </p>
          
          {/* Stats Overview */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 max-w-3xl mx-auto">
            {[
              { label: 'Total Reviews', value: stats.totalReviews, icon: MessageCircle },
              { label: 'Average Rating', value: stats.averageRating, icon: Star },
              { label: 'Success Rate', value: '94%', icon: TrendingUp },
              { label: 'Active Students', value: '10K+', icon: Users }
            ].map((stat, index) => {
              const Icon = stat.icon;
              return (
                <div key={index} className="bg-white bg-opacity-15 backdrop-blur-sm rounded-lg p-3 transform hover:scale-105 transition-all duration-300">
                  <Icon className="w-5 h-5 text-purple-600 mx-auto mb-1" />
                  <div className="text-xl font-bold text-purple-800 mb-1">{stat.value}</div>
                  <div className="text-xs text-purple-800">{stat.label}</div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* Rating Distribution */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-6 hover:shadow-xl transition-shadow duration-300">
          <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
            <Award className="w-6 h-6 text-purple-600 mr-2" />
            Rating Distribution
          </h2>
          <div className="space-y-3">
            {[5, 4, 3, 2, 1].map(stars => {
              const count = stars === 5 ? stats.fiveStars : 
                           stars === 4 ? stats.fourStars :
                           stars === 3 ? stats.threeStars :
                           stars === 2 ? stats.twoStars : stats.oneStar;
              const percentage = (count / stats.totalReviews * 100).toFixed(0);
              
              return (
                <div key={stars} className="flex items-center space-x-3 group">
                  <div className="flex items-center space-x-1 w-20">
                    <span className="text-base font-semibold text-gray-700">{stars}</span>
                    <Star className="w-4 h-4 text-yellow-400 fill-current" />
                  </div>
                  <div className="flex-1 bg-gray-200 rounded-full h-3 overflow-hidden">
                    <div 
                      className="bg-gradient-to-r from-purple-600 to-purple-500 h-3 rounded-full transition-all duration-700 group-hover:from-purple-500 group-hover:to-purple-400"
                      style={{ width: `${percentage}%` }}
                    ></div>
                  </div>
                  <span className="text-base font-semibold text-gray-600 w-12 text-right">{count}</span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Filters and Search */}
        <div className="bg-white rounded-xl p-6 mb-6">
          <div className="flex flex-col xl:flex-row xl:items-center xl:justify-between space-y-4 xl:space-y-0">
            {/* Search */}
            <div className="relative flex-1 max-w-lg">
              <Search className="w-5 h-5 absolute left-3 top-3" />
              <input
                type="text"
                placeholder="Search reviews, experiences, or students..."
                className="w-full pl-10 pr-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-purple-100 focus:border-purple-500 text-base"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

            {/* Sort */}
            <div className="flex items-center space-x-2">
              <label className="text-base font-semibold text-gray-700">Sort by:</label>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="px-3 py-2 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-purple-100 focus:border-purple-500 text-base font-medium"
              >
                <option value="newest">Newest First</option>
                <option value="oldest">Oldest First</option>
                <option value="rating">Highest Rating</option>
                <option value="helpful">Most Helpful</option>
              </select>
            </div>
          </div>

          {/* Filter Tabs */}
          <div className="flex flex-wrap gap-2 mt-6">
            {filters.map(filter => {
              const Icon = filter.icon;
              return (
                <button
                  key={filter.key}
                  onClick={() => setSelectedFilter(filter.key)}
                  className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all duration-300 flex items-center space-x-1 ${
                    selectedFilter === filter.key
                      ? 'bg-gradient-to-r from-purple-600 to-indigo-600 text-white shadow-lg transform scale-105'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span>{filter.label} ({filter.count})</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Reviews List */}
        <div className="space-y-4">
          {filteredReviews.slice(0, visibleReviews).map(review => (
            <div key={review.id} className="bg-white rounded-lg shadow-md p-5 hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1 max-w-full">
              <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between mb-4">
                <div className="flex items-start space-x-3 mb-4 lg:mb-0">
                  {renderAvatar(review)}
                  <div>
                    <div className="flex items-center space-x-2 mb-1">
                      <h3 className="text-lg font-bold text-gray-800">{review.studentName}</h3>
                      {review.verified && (
                        <Award className="w-4 h-4 text-green-500" title="Verified Student" />
                      )}
                    </div>
                    <div className="flex items-center space-x-2 text-gray-600 mb-1">
                      <Briefcase className="w-4 h-4" />
                      <span className="text-sm font-semibold">{review.currentRole}</span>
                    </div>
                    <div className="flex items-center space-x-2 text-gray-500 mb-2">
                      <Globe className="w-4 h-4" />
                      <span className="text-xs">{review.experience}</span>
                    </div>
                    <div className="inline-block bg-purple-100 text-purple-800 px-2 py-1 rounded-full text-xs font-semibold">
                      {categories.find(cat => cat.value === review.category)?.label}
                    </div>
                  </div>
                </div>

                <div className="flex flex-col items-end space-y-2">
                  <div className="flex items-center space-x-1">
                    {renderStars(review.rating)}
                    <span className="text-base font-bold text-gray-700 ml-1">({review.rating})</span>
                  </div>
                  <div className="flex items-center space-x-1 text-gray-500">
                    <Calendar className="w-3 h-3" />
                    <span className="text-xs">{formatDate(review.date)}</span>
                  </div>
                  {review.helpful && (
                    <div className="flex items-center space-x-1 text-green-600 font-semibold bg-green-50 px-2 py-1 rounded text-xs">
                      <Award className="w-3 h-3" />
                      <span>Helpful</span>
                    </div>
                  )}
                </div>
              </div>

              <p className="text-gray-700 leading-relaxed text-base line-clamp-4">
                {review.review}
              </p>
            </div>
          ))}
        </div>

        {/* No Results State */}
        {filteredReviews.length === 0 && (
          <div className="text-center py-12">
            <div className="text-gray-300 mb-4">
              <Search className="w-16 h-16 mx-auto" />
            </div>
            <h3 className="text-xl font-bold text-gray-600 mb-3">No reviews found</h3>
            <p className="text-gray-500 text-base mb-6">Try adjusting your search or filter criteria</p>
            <button
              onClick={() => {
                setSearchTerm('');
                setSelectedFilter('all');
              }}
              className="bg-purple-600 text-white px-6 py-2 rounded-lg font-semibold hover:bg-purple-700 transition-colors duration-300"
            >
              Clear Filters
            </button>
          </div>
        )}

        {/* Load More Button */}
        {filteredReviews.length > visibleReviews && (
          <div className="text-center mt-8">
            <button 
              onClick={loadMoreReviews}
              className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white px-8 py-3 rounded-lg text-base font-bold hover:from-purple-700 hover:to-indigo-700 transform hover:scale-105 transition-all duration-300 shadow-lg"
            >
              Load More Reviews ({filteredReviews.length - visibleReviews} remaining)
            </button>
          </div>
        )}
      </div>

      {/* Call to Action */}
      <div className="bg-gradient-to-r from-purple-800 via-purple-600 to-indigo-800 py-8 px-4 mt-12 relative overflow-hidden">
        <div className="absolute inset-0 bg-purple-900 bg-opacity-20"></div>
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-3">
            Share Your Experience
          </h2>
          <p className="text-base md:text-lg text-purple-100 mb-6 max-w-2xl mx-auto">
            Help other students by sharing your experience with our internship portal
          </p>
          <button 
            onClick={() => setIsModalOpen(true)}
            className="bg-white text-purple-600 px-6 py-2 rounded-lg text-base font-bold hover:bg-gray-100 transform hover:scale-105 transition-all duration-300 shadow-xl"
          >
            Write a Review Now
          </button>
        </div>
      </div>

      {/* Modal for Writing Reviews */}
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl max-w-xl w-full max-h-screen overflow-y-auto shadow-2xl">
            <div className="sticky top-0 bg-white rounded-t-xl border-b-2 border-gray-100 p-4">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold text-gray-800">Share Your Experience</h2>
                <button 
                  onClick={() => setIsModalOpen(false)}
                  className="p-2 hover:bg-gray-100 rounded-full transition-colors duration-200"
                >
                  <X className="w-5 h-5 text-gray-600" />
                </button>
              </div>
            </div>
            
            <form onSubmit={handleSubmitReview} className="p-4 space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-base font-semibold text-gray-700 mb-1">Your Name *</label>
                  <input
                    type="text"
                    required
                    value={newReview.studentName}
                    onChange={(e) => setNewReview({...newReview, studentName: e.target.value})}
                    className="w-full px-3 py-2 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-purple-100 focus:border-purple-500 transition-all duration-300"
                    placeholder="Enter your full name"
                  />
                </div>

                <div>
                  <label className="block text-base font-semibold text-gray-700 mb-1">Email *</label>
                  <input
                    type="email"
                    required
                    value={newReview.email}
                    onChange={(e) => setNewReview({...newReview, email: e.target.value})}
                    className="w-full px-3 py-2 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-purple-100 focus:border-purple-500 transition-all duration-300"
                    placeholder="your.email@example.com"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-base font-semibold text-gray-700 mb-1">Current Role/Status *</label>
                  <input
                    type="text"
                    required
                    value={newReview.currentRole}
                    onChange={(e) => setNewReview({...newReview, currentRole: e.target.value})}
                    className="w-full px-3 py-2 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-purple-100 focus:border-purple-500 transition-all duration-300"
                    placeholder="e.g., Software Engineering Intern at Google"
                  />
                </div>

                <div>
                  <label className="block text-base font-semibold text-gray-700 mb-1">Experience Type *</label>
                  <select
                    required
                    value={newReview.experience}
                    onChange={(e) => setNewReview({...newReview, experience: e.target.value})}
                    className="w-full px-3 py-2 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-purple-100 focus:border-purple-500 transition-all duration-300"
                  >
                    <option value="">Select your experience</option>
                    {experiences.map(exp => (
                      <option key={exp} value={exp}>{exp}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-base font-semibold text-gray-700 mb-1">Category *</label>
                <select
                  value={newReview.category}
                  onChange={(e) => setNewReview({...newReview, category: e.target.value})}
                  className="w-full px-3 py-2 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-purple-100 focus:border-purple-500 transition-all duration-300"
                >
                  {categories.map(cat => (
                    <option key={cat.value} value={cat.value}>{cat.label}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-base font-semibold text-gray-700 mb-1">Rating *</label>
                <div className="flex items-center space-x-2">
                  {renderStars(newReview.rating, true, (rating) => setNewReview({...newReview, rating}))}
                  <span className="text-base font-semibold text-gray-600 ml-3">
                    {newReview.rating > 0 ? `${newReview.rating}/5` : 'Select a rating'}
                  </span>
                </div>
              </div>

              <div>
                <label className="block text-base font-semibold text-gray-700 mb-1">Your Experience *</label>
                <textarea
                  required
                  rows="4"
                  value={newReview.review}
                  onChange={(e) => setNewReview({...newReview, review: e.target.value})}
                  className="w-full px-3 py-2 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-purple-100 focus:border-purple-500 transition-all duration-300 resize-none"
                  placeholder="Share your experience with our internship portal... How did it help you? What features did you find most useful? Any suggestions for improvement?"
                  maxLength="1000"
                />
                <div className="text-right text-sm text-gray-500 mt-1">
                  {newReview.review.length}/1000 characters
                </div>
              </div>

              <div className="flex items-center space-x-3 pt-4">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="flex-1 px-4 py-2 border-2 border-gray-300 text-gray-700 font-semibold rounded-lg hover:bg-gray-50 transition-colors duration-300"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting || newReview.rating === 0}
                  className="flex-1 bg-gradient-to-r from-purple-600 to-indigo-600 text-white px-4 py-2 rounded-lg font-semibold hover:from-purple-700 hover:to-indigo-700 transition-all duration-300 flex items-center justify-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                      <span>Submitting...</span>
                    </>
                  ) : (
                    <>
                      <Send className="w-4 h-4" />
                      <span>Submit Review</span>
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <style jsx>{`
        .animate-fade-in {
          animation: fadeIn 0.5s ease-in-out;
        }

        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(-20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .line-clamp-4 {
          display: -webkit-box;
          -webkit-line-clamp: 4;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
      `}</style>
    </div>
  );
};

export default ReviewsPage;