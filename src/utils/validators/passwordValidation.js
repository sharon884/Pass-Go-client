export const validatePassword = (password) => {
  if (!password.trim()) {
    return "Password is required";
  } else if (password.length < 6) {
    return "Password must be at least 6 characters";
  } else if (!/[A-Z]/.test(password)) {
    return "Password must contain at least one uppercase letter";
  }
  return "";
};
