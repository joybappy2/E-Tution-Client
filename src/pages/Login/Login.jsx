import React from "react";
import Button from "../../components/Button/Button";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import useAuth from "../../hooks/useAuth";
import { Link, useNavigate } from "react-router";

const Login = () => {
  const { loginWithGoogle, loginUser } = useAuth();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const handleLogin = async (data) => {
    const res = await loginUser(data?.email, data?.password);
    navigate("/");
    Swal.fire({
      title: `Welcome ${res?.user?.displayName}`,
      icon: "success",
      confirmButtonColor: "#188bfe",
    });
  };

  const handleGoogleLogin = async () => {
    const res = await loginWithGoogle();
    navigate("/");
    Swal.fire({
      title: `Welcome ${res?.user?.displayName}`,
      icon: "success",
      confirmButtonColor: "#188bfe",
    });
  };

  return (
    <div className="flex justify-center items-center min-h-[calc(100vh-100px)] px-4 bg-gray-50">
      <div className="w-full max-w-md bg-base-100 rounded-2xl shadow-lg p-8 md:p-10">
        {/* ----- LOGIN FORM ----- */}
        <form onSubmit={handleSubmit(handleLogin)}>
          <div className="text-center mb-8">
            <h2 className="text-2xl font-semibold text-gray-900">
              Welcome Back
            </h2>
            <p className="text-sm text-gray-500 mt-1">
              Login to continue managing your tuition activities
            </p>
          </div>

          <div className="space-y-4">
            {/* Email */}
            <div>
              <label className="label text-sm font-medium">Email</label>
              <input
                type="email"
                className="input input-bordered w-full"
                placeholder="Enter your email"
                {...register("email", { required: true })}
              />

              {errors.email?.type === "required" && (
                <p className="text-error text-xs mt-1">Email is required.</p>
              )}
            </div>

            {/* Password */}
            <div>
              <label className="label text-sm font-medium">Password</label>
              <input
                type="password"
                className="input input-bordered w-full"
                placeholder="Enter your password"
                {...register("password", { minLength: 6, required: true })}
              />
              {errors.password?.type === "minLength" && (
                <p className="text-error text-xs mt-1">
                  Password can't be less than 6 characters.
                </p>
              )}
              {errors.password?.type === "required" && (
                <p className="text-error text-xs mt-1">Password is required.</p>
              )}
            </div>

            {/* Forgot password */}
            <div className="text-right">
              <a className="text-sm text-[#188bfe] hover:underline cursor-pointer">
                Forgot password?
              </a>
            </div>

            {/* Login Button */}
            <button className="w-full">
              <Button className="btn-primary w-full h-11">Login</Button>
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
          Don't have an account?{" "}
          <Link
            to="/register"
            className="text-[#188bfe] font-medium hover:underline"
          >
            Register
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
