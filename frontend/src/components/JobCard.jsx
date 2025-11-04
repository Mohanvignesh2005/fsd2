import React from 'react';
import { Bookmark, BookmarkCheck } from 'lucide-react';

const JobCard = ({ job, isBookmarked, onBookmarkToggle }) => {
  const getCompanyIcon = (company) => {
    const icons = {
      'Amazon': '🅐',
      'Google': '🅖',
      'Dribbble': '🅓',
      'Twitter': '🅣',
      'Airbnb': '🅐',
      'Apple': '🅐'
    };
    return icons[company] || '🏢';
  };

  const getCompanyColor = (company) => {
    const colors = {
      'Amazon': 'bg-gradient-to-br from-purple-100 to-purple-200',
      'Google': 'bg-gradient-to-br from-purple-50 to-purple-150', 
      'Dribbble': 'bg-gradient-to-br from-purple-200 to-purple-300',
      'Twitter': 'bg-gradient-to-br from-purple-100 to-purple-200',
      'Airbnb': 'bg-gradient-to-br from-purple-150 to-purple-250',
      'Apple': 'bg-gradient-to-br from-purple-50 to-purple-150'
    };
    return colors[company] || 'bg-gradient-to-br from-purple-100 to-purple-200';
  };

  return (
    <div className={`${getCompanyColor(job.company)} rounded-2xl p-6 hover:shadow-lg transition-all duration-300 hover:-translate-y-1 cursor-pointer relative group`}>
      {/* Header */}
      <div className="flex justify-between items-start mb-4">
        <div className="flex items-start space-x-3">
          <div className="text-2xl">{getCompanyIcon(job.company)}</div>
          <div>
            <p className="text-sm text-gray-600 font-medium">{job.date}</p>
            <p className="text-sm text-gray-800 font-semibold mt-1">{job.company}</p>
          </div>
        </div>
        
        <button
          onClick={() => onBookmarkToggle(job.id)}
          className="p-1 hover:bg-white hover:bg-opacity-50 rounded transition-colors"
        >
          {isBookmarked ? (
            <BookmarkCheck size={20} className="text-gray-700" />
          ) : (
            <Bookmark size={20} className="text-gray-600" />
          )}
        </button>
      </div>

      {/* Job Title */}
      <h3 className="text-xl font-bold text-gray-900 mb-4 leading-tight">
        {job.title}
      </h3>

      {/* Tags */}
      <div className="flex flex-wrap gap-2 mb-6">
        {job.workType && (
          <span className="px-3 py-1 bg-white bg-opacity-70 rounded-full text-xs font-medium text-gray-700">
            {job.workType}
          </span>
        )}
        {job.level && (
          <span className="px-3 py-1 bg-white bg-opacity-70 rounded-full text-xs font-medium text-gray-700">
            {job.level}
          </span>
        )}
        {job.schedule && (
          <span className="px-3 py-1 bg-white bg-opacity-70 rounded-full text-xs font-medium text-gray-700">
            {job.schedule}
          </span>
        )}
        {job.additional && job.additional.map((tag, index) => (
          <span key={index} className="px-3 py-1 bg-white bg-opacity-70 rounded-full text-xs font-medium text-gray-700">
            {tag}
          </span>
        ))}
      </div>

      {/* Footer */}
      <div className="flex justify-between items-center">
        <div className="text-left">
          <p className="text-2xl font-bold text-gray-900">{job.salary}</p>
          <p className="text-sm text-gray-600">{job.location}</p>
        </div>
        
        <button className="bg-purple-600 text-white px-6 py-2 rounded-lg hover:bg-purple-700 transition-colors font-medium text-sm" style={{backgroundColor: '#620080'}}>
          Details
        </button>
      </div>
    </div>
  );
};

export default JobCard;