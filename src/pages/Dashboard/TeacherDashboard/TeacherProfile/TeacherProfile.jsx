import { useRef } from "react";
import Button from "../../../../components/Button/Button";
import useAuth from "../../../../hooks/useAuth";
import useRole from "../../../../hooks/useRole";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";

const TeacherProfile = () => {
  const { user, updaUserInfo } = useAuth();
  const role = useRole();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const updaModalRef = useRef(null);

  const handleSaveChanges = async (data) => {
    try {
      await updaUserInfo(data?.displayName, data?.photoURL);
      updaModalRef.current.close();
      Swal.fire({
        text: "User information updated",
        icon: "success",
        confirmButtonColor: "#188bfe",
      });
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div>
        <h2 className="text-2xl font-semibold text-gray-900">
          Profile Settings
        </h2>
        <p className="text-sm text-gray-500 mt-1">
          View and manage your personal information
        </p>
      </div>

      {/* Main Card */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
        {/* Profile Summary */}
        <div
          className="md:col-span-4 bg-base-100 rounded-xl shadow-sm p-6 text-center
        
        card hover:shadow-md "
        >
          <img
            src={user?.photoURL}
            alt="Profile"
            className="w-24 h-24 rounded-full object-cover mx-auto border-2 border-primary p-1"
          />

          <h3 className="mt-4 text-lg font-semibold text-gray-900">
            {user?.displayName.split(" ")[0]}
          </h3>

          <p className="text-sm text-gray-500">{user?.email}</p>

          <h3 className="mt-4 text-sm font-semibold text-gray-900">
            Last SignIn Time
          </h3>
          <div className="mt-3 inline-flex items-center gap-2 text-sm font-medium text-primary bg-secondary px-3 py-1 rounded-full w-fit mx-auto">
            {user?.metadata.lastSignInTime}
          </div>
        </div>

        {/* Profile Details */}
        <div
          className="md:col-span-8 bg-base-100 rounded-xl shadow-sm p-6
        
        card hover:shadow-md "
        >
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Personal Information
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Name */}
            <div>
              <p className="text-xs text-gray-400 uppercase tracking-wide">
                Full Name
              </p>
              <p className="font-medium text-gray-900">{user?.displayName}</p>
            </div>

            {/* Role */}
            <div>
              <p className="text-xs text-gray-400 uppercase tracking-wide">
                Role
              </p>
              <p className="font-medium text-gray-900 capitalize">{role}</p>
            </div>

            {/* Email */}
            <div>
              <p className="text-xs text-gray-400 uppercase tracking-wide">
                Email
              </p>
              <p className="font-medium text-gray-900">{user?.email}</p>
            </div>

            {/* Phone */}
            <div>
              <p className="text-xs text-gray-400 uppercase tracking-wide">
                Phone Number
              </p>
              <p className="font-medium text-gray-900">+01xxxxxxxx</p>
            </div>

            {/* Account Created */}
            <div className="sm:col-span-2">
              <p className="text-xs text-gray-400 uppercase tracking-wide">
                Account Created
              </p>
              <p className="font-medium text-sm text-gray-900">
                {user?.metadata.creationTime}
              </p>
            </div>
          </div>

          {/* Actions */}
          <div
            onClick={() => updaModalRef.current.showModal()}
            className="mt-6 flex justify-end"
          >
            <Button className="btn-primary px-6">Update Profile</Button>
          </div>

          {/* ---- Update Profile Modal ---- */}
          <dialog ref={updaModalRef} className="modal">
            <div className="modal-box bg-base-100 rounded-2xl shadow-lg max-w-md">
              {/* Header */}
              <div className="mb-6">
                <h3 className="text-xl font-semibold text-gray-900">
                  Update Profile
                </h3>
                <p className="text-sm text-gray-500 mt-1">
                  Update your basic information
                </p>
              </div>

              {/* Form */}
              <form
                onSubmit={handleSubmit(handleSaveChanges)}
                className="space-y-4"
              >
                {/* Name */}
                <div>
                  <label className="label">
                    <span className="label-text font-medium">Full Name</span>
                  </label>
                  <input
                    type="text"
                    className="input input-bordered w-full"
                    defaultValue={user?.displayName}
                    placeholder="Enter your full name"
                    {...register("displayName", { required: true })}
                  />
                  {errors?.photoURL?.type === "required" && (
                    <p className="text-error text-xs">Name is required</p>
                  )}
                </div>

                {/* Photo URL */}
                <div>
                  <label className="label">
                    <span className="label-text font-medium">Photo URL</span>
                  </label>
                  <input
                    type="text"
                    className="input input-bordered w-full"
                    defaultValue={user?.photoURL}
                    placeholder="Paste image URL"
                    {...register("photoURL", { required: true })}
                  />
                  {errors?.photoURL?.type === "required" && (
                    <p className="text-error text-xs">Photo url is required</p>
                  )}
                </div>

                {/* Actions */}
                <div className="modal-action flex justify-end gap-3 pt-4">
                  <div onClick={() => updaModalRef.current.close()}>
                    <Button className="bg-secondary">Cancel</Button>
                  </div>

                  <button>
                    <Button className="btn-primary">Save Changes</Button>
                  </button>
                </div>
              </form>
            </div>
          </dialog>
        </div>
      </div>
    </div>
  );
};

export default TeacherProfile;
