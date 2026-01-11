// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import { FaUserPlus, FaSearch, FaFileAlt, FaCheckCircle } from "react-icons/fa";

const HowItWorks = () => {
  const steps = [
    {
      icon: <FaUserPlus className="text-4xl" />,
      title: "Create Account",
      description:
        "Sign up for free and create your profile in just a few minutes. Add your academic information and preferences.",
      color: "primary",
      step: "01",
    },
    {
      icon: <FaSearch className="text-4xl" />,
      title: "Search Scholarships",
      description:
        "Browse through thousands of scholarships using our advanced filters. Find opportunities that match your goals.",
      color: "secondary",
      step: "02",
    },
    {
      icon: <FaFileAlt className="text-4xl" />,
      title: "Submit Application",
      description:
        "Apply directly through our platform. Pay the application fee securely and track your submission status.",
      color: "accent",
      step: "03",
    },
    {
      icon: <FaCheckCircle className="text-4xl" />,
      title: "Get Accepted",
      description:
        "Receive notifications about your application status. Get feedback from moderators and celebrate your success!",
      color: "success",
      step: "04",
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
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-primary mb-4">
            How It Works
          </h2>
          <p className="text-neutral text-lg md:text-xl max-w-2xl mx-auto">
            Get started with ScholarStream in four simple steps and unlock your
            educational opportunities
          </p>
        </motion.div>

        {/* Steps Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.15, duration: 0.5 }}
              whileHover={{ y: -10 }}
              className="relative"
            >
              {/* Connector Line (hidden on mobile, shown on larger screens) */}
              {index < steps.length - 1 && (
                <div className="hidden lg:block absolute top-16 left-[60%] w-full h-0.5 bg-linear-to-r from-primary to-secondary opacity-30 z-0"></div>
              )}

              {/* Card */}
              <div className="relative bg-base-200 rounded-box p-8 shadow-lg border border-base-300 hover:shadow-xl transition-all duration-300 h-full flex flex-col items-center text-center z-10">
                {/* Step Number Badge */}
                <div className="absolute -top-4 -right-4 bg-linear-to-r from-primary to-secondary text-white w-12 h-12 rounded-full flex items-center justify-center font-bold text-lg shadow-lg">
                  {step.step}
                </div>

                {/* Icon */}
                <motion.div
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.15 + 0.3, type: "spring" }}
                  className={`w-20 h-20 rounded-full bg-linear-to-r from-${step.color} to-${step.color}/80 text-white flex items-center justify-center mb-6 shadow-lg`}
                >
                  {step.icon}
                </motion.div>

                {/* Title */}
                <h3 className="text-xl font-bold text-primary mb-4">
                  {step.title}
                </h3>

                {/* Description */}
                <p className="text-neutral leading-relaxed">{step.description}</p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* CTA Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.8, duration: 0.6 }}
          className="text-center mt-12"
        >
          <motion.a
            href="/register"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="inline-block btn btn-primary btn-lg text-white px-10 py-4 text-lg font-semibold shadow-lg hover:shadow-xl transition-shadow"
          >
            Get Started Now
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
};

export default HowItWorks;
