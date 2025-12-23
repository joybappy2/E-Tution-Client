import { useQuery } from "@tanstack/react-query";
import { useRef } from "react";
import { useParams } from "react-router";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { useForm } from "react-hook-form";
import useAuth from "../../hooks/useAuth";
import Swal from "sweetalert2";
import useRole from "../../hooks/useRole";

const TutionDetails = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const role = useRole();
  const applyModalRef = useRef(null);
  const { register, handleSubmit } = useForm();

  // ------ loading tution details
  const { id: tutionId } = useParams();
  const { data: tuiton = {}, isLoading } = useQuery({
    queryKey: ["tution", tutionId],
    queryFn: async () => {
      const res = await axiosSecure.get(`/tution/${tutionId}`);
      return res.data;
    },
  });

  // const isApplied = () => {
  //   const emails =  tuiton?.appliedEmails
  //   const amiAchi = emails?.includes(user?.email)
  //   return amiAchi || false
  // };

  const handleClickApply = () => {
    applyModalRef.current.showModal();
  };

  const handleSubmitApplication = async (data) => {
    const newApplication = {
      tutionPostId: tutionId,
      tuitonOwnerEmail: tuiton.email,
      tuitonPostSubject: tuiton?.subject,
      tutorEmail: data.tutorEmail,
      tutorName: data.tutorName,
      expectedSalary: parseInt(data.expectedSalary) || "",
      experience: data.experience,
      qualification: data.qualification,
      tutorImage: user?.photoURL,
    };

    await axiosSecure.patch(`/update/tution/${tutionId}/appliedEmails`, {
      tutorEmail: data.tutorEmail,
    });

    axiosSecure
      .post("/tution/applications", newApplication)
      .then((res) => {
        if (res.data?.insertedId) {
          applyModalRef.current.close();
          Swal.fire({
            title: "Applied",
            text: "Wait for confirmation",
            icon: "success",
            confirmButtonColor: "#188bfe",
          });
        }
      })
      .catch((err) => {
        applyModalRef.current.close();
        Swal.fire({
          title: err.response?.data?.message,
          icon: "error",
          confirmButtonColor: "#188bfe",
        });
      });
  };

  return (
    <div className="min-h-screen py-10 px-3 sm:px-6">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-6">
          <h2 className="text-2xl md:text-3xl font-bold">Tuition Details</h2>
          <p className="text-sm text-gray-500 mt-1">
            Review tuition information before approval
          </p>
        </div>

        {/* Card */}
        {isLoading ? (
          <div className="flex justify-center min-h-50 items-center">
            <span className="loading loading-spinner text-primary loading-xl"></span>
          </div>
        ) : (
          <div className="bg-secondary rounded-2xl shadow-md p-4 sm:p-6 space-y-6">
            {/* Basic Info */}
            <div className="bg-base-100 rounded-xl p-4 shadow-sm">
              <h3 className="font-semibold mb-4">Basic Information</h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <p className="text-xs text-gray-500">Subject</p>
                  <p className="font-medium">{tuiton?.subject}</p>
                </div>

                <div>
                  <p className="text-xs text-gray-500">Class</p>
                  <p>{tuiton?.class}</p>
                </div>

                <div>
                  <p className="text-xs text-gray-500">Location</p>
                  <p>{tuiton?.location}</p>
                </div>

                <div>
                  <p className="text-xs text-gray-500">Budget</p>
                  <p>৳ {tuiton?.budget}</p>
                </div>
              </div>
            </div>

            {/* Description */}
            <div className="bg-base-100 rounded-xl p-4 shadow-sm">
              <h3 className="font-semibold mb-2">Tuition Description</h3>
              <p className="text-sm text-gray-700 leading-relaxed">
                {tuiton?.description}
              </p>
            </div>

            {/* Status */}
            <div className="bg-base-100 rounded-xl p-4 shadow-sm flex items-center justify-between">
              <div>
                <p className="text-xs text-gray-500">Current Status</p>
                <span className="badge badge-soft mt-1">{tuiton?.status}</span>
              </div>
            </div>

            {/* Actions */}
            {role === "tutor" && (
              <div className="flex flex-wrap gap-3 justify-end">
                <button onClick={handleClickApply} className="btn btn-primary">
                  Apply
                </button>
              </div>
            )}
          </div>
        )}
      </div>

      <dialog
        ref={applyModalRef}
        className="modal modal-bottom sm:modal-middle"
      >
        <div className="modal-box">
          <div className=" rounded-xl p-6 shadow-sm max-w-md mx-auto bg-secondary">
            <h2 className="text-xl md:text-2xl font-bold mb-4 text-center">
              ✏️ Request to get the tution
            </h2>

            <form
              onSubmit={handleSubmit(handleSubmitApplication)}
              className="space-y-4"
            >
              {/* Name */}
              <div>
                <label className="block text-gray-500 text-xs mb-1">
                  Tutor Name
                </label>
                <input
                  defaultValue={user?.displayName}
                  readOnly
                  type="text"
                  placeholder="Tutor Name"
                  className="input input-bordered w-full rounded-lg"
                  {...register("tutorName")}
                />
              </div>

              {/* Email */}
              <div>
                <label className="block text-gray-500 text-xs mb-1">
                  Email
                </label>
                <input
                  defaultValue={user?.email}
                  readOnly
                  type="text"
                  placeholder="Tutor Email"
                  className="input input-bordered w-full rounded-lg"
                  {...register("tutorEmail")}
                />
              </div>

              {/* Qualification */}
              <div>
                <label className="block text-gray-500 text-xs mb-1">
                  Qualification
                </label>
                <input
                  type="text"
                  placeholder="Qualification"
                  className="input input-bordered w-full rounded-lg"
                  {...register("qualification")}
                />
              </div>

              {/* Experience */}
              <div>
                <label className="block text-gray-500 text-xs mb-1">
                  Experience (Years)
                </label>
                <input
                  type="number"
                  placeholder="Experience"
                  className="input input-bordered w-full rounded-lg"
                  {...register("experience")}
                />
              </div>

              {/* Experience */}
              <div>
                <label className="block text-gray-500 text-xs mb-1">
                  Expected Salary (BDT)
                </label>
                <input
                  type="number"
                  placeholder="Expected Salary"
                  className="input input-bordered w-full rounded-lg"
                  {...register("expectedSalary")}
                />
              </div>

              {/* Save Button */}
              <button className="w-full btn btn-primary hover:brightness-110 hover:shadow-lg active:scale-95 transition-all duration-200">
                Submit Application
              </button>
            </form>

            {/* ---------  Cancel Btn ------- */}
            <button
              onClick={() => applyModalRef.current.close()}
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

export default TutionDetails;
