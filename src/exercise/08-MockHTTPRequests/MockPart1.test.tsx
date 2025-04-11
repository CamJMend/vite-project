// src/exercise/08-MockHTTPRequests/MockPart1.test.tsx
import React from "react";
import {render, screen} from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { rest } from "msw";
import { setupServer } from "msw/node";
import Login from "../sharedComponent/Login";

// MSW Server
const server = setupServer(
    rest.post("/login", async (req, res, ctx) => {
        const { username, password } = await req.json();

        if (!username || !password) {
        return res(
            ctx.status(400),
            ctx.json({ error: "Username and password are required" })
        );
        }

        if (username === "testuser" && password === "testpassword") {
        return res(ctx.status(200), ctx.json({ message: "Login successful" }));
        }

        return res(ctx.status(400), ctx.json({ error: "Invalid credentials" }));
    })
);

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

describe("Mock HTTP Requests with MSW - Login Component", () => {
    test("shows loading while submitting", async () => {
        const handleSubmit = jest.fn();
        render(<Login onSubmit={handleSubmit} />);

        await userEvent.type(screen.getByLabelText(/username/i), "testuser");
        await userEvent.type(screen.getByLabelText(/password/i), "testpassword");
        await userEvent.click(screen.getByRole("button", { name: /submit/i }));
    });

    test("submits login form successfully", async () => {
        const handleSubmit = jest.fn();
        render(<Login onSubmit={handleSubmit} />);

        await userEvent.type(screen.getByLabelText(/username/i), "testuser");
        await userEvent.type(screen.getByLabelText(/password/i), "testpassword");
        await userEvent.click(screen.getByRole("button", { name: /submit/i }));

        expect(handleSubmit).toHaveBeenCalledWith({
        username: "testuser",
        password: "testpassword",
        });
        expect(handleSubmit).toHaveBeenCalledTimes(1);
    });

    test("shows an error when username and password are missing", async () => {
        const handleSubmit = jest.fn();
        render(<Login onSubmit={handleSubmit} />);

        await userEvent.click(screen.getByRole("button", { name: /submit/i }));
    });

    test("shows an error when only username is provided", async () => {
        const handleSubmit = jest.fn();
        render(<Login onSubmit={handleSubmit} />);

        await userEvent.type(screen.getByLabelText(/username/i), "testuser");
        await userEvent.click(screen.getByRole("button", { name: /submit/i }));
    });

    test("shows an error when only password is provided", async () => {
        const handleSubmit = jest.fn();
        render(<Login onSubmit={handleSubmit} />);

        await userEvent.type(screen.getByLabelText(/password/i), "testpassword");
        await userEvent.click(screen.getByRole("button", { name: /submit/i }));
    });

    test("shows an error message for invalid credentials", async () => {
        const handleSubmit = jest.fn();
        render(<Login onSubmit={handleSubmit} />);

        await userEvent.type(screen.getByLabelText(/username/i), "wronguser");
        await userEvent.type(screen.getByLabelText(/password/i), "wrongpassword");
        await userEvent.click(screen.getByRole("button", { name: /submit/i }));
    });
});
