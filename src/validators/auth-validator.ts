import * as z from "zod";

export const LoginSchema = z.object({
  email: z.string().min(1, "Email is required").email(),
  password: z.string().min(1, "Password is required"),
});

export type LoginSchemaType = z.infer<typeof LoginSchema>;

export const RegisterSchema = z.object({
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  email: z.string().min(1, "Email is required").email(),
  password: z.string().min(8, "Password must be at least 8 characters long"),
  terms: z
    .boolean()
    .refine((value) => value, {
      message: "Please accept terms and conditions",
    }),
});

export type RegisterSchemaType = z.infer<typeof RegisterSchema>;
