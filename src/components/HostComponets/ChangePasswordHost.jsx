import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../utils/api/api";
import { useDispatch } from "react-redux";
import { logOut } from "../../features/auth/authSlice";
import { toast } from "react-toastify";

const ChangePasswordHost = () => {
  const [formData, setFormData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { currentPassword, newPassword, confirmPassword } = formData;
    if (newPassword !== confirmPassword) {
      toast.error("New password and confirm password do not match ");
      return;
    }
    try {
      setLoading(true);
      await api.patch("/host/profile/update-password", {
        currentPassword,
        newPassword,
      });

      toast.success("Password updated successfully.Please Log in again");
      setFormData({
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
      });
      dispatch(logOut());
      navigate("/login");
    } catch (error) {
      toast.error(error.response?.dat?.message || "Failed to update password.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <h2>Change Password</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="password"
          name="currentPassword"
          placeholder="Current password"
          value={formData.currentPassword}
          onChange={handleChange}
          required
        />
        <input
          type="password"
          name="newPassword"
          placeholder="New Password"
          value={formData.newPassword}
          onChange={handleChange}
          required
        />
        <input
          type="password"
          name="confirmPassword"
          placeholder="confirm Password"
          value={formData.confirmPassword}
          onChange={handleChange}
          required
        />
        <button type="submit" disabled={loading}>
          {loading ? "Updating" : "Change Password"}
        </button>
      </form>
    </>
  );
};

export default ChangePasswordHost;
