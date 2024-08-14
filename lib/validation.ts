import { z } from 'zod';

export const UserFormValidation = z.object({
    name: z
        .string()
        .min(2, "Name must be at least 2 characters long")
        .max(50, "Name must not exceed 50 characters"),
    email: z.string().email("Please enter a valid email address"),
    phone: z.string().refine((phone) => /^\+\d{10,15}$/.test(phone), "Please enter a valid phone number"),
})