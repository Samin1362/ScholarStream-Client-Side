import { useState } from "react";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useQuery, useQueryClient } from "@tanstack/react-query";
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import { FaTrashAlt } from "react-icons/fa";

const ManageUsers = () => {
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();
  const [isRoleModalOpen, setIsRoleModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [userToUpdate, setUserToUpdate] = useState(null);
  const [userToDelete, setUserToDelete] = useState(null);
  const [newRole, setNewRole] = useState("");

  const { data: users } = useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const res = await axiosSecure.get("users");
      return res.data;
    },
  });

  const handleRoleChange = (user, selectedRole) => {
    if (user.role === selectedRole) return; // No change needed

    setUserToUpdate(user);
    setNewRole(selectedRole);
    setIsRoleModalOpen(true);
  };

  const handleDelete = (user) => {
    setUserToDelete(user);
    setIsDeleteModalOpen(true);
  };

  const confirmDelete = async () => {
    if (!userToDelete) return;

    try {
      // Delete from database
      const res = await axiosSecure.delete(`/users/${userToDelete._id}`);

      if (res.data) {
        // Invalidate and refetch users to update the table
        queryClient.invalidateQueries({ queryKey: ["users"] });
        setIsDeleteModalOpen(false);
        setUserToDelete(null);
      }
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };

  const handleCloseDeleteModal = () => {
    setIsDeleteModalOpen(false);
    setUserToDelete(null);
  };

  const confirmRoleUpdate = async () => {
    if (!userToUpdate) return;

    try {
      const res = await axiosSecure.patch(`/users/${userToUpdate._id}`, {
        role: newRole,
      });

      if (res.data) {
        // Invalidate and refetch users
        queryClient.invalidateQueries({ queryKey: ["users"] });
        setIsRoleModalOpen(false);
        setUserToUpdate(null);
        setNewRole("");
      }
    } catch (error) {
      console.error("Error updating user role:", error);
    }
  };

  const handleCloseRoleModal = () => {
    setIsRoleModalOpen(false);
    setUserToUpdate(null);
    setNewRole("");
  };

  const getRoleButtonColor = (role) => {
    switch (role?.toLowerCase()) {
      case "admin":
        return "btn-error";
      case "moderator":
        return "btn-warning";
      case "student":
        return "btn-primary";
      default:
        return "btn-neutral";
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
            <div className="bg-gradient-to-r from-primary to-secondary p-6">
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
              >
                <h2 className="text-2xl font-bold text-white mb-1">
                  Manage Users
                </h2>
                <p className="text-white/80 text-sm">
                  View and manage all user accounts and roles
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
                    <th className="text-neutral font-semibold">Name</th>
                    <th className="text-neutral font-semibold">Email</th>
                    <th className="text-neutral font-semibold">Role</th>
                    <th className="text-neutral font-semibold">Created At</th>
                    <th className="text-neutral font-semibold">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {users && users.length > 0 ? (
                    users.map((user, index) => (
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
                                  src={user.photoURL}
                                  alt={user.displayName || "User"}
                                  className="object-cover"
                                />
                              </div>
                            </div>
                          </div>
                        </td>
                        <td>
                          <div className="font-semibold text-base-content">
                            {user.displayName || "N/A"}
                          </div>
                        </td>
                        <td>
                          <div className="text-neutral">{user.email}</div>
                        </td>
                        <td>
                          <div className="dropdown dropdown-end">
                            <div
                              tabIndex={0}
                              role="button"
                              className={`btn btn-sm ${getRoleButtonColor(
                                user.role
                              )} text-white font-medium`}
                            >
                              <span className="capitalize">
                                {user.role || "student"}
                              </span>
                              <svg
                                className="w-4 h-4 ml-1"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={2}
                                  d="M19 9l-7 7-7-7"
                                />
                              </svg>
                            </div>
                            <ul
                              tabIndex={0}
                              className="dropdown-content menu bg-base-100 rounded-box z-[1] w-40 p-2 shadow-lg border border-base-300 mt-2"
                            >
                              <li>
                                <button
                                  onClick={() =>
                                    handleRoleChange(user, "student")
                                  }
                                  className={`${
                                    user.role === "student"
                                      ? "bg-primary text-white"
                                      : ""
                                  }`}
                                >
                                  Student
                                </button>
                              </li>
                              <li>
                                <button
                                  onClick={() =>
                                    handleRoleChange(user, "moderator")
                                  }
                                  className={`${
                                    user.role === "moderator"
                                      ? "bg-warning text-white"
                                      : ""
                                  }`}
                                >
                                  Moderator
                                </button>
                              </li>
                              <li>
                                <button
                                  onClick={() =>
                                    handleRoleChange(user, "admin")
                                  }
                                  className={`${
                                    user.role === "admin"
                                      ? "bg-error text-white"
                                      : ""
                                  }`}
                                >
                                  Admin
                                </button>
                              </li>
                            </ul>
                          </div>
                        </td>
                        <td>
                          <div className="text-sm text-neutral">
                            {user.createdAt
                              ? new Date(user.createdAt).toLocaleDateString()
                              : "N/A"}
                          </div>
                        </td>
                        <td>
                          <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => handleDelete(user)}
                            className="btn btn-sm btn-error text-white"
                          >
                            <FaTrashAlt className="mr-1" /> Delete
                          </motion.button>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="7" className="text-center py-12">
                        <div className="text-neutral text-lg">
                          No users found
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

      {/* Role Change Confirmation Modal */}
      {isRoleModalOpen && (
        <dialog className="modal modal-open">
          <div className="modal-box">
            <h3 className="font-bold text-lg text-primary mb-4">
              Change User Role
            </h3>
            <p className="py-4">
              Are you sure you want to change{" "}
              <span className="font-semibold">
                {userToUpdate?.displayName || userToUpdate?.email}
              </span>
              's role from{" "}
              <span className="font-semibold text-primary">
                {userToUpdate?.role || "student"}
              </span>{" "}
              to <span className="font-semibold text-secondary">{newRole}</span>
              ?
            </p>
            <div className="modal-action">
              <button
                onClick={handleCloseRoleModal}
                className="btn btn-outline"
              >
                Cancel
              </button>
              <button
                onClick={confirmRoleUpdate}
                className="btn btn-primary text-white"
              >
                Confirm
              </button>
            </div>
          </div>
          <form method="dialog" className="modal-backdrop">
            <button onClick={handleCloseRoleModal}>close</button>
          </form>
        </dialog>
      )}

      {/* Delete Confirmation Modal */}
      {isDeleteModalOpen && (
        <dialog className="modal modal-open">
          <div className="modal-box">
            <h3 className="font-bold text-lg text-error mb-4">Delete User</h3>
            <p className="py-4">
              Are you sure you want to delete{" "}
              <span className="font-semibold">
                {userToDelete?.displayName || userToDelete?.email}
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

export default ManageUsers;
