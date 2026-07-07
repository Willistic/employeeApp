import { useState } from "react";

import type { Employee } from "../features/employees/types";
import EmployeeModal from "./EmployeeModal";

interface EmployeeListProps {
  employees: Employee[];
  onEdit: (employee: Employee) => void;
  onDelete: (id: string) => void;
}

const EmployeeList = ({ employees, onEdit, onDelete }: EmployeeListProps) => {
  const [selected, setSelected] = useState<Employee | null>(null);

  if (employees.length === 0) {
    return (
      <p className="empty-state">
        No employees yet. Add your first employee to get started.
      </p>
    );
  }

  return (
    <div>
      <h2>Employee list</h2>
      <table>
        <thead>
          <tr>
            <th scope="col">Name</th>
            <th scope="col">Email</th>
            <th scope="col">Actions</th>
          </tr>
        </thead>
        <tbody>
          {employees.map((employee) => {
            const fullName = `${employee.firstName} ${employee.lastName}`;
            return (
              <tr key={employee.id}>
                <td>{fullName}</td>
                <td>{employee.email}</td>
                <td>
                  <div className="row-actions">
                    <button
                      type="button"
                      onClick={() => setSelected(employee)}
                      aria-label={`View ${fullName}`}
                    >
                      View
                    </button>
                    <button
                      type="button"
                      onClick={() => onEdit(employee)}
                      aria-label={`Edit ${fullName}`}
                    >
                      Edit
                    </button>
                    <button
                      type="button"
                      onClick={() => onDelete(employee.id)}
                      aria-label={`Delete ${fullName}`}
                    >
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>

      {selected && (
        <EmployeeModal employee={selected} onClose={() => setSelected(null)} />
      )}
    </div>
  );
};

export default EmployeeList;
