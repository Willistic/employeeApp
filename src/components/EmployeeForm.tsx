import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import {
  employeeSchema,
  type EmployeeFormValues,
} from "../features/employees/schema";
import Button from "./ui/Button";
import Input from "./ui/Input";
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

  return (
    <div className="form-container">
      <h2>{title}</h2>
      <form onSubmit={handleSubmit((values) => onSubmit(values))} noValidate>
        <Input
          label="First name"
          type="text"
          error={errors.firstName?.message}
          {...register("firstName")}
        />
        <Input
          label="Last name"
          type="text"
          error={errors.lastName?.message}
          {...register("lastName")}
        />
        <Input
          label="Email"
          type="email"
          error={errors.email?.message}
          {...register("email")}
        />

        <div className="form-actions">
          <Button variant="secondary" onClick={onCancel}>
            Back
          </Button>
          <Button type="submit" disabled={isSubmitting}>
            {submitLabel}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default EmployeeForm;
