// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import { Link } from "react-router";

const ScholarshipCard = ({ scholarship }) => {
  const {
    image,
    city,
    country,
    degree,
    scholarshipCategory,
    scholarshipName,
    subjectCategory,
    tuitionFees,
    universityName,
    worldRank,
    _id,
  } = scholarship || {};

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -8, transition: { duration: 0.2 } }}
      className="card bg-base-100 shadow-lg border border-base-300 overflow-hidden group"
    >
      {/* Image Section */}
      <figure className="relative h-48 overflow-hidden">
        <img
          src={image || "https://via.placeholder.com/400x200?text=Scholarship"}
          alt={scholarshipName || "Scholarship"}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
        />
        <div className="absolute top-4 right-4">
          <div className="badge badge-primary text-white">
            {scholarshipCategory || "Scholarship"}
          </div>
        </div>
        {worldRank && (
          <div className="absolute top-4 left-4">
            <div className="badge badge-secondary text-white">
              Rank #{worldRank}
            </div>
          </div>
        )}
      </figure>

      {/* Card Body */}
      <div className="card-body p-6">
        {/* University Name */}
        <div className="flex items-center gap-2 mb-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 text-primary"
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
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 14v9m0-9l4.16-2.316a12.083 12.083 0 00.665 6.479L12 14.01m0 0L7.824 11.684M12 14l4.16-2.316m0 0L12 11m4.16 1.684L16.16 14"
            />
          </svg>
          <p className="text-sm font-medium text-secondary">
            {universityName || "University Name"}
          </p>
        </div>

        {/* Scholarship Name */}
        <h2 className="card-title text-xl text-primary mb-3 line-clamp-2">
          {scholarshipName || "Scholarship Name"}
        </h2>

        {/* Details Grid */}
        <div className="space-y-3 mb-4">
          {/* Location */}
          <div className="flex items-center gap-2 text-sm text-neutral">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4 text-primary"
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
            <span>
              {city && country
                ? `${city}, ${country}`
                : country || city || "Location"}
            </span>
          </div>

          {/* Degree */}
          {degree && (
            <div className="flex items-center gap-2 text-sm text-neutral">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4 text-primary"
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
              <span>{degree}</span>
            </div>
          )}

          {/* Subject Category */}
          {subjectCategory && (
            <div className="flex items-center gap-2 text-sm text-neutral">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4 text-primary"
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
              <span>{subjectCategory}</span>
            </div>
          )}

          {/* Tuition Fees */}
          {tuitionFees && (
            <div className="flex items-center gap-2 text-sm">
              <span className="font-semibold text-primary">Tuition:</span>
              <span className="text-neutral">{tuitionFees}</span>
            </div>
          )}
        </div>

        {/* Action Button */}
        <div className="card-actions mt-4">
          <Link to={`/scholarship/${_id}`} className="w-full">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="btn btn-primary w-full text-white"
            >
              View Details
            </motion.button>
          </Link>
        </div>
      </div>
    </motion.div>
  );
};

export default ScholarshipCard;
