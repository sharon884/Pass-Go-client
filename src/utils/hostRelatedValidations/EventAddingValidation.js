import { z } from "zod";

export const eventValidationSchema = z
  .object({
    title: z.string().min(1, { message: "Title is required" }).trim(),
    description: z
      .string()
      .min(1, { message: "Description is required" })
      .trim(),
    category: z
      .string()
      .refine(
        (val) => ["Music", "Art", "Fashion", "Motosports"].includes(val),
        {
          message: "Invalid category, please choose a valid one",
        }
      ),
    images: z
      .array(z.string().url())
      .min(3, { message: "At least 3 images are required" })
      .max(10, { message: "You can upload a maximum of 10 images" }),
    location: z.string().min(1, { message: "Location name is required" }),
    // 🔥 FIXED: Coordinates required for GeoJSON
    coordinates: z.object({
      lat: z.number({ required_error: "Latitude is required" }),
      lng: z.number({ required_error: "Longitude is required" }),
    }),
    date: z.string().refine(
      (val) => {
        const date = new Date(val);
        return date > new Date();
      },
      {
        message: "Event date must be in the future",
      }
    ),
    time: z
      .string()
      .regex(
        /^([01]\d|2[0-3]):([0-5]\d)$/,
        "Please provide a valid time in HH:MM format"
      ),
    eventType: z.enum(
      ["free", "paid_stage_with_seats", "paid_stage_without_seats"],
      {
        required_error: "Event type is required",
      }
    ),
    layoutId: z.string().optional(),
    tickets: z.object({
      VIP: z.object({
        price: z.number({ invalid_type_error: "VIP price must be a number" }),
        quantity: z.number({
          invalid_type_error: "VIP quantity must be a number",
        }),
      }),
      general: z.object({
        price: z.number({
          invalid_type_error: "General price must be a number",
        }),
        quantity: z.number({
          invalid_type_error: "General quantity must be a number",
        }),
      }),
    }),
    businessInfo: z.object({
      name: z.string().min(1, { message: "Business name is required" }),
      organization_name: z
        .string()
        .min(1, { message: "Organization name is required" }),
      email: z.string().email({ message: "Invalid email address" }),
      mobile: z.string().regex(/^\d{10}$/, {
        message: "Mobile number must be exactly 10 digits",
      }),
    }),
  })
  .superRefine((data, ctx) => {
    // 🔥 Validate layoutId only if event has seats
    if (data.eventType === "paid_stage_with_seats" && !data.layoutId) {
      ctx.addIssue({
        path: ["layoutId"],
        code: z.ZodIssueCode.custom,
        message: "Stage layout is required for events with seats",
      });
    }
    // 🔥 Ticket prices must be > 0 for paid events
    if (data.eventType !== "free") {
      const { VIP, general } = data.tickets;
      if (
        VIP.price <= 0 ||
        VIP.quantity <= 0 ||
        general.price <= 0 ||
        general.quantity <= 0
      ) {
        ctx.addIssue({
          path: ["tickets", "VIP", "price"],
          code: z.ZodIssueCode.custom,
          message:
            "Ticket prices and quantities must be greater than 0 for paid events",
        });
      }
    }
  });

export default eventValidationSchema;
