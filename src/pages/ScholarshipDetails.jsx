// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import { useParams, useNavigate } from "react-router";
import useAxiosSecure from "../hooks/useAxiosSecure";
import useAxiosPublic from "../hooks/useAxiosPublic";
import { useQuery } from "@tanstack/react-query";
import Loader from "../components/Loader";
import useAuth from "../hooks/useAuth";

const ScholarshipDetails = () => {
  const { user } = useAuth();
  const { id } = useParams();
  const navigate = useNavigate();
  const axiosPublic = useAxiosPublic();
  const axiosSecure = useAxiosSecure();

  // Use public axios for fetching scholarship details (no auth required)
  const {
    data: scholarship,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["scholarship", id],
    queryFn: async () => {
      const res = await axiosPublic.get(`/scholarships/${id}`);
      return res.data;
    },
  });

  if (isLoading) {
    return <Loader />;
  }

  if (isError || !scholarship) {
    return (
      <div className="min-h-screen bg-base-200 flex items-center justify-center px-4">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-error mb-4">
            Scholarship Not Found
          </h2>
          <button
            onClick={() => navigate("/allScholarships")}
            className="btn btn-primary"
          >
            Back to Scholarships
          </button>
        </div>
      </div>
    );
  }

  const {
    _id,
    city,
    country,
    createdAt,
    degree,
    image,
    scholarshipCategory,
    scholarshipName,
    subjectCategory,
    tuitionFees,
    applicationFee,
    universityName,
    worldRank,
  } = scholarship;

  const handleApplication = async () => {
    // Check if user is logged in
    if (!user) {
      navigate("/login", { state: { from: `/scholarship/${id}` } });
      return;
    }

    const { email, displayName } = user;
    const userInfo = {
      scholarshipId: id,
      userName: displayName,
      userEmail: email,
      scholarshipName: scholarship.scholarshipName,
      universityName: scholarship.universityName,
      city: scholarship.city,
      country: scholarship.country,
      scholarshipCategory: scholarship.scholarshipCategory,
      degree: scholarship.degree,
      applicationFee: scholarship.applicationFee,
    };

    axiosSecure.post("/applications", userInfo).then(() => {
      navigate("/dashboard/myApplications");
    });
  };

  return (
    <div className="min-h-screen bg-base-200 py-8 px-4">
      <div className="container mx-auto max-w-7xl">
        {/* Back Button */}
        <motion.button
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          onClick={() => navigate(-1)}
          className="btn btn-ghost mb-6 text-neutral hover:text-primary"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 mr-2"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 19l-7-7 7-7"
            />
          </svg>
          Back
        </motion.button>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Image Section - Highlighted */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="lg:col-span-2"
          >
            <div className="bg-base-100 rounded-box shadow-xl overflow-hidden border border-base-300">
              <div className="relative h-96 md:h-[500px] overflow-hidden">
                <motion.img
                  src={
                    image ||
                    "https://via.placeholder.com/800x500?text=Scholarship"
                  }
                  alt={scholarshipName}
                  className="w-full h-full object-cover"
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.3 }}
                />
                <div className="absolute inset-0 bg-linear-to-t from-black/60 via-transparent to-transparent"></div>

                {/* Badges Overlay */}
                <div className="absolute top-6 left-6 flex flex-col gap-2">
                  {worldRank && (
                    <div className="badge badge-secondary text-white text-lg px-4 py-3">
                      World Rank #{worldRank}
                    </div>
                  )}
                  {scholarshipCategory && (
                    <div className="badge badge-primary text-white text-lg px-4 py-3">
                      {scholarshipCategory}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </motion.div>

          {/* Details Section */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="space-y-6"
          >
            {/* Main Info Card */}
            <div className="bg-base-100 rounded-box shadow-lg p-6 border border-base-300">
              <h1 className="text-3xl md:text-4xl font-bold text-primary mb-4">
                {scholarshipName || "Scholarship Name"}
              </h1>

              <div className="flex items-center gap-3 mb-6">
                <div className="avatar">
                  <div className="w-12 h-12 rounded-full bg-primary text-primary-content flex items-center justify-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 14l9-5-9-5-9 5 9 5z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z"
                      />
                    </svg>
                  </div>
                </div>
                <div>
                  <p className="font-semibold text-lg text-secondary">
                    {universityName || "University Name"}
                  </p>
                  <p className="text-sm text-neutral">
                    {city && country
                      ? `${city}, ${country}`
                      : country || city || "Location"}
                  </p>
                </div>
              </div>

              {/* Tuition Fees - Highlighted */}
              {tuitionFees && (
                <div className="bg-linear-to-r from-primary/10 to-secondary/10 rounded-box p-6 mb-6 border-2 border-primary/20">
                  <p className="text-sm text-neutral mb-2">Tuition Fees</p>
                  <p className="text-3xl font-bold text-primary">
                    {tuitionFees}
                  </p>
                </div>
              )}

              {/* Apply Button */}
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleApplication}
                className="btn btn-primary w-full text-white text-lg py-3"
              >
                {user ? "Apply Now" : "Login to Apply"}
              </motion.button>
              {!user && (
                <p className="text-xs text-neutral text-center mt-2">
                  You need to be logged in to apply for this scholarship
                </p>
              )}
            </div>
          </motion.div>
        </div>

        {/* Detailed Information Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="mt-8 bg-base-100 rounded-box shadow-lg p-6 md:p-8 border border-base-300"
        >
          <h2 className="text-2xl font-bold text-primary mb-6">
            Scholarship Details
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Degree */}
            {degree && (
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6 text-primary"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 14l9-5-9-5-9 5 9 5z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z"
                    />
                  </svg>
                </div>
                <div>
                  <p className="text-sm text-neutral mb-1">Degree Level</p>
                  <p className="font-semibold text-lg">{degree}</p>
                </div>
              </div>
            )}

            {/* Subject Category */}
            {subjectCategory && (
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-full bg-secondary/10 flex items-center justify-center shrink-0">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6 text-secondary"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                    />
                  </svg>
                </div>
                <div>
                  <p className="text-sm text-neutral mb-1">Subject Category</p>
                  <p className="font-semibold text-lg">{subjectCategory}</p>
                </div>
              </div>
            )}

            {/* Location */}
            {(city || country) && (
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-full bg-accent/10 flex items-center justify-center shrink-0">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6 text-accent"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                  </svg>
                </div>
                <div>
                  <p className="text-sm text-neutral mb-1">Location</p>
                  <p className="font-semibold text-lg">
                    {city && country ? `${city}, ${country}` : country || city}
                  </p>
                </div>
              </div>
            )}

            {/* Scholarship Category */}
            {scholarshipCategory && (
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6 text-primary"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z"
                    />
                  </svg>
                </div>
                <div>
                  <p className="text-sm text-neutral mb-1">Category</p>
                  <p className="font-semibold text-lg">{scholarshipCategory}</p>
                </div>
              </div>
            )}

            {/* World Rank */}
            {worldRank && (
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-full bg-secondary/10 flex items-center justify-center flex-shrink-0">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6 text-secondary"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z"
                    />
                  </svg>
                </div>
                <div>
                  <p className="text-sm text-neutral mb-1">World Ranking</p>
                  <p className="font-semibold text-lg">#{worldRank}</p>
                </div>
              </div>
            )}

            {/* Application Fee */}
            {applicationFee && (
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-full bg-secondary/10 flex items-center justify-center shrink-0">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6 text-secondary"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z"
                    />
                  </svg>
                </div>
                <div>
                  <p className="text-sm text-neutral mb-1">Application Fee</p>
                  <p className="font-semibold text-lg text-secondary">
                    {applicationFee}
                  </p>
                </div>
              </div>
            )}

            {/* Created Date */}
            {createdAt && (
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-full bg-accent/10 flex items-center justify-center flex-shrink-0">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6 text-accent"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                    />
                  </svg>
                </div>
                <div>
                  <p className="text-sm text-neutral mb-1">Posted Date</p>
                  <p className="font-semibold text-lg">
                    {new Date(createdAt).toLocaleDateString()}
                  </p>
                </div>
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default ScholarshipDetails;
