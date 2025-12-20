import React, { useRef, useState } from "react";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";

const UserManagement = () => {
  const axiosSecure = useAxiosSecure();
  const modalRef = useRef(null);
  const userUpdateModalRef = useRef(null);
  const { register, handleSubmit, reset } = useForm();
  const [userInfo, setUserInfo] = useState("");

  //   ----- loading user --------
  const {
    data: users = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const res = await axiosSecure.get("/users");
      return res?.data;
    },
  });

  //   ----- open modal onclik edit --------
  const handleEdit = (clickedUser) => {
    setUserInfo(clickedUser);

    reset({
      name: clickedUser?.name || "",
      photoURL: clickedUser?.photoURL || "",
      phone: clickedUser?.phone || "",
    });
    userUpdateModalRef.current.showModal();
  };

  //  ------- handle update user info -------
  const handleUpdateUserInfo = (data) => {
    const id = userInfo?._id;
    const name = data?.name;
    const phone = data?.phone || "";
    const photoURL = data?.photoURL || "";

    const updatedInfo = {
      name,
      phone,
      photoURL,
    };

    axiosSecure.patch(`/users/${id}/update-info`, updatedInfo).then((res) => {
      if (res.data.modifiedCount) {
        userUpdateModalRef.current.close();
        refetch();

        Swal.fire({
          title: "User Info Updated.",
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
          <h2 className="text-2xl md:text-3xl font-bold">User Management</h2>
          <p className="text-sm text-gray-500 mt-1">
            Manage all registered users and their roles
          </p>
        </div>

        {/* Card */}

        <div className="bg-secondary rounded-2xl shadow-md p-4 sm:p-6 space-y-4">
          {/* User Item */}

          {isLoading ? (
            <div className="flex justify-center min-h-50 items-center">
              <span className="loading loading-infinity text-primary loading-xl"></span>
            </div>
          ) : (
            users.map((user) => (
              <div
                key={user?._id}
                className="bg-base-100 rounded-xl p-4 shadow-sm"
              >
                <div className="flex flex-col sm:flex-row sm:items-center gap-4">
                  {/* User Image */}
                  <div className="avatar">
                    <div className="w-14 rounded-full">
                      <img
                        className="w-full h-full object-cover"
                        src={
                          user?.photoURL ||
                          "https://img.freepik.com/free-vector/blue-circle-with-white-user_78370-4707.jpg?semt=ais_hybrid&w=740&q=80"
                        }
                        alt="User"
                      />
                    </div>
                  </div>

                  {/* User Info */}
                  <div className="flex-1 grid grid-cols-1 sm:grid-cols-4 gap-3">
                    <div>
                      <p className="text-xs text-gray-500">Name</p>
                      <p className="font-medium">{user?.name}</p>
                    </div>

                    <div>
                      <p className="text-xs text-gray-500">Email</p>
                      <p className="truncate">{user?.email}</p>
                    </div>

                    <div>
                      <p className="text-xs text-gray-500">Role</p>
                      <p>{user?.role}</p>
                    </div>

                    <div>
                      <p className="text-xs text-gray-500">Account Status</p>
                      <span className="badge badge-success badge-outline">
                        Active
                      </span>
                    </div>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex flex-wrap gap-2 mt-4">
                  <button
                    onClick={() => handleEdit(user)}
                    className="btn btn-sm btn-outline"
                  >
                    Edit Info
                  </button>

                  <button
                    onClick={() => modalRef.current.showModal()}
                    className="btn btn-sm btn-outline"
                  >
                    Change Role
                  </button>

                  <button className="btn btn-sm btn-ghost text-error">
                    Delete Account
                  </button>
                </div>
              </div>
            ))
          )}

          {/* ------ User Update Modal --------- */}
          <dialog
            ref={userUpdateModalRef}
            className="modal modal-bottom sm:modal-middle"
          >
            <div className="modal-box">
              <div className=" rounded-xl p-6 shadow-sm max-w-md mx-auto bg-secondary">
                <h2 className="text-xl md:text-2xl font-bold mb-4 text-center">
                  ✏️ Update User Info
                </h2>

                <form
                  onSubmit={handleSubmit(handleUpdateUserInfo)}
                  className="space-y-4"
                >
                  {/* Name */}
                  <div>
                    <label className="block text-gray-500 text-xs mb-1">
                      Name
                    </label>
                    <input
                      type="text"
                      defaultValue={userInfo?.name}
                      className="input input-bordered w-full rounded-lg"
                      {...register("name")}
                    />
                  </div>

                  {/* Class */}
                  <div>
                    <label className="block text-gray-500 text-xs mb-1">
                      Photo Url
                    </label>
                    <input
                      type="text"
                      defaultValue={userInfo?.photoURL}
                      className="input input-bordered w-full rounded-lg"
                      {...register("photoURL")}
                    />
                  </div>

                  {/* Description */}
                  <div>
                    <label className="block text-gray-500 text-xs mb-1">
                      Phone
                    </label>
                    <textarea
                      defaultValue={userInfo?.phone}
                      className="textarea textarea-bordered w-full rounded-lg"
                      rows={3}
                      {...register("phone")}
                    />
                  </div>

                  {/* Save Button */}
                  <button className="w-full btn btn-primary hover:brightness-110 hover:shadow-lg active:scale-95 transition-all duration-200">
                    Save Changes
                  </button>
                </form>

                {/* ---------  Cancel Btn ------- */}
                <button
                  onClick={() => userUpdateModalRef.current.close()}
                  className="mt-4 w-full btn text-error hover:brightness-110 hover:shadow-lg active:scale-95 transition-all duration-200"
                >
                  Cancel
                </button>
              </div>
            </div>
          </dialog>
        </div>
      </div>

      {/* ------- Change role Modal ------ */}
      <dialog ref={modalRef} className="modal modal-bottom sm:modal-middle">
        <div className="modal-box">
          <div className="flex flex-col gap-5">
            <button className="btn btn-primary">Make Admin</button>
            <button className="btn btn-primary">Make Student</button>
            <button className="btn btn-primary">Make Tutor</button>
          </div>
          <div className="modal-action">
            <form method="dialog">
              {/* if there is a button in form, it will close the modal */}
              <button className="btn">Close</button>
            </form>
          </div>
        </div>
      </dialog>
    </div>
  );
};

export default UserManagement;
