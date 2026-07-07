import { describe, expect, it } from "vitest";
import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter } from "react-router-dom";

import App from "./App";
import { EmployeeProvider } from "./features/employees/EmployeeContext";
import { ToastProvider } from "./features/toast/ToastContext";
import { EmployeeService } from "./services/employeeService";
import type { Storage } from "./services/storage";

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

function renderApp() {
  const service = new EmployeeService(new InMemoryStorage());
  return render(
    <MemoryRouter initialEntries={["/"]}>
      <ToastProvider>
        <EmployeeProvider service={service}>
          <App />
        </EmployeeProvider>
      </ToastProvider>
    </MemoryRouter>,
  );
}

async function addEmployee(
  user: ReturnType<typeof userEvent.setup>,
  firstName: string,
  lastName: string,
  email: string,
) {
  await user.click(screen.getByRole("button", { name: /add employee/i }));
  await user.type(screen.getByLabelText(/first name/i), firstName);
  await user.type(screen.getByLabelText(/last name/i), lastName);
  await user.type(screen.getByLabelText(/email/i), email);
  await user.click(screen.getByRole("button", { name: /add employee/i }));
  await screen.findByRole("table");
}

describe("Employee app flow", () => {
  it("shows an empty state initially", () => {
    renderApp();
    expect(screen.getByText(/no employees yet/i)).toBeInTheDocument();
  });

  it("adds a new employee end to end", async () => {
    const user = userEvent.setup();
    renderApp();

    await addEmployee(user, "Grace", "Hopper", "grace@example.com");

    const table = screen.getByRole("table");
    expect(within(table).getByText("Grace Hopper")).toBeInTheDocument();
    expect(within(table).getByText("grace@example.com")).toBeInTheDocument();
    expect(
      await screen.findByText(/grace hopper was added/i),
    ).toBeInTheDocument();
  });

  it("deletes an employee after confirmation", async () => {
    const user = userEvent.setup();
    renderApp();

    await addEmployee(user, "Grace", "Hopper", "grace@example.com");

    await user.click(
      screen.getByRole("button", { name: /delete grace hopper/i }),
    );

    const dialog = await screen.findByRole("dialog");
    await user.click(within(dialog).getByRole("button", { name: /delete/i }));

    expect(screen.getByText(/no employees yet/i)).toBeInTheDocument();
    expect(
      await screen.findByText(/grace hopper was deleted/i),
    ).toBeInTheDocument();
  });

  it("cancels a delete when dismissed", async () => {
    const user = userEvent.setup();
    renderApp();

    await addEmployee(user, "Grace", "Hopper", "grace@example.com");

    await user.click(
      screen.getByRole("button", { name: /delete grace hopper/i }),
    );

    const dialog = await screen.findByRole("dialog");
    await user.click(within(dialog).getByRole("button", { name: /cancel/i }));

    expect(screen.getByRole("table")).toBeInTheDocument();
    expect(screen.getByText("Grace Hopper")).toBeInTheDocument();
  });

  it("filters the list with the search box", async () => {
    const user = userEvent.setup();
    renderApp();

    await addEmployee(user, "Grace", "Hopper", "grace@example.com");
    await addEmployee(user, "Alan", "Turing", "alan@example.com");

    await user.type(screen.getByRole("searchbox"), "turing");

    const table = screen.getByRole("table");
    expect(within(table).getByText("Alan Turing")).toBeInTheDocument();
    expect(within(table).queryByText("Grace Hopper")).not.toBeInTheDocument();
  });
});
