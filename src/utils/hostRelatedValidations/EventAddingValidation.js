import { z } from "zod";

export const eventValidationSchema = z.object({
  title: z.string().min(1, { message: "Title is required" }).trim(),
  description: z.string().min(1, { message: "Description is required" }).trim(),
  category: z
    .string()
    .refine((val) => ["Music", "Art", "Fashion", "Motosports"].includes(val), {
      message: "Invalid category, please choose a valid one",
    }),

  // images: z.preprocess(
  //   (val) => (val instanceof FileList ? Array.from(val) : []),
  //   z
  //     .array(z.string().url())
  //     .min(3, { message: "Atleast 3 images are required" })
  //     .max(10, { message: "You can upload a maximum of 10 images" })
  // ),
images : z.array(z.string().url()).min(3, { message :"At least 3 images are required" }).max(10,{message : "you can upload a maximum of 10 images"}),
  location: z.string().min(1, { message: "Location is required" }),

  // date: z
  //   .preprocess((val) => (val instanceof Date ? val : new Date(val)), z.date())
  //   .refine((date) => date > new Date(), {
  //     message: "Event date must be in the future",
  //   }),
  date : z.string().refine((val)=> {const date = new Date(val);  return date > new Date },  {
    message: "Event date must be in the future",
  }),
  time: z
    .string()
    .regex(
      /^([01]\d|2[0-3]):([0-5]\d)$/,
      "Please provide a valid time in HH:MM format"
    ),
    eventType: z.enum(["free", "paid_stage_with_seats", "paid_stage_without_seats"], {
    required_error: "Event type is required"
  }),

  layoutId: z.string().optional().refine((val, ctx) => {
    if (ctx?.parent?.eventType === "paid_stage_with_seats" && !val) {
      return false;
    }
    return true;
  }, {
    message: "Stage layout is required for events with seats"
  }),
  tickets: z.object({
    VIP: z.object({
      price: z
        .number({ invalid_type_error: "VIP price must be a number" })
        .positive({ message: "VIP price must be greater than 0" }),
      quantity: z
        .number({ invalid_type_error: "VIP Quantity must be a number" })
        .int()
        .positive({ message: "VIP quatity must be greater than 0" }),
    }),
    general: z.object({
      price: z
        .number({ invalid_type_error: "General price must be a number" })
        .positive({ message: "General price must be greater than 0" }),
      quantity: z
        .number({ invalid_type_error: "General Price must be a number" })
        .positive({ message: "General price must be greater than 0" }),
    }),
  }),
  businessInfo: z.object({
    name: z.string().min(1, { message: "Bussiness name is requrired" }),
    organization_name: z
      .string()
      .min(1,{ message: "organization name is required" }),
    email: z.string().email({ message: "Invalid email addresss" }),
    mobile: z
      .string()
      .regex(/^\d{10}$/, {
        message: "Mobile number must be exactly 10 digits",
      }),
  }),
});

export default eventValidationSchema;
