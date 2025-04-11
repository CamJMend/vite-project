import * as React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import Counter from "../sharedComponent/Counter";
import userEvent from "@testing-library/user-event";

describe("Render Counter and userEvent called increment and decrement", () => {
  test("counter increments and decrements when the buttons are clicked", async () => {
    render(<Counter />);

    const incrementButton = screen.getByRole("button", { name: /increment/i });
    const decrementButton = screen.getByRole("button", { name: /decrement/i });

    expect(screen.getByText(/counter: 0/i)).toBeInTheDocument();

    await userEvent.click(incrementButton);
    expect(screen.getByText(/counter: 1/i)).toBeInTheDocument();

    await userEvent.click(decrementButton);
    expect(screen.getByText(/counter: 0/i)).toBeInTheDocument();
  });
});