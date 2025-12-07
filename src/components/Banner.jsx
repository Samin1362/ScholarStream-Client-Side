import { useState, useEffect } from "react";
// eslint-disable-next-line no-unused-vars
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router";
import banner1 from "../assets/banner/banner1.jpg";
import banner2 from "../assets/banner/banner2.jpg";
import banner3 from "../assets/banner/banner3.jpg";

const Banner = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [direction, setDirection] = useState(0);

  const slides = [
    {
      image: banner1,
      title: "Discover Your Future",
      subtitle: "Find the perfect scholarship opportunity",
      description:
        "Explore thousands of scholarships from around the world and take the first step towards your educational dreams.",
      buttonText: "Browse Scholarships",
      buttonLink: "/",
    },
    {
      image: banner2,
      title: "Empower Your Education",
      subtitle: "Your gateway to academic success",
      description:
        "Connect with opportunities that match your goals and unlock your potential with the right financial support.",
      buttonText: "Get Started",
      buttonLink: "/register",
    },
    {
      image: banner3,
      title: "Transform Your Dreams",
      subtitle: "Turn aspirations into achievements",
      description:
        "Join thousands of students who have found their path to success through our comprehensive scholarship platform.",
      buttonText: "Learn More",
      buttonLink: "/",
    },
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setDirection(1);
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 3000);

    return () => clearInterval(timer);
  }, [slides.length]);

  const goToSlide = (index) => {
    setDirection(index > currentSlide ? 1 : -1);
    setCurrentSlide(index);
  };

  const goToPrevious = () => {
    setDirection(-1);
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const goToNext = () => {
    setDirection(1);
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  return (
    <div className="relative w-full h-[70vh] md:h-[85vh] lg:h-screen overflow-hidden">
      <AnimatePresence custom={direction}>
        <motion.div
          key={currentSlide}
          custom={direction}
          initial={{ x: direction > 0 ? "100%" : "-100%" }}
          animate={{ x: 0 }}
          exit={{ x: direction > 0 ? "-100%" : "100%" }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
          className="absolute inset-0"
        >
          <img
            src={slides[currentSlide].image}
            alt={slides[currentSlide].title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-linear-to-r from-black/70 via-black/50 to-black/30"></div>
        </motion.div>
      </AnimatePresence>

      <div className="absolute inset-0 flex items-center justify-center z-10">
        <div className="container mx-auto px-4">
          <AnimatePresence custom={direction}>
            <motion.div
              key={currentSlide}
              custom={direction}
              initial={{ opacity: 0, y: 30, x: direction > 0 ? 50 : -50 }}
              animate={{ opacity: 1, y: 0, x: 0 }}
              exit={{ opacity: 0, y: -30, x: direction > 0 ? -50 : 50 }}
              transition={{ duration: 0.8, ease: "easeInOut" }}
              className="text-center text-white max-w-3xl mx-auto"
            >
              <motion.h1
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 }}
                className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4"
              >
                {slides[currentSlide].title}
              </motion.h1>
              <motion.p
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 }}
                className="text-xl md:text-2xl text-secondary mb-4 font-medium"
              >
                {slides[currentSlide].subtitle}
              </motion.p>
              <motion.p
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4 }}
                className="text-base md:text-lg mb-8 text-white/90"
              >
                {slides[currentSlide].description}
              </motion.p>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
              >
                <Link to={slides[currentSlide].buttonLink}>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="btn btn-primary text-white px-8 py-3 text-lg"
                  >
                    {slides[currentSlide].buttonText}
                  </motion.button>
                </Link>
              </motion.div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* Navigation Arrows */}
      <button
        onClick={goToPrevious}
        className="absolute left-4 top-1/2 -translate-y-1/2 z-20 btn btn-circle btn-ghost text-white hover:bg-white/20 backdrop-blur-sm"
        aria-label="Previous slide"
      >
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
            d="M15 19l-7-7 7-7"
          />
        </svg>
      </button>
      <button
        onClick={goToNext}
        className="absolute right-4 top-1/2 -translate-y-1/2 z-20 btn btn-circle btn-ghost text-white hover:bg-white/20 backdrop-blur-sm"
        aria-label="Next slide"
      >
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
            d="M9 5l7 7-7 7"
          />
        </svg>
      </button>

      {/* Dots Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex gap-2">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`w-3 h-3 rounded-full transition-all ${
              currentSlide === index
                ? "bg-primary w-8"
                : "bg-white/50 hover:bg-white/75"
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
};

export default Banner;
