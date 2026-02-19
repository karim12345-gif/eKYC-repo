import z from "zod";

// Auth Schemas
export const LoginSchema = z.object({
  email: z.string().email("Invalid email format"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

export const RefreshSchema = z.object({
  refreshToken: z.string().min(1, "Refresh token is required"),
});

// onboarding schemas
const ProfileSchema = z.object({
  fullName: z.string().min(1, "Full name is required"),
  dateOfBirth: z
    .string()
    .regex(/^\d{4}-\d{2}-\d{2}$/, "Date of birth must be in YYYY-MM-DD format"),
  nationality: z.string().min(2, "Nationality must be at least 2 characters"),
});

const DocumentSchema = z.object({
  documentType: z.enum(["PASSPORT", "ID_CARD", "DRIVERS_LICENSE"], {
    errorMap: () => ({ message: "Invalid document type" }),
  }),
  documentNumber: z.string().min(1, "Document number is required"),
});

const AddressSchema = z.object({
  addressLine1: z.string().min(1, "Address line 1 is required"),
  city: z.string().min(1, "City is required"),
  country: z.string().min(2, "Country must be at least 2 characters"),
});

const ConsentsSchema = z.object({
  termsAccepted: z.literal(true, {
    errorMap: () => ({ message: "You must accept the terms and conditions" }),
  }),
});

export const OnboardingSubmitSchema = z.object({
  draft: z.object({
    profile: ProfileSchema,
    document: DocumentSchema,
    address: AddressSchema,
    consents: ConsentsSchema,
  }),
});

// export types

export type LoginInput = z.infer<typeof LoginSchema>;
export type RefreshInput = z.infer<typeof RefreshSchema>;
export type OnboardingSubmitInput = z.infer<typeof OnboardingSubmitSchema>;
