import { formatDistanceToNow } from "date-fns";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router";
import { FaChevronRight, FaSearch } from "react-icons/fa";
import { useState } from "react";

const AllTutions = () => {
  const axiosSecure = useAxiosSecure();
  const [page, setPage] = useState(1);
  const limit = 6;

  const timeDistance = (time) => {
    // Logic kept exactly as yours
    const postedAt = formatDistanceToNow(new Date(time), { addSuffix: true });
    return postedAt;
  };

  const { data: latestTutions = [], isLoading } = useQuery({
    queryKey: ["tutions", page],
    queryFn: async () => {
      // Logic kept exactly as yours
      const res = await axiosSecure.get(
        `/all-tutions?status=approved&page=${page}&limit=${limit}`
      );
      return res.data;
    },
  });

  return (
    // Background matched to Home (bg-gray-50)
    <div className="max-w-7xl mx-auto px-4 py-16 space-y-10 bg-gray-50 min-h-screen font-inter">
      {/* Section Title - Typography matched to Home */}
      <div className="text-center md:text-left">
        <h1 className="text-3xl md:text-5xl font-bold text-gray-900 leading-tight">
          Find Available <br />
          <span className="text-[#188bfe]">Tuitions</span>
        </h1>
        <p className="mt-4 text-gray-500 text-sm md:text-base max-w-lg">
          Browse the latest tuition posts and find your next student.
        </p>
      </div>

      {/* ------ Search & Filter Section ------ */}
      <section className="max-w-7xl mx-auto px-4 mb-10">
        <div className="bg-base-100 rounded-xl shadow-sm p-6 border border-gray-100">
          <form className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 items-end">
            {/* Search Input */}
            <div className="w-full">
              <label className="label text-sm font-semibold text-gray-700">
                Search
              </label>
              <label className="input input-bordered flex items-center gap-2 w-full focus-within:outline-none focus-within:border-[#188bfe]">
                <input
                  type="text"
                  className="grow"
                  placeholder="Subject, Location..."
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

            {/* Class Filter */}
            <div className="w-full">
              <label className="label text-sm font-semibold text-gray-700">
                Class
              </label>
              <select className="select select-bordered w-full focus:outline-none focus:border-[#188bfe] text-gray-600">
                <option value="">All Classes</option>
                <option value="Class 9">Class 9</option>
                <option value="Class 10">Class 10</option>
                <option value="HSC">HSC</option>
              </select>
            </div>

            {/* Sort/Action */}
            <div className="w-full">
              <button
                type="submit"
                className="btn btn-primary bg-[#188bfe] hover:bg-blue-600 border-none text-white w-full"
              >
                Apply Filters
              </button>
            </div>
          </form>
        </div>
      </section>

      {/* Grid - Logic kept exactly as yours */}
      <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {isLoading ? (
          <div className="col-span-full flex justify-center min-h-50 items-center">
            <span className="loading loading-spinner text-[#188bfe] loading-lg"></span>
          </div>
        ) : (
          latestTutions?.map((tution) => (
            // ----- Exact Card Structure from Home Page -----
            <div
              key={tution._id}
              className="card bg-base-100 shadow-sm hover:shadow-md transition hover:scale-[1.02]"
            >
              <div className="card-body p-6">
                <h3 className="font-semibold text-lg text-gray-900">
                  {tution?.subject} Tutor Needed
                </h3>

                <p className="text-sm text-gray-500">Class {tution?.class}</p>

                {/* Footer section from Home Page Card */}
                <div className="mt-4 pt-4 border-t border-gray-50 flex justify-between items-center">
                  <div>
                    <p className="text-xs text-gray-400">Monthly Budget</p>
                    <p className="font-semibold text-[#188bfe]">
                      {tution?.budget} BDT
                    </p>
                  </div>
                  <p className="text-[10px] uppercase tracking-wider text-gray-400 font-medium bg-gray-50 px-2 py-1 rounded">
                    {timeDistance(tution?.createdAt)}
                  </p>
                </div>

                <Link
                  to={`/tution-details/${tution?._id}`}
                  className="mt-4 text-[#188bfe] text-sm font-medium flex items-center gap-1 group w-fit"
                >
                  View Details
                  <FaChevronRight className="text-[10px] group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Pagination - Styled to match Home/Clean Theme */}
      <div className="flex justify-center pt-8">
        <div className="join border border-gray-200 bg-white">
          <button
            disabled={page === 1}
            onClick={() => setPage((prev) => prev - 1)}
            className="join-item btn btn-md bg-transparent border-none hover:bg-gray-50 text-gray-500"
          >
            Previous
          </button>
          <button className="join-item btn btn-md bg-[#188bfe] text-white border-none hover:bg-blue-600 px-6">
            {page}
          </button>

          <button
            onClick={() => setPage((prev) => prev + 1)}
            className="join-item btn btn-md bg-transparent border-none hover:bg-gray-50 text-[#188bfe] font-bold"
          >
            Next →
          </button>
        </div>
      </div>
    </div>
  );
};

export default AllTutions;
