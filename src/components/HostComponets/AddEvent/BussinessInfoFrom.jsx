import React from "react";
import { useFormContext } from "react-hook-form";

const BussinessInfoForm = () => {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  return (
    <div>
      <div>
        <label>Bussiness Name(for contacting users)</label>
        <input type="text" {...register("businessInfo.name")} />
        {errors.businessInfo?.name && <p>{errors.businessInfo.name.message}</p>}
      </div>
      <div>
        <label>Oraganization Name </label>
        <input type="text" {...register("businessInfo.organization_name")} />
        {errors.businessInfo?.organization_name && (
          <p>{errors.businessInfo.organization_name.message}</p>
        )}
      </div>
      <div>
        <label>Email</label>
        <input type="email" {...register("businessInfo.email")} />
        {errors.businessInfo?.email && (
          <p>{errors.businessInfo.email.message}</p>
        )}
      </div>

      <div>
        <label>Mobile</label>
        <input type="text" {...register("businessInfo.mobile")} />
        {errors.businessInfo?.mobile && (
          <p>{errors.businessInfo.mobile.message}</p>
        )}
      </div>
    </div>
  );
};

export default BussinessInfoForm;
