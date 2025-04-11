import React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Login from "../sharedComponent/Login";


test("submits username and password correctly", async () => {
    const handleSubmit = jest.fn();

    render(<Login onSubmit={handleSubmit} />);

    const usernameInput = screen.getByLabelText(/username/i);
    const passwordInput = screen.getByLabelText(/password/i);
    const submitButton = screen.getByRole("button", { name: /submit/i });

    await userEvent.type(usernameInput, "testuser");
    await userEvent.type(passwordInput, "secretpassword");
    await userEvent.click(submitButton);

    expect(handleSubmit).toHaveBeenCalledWith({
        username: "testuser",
        password: "secretpassword",
    });

    expect(handleSubmit).toHaveBeenCalledTimes(1);
});