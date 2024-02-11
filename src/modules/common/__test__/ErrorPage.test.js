import React from "react";
import { render } from "@testing-library/react";

import { useRouteError } from "react-router-dom";
import ErrorPage from "../views/ErrorPage";
import "@testing-library/jest-dom";

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useRouteError: jest.fn(),
}));

describe("ErrorPage", () => {
  test("renders error message with status text if available", () => {
    const errorMessage = "Not found";
    const statusText = "Page not found";
    useRouteError.mockReturnValue({ message: errorMessage, statusText });

    const { getByText } = render(<ErrorPage />);

    expect(getByText(statusText)).toBeInTheDocument();
  });

  test("renders generic error message if error object is empty", () => {
    useRouteError.mockReturnValue(null);

    const { getByText } = render(<ErrorPage />);

    expect(
      getByText("Sorry, an unexpected error has occurred.")
    ).toBeInTheDocument();
  });
});
