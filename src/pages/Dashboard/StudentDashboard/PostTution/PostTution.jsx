import React from "react";
import Button from "../../../../components/Button/Button";

const PostTution = () => {
  return (
    <div className="min-h-screen py-10 px-3 sm:px-6">
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <div className="text-center mb-6">
          <h2 className="text-2xl md:text-3xl font-bold">Post Tuition</h2>
          <p className="text-sm text-gray-500 mt-1">
            Enter basic details to find a tutor
          </p>
        </div>

        {/* Card */}
        <div className="bg-secondary rounded-2xl shadow-md p-4 sm:p-6">
          <form className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Subject */}
            <div className="form-control">
              <label className="label">
                <span className="label-text font-medium">Subject</span>
              </label>
              <input
                type="text"
                placeholder="Math"
                className="input input-bordered w-full"
                required
              />
            </div>

            {/* Class */}
            <div className="form-control">
              <label className="label">
                <span className="label-text font-medium">Class</span>
              </label>
              <input
                type="text"
                placeholder="Class 10"
                className="input input-bordered w-full"
                required
              />
            </div>

            {/* Location */}
            <div className="form-control sm:col-span-2">
              <label className="label">
                <span className="label-text font-medium">Location</span>
              </label>
              <input
                type="text"
                placeholder="Dhaka, Mirpur"
                className="input input-bordered w-full"
                required
              />
            </div>

            {/* Budget */}
            <div className="form-control sm:col-span-2">
              <label className="label">
                <span className="label-text font-medium">Budget (BDT)</span>
              </label>
              <input
                type="number"
                placeholder="5000"
                className="input input-bordered w-full"
                required
              />
            </div>

            {/* Submit */}
            <div className="sm:col-span-2 pt-4">
              <button className="w-full">
                <Button className="btn-primary w-full">Post Tution</Button>
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default PostTution;
