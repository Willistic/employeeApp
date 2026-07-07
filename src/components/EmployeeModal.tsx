import type { Employee } from "../features/employees/types";
import Dialog from "./ui/Dialog";
import "./EmployeeModal.css";

interface EmployeeModalProps {
  employee: Employee;
  onClose: () => void;
}

/**
 * Read-only view of a single employee's details, rendered in the shared
 * accessible Dialog.
 */
const EmployeeModal = ({ employee, onClose }: EmployeeModalProps) => {
  return (
    <Dialog title="Employee details" onClose={onClose}>
      <dl>
        <dt>First name</dt>
        <dd>{employee.firstName}</dd>
        <dt>Last name</dt>
        <dd>{employee.lastName}</dd>
        <dt>Email</dt>
        <dd>{employee.email}</dd>
      </dl>
    </Dialog>
  );
};

export default EmployeeModal;
