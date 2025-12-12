// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import { useState, useEffect, useRef } from "react";
import { useForm } from "react-hook-form";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useNotification } from "../../../components/Notification";

const AddScholarship = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const [imageUrl, setImageUrl] = useState("");
  const widgetRef = useRef();
  const axiosSecure = useAxiosSecure();
  const { success, error } = useNotification();

  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://upload-widget.cloudinary.com/global/all.js";
    script.async = true;
    script.onload = () => {
      widgetRef.current = window.cloudinary.createUploadWidget(
        {
          cloudName: import.meta.env.VITE_CLOUDINARY_CLOUD_NAME,
          uploadPreset: import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET,
        },
        (error, result) => {
          if (!error && result?.event === "success") {
            setImageUrl(result.info.secure_url);
          }
        }
      );
    };
    document.body.appendChild(script);
    return () =>
      document.body.contains(script) && document.body.removeChild(script);
  }, []);

  const onSubmit = (data) => {
    // Handle form submission here

    const scholarshipInfo = {
      scholarshipName: data.scholarshipName,
      universityName: data.universityName,
      image: imageUrl,
      country: data.country, 
      city: data.city, 
      degree: data.degree, 
      scholarshipCategory: data.scholarshipCategory,
      subjectCategory: data.subjectCategory, 
      worldRank: data.worldRank,
      tuitionFees: data.tuitionFees,
      applicationFee: data.applicationFee
    }

    axiosSecure
      .post("/scholarships", scholarshipInfo)
      .then((res) => {
        if (res.data.insertedId) {
          success("Scholarship added successfully!");
          reset();
          setImageUrl("");
        }
      })
      .catch((err) => {
        error(
          err?.response?.data?.message ||
            "Failed to add scholarship. Please try again."
        );
      });
  };

  return (
    <div className="min-h-screen bg-base-200 py-8 px-4">
      <div className="container mx-auto max-w-5xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="bg-base-100 rounded-box shadow-lg p-6 md:p-8 border border-base-300"
        >
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="mb-6"
          >
            <h1 className="text-3xl font-bold text-primary mb-2">
              Add New Scholarship
            </h1>
            <p className="text-neutral text-sm">
              Fill in the details to add a new scholarship opportunity
            </p>
          </motion.div>

          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Scholarship Name */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 }}
                className="md:col-span-2"
              >
                <label className="label">
                  <span className="label-text font-medium text-neutral">
                    Scholarship Name
                  </span>
                </label>
                <input
                  type="text"
                  {...register("scholarshipName", {
                    required: "Scholarship name is required",
                  })}
                  className={`input input-bordered w-full focus:input-primary ${
                    errors.scholarshipName ? "input-error" : ""
                  }`}
                  placeholder="Enter scholarship name"
                />
                {errors.scholarshipName && (
                  <label className="label">
                    <span className="label-text-alt text-error">
                      {errors.scholarshipName.message}
                    </span>
                  </label>
                )}
              </motion.div>

              {/* University Name */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4 }}
              >
                <label className="label">
                  <span className="label-text font-medium text-neutral">
                    University Name
                  </span>
                </label>
                <input
                  type="text"
                  {...register("universityName", {
                    required: "University name is required",
                  })}
                  className={`input input-bordered w-full focus:input-primary ${
                    errors.universityName ? "input-error" : ""
                  }`}
                  placeholder="Enter university name"
                />
                {errors.universityName && (
                  <label className="label">
                    <span className="label-text-alt text-error">
                      {errors.universityName.message}
                    </span>
                  </label>
                )}
              </motion.div>

              {/* Image */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5 }}
              >
                <label className="label">
                  <span className="label-text font-medium text-neutral">
                    Image
                  </span>
                </label>
                <div className="flex items-center gap-4">
                  <button
                    type="button"
                    onClick={() => widgetRef.current?.open()}
                    className="btn btn-outline btn-primary"
                  >
                    Upload Image
                  </button>
                  {imageUrl && (
                    <motion.img
                      initial={{ scale: 0, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{ type: "spring", stiffness: 200 }}
                      src={imageUrl}
                      alt="Scholarship"
                      className="w-16 h-16 object-cover rounded-box border-2 border-primary"
                    />
                  )}
                </div>
              </motion.div>

              {/* Country */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.6 }}
              >
                <label className="label">
                  <span className="label-text font-medium text-neutral">
                    Country
                  </span>
                </label>
                <input
                  type="text"
                  {...register("country", {
                    required: "Country is required",
                  })}
                  className={`input input-bordered w-full focus:input-primary ${
                    errors.country ? "input-error" : ""
                  }`}
                  placeholder="Enter country"
                />
                {errors.country && (
                  <label className="label">
                    <span className="label-text-alt text-error">
                      {errors.country.message}
                    </span>
                  </label>
                )}
              </motion.div>

              {/* City */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.7 }}
              >
                <label className="label">
                  <span className="label-text font-medium text-neutral">
                    City
                  </span>
                </label>
                <input
                  type="text"
                  {...register("city", {
                    required: "City is required",
                  })}
                  className={`input input-bordered w-full focus:input-primary ${
                    errors.city ? "input-error" : ""
                  }`}
                  placeholder="Enter city"
                />
                {errors.city && (
                  <label className="label">
                    <span className="label-text-alt text-error">
                      {errors.city.message}
                    </span>
                  </label>
                )}
              </motion.div>

              {/* World Rank */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.8 }}
              >
                <label className="label">
                  <span className="label-text font-medium text-neutral">
                    World Rank
                  </span>
                </label>
                <input
                  type="text"
                  {...register("worldRank")}
                  className="input input-bordered w-full focus:input-primary"
                  placeholder="Enter world rank"
                />
              </motion.div>

              {/* Subject Category */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.9 }}
              >
                <label className="label">
                  <span className="label-text font-medium text-neutral">
                    Subject Category
                  </span>
                </label>
                <input
                  type="text"
                  {...register("subjectCategory", {
                    required: "Subject category is required",
                  })}
                  className={`input input-bordered w-full focus:input-primary ${
                    errors.subjectCategory ? "input-error" : ""
                  }`}
                  placeholder="Enter subject category"
                />
                {errors.subjectCategory && (
                  <label className="label">
                    <span className="label-text-alt text-error">
                      {errors.subjectCategory.message}
                    </span>
                  </label>
                )}
              </motion.div>

              {/* Scholarship Category */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 1.0 }}
              >
                <label className="label">
                  <span className="label-text font-medium text-neutral">
                    Scholarship Category
                  </span>
                </label>
                <input
                  type="text"
                  {...register("scholarshipCategory", {
                    required: "Scholarship category is required",
                  })}
                  className={`input input-bordered w-full focus:input-primary ${
                    errors.scholarshipCategory ? "input-error" : ""
                  }`}
                  placeholder="Enter scholarship category"
                />
                {errors.scholarshipCategory && (
                  <label className="label">
                    <span className="label-text-alt text-error">
                      {errors.scholarshipCategory.message}
                    </span>
                  </label>
                )}
              </motion.div>

              {/* Degree */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 1.1 }}
              >
                <label className="label">
                  <span className="label-text font-medium text-neutral">
                    Degree
                  </span>
                </label>
                <input
                  type="text"
                  {...register("degree", {
                    required: "Degree is required",
                  })}
                  className={`input input-bordered w-full focus:input-primary ${
                    errors.degree ? "input-error" : ""
                  }`}
                  placeholder="Enter degree level"
                />
                {errors.degree && (
                  <label className="label">
                    <span className="label-text-alt text-error">
                      {errors.degree.message}
                    </span>
                  </label>
                )}
              </motion.div>

              {/* Tuition Fees */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 1.2 }}
              >
                <label className="label">
                  <span className="label-text font-medium text-neutral">
                    Tuition Fees
                  </span>
                </label>
                <input
                  type="text"
                  {...register("tuitionFees")}
                  className="input input-bordered w-full focus:input-primary"
                  placeholder="Enter tuition fees"
                />
              </motion.div>

              {/* Appication Fee Name */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4 }}
              >
                <label className="label">
                  <span className="label-text font-medium text-neutral">
                    Application Fee
                  </span>
                </label>
                <input
                  type="text"
                  {...register("applicationFee", {
                    required: "Application fee is required",
                  })}
                  className={`input input-bordered w-full focus:input-primary ${
                    errors.applicationFee ? "input-error" : ""
                  }`}
                  placeholder="Enter Application fee"
                />
                {errors.applicationFee && (
                  <label className="label">
                    <span className="label-text-alt text-error">
                      {errors.applicationFee.message}
                    </span>
                  </label>
                )}
              </motion.div>

            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.3 }}
              className="mt-8 flex justify-end"
            >
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                type="submit"
                className="btn btn-primary text-white px-8"
              >
                Add Scholarship
              </motion.button>
            </motion.div>
          </form>
        </motion.div>
      </div>
    </div>
  );
};

export default AddScholarship;
