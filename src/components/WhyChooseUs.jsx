// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import {
  FaShieldAlt,
  FaBolt,
  FaUserFriends,
  FaAward,
  FaGlobe,
  FaHeadset,
} from "react-icons/fa";

const WhyChooseUs = () => {
  const features = [
    {
      icon: <FaShieldAlt className="text-4xl" />,
      title: "Secure & Trusted",
      description:
        "Your data is protected with bank-level encryption. All payments are processed through secure gateways.",
      color: "primary",
    },
    {
      icon: <FaBolt className="text-4xl" />,
      title: "Fast Application Process",
      description:
        "Apply to multiple scholarships in minutes. Our streamlined process saves you time and effort.",
      color: "warning",
    },
    {
      icon: <FaUserFriends className="text-4xl" />,
      title: "Expert Support",
      description:
        "Get guidance from our dedicated team of education consultants and moderators throughout your journey.",
      color: "secondary",
    },
    {
      icon: <FaAward className="text-4xl" />,
      title: "Verified Opportunities",
      description:
        "All scholarships are verified and from reputable institutions. No fake or spam listings.",
      color: "accent",
    },
    {
      icon: <FaGlobe className="text-4xl" />,
      title: "Global Network",
      description:
        "Access scholarships from universities across the world. Expand your horizons internationally.",
      color: "info",
    },
    {
      icon: <FaHeadset className="text-4xl" />,
      title: "24/7 Assistance",
      description:
        "Round-the-clock customer support to help you with any questions or issues you may encounter.",
      color: "success",
    },
  ];

  return (
    <section className="py-16 px-4 bg-base-200">
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
            Why Choose ScholarStream?
          </h2>
          <p className="text-neutral text-lg md:text-xl max-w-2xl mx-auto">
            We're committed to making scholarship discovery and application
            easier, faster, and more accessible for everyone
          </p>
        </motion.div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              whileHover={{ y: -8, scale: 1.02 }}
              className="bg-base-100 rounded-box p-8 shadow-lg border border-base-300 hover:shadow-2xl transition-all duration-300"
            >
              {/* Icon */}
              <motion.div
                initial={{ scale: 0, rotate: -180 }}
                whileInView={{ scale: 1, rotate: 0 }}
                viewport={{ once: true }}
                transition={{
                  delay: index * 0.1 + 0.3,
                  type: "spring",
                  stiffness: 200,
                }}
                className={`w-16 h-16 rounded-full bg-${feature.color}/10 text-${feature.color} flex items-center justify-center mb-6`}
              >
                {feature.icon}
              </motion.div>

              {/* Title */}
              <h3 className="text-xl font-bold text-primary mb-3">
                {feature.title}
              </h3>

              {/* Description */}
              <p className="text-neutral leading-relaxed">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Bottom Banner */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.8, duration: 0.6 }}
          className="mt-16 bg-linear-to-r from-primary to-secondary rounded-box p-8 md:p-12 text-white text-center shadow-2xl"
        >
          <h3 className="text-2xl md:text-3xl font-bold mb-4">
            Ready to Start Your Journey?
          </h3>
          <p className="text-white/90 text-lg mb-6 max-w-2xl mx-auto">
            Join ScholarStream today and get access to thousands of scholarship
            opportunities from around the world. Your dream education is just a
            click away!
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <motion.a
              href="/register"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="btn btn-lg bg-white text-primary hover:bg-white/90 border-none px-8"
            >
              Create Free Account
            </motion.a>
            <motion.a
              href="/allScholarships"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="btn btn-lg btn-outline border-white text-white hover:bg-white hover:text-primary px-8"
            >
              Browse Scholarships
            </motion.a>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default WhyChooseUs;
