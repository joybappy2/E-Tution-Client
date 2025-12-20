import React from "react";

const AllTutions = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 py-10 space-y-10 bg-slate-50 min-h-screen">
      {/* Section Title */}
      <div>
        <h1 className="text-4xl font-bold text-slate-900">
          Find Available Tuitions
        </h1>
        <p className="text-slate-500 mt-2">
          Browse the latest tuition posts [cite: 95]
        </p>
      </div>

      {/* Search & Filter Box [cite: 203, 204] */}
      <div className="bg-[#f8faff] border border-blue-100 rounded-2xl p-8 shadow-sm">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 items-end">
          {/* Subject Filter [cite: 204] */}
          <div className="space-y-2">
            <label className="text-sm font-semibold text-slate-700">
              Subject
            </label>
            <select className="select select-bordered w-full bg-white">
              <option disabled selected>
                Select Subject
              </option>
              <option>Math</option>
              <option>Physics</option>
              <option>English</option>
            </select>
          </div>

          {/* Class Filter [cite: 204] */}
          <div className="space-y-2">
            <label className="text-sm font-semibold text-slate-700">
              Class
            </label>
            <select className="select select-bordered w-full bg-white">
              <option disabled selected>
                Select Class
              </option>
              <option>Class 10</option>
              <option>Class 11</option>
              <option>Class 12</option>
            </select>
          </div>

          {/* Location Filter [cite: 204] */}
          <div className="space-y-2">
            <label className="text-sm font-semibold text-slate-700">
              Location
            </label>
            <select className="select select-bordered w-full bg-white">
              <option disabled selected>
                Select Location
              </option>
              <option>Dhaka</option>
              <option>Chattogram</option>
              <option>Rajshahi</option>
            </select>
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

      {/* Tuition Grid [cite: 95] */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Card 1 */}
        <div className="bg-white border border-slate-100 rounded-2xl p-8 shadow-sm hover:shadow-md transition-shadow">
          <h3 className="text-2xl font-bold text-slate-800 mb-4">
            Math Tutor Needed
          </h3>
          <div className="space-y-3 text-slate-600">
            <p className="font-medium">Class 10 · Dhaka [cite: 21]</p>
            <p className="font-semibold text-slate-900">
              Budget: 5000 BDT [cite: 21]
            </p>
            <p className="text-sm italic text-slate-500">
              Mon, Wed, Sat (4:00 PM – 6:00 PM) [cite: 21]
            </p>
          </div>
          <div className="mt-6 pt-4 border-t border-slate-50">
            <span className="text-blue-600 font-bold flex items-center gap-1 cursor-pointer hover:underline">
              View Details → [cite: 59]
            </span>
          </div>
        </div>
    
        {/* Card 2 */}
        <div className="bg-white border border-slate-100 rounded-2xl p-8 shadow-sm hover:shadow-md transition-shadow">
          <h3 className="text-2xl font-bold text-slate-800 mb-4">
            Physics Tutor Needed
          </h3>
          <div className="space-y-3 text-slate-600">
            <p className="font-medium">Class 12 · Chattogram [cite: 21]</p>
            <p className="font-semibold text-slate-900">
              Budget: 7000 BDT [cite: 21]
            </p>
            <p className="text-sm italic text-slate-500">
              Sun, Tue, Thu (5:00 PM – 7:00 PM) [cite: 21]
            </p>
          </div>
          <div className="mt-6 pt-4 border-t border-slate-50">
            <span className="text-blue-600 font-bold flex items-center gap-1 cursor-pointer hover:underline">
              View Details → [cite: 59]
            </span>
          </div>
        </div>

        {/* Card 3 */}
        <div className="bg-white border border-slate-100 rounded-2xl p-8 shadow-sm hover:shadow-md transition-shadow">
          <h3 className="text-2xl font-bold text-slate-800 mb-4">
            English Tutor Needed
          </h3>
          <div className="space-y-3 text-slate-600">
            <p className="font-medium">Class 8 · Dhaka [cite: 21]</p>
            <p className="font-semibold text-slate-900">
              Budget: 4000 BDT [cite: 21]
            </p>
            <p className="text-sm italic text-slate-500">
              Tue, Thu (3:00 PM – 4:30 PM) [cite: 21]
            </p>
          </div>
          <div className="mt-6 pt-4 border-t border-slate-50">
            <span className="text-blue-600 font-bold flex items-center gap-1 cursor-pointer hover:underline">
              View Details → [cite: 59]
            </span>
          </div>
        </div>

        {/* Card 4 */}
        <div className="bg-white border border-slate-100 rounded-2xl p-8 shadow-sm hover:shadow-md transition-shadow">
          <h3 className="text-2xl font-bold text-slate-800 mb-4">
            Chemistry Tutor Needed
          </h3>
          <div className="space-y-3 text-slate-600">
            <p className="font-medium">Class 11 · Rajshahi [cite: 21]</p>
            <p className="font-semibold text-slate-900">
              Budget: 6000 BDT [cite: 21]
            </p>
            <p className="text-sm italic text-slate-500">
              Wed, Fri (6:00 PM – 8:00 PM) [cite: 21]
            </p>
          </div>
          <div className="mt-6 pt-4 border-t border-slate-50">
            <span className="text-blue-600 font-bold flex items-center gap-1 cursor-pointer hover:underline">
              View Details → [cite: 59]
            </span>
          </div>
        </div>
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
