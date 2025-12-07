import { useState, useEffect, useRef } from "react";
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import useAuth from "../../hooks/useAuth";
import { useNavigate } from "react-router";
import useAxiosSecure from "../../hooks/useAxiosSecure";

const Register = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    reset,
  } = useForm();

  const navigate = useNavigate();
  const [imageUrl, setImageUrl] = useState("");
  const widgetRef = useRef();
  const password = watch("password", "");
  const { registerUser, updateUserProfile } = useAuth();
  const axiosSecure = useAxiosSecure();

  // Password validation rules
  const passwordRegex =
    /^(?=.*[A-Z])(?=.*[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]).{6,}$/;

  // Dynamic password validation checks
  const passwordChecks = {
    minLength: password.length >= 6,
    hasCapital: /[A-Z]/.test(password),
    hasSpecial: /[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]/.test(password),
  };

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
    registerUser(data.email, data.password)
      .then((result) => {

        // saving data to database
        const userInfo = {
          email: data.email,
          displayName: data.name, 
          photoURL: imageUrl
        }

        axiosSecure.post("/users", userInfo)
        .then(res => {
          if(res.data.insertedId){
            console.log("User added in the database");
          }
        })

        const userProfile = {
          displayName: data.name,
          photoURL: imageUrl || "",
        };

        return updateUserProfile(result.user, userProfile);
      })
      .then(() => {
        console.log("User profile updated successfully!");
        reset();
        setImageUrl("");
        navigate("/login");
      })
      .catch((error) => {
        console.error("Registration/Update error:", error);
      });
  };

  return (
    <div className="mt-4 md:min-h-screen flex items-center justify-center bg-base-200 px-4 md:py-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="w-full max-w-md"
      >
        <div className="bg-base-100 rounded-box shadow-lg p-8 border border-base-300">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-center mb-6"
          >
            <h1 className="text-3xl font-bold text-primary mb-2">
              ScholarStream
            </h1>
            <p className="text-neutral text-sm">
              Create your account to get started
            </p>
          </motion.div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
            >
              <label className="label">
                <span className="label-text font-medium">Full Name</span>
              </label>
              <input
                type="text"
                {...register("name", {
                  required: "Name is required",
                  minLength: {
                    value: 2,
                    message: "Name must be at least 2 characters",
                  },
                })}
                className={`input input-bordered w-full focus:input-primary ${
                  errors.name ? "input-error" : ""
                }`}
                placeholder="Enter your full name"
              />
              {errors.name && (
                <label className="label">
                  <span className="label-text-alt text-error">
                    {errors.name.message}
                  </span>
                </label>
              )}
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
            >
              <label className="label">
                <span className="label-text font-medium">Email</span>
              </label>
              <input
                type="email"
                {...register("email", {
                  required: "Email is required",
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: "Invalid email address",
                  },
                })}
                className={`input input-bordered w-full focus:input-primary ${
                  errors.email ? "input-error" : ""
                }`}
                placeholder="Enter your email"
              />
              {errors.email && (
                <label className="label">
                  <span className="label-text-alt text-error">
                    {errors.email.message}
                  </span>
                </label>
              )}
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5 }}
            >
              <label className="label">
                <span className="label-text font-medium">Password</span>
              </label>
              <input
                type="password"
                {...register("password", {
                  required: "Password is required",
                  pattern: {
                    value: passwordRegex,
                    message:
                      "Password must be at least 6 characters with a capital letter and special character",
                  },
                })}
                className={`input input-bordered w-full focus:input-primary ${
                  errors.password ? "input-error" : ""
                }`}
                placeholder="Create a password"
              />

              {/* Dynamic Password Validation */}
              {password && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  className="mt-2 space-y-1"
                >
                  <div className="text-xs space-y-1">
                    <div
                      className={`flex items-center gap-2 ${
                        passwordChecks.minLength
                          ? "text-secondary"
                          : "text-neutral"
                      }`}
                    >
                      <span
                        className={`${
                          passwordChecks.minLength ? "text-secondary" : ""
                        }`}
                      >
                        {passwordChecks.minLength ? "✓" : "○"}
                      </span>
                      <span>At least 6 characters</span>
                    </div>
                    <div
                      className={`flex items-center gap-2 ${
                        passwordChecks.hasCapital
                          ? "text-secondary"
                          : "text-neutral"
                      }`}
                    >
                      <span
                        className={`${
                          passwordChecks.hasCapital ? "text-secondary" : ""
                        }`}
                      >
                        {passwordChecks.hasCapital ? "✓" : "○"}
                      </span>
                      <span>One capital letter</span>
                    </div>
                    <div
                      className={`flex items-center gap-2 ${
                        passwordChecks.hasSpecial
                          ? "text-secondary"
                          : "text-neutral"
                      }`}
                    >
                      <span
                        className={`${
                          passwordChecks.hasSpecial ? "text-secondary" : ""
                        }`}
                      >
                        {passwordChecks.hasSpecial ? "✓" : "○"}
                      </span>
                      <span>One special character</span>
                    </div>
                  </div>
                </motion.div>
              )}

              {errors.password && (
                <label className="label">
                  <span className="label-text-alt text-error">
                    {errors.password.message}
                  </span>
                </label>
              )}
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.6 }}
            >
              <label className="label">
                <span className="label-text font-medium">Profile Image</span>
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
                    alt="Profile"
                    className="w-16 h-16 object-cover rounded-box border-2 border-primary"
                  />
                )}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.7 }}
              className="pt-2"
            >
              <button type="submit" className="btn btn-primary w-full">
                Create Account
              </button>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 }}
              className="text-center text-sm text-neutral"
            >
              Already have an account?{" "}
              <a href="/login" className="link link-primary font-medium">
                Sign in
              </a>
            </motion.div>
          </form>
        </div>
      </motion.div>
    </div>
  );
};

export default Register;
