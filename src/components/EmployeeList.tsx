import { useMemo, useState } from "react";

import type { Employee } from "../features/employees/types";
import EmployeeModal from "./EmployeeModal";
import Button from "./ui/Button";
import "./EmployeeList.css";

interface EmployeeListProps {
  employees: Employee[];
  onEdit: (employee: Employee) => void;
  onDelete: (employee: Employee) => void;
}

type SortKey = "name" | "email";
type SortDirection = "asc" | "desc";

const EmployeeList = ({ employees, onEdit, onDelete }: EmployeeListProps) => {
  const [selected, setSelected] = useState<Employee | null>(null);
  const [search, setSearch] = useState("");
  const [sortKey, setSortKey] = useState<SortKey>("name");
  const [sortDirection, setSortDirection] = useState<SortDirection>("asc");

  const visibleEmployees = useMemo(() => {
    const query = search.trim().toLowerCase();

    const filtered = query
      ? employees.filter((employee) => {
          const haystack =
            `${employee.firstName} ${employee.lastName} ${employee.email}`.toLowerCase();
          return haystack.includes(query);
        })
      : employees;

    const sorted = [...filtered].sort((a, b) => {
      const aValue =
        sortKey === "name"
          ? `${a.firstName} ${a.lastName}`.toLowerCase()
          : a.email.toLowerCase();
      const bValue =
        sortKey === "name"
          ? `${b.firstName} ${b.lastName}`.toLowerCase()
          : b.email.toLowerCase();

      const comparison = aValue.localeCompare(bValue);
      return sortDirection === "asc" ? comparison : -comparison;
    });

    return sorted;
  }, [employees, search, sortKey, sortDirection]);

  const toggleSort = (key: SortKey) => {
    if (key === sortKey) {
      setSortDirection((current) => (current === "asc" ? "desc" : "asc"));
    } else {
      setSortKey(key);
      setSortDirection("asc");
    }
  };

  const ariaSort = (key: SortKey): "ascending" | "descending" | "none" => {
    if (key !== sortKey) return "none";
    return sortDirection === "asc" ? "ascending" : "descending";
  };

  const sortIndicator = (key: SortKey) => {
    if (key !== sortKey) return "";
    return sortDirection === "asc" ? " ▲" : " ▼";
  };

  if (employees.length === 0) {
    return (
      <p className="empty-state">
        No employees yet. Add your first employee to get started.
      </p>
    );
  }

  return (
    <div>
      <div className="list-header">
        <h2>Employee list</h2>
        <input
          type="search"
          className="search-input"
          placeholder="Search by name or email"
          aria-label="Search employees"
          value={search}
          onChange={(event) => setSearch(event.target.value)}
        />
      </div>

      {visibleEmployees.length === 0 ? (
        <p className="empty-state">No employees match “{search}”.</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th scope="col" aria-sort={ariaSort("name")}>
                <button
                  type="button"
                  className="sort-header"
                  onClick={() => toggleSort("name")}
                >
                  Name{sortIndicator("name")}
                </button>
              </th>
              <th scope="col" aria-sort={ariaSort("email")}>
                <button
                  type="button"
                  className="sort-header"
                  onClick={() => toggleSort("email")}
                >
                  Email{sortIndicator("email")}
                </button>
              </th>
              <th scope="col">Actions</th>
            </tr>
          </thead>
          <tbody>
            {visibleEmployees.map((employee) => {
              const fullName = `${employee.firstName} ${employee.lastName}`;
              return (
                <tr key={employee.id}>
                  <td>{fullName}</td>
                  <td>{employee.email}</td>
                  <td>
                    <div className="row-actions">
                      <Button
                        variant="secondary"
                        onClick={() => setSelected(employee)}
                        aria-label={`View ${fullName}`}
                      >
                        View
                      </Button>
                      <Button
                        onClick={() => onEdit(employee)}
                        aria-label={`Edit ${fullName}`}
                      >
                        Edit
                      </Button>
                      <Button
                        variant="danger"
                        onClick={() => onDelete(employee)}
                        aria-label={`Delete ${fullName}`}
                      >
                        Delete
                      </Button>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      )}

      {selected && (
        <EmployeeModal employee={selected} onClose={() => setSelected(null)} />
      )}
    </div>
  );
};

export default EmployeeList;
