import { Link } from "react-router";
import heroPng from "../../assets/Kids Studying from Home-bro.png";
import Button from "../../components/Button/Button";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { formatDistanceToNow } from "date-fns";
import {
  FaChevronRight,
  FaUserCheck,
  FaSearch,
  FaShieldAlt,
  FaCheckCircle,
} from "react-icons/fa";

const Home = () => {
  const axiosSecure = useAxiosSecure();

  const timeDistance = (time) => {
    return formatDistanceToNow(new Date(time), { addSuffix: true });
  };

  const { data: tutions = [], isLoading } = useQuery({
    queryKey: ["tutions"],
    queryFn: async () => {
      const res = await axiosSecure.get(`/all-tutions?status=approved`);
      return res.data;
    },
  });

  const { data: tutors = [], isLoading: tutorsLoading } = useQuery({
    queryKey: ["tutors"],
    queryFn: async () => {
      const res = await axiosSecure.get(`/all-tutors`);
      return res.data;
    },
  });

  return (
    <div className="bg-gray-50 font-inter min-h-screen">
      {/* ------ Hero Section ------ */}
      <section className="max-w-7xl mx-auto px-4 grid md:grid-cols-2 gap-10 items-center md:pb-24 md:pt-16">
        <div className="text-center md:text-left">
          <h1 className="text-3xl md:text-5xl font-bold text-gray-900 leading-tight">
            Manage Tuition <br />
            <span className="text-[#188bfe]">Activities Online</span>
          </h1>

          <p className="mt-4 text-gray-500 text-sm md:text-base max-w-sm md:md-0 leading-relaxed">
            A simple platform to manage tuition activities. Tution Post, Apply
            Tution, Online Payment.
          </p>

          <div className="mt-8 flex flex-col md:flex-row gap-4 justify-center md:justify-start">
            <Link to="/register">
              <Button className="btn-primary px-8 w-full">Get Started</Button>
            </Link>

            <Link to="/about">
              <Button className="bg-[#5289ff27] text-[#188bfe] border-none px-8 hover:bg-[#188bfe15] transition-colors w-full">
                Learn More
              </Button>
            </Link>
          </div>
        </div>

        <div className="flex justify-center">
          <img
            src={heroPng}
            className="w-full max-w-sm md:max-w-md"
            alt="Students studying"
          />
        </div>
      </section>

      {/* ------ Latest Tutions ------ */}
      <section className="py-16 max-w-7xl mx-auto px-4">
        <div className="flex justify-between items-end mb-8">
          <div>
            <h2 className="text-2xl font-semibold text-gray-900">
              Latest Tuition Posts
            </h2>
            <div className="h-1 w-12 bg-[#188bfe] mt-2 rounded-full"></div>
          </div>
          <Link
            to="/tutions"
            className="text-[#188bfe] text-sm font-medium hover:underline"
          >
            View All
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {isLoading ? (
            <div className="col-span-full flex justify-center py-12">
              <span className="loading loading-spinner text-primary loading-lg"></span>
            </div>
          ) : (
            tutions.slice(0, 6).map((tution) => (
              <div
                key={tution._id}
                className="card bg-base-100 shadow-sm hover:shadow-md transition hover:scale-[1.02]"
              >
                <div className="card-body p-6">
                  <h3 className="font-semibold text-lg text-gray-900">
                    {tution?.subject} Tutor Needed
                  </h3>
                  <p className="text-sm text-gray-500">Class {tution?.class}</p>

                  <div className="mt-4 pt-4 border-t border-gray-50 flex justify-between items-center">
                    <div>
                      <p className="text-xs text-gray-400">Monthly Budget</p>
                      <p className="font-semibold text-[#188bfe]">
                        {tution?.budget} BDT
                      </p>
                    </div>
                    <p className="text-[10px] uppercase tracking-wider text-gray-400 font-medium bg-gray-50 px-2 py-1 rounded">
                      {timeDistance(tution?.createdAt)}
                    </p>
                  </div>

                  {/* Fix: Only one link wrapping the CTA or the card, not nested links */}
                  <Link
                    to={`/tution-details/${tution?._id}`}
                    className="mt-4 text-[#188bfe] text-sm font-medium flex items-center gap-1 group w-fit"
                  >
                    View Details
                    <FaChevronRight className="text-[10px] group-hover:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </div>
            ))
          )}
        </div>
      </section>

      {/* ------ Latest Tutors ------ */}
      <section className="py-16 max-w-7xl mx-auto px-4">
        <div className="flex justify-between items-end mb-8">
          <div>
            <h2 className="text-2xl font-semibold text-gray-900">
              Latest Tutors
            </h2>
            <div className="h-1 w-12 bg-primary mt-2 rounded-full"></div>
          </div>
          <Link
            to="/tutors"
            className="text-[#188bfe] text-sm font-medium hover:underline"
          >
            View All
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {tutorsLoading ? (
            <div className="col-span-full flex justify-center py-12">
              <span className="loading loading-spinner text-primary loading-lg"></span>
            </div>
          ) : (
            tutors.slice(0, 6).map((tutor) => (
              <div
                key={tutor._id || tutor.email} // Use a unique ID string here
                className="card bg-base-100 shadow-sm hover:shadow-md transition hover:scale-[1.02] items-center text-center p-8 py-10"
              >
                <div className="relative">
                  <img
                    className="w-20 h-20 rounded-full object-cover border-2 border-[#188bfe] p-1 mx-auto"
                    src={tutor?.photoURL || "example.jpg"}
                    alt="tutor profile"
                  />
                </div>

                <h3 className="font-semibold text-gray-900 mt-4 text-lg flex items-center gap-1">
                  <span> {tutor?.name || "Anonymous Tutor"}</span>{" "}
                  <span>
                    {tutor?.verificationStatus === "verified" && (
                      <FaCheckCircle color="#188bfe"></FaCheckCircle>
                    )}
                  </span>
                </h3>
                <p className="text-sm text-gray-500 font-medium flex items-center gap-1">
                  {tutor?.email}
                </p>

                <Link
                  to={`/tutor/${tutor?._id}`}
                  className="mt-6 text-[#188bfe] text-sm font-semibold py-2 px-6 border border-[#188bfe] rounded-lg hover:bg-[#188bfe] hover:text-white transition-all"
                >
                  View Profile
                </Link>
              </div>
            ))
          )}
        </div>
      </section>

      {/* ------ How System Works ------ */}
      <section className="py-20 max-w-7xl mx-auto px-4 border-t border-gray-100">
        <div className="text-center mb-16">
          <h2 className="text-2xl md:text-3xl font-semibold text-gray-900">
            How the System Works
          </h2>
          <p className="text-gray-500 text-sm mt-2">
            Follow these simple steps to get started.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Step 1 */}
          <div className="flex flex-col items-center text-center">
            <div className="w-12 h-12 rounded-full bg-[#188bfe10] text-[#188bfe] flex items-center justify-center text-xl font-bold mb-4">
              1
            </div>
            <h3 className="font-semibold text-gray-900">Post Tuition</h3>
            <p className="text-sm text-gray-500 mt-2 leading-relaxed">
              Students post their requirements like subject, class, and budget.
            </p>
          </div>

          {/* Step 2 */}
          <div className="flex flex-col items-center text-center">
            <div className="w-12 h-12 rounded-full bg-[#188bfe10] text-[#188bfe] flex items-center justify-center text-xl font-bold mb-4">
              2
            </div>
            <h3 className="font-semibold text-gray-900">Tutors Apply</h3>
            <p className="text-sm text-gray-500 mt-2 leading-relaxed">
              Verified tutors browse the posts and apply for the ones they like.
            </p>
          </div>

          {/* Step 3 */}
          <div className="flex flex-col items-center text-center">
            <div className="w-12 h-12 rounded-full bg-[#188bfe10] text-[#188bfe] flex items-center justify-center text-xl font-bold mb-4">
              3
            </div>
            <h3 className="font-semibold text-gray-900">Pay Amount</h3>
            <p className="text-sm text-gray-500 mt-2 leading-relaxed">
              Pay the expected amount of tutors online. Super fast and easy.
            </p>
          </div>

          {/* Step 4 */}
          <div className="flex flex-col items-center text-center">
            <div className="w-12 h-12 rounded-full bg-[#188bfe10] text-[#188bfe] flex items-center justify-center text-xl font-bold mb-4">
              4
            </div>
            <h3 className="font-semibold text-gray-900">Start Learning</h3>
            <p className="text-sm text-gray-500 mt-2 leading-relaxed">
              Connect with your tutor and begin your educational journey.
            </p>
          </div>
        </div>
      </section>

      {/* ------ Why Choose Us ------ */}
      <section className="py-20 max-w-7xl mx-auto px-4 border-t border-gray-100">
        <div className="text-center mb-16">
          <h2 className="text-2xl md:text-3xl font-semibold text-gray-900">
            Why Choose Us
          </h2>
          <p className="text-gray-500 text-sm mt-2">
            The most trusted platform for education in Bangladesh.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          <div className="flex flex-col items-center text-center">
            <div className="w-12 h-12 rounded-xl bg-[#188bfe10] text-[#188bfe] flex items-center justify-center text-xl mb-4">
              <FaUserCheck />
            </div>
            <h3 className="font-semibold text-gray-900">Verified Profiles</h3>
            <p className="text-sm text-gray-500 mt-2 leading-relaxed">
              Every tutor is manually verified by our admin team to ensure
              quality.
            </p>
          </div>

          <div className="flex flex-col items-center text-center">
            <div className="w-12 h-12 rounded-xl bg-[#188bfe10] text-[#188bfe] flex items-center justify-center text-xl mb-4">
              <FaSearch />
            </div>
            <h3 className="font-semibold text-gray-900">Easy Discovery</h3>
            <p className="text-sm text-gray-500 mt-2 leading-relaxed">
              Find tuitions or tutors quickly using our advanced search and
              filters.
            </p>
          </div>

          <div className="flex flex-col items-center text-center">
            <div className="w-12 h-12 rounded-xl bg-[#188bfe10] text-[#188bfe] flex items-center justify-center text-xl mb-4">
              <FaShieldAlt />
            </div>
            <h3 className="font-semibold text-gray-900">Secure & Safe</h3>
            <p className="text-sm text-gray-500 mt-2 leading-relaxed">
              We prioritize the safety of both students and tutors on our
              platform.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
