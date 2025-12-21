import { formatDistanceToNow } from "date-fns";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router";

const AllTutions = () => {
  const axiosSecure = useAxiosSecure();

  const timeDistance = (time) => {
    const postedAt = formatDistanceToNow(new Date(time), { addSuffix: true });

    return postedAt;
  };

  const { data: latestTutions = [], isLoading } = useQuery({
    queryKey: ["tutions"],
    queryFn: async () => {
      const res = await axiosSecure.get(`/all-tutions?status=approved`);
      return res.data;
    },
  });

  return (
    <div className="max-w-7xl mx-auto px-4 py-10 space-y-10 bg-slate-50 min-h-screen">
      {/* Section Title */}
      <div>
        <h1 className="text-4xl font-bold text-slate-900">
          Find Available Tuitions
        </h1>
        <p className="text-slate-500 mt-2">Browse the latest tuition posts</p>
      </div>

      {/* Search & Filter Box [cite: 203, 204] */}
      <div className="bg-[#f8faff] border border-blue-100 rounded-2xl p-8 shadow-sm">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 items-end">
          {/* Subject Filter [cite: 204] */}
          <div className="space-y-2">
            <label className="text-sm font-semibold text-slate-700">
              Subject
            </label>
            {/* <select className="select select-bordered w-full bg-white">
              <option value="none">Select Subject</option>
              <option>Math</option>
              <option>Physics</option>
              <option>English</option>
            </select> */}
          </div>

          {/* Class Filter [cite: 204] */}
          <div className="space-y-2">
            <label className="text-sm font-semibold text-slate-700">
              Class
            </label>
            {/* <select className="select select-bordered w-full bg-white">
              <option disabled selected>
                Select Class
              </option>
              <option>Class 10</option>
              <option>Class 11</option>
              <option>Class 12</option>
            </select> */}
          </div>

          {/* Location Filter [cite: 204] */}
          <div className="space-y-2">
            <label className="text-sm font-semibold text-slate-700">
              Location
            </label>
            {/* <select className="select select-bordered w-full bg-white">
              <option disabled selected>
                Select Location
              </option>
              <option>Dhaka</option>
              <option>Chattogram</option>
              <option>Rajshahi</option>
            </select> */}
          </div>

          {/* ID Search [cite: 203] */}
          <div className="space-y-2">
            <label className="text-sm font-semibold text-slate-700">
              Search by ID
            </label>
            <input
              type="text"
              placeholder="Ex: 1024"
              className="input input-bordered w-full bg-white"
            />
          </div>

          {/* Search Button [cite: 203] */}
          <button className="btn btn-primary bg-blue-600 hover:bg-blue-700 border-none text-white w-full h-12">
            Search
          </button>
        </div>

        {/* Budget Slider [cite: 203] */}
        <div className="mt-8">
          <div className="flex justify-between items-center mb-4">
            <label className="text-sm font-semibold text-slate-700">
              Budget Range
            </label>
            <div className="flex gap-4 text-sm font-bold text-slate-600">
              <span>1000 BDT</span>
              <span>20000 BDT</span>
            </div>
          </div>
          <input
            type="range"
            min="1000"
            max="20000"
            className="range range-primary range-sm"
          />
        </div>
      </div>

      <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {isLoading ? (
          <div className="flex justify-center min-h-50 items-center">
            <span className="loading loading-infinity text-primary loading-xl"></span>
          </div>
        ) : (
          latestTutions?.map((tution) => (
            // ----- Tutor Card --------
            <div
              key={tution._id}
              className="card bg-base-100 shadow-sm hover:shadow-md transition"
            >
              <div className="card-body">
                <h3 className="font-semibold text-lg">
                  {tution?.subject} Tutor Needed
                </h3>

                <p className="text-sm text-gray-500">Class {tution?.class}</p>

                <p className="mt-2 font-medium">Budget: {tution?.budget} BDT</p>

                <p className="mt-2 font-medium">
                  {timeDistance(tution?.createdAt)}
                </p>

                <Link
                  to={`/tution-details/${tution?._id}`}
                  className="mt-4 text-primary font-medium"
                >
                  View Details →
                </Link>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Pagination [cite: 203] */}
      <div className="flex justify-center pt-8">
        <div className="join border border-slate-200 bg-white">
          <button className="join-item btn btn-md bg-transparent border-none hover:bg-slate-100">
            Previous
          </button>
          <button className="join-item btn btn-md btn-primary px-6">1</button>
          <button className="join-item btn btn-md bg-transparent border-none hover:bg-slate-100">
            2
          </button>
          <button className="join-item btn btn-md bg-transparent border-none hover:bg-slate-100">
            3
          </button>
          <button className="join-item btn btn-md bg-transparent border-none hover:bg-slate-100">
            ...
          </button>
          <button className="join-item btn btn-md bg-transparent border-none hover:bg-slate-100">
            15
          </button>
          <button className="join-item btn btn-md bg-transparent border-none hover:bg-slate-100 text-blue-600 font-bold">
            Next →
          </button>
        </div>
      </div>
    </div>
  );
};

export default AllTutions;
