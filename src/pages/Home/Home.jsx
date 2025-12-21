import { Link } from "react-router";
import heroPng from "../../assets/Kids Studying from Home-bro.png";
import Button from "../../components/Button/Button";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { formatDistanceToNow } from "date-fns";

const Home = () => {
  const tutors = [1, 2, 3, 4, 5, 6];
  const axiosSecure = useAxiosSecure();

  const timeDistance = (time) => {
    const postedAt = formatDistanceToNow(new Date(time), { addSuffix: true });

    return postedAt;
  };

  const { data: tutions = [], isLoading } = useQuery({
    queryKey: ["tutions"],
    queryFn: async () => {
      const res = await axiosSecure.get(`/all-tutions?status=`);
      return res.data;
    },
  });

  return (
    <div>
      {/* ------ Hero Section ------ */}
      <section className="grid md:grid-cols-2 gap-10 items-center">
        {/* Text */}
        <div className="text-center md:text-left">
          <h1 className="text-3xl md:text-4xl font-semibold">
            Manage Tuition <br />
            Activities Online
          </h1>

          <p className="mt-4 text-sm text-gray-500 max-w-xs">
            A simple platform to manage tuition activities. Tution Post, Apply
            Tution, Online Payment.
          </p>

          <div className="mt-6 flex flex-col md:flex-row gap-4">
            <Link>
              <Button className="btn-primary w-full md:w-auto">
                Get Started
              </Button>
            </Link>

            <Link>
              <Button className="bg-[#5289ff27] w-full md:w-auto">
                Learn More
              </Button>
            </Link>
          </div>
        </div>

        {/* Image */}
        <div className="flex justify-center">
          <img src={heroPng} className="w-full max-w-xs md:max-w-md" />
        </div>
      </section>

      {/* ------ Latest Tutions ------ */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-bold text-center md:text-left">
            Latest Tuition Posts
          </h2>

          <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {isLoading ? (
              <div className="flex justify-center min-h-50 items-center">
                <span className="loading loading-infinity text-primary loading-xl"></span>
              </div>
            ) : (
              tutions.map((tution) => (
                // ----- Tutor Card --------
                <div
                  key={tution._id}
                  className="card bg-base-100 shadow-sm hover:shadow-md transition"
                >
                  <div className="card-body">
                    <h3 className="font-semibold text-lg">
                      {tution?.subject} Tutor Needed
                    </h3>

                    <p className="text-sm text-gray-500">
                      Class {tution?.class}
                    </p>

                    <p className="mt-2 font-medium">
                      Budget: {tution?.budget} BDT
                    </p>

                    <p className="mt-2 font-medium">
                      {timeDistance(tution?.createdAt)}
                    </p>

                    <Link className="mt-4 text-primary font-medium">
                      View Details →
                    </Link>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </section>

      {/* ------ Latest Tutors ------ */}
      <section className="py-12 bg-base-200/40">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-bold text-center md:text-left">
            Latest Tutors
          </h2>

          <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {tutors.map((tutor) => (
              // ----- Tutor Card --------
              <div
                key={tutor}
                className="card bg-base-100 shadow-sm text-center"
              >
                <div className="card-body items-center">
                  <img
                    className="w-16 h-16 rounded-full object-cover border-primary border-2"
                    src="https://media.licdn.com/dms/image/v2/D5622AQG4_HnKT3rPQA/feedshare-shrink_2048_1536/feedshare-shrink_2048_1536/0/1694365088038?e=2147483647&v=beta&t=5SkECKf5obX3_R16Wp9iNVxCDl8bQJ7Kr3kR-WXdeEQ"
                  />

                  <h3 className="font-semibold mt-2">John Doe</h3>

                  <p className="text-sm text-gray-500">
                    Math · 5 Years Experience
                  </p>

                  <Link className="mt-4 btn btn-outline btn-sm">
                    View Profile →
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ------ How System Works ------ */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-2xl md:text-3xl font-bold">
            How the System Works
          </h2>

          <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              "Post Tuition",
              "Tutors Apply",
              "Admin Reviews",
              "Start Learning",
            ].map((step, idx) => (
              <div key={idx} className="flex flex-col items-center gap-4">
                <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center">
                  <span className="text-primary font-bold text-lg">
                    {idx + 1}
                  </span>
                </div>

                <h3 className="font-semibold">{step}</h3>

                <p className="text-sm text-gray-500">
                  Short explanation goes here.
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ------ Why Choose Us ------ */}
      <section className="py-12 bg-base-200/40">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-bold text-center">
            Why Choose Us
          </h2>

          <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="card bg-base-100 shadow-sm">
              <div className="card-body">
                <h3 className="font-semibold">Verified Tutors</h3>
                <p className="text-sm text-gray-500">
                  All tutors are verified by admin.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
