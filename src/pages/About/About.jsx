import { Link } from "react-router";

const About = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 py-10">
      {/* Hero Section */}
      <section className="text-center max-w-3xl mx-auto">
        <h1 className="text-4xl font-bold">
          About <span className="text-primary">E-TutionBD</span>
        </h1>
        <p className="mt-4 text-gray-600">
          E-TutionBD is a modern learning platform that connects students with
          verified and experienced tutors to ensure quality education in a
          simple and effective way.
        </p>
      </section>

      {/* Mission & Vision */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-12">
        <div className="bg-base-100 shadow rounded-xl p-6">
          <h2 className="text-2xl font-semibold mb-2">🎯 Our Mission</h2>
          <p className="text-gray-600">
            Our mission is to make education accessible, personalized, and
            affordable for everyone by connecting learners with skilled tutors
            across different subjects.
          </p>
        </div>

        <div className="bg-base-100 shadow rounded-xl p-6">
          <h2 className="text-2xl font-semibold mb-2">🚀 Our Vision</h2>
          <p className="text-gray-600">
            We envision a future where every student can find the right mentor,
            learn at their own pace, and achieve their academic goals with
            confidence.
          </p>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="mt-12 bg-secondary rounded-xl p-8">
        <h2 className="text-3xl font-semibold text-center mb-6">
          Why Choose EduTutor?
        </h2>

        <ul
          className="max-w-3xl mx-auto space-y-3 text-gray-700 flex flex-col justify-center items-center
        "
        >
          <li className="">✔ Easy tutor discovery</li>
          <li className="">✔ Transparent tutor profiles</li>
          <li className="">✔ Affordable pricing</li>
          <li className="">✔ Supportive learning environment</li>
        </ul>
      </section>

      {/* Call to Action */}
      <section className="mt-16 text-center">
        <h2 className="text-3xl font-bold">
          Start Your Learning Journey Today
        </h2>
        <p className="text-gray-600 mt-2">
          Join E-TutionBD and connect with expert tutors today.
        </p>

        <Link to="/">
          <button className="btn btn-primary mt-6">Get Started</button>
        </Link>
      </section>
    </div>
  );
};

export default About;
