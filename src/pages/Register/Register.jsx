import Button from "../../components/Button/Button";
import { useForm } from "react-hook-form";
import useAuth from "../../hooks/useAuth";
import { Link, useNavigate } from "react-router";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import Swal from "sweetalert2";

const Register = () => {
  const { registerUser, loadingUser, loginWithGoogle, updaUserInfo } =
    useAuth();
  const navigate = useNavigate();
  const axiosSecure = useAxiosSecure();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  // -------HANDLE REGISTER WITH EP--------
  const handleRegister = (data) => {
    const { name, email, password, role, phone, photoURL } = data;
    console.log("click");

    registerUser(email, password).then((res) => {
      navigate("/");
      updaUserInfo(name, photoURL).then(() => {
        const newUser = {
          name,
          email,
          role,
          phone,
          photoURL,
          uid: res.user.uid,
        };

        axiosSecure.post("/users", newUser).then((res) => {
          if (res.data?.insertedId) {
            Swal.fire({
              title: `Welcome ${newUser?.name}`,
              icon: "success",
              confirmButtonColor: "#188bfe",
            });
          }
        });
      });
    });
  };

  // -------HANDLE GOOGLE LOGIN--------
  const handleGoogleLogin = () => {
    loginWithGoogle()
      .then((res) => {
        const newUser = {
          name: res.user?.displayName,
          email: res.user?.email,
          role: "student",
          phone: "google signed",
          photoURL: res.user?.photoURL,
          uid: res.user.uid,
        };
        axiosSecure.post("/users", newUser).then(() => {
          navigate("/");
          Swal.fire({
            title: `Welcome ${newUser?.name}`,
            icon: "success",
            confirmButtonColor: "#188bfe",
          });
        });
      })
      .catch((err) => {
        console.log(err.code);
      });
  };

  return (
    <div className="flex justify-center items-center min-h-[calc(100vh-100px)] px-4 bg-gray-50 py-10">
      <div className="w-full max-w-lg bg-base-100 rounded-2xl shadow-lg p-8 md:p-10">
        {/* ----- REGISTER FORM ----- */}
        <form onSubmit={handleSubmit(handleRegister)}>
          <div className="text-center mb-8">
            <h2 className="text-2xl font-semibold text-gray-900">
              Create Account
            </h2>
            <p className="text-sm text-gray-500 mt-1">
              Join us to manage and find the best tuitions
            </p>
          </div>

          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Name */}
              <div>
                <label className="label text-sm font-medium">Name</label>
                <input
                  type="text"
                  className="input input-bordered w-full"
                  placeholder="Your Name"
                  {...register("name", { required: true })}
                />
                {errors.name && (
                  <p className="text-error text-xs mt-1">Name is required</p>
                )}
              </div>

              {/* Email */}
              <div>
                <label className="label text-sm font-medium">Email</label>
                <input
                  type="email"
                  className="input input-bordered w-full"
                  placeholder="Email Address"
                  {...register("email", { required: true })}
                />
                {errors.email && (
                  <p className="text-error text-xs mt-1">Email is required</p>
                )}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Role */}
              <div>
                <label className="label text-sm font-medium">I am a</label>
                <select
                  className="select select-bordered w-full font-normal"
                  {...register("role", { required: true })}
                >
                  <option value="">Select Role</option>
                  <option value="student">Student</option>
                  <option value="tutor">Tutor</option>
                </select>
                {errors.role && (
                  <p className="text-error text-xs mt-1">
                    Please select a role
                  </p>
                )}
              </div>

              {/* Phone */}
              <div>
                <label className="label text-sm font-medium">Phone</label>
                <input
                  type="text"
                  className="input input-bordered w-full"
                  placeholder="Phone Number"
                  {...register("phone", { required: true })}
                />
                {errors.phone && (
                  <p className="text-error text-xs mt-1">Phone is required</p>
                )}
              </div>
            </div>

            {/* Photo URL */}
            <div>
              <label className="label text-sm font-medium">Photo URL</label>
              <input
                type="text"
                className="input input-bordered w-full"
                placeholder="https://example.com/photo.jpg"
                {...register("photoURL")}
              />
            </div>

            {/* Password */}
            <div>
              <label className="label text-sm font-medium">Password</label>
              <input
                type="password"
                className="input input-bordered w-full"
                placeholder="At least 6 characters"
                {...register("password", { minLength: 6, required: true })}
              />
              {errors.password?.type === "minLength" && (
                <p className="text-error text-xs mt-1">
                  Password must be 6+ characters
                </p>
              )}
              {errors.password?.type === "required" && (
                <p className="text-error text-xs mt-1">Password is required</p>
              )}
            </div>

            {/* Register Button */}
            <button className="w-full">
              <Button className="btn-primary w-full h-11 mt-4">
                {loadingUser ? (
                  <span className="loading loading-spinner loading-sm"></span>
                ) : (
                  "Register"
                )}
              </Button>
            </button>
          </div>
        </form>

        {/* Divider */}
        <div className="my-8">
          <div className="divider text-xs text-gray-400">OR</div>
        </div>

        {/* Google Login */}
        <div onClick={handleGoogleLogin}>
          <Button className="w-full h-11 bg-[#5289ff27] text-[#188bfe] hover:bg-[#188bfe15] transition">
            <span className="flex items-center justify-center gap-3">
              <svg
                aria-label="Google logo"
                width="16"
                height="16"
                viewBox="0 0 512 512"
              >
                <path
                  fill="#34a853"
                  d="M153 292c30 82 118 95 171 60h62v48A192 192 0 0190 341"
                />
                <path
                  fill="#4285f4"
                  d="m386 400a140 175 0 0053-179H260v74h102q-7 37-38 57"
                />
                <path
                  fill="#fbbc02"
                  d="m90 341a208 200 0 010-171l63 49q-12 37 0 73"
                />
                <path
                  fill="#ea4335"
                  d="m153 219c22-69 116-109 179-50l55-54c-78-75-230-72-297 55"
                />
              </svg>
              <span className="font-medium">Continue with Google</span>
            </span>
          </Button>
        </div>

        <div className="text-sm mt-6 text-center text-gray-500">
          Already have an account?{" "}
          <Link
            to="/login"
            className="text-[#188bfe] font-medium hover:underline"
          >
            Login
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Register;
