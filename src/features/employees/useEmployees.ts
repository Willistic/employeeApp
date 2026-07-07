import { useContext } from "react";

import { EmployeeContext } from "./EmployeeContext";

/**
 * Typed accessor for the employee context. Throws when used outside the
 * provider so misuse fails fast during development instead of silently
 * returning `null`.
 */
export function useEmployees() {
  const context = useContext(EmployeeContext);
  if (!context) {
    throw new Error("useEmployees must be used within an EmployeeProvider");
  }
  return context;
}
