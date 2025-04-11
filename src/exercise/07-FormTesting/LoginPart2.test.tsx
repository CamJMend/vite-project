import React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Login from "../sharedComponent/Login";
import { build, perBuild } from "@jackfranklin/test-data-bot";
import faker from "faker";


const buildLoginForm = build<{ username: string; password: string }>({
    fields: {
        username: perBuild(() => faker.internet.userName()),
        password: perBuild(() => faker.internet.password()),
    },
});

test("submits username and password correctly", async () => {
    const handleSubmit = jest.fn();
    const { username, password } = buildLoginForm();

    render(<Login onSubmit={handleSubmit} />);

    const usernameInput = screen.getByLabelText(/username/i);
    const passwordInput = screen.getByLabelText(/password/i);
    const submitButton = screen.getByRole("button", { name: /submit/i });

    await userEvent.type(usernameInput, username);
    await userEvent.type(passwordInput, password);
    await userEvent.click(submitButton);

    expect(handleSubmit).toHaveBeenCalledWith({ username, password });
    expect(handleSubmit).toHaveBeenCalledTimes(1);
});