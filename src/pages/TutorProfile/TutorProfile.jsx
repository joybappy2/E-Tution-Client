import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { FaCheckCircle } from "react-icons/fa";

const TutorProfile = () => {
  const { id } = useParams();
  const axiosSecure = useAxiosSecure();

  const { data: tutor = {} } = useQuery({
    queryKey: ["tutor"],
    queryFn: async () => {
      const res = await axiosSecure.get(`/tutor/profile/${id}`);
      return res.data;
    },
  });

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      {/* Header */}
      <div className="bg-base-100 rounded-xl shadow p-6 flex flex-col md:flex-row gap-6">
        <img
          src={tutor.photoURL}
          alt={tutor.name}
          className="w-32 h-32 rounded-full object-cover border"
        />

        <div className="flex-1">
          <h1 className="text-3xl font-bold">{tutor.name}</h1>

          <p className="text-gray-500 capitalize mt-1">
            {tutor.role} • Joined {tutor.createdAt}
          </p>

          <span className=" justify-center items-center w-fit gap-1 mt-2 px-3 py-1 text-sm rounded-full bg-secondary text-primary flex">
            <span>
              <FaCheckCircle></FaCheckCircle>
            </span>{" "}
            <span>{tutor.verificationStatus}</span>
          </span>

          <div className="mt-4 flex gap-3">
            <button className="btn btn-primary btn-sm">Contact Tutor</button>
            <button className="btn btn-outline btn-sm">Report</button>
          </div>
        </div>
      </div>

      {/* Content Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
        {/* Left column */}
        <div className="md:col-span-2 space-y-6">
          {/* About */}
          <div className="bg-base-100 rounded-xl shadow p-6">
            <h2 className="text-xl font-semibold mb-2">About Tutor</h2>
            <p className="text-gray-600">
              I am a passionate educator with over 10 years of experience
              teaching programming, web development, and problem-solving. My
              goal is to make learning simple, practical, and enjoyable for
              every student.
            </p>
          </div>

          {/* Subjects */}
          <div className="bg-base-100 rounded-xl shadow p-6">
            <h2 className="text-xl font-semibold mb-4">Subjects & Expertise</h2>

            <div className="flex flex-wrap gap-2">
              <span className="badge badge-primary">JavaScript</span>
              <span className="badge badge-primary">React</span>
              <span className="badge badge-primary">Node.js</span>
              <span className="badge badge-primary">MongoDB</span>
              <span className="badge badge-primary">Web Development</span>
            </div>
          </div>

          {/* Teaching Style */}
          <div className="bg-base-100 rounded-xl shadow p-6">
            <h2 className="text-xl font-semibold mb-2">Teaching Style</h2>
            <ul className="list-disc list-inside text-gray-600 space-y-1">
              <li>Project-based learning</li>
              <li>Beginner friendly explanations</li>
              <li>Real-world examples</li>
              <li>Regular assignments & feedback</li>
            </ul>
          </div>
        </div>

        {/* Right column */}
        <div className="space-y-6">
          {/* Contact Info */}
          <div className="bg-base-100 rounded-xl shadow p-6">
            <h2 className="text-xl font-semibold mb-3">Contact Information</h2>

            <p className="text-sm text-gray-600">
              <strong>Email:</strong> {tutor.email}
            </p>
            <p className="text-sm text-gray-600 mt-1">
              <strong>Phone:</strong> {tutor.phone}
            </p>
          </div>

          {/* Stats */}
          <div className="bg-base-100 rounded-xl shadow p-6">
            <h2 className="text-xl font-semibold mb-4">Tutor Stats</h2>

            <div className="space-y-3">
              <div className="flex justify-between">
                <span>Total Students</span>
                <span className="font-semibold">1,250+</span>
              </div>
              <div className="flex justify-between">
                <span>Total Courses</span>
                <span className="font-semibold">15</span>
              </div>
              <div className="flex justify-between">
                <span>Rating</span>
                <span className="font-semibold">⭐ 4.9</span>
              </div>
            </div>
          </div>

          {/* Availability */}
          <div className="bg-base-100 rounded-xl shadow p-6">
            <h2 className="text-xl font-semibold mb-2">Availability</h2>
            <p className="text-gray-600 text-sm">
              Sunday – Thursday
              <br />
              6:00 PM – 10:00 PM
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TutorProfile;
