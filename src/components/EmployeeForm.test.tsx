import { describe, expect, it, vi } from "vitest";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import EmployeeForm from "./EmployeeForm";

describe("EmployeeForm", () => {
	it("shows validation errors and does not submit when empty", async () => {
		const user = userEvent.setup();
		const onSubmit = vi.fn();

		render(
			<EmployeeForm
				title='Add employee'
				submitLabel='Add employee'
				onSubmit={onSubmit}
				onCancel={vi.fn()}
			/>,
		);

		await user.click(screen.getByRole("button", { name: /add employee/i }));

		expect(
			await screen.findByText(/first name is required/i),
		).toBeInTheDocument();
		expect(screen.getByText(/last name is required/i)).toBeInTheDocument();
		expect(screen.getByText(/email is required/i)).toBeInTheDocument();
		expect(onSubmit).not.toHaveBeenCalled();
	});

	it("rejects an invalid email", async () => {
		const user = userEvent.setup();
		const onSubmit = vi.fn();

		render(
			<EmployeeForm
				title='Add employee'
				submitLabel='Add employee'
				onSubmit={onSubmit}
				onCancel={vi.fn()}
			/>,
		);

		await user.type(screen.getByLabelText(/first name/i), "Ada");
		await user.type(screen.getByLabelText(/last name/i), "Lovelace");
		await user.type(screen.getByLabelText(/email/i), "not-an-email");
		await user.click(screen.getByRole("button", { name: /add employee/i }));

		expect(
			await screen.findByText(/enter a valid email address/i),
		).toBeInTheDocument();
		expect(onSubmit).not.toHaveBeenCalled();
	});

	it("submits trimmed, valid values", async () => {
		const user = userEvent.setup();
		const onSubmit = vi.fn();

		render(
			<EmployeeForm
				title='Add employee'
				submitLabel='Add employee'
				onSubmit={onSubmit}
				onCancel={vi.fn()}
			/>,
		);

		await user.type(screen.getByLabelText(/first name/i), "Ada");
		await user.type(screen.getByLabelText(/last name/i), "Lovelace");
		await user.type(screen.getByLabelText(/email/i), "ada@example.com");
		await user.click(screen.getByRole("button", { name: /add employee/i }));

		await waitFor(() => {
			expect(onSubmit).toHaveBeenCalledWith({
				firstName: "Ada",
				lastName: "Lovelace",
				email: "ada@example.com",
			});
		});
	});
});
