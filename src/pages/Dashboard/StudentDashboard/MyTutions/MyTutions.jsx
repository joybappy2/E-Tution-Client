import { useQuery } from "@tanstack/react-query";
import useAuth from "../../../../hooks/useAuth";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";
import { useRef } from "react";

const MyTutions = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();
  const modalRef = useRef(null);

  const { data: myTutions = [], isLoading } = useQuery({
    queryKey: ["my-tutions", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/my-tutions/${user?.email}`);
      return res.data;
    },
  });

  const handleUpdateTution = (tuition) => {
    modalRef.current.showModal();
    console.log(tuition);
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
              <span className="loading loading-infinity text-primary loading-xl"></span>
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
                  <button className="btn btn-primary btn-sm hover:brightness-110 hover:shadow-lg active:scale-95 transition-all duration-200">
                    View
                  </button>

                  <button
                    onClick={() => handleUpdateTution(tution)}
                    className="btn btn-secondary text-black btn-sm hover:brightness-110 hover:shadow-lg active:scale-95 transition-all duration-200"
                  >
                    Edit
                  </button>

                  <button className="btn btn-sm hover:brightness-110 hover:shadow-lg active:scale-95 transition-all duration-200 text-error bg-transparent">
                    Delete
                  </button>
                </div>

                {/* ------- Update Tution Modal ---------- */}
                <dialog
                  ref={modalRef}
                  className="modal modal-bottom sm:modal-middle"
                >
                  <div className="modal-box">
                    <div className=" rounded-xl p-6 shadow-sm max-w-md mx-auto bg-secondary">
                      <h2 className="text-xl md:text-2xl font-bold mb-4 text-center">
                        ✏️ Update Tuition Post
                      </h2>

                      <form className="space-y-4">
                        {/* Subject */}
                        <div>
                          <label className="block text-gray-500 text-xs mb-1">
                            Subject
                          </label>
                          <input
                            type="text"
                            name="subject"
                            defaultValue={tution?.subject}
                            className="input input-bordered w-full rounded-lg"
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
                            defaultValue={`Class ${tution?.class}`}
                            className="input input-bordered w-full rounded-lg"
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
                            defaultValue={tution?.location}
                            className="input input-bordered w-full rounded-lg"
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
                            defaultValue={tution?.budget}
                            className="input input-bordered w-full rounded-lg"
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

                    <div className="modal-action">
                      <form method="dialog">
                        {/* if there is a button in form, it will close the modal */}
                        {/* <button className="btn">Close</button> */}
                      </form>
                    </div>
                  </div>
                </dialog>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default MyTutions;
