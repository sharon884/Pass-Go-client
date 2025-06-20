import { useFormContext } from "react-hook-form"
import { AtSign, Building, Phone, User } from "lucide-react"

const BussinessInfoForm = () => {
  const {
    register,
    formState: { errors },
  } = useFormContext()

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <label className="flex items-center text-sm font-medium text-gray-700">
          <User size={18} className="mr-2 text-[#5C3BFE]" /> Business Name (for contacting users)
        </label>
        <input
          type="text"
          {...register("businessInfo.name")}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#5C3BFE]/50 focus:border-[#5C3BFE] outline-none transition-all"
          placeholder="Your business name"
        />
        {errors.businessInfo?.name && <p className="text-red-500 text-sm mt-1">{errors.businessInfo.name.message}</p>}
      </div>

      <div className="space-y-2">
        <label className="flex items-center text-sm font-medium text-gray-700">
          <Building size={18} className="mr-2 text-[#5C3BFE]" /> Organization Name
        </label>
        <input
          type="text"
          {...register("businessInfo.organization_name")}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#5C3BFE]/50 focus:border-[#5C3BFE] outline-none transition-all"
          placeholder="Your organization name"
        />
        {errors.businessInfo?.organization_name && (
          <p className="text-red-500 text-sm mt-1">{errors.businessInfo.organization_name.message}</p>
        )}
      </div>

      <div className="space-y-2">
        <label className="flex items-center text-sm font-medium text-gray-700">
          <AtSign size={18} className="mr-2 text-[#5C3BFE]" /> Email
        </label>
        <input
          type="email"
          {...register("businessInfo.email")}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#5C3BFE]/50 focus:border-[#5C3BFE] outline-none transition-all"
          placeholder="contact@yourbusiness.com"
        />
        {errors.businessInfo?.email && <p className="text-red-500 text-sm mt-1">{errors.businessInfo.email.message}</p>}
      </div>

      <div className="space-y-2">
        <label className="flex items-center text-sm font-medium text-gray-700">
          <Phone size={18} className="mr-2 text-[#5C3BFE]" /> Mobile
        </label>
        <input
          type="text"
          {...register("businessInfo.mobile")}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#5C3BFE]/50 focus:border-[#5C3BFE] outline-none transition-all"
          placeholder="+91 1234567890"
        />
        {errors.businessInfo?.mobile && (
          <p className="text-red-500 text-sm mt-1">{errors.businessInfo.mobile.message}</p>
        )}
      </div>
    </div>
  )
}

export default BussinessInfoForm
