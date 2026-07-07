import type { Employee, EmployeeInput } from "../features/employees/types";
import { LocalStorage, type Storage } from "./storage";

const STORAGE_KEY = "employeeList";

/**
 * Generates a collision-resistant id. Falls back to a timestamp-based value
 * in the rare environments where `crypto.randomUUID` is unavailable.
 */
function createId(): string {
  if (typeof crypto !== "undefined" && "randomUUID" in crypto) {
    return crypto.randomUUID();
  }
  return `${Date.now()}-${Math.random().toString(36).slice(2)}`;
}

/**
 * Encapsulates all employee persistence logic. Pure with respect to React so
 * it can be unit tested in isolation and injected with any `Storage` backend.
 */
export class EmployeeService {
  constructor(private readonly storage: Storage = new LocalStorage()) {}

  getAll(): Employee[] {
    return this.storage.read<Employee[]>(STORAGE_KEY) ?? [];
  }

  create(input: EmployeeInput): Employee {
    const employee: Employee = { id: createId(), ...input };
    const next = [...this.getAll(), employee];
    this.storage.write(STORAGE_KEY, next);
    return employee;
  }

  update(employee: Employee): Employee {
    const next = this.getAll().map((current) =>
      current.id === employee.id ? employee : current,
    );
    this.storage.write(STORAGE_KEY, next);
    return employee;
  }

  remove(id: string): void {
    const next = this.getAll().filter((employee) => employee.id !== id);
    this.storage.write(STORAGE_KEY, next);
  }
}

export const employeeService = new EmployeeService();
