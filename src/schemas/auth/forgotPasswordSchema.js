// frontend/src/schemas/auth/forgotPasswordSchema.js
import { z } from "zod";

export const forgotPasswordSchema = z.object({
    email: z
        .email({ message: "Invalid Email Address" })
        .min(5, { message: "Email must be at least 5 characters long" })
        .max(50, { message: "Email must not exceed 50 characters" })
        .regex(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, { message: "Invalid Email Address" })
});