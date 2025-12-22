import { useQuery } from "@tanstack/react-query";
import { useRef, useState } from "react";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";
import useAuth from "../../../../hooks/useAuth";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";

const MyApplications = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const applicationModalRef = useRef(null);
  const { register, handleSubmit, reset } = useForm();
  const [cid, setCid] = useState("");

  //   const timeDistance = (time) => {
  //     const postedAt = formatDistanceToNow(new Date(time), { addSuffix: true });
  //     return postedAt;
  //   };

  const {
    data: applications = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["applications"],
    queryFn: async () => {
      const res = await axiosSecure.get(`/tution/applications/${user?.email}`);
      return res.data;
    },
  });

  const handleClickUpdate = (id) => {
    setCid(id);
    applicationModalRef.current.showModal();
  };

  const handleUpdateApplicationInfo = (data) => {
    const updateDoc = {};
    if (data.experience) {
      updateDoc.experience = data.experience;
    }
    if (data.qualification) {
      updateDoc.qualification = data.qualification;
    }
    if (data.expectedSalary) {
      updateDoc.expectedSalary = parseInt(data.expectedSalary);
    }

    axiosSecure.patch(`/update/application/${cid}`, updateDoc).then((res) => {
      applicationModalRef.current.close();
      reset();
      if (res.data.modifiedCount) {
        refetch();
        Swal.fire({
          title: `Information Updated`,
          icon: "success",
          confirmButtonColor: "#188bfe",
        });
      }
    });
  };

  const handleDeleteApplication = (id) => {
    console.log(id);
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#188bfe",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSecure.delete(`/delete/application/${id}`).then((res) => {
          if (res.data.deletedCount) {
            refetch();
            Swal.fire({
              title: "Deleted!",
              text: "Your Application has been deleted successfully.",
              icon: "success",
              confirmButtonColor: "#188bfe",
            });
          }
        });
      }
    });
  };

  return (
    <div className="min-h-screen py-10 px-3 sm:px-6">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-6">
          <h2 className="text-2xl md:text-3xl font-bold">My Applications</h2>
          <p className="text-sm text-gray-500 mt-1">
            Manage all the applications you have applied
          </p>
        </div>
      </div>

      {/* --------- container ----- */}
      <div className="bg-secondary rounded-2xl shadow-md p-4 sm:p-6 space-y-4">
        {isLoading ? (
          <div className="flex justify-center min-h-50 items-center">
            <span className="loading loading-infinity text-primary loading-xl"></span>
          </div>
        ) : (
          applications.map((application) => (
            <div
              key={application?._id}
              className="bg-base-100 rounded-xl p-4 shadow-sm"
            >
              <div className="flex flex-col sm:flex-row sm:items-center gap-4">
                {/* User Info */}
                <div className="flex-1 grid grid-cols-1 sm:grid-cols-4 gap-3">
                  <div>
                    <p className="text-xs text-gray-500">Subject</p>
                    <p className="truncate">{application?.tuitonPostSubject}</p>
                  </div>

                  <div>
                    <p className="text-xs text-gray-500">Expected Salary</p>
                    <p className="font-medium">
                      {application?.expectedSalary} BDT
                    </p>
                  </div>

                  <div>
                    <p className="text-xs text-gray-500">Experience</p>
                    <p>{application?.experience} Years</p>
                  </div>

                  <div className="">
                    <p className="text-xs text-gray-500">Application Status</p>
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
                      {application?.applicationStatus || "no status"}
                    </span>
                  </div>
                </div>
              </div>

              {/* Actions */}
              {application?.applicationStatus !== "approved" && (
                <div className="flex flex-wrap gap-2 mt-4">
                  <button
                    onClick={() => handleClickUpdate(application?._id)}
                    className="btn btn-sm btn-primary"
                  >
                    Update Info
                  </button>

                  <button
                    onClick={() => handleDeleteApplication(application?._id)}
                    className="btn btn-sm btn-error text-white"
                  >
                    Delete
                  </button>
                </div>
              )}
            </div>
          ))
        )}
      </div>

      {/* ------ User Update Modal --------- */}
      <dialog
        ref={applicationModalRef}
        className="modal modal-bottom sm:modal-middle"
      >
        <div className="modal-box">
          <div className=" rounded-xl p-6 shadow-sm max-w-md mx-auto bg-secondary">
            <h2 className="text-xl md:text-2xl font-bold mb-4 text-center">
              ✏️ Update Application Info
            </h2>

            <form
              onSubmit={handleSubmit(handleUpdateApplicationInfo)}
              className="space-y-4"
            >
              {/* Name */}
              <div>
                <label className="block text-gray-500 text-xs mb-1">
                  Experience (Years)
                </label>
                <input
                  type="number"
                  className="input input-bordered w-full rounded-lg"
                  {...register("experience")}
                />
              </div>

              {/* Expected Salary */}
              <div>
                <label className="block text-gray-500 text-xs mb-1">
                  Expected Salary
                </label>
                <input
                  type="number"
                  className="input input-bordered w-full rounded-lg"
                  {...register("expectedSalary")}
                />
              </div>

              {/* Qualification */}
              <div>
                <label className="block text-gray-500 text-xs mb-1">
                  Qualification
                </label>
                <input
                  type="text"
                  className="input input-bordered w-full rounded-lg"
                  {...register("qualification")}
                />
              </div>

              {/* Save Button */}
              <button className="w-full btn btn-primary hover:brightness-110 hover:shadow-lg active:scale-95 transition-all duration-200">
                Save Changes
              </button>
            </form>

            {/* ---------  Cancel Btn ------- */}
            <button
              onClick={() => applicationModalRef.current.close()}
              className="mt-4 w-full btn text-error hover:brightness-110 hover:shadow-lg active:scale-95 transition-all duration-200"
            >
              Cancel
            </button>
          </div>
        </div>
      </dialog>
    </div>
  );
};

export default MyApplications;
