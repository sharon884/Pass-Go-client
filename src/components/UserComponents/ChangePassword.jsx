import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../utils/api/api";
import { useDispatch } from "react-redux";
import { logOut } from "../../features/auth/authSlice";
import { toast } from "react-toastify";

const ChangePassword = () => {
  const [formData, setFormData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { currentPassword, newPassword, confirmPassword } = formData;
    if (newPassword !== confirmPassword) {
      toast.error("New password and confirm password do not match");
      return;
    }

    try {
      setLoading(true);
      await api.patch("/user/profile/update-password", {
        currentPassword,
        newPassword,
      });
      toast.success("Password updated successfully. Please log in again.");
      dispatch(logOut());
      setFormData({
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
      });
      navigate("/login");
    } catch (error) {
        console.log(error);
      toast.error(
        error.response?.data?.message || "Failed to update password."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h2>Change Password </h2>
      <form onSubmit={handleSubmit}>
        <input
          type="password"
          name="currentPassword"
          placeholder="Current Password"
          value={formData.currentPassword}
          onChange={handleChange}
          required
        />
        <input
          type="password"
          name="newPassword"
          value={formData.newPassword}
          placeholder="New Password"
          onChange={handleChange}
          required
        />
        <input
          type="password"
          name="confirmPassword"
          placeholder="Confirm New Password"
          value={formData.confirmPassword}
          onChange={handleChange}
          required
        />
        <button type="submit" disabled={loading}>
          {loading ? "Updating" : "ChangePassword"}
        </button>
      </form>
    </div>
  );
};

export default ChangePassword;
