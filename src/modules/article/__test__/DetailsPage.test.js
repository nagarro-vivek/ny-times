import React from "react";
import { render, waitFor } from "@testing-library/react";

import { useParams, useLocation } from "react-router";
import DetailsPage from "../views/DetailsPage";
import useSWRImmutable from "swr/immutable";

jest.mock("swr/immutable", () => jest.fn());

// Mocking the useParams and useLocation hooks
jest.mock("react-router", () => ({
  useParams: jest.fn(),
  useLocation: jest.fn(),
}));

describe("DetailsPage", () => {
  beforeEach(() => {
    // Clear the mock implementation of fetch before each test
    // (fetch as jest.Mock).mockClear();

    useParams.mockReturnValue({ id: "1" }); // Mock useParams to return an article ID
    useLocation.mockReturnValue({
      state: {
        articleDetail: {
          id: 1,
          title: "Test Title",
          published_date: "2022-01-01",
          byline: "Test Author",
        },
      },
    }); // Mock useLocation to return articleDetail state
  });

  test("renders loading state", () => {
    useSWRImmutable.mockReturnValueOnce({ data: undefined, error: undefined });
    const { getByText } = render(<DetailsPage />);

    expect(getByText("Loading...")).toBeInTheDocument();
  });

  // test("renders error state", async () => {
  //   // Mocking useSWRImmutable to return an error
  //   const errorMessage = "Not found";
  //   const statusText = "Page not found";

  //   useSWRImmutable.mockReturnValueOnce({
  //     data: {results:[]},
  //     error: { message: errorMessage, statusText },
  //   });

  //   const { getByText } = render(<DetailsPage />);

  //   expect(getByText(statusText)).toBeInTheDocument();
  // });

  test("renders article details", async () => {
    // Mocking useSWRImmutable to return mock data
    useSWRImmutable.mockReturnValue({
      data: {
        results: [
          {
            id: 1,
            title: "Test Title",
            published_date: "2022-01-01",
            byline: "Test Author",
            per_facet: ["first", "second"],
            section: "test section",
            subsection: "test subsection",
          },
        ],
        error: null,
      },
    });

    const { getByText } = render(<DetailsPage />);

    await waitFor(() => {
      expect(getByText("Test Title")).toBeInTheDocument();
      expect(getByText("Published Date: 2022-01-01")).toBeInTheDocument();
      expect(getByText("Test Author")).toBeInTheDocument();
      expect(getByText("Section : test section")).toBeInTheDocument();
      expect(getByText("Sub-section : test subsection")).toBeInTheDocument();
      expect(getByText("Postulates")).toBeInTheDocument();
      expect(getByText("first")).toBeInTheDocument();
      expect(getByText("second")).toBeInTheDocument();
    });
  });
});
