import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import useSWRImmutable from "swr/immutable";

import LandingPage from "../views/LandingPage";

jest.mock("swr/immutable", () => jest.fn());

const mockedUsedNavigate = jest.fn();
jest.mock("react-router", () => ({
  ...jest.requireActual("react-router"),
  useNavigate: () => mockedUsedNavigate,
  useRouteError: jest.fn(),
}));

describe("LandingPage", () => {
  beforeEach(() => {
    useSWRImmutable.mockReturnValue({
      data: {
        results: [
          {
            id: 1,
            title: "Article 1",
            published_date: "2022-01-01",
            byline: "Author 1",
          },
          {
            id: 2,
            title: "Article 2",
            published_date: "2022-01-02",
            byline: "Author 2",
          },
        ],
      },
      error: null,
    });
  });

  test("renders loading state", () => {
    useSWRImmutable.mockReturnValueOnce({ data: undefined, error: undefined });
    render(<LandingPage />);

    expect(screen.getByText("Loading...")).toBeInTheDocument();
  });

  test("renders articles", async () => {
    render(<LandingPage />);

    await waitFor(() => {
      expect(screen.getByText("Articles")).toBeInTheDocument();
      expect(screen.getAllByRole("heading")).toHaveLength(3); // Assuming each article has a title
    });
  });
});
