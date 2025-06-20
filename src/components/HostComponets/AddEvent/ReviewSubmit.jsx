"use client"
import { useFormContext } from "react-hook-form"
import { Building, Calendar, Clock, Edit, MapPin, Tag, Ticket, User, Phone } from "lucide-react"

function ReviewSubmit({ goToStep }) {
  const { getValues } = useFormContext()
  const data = getValues()

  const formatDate = (dateString) => {
    if (!dateString) return ""
    const date = new Date(dateString)
    return date.toLocaleDateString("en-IN", {
      year: "numeric",
      month: "long",
      day: "numeric",
    })
  }

  return (
    <div className="space-y-8">
      <h3 className="text-xl font-bold text-center text-gray-800 mb-6">Review Your Event Details</h3>

      <section className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
        <div className="flex justify-between items-center mb-4">
          <h4 className="text-lg font-semibold text-gray-800 flex items-center">
            <Ticket className="mr-2 text-[#5C3BFE]" size={20} /> Event Details
          </h4>
          <button
            onClick={() => goToStep(0)}
            className="text-[#5C3BFE] hover:text-[#4C2BEE] flex items-center text-sm font-medium"
          >
            <Edit size={16} className="mr-1" /> Edit
          </button>
        </div>

        <div className="space-y-3 text-gray-700">
          <h2 className="text-xl font-bold text-gray-900">{data.title}</h2>

          <div className="flex items-start gap-2">
            <Tag size={18} className="text-[#5C3BFE] mt-1 flex-shrink-0" />
            <p>
              <span className="font-medium">Category:</span> {data.category}
            </p>
          </div>

          <div className="flex items-start gap-2">
            <MapPin size={18} className="text-[#5C3BFE] mt-1 flex-shrink-0" />
            <p>
              <span className="font-medium">Location:</span> {data.location}
            </p>
          </div>

          <div className="flex flex-wrap gap-4">
            <div className="flex items-center gap-2">
              <Calendar size={18} className="text-[#5C3BFE]" />
              <p>
                <span className="font-medium">Date:</span> {formatDate(data.date)}
              </p>
            </div>

            <div className="flex items-center gap-2">
              <Clock size={18} className="text-[#5C3BFE]" />
              <p>
                <span className="font-medium">Time:</span> {data.time}
              </p>
            </div>
          </div>

          <div className="mt-4">
            <p className="font-medium mb-2">Description:</p>
            <p className="text-gray-600 whitespace-pre-line">{data.description}</p>
          </div>
        </div>

        {data.images?.length > 0 && (
          <div className="mt-4">
            <p className="font-medium mb-2">Images:</p>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mt-2">
              {data.images.map((url, index) => (
                <div key={index} className="aspect-video rounded-md overflow-hidden shadow-sm">
                  <img
                    src={url || "/placeholder.svg"}
                    alt={`Event ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                </div>
              ))}
            </div>
          </div>
        )}
      </section>

      <section className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
        <div className="flex justify-between items-center mb-4">
          <h4 className="text-lg font-semibold text-gray-800 flex items-center">
            <Ticket className="mr-2 text-[#5C3BFE]" size={20} /> Ticket Details
          </h4>
          <button
            onClick={() => goToStep(1)}
            className="text-[#5C3BFE] hover:text-[#4C2BEE] flex items-center text-sm font-medium"
          >
            <Edit size={16} className="mr-1" /> Edit
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-[#F9F7FF] p-4 rounded-lg">
            <h5 className="font-medium text-gray-800 mb-2">VIP Tickets</h5>
            <div className="space-y-2">
              <p>
                <span className="font-medium">Price:</span> ₹{data.tickets?.VIP?.price}
              </p>
              <p>
                <span className="font-medium">Quantity:</span> {data.tickets?.VIP?.quantity}
              </p>
              <p className="text-sm text-gray-500">
                Total value: ₹{(data.tickets?.VIP?.price || 0) * (data.tickets?.VIP?.quantity || 0)}
              </p>
            </div>
          </div>

          <div className="bg-[#F9F7FF] p-4 rounded-lg">
            <h5 className="font-medium text-gray-800 mb-2">General Tickets</h5>
            <div className="space-y-2">
              <p>
                <span className="font-medium">Price:</span> ₹{data.tickets?.general?.price}
              </p>
              <p>
                <span className="font-medium">Quantity:</span> {data.tickets?.general?.quantity}
              </p>
              <p className="text-sm text-gray-500">
                Total value: ₹{(data.tickets?.general?.price || 0) * (data.tickets?.general?.quantity || 0)}
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
        <div className="flex justify-between items-center mb-4">
          <h4 className="text-lg font-semibold text-gray-800 flex items-center">
            <Building className="mr-2 text-[#5C3BFE]" size={20} /> Business Info
          </h4>
          <button
            onClick={() => goToStep(2)}
            className="text-[#5C3BFE] hover:text-[#4C2BEE] flex items-center text-sm font-medium"
          >
            <Edit size={16} className="mr-1" /> Edit
          </button>
        </div>

        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <User size={18} className="text-[#5C3BFE]" />
            <p>
              <span className="font-medium">Name:</span> {data.businessInfo?.name}
            </p>
          </div>

          {data.businessInfo?.organization_name && (
            <div className="flex items-center gap-2">
              <Building size={18} className="text-[#5C3BFE]" />
              <p>
                <span className="font-medium">Organization:</span> {data.businessInfo?.organization_name}
              </p>
            </div>
          )}

          <div className="flex items-center gap-2">
            <MapPin size={18} className="text-[#5C3BFE]" />
            <p>
              <span className="font-medium">Email:</span> {data.businessInfo?.email}
            </p>
          </div>

          <div className="flex items-center gap-2">
            <Phone size={18} className="text-[#5C3BFE]" />
            <p>
              <span className="font-medium">Mobile:</span> {data.businessInfo?.mobile}
            </p>
          </div>
        </div>
      </section>

      <div className="bg-[#F9F7FF] p-4 rounded-lg border border-[#E6E0FF] mt-6">
        <p className="text-center text-gray-700 italic">Please verify all information before submitting the event.</p>
      </div>
    </div>
  )
}

export default ReviewSubmit
