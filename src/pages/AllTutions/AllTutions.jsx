import { formatDistanceToNow } from "date-fns";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router";
import { FaChevronRight, FaSearch } from "react-icons/fa";

const AllTutions = () => {
  const axiosSecure = useAxiosSecure();

  const timeDistance = (time) => {
    try {
      return formatDistanceToNow(new Date(time), { addSuffix: true });
    } catch (err) {
      return "Recently";
    }
  };

  const { data: latestTutions = [], isLoading } = useQuery({
    queryKey: ["tutions"],
    queryFn: async () => {
      const res = await axiosSecure.get(`/all-tutions?status=approved`);
      return res.data;
    },
  });

  return (
    <div className="bg-white font-inter min-h-screen">
      {/* ------ Header Section (Matching Hero Style) ------ */}
      <section className="max-w-7xl mx-auto px-4 pt-16 pb-12">
        <div className="text-center md:text-left">
          <h1 className="text-3xl md:text-5xl font-bold text-gray-900 leading-tight">
            Find Available <br />
            <span className="text-[#188bfe]">Tuitions</span>
          </h1>
          <p className="mt-4 text-gray-500 text-sm md:text-base max-w-md leading-relaxed">
            Browse through the latest tuition opportunities and apply to the ones that match your expertise.
          </p>
        </div>
      </section>

      {/* ------ Search & Filter Box (Matching "How it Works" Container Style) ------ */}
      <section className="max-w-7xl mx-auto px-4 mb-16">
        <div className="bg-gray-50 border border-gray-100 rounded-[32px] p-8 md:p-10 shadow-sm">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 items-end">
            {/* Subject Filter */}
            <div className="space-y-2">
              <label className="text-xs uppercase tracking-widest font-bold text-gray-400 ml-1">Subject</label>
              <select className="select select-bordered w-full bg-white border-gray-200 focus:outline-none focus:border-[#188bfe] h-12 rounded-xl">
                <option value="none">All Subjects</option>
                <option>Math</option>
                <option>Physics</option>
                <option>English</option>
              </select>
            </div>

            {/* Class Filter */}
            <div className="space-y-2">
              <label className="text-xs uppercase tracking-widest font-bold text-gray-400 ml-1">Class</label>
              <select className="select select-bordered w-full bg-white border-gray-200 focus:outline-none focus:border-[#188bfe] h-12 rounded-xl">
                <option>All Classes</option>
                <option>Class 10</option>
                <option>Class 11</option>
                <option>Class 12</option>
              </select>
            </div>

            {/* Location Filter */}
            <div className="space-y-2">
              <label className="text-xs uppercase tracking-widest font-bold text-gray-400 ml-1">Location</label>
              <select className="select select-bordered w-full bg-white border-gray-200 focus:outline-none focus:border-[#188bfe] h-12 rounded-xl">
                <option>All Locations</option>
                <option>Dhaka</option>
                <option>Chattogram</option>
                <option>Rajshahi</option>
              </select>
            </div>

            {/* Search Button (Matching Home CTA Style) */}
            <button className="btn bg-[#188bfe] hover:bg-[#1578da] border-none text-white w-full h-12 rounded-xl flex items-center justify-center gap-2 font-bold shadow-md shadow-blue-100 transition-all">
              <FaSearch size={14} /> Search
            </button>
          </div>

          {/* Budget Slider (Clean Minimalist) */}
          <div className="mt-10 pt-8 border-t border-gray-100">
            <div className="flex justify-between items-center mb-4">
              <label className="text-sm font-bold text-gray-700">Monthly Budget Range</label>
              <div className="text-sm font-bold text-[#188bfe] bg-blue-50 px-4 py-1 rounded-full">
                1000 - 20000 BDT
              </div>
            </div>
            <input type="range" min="1000" max="20000" className="range range-primary range-xs [--range-shdw:#188bfe]" />
          </div>
        </div>
      </section>

      {/* ------ Tuition Grid (EXACT Match of Home Cards) ------ */}
      <section className="py-16 bg-gray-50/50 rounded-[40px] mx-4 mb-20">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {isLoading ? (
              <div className="col-span-full flex justify-center py-20">
                <span className="loading loading-spinner text-[#188bfe] loading-lg"></span>
              </div>
            ) : (
              latestTutions?.map((tution) => (
                <div
                  key={tution._id}
                  className="card bg-white border border-gray-100 shadow-sm hover:shadow-xl hover:shadow-blue-500/5 transition-all duration-300 hover:scale-[1.02]"
                >
                  <div className="card-body p-7">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="font-bold text-xl text-gray-900">
                        {tution?.subject} Tutor Needed
                      </h3>
                    </div>
                    <p className="text-sm text-gray-500 font-medium">Class {tution?.class}</p>

                    <div className="mt-6 pt-6 border-t border-gray-50 flex justify-between items-center">
                      <div>
                        <p className="text-[10px] uppercase tracking-widest text-gray-400 font-bold">Monthly Budget</p>
                        <p className="font-bold text-lg text-gray-900">
                          {tution?.budget} BDT
                        </p>
                      </div>
                      <p className="text-[10px] uppercase tracking-widest text-gray-400 font-bold bg-gray-50 px-2 py-1 rounded">
                        {timeDistance(tution?.createdAt)}
                      </p>
                    </div>

                    <Link
                      to={`/tution-details/${tution?._id}`}
                      className="mt-6 text-[#188bfe] text-sm font-bold flex items-center gap-1 group w-fit hover:gap-2 transition-all"
                    >
                      View Details
                      <FaChevronRight className="text-[10px]" />
                    </Link>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Pagination (Clean Minimalist) */}
          <div className="flex justify-center mt-16">
            <div className="join bg-white border border-gray-200 rounded-2xl p-1 overflow-hidden shadow-sm">
              <button className="join-item btn btn-md bg-white border-none text-gray-400 hover:text-[#188bfe]">Prev</button>
              <button className="join-item btn btn-md bg-[#188bfe] border-none text-white rounded-xl">1</button>
              <button className="join-item btn btn-md bg-white border-none text-gray-600">2</button>
              <button className="join-item btn btn-md bg-white border-none text-gray-600">3</button>
              <button className="join-item btn btn-md bg-white border-none text-gray-400 hover:text-[#188bfe]">Next</button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AllTutions;