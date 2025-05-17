import { useFormContext } from "react-hook-form"
import { CreditCard, Hash, Ticket } from "lucide-react"

const TicketDetailsForm = () => {
  const {
    register,
    formState: { errors },
  } = useFormContext()

  return (
    <div className="space-y-8">
      <div className="bg-[#F9F7FF] p-6 rounded-xl border border-[#E6E0FF]">
        <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
          <Ticket size={20} className="mr-2 text-[#5C3BFE]" /> VIP Ticket
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="flex items-center text-sm font-medium text-gray-700">
              <CreditCard size={18} className="mr-2 text-[#5C3BFE]" /> Price (₹)
            </label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">₹</span>
              <input
                type="number"
                step="0.01"
                {...register("tickets.VIP.price", { valueAsNumber: true })}
                className="w-full pl-8 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#5C3BFE]/50 focus:border-[#5C3BFE] outline-none transition-all"
                placeholder="0.00"
              />
            </div>
            {errors.tickets?.VIP?.price && (
              <p className="text-red-500 text-sm mt-1">{errors.tickets.VIP.price.message}</p>
            )}
          </div>
          <div className="space-y-2">
            <label className="flex items-center text-sm font-medium text-gray-700">
              <Hash size={18} className="mr-2 text-[#5C3BFE]" /> Quantity
            </label>
            <input
              type="number"
              {...register("tickets.VIP.quantity", { valueAsNumber: true })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#5C3BFE]/50 focus:border-[#5C3BFE] outline-none transition-all"
              placeholder="0"
            />
            {errors.tickets?.VIP?.quantity && (
              <p className="text-red-500 text-sm mt-1">{errors.tickets.VIP.quantity.message}</p>
            )}
          </div>
        </div>
      </div>

      <div className="bg-[#F9F7FF] p-6 rounded-xl border border-[#E6E0FF]">
        <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
          <Ticket size={20} className="mr-2 text-[#5C3BFE]" /> General Tickets
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="flex items-center text-sm font-medium text-gray-700">
              <CreditCard size={18} className="mr-2 text-[#5C3BFE]" /> Price (₹)
            </label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">₹</span>
              <input
                type="number"
                step="0.01"
                {...register("tickets.general.price", { valueAsNumber: true })}
                className="w-full pl-8 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#5C3BFE]/50 focus:border-[#5C3BFE] outline-none transition-all"
                placeholder="0.00"
              />
            </div>
            {errors.tickets?.general?.price && (
              <p className="text-red-500 text-sm mt-1">{errors.tickets.general.price.message}</p>
            )}
          </div>
          <div className="space-y-2">
            <label className="flex items-center text-sm font-medium text-gray-700">
              <Hash size={18} className="mr-2 text-[#5C3BFE]" /> Quantity
            </label>
            <input
              type="number"
              {...register("tickets.general.quantity", { valueAsNumber: true })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#5C3BFE]/50 focus:border-[#5C3BFE] outline-none transition-all"
              placeholder="0"
            />
            {errors.tickets?.general?.quantity && (
              <p className="text-red-500 text-sm mt-1">{errors.tickets.general.quantity.message}</p>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default TicketDetailsForm
