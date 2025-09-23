// frontend/src/schemas/auth/verifyAccountRegistrationSchema.js
import { z } from "zod";

const verifyCodeValidation = z
    .string()
    .length(6, { message: "Verification code must be 6 characters long" })
    .regex(/^[0-9]+$/, { message: "Verification code must contain only digits" })

export const verifyAccountRegistrationSchema = z.object({
    code: verifyCodeValidation
});