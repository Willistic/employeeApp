import { describe, expect, it } from "vitest";

import { employeeReducer, type EmployeeState } from "./reducer";
import type { Employee } from "./types";

const base: Employee = {
  id: "1",
  firstName: "Ada",
  lastName: "Lovelace",
  email: "ada@example.com",
};

describe("employeeReducer", () => {
  it("sets the full list", () => {
    const next = employeeReducer(
      { employees: [] },
      { type: "set", payload: [base] },
    );
    expect(next.employees).toEqual([base]);
  });

  it("adds an employee", () => {
    const next = employeeReducer(
      { employees: [] },
      { type: "add", payload: base },
    );
    expect(next.employees).toEqual([base]);
  });

  it("updates by id without touching others", () => {
    const other: Employee = { ...base, id: "2", firstName: "Alan" };
    const state: EmployeeState = { employees: [base, other] };

    const next = employeeReducer(state, {
      type: "update",
      payload: { ...base, firstName: "Augusta" },
    });

    expect(next.employees[0].firstName).toBe("Augusta");
    expect(next.employees[1]).toEqual(other);
  });

  it("removes by id", () => {
    const state: EmployeeState = { employees: [base] };
    const next = employeeReducer(state, {
      type: "remove",
      payload: { id: "1" },
    });
    expect(next.employees).toEqual([]);
  });
});
