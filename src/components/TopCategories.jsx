// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import { Link } from "react-router";
import {
  FaFlask,
  FaLaptopCode,
  FaBriefcase,
  FaHeartbeat,
  FaPaintBrush,
  FaBalanceScale,
} from "react-icons/fa";
import SkeletonCategory from "./SkeletonCategory";

const TopCategories = () => {
  const categories = [
    {
      icon: <FaFlask className="text-4xl" />,
      name: "Science & Engineering",
      count: "250+ Scholarships",
      description: "STEM programs, research opportunities, and innovation grants",
      color: "primary",
      bgGradient: "from-blue-500 to-blue-600",
    },
    {
      icon: <FaLaptopCode className="text-4xl" />,
      name: "Computer Science & IT",
      count: "180+ Scholarships",
      description: "Software development, AI, cybersecurity, and data science",
      color: "secondary",
      bgGradient: "from-teal-500 to-teal-600",
    },
    {
      icon: <FaBriefcase className="text-4xl" />,
      name: "Business & Management",
      count: "200+ Scholarships",
      description: "MBA programs, entrepreneurship, and business administration",
      color: "accent",
      bgGradient: "from-purple-500 to-purple-600",
    },
    {
      icon: <FaHeartbeat className="text-4xl" />,
      name: "Medical & Health Sciences",
      count: "150+ Scholarships",
      description: "Medicine, nursing, pharmacy, and healthcare management",
      color: "error",
      bgGradient: "from-red-500 to-red-600",
    },
    {
      icon: <FaPaintBrush className="text-4xl" />,
      name: "Arts & Humanities",
      count: "120+ Scholarships",
      description: "Fine arts, literature, history, and cultural studies",
      color: "warning",
      bgGradient: "from-orange-500 to-orange-600",
    },
    {
      icon: <FaBalanceScale className="text-4xl" />,
      name: "Law & Social Sciences",
      count: "140+ Scholarships",
      description: "Legal studies, psychology, sociology, and political science",
      color: "info",
      bgGradient: "from-cyan-500 to-cyan-600",
    },
  ];

  return (
    <section className="py-16 px-4 bg-base-100">
      <div className="container mx-auto">
        {/* Header Section */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-primary mb-4">
            Explore by Category
          </h2>
          <p className="text-neutral text-lg md:text-xl max-w-2xl mx-auto">
            Find scholarships tailored to your field of study and academic
            interests
          </p>
        </motion.div>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {categories.map((category, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              whileHover={{ y: -8 }}
              className="group"
            >
              <Link to="/allScholarships">
                <div className="relative bg-base-200 rounded-box overflow-hidden shadow-lg border border-base-300 hover:shadow-2xl transition-all duration-300 h-full">
                  {/* Gradient Background Overlay */}
                  <div
                    className={`absolute inset-0 bg-linear-to-br ${category.bgGradient} opacity-0 group-hover:opacity-10 transition-opacity duration-300`}
                  ></div>

                  {/* Content */}
                  <div className="relative p-6">
                    {/* Icon */}
                    <motion.div
                      initial={{ scale: 0 }}
                      whileInView={{ scale: 1 }}
                      viewport={{ once: true }}
                      transition={{
                        delay: index * 0.1 + 0.3,
                        type: "spring",
                      }}
                      className={`w-16 h-16 rounded-full bg-linear-to-r ${category.bgGradient} text-white flex items-center justify-center mb-4 shadow-lg group-hover:scale-110 transition-transform duration-300`}
                    >
                      {category.icon}
                    </motion.div>

                    {/* Category Name */}
                    <h3 className="text-xl font-bold text-primary mb-2 group-hover:text-secondary transition-colors">
                      {category.name}
                    </h3>

                    {/* Count Badge */}
                    <div className="inline-block bg-primary/10 text-primary px-3 py-1 rounded-full text-sm font-semibold mb-3">
                      {category.count}
                    </div>

                    {/* Description */}
                    <p className="text-neutral text-sm leading-relaxed">
                      {category.description}
                    </p>

                    {/* Arrow Icon */}
                    <div className="mt-4 flex items-center text-primary group-hover:text-secondary transition-colors">
                      <span className="text-sm font-semibold mr-2">
                        Explore
                      </span>
                      <motion.svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        initial={{ x: 0 }}
                        whileHover={{ x: 5 }}
                        transition={{ type: "spring", stiffness: 300 }}
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M17 8l4 4m0 0l-4 4m4-4H3"
                        />
                      </motion.svg>
                    </div>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.8, duration: 0.6 }}
          className="text-center mt-12"
        >
          <p className="text-neutral text-lg mb-6">
            Can't find your category? We have many more options available!
          </p>
          <Link to="/allScholarships">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="btn btn-outline btn-primary btn-lg px-8"
            >
              View All Categories
            </motion.button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default TopCategories;
