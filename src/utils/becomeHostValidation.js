import { z } from "zod";

export const becomeHostSchema = z.object({
    name : z.string().min(3,"name must be at least 3 characters"),
    mobile : z.string().regex(/^\d{10}$/, "Mobile must be 10 digits"),
    panNumber : z.string().regex(/[A-Z]{5}[0-9]{4}[A-Z]{1}/, "Invalid PAN number"),
    panImage : z.any(),
});