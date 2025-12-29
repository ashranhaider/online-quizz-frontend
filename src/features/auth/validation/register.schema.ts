import { z } from "zod";

export const registerSchema = z.object({
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  email: z.string().email("Invalid email"),
  password: z.string()
    .min(6, "Minimum 6 characters")
    .regex(/[A-Z]/, "Must contain uppercase")
    .regex(/[0-9]/, "Must contain a number")
    .regex(/[^A-Za-z0-9]/, "Must contain special character"),
});

export type RegisterForm = z.infer<typeof registerSchema>;
