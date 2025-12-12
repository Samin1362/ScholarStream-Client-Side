import React from "react";
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import {
  FaGraduationCap,
  FaSearch,
  FaFileAlt,
  FaCreditCard,
  FaStar,
  FaUsers,
  FaChartLine,
  FaShieldAlt,
  FaGlobe,
  FaAward,
} from "react-icons/fa";

const About = () => {
  const features = [
    {
      icon: <FaSearch className="text-4xl" />,
      title: "Discover Scholarships",
      description:
        "Browse through thousands of scholarship opportunities from universities worldwide. Filter by category, country, degree level, and more.",
      color: "primary",
    },
    {
      icon: <FaFileAlt className="text-4xl" />,
      title: "Easy Applications",
      description:
        "Apply to multiple scholarships with a streamlined application process. Track your application status in real-time.",
      color: "secondary",
    },
    {
      icon: <FaCreditCard className="text-4xl" />,
      title: "Secure Payments",
      description:
        "Make secure payments for application fees with our integrated payment system. Multiple payment methods supported.",
      color: "accent",
    },
    {
      icon: <FaStar className="text-4xl" />,
      title: "Review System",
      description:
        "Read and write reviews about scholarships and universities. Help other students make informed decisions.",
      color: "warning",
    },
    {
      icon: <FaUsers className="text-4xl" />,
      title: "User Management",
      description:
        "Comprehensive user management system with role-based access control for students, moderators, and administrators.",
      color: "primary",
    },
    {
      icon: <FaChartLine className="text-4xl" />,
      title: "Analytics Dashboard",
      description:
        "Get insights into scholarship trends, application statistics, and platform analytics with our powerful dashboard.",
      color: "secondary",
    },
  ];

  const stats = [
    { number: "1000+", label: "Scholarships", icon: <FaAward /> },
    { number: "50+", label: "Universities", icon: <FaGlobe /> },
    { number: "5000+", label: "Students", icon: <FaUsers /> },
    { number: "24/7", label: "Support", icon: <FaShieldAlt /> },
  ];

  return (
    <div className="min-h-screen bg-base-200">
      {/* Hero Section */}
      <motion.section
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="bg-linear-to-r from-primary to-secondary text-white py-20 px-4"
      >
        <div className="container mx-auto text-center">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: "spring" }}
            className="inline-block mb-6"
          >
            <FaGraduationCap className="text-6xl md:text-8xl" />
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="text-4xl md:text-6xl font-bold mb-4"
          >
            About ScholarStream
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="text-xl md:text-2xl max-w-3xl mx-auto"
          >
            Your gateway to discovering and applying for scholarships worldwide.
            Empowering students to achieve their educational dreams.
          </motion.p>
        </div>
      </motion.section>

      {/* Mission Section */}
      <section className="py-16 px-4">
        <div className="container mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="bg-base-100 rounded-box shadow-xl p-8 md:p-12 border border-base-300 max-w-4xl mx-auto"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-primary mb-6 text-center">
              Our Mission
            </h2>
            <p className="text-lg text-neutral leading-relaxed text-center">
              ScholarStream is dedicated to making higher education accessible
              to students worldwide. We connect ambitious students with
              scholarship opportunities from leading universities, simplifying
              the application process and providing a platform for informed
              decision-making. Our mission is to break down financial barriers
              and help students turn their educational aspirations into reality.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Statistics Section */}
      <section className="py-16 px-4 bg-base-100">
        <div className="container mx-auto">
          <motion.h2
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-3xl md:text-4xl font-bold text-center text-primary mb-12"
          >
            Platform Statistics
          </motion.h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                whileHover={{ scale: 1.05 }}
                className="bg-linear-to-br from-base-200 to-base-300 rounded-box p-6 text-center shadow-lg border border-base-300"
              >
                <div className="text-primary text-3xl mb-2 flex justify-center">
                  {stat.icon}
                </div>
                <h3 className="text-3xl md:text-4xl font-bold text-primary mb-2">
                  {stat.number}
                </h3>
                <p className="text-neutral font-medium">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 px-4">
        <div className="container mx-auto">
          <motion.h2
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-3xl md:text-4xl font-bold text-center text-primary mb-12"
          >
            Key Features
          </motion.h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                whileHover={{ y: -5 }}
                className={`bg-base-100 rounded-box p-6 shadow-lg border border-base-300 hover:shadow-xl transition-shadow`}
              >
                <div
                  className={`mb-4 flex justify-center ${
                    feature.color === "primary"
                      ? "text-primary"
                      : feature.color === "secondary"
                      ? "text-secondary"
                      : feature.color === "accent"
                      ? "text-accent"
                      : "text-warning"
                  }`}
                >
                  {feature.icon}
                </div>
                <h3 className="text-xl font-bold text-base-content mb-3 text-center">
                  {feature.title}
                </h3>
                <p className="text-neutral text-center leading-relaxed">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-16 px-4 bg-base-100">
        <div className="container mx-auto">
          <motion.h2
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-3xl md:text-4xl font-bold text-center text-primary mb-12"
          >
            How It Works
          </motion.h2>
          <div className="max-w-4xl mx-auto">
            <div className="space-y-8">
              {[
                {
                  step: "01",
                  title: "Create Your Account",
                  description:
                    "Sign up for free and create your student profile. Provide your academic information and preferences.",
                },
                {
                  step: "02",
                  title: "Browse Scholarships",
                  description:
                    "Explore our extensive database of scholarships. Use filters to find opportunities that match your profile.",
                },
                {
                  step: "03",
                  title: "Apply & Pay",
                  description:
                    "Submit your application and pay the application fee securely through our integrated payment system.",
                },
                {
                  step: "04",
                  title: "Track & Review",
                  description:
                    "Monitor your application status and share your experience by reviewing scholarships and universities.",
                },
              ].map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.2, duration: 0.6 }}
                  className="flex flex-col md:flex-row items-center gap-6 bg-base-200 rounded-box p-6 shadow-lg border border-base-300"
                >
                  <div className="bg-linear-to-r from-primary to-secondary text-white rounded-full w-20 h-20 flex items-center justify-center text-2xl font-bold shrink-0">
                    {item.step}
                  </div>
                  <div className="flex-1 text-center md:text-left">
                    <h3 className="text-xl font-bold text-primary mb-2">
                      {item.title}
                    </h3>
                    <p className="text-neutral">{item.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* User Roles Section */}
      <section className="py-16 px-4">
        <div className="container mx-auto">
          <motion.h2
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-3xl md:text-4xl font-bold text-center text-primary mb-12"
          >
            For Everyone
          </motion.h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {[
              {
                role: "Students",
                description:
                  "Browse scholarships, apply for opportunities, make payments, and track your applications all in one place.",
                color: "primary",
              },
              {
                role: "Moderators",
                description:
                  "Manage applications, review submissions, provide feedback, and ensure quality control across the platform.",
                color: "secondary",
              },
              {
                role: "Administrators",
                description:
                  "Manage scholarships, users, view analytics, and maintain the platform with comprehensive admin tools.",
                color: "accent",
              },
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                whileHover={{ scale: 1.05 }}
                className={`text-white rounded-box p-8 shadow-xl ${
                  item.color === "primary"
                    ? "bg-linear-to-br from-primary to-primary/80"
                    : item.color === "secondary"
                    ? "bg-linear-to-br from-secondary to-secondary/80"
                    : "bg-linear-to-br from-accent to-accent/80"
                }`}
              >
                <h3 className="text-2xl font-bold mb-4">{item.role}</h3>
                <p className="leading-relaxed">{item.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <motion.section
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="py-16 px-4 bg-linear-to-r from-primary to-secondary"
      >
        <div className="container mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Ready to Start Your Journey?
          </h2>
          <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
            Join thousands of students who have found their path to success
            through ScholarStream.
          </p>
          <motion.a
            href="/register"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="inline-block bg-white text-primary px-8 py-3 rounded-lg font-semibold text-lg shadow-lg hover:shadow-xl transition-shadow"
          >
            Get Started Today
          </motion.a>
        </div>
      </motion.section>
    </div>
  );
};

export default About;
