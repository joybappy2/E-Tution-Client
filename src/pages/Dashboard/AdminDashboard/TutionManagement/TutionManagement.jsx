import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";
import Swal from "sweetalert2";

const TutionManagement = () => {
  const axiosSecure = useAxiosSecure();

  const {
    data: AllTuitions = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["tutions", "status"],
    queryFn: async () => {
      const res = await axiosSecure.get("/all-tutions");
      return res.data;
    },
  });
  console.log(AllTuitions);

  const handleTutionStatus = (status, tutionId) => {
    console.log(status, tutionId);
    axiosSecure
      .patch(`/tution/update/${tutionId}?status=${status}`)
      .then((res) => {
        if (res.data.modifiedCount) {
          refetch();
          Swal.fire({
            title: `Tution ${status}`,
            icon: "success",
            confirmButtonColor: "#188bfe",
          });
        }
      });
  };

  return (
    <div className="min-h-screen py-10 px-3 sm:px-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-6">
          <h2 className="text-2xl md:text-3xl font-bold">Tuition Management</h2>
          <p className="text-sm text-gray-500 mt-1">
            Review and moderate tuition posts before publishing
          </p>
        </div>

        {/* Card Container*/}
        <div className="bg-secondary rounded-2xl shadow-md p-4 sm:p-6 space-y-4">
          {isLoading ? (
            <div className="flex justify-center min-h-50 items-center">
              <span className="loading loading-spinner text-primary loading-xl"></span>
            </div>
          ) : (
            AllTuitions.map((tution) => (
              <div
                key={tution?._id}
                className="bg-base-100 rounded-xl p-4 shadow-sm"
              >
                {/* Tuition Info */}
                <div className="grid grid-cols-1 sm:grid-cols-5 gap-3">
                  <div>
                    <p className="text-xs text-gray-500">Subject</p>
                    <p className="font-medium">{tution.subject}</p>
                  </div>

                  <div>
                    <p className="text-xs text-gray-500">Class</p>
                    <p>{tution.class}</p>
                  </div>

                  <div>
                    <p className="text-xs text-gray-500">Location</p>
                    <p>{tution.location}</p>
                  </div>

                  <div>
                    <p className="text-xs text-gray-500">Budget</p>
                    <p>৳ {tution.budget}</p>
                  </div>

                  <div>
                    <p className="text-xs text-gray-500">Status</p>
                    <span
                      className={`badge badge-soft ${
                        tution?.status === "approved" && "badge-success"
                      }
                      
                      ${tution?.status === "assigned" && "badge-primary"}

                      ${tution?.status === "rejected" && "badge-error"}
                      ${tution?.status === "pending" && "badge-warning"}
                      `}
                    >
                      {tution.status}
                    </span>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex flex-wrap gap-2 mt-4">
                  <button
                    disabled={
                      tution?.status === "approved" ||
                      tution?.status === "assigned"
                    }
                    onClick={() => handleTutionStatus("approved", tution?._id)}
                    className="btn btn-sm btn-primary"
                  >
                    Approve
                  </button>

                  <button
                    disabled={
                      tution?.status === "rejected" ||
                      tution?.status === "approved" ||
                      tution?.status === "assigned"
                    }
                    onClick={() => handleTutionStatus("rejected", tution?._id)}
                    className="btn btn-sm btn-error text-white"
                  >
                    Reject
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default TutionManagement;
