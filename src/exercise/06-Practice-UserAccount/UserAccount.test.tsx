import * as React from 'react';
import "@testing-library/jest-dom";
import userEvent from "@testing-library/user-event";
import { render, screen } from "@testing-library/react";
import { UserAccount } from './UserAccount';

describe("UserAccount component", () => {
    test("Test if the UserAccount component renders correctly with a user prop.", async () => {
        const user = { id: 1, name: "Alex", isManager: false };

        render(<UserAccount user={user} />);

        expect(screen.getByText("User Profile")).toBeInTheDocument();
        expect(screen.getByText(/Name:/)).toBeInTheDocument();
        expect(screen.getByText("Alex")).toBeInTheDocument();
    });

    test("Test if the Edit button is displayed only when the user is a manager.", async () => {
        const managerUser = { id: 2, name: "Camila", isManager: true };

        render(<UserAccount user={managerUser} />);

        expect(screen.getByText("Edit")).toBeInTheDocument();
    });

    test("Test if the Edit button is not displayed when the user is not a manager.", async () => {
        const regularUser = { id: 3, name: "Charlie", isManager: false };

        render(<UserAccount user={regularUser} />);

        expect(screen.queryByText("Edit")).not.toBeInTheDocument();
    });
});
