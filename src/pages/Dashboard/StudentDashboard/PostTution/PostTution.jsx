import { useForm } from "react-hook-form";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";
import Swal from "sweetalert2";

const PostTution = () => {
  const axiosSecure = useAxiosSecure();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  //---------- Handle Post Tution -----------
  const handPostTution = (data) => {
    console.table(data);
    const newPost = {
      subject: data.subject,
      class: data.class,
      location: data.location,
      budget: parseInt(data.budget),
    };

    axiosSecure.post("/post-Tution", newPost).then((res) => {
      if (res.data.insertedId) {
        Swal.fire({
          title: "New tution posted. Wait for admin approval.",
          icon: "success",
          confirmButtonColor: '#188bfe'
        });
      }
    });
  };

  return (
    <div className="min-h-screen py-10 px-3 sm:px-6">
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <div className="text-center mb-6">
          <h2 className="text-2xl md:text-3xl font-bold">Post Tuition</h2>
          <p className="text-sm text-gray-500 mt-1">
            Enter basic details to find a tutor
          </p>
        </div>

        {/* Card */}
        <div className="bg-secondary rounded-2xl shadow-md p-4 sm:p-6">
          <form className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Subject */}
            <div className="form-control">
              <label className="label">
                <span className="label-text font-medium">Subject</span>
              </label>
              <input
                type="text"
                placeholder="Math"
                className="input input-bordered w-full"
                required
                {...register("subject", { required: true })}
              />
              {errors.subject?.type === "required" && (
                <p className="text-error text-xs">Subject is required</p>
              )}
            </div>

            {/* Class */}
            <div className="form-control">
              <label className="label">
                <span className="label-text font-medium">Class</span>
              </label>
              <input
                type="text"
                placeholder="Class 10"
                className="input input-bordered w-full"
                required
                {...register("class", { required: true })}
              />
              {errors.class?.type === "required" && (
                <p className="text-error text-xs">Class is required</p>
              )}
            </div>

            {/* Location */}
            <div className="form-control sm:col-span-2">
              <label className="label">
                <span className="label-text font-medium">Location</span>
              </label>
              <input
                type="text"
                placeholder="Dhaka, Mirpur"
                className="input input-bordered w-full"
                required
                {...register("location", { required: true })}
              />
              {errors?.location?.type === "required" && (
                <p className="text-error text-xs">Location is required</p>
              )}
            </div>

            {/* Budget */}
            <div className="form-control sm:col-span-2">
              <label className="label">
                <span className="label-text font-medium">Budget (BDT)</span>
              </label>
              <input
                type="number"
                placeholder="5000"
                className="input input-bordered w-full"
                required
                {...register("budget", { required: true })}
              />
              {errors?.budget?.type === "required" && (
                <p className="text-error text-xs">Budget is required</p>
              )}
            </div>

            {/* Submit */}
            <div className="sm:col-span-2 pt-4">
              <button
                onClick={handleSubmit(handPostTution)}
                type="submit"
                className="btn w-full btn-primary hover:brightness-110 hover:shadow-lg active:scale-95 transition-all duration-200"
              >
                Post Tution
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default PostTution;
