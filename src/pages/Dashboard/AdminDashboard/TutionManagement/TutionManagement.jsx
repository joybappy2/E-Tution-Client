import React from "react";

const TutionManagement = () => {
  return (
    <div className="min-h-screen py-10 px-3 sm:px-6">
  <div className="max-w-6xl mx-auto">
    {/* Header */}
    <div className="text-center mb-6">
      <h2 className="text-2xl md:text-3xl font-bold">
        Tuition Management
      </h2>
      <p className="text-sm text-gray-500 mt-1">
        Review and moderate tuition posts before publishing
      </p>
    </div>

    {/* Card */}
    <div className="bg-secondary rounded-2xl shadow-md p-4 sm:p-6 space-y-4">
      {/* Tuition Item */}
      <div className="bg-base-100 rounded-xl p-4 shadow-sm">
        {/* Tuition Info */}
        <div className="grid grid-cols-1 sm:grid-cols-5 gap-3">
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

          <div>
            <p className="text-xs text-gray-500">Status</p>
            <span className="badge badge-warning badge-outline">
              Pending
            </span>
          </div>
        </div>

        {/* Actions */}
        <div className="flex flex-wrap gap-2 mt-4">
          <button className="btn btn-sm btn-primary">
            Approve
          </button>

          <button className="btn btn-sm btn-outline text-error">
            Reject
          </button>
        </div>
      </div>

      {/* Another Tuition (placeholder) */}
      <div className="bg-base-100 rounded-xl p-4 shadow-sm">
        <div className="grid grid-cols-1 sm:grid-cols-5 gap-3">
          <div>
            <p className="text-xs text-gray-500">Subject</p>
            <p className="font-medium">Physics</p>
          </div>

          <div>
            <p className="text-xs text-gray-500">Class</p>
            <p>Class 12</p>
          </div>

          <div>
            <p className="text-xs text-gray-500">Location</p>
            <p>Dhaka, Dhanmondi</p>
          </div>

          <div>
            <p className="text-xs text-gray-500">Budget</p>
            <p>৳ 7000</p>
          </div>

          <div>
            <p className="text-xs text-gray-500">Status</p>
            <span className="badge badge-success badge-outline">
              Approved
            </span>
          </div>
        </div>

        <div className="flex flex-wrap gap-2 mt-4">
          <button className="btn btn-sm btn-outline" disabled>
            Approved
          </button>
        </div>
      </div>

      {/* Rejected Example */}
      <div className="bg-base-100 rounded-xl p-4 shadow-sm">
        <div className="grid grid-cols-1 sm:grid-cols-5 gap-3">
          <div>
            <p className="text-xs text-gray-500">Subject</p>
            <p className="font-medium">English</p>
          </div>

          <div>
            <p className="text-xs text-gray-500">Class</p>
            <p>Class 8</p>
          </div>

          <div>
            <p className="text-xs text-gray-500">Location</p>
            <p>Chattogram</p>
          </div>

          <div>
            <p className="text-xs text-gray-500">Budget</p>
            <p>৳ 3000</p>
          </div>

          <div>
            <p className="text-xs text-gray-500">Status</p>
            <span className="badge badge-error badge-outline">
              Rejected
            </span>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>

  );
};

export default TutionManagement;
