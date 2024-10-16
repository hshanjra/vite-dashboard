import { z } from "zod";
import validator from "validator";

export const OnboardingSchema = z
  .object({
    accountType: z.enum(["BUSINESS", "INDIVIDUAL"]).default("BUSINESS"),
    dateOfBirth: z.coerce.date().optional(),
    ssn: z.string().optional(),
    businessName: z.string().max(100, "Business name is too long"),
    businessLicense: z.string().optional(),
    businessLicenseExp: z.coerce.date().optional(),
    ein: z
      .string()
      // .length(9, "Enter valid Employer Identification Number (EIN)")
      .optional(),
    street: z.string().min(1, "Street is required"),
    city: z.string().min(1, "City is required"),
    state: z.string().min(1, "State is required"),
    zip: z.string().min(1, "Zip is required"),
    country: z.string().min(1, "Country is required"),
    displayName: z
      .string()
      .min(5, "Store name is too short, at least 5 characters are required")
      .max(100, "Store name is too long"),
    businessEmail: z.string().email("Invalid business email").optional(),
    businessPhone: z
      .string()
      .refine((phone) => validator.isMobilePhone(phone), {
        message: "Enter a valid phone number",
      })
      .optional(),
    about: z.string().max(450, "About is too long").optional(),
    returnPolicy: z.string().max(1000, "Return policy is too long").optional(),
    shippingPolicy: z
      .string()
      .max(1000, "Shipping policy is too long")
      .optional(),
    identityDocs: z.custom<File[]>(),
    // Bank Details
    bankAccountType: z.enum(["INDIVIDUAL", "BUSINESS"]).default("BUSINESS"),
    bankName: z
      .string()
      .min(1, "Bank name is required")
      .max(100, "Bank name is too long"),
    accountHolderName: z
      .string()
      .min(1, "Account holder name is required")
      .max(100, "Account holder name is too long"),
    accountNumber: z
      .string()
      // .length(20, "Account number should not be greater than 20 digits")
      .optional(),
    routingNumber: z
      .string()
      .length(9, "Routing number should be exactly 9 digits")
      .optional(),
    bankBic: z.string().max(100, "Bank BIC is too long").optional(),
    bankIban: z.string().max(100, "Bank IBAN is too long").optional(),
    bankSwiftCode: z
      .string()
      .max(100, "Bank Swift code is too long")
      .optional(),
    bankAddress: z
      .string()
      .min(1, "Bank address is required")
      .max(100, "Bank address is too long"),
    bankTerms: z
      .boolean()
      .default(false)
      .refine((value) => value, {
        message: "Please accept terms.",
      }),
  })
  .superRefine((data, ctx) => {
    if (!data.identityDocs || data.identityDocs.length === 0) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Identity documents are required",
        path: ["identityDocs"],
      });
    }

    // Bank Details
    if (!data.accountNumber) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Account number is required",
        path: ["accountNumber"],
      });
    }

    // Account number must be a number
    if (data.accountNumber && isNaN(data.accountNumber as any)) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Account number must be a number",
        path: ["accountNumber"],
      });
    }

    if (data.accountNumber && data.accountNumber?.length > 20) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Account number should not be greater than 20 digits",
        path: ["accountNumber"],
      });
    }

    if (!data.routingNumber) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Routing number is required",
        path: ["routingNumber"],
      });
    }

    // Routing number must be a number
    if (data.routingNumber && isNaN(data.routingNumber as any)) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Routing number must be a number",
        path: ["routingNumber"],
      });
    }

    if (data.accountType === "BUSINESS") {
      if (!data.ein) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "Employer Identification Number (EIN) is required",
          path: ["ein"],
        });
      }

      if (data.ein?.length !== 9) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message:
            "Employer Identification Number (EIN) should be exactly 9 digits",
          path: ["ein"],
        });
      }

      // Check if ein is a number
      if (data.ein && isNaN(data.ein as any)) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "Employer Identification Number (EIN) must be a number",
          path: ["ein"],
        });
      }

      if (!data.businessName) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "Business name is required",
          path: ["businessName"],
        });
      }

      if (!data.businessEmail) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "Business email is required",
          path: ["businessEmail"],
        });
      }

      if (!data.businessPhone) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "Business phone number is required",
          path: ["businessPhone"],
        });
      }
    }

    if (data.accountType === "INDIVIDUAL") {
      if (!data.ssn) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "Social security number (SSN) is required",
          path: ["ssn"],
        });
      }

      if (data.ssn?.length !== 9) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "Social security number (SSN) should be exactly 9 digits",
          path: ["ssn"],
        });
      }

      // Check if ein is a number
      if (data.ssn && isNaN(data.ssn as any)) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "Social security number (SSN) must be a number",
          path: ["ssn"],
        });
      }

      if (!data.dateOfBirth) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "Date of birth is required",
          path: ["dateOfBirth"],
        });
      }
    }
  });

export type OnboardingFormData = z.infer<typeof OnboardingSchema>;
