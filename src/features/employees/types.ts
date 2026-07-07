/**
 * Domain types for the Employee feature.
 *
 * `Employee` is the persisted entity (it always has an `id`).
 * `EmployeeInput` is the shape captured by forms before an id is assigned.
 */
export interface Employee {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
}

export type EmployeeInput = Omit<Employee, "id">;
