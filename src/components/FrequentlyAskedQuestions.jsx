import React, { useState } from "react";
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import { FaQuestionCircle, FaChevronDown, FaChevronUp } from "react-icons/fa";

const FrequentlyAskedQuestions = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const faqs = [
    {
      question: "How do I apply for a scholarship?",
      answer:
        "To apply for a scholarship, first create an account on ScholarStream. Then browse through available scholarships, select the ones that match your profile, and click 'Apply Now'. You'll need to pay the application fee to complete your application. You can track your application status in your dashboard.",
    },
    {
      question: "What is the application fee and how do I pay?",
      answer:
        "Each scholarship has its own application fee, which varies by program. You can see the application fee listed on each scholarship's details page. Payment is processed securely through our integrated payment system. We accept multiple payment methods including credit cards and other secure payment gateways.",
    },
    {
      question: "Can I apply for multiple scholarships?",
      answer:
        "Yes! You can apply for as many scholarships as you qualify for. There's no limit to the number of applications you can submit. Each application is independent, and you'll need to pay the application fee for each scholarship you apply to.",
    },
    {
      question: "How do I track my application status?",
      answer:
        "Once you've submitted an application, you can track its status in the 'My Applications' section of your dashboard. You'll see updates on whether your application is pending, being processed, accepted, or rejected. Moderators may also provide feedback on your application.",
    },
    {
      question: "What information do I need to provide when applying?",
      answer:
        "When applying for a scholarship, you'll typically need to provide your personal information, academic background, degree level, and other relevant details. The specific requirements may vary by scholarship program. Make sure to review each scholarship's details page for specific requirements.",
    },
    {
      question: "Can I review scholarships and universities?",
      answer:
        "Yes! After applying or interacting with scholarships, you can leave reviews and ratings. This helps other students make informed decisions. You can rate scholarships on a scale of 1-5 stars and write detailed comments about your experience.",
    },
    {
      question: "How do I search for scholarships?",
      answer:
        "You can search for scholarships using various filters including scholarship name, university name, country, city, category, and subject. Use the search bar and filters on the 'All Scholarships' page to find opportunities that match your interests and qualifications.",
    },
    {
      question: "Is ScholarStream free to use?",
      answer:
        "Creating an account and browsing scholarships on ScholarStream is completely free. However, each scholarship program may have its own application fee that you'll need to pay when submitting an application. These fees are set by the scholarship providers, not by ScholarStream.",
    },
  ];

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="py-16 px-4 bg-base-200">
      <div className="container mx-auto max-w-4xl">
        {/* Header Section */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <div className="flex justify-center mb-4">
            <FaQuestionCircle className="text-5xl md:text-6xl text-primary" />
          </div>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-primary mb-4">
            Frequently Asked Questions
          </h2>
          <p className="text-neutral text-lg md:text-xl max-w-2xl mx-auto">
            Find answers to common questions about ScholarStream and the
            scholarship application process
          </p>
        </motion.div>

        {/* FAQ Accordion */}
        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              className="bg-base-100 rounded-box shadow-lg border border-base-300 overflow-hidden"
            >
              <motion.button
                onClick={() => toggleFAQ(index)}
                className={`w-full text-left p-6 flex items-center justify-between gap-4 hover:bg-base-200 transition-colors ${
                  openIndex === index ? "bg-base-200" : ""
                }`}
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.99 }}
              >
                <h3 className="text-lg md:text-xl font-semibold text-primary flex-1">
                  {faq.question}
                </h3>
                <motion.div
                  animate={{ rotate: openIndex === index ? 180 : 0 }}
                  transition={{ duration: 0.3 }}
                  className="text-primary shrink-0"
                >
                  {openIndex === index ? (
                    <FaChevronUp className="text-xl" />
                  ) : (
                    <FaChevronDown className="text-xl" />
                  )}
                </motion.div>
              </motion.button>

              <motion.div
                initial={false}
                animate={{
                  height: openIndex === index ? "auto" : 0,
                  opacity: openIndex === index ? 1 : 0,
                }}
                transition={{ duration: 0.3 }}
                className="overflow-hidden"
              >
                <div className="px-6 pb-6">
                  <p className="text-neutral leading-relaxed">{faq.answer}</p>
                </div>
              </motion.div>
            </motion.div>
          ))}
        </div>

        {/* Contact CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.8, duration: 0.6 }}
          className="mt-12 text-center"
        >
          <div className="bg-linear-to-r from-primary to-secondary rounded-box p-8 text-white">
            <h3 className="text-2xl md:text-3xl font-bold mb-4">
              Still Have Questions?
            </h3>
            <p className="text-white/90 mb-6 max-w-2xl mx-auto">
              Can't find the answer you're looking for? Please reach out to our
              support team for assistance.
            </p>
            <motion.a
              href="/about"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="inline-block bg-white text-primary px-8 py-3 rounded-lg font-semibold text-lg shadow-lg hover:shadow-xl transition-shadow"
            >
              Contact Support
            </motion.a>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default FrequentlyAskedQuestions;
