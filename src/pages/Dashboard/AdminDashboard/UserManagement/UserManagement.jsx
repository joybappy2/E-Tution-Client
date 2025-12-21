import { useRef, useState } from "react";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";

const UserManagement = () => {
  const axiosSecure = useAxiosSecure();
  const modalRef = useRef(null);
  const userUpdateModalRef = useRef(null);
  const [currentUserRole, setCurrentUserRole] = useState("");
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
    const verificationStatus = data?.verificationStatus;

    const updatedInfo = {
      name,
      phone,
      photoURL,
      verificationStatus,
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

  const handleChangeRole = (userRole) => {
    setCurrentUserRole(userRole);
    modalRef.current.showModal();
  };

  //  ------- handle change user role -------
  const handleMakeRole = (roleToSet) => {
    console.log(roleToSet);
    console.log(currentUserRole);
    axiosSecure
      .patch(`/user/${currentUserRole._id}/role?role=${roleToSet}`)
      .then((res) => {
        modalRef.current.close();

        if (res.data.modifiedCount) {
          refetch();
          Swal.fire({
            title: `${currentUserRole?.name} is now ${roleToSet}`,
            icon: "success",
            confirmButtonColor: "#188bfe",
          });
        }
      });
  };

  //  ------- handle delete user profile -------
  const handleDeleteUser = (uid) => {
    console.log(uid);
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
        axiosSecure.delete(`/delete/user/${uid}`).then((res) => {
          if (res.data.deletedCount) {
            refetch();
            Swal.fire({
              title: "Deleted!",
              text: "User has been deleted successfully.",
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
                    <div className="w-16 h-16 rounded-full">
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

                    <div className="">
                      <p className="text-xs text-gray-500">
                        Verification Status
                      </p>
                      <span
                        className={`badge badge-soft ${
                          user?.verificationStatus === "verified"
                            ? "badge-success"
                            : "badge-warning"
                        }`}
                      >
                        {user?.verificationStatus || "no status"}
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
                    onClick={() => handleChangeRole(user)}
                    className="btn btn-sm btn-outline"
                  >
                    Change Role
                  </button>

                  <button
                    onClick={() => handleDeleteUser(user?.uid)}
                    className="btn btn-sm btn-ghost text-error"
                  >
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
                  // eslint-disable-next-line react-hooks/refs
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

                  <div className={`${userInfo.verificationStatus == 'verified' && 'hidden'}`}>
                    <label className="block text-gray-500 text-xs mb-1">
                      Verification Status
                    </label>

                    <input
                    {...register('verificationStatus')}
                      type="checkbox"
                      className="checkbox checked:bg-primary checked:text-white"
                    />
                    <span className="ml-2">Verified</span>
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
          <div className=" w-full my-5">
            <img
              className="w-20 h-20 object-cover mx-auto"
              src={currentUserRole.photoURL}
              alt=""
            />
          </div>
          {/* if role is student show this */}
          {currentUserRole.role === "student" && (
            <div className="w-full flex justify-center gap-5">
              <button
                onClick={() => handleMakeRole("admin")}
                className="btn btn-primary"
              >
                Make Admin
              </button>

              <button
                onClick={() => handleMakeRole("tutor")}
                className="btn btn-primary"
              >
                Make Tutor
              </button>
            </div>
          )}

          {/* if role is admin show this */}
          {currentUserRole.role === "admin" && (
            <div className="w-full flex justify-center gap-5">
              <button
                onClick={() => handleMakeRole("student")}
                className="btn btn-primary"
              >
                Make Student
              </button>

              <button
                onClick={() => handleMakeRole("tutor")}
                className="btn btn-primary"
              >
                Make Tutor
              </button>
            </div>
          )}

          {/* if role is admin show this */}
          {currentUserRole.role === "tutor" && (
            <div className="w-full flex justify-center gap-5">
              <button
                onClick={() => handleMakeRole("student")}
                className="btn btn-primary"
              >
                Make Student
              </button>

              <button
                onClick={() => handleMakeRole("admin")}
                className="btn btn-primary"
              >
                Make Admin
              </button>
            </div>
          )}

          <div className="modal-action">
            <button
              onClick={() => modalRef.current.close()}
              className="btn btn-error text-white"
            >
              Cancel
            </button>
          </div>
        </div>
      </dialog>
    </div>
  );
};

export default UserManagement;
