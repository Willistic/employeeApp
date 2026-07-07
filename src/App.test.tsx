import { describe, expect, it } from "vitest";
import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter } from "react-router-dom";

import App from "./App";
import { EmployeeProvider } from "./features/employees/EmployeeContext";
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
			<EmployeeProvider service={service}>
				<App />
			</EmployeeProvider>
		</MemoryRouter>,
	);
}

describe("Employee app flow", () => {
	it("shows an empty state initially", () => {
		renderApp();
		expect(screen.getByText(/no employees yet/i)).toBeInTheDocument();
	});

	it("adds a new employee end to end", async () => {
		const user = userEvent.setup();
		renderApp();

		await user.click(screen.getByRole("link", { name: /add employee/i }));

		await user.type(screen.getByLabelText(/first name/i), "Grace");
		await user.type(screen.getByLabelText(/last name/i), "Hopper");
		await user.type(screen.getByLabelText(/email/i), "grace@example.com");
		await user.click(screen.getByRole("button", { name: /add employee/i }));

		const table = await screen.findByRole("table");
		expect(within(table).getByText("Grace Hopper")).toBeInTheDocument();
		expect(
			within(table).getByText("grace@example.com"),
		).toBeInTheDocument();
	});

	it("deletes an employee", async () => {
		const user = userEvent.setup();
		renderApp();

		await user.click(screen.getByRole("link", { name: /add employee/i }));
		await user.type(screen.getByLabelText(/first name/i), "Grace");
		await user.type(screen.getByLabelText(/last name/i), "Hopper");
		await user.type(screen.getByLabelText(/email/i), "grace@example.com");
		await user.click(screen.getByRole("button", { name: /add employee/i }));

		await screen.findByRole("table");
		await user.click(
			screen.getByRole("button", { name: /delete grace hopper/i }),
		);

		expect(screen.getByText(/no employees yet/i)).toBeInTheDocument();
	});
});
