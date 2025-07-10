const validateForm = (formData) => {
  const errors = {};

  if (!formData.name.trim()) {
    errors.name = "Name is required";
  } else if (formData.name.length < 3) {
    errors.name = "Name must be at least 3 characters long";
  }

  if (!formData.email.trim()) {
    errors.email = "Email is required";
  } else if (!/^\S+@\S+\.\S+$/.test(formData.email)) {
    errors.email = "Invalid email format";
  }

  if (!formData.password.trim()) {
    errors.password = "Password is required";
  } else if (formData.password.length < 6) {
    errors.password = "Password must be at least 6 characters";
  } else if (!/[A-Z]/.test(formData.password)) {
    errors.password = "Password must contain at least one uppercase letter";
  }

  if (formData.confirmPassword !== formData.password) {
    errors.confirmPassword = "Passwords do not match";
  }

  if (!formData.mobile) {
    errors.mobile = "Mobile number is required";
  } else if (!/^[0-9]{10}$/.test(formData.mobile)) {
    errors.mobile = "Mobile must be exactly 10 digits";
  }


  if (formData.referralCode && !/^[A-Za-z0-9]{6,10}$/.test(formData.referralCode)) {
    errors.referralCode = "Referral code must be 6–10 alphanumeric characters";
  }

  return errors;
};

export default validateForm;
