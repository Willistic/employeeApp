import { useEffect, useRef } from "react";

import type { Employee } from "../features/employees/types";
import "./EmployeeModal.css";

interface EmployeeModalProps {
  employee: Employee;
  onClose: () => void;
}

/**
 * Accessible dialog: labelled via `aria-labelledby`, closes on Escape and
 * on backdrop click, and moves focus to the close button when opened.
 */
const EmployeeModal = ({ employee, onClose }: EmployeeModalProps) => {
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    closeButtonRef.current?.focus();

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  return (
    <div
      className="modal"
      role="presentation"
      onClick={(event) => {
        if (event.target === event.currentTarget) {
          onClose();
        }
      }}
    >
      <div
        className="modal-content"
        role="dialog"
        aria-modal="true"
        aria-labelledby="employee-modal-title"
      >
        <button
          ref={closeButtonRef}
          type="button"
          className="close"
          aria-label="Close dialog"
          onClick={onClose}
        >
          &times;
        </button>
        <h3 id="employee-modal-title">Employee details</h3>
        <dl>
          <dt>First name</dt>
          <dd>{employee.firstName}</dd>
          <dt>Last name</dt>
          <dd>{employee.lastName}</dd>
          <dt>Email</dt>
          <dd>{employee.email}</dd>
        </dl>
      </div>
    </div>
  );
};

export default EmployeeModal;
