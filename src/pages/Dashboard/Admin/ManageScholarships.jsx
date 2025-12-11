import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { FaEdit, FaTrashAlt } from "react-icons/fa";
import { useState, useEffect, useRef } from "react";
import { useForm } from "react-hook-form";
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";

const ManageScholarships = () => {
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedScholarship, setSelectedScholarship] = useState(null);
  const [scholarshipToDelete, setScholarshipToDelete] = useState(null);
  const [imageUrl, setImageUrl] = useState("");
  const widgetRef = useRef();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
  } = useForm();

  const { data: scholarships } = useQuery({
    queryKey: ["scholarships"],
    queryFn: async () => {
      const res = await axiosSecure.get("scholarships");
      return res.data;
    },
  });

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

  const handleEdit = (scholarship) => {
    setSelectedScholarship(scholarship);
    setImageUrl(scholarship.image || "");
    setIsModalOpen(true);

    // Pre-fill form with existing data
    setValue("scholarshipName", scholarship.scholarshipName || "");
    setValue("universityName", scholarship.universityName || "");
    setValue("country", scholarship.country || "");
    setValue("city", scholarship.city || "");
    setValue("degree", scholarship.degree || "");
    setValue("scholarshipCategory", scholarship.scholarshipCategory || "");
    setValue("subjectCategory", scholarship.subjectCategory || "");
    setValue("worldRank", scholarship.worldRank || "");
    setValue("tuitionFees", scholarship.tuitionFees || "");
    setValue("applicationFee", scholarship.applicationFee || "");
  };

  const handleDelete = (scholarship) => {
    setScholarshipToDelete(scholarship);
    setIsDeleteModalOpen(true);
  };

  const confirmDelete = async () => {
    if (!scholarshipToDelete) return;

    try {
      const res = await axiosSecure.delete(
        `/scholarships/${scholarshipToDelete._id}`
      );

      if (res.data.success) {
        // Invalidate and refetch scholarships to update the table
        queryClient.invalidateQueries({ queryKey: ["scholarships"] });
        setIsDeleteModalOpen(false);
        setScholarshipToDelete(null);
      } else {
        console.error("Failed to delete scholarship:", res.data.message);
      }
    } catch (error) {
      console.error("Error deleting scholarship:", error);
    }
  };

  const handleCloseDeleteModal = () => {
    setIsDeleteModalOpen(false);
    setScholarshipToDelete(null);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedScholarship(null);
    setImageUrl("");
    reset();
  };

  const onSubmit = async (data) => {
    if (!selectedScholarship) return;

    const updatedFields = {
      scholarshipName: data.scholarshipName,
      universityName: data.universityName,
      country: data.country,
      city: data.city,
      degree: data.degree,
      scholarshipCategory: data.scholarshipCategory,
      subjectCategory: data.subjectCategory,
      worldRank: data.worldRank,
      tuitionFees: data.tuitionFees,
      applicationFee: data.applicationFee,
    };

    // Only include image if it was updated
    if (imageUrl && imageUrl !== selectedScholarship.image) {
      updatedFields.image = imageUrl;
    }

    try {
      const res = await axiosSecure.patch(
        `/scholarships/${selectedScholarship._id}`,
        updatedFields
      );

      if (res.data) {
        // Invalidate and refetch scholarships
        queryClient.invalidateQueries({ queryKey: ["scholarships"] });
        handleCloseModal();
      }
    } catch (error) {
      console.error("Error updating scholarship:", error);
    }
  };

  return (
    <>
      <div className="min-h-screen bg-base-200 py-8 px-4">
        <div className="container mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="bg-base-100 rounded-box shadow-lg border border-base-300 overflow-hidden"
          >
            {/* Table Header */}
            <div className="bg-linear-to-r from-primary to-secondary p-6">
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
              >
                <h2 className="text-2xl font-bold text-white mb-1">
                  Manage Scholarships
                </h2>
                <p className="text-white/80 text-sm">
                  View and manage all scholarship opportunities
                </p>
              </motion.div>
            </div>

            {/* Table Container */}
            <div className="overflow-x-auto">
              <table className="table">
                {/* Table Head */}
                <thead className="bg-base-200">
                  <tr>
                    <th className="text-neutral font-semibold">#</th>
                    <th className="text-neutral font-semibold">Image</th>
                    <th className="text-neutral font-semibold">
                      Scholarship Name
                    </th>
                    <th className="text-neutral font-semibold">
                      University Name
                    </th>
                    <th className="text-neutral font-semibold">Address</th>
                    <th className="text-neutral font-semibold">Degree</th>
                    <th className="text-neutral font-semibold">
                      Scholarship Category
                    </th>
                    <th className="text-neutral font-semibold">
                      Subject Category
                    </th>
                    <th className="text-neutral font-semibold">
                      World Ranking
                    </th>
                    <th className="text-neutral font-semibold">Tuition Fees</th>
                    <th className="text-neutral font-semibold">
                      Application Fees
                    </th>
                    <th className="text-neutral font-semibold">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {scholarships && scholarships.length > 0 ? (
                    scholarships.map((scholarship, index) => (
                      <tr
                        key={index}
                        className="hover:bg-base-200 transition-colors duration-200 border-b border-base-300"
                      >
                        <td className="font-medium text-neutral">
                          {index + 1}
                        </td>
                        <td>
                          <div className="flex items-center gap-3">
                            <div className="avatar">
                              <div className="mask mask-squircle w-14 h-14 ring-2 ring-primary ring-offset-2 ring-offset-base-100">
                                <img
                                  src={scholarship.image}
                                  alt={scholarship.scholarshipName}
                                  className="object-cover"
                                />
                              </div>
                            </div>
                          </div>
                        </td>
                        <td>
                          <div className="font-semibold text-base-content">
                            {scholarship.scholarshipName}
                          </div>
                        </td>
                        <td>
                          <div className="text-neutral">
                            {scholarship.universityName}
                          </div>
                        </td>
                        <td>
                          <div className="text-sm text-neutral">
                            {scholarship.city}, {scholarship.country}
                          </div>
                        </td>
                        <td>
                          <span className="badge badge-outline badge-primary">
                            {scholarship.degree}
                          </span>
                        </td>
                        <td>
                          <span className="badge badge-secondary badge-outline">
                            {scholarship.scholarshipCategory}
                          </span>
                        </td>
                        <td>
                          <span className="badge badge-accent badge-outline">
                            {scholarship.subjectCategory}
                          </span>
                        </td>
                        <td>
                          <div className="font-medium text-primary">
                            {scholarship.worldRank || "N/A"}
                          </div>
                        </td>
                        <td>
                          <div className="text-neutral font-medium">
                            {scholarship.tuitionFees || "N/A"}
                          </div>
                        </td>
                        <td>
                          <div className="text-neutral font-medium">
                            {scholarship.applicationFee || "N/A"}
                          </div>
                        </td>
                        <td>
                          <div className="flex items-center gap-2">
                            <motion.button
                              whileHover={{ scale: 1.05 }}
                              whileTap={{ scale: 0.95 }}
                              onClick={() => handleEdit(scholarship)}
                              className="btn btn-sm btn-primary text-white"
                            >
                              <FaEdit className="mr-1" /> Edit
                            </motion.button>
                            <motion.button
                              whileHover={{ scale: 1.05 }}
                              whileTap={{ scale: 0.95 }}
                              onClick={() => handleDelete(scholarship)}
                              className="btn btn-sm btn-error text-white"
                            >
                              <FaTrashAlt className="mr-1" /> Delete
                            </motion.button>
                          </div>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="12" className="text-center py-12">
                        <div className="text-neutral text-lg">
                          No scholarships found
                        </div>
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Edit Modal */}
      {isModalOpen && (
        <dialog className="modal modal-open">
          <div className="modal-box max-w-5xl max-h-[90vh] overflow-y-auto">
            <form method="dialog">
              <button
                onClick={handleCloseModal}
                className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
              >
                ✕
              </button>
            </form>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="p-4"
            >
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="mb-6"
              >
                <h1 className="text-3xl font-bold text-primary mb-2">
                  Edit Scholarship
                </h1>
                <p className="text-neutral text-sm">
                  Update the scholarship details below
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

                  {/* Application Fee */}
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 1.3 }}
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
                  transition={{ delay: 1.4 }}
                  className="mt-8 flex justify-end gap-4"
                >
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    type="button"
                    onClick={handleCloseModal}
                    className="btn btn-outline px-8"
                  >
                    Cancel
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    type="submit"
                    className="btn btn-primary text-white px-8"
                  >
                    Update Scholarship
                  </motion.button>
                </motion.div>
              </form>
            </motion.div>
          </div>
          <form method="dialog" className="modal-backdrop">
            <button onClick={handleCloseModal}>close</button>
          </form>
        </dialog>
      )}

      {/* Delete Confirmation Modal */}
      {isDeleteModalOpen && (
        <dialog className="modal modal-open">
          <div className="modal-box">
            <h3 className="font-bold text-lg text-error mb-4">
              Delete Scholarship
            </h3>
            <p className="py-4">
              Are you sure you want to delete{" "}
              <span className="font-semibold">
                {scholarshipToDelete?.scholarshipName}
              </span>
              ? This action cannot be undone.
            </p>
            <div className="modal-action">
              <button
                onClick={handleCloseDeleteModal}
                className="btn btn-outline"
              >
                Cancel
              </button>
              <button
                onClick={confirmDelete}
                className="btn btn-error text-white"
              >
                Delete
              </button>
            </div>
          </div>
          <form method="dialog" className="modal-backdrop">
            <button onClick={handleCloseDeleteModal}>close</button>
          </form>
        </dialog>
      )}
    </>
  );
};

export default ManageScholarships;
