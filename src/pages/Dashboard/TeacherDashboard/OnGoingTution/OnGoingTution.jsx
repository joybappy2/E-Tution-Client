import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";
import useAuth from "../../../../hooks/useAuth";
import { formatDistanceToNow } from "date-fns";

const OnGoingTution = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();

  // ------ loading on going tution --------
  const { data: onGoingTutions = [], isLoading: onGoingLoading } = useQuery({
    queryKey: ["onGoing"],
    queryFn: async () => {
      const res = await axiosSecure.get(
        `/tutions/on-going/${user?.email}/tutor`
      );
      return res.data;
    },
  });

  console.log(onGoingTutions);

  return (
    <div className="min-h-screen px-4 sm:px-6 py-8">
      {/* Page Header */}
      <div className="mb-8">
        <h1 className="text-2xl md:text-3xl font-bold text-gray-900">
          Ongoing Tuitions
        </h1>
        <p className="text-sm text-gray-500 mt-1">
          Track all your currently active tuition sessions
        </p>
      </div>

      {/* Container */}
      <div className="bg-secondary rounded-2xl p-4 sm:p-6 space-y-5">
        {onGoingLoading ? (
          <div className="col-span-full flex justify-center min-h-50 items-center">
            <span className="loading loading-spinner text-[#188bfe] loading-lg"></span>
          </div>
        ) : (
          onGoingTutions.map((tuition) => (
            <div
              key={tuition._id}
              className="bg-base-100 rounded-xl px-4 py-4 shadow-sm hover:shadow-md transition"
            >
              <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center">
                {/* Subject */}
                <div className="md:col-span-4">
                  <p className="text-xs text-gray-500">Subject</p>
                  <p className="font-semibold text-gray-900">
                    {tuition.tuitonPostSubject}
                  </p>
                </div>
  
                {/* Student Info */}
                <div className="md:col-span-3">
                  <p className="text-xs text-gray-500">Student</p>
                  <p className="text-sm text-gray-800 truncate">
                    {tuition.studentEmail}
                  </p>
                </div>
  
                {/* Salary */}
                <div className="md:col-span-2">
                  <p className="text-xs text-gray-500">Monthly Salary</p>
                  <p className="font-semibold text-primary">
                    {tuition.expectedSalary} BDT
                  </p>
                </div>
  
                {/* Status */}
                <div className="md:col-span-2">
                  <span className="badge badge-success badge-soft">
                    Approved
                  </span>
                </div>
  
                {/* Started Time */}
                <div className="md:col-span-1 text-right">
                  <p className="text-xs text-gray-400">
                    {formatDistanceToNow(new Date(tuition.appliedAt), {
                      addSuffix: true,
                    })}
                  </p>
                </div>
              </div>
            </div>
          ))
        )}

        {/* Empty State (optional later) */}
        {/* 
    <div className="text-center py-16 text-gray-500">
      No ongoing tuitions found.
    </div>
    */}
      </div>
    </div>
  );
};

export default OnGoingTution;














