import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import API from "../../api/axios";
import { useToast } from "../../context/ToastContext";

const ResetPassword = () => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const { token } = useParams(); // URL se token nikalega
  const { showToast } = useToast();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword)
      return showToast("Passwords do not match", "error");

    try {
      await API.put(`/users/password/reset/${token}`, { password });
      showToast("Password Reset Successfully! Login Now.", "success");
      navigate("/login");
    } catch (error) {
      showToast(
        error.response?.data?.message || "Invalid or Expired Token",
        "error"
      );
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#fdfbf7]">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-[30px] shadow-xl w-full max-w-md border border-[#4a3b2a]/5"
      >
        <h2 className="text-2xl font-playfair font-bold text-[#4a3b2a] mb-6">
          Reset Password
        </h2>

        <div className="relative mb-4">
          <input
            type={showPassword ? "text" : "password"}
            placeholder="New Password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-3 pr-12 border rounded-xl outline-none"
          />

          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-[#4a3b2a]"
          >
            <i className={showPassword ? "ri-eye-off-line" : "ri-eye-line"} />
          </button>
        </div>
        <div className="relative mb-6">
          <input
            type={showConfirmPassword ? "text" : "password"}
            placeholder="Confirm Password"
            required
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="w-full p-3 pr-12 border rounded-xl outline-none"
          />

          <button
            type="button"
            onClick={() =>
              setShowConfirmPassword(!showConfirmPassword)
            }
            className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-[#4a3b2a]"
          >
            <i
              className={
                showConfirmPassword
                  ? "ri-eye-off-line"
                  : "ri-eye-line"
              }
            />
          </button>
        </div>
        <button
          type="submit"
          className="w-full bg-[#4a3b2a] text-white py-3 rounded-xl font-bold uppercase hover:bg-[#d4a017]"
        >
          Change Password
        </button>
      </form>
    </div>
  );
};

export default ResetPassword;
