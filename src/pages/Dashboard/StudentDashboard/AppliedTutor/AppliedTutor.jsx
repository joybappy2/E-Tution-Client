import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";
import useAuth from "../../../../hooks/useAuth";
import { FaCheck, FaTimes } from "react-icons/fa";
import Swal from "sweetalert2";

const AppliedTutor = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();

  const {
    data: applications = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["applications"],
    queryFn: async () => {
      const res = await axiosSecure.get(
        `/applications/appliedTutors/${user?.email}`
      );
      return res.data;
    },
  });

  const handleAcceptTution = (application) => {
    const paymentInfo = {
      expectedSalary: application?.expectedSalary,
      subjectName: application?.tuitonPostSubject,
      applicationId: application?._id,
      tuitonOwnerEmail: application?.tuitonOwnerEmail,
      tutionPostId: application?.tutionPostId,
      tutorEmail: application?.tutorEmail,
    };

    axiosSecure.post("/payment-checkout-session", paymentInfo).then((res) => {
      window.location.href = res.data.url;
    });
  };

  const handleRejectApplication = async (application) => {
    const res = await axiosSecure.patch(
      `/reject/application/${application._id}`
    );
    if (res.data.modifiedCount) {
      refetch();
      Swal.fire({
        title: "Rejected!",
        icon: "success",
        draggable: false,
      });
    }
  };

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
              <th>Tution Subject</th>
              <th>Application Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {isLoading ? (
              <tr>
                <td>
                  <div className="flex justify-center min-h-50 items-center">
                    <span className="loading loading-spinner text-primary loading-xl"></span>
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
                  </td>

                  {/* Experience */}
                  <td>{application?.experience} Years</td>

                  {/* Expected Salary */}
                  <td className="font-semibold">
                    {application?.expectedSalary} BDT
                  </td>
                  {/* Tution Post */}
                  <td className="font-semibold">
                    {application?.tuitonPostSubject}
                  </td>

                  <td>
                    <span
                      className={`badge badge-soft 
                        ${
                          application?.applicationStatus === "approved" &&
                          "badge-success"
                        }
                        ${
                          application?.applicationStatus === "pending" &&
                          "badge-warning"
                        }
                        ${
                          application?.applicationStatus === "rejected" &&
                          "badge-error"
                        }
                        `}
                    >
                      {application?.applicationStatus}
                    </span>
                  </td>

                  {/* Actions */}
                  {application?.applicationStatus !== "approved" &&
                    application?.applicationStatus !== "rejected" && (
                      <th>
                        <div className="flex gap-2">
                          <button
                            onClick={() => handleRejectApplication(application)}
                            className="btn text-white btn-error"
                          >
                            Reject
                          </button>
                          <button
                            onClick={() => handleAcceptTution(application)}
                            className="btn btn-primary text-white"
                          >
                            Accept
                          </button>
                        </div>
                      </th>
                    )}
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
