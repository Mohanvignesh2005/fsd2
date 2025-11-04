import React from "react";
import {
  MapPin,
  Clock,
  Bookmark,
  Share2,
  ExternalLink,
} from "lucide-react";

const InternCard = ({ job }) => {
  // Generate fallback logo (first letter of company)
  const getLogoDisplay = (logo, company) => {
    const firstLetter = company ? company.charAt(0).toUpperCase() : "?";
    return (
      <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-indigo-600 rounded-lg flex items-center justify-center">
        <span className="text-white font-bold text-lg">{logo || firstLetter}</span>
      </div>
    );
  };

  return (
    <div className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 border border-gray-100">
      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-start gap-4">
          {getLogoDisplay(job.logo, job.company)}
          <div>
            <h3 className="text-lg font-bold text-gray-900 leading-tight">
              {job.title || job.position || "Internship Role"}
            </h3>
            <p className="text-gray-600 text-sm">{job.company || "Unknown Company"}</p>
          </div>
        </div>
        {job.featured && (
          <span className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white px-3 py-1 rounded-full text-xs font-semibold">
            Featured
          </span>
        )}
      </div>

      {/* Job Details */}
      <div className="space-y-3 mb-6">
        {/* Location & Stipend */}
        <div className="flex items-center gap-2 text-gray-600 text-sm">
          <MapPin className="w-4 h-4" />
          <span>{job.location || "Remote / Flexible"}</span>
          {job.stipend && (
            <>
              <div className="w-1 h-1 bg-gray-400 rounded-full mx-2"></div>
              <span className="text-base font-semibold text-gray-900">
                {job.stipend}
              </span>
            </>
          )}
        </div>

        {/* Tags (Type, Work Setting, Duration) */}
        <div className="flex flex-wrap gap-2">
          {job.type && (
            <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-xs font-medium">
              {job.type}
            </span>
          )}
          {job.workSetting && (
            <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-xs font-medium">
              {job.workSetting}
            </span>
          )}
          {job.duration && (
            <span className="bg-purple-100 text-purple-800 px-3 py-1 rounded-full text-xs font-medium">
              {job.duration}
            </span>
          )}
        </div>

        {/* Posted time */}
        {job.timeAgo && (
          <div className="flex items-center gap-2 text-gray-500 text-xs">
            <Clock className="w-4 h-4" />
            <span>{job.timeAgo}</span>
          </div>
        )}

        {/* Skills / Tags */}
        {(job.skillsRequired?.length > 0 || job.tags?.length > 0) && (
          <div className="flex flex-wrap gap-2 mt-2">
            {(job.skillsRequired || job.tags)
              .slice(0, 3)
              .map((item, index) => (
                <span
                  key={index}
                  className="bg-gray-100 text-gray-700 px-2 py-1 rounded-md text-xs font-medium"
                >
                  {item}
                </span>
              ))}
            {((job.skillsRequired?.length || 0) > 3 ||
              (job.tags?.length || 0) > 3) && (
              <span className="text-gray-500 text-xs">
                +{(job.skillsRequired?.length || job.tags?.length) - 3} more
              </span>
            )}
          </div>
        )}
      </div>

      {/* Actions */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <button className="p-2 text-gray-500 hover:text-purple-600 hover:bg-purple-50 rounded-lg transition-all duration-200">
            <Bookmark className="w-5 h-5" />
          </button>
          <button className="p-2 text-gray-500 hover:text-purple-600 hover:bg-purple-50 rounded-lg transition-all duration-200">
            <Share2 className="w-5 h-5" />
          </button>
        </div>

        <button className="bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white px-5 py-2 rounded-lg text-sm font-semibold transition-transform transform hover:scale-105 shadow-md flex items-center gap-2">
          Details
          <ExternalLink className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};

export default InternCard;
