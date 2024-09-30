// import React from "react";
// import { render } from "@testing-library/react";
// import Header from "../views/Header";

// describe("Header", () => {
//   test("renders the header component with correct title", () => {
//     const { getByText } = render(<Header />);
//     const titleElement = getByText("New York Times");
//     expect(titleElement).toBeInTheDocument();
//     expect(titleElement.tagName).toBe("DIV"); // Asserts that the element is a div
//     expect(titleElement).toHaveStyle({ fontSize: "1.25rem" }); // Asserts that the font size is correct
//   });

//   test("renders the header component with correct position", () => {
//     const { getByRole } = render(<Header />);
//     const appBarElement = getByRole("banner");
//     expect(appBarElement).toBeInTheDocument();
//     expect(appBarElement).toHaveStyle({ position: "static" }); // Asserts that the position is correct
//   });
// });

import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import Header from "../views/Header";
import { createMemoryHistory } from "history";
import { Router } from "react-router";

// Wrapping the component with BrowserRouter for routing.
const renderWithRouter = (ui: React.ReactElement) => {
  return render(<BrowserRouter>{ui}</BrowserRouter>);
};

describe("Header Component", () => {
  test("renders AppBar, Toolbar, and Typography", () => {
    renderWithRouter(<Header />);

    // Check if AppBar and Toolbar are present
    const header = screen.getByTestId("header");
    expect(header).toBeInTheDocument();

    // Check if the Typography with "New York Times" text is rendered
    const title = screen.getByText(/New York Times/i);
    expect(title).toBeInTheDocument();
  });

  test("clicking Typography should navigate to the home page", () => {
    const history = createMemoryHistory();
    history.push("/some-other-page");

    // Render component with a custom router
    render(
      <Router location={history.location} navigator={history}>
        <Header />
      </Router>
    );

    // Click on the Typography with "New York Times" text
    const title = screen.getByText(/New York Times/i);
    fireEvent.click(title);

    // Ensure the page navigates to the home page ("/")
    expect(history.location.pathname).toBe("/");
  });

  test("Typography should have a cursor pointer style", () => {
    renderWithRouter(<Header />);

    const title = screen.getByText(/New York Times/i);

    // Check if the Typography has the pointer cursor style
    expect(title).toHaveStyle({ cursor: "pointer" });
  });
});
