import React from 'react';

const UserManagement = () => {
    return (
        <div className="min-h-screen py-10 px-3 sm:px-6">
  <div className="max-w-6xl mx-auto">
    {/* Header */}
    <div className="text-center mb-6">
      <h2 className="text-2xl md:text-3xl font-bold">
        User Management
      </h2>
      <p className="text-sm text-gray-500 mt-1">
        Manage all registered users and their roles
      </p>
    </div>

    {/* Card */}
    <div className="bg-secondary rounded-2xl shadow-md p-4 sm:p-6 space-y-4">
      {/* User Item */}
      <div className="bg-base-100 rounded-xl p-4 shadow-sm">
        <div className="flex flex-col sm:flex-row sm:items-center gap-4">
          {/* User Image */}
          <div className="avatar">
            <div className="w-14 rounded-full">
              <img
                src="https://i.pravatar.cc/150?img=3"
                alt="User"
              />
            </div>
          </div>

          {/* User Info */}
          <div className="flex-1 grid grid-cols-1 sm:grid-cols-4 gap-3">
            <div>
              <p className="text-xs text-gray-500">Name</p>
              <p className="font-medium">John Doe</p>
            </div>

            <div>
              <p className="text-xs text-gray-500">Email</p>
              <p className="truncate">john@gmail.com</p>
            </div>

            <div>
              <p className="text-xs text-gray-500">Role</p>
              <p>Student</p>
            </div>

            <div>
              <p className="text-xs text-gray-500">
                Account Status
              </p>
              <span className="badge badge-success badge-outline">
                Active
              </span>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="flex flex-wrap gap-2 mt-4">
          <button className="btn btn-sm btn-outline">
            Edit Info
          </button>

          <button className="btn btn-sm btn-outline">
            Change Role
          </button>

          <button className="btn btn-sm btn-ghost text-error">
            Delete Account
          </button>
        </div>
      </div>

      {/* Another User (placeholder) */}
      <div className="bg-base-100 rounded-xl p-4 shadow-sm">
        <div className="flex flex-col sm:flex-row sm:items-center gap-4">
          <div className="avatar">
            <div className="w-14 rounded-full">
              <img
                src="https://i.pravatar.cc/150?img=5"
                alt="User"
              />
            </div>
          </div>

          <div className="flex-1 grid grid-cols-1 sm:grid-cols-4 gap-3">
            <div>
              <p className="text-xs text-gray-500">Name</p>
              <p className="font-medium">Sarah Ahmed</p>
            </div>

            <div>
              <p className="text-xs text-gray-500">Email</p>
              <p className="truncate">sarah@gmail.com</p>
            </div>

            <div>
              <p className="text-xs text-gray-500">Role</p>
              <p>Tutor</p>
            </div>

            <div>
              <p className="text-xs text-gray-500">
                Account Status
              </p>
              <span className="badge badge-warning badge-outline">
                Unverified
              </span>
            </div>
          </div>
        </div>

        <div className="flex flex-wrap gap-2 mt-4">
          <button className="btn btn-sm btn-outline">
            Edit Info
          </button>

          <button className="btn btn-sm btn-outline">
            Change Role
          </button>

          <button className="btn btn-sm btn-ghost text-error">
            Delete Account
          </button>
        </div>
      </div>
    </div>
  </div>
</div>


    );
};

export default UserManagement;