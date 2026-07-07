import { useId } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import {
  employeeSchema,
  type EmployeeFormValues,
} from "../features/employees/schema";
import "./EmployeeForm.css";

interface EmployeeFormProps {
  /** Heading shown above the form. */
  title: string;
  /** Label for the primary submit button. */
  submitLabel: string;
  /** Initial field values (used when editing an existing employee). */
  defaultValues?: EmployeeFormValues;
  onSubmit: (values: EmployeeFormValues) => void;
  onCancel: () => void;
}

const EMPTY_VALUES: EmployeeFormValues = {
  firstName: "",
  lastName: "",
  email: "",
};

/**
 * A single, reusable form used for both adding and editing an employee.
 * Validation, error display, and accessibility wiring live here so the
 * Add and Edit pages stay thin.
 */
const EmployeeForm = ({
  title,
  submitLabel,
  defaultValues = EMPTY_VALUES,
  onSubmit,
  onCancel,
}: EmployeeFormProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<EmployeeFormValues>({
    resolver: zodResolver(employeeSchema),
    defaultValues,
  });

  const firstNameId = useId();
  const lastNameId = useId();
  const emailId = useId();

  return (
    <div className="form-container">
      <h2>{title}</h2>
      <form onSubmit={handleSubmit((values) => onSubmit(values))} noValidate>
        <div className="form-field">
          <label htmlFor={firstNameId}>First name</label>
          <input
            id={firstNameId}
            type="text"
            aria-invalid={Boolean(errors.firstName)}
            aria-describedby={
              errors.firstName ? `${firstNameId}-error` : undefined
            }
            {...register("firstName")}
          />
          {errors.firstName && (
            <p id={`${firstNameId}-error`} className="form-error" role="alert">
              {errors.firstName.message}
            </p>
          )}
        </div>

        <div className="form-field">
          <label htmlFor={lastNameId}>Last name</label>
          <input
            id={lastNameId}
            type="text"
            aria-invalid={Boolean(errors.lastName)}
            aria-describedby={
              errors.lastName ? `${lastNameId}-error` : undefined
            }
            {...register("lastName")}
          />
          {errors.lastName && (
            <p id={`${lastNameId}-error`} className="form-error" role="alert">
              {errors.lastName.message}
            </p>
          )}
        </div>

        <div className="form-field">
          <label htmlFor={emailId}>Email</label>
          <input
            id={emailId}
            type="email"
            aria-invalid={Boolean(errors.email)}
            aria-describedby={errors.email ? `${emailId}-error` : undefined}
            {...register("email")}
          />
          {errors.email && (
            <p id={`${emailId}-error`} className="form-error" role="alert">
              {errors.email.message}
            </p>
          )}
        </div>

        <div className="form-actions">
          <button type="button" onClick={onCancel}>
            Back
          </button>
          <button type="submit" disabled={isSubmitting}>
            {submitLabel}
          </button>
        </div>
      </form>
    </div>
  );
};

export default EmployeeForm;
