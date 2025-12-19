import React from 'react';

const TutionDetails = () => {
    return (
        <div className="min-h-screen py-10 px-3 sm:px-6">
  <div className="max-w-4xl mx-auto">
    {/* Header */}
    <div className="text-center mb-6">
      <h2 className="text-2xl md:text-3xl font-bold">
        Tuition Details
      </h2>
      <p className="text-sm text-gray-500 mt-1">
        Review tuition information before approval
      </p>
    </div>

    {/* Card */}
    <div className="bg-secondary rounded-2xl shadow-md p-4 sm:p-6 space-y-6">
      {/* Basic Info */}
      <div className="bg-base-100 rounded-xl p-4 shadow-sm">
        <h3 className="font-semibold mb-4">
          Basic Information
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <p className="text-xs text-gray-500">Subject</p>
            <p className="font-medium">Math</p>
          </div>

          <div>
            <p className="text-xs text-gray-500">Class</p>
            <p>Class 10</p>
          </div>

          <div>
            <p className="text-xs text-gray-500">Location</p>
            <p>Dhaka, Mirpur</p>
          </div>

          <div>
            <p className="text-xs text-gray-500">Budget</p>
            <p>৳ 5000</p>
          </div>
        </div>
      </div>

      {/* Description */}
      <div className="bg-base-100 rounded-xl p-4 shadow-sm">
        <h3 className="font-semibold mb-2">
          Tuition Description
        </h3>
        <p className="text-sm text-gray-700 leading-relaxed">
          Need an experienced math tutor for Class 10 student.
          Classes will be held 3 days a week at home.
        </p>
      </div>

      {/* Status */}
      <div className="bg-base-100 rounded-xl p-4 shadow-sm flex items-center justify-between">
        <div>
          <p className="text-xs text-gray-500">Current Status</p>
          <span className="badge badge-warning badge-outline">
            Pending
          </span>
        </div>
      </div>

      {/* Actions */}
      <div className="flex flex-wrap gap-3 justify-end">
        <button className="btn btn-outline text-error">
          Reject
        </button>
        <button className="btn btn-primary">
          Approve
        </button>
      </div>
    </div>
  </div>
</div>

    );
};

export default TutionDetails;