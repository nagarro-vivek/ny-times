import React from "react";
import { render } from "@testing-library/react";
import Header from "../views/Header";

describe("Header", () => {
  test("renders the header component with correct title", () => {
    const { getByText } = render(<Header />);
    const titleElement = getByText("New York Times");
    expect(titleElement).toBeInTheDocument();
    expect(titleElement.tagName).toBe("DIV"); // Asserts that the element is a div
    expect(titleElement).toHaveStyle({ fontSize: "1.25rem" }); // Asserts that the font size is correct
  });

  test("renders the header component with correct position", () => {
    const { getByRole } = render(<Header />);
    const appBarElement = getByRole("banner");
    expect(appBarElement).toBeInTheDocument();
    expect(appBarElement).toHaveStyle({ position: "static" }); // Asserts that the position is correct
  });
});
