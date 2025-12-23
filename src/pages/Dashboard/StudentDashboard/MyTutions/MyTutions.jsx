import { useQuery } from "@tanstack/react-query";
import useAuth from "../../../../hooks/useAuth";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";
import { useRef, useState } from "react";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import { Link } from "react-router";

const MyTutions = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();
  const modalRef = useRef(null);
  const [tutionInfo, setTutionInfo] = useState("");
  // const [deleteId, setDeleteId] = useState("");
  const { register, handleSubmit, reset } = useForm();

  // ------ loading my tution posts --------
  const {
    data: myTutions = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["my-tutions", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/my-tutions/${user?.email}`);
      return res.data;
    },
  });

  // ------ loading on going tution --------
  const { data: onGoingTutions = [], isLoading: onGoingLoading } = useQuery({
    queryKey: ["onGoing"],
    queryFn: async () => {
      const res = await axiosSecure.get(
        `/tutions/on-going/${user?.email}/student`
      );
      return res.data;
    },
  });

  // ----- Open modal & set clicked tution in state --------
  const handleEditTution = (clickedTution) => {
    setTutionInfo(clickedTution);

    reset();
    modalRef.current.showModal();
  };

  // ----- Update Tution Function
  const handleSaveChanges = (data) => {
    data.budget = parseInt(data.budget);
    const id = tutionInfo._id;
    const updatedPost = data;

    axiosSecure.patch(`/update/tution/${id}`, updatedPost).then((res) => {
      if (res.data?.modifiedCount) {
        modalRef.current.close();
        refetch();
        Swal.fire({
          title: "Tution Info Updated.",
          icon: "success",
          confirmButtonColor: "#188bfe",
        });
      }
    });
  };

  // ----- Delete Tution Post --------
  const handleDeleteTution = (deleteId) => {
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
        axiosSecure.delete(`delete/${deleteId}`).then((res) => {
          if (res.data.deletedCount) {
            refetch();
            Swal.fire({
              title: "Deleted!",
              text: "Your tution post has been deleted.",
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
          <h2 className="text-2xl md:text-3xl font-bold">My Tuitions</h2>
          <p className="text-sm text-gray-500 mt-1">
            Manage all the tuitions you have posted
          </p>
        </div>

        {/* -----------  Card Container --------- */}
        <div className="bg-secondary rounded-2xl shadow-md p-4 sm:p-6 space-y-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {isLoading ? (
            <div className="flex justify-center min-h-50 items-center">
              <span className="loading loading-spinner text-primary loading-xl"></span>
            </div>
          ) : (
            myTutions.map((tution) => (
              // ------- Card -------
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
                  <Link to={`/tution-details/${tution?._id}`}>
                    <button className="btn btn-primary btn-sm hover:brightness-110 hover:shadow-lg active:scale-95 transition-all duration-200">
                      View
                    </button>
                  </Link>

                  <button
                    onClick={() => handleEditTution(tution)}
                    className="btn btn-secondary text-black btn-sm hover:brightness-110 hover:shadow-lg active:scale-95 transition-all duration-200"
                  >
                    Edit
                  </button>

                  <button
                    onClick={() => handleDeleteTution(tution?._id)}
                    className="btn btn-sm hover:brightness-110 hover:shadow-lg active:scale-95 transition-all duration-200 text-error bg-transparent"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))
          )}

          {/* ------- Update Tution Modal ---------- */}
          <dialog ref={modalRef} className="modal modal-bottom sm:modal-middle">
            <div className="modal-box">
              <div className=" rounded-xl p-6 shadow-sm max-w-md mx-auto bg-secondary">
                <h2 className="text-xl md:text-2xl font-bold mb-4 text-center">
                  ✏️ Update Tuition Post
                </h2>

                <form
                  // eslint-disable-next-line react-hooks/refs
                  onSubmit={handleSubmit(handleSaveChanges)}
                  className="space-y-4"
                >
                  {/* Subject */}
                  <div>
                    <label className="block text-gray-500 text-xs mb-1">
                      Subject
                    </label>
                    <input
                      type="text"
                      name="subject"
                      defaultValue={tutionInfo?.subject}
                      className="input input-bordered w-full rounded-lg"
                      {...register("subject")}
                    />
                  </div>

                  {/* Class */}
                  <div>
                    <label className="block text-gray-500 text-xs mb-1">
                      Class
                    </label>
                    <input
                      type="text"
                      name="class"
                      defaultValue={tutionInfo?.class}
                      className="input input-bordered w-full rounded-lg"
                      {...register("class")}
                    />
                  </div>

                  {/* Location */}
                  <div>
                    <label className="block text-gray-500 text-xs mb-1">
                      Location
                    </label>
                    <input
                      type="text"
                      name="location"
                      defaultValue={tutionInfo?.location}
                      className="input input-bordered w-full rounded-lg"
                      {...register("location")}
                    />
                  </div>

                  {/* Budget */}
                  <div>
                    <label className="block text-gray-500 text-xs mb-1">
                      Budget
                    </label>
                    <input
                      type="number"
                      name="budget"
                      defaultValue={tutionInfo?.budget}
                      className="input input-bordered w-full rounded-lg"
                      {...register("budget")}
                    />
                  </div>

                  {/* Description */}
                  <div>
                    <label className="block text-gray-500 text-xs mb-1">
                      Description
                    </label>
                    <textarea
                      name="description"
                      defaultValue="Looking for a tutor for weekly classes."
                      className="textarea textarea-bordered w-full rounded-lg"
                      rows={3}
                      {...register("description")}
                    />
                  </div>

                  {/* Save Button */}
                  <button className="w-full btn btn-primary hover:brightness-110 hover:shadow-lg active:scale-95 transition-all duration-200">
                    Save Changes
                  </button>
                </form>

                {/* ---------  Cancel Btn ------- */}
                <button
                  onClick={() => modalRef.current.close()}
                  className="mt-4 w-full btn text-error hover:brightness-110 hover:shadow-lg active:scale-95 transition-all duration-200"
                >
                  Cancel
                </button>
              </div>
            </div>
          </dialog>
        </div>

        {/* Header 2 */}
        <div className="text-center mb-6 mt-6">
          <h2 className="text-2xl md:text-3xl font-bold">On Gong Tutions</h2>
          <p className="text-sm text-gray-500 mt-1">
            Manage all the on going tutions
          </p>
        </div>

        <div className="overflow-x-auto">
          <table className="table">
            {/* head */}
            <thead className="bg-secondary ">
              <tr>
                <th>Subject</th>
                <th>Tutor Name</th>
                <th>Tutor Experience</th>
                <th>Tution Budget</th>
              </tr>
            </thead>
            <tbody>
              {onGoingLoading ? (
                <tr className="w-full">
                  <td className="">
                    <div className="flex justify-center min-h-50 items-center w-full">
                      <span className="loading loading-spinner text-primary loading-xl"></span>
                    </div>
                  </td>
                </tr>
              ) : (
                onGoingTutions.map((t) => (
                  <tr key={t?._id} className="hover:bg-base-200">
                    {/* Profile Picture & Name */}
                    <td>{t?.tuitonPostSubject}</td>

                    {/* Qualifications */}
                    <td>
                      <div className="text-sm opacity-90">{t?.tutorName}</div>
                    </td>

                    {/* Experience */}
                    <td>{t?.experience} Years</td>

                    {/* Expected Salary */}
                    <td className="font-semibold">{t?.expectedSalary} BDT</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default MyTutions;
