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
    const name = data.name;
    const email = data.email;
    const password = data.password;
    const role = data.role;
    const phone = data.phone;
    const photoURL = data.photoURL;

    registerUser(email, password).then((res) => {
      console.log(res.user.uid);
      navigate("/");
      updaUserInfo(name, photoURL).then(() => {
        const newUser = {
          name: name,
          email: email,
          role: role,
          phone: phone,
          photoURL: photoURL,
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
        console.log(res.user.uid, "form register");
        const newUser = {
          name: res.user?.displayName,
          email: res.user?.email,
          role: "student",
          phone: "google signed",
          photoURL: res.user?.photoURL,
          uid: res.user.uid,
        };
        axiosSecure
          .post("/users", newUser)
          .then((res) => {
            if (res.data.insertedId) {
              alert("User Saved to MongoDB");
            } else {
              console.log(res.data);
            }
          })
          .catch((err) => {
            alert(err.code);
          });

        navigate("/");
        console.log("Login Successful");
      })
      .catch((err) => {
        console.log(err.code);
      });
  };

  return (
    <div className="flex justify-center items-center min-h-[calc(100vh-100px)]">
      <div className="p-10 bg-base-100 rounded-xl w-sm shadow-xl">
        {/* -----REGISTER FORM-------- */}
        <form onSubmit={handleSubmit(handleRegister)} className=" ">
          <h2 className="text-xl md:text-2xl font-semibold text-center">
            Register
          </h2>

          <fieldset className="fieldset">
            {/* name */}
            <label className="label">Name</label>
            <input
              type="text"
              className="input w-full"
              placeholder="Name"
              {...register("name")}
            />

            {/* email */}
            <label className="label">Email</label>
            <input
              type="email"
              className="input w-full"
              placeholder="Email"
              {...register("email")}
            />

            {/* role */}
            <label className="label">Role</label>
            <select
              className="select"
              {...register("role", { required: true })}
            >
              <option value="">Select a Role</option>
              <option value="student">Student</option>
              <option value="tutor">Tutor</option>
            </select>
            {errors.role?.type === "required" && (
              <p className="text-error">Plaease select a role</p>
            )}

            {/* phone */}
            <label className="label">Phone</label>
            <input
              type="text"
              className="input w-full"
              placeholder="Phone"
              {...register("phone")}
            />

            {/* photoURL */}
            <label className="label">Photo URL</label>
            <input
              type="text"
              className="input w-full"
              placeholder="Photo Url"
              {...register("photoURL")}
            />

            {/* password */}
            <label className="label">Password</label>
            <input
              type="password"
              className="input w-full"
              placeholder="Password"
              {...register("password", { minLength: 6, required: true })}
            />
            {errors.password?.type === "minLength" && (
              <p className="text-error">
                Password can't be less than 6 characters.
              </p>
            )}
            {errors.password?.type === "required" && (
              <p className="text-error">Password is required.</p>
            )}

            <div>
              <a className="link link-hover">Forgot password?</a>
            </div>
            <Button className="btn-primary">
              {loadingUser ? (
                <span className="loading loading-infinity loading-xl"></span>
              ) : (
                <span>Register</span>
              )}
            </Button>
          </fieldset>
        </form>

        {/* -------DIVIDER------ */}
        <div className="flex w-full flex-col">
          <div className="divider">OR</div>
        </div>

        {/* -------Google------ */}
        <div onClick={handleGoogleLogin}>
          <Button className=" bg-[#5289ff27] w-full">
            <span>
              <svg
                aria-label="Google logo"
                width="16"
                height="16"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 512 512"
              >
                <g>
                  <path d="m0 0H512V512H0" fill="#fff"></path>
                  <path
                    fill="#34a853"
                    d="M153 292c30 82 118 95 171 60h62v48A192 192 0 0190 341"
                  ></path>
                  <path
                    fill="#4285f4"
                    d="m386 400a140 175 0 0053-179H260v74h102q-7 37-38 57"
                  ></path>
                  <path
                    fill="#fbbc02"
                    d="m90 341a208 200 0 010-171l63 49q-12 37 0 73"
                  ></path>
                  <path
                    fill="#ea4335"
                    d="m153 219c22-69 116-109 179-50l55-54c-78-75-230-72-297 55"
                  ></path>
                </g>
              </svg>
            </span>
            Login With Google
          </Button>
        </div>

        <div className="text-sm mt-4 text-center">
          Already have an account?{" "}
          <Link to="/login">
            <span className="text-primary hover:text-blue-700">Login</span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Register;
