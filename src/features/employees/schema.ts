import { z } from "zod";

/**
 * Single source of truth for employee validation.
 *
 * The form's input type is inferred from this schema so the UI and the
 * validation rules can never drift apart.
 */
export const employeeSchema = z.object({
  firstName: z
    .string()
    .trim()
    .min(1, "First name is required")
    .max(50, "First name must be 50 characters or fewer"),
  lastName: z
    .string()
    .trim()
    .min(1, "Last name is required")
    .max(50, "Last name must be 50 characters or fewer"),
  email: z
    .string()
    .trim()
    .min(1, "Email is required")
    .email("Enter a valid email address"),
});

export type EmployeeFormValues = z.infer<typeof employeeSchema>;
