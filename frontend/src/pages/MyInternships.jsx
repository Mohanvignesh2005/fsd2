import React, { useState, useEffect } from 'react';
import { Calendar, MapPin, Clock, Building, GraduationCap, Mail, Phone, FileText, ExternalLink, Filter, Search, TrendingUp, Eye, Star, Award } from 'lucide-react';

const MyInternships = () => {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  // Simulated API data - replace with actual API call
  useEffect(() => {
    const fetchApplications = async () => {
      try {
        // Simulate API call
        setTimeout(() => {
          const mockData = {
            "success": true,
            "count": 3,
            "applications": [
              {
                "education": {
                  "college": "ABC Institute of Technology",
                  "degree": "B.Tech",
                  "branch": "Computer Science",
                  "yearOfPassing": 2026
                },
                "_id": "68838337dbf986c0df13aa30",
                "internshipId": {
                  "_id": "68838a349cc8d744aeb7fc94",
                  "title": "Data Analyst",
                  "company": "New Gen Solutions",
                  "location": "Bangalore, India",
                  "duration": "6 months"
                },
                "applicantId": "6882752f49bd2654917476bc",
                "fullName": "Vijaya G",
                "email": "vijayagiduthuri2@gmail.com",
                "phone": "9876543210",
                "resumeUrl": "https://res.cloudinary.com/your-cloud/resume/vijaya_resume.pdf",
                "coverLetter": "I am excited to apply for this internship as it aligns with my passion and experience in full-stack development.",
                "status": "applied",
                "appliedAt": "2025-07-25T13:14:31.451Z",
                "createdAt": "2025-07-25T13:14:31.455Z",
                "updatedAt": "2025-07-25T13:14:31.455Z",
                "__v": 0
              },
              {
                "education": {
                  "college": "ABC Institute of Technology",
                  "degree": "B.Tech",
                  "branch": "Computer Science",
                  "yearOfPassing": 2026
                },
                "_id": "68838337dbf986c0df13aa31",
                "internshipId": {
                  "_id": "68838a349cc8d744aeb7fc95",
                  "title": "Frontend Developer",
                  "company": "Tech Innovations",
                  "location": "Hyderabad, India",
                  "duration": "4 months"
                },
                "applicantId": "6882752f49bd2654917476bc",
                "fullName": "Vijaya G",
                "email": "vijayagiduthuri2@gmail.com",
                "phone": "9876543210",
                "resumeUrl": "https://res.cloudinary.com/your-cloud/resume/vijaya_resume.pdf",
                "coverLetter": "Passionate about creating user-friendly interfaces and have experience with React and modern web technologies.",
                "status": "under-review",
                "appliedAt": "2025-07-20T10:30:15.123Z",
                "createdAt": "2025-07-20T10:30:15.127Z",
                "updatedAt": "2025-07-23T14:22:18.456Z",
                "__v": 0
              },
              {
                "education": {
                  "college": "ABC Institute of Technology",
                  "degree": "B.Tech",
                  "branch": "Computer Science",
                  "yearOfPassing": 2026
                },
                "_id": "68838337dbf986c0df13aa32",
                "internshipId": {
                  "_id": "68838a349cc8d744aeb7fc96",
                  "title": "Full Stack Developer",
                  "company": "StartupXYZ",
                  "location": "Remote",
                  "duration": "3 months"
                },
                "applicantId": "6882752f49bd2654917476bc",
                "fullName": "Vijaya G",
                "email": "vijayagiduthuri2@gmail.com",
                "phone": "9876543210",
                "resumeUrl": "https://res.cloudinary.com/your-cloud/resume/vijaya_resume.pdf",
                "coverLetter": "Eager to work in a dynamic startup environment and contribute to innovative projects using full-stack technologies.",
                "status": "accepted",
                "appliedAt": "2025-07-15T08:45:22.789Z",
                "createdAt": "2025-07-15T08:45:22.792Z",
                "updatedAt": "2025-07-28T16:15:33.234Z",
                "__v": 0
              }
            ]
          };
          setApplications(mockData.applications);
          setLoading(false);
        }, 1000);
      } catch (error) {
        console.error('Error fetching applications:', error);
        setLoading(false);
      }
    };

    fetchApplications();
  }, []);

  const getStatusColor = (status) => {
    switch (status.toLowerCase()) {
      case 'applied':
        return 'bg-gradient-to-r from-blue-500 to-blue-600 text-white shadow-lg shadow-blue-500/25';
      case 'under-review':
        return 'bg-gradient-to-r from-amber-500 to-orange-500 text-white shadow-lg shadow-amber-500/25';
      case 'accepted':
        return 'bg-gradient-to-r from-emerald-500 to-green-600 text-white shadow-lg shadow-emerald-500/25';
      case 'rejected':
        return 'bg-gradient-to-r from-red-500 to-red-600 text-white shadow-lg shadow-red-500/25';
      default:
        return 'bg-gradient-to-r from-gray-400 to-gray-500 text-white shadow-lg shadow-gray-400/25';
    }
  };

  const getStatusIcon = (status) => {
    switch (status.toLowerCase()) {
      case 'applied':
        return <FileText className="h-3 w-3" />;
      case 'under-review':
        return <Eye className="h-3 w-3" />;
      case 'accepted':
        return <Award className="h-3 w-3" />;
      case 'rejected':
        return <Clock className="h-3 w-3" />;
      default:
        return <FileText className="h-3 w-3" />;
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const filteredApplications = applications.filter(app => {
    const matchesSearch = 
      app.internshipId.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      app.internshipId.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
      app.internshipId.location.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = statusFilter === 'all' || app.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  });

  if (loading) {
    return (
      <div className="min-h-screen bg-white">
        <div className="container mx-auto px-4 py-8">
          <div className="flex items-center justify-center min-h-[60vh]">
            <div className="text-center">
              <div className="relative">
                <div className="animate-spin rounded-full h-16 w-16 border-4 border-purple-200 border-t-purple-600 mx-auto mb-4"></div>
                <div className="absolute inset-0 rounded-full h-16 w-16 border-4 border-transparent border-t-purple-300 animate-ping mx-auto"></div>
              </div>
              <p className="text-gray-900 text-lg font-medium">Loading your applications...</p>
              <p className="text-gray-600 text-sm mt-2">Please wait while we fetch your data</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="bg-gradient-to-r from-purple-600 to-purple-700 shadow-sm border-b">
        <div className="container mx-auto px-4 py-8">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <div className="p-2 bg-purple-500 rounded-xl backdrop-blur-sm">
                  <GraduationCap className="h-6 w-6 text-white" />
                </div>
                <h1 className="text-4xl font-bold text-white">My Internships</h1>
              </div>
              <p className="text-purple-100 text-lg">Track and manage your internship applications</p>
            </div>
            <div className="flex items-center gap-3 bg-purple-500 backdrop-blur-sm rounded-xl px-4 py-2">
              <Calendar className="h-5 w-5 text-white" />
              <span className="text-white font-medium">Last updated: {formatDate(new Date())}</span>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {/* Enhanced Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="group hover:scale-105 transform transition-all duration-300">
            <div className="bg-white rounded-2xl shadow-xl border border-gray-200 p-6 hover:shadow-2xl transition-all duration-300">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-semibold text-gray-600 uppercase tracking-wide">Total Applications</p>
                  <p className="text-3xl font-bold text-gray-900 mt-1">{applications.length}</p>
                  <p className="text-sm text-green-600 font-medium mt-1 flex items-center gap-1">
                    <TrendingUp className="h-3 w-3" />
                    Active portfolio
                  </p>
                </div>
                <div className="h-14 w-14 bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                  <FileText className="h-7 w-7 text-white" />
                </div>
              </div>
            </div>
          </div>
          
          <div className="group hover:scale-105 transform transition-all duration-300">
            <div className="bg-white rounded-2xl shadow-xl border border-gray-200 p-6 hover:shadow-2xl transition-all duration-300">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-semibold text-gray-600 uppercase tracking-wide">Under Review</p>
                  <p className="text-3xl font-bold text-amber-600 mt-1">
                    {applications.filter(app => app.status === 'under-review').length}
                  </p>
                  <p className="text-sm text-amber-600 font-medium mt-1">In progress</p>
                </div>
                <div className="h-14 w-14 bg-gradient-to-br from-amber-500 to-orange-500 rounded-xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                  <Eye className="h-7 w-7 text-white" />
                </div>
              </div>
            </div>
          </div>
          
          <div className="group hover:scale-105 transform transition-all duration-300">
            <div className="bg-white rounded-2xl shadow-xl border border-gray-200 p-6 hover:shadow-2xl transition-all duration-300">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-semibold text-gray-600 uppercase tracking-wide">Accepted</p>
                  <p className="text-3xl font-bold text-emerald-600 mt-1">
                    {applications.filter(app => app.status === 'accepted').length}
                  </p>
                  <p className="text-sm text-emerald-600 font-medium mt-1 flex items-center gap-1">
                    <Star className="h-3 w-3" />
                    Congratulations!
                  </p>
                </div>
                <div className="h-14 w-14 bg-gradient-to-br from-emerald-500 to-green-600 rounded-xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                  <Award className="h-7 w-7 text-white" />
                </div>
              </div>
            </div>
          </div>
          
          <div className="group hover:scale-105 transform transition-all duration-300">
            <div className="bg-white rounded-2xl shadow-xl border border-gray-200 p-6 hover:shadow-2xl transition-all duration-300">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-semibold text-gray-600 uppercase tracking-wide">Recently Applied</p>
                  <p className="text-3xl font-bold text-blue-600 mt-1">
                    {applications.filter(app => app.status === 'applied').length}
                  </p>
                  <p className="text-sm text-blue-600 font-medium mt-1">Awaiting response</p>
                </div>
                <div className="h-14 w-14 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                  <Building className="h-7 w-7 text-white" />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Enhanced Filters */}
        <div className="bg-white rounded-2xl shadow-xl border border-gray-200 p-6 mb-8">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <div className="relative group">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5 group-focus-within:text-purple-500 transition-colors" />
                <input
                  type="text"
                  placeholder="Search by company, position, or location..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-12 pr-4 py-3 w-full border border-gray-200 rounded-xl focus:outline-none focus:border-purple-400 transition-all duration-300 bg-white shadow-sm"
                  style={{ outline: 'none' }}
                />
              </div>
            </div>
            <div className="sm:w-56">
              <div className="relative group">
                <Filter className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5 group-focus-within:text-purple-500 transition-colors" />
                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className="pl-12 pr-8 py-3 w-full border border-gray-200 rounded-xl focus:outline-none focus:border-purple-400 transition-all duration-300 appearance-none bg-white shadow-sm"
                  style={{ outline: 'none' }}
                >
                  <option value="all">All Status</option>
                  <option value="applied">Applied</option>
                  <option value="under-review">Under Review</option>
                  <option value="accepted">Accepted</option>
                  <option value="rejected">Rejected</option>
                </select>
              </div>
            </div>
          </div>
        </div>

        {/* Enhanced Applications List */}
        <div className="space-y-6">
          {filteredApplications.length === 0 ? (
            <div className="bg-white rounded-2xl shadow-xl border border-gray-200 p-12 text-center">
              <div className="h-20 w-20 bg-gradient-to-br from-purple-100 to-purple-200 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <FileText className="h-10 w-10 text-purple-500" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-3">No applications found</h3>
              <p className="text-gray-600 text-lg">
                {searchTerm || statusFilter !== 'all' 
                  ? "Try adjusting your search or filter criteria" 
                  : "You haven't applied to any internships yet"}
              </p>
            </div>
          ) : (
            filteredApplications.map((application, index) => (
              <div 
                key={application._id} 
                className="group bg-white rounded-2xl shadow-xl border border-gray-200 hover:shadow-2xl hover:scale-[1.02] transition-all duration-300"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="p-6">
                  {/* Enhanced Header */}
                  <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 mb-6">
                    <div className="flex-1">
                      <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-4 mb-3">
                        <h3 className="text-2xl font-bold text-gray-900 group-hover:text-purple-600 transition-colors">
                          {application.internshipId.title}
                        </h3>
                        <span className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-bold ${getStatusColor(application.status)} transform hover:scale-105 transition-transform`}>
                          {getStatusIcon(application.status)}
                          {application.status.charAt(0).toUpperCase() + application.status.slice(1).replace('-', ' ')}
                        </span>
                      </div>
                      <div className="flex flex-wrap items-center gap-6 text-gray-600">
                        <div className="flex items-center gap-2 bg-gray-50 rounded-lg px-3 py-2">
                          <Building className="h-4 w-4 text-purple-500" />
                          <span className="font-medium">{application.internshipId.company}</span>
                        </div>
                        <div className="flex items-center gap-2 bg-gray-50 rounded-lg px-3 py-2">
                          <MapPin className="h-4 w-4 text-purple-500" />
                          <span className="font-medium">{application.internshipId.location}</span>
                        </div>
                        <div className="flex items-center gap-2 bg-gray-50 rounded-lg px-3 py-2">
                          <Clock className="h-4 w-4 text-purple-500" />
                          <span className="font-medium">{application.internshipId.duration}</span>
                        </div>
                      </div>
                    </div>
                    <div className="text-right bg-gradient-to-br from-purple-50 to-indigo-50 rounded-xl p-4 border border-purple-100">
                      <p className="text-sm font-semibold text-purple-600 uppercase tracking-wide">Applied on</p>
                      <p className="text-lg font-bold text-gray-900">{formatDate(application.appliedAt)}</p>
                    </div>
                  </div>

                  {/* Enhanced Application Details */}
                  <div className="space-y-6">
                    <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl p-5 border border-gray-200">
                      <h4 className="text-lg font-bold text-gray-900 mb-3 flex items-center gap-2">
                        <FileText className="h-5 w-5 text-purple-500" />
                        Cover Letter
                      </h4>
                      <p className="text-gray-700 leading-relaxed">
                        {application.coverLetter}
                      </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-5 border border-blue-200">
                        <h4 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                          <Mail className="h-5 w-5 text-blue-500" />
                          Contact Information
                        </h4>
                        <div className="space-y-3">
                          <div className="flex items-center gap-3 text-gray-700">
                            <div className="p-2 bg-white rounded-lg shadow-sm">
                              <Mail className="h-4 w-4 text-blue-500" />
                            </div>
                            <span className="font-medium">{application.email}</span>
                          </div>
                          <div className="flex items-center gap-3 text-gray-700">
                            <div className="p-2 bg-white rounded-lg shadow-sm">
                              <Phone className="h-4 w-4 text-blue-500" />
                            </div>
                            <span className="font-medium">{application.phone}</span>
                          </div>
                        </div>
                      </div>

                      <div className="bg-gradient-to-br from-emerald-50 to-green-50 rounded-xl p-5 border border-emerald-200">
                        <h4 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                          <GraduationCap className="h-5 w-5 text-emerald-500" />
                          Education
                        </h4>
                        <div className="space-y-2 text-gray-700">
                          <p className="font-bold text-lg">{application.education.degree} in {application.education.branch}</p>
                          <p className="font-medium">{application.education.college}</p>
                          <div className="inline-flex items-center gap-2 bg-emerald-100 text-emerald-700 px-3 py-1 rounded-full text-sm font-medium">
                            <Calendar className="h-3 w-3" />
                            Graduating: {application.education.yearOfPassing}
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Enhanced Actions */}
                    <div className="flex flex-col sm:flex-row gap-4 pt-6 border-t border-gray-200">
                      <button
                        onClick={() => window.open(application.resumeUrl, '_blank')}
                        className="flex items-center justify-center gap-3 px-6 py-3 bg-gradient-to-r from-purple-600 to-purple-700 text-white rounded-xl hover:from-purple-700 hover:to-purple-800 transition-all duration-300 font-bold shadow-lg hover:shadow-xl hover:scale-105 transform"
                      >
                        <ExternalLink className="h-5 w-5" />
                        View Resume
                      </button>
                      <button className="flex items-center justify-center gap-3 px-6 py-3 bg-white border-2 border-purple-200 text-purple-700 rounded-xl hover:bg-purple-50 hover:border-purple-300 transition-all duration-300 font-bold shadow-sm hover:shadow-md hover:scale-105 transform">
                        <Eye className="h-5 w-5" />
                        View Details
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default MyInternships;