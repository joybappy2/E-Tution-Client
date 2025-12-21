import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";
import useAuth from "../../../../hooks/useAuth";
import { FaCheck, FaTimes } from "react-icons/fa";

const AppliedTutor = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();

  const { data: applications = [], isLoading } = useQuery({
    queryKey: ["applications"],
    queryFn: async () => {
      const res = await axiosSecure.get(`/tution/applications/${user?.email}`);
      return res.data;
    },
  });

  console.log(applications);

  return (
    <div className="min-h-screen py-10 px-3 sm:px-6">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-6">
          <h2 className="text-2xl md:text-3xl font-bold">Applied Tutors</h2>
          <p className="text-sm text-gray-500 mt-1">
            Manage all the applications applied by Tutors
          </p>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="table">
          {/* head */}
          <thead className="bg-secondary ">
            <tr>
              <th>Name</th>
              <th>Qualifications</th>
              <th>Experience</th>
              <th>Expected Salary</th>
              <th>Actions (Accept/Delete)</th>
            </tr>
          </thead>
          <tbody>
            {isLoading ? (
              <tr>
                <td>
                  <div className="flex justify-center min-h-50 items-center">
                    <span className="loading loading-infinity text-primary loading-xl"></span>
                  </div>
                </td>
              </tr>
            ) : (
              applications.map((application) => (
                <tr key={application?._id} className="hover:bg-base-200">
                  {/* Profile Picture & Name */}
                  <td>
                    <div className="flex items-center gap-3">
                      <div className="avatar">
                        <div className="mask mask-squircle w-12 h-12">
                          <img src={application?.tutorImage} alt="Avatar" />
                        </div>
                      </div>
                      <div>
                        <div className="font-bold">
                          {application?.tutorName}
                        </div>
                      </div>
                    </div>
                  </td>

                  {/* Qualifications */}
                  <td>
                    <div className="text-sm opacity-90">
                      {application?.qualification}
                    </div>
                    <span className="badge badge-ghost badge-sm">{""}</span>
                  </td>

                  {/* Experience */}
                  <td>{application?.experience} Years</td>

                  {/* Expected Salary */}
                  <td className="font-semibold">
                    {application?.expectedSalary} BDT
                  </td>

                  {/* Actions */}
                  <th>
                    <div className="flex gap-2">
                      <button className="btn btn-circle btn-xs btn-outline btn-error">
                        <FaTimes />
                      </button>
                      <button className="btn btn-circle btn-xs btn-success text-white">
                        <FaCheck />
                      </button>
                    </div>
                  </th>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AppliedTutor;
