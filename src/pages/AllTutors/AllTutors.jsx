import { Link } from "react-router";
import { FaSearch, FaCheckCircle, FaMapMarkerAlt } from "react-icons/fa";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../hooks/useAxiosSecure";

const AllTutors = () => {
  // Sample data based on the JSON you provided

  const axiosSecure = useAxiosSecure();

  // ------ loading on going tution --------
  const { data: tutors = [], isLoading } = useQuery({
    queryKey: ["onGoing"],
    queryFn: async () => {
      const res = await axiosSecure.get(`/all-tutors`);
      return res.data;
    },
  });

  return (
    <div className="max-w-7xl mx-auto px-4 py-16 space-y-10 bg-gray-50 min-h-screen font-inter">
      {/* ------ Page Header (Matched AllTutions) ------ */}
      <div className="text-center md:text-left">
        <h1 className="text-3xl md:text-5xl font-bold text-gray-900 leading-tight">
          Find Expert <br />
          <span className="text-[#188bfe]">Tutors</span>
        </h1>
        <p className="mt-4 text-gray-500 text-sm md:text-base max-w-lg">
          Browse profiles of qualified tutors and find the perfect mentor for
          your needs.
        </p>
      </div>

      {/* ------ Search & Filter Section (Matched AllTutions) ------ */}
      <section className="max-w-7xl mx-auto mb-10">
        <div className="bg-base-100 rounded-xl shadow-sm p-6 border border-gray-100">
          <form className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 items-end">
            {/* Search Input */}
            <div className="w-full">
              <label className="label text-sm font-semibold text-gray-700">
                Search Name
              </label>
              <label className="input input-bordered flex items-center gap-2 w-full focus-within:outline-none focus-within:border-[#188bfe]">
                <input
                  type="text"
                  className="grow"
                  placeholder="Type name..."
                />
                <FaSearch className="text-gray-400" />
              </label>
            </div>

            {/* Subject Filter */}
            <div className="w-full">
              <label className="label text-sm font-semibold text-gray-700">
                Subject
              </label>
              <select className="select select-bordered w-full focus:outline-none focus:border-[#188bfe] text-gray-600">
                <option value="">All Subjects</option>
                <option value="Math">Math</option>
                <option value="English">English</option>
                <option value="Physics">Physics</option>
              </select>
            </div>

            {/* Location Filter */}
            <div className="w-full">
              <label className="label text-sm font-semibold text-gray-700">
                Location
              </label>
              <select className="select select-bordered w-full focus:outline-none focus:border-[#188bfe] text-gray-600">
                <option value="">All Locations</option>
                <option value="Dhaka">Dhaka</option>
                <option value="Chittagong">Chittagong</option>
                <option value="Online">Online</option>
              </select>
            </div>

            {/* Submit Button */}
            <div className="w-full">
              <button
                type="submit"
                className="btn btn-primary bg-[#188bfe] hover:bg-blue-600 border-none text-white w-full"
              >
                Find Tutors
              </button>
            </div>
          </form>
        </div>
      </section>

      {/* ------ Tutors Grid ------ */}
      <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {isLoading ? (
          <div className="col-span-full flex justify-center min-h-50 items-center">
            <span className="loading loading-spinner text-[#188bfe] loading-lg"></span>
          </div>
        ) : (
          tutors.map((tutor) => (
            // ----- Exact Card Structure from Home Page (Tutors Section) -----
            <div
              key={tutor?._id}
              className="card bg-base-100 shadow-sm hover:shadow-md transition hover:scale-[1.02] items-center text-center p-8 border border-gray-100"
            >
              {/* Profile Image */}
              <div className="relative">
                <img
                  className="w-24 h-24 rounded-full object-cover border-2 border-[#188bfe] p-1 mx-auto"
                  src={tutor?.photoURL}
                  alt="tutor profile"
                />
              </div>

              {/* Name & Verification */}
              <h3 className="font-semibold text-gray-900 mt-4 text-lg flex items-center justify-center gap-2">
                <span>{tutor?.name}</span>
                {tutor?.verificationStatus === "verified" && (
                  <FaCheckCircle className="text-[#188bfe]" />
                )}
              </h3>

              {/* Subtext (Email or Subject) */}
              <p className="text-sm text-gray-500 font-medium mt-1">
                {tutor?.email}
              </p>

              <div className="mt-2 flex items-center gap-1 text-xs text-gray-400">
                <FaMapMarkerAlt />
                <span>Dhaka, Bangladesh</span>
              </div>

              {/* Action Button */}
              <Link
                to={`/tutor-details/${tutor?._id}`}
                className="mt-6 text-[#188bfe] text-sm font-semibold py-2 px-8 border border-[#188bfe] rounded-lg hover:bg-[#188bfe] hover:text-white transition-all w-full md:w-auto"
              >
                View Profile
              </Link>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default AllTutors;
