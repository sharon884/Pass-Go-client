"use client";

import { useState } from "react";
import api from "../../utils/api/api";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { validatePassword } from "../../utils/validators/passwordValidation";

function NewPasswordModal({ id, role, onClose }) {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async () => {
    setError("");

    // Use imported validatePassword
    const validationMessage = validatePassword(password);
    if (validationMessage) {
      setError(validationMessage);
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    setIsSubmitting(true);

    try {
      let endPoint = "";
      if (role === "user") {
        endPoint = "/user/auth/reset-password";
      } else if (role === "host") {
        endPoint = "/host/auth/reset-password";
      }

      const response = await api.post(endPoint, { id, password });

      if (response.data.success) {
        toast.success(response.data.message || "Password reset successful. Log in now!");
        navigate("/login");
        onClose();
      } else {
        setError("Something went wrong");
      }
    } catch (error) {
      console.log(error);
      setError(error.response?.data?.message || "Something went wrong");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl shadow-lg p-6 w-full max-w-md mx-auto">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">Reset Password</h2>

        <div className="space-y-4 mb-6">
          <div>
            <input
              type="password"
              placeholder="New Password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                setError("");
              }}
              className="w-full p-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-[#4F3DFF]"
            />
          </div>

          <div>
            <input
              type="password"
              placeholder="Confirm Password"
              value={confirmPassword}
              onChange={(e) => {
                setConfirmPassword(e.target.value);
                setError("");
              }}
              className="w-full p-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-[#4F3DFF]"
            />
          </div>

          {error && (
            <div className="p-3 bg-red-50 border border-red-100 rounded-lg">
              <p className="text-red-500 text-sm">{error}</p>
            </div>
          )}
        </div>

        <div className="grid grid-cols-2 gap-4">
          <button
            onClick={handleSubmit}
            disabled={isSubmitting}
            className="py-3 px-4 bg-[#4F3DFF] text-white rounded-lg font-medium hover:bg-[#4F3DFF]/90 transition-colors disabled:opacity-70"
          >
            {isSubmitting ? "Resetting..." : "Reset Password"}
          </button>
          <button
            onClick={onClose}
            disabled={isSubmitting}
            className="py-3 px-4 bg-gray-100 text-gray-700 rounded-lg font-medium hover:bg-gray-200 transition-colors disabled:opacity-70"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}

export default NewPasswordModal;
