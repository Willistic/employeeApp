import type { Employee } from "./types";

export interface EmployeeState {
  employees: Employee[];
}

export type EmployeeAction =
  | { type: "set"; payload: Employee[] }
  | { type: "add"; payload: Employee }
  | { type: "update"; payload: Employee }
  | { type: "remove"; payload: { id: string } };

export function employeeReducer(
  state: EmployeeState,
  action: EmployeeAction,
): EmployeeState {
  switch (action.type) {
    case "set":
      return { employees: action.payload };
    case "add":
      return { employees: [...state.employees, action.payload] };
    case "update":
      return {
        employees: state.employees.map((employee) =>
          employee.id === action.payload.id ? action.payload : employee,
        ),
      };
    case "remove":
      return {
        employees: state.employees.filter(
          (employee) => employee.id !== action.payload.id,
        ),
      };
    default:
      return state;
  }
}
