import { useQuery } from "@tanstack/react-query";
import useAuth from "../../../../hooks/useAuth";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";

const MyTutions = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();

  const { data: myTutions = [], isLoading } = useQuery({
    queryKey: ["my-tutions", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/my-tutions/${user?.email}`);
      return res.data;
    },
  });

  return (
    <div className="min-h-screen py-10 px-3 sm:px-6">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-6">
          <h2 className="text-2xl md:text-3xl font-bold">My Tuitions</h2>
          <p className="text-sm text-gray-500 mt-1">
            Manage all the tuitions you have posted
          </p>
        </div>

        {/* Card */}
        <div className="bg-secondary rounded-2xl shadow-md p-4 sm:p-6 space-y-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {isLoading ? (
            <div className="flex justify-center min-h-50 items-center">
              <span className="loading loading-infinity text-primary loading-xl"></span>
            </div>
          ) : (
            myTutions.map((tution) => (
              <div
                key={tution?._id}
                className="bg-base-100 rounded-xl p-4 shadow-sm flex flex-col h-full"
              >
                {/* Card content */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <p className="text-xs text-gray-500">Subject</p>
                    <p className="font-medium">{tution?.subject}</p>
                  </div>

                  <div>
                    <p className="text-xs text-gray-500">Class</p>
                    <p>Class {tution?.class}</p>
                  </div>

                  <div>
                    <p className="text-xs text-gray-500">Location</p>
                    <p>{tution?.location}</p>
                  </div>

                  <div>
                    <p className="text-xs text-gray-500">Budget</p>
                    <p>৳ {tution?.budget}</p>
                  </div>
                </div>

                {/* Buttons */}
                <div className="flex flex-wrap gap-2 mt-auto pt-4">
                  <button className="btn btn-sm btn-primary">View</button>
                  <button className="btn btn-sm btn-outline">Edit</button>
                  <button className="btn btn-sm btn-ghost text-error">
                    Delete
                  </button>
                </div>
              </div>
            ))
          )}
          {/* Another Tuition (placeholder) */}
        </div>
      </div>
    </div>
  );
};

export default MyTutions;
