import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import useSWRImmutable from "swr/immutable";


import * as router from "react-router";
import LandingPage from "../views/LandingPage";

jest.mock("swr/immutable", () => jest.fn());


describe("Landing 1", () => {
  beforeEach(() => {
    jest.clearAllMocks();
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

  test("clicking on article card navigates to details page", async () => {
    const navigate = jest.fn();
    jest.spyOn(router, "useNavigate").mockImplementation(() => navigate);

    render(<LandingPage />);

    fireEvent.click(screen.getByText("Article 1"));

    await waitFor(() => {
      expect(navigate).toHaveBeenCalledWith("/details/1"
      );
    });
  });
});
