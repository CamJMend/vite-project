import * as React from 'react';
import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import { UserList } from './UserList';

const users = [
    { id: 1, name: "Alex", isManager: true },
    { id: 2, name: "Camila", isManager: false },
    { id: 3, name: "Santi", isManager: true },
];

const emptyUsers = [];

describe("UserList component", () => {
    test("Test if the UserList component renders correctly with a list of users", () => {
        render(<UserList users={users} />);

        expect(screen.getByText("User List")).toBeInTheDocument();
        expect(screen.getByText("Alex")).toBeInTheDocument();
        expect(screen.getByText("Camila")).toBeInTheDocument();
        expect(screen.getByText("Santi")).toBeInTheDocument();
    });

    test("Test if the 'No users found' message is displayed when the users prop is empty", () => {
        render(<UserList users={emptyUsers} />);

        expect(screen.getByText("No users found")).toBeInTheDocument();
    });

    test("Test if the user names are displayed as links in the list", () => {
        render(<UserList users={users} />);

        users.forEach((user) => {
        const linkElement = screen.getByText(user.name);
        expect(linkElement.tagName).toBe("A");
        expect(linkElement).toHaveAttribute("href", `#user-${user.id}`);
        });
    });
});
