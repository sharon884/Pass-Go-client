import { z } from "zod";

// Zod validation schema
const eventValidationSchema = z.object({
  title: z
    .string()
    .min(1, { message: "Event title is required" })
    .trim(),
  description: z
    .string()
    .min(1, { message: "Event description is required" })
    .trim(),
  category: z
    .string()
    .min(1, { message: "Event category is required" })
    .refine(
      (val) => ["Music", "Art", "Fashion", "Motosports"].includes(val),
      {
        message: "Invalid category, please choose a valid one",
      }
    ),
  images: z
    .array(z.instanceof(File)) // Ensuring that the images are actual files
    .min(3, { message: "At least 3 images are required" })
    .max(10, { message: "A maximum of 10 images are allowed" }),
  location: z.string().min(1, { message: "Location is required" }),
  date: z
    .date()
    .refine((date) => date > new Date(), {
      message: "Event date must be in the future",
    }),
  time: z
    .string()
    .regex(/^([01]\d|2[0-3]):([0-5]\d)$/, "Please provide a valid time in HH:MM format"),
  tickets: z.object({
    vip: z.object({
      price: z.number().positive().min(1, "VIP price must be greater than 0"),
      quantity: z.number().positive().min(1, "VIP quantity must be greater than 0"),
    }),
    general: z.object({
      price: z.number().positive().min(1, "General price must be greater than 0"),
      quantity: z.number().positive().min(1, "General quantity must be greater than 0"),
    }),
  }),
  businessInfo: z.object({
    name: z.string().min(1, { message: "Business name is required" }),
    organization_name: z.string().min(1, { message: "Organization name is required" }),
    email: z.string().email({ message: "Invalid email address" }),
    mobile: z
      .string()
      .regex(/^\d{10}$/, "Mobile number must be exactly 10 digits"),
  }),
});

export default eventValidationSchema;