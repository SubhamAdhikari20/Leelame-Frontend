// frontend/src/schemas/bidSchema.js
import { z } from "zod";

const bidAmountValidation = z
    .number()
    .positive({ message: "Bid amount must be a positive number" })
    // .min(1, { message: "Bid amount must be at least 1" })

const quantityValidation = z
    .number()
    .int({ message: "Quantity must be an integer" })
    .positive({ message: "Quantity must be a positive number" })
    .min(1, { message: "Quantity must be at least 1" })

export const bidSchema = z.object({
    bidAmount: bidAmountValidation,
    quantity: quantityValidation,
});

// export const bidSchemaWithProductId = bidSchema.extend({
//     productId: z.uuid({ message: "Invalid product ID" }),
// });

// export const bidSchemaWithUserId = bidSchema.extend({
//     userId: z.uuid({ message: "Invalid user ID" }),
// });

// export const fullBidSchema = bidSchemaWithProductId.extend({
//     userId: z.uuid({ message: "Invalid user ID" }),
// });