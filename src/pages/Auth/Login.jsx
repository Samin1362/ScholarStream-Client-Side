// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import useAuth from "../../hooks/useAuth";
import { useNavigate } from "react-router";

const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const { signInUser } = useAuth();
  const navigate = useNavigate();

  const onSubmit = (data) => {
    signInUser(data.email, data.password)
      .then(() => {
        console.log("User signed in successfully!");
        navigate("/");
      })
      .catch((error) => {
        console.error("Sign in error:", error);
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
              Welcome back! Sign in to continue
            </p>
          </motion.div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
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
              transition={{ delay: 0.4 }}
            >
              <label className="label">
                <span className="label-text font-medium">Password</span>
              </label>
              <input
                type="password"
                {...register("password", {
                  required: "Password is required",
                })}
                className={`input input-bordered w-full focus:input-primary ${
                  errors.password ? "input-error" : ""
                }`}
                placeholder="Enter your password"
              />
              <label className="label">
                <a href="#" className="label-text-alt link link-primary">
                  Forgot password?
                </a>
              </label>
              {errors.password && (
                <label className="label">
                  <span className="label-text-alt text-error">
                    {errors.password.message}
                  </span>
                </label>
              )}
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="pt-2"
            >
              <button type="submit" className="btn btn-primary w-full">
                Sign In
              </button>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
              className="text-center text-sm text-neutral"
            >
              Don't have an account?{" "}
              <a href="/register" className="link link-primary font-medium">
                Sign up
              </a>
            </motion.div>
          </form>
        </div>
      </motion.div>
    </div>
  );
};

export default Login;
