import React from "react";
import { render } from "@testing-library/react";
import Loader from "../views/Loader";

describe("Loader", () => {
  test("renders the loader component with correct content", () => {
    const { getByText } = render(<Loader />);
    const loadingTextElement = getByText("Loading...");
    expect(loadingTextElement).toBeInTheDocument();
  });

  test("renders the loader component with correct styles", () => {
    const { container } = render(<Loader />);
    const backdropElement = container.firstChild;
    expect(backdropElement).toBeInTheDocument();
  });

  test("renders the loader component with circular progress", () => {
    const { getByTestId } = render(<Loader />);
    const circularProgressElement = getByTestId("circular-progress");
    expect(circularProgressElement).toBeInTheDocument();
  });
});
