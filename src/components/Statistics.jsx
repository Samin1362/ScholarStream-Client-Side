// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import { FaGraduationCap, FaUniversity, FaGlobe, FaDollarSign } from "react-icons/fa";
import useAxiosPublic from "../hooks/useAxiosPublic";
import { useQuery } from "@tanstack/react-query";
import { useMemo } from "react";

const Statistics = () => {
  const axiosPublic = useAxiosPublic();

  // Fetch scholarships
  const { data: scholarships = [] } = useQuery({
    queryKey: ["stats-scholarships"],
    queryFn: async () => {
      const res = await axiosPublic.get("/scholarships");
      return Array.isArray(res.data) ? res.data : [];
    },
  });

  // Fetch applications
  const { data: applications = [] } = useQuery({
    queryKey: ["stats-applications"],
    queryFn: async () => {
      const res = await axiosPublic.get("/applications");
      return Array.isArray(res.data) ? res.data : [];
    },
  });

  // Calculate statistics
  const stats = useMemo(() => {
    const totalScholarships = scholarships.length;
    const totalApplications = applications.length;

    // Count unique universities
    const uniqueUniversities = new Set(
      scholarships.map((s) => s.universityName).filter(Boolean)
    ).size;

    // Count unique countries
    const uniqueCountries = new Set(
      scholarships.map((s) => s.country).filter(Boolean)
    ).size;

    return {
      scholarships: totalScholarships,
      applications: totalApplications,
      universities: uniqueUniversities,
      countries: uniqueCountries,
    };
  }, [scholarships, applications]);

  const statsData = [
    {
      icon: <FaGraduationCap className="text-5xl" />,
      value: stats.scholarships,
      label: "Scholarships Available",
      suffix: "+",
      color: "primary",
    },
    {
      icon: <FaUniversity className="text-5xl" />,
      value: stats.universities,
      label: "Partner Universities",
      suffix: "+",
      color: "secondary",
    },
    {
      icon: <FaGlobe className="text-5xl" />,
      value: stats.countries,
      label: "Countries Worldwide",
      suffix: "+",
      color: "accent",
    },
    {
      icon: <FaDollarSign className="text-5xl" />,
      value: stats.applications,
      label: "Applications Submitted",
      suffix: "+",
      color: "warning",
    },
  ];

  return (
    <section className="py-16 px-4 bg-linear-to-r from-primary to-secondary text-white">
      <div className="container mx-auto">
        {/* Header Section */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
            Our Impact in Numbers
          </h2>
          <p className="text-white/90 text-lg md:text-xl max-w-2xl mx-auto">
            Join thousands of students who have found their path to success
            through ScholarStream
          </p>
        </motion.div>

        {/* Statistics Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {statsData.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              whileHover={{ scale: 1.05, y: -5 }}
              className="bg-white/10 backdrop-blur-sm rounded-box p-8 text-center border border-white/20 hover:bg-white/20 transition-all duration-300"
            >
              {/* Icon */}
              <motion.div
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 + 0.3, type: "spring" }}
                className="flex justify-center mb-4 text-white"
              >
                {stat.icon}
              </motion.div>

              {/* Value with Counter Animation */}
              <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 + 0.5 }}
                className="text-4xl md:text-5xl font-bold mb-2"
              >
                {stat.value}
                {stat.suffix}
              </motion.div>

              {/* Label */}
              <p className="text-white/90 text-lg font-medium">{stat.label}</p>
            </motion.div>
          ))}
        </div>

        {/* Bottom Text */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.6, duration: 0.6 }}
          className="text-center mt-12"
        >
          <p className="text-white/80 text-lg max-w-3xl mx-auto">
            These numbers represent real students achieving their educational
            dreams. Be part of our growing community and discover opportunities
            that can transform your future.
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default Statistics;
