import { beforeEach, describe, expect, it } from "vitest";

import { EmployeeService } from "./employeeService";
import type { Storage } from "./storage";

class InMemoryStorage implements Storage {
  private store = new Map<string, string>();

  read<T>(key: string): T | null {
    const raw = this.store.get(key);
    return raw ? (JSON.parse(raw) as T) : null;
  }

  write<T>(key: string, value: T): void {
    this.store.set(key, JSON.stringify(value));
  }

  remove(key: string): void {
    this.store.delete(key);
  }
}

describe("EmployeeService", () => {
  let service: EmployeeService;

  beforeEach(() => {
    service = new EmployeeService(new InMemoryStorage());
  });

  it("starts with an empty list", () => {
    expect(service.getAll()).toEqual([]);
  });

  it("creates an employee with a generated id", () => {
    const created = service.create({
      firstName: "Ada",
      lastName: "Lovelace",
      email: "ada@example.com",
    });

    expect(created.id).toBeTruthy();
    expect(service.getAll()).toHaveLength(1);
  });

  it("updates the matching employee by id", () => {
    const created = service.create({
      firstName: "Ada",
      lastName: "Lovelace",
      email: "ada@example.com",
    });

    service.update({ ...created, firstName: "Augusta" });

    expect(service.getAll()[0].firstName).toBe("Augusta");
  });

  it("removes only the targeted employee", () => {
    const first = service.create({
      firstName: "Ada",
      lastName: "Lovelace",
      email: "ada@example.com",
    });
    const second = service.create({
      firstName: "Alan",
      lastName: "Turing",
      email: "alan@example.com",
    });

    service.remove(first.id);

    const remaining = service.getAll();
    expect(remaining).toHaveLength(1);
    expect(remaining[0].id).toBe(second.id);
  });
});
