// import React from "react";
// import { render, waitFor } from "@testing-library/react";

// import { useParams, useLocation } from "react-router";
// import DetailsPage from "../views/DetailsPage";
// import useSWRImmutable from "swr/immutable";

// jest.mock("swr/immutable", () => jest.fn());

// jest.mock("react-router", () => ({
//   useParams: jest.fn(),
//   useLocation: jest.fn(),
// }));

// describe("DetailsPage", () => {
//   beforeEach(() => {
//     useParams.mockReturnValue({ id: "1" });
//     useLocation.mockReturnValue({
//       state: {
//         articleDetail: {
//           id: 1,
//           title: "Test Title",
//           published_date: "2022-01-01",
//           byline: "Test Author",
//         },
//       },
//     });
//   });

//   test("renders loading state", () => {
//     useSWRImmutable.mockReturnValueOnce({ data: undefined, error: undefined });
//     const { getByText } = render(<DetailsPage />);

//     expect(getByText("Loading...")).toBeInTheDocument();
//   });

//   test("renders article details", async () => {
//     useSWRImmutable.mockReturnValue({
//       data: {
//         results: [
//           {
//             id: 1,
//             title: "Test Title",
//             published_date: "2022-01-01",
//             byline: "Test Author",
//             per_facet: ["first", "second"],
//             section: "test section",
//             subsection: "test subsection",
//           },
//         ],
//         error: null,
//       },
//     });

//     const { getByText } = render(<DetailsPage />);

//     await waitFor(() => {
//       expect(getByText("Test Title")).toBeInTheDocument();
//       expect(getByText("Published Date: 2022-01-01")).toBeInTheDocument();
//       expect(getByText("Test Author")).toBeInTheDocument();
//       expect(getByText("Section : test section")).toBeInTheDocument();
//       expect(getByText("Sub-section : test subsection")).toBeInTheDocument();
//       expect(getByText("Postulates")).toBeInTheDocument();
//       expect(getByText("first")).toBeInTheDocument();
//       expect(getByText("second")).toBeInTheDocument();
//     });
//   });
// });

import React from "react";
import { render, screen } from "@testing-library/react";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import DetailsPage from "./DetailsPage";
import usePopularArticles from "../hooks/usePopularArticles";
import Header from "../../common/views/Header";
import Loader from "../../common/views/Loader";
import ErrorPage from "../../common/views/ErrorPage";

// Mock the necessary dependencies
jest.mock("../hooks/usePopularArticles");
jest.mock("../../common/views/Header");
jest.mock("../../common/views/Loader");
jest.mock("../../common/views/ErrorPage");

describe("DetailsPage Component", () => {
  beforeEach(() => {
    // Reset mocks before each test
    jest.resetAllMocks();
  });

  test("should render Header and Loader when loading", () => {
    (usePopularArticles as jest.Mock).mockReturnValue({ data: null, error: null });
    (Header as jest.Mock).mockReturnValue(<div>Mock Header</div>);
    (Loader as jest.Mock).mockReturnValue(<div>Loading...</div>);

    render(
      <MemoryRouter initialEntries={["/details/1"]}>
        <Routes>
          <Route path="/details/:id" element={<DetailsPage />} />
        </Routes>
      </MemoryRouter>
    );

    expect(screen.getByText("Mock Header")).toBeInTheDocument();
    expect(screen.getByText("Loading...")).toBeInTheDocument();
  });

  test("should render ErrorPage when there's an error", () => {
    (usePopularArticles as jest.Mock).mockReturnValue({ data: null, error: true });
    (ErrorPage as jest.Mock).mockReturnValue(<div>Mock Error Page</div>);

    render(
      <MemoryRouter initialEntries={["/details/1"]}>
        <Routes>
          <Route path="/details/:id" element={<DetailsPage />} />
        </Routes>
      </MemoryRouter>
    );

    expect(screen.getByText("Mock Error Page")).toBeInTheDocument();
  });

  test("should render article details when data is loaded", () => {
    const mockArticle = {
      title: "Mock Article Title",
      abstract: "This is a mock abstract",
      published_date: "2023-01-01",
      byline: "By John Doe",
      section: "Technology",
      subsection: "AI",
      per_facet: ["Postulate 1", "Postulate 2"],
      media: [
        {
          "media-metadata": [
            { url: "mockurl-small" },
            { url: "mockurl-medium" },
            { url: "mockurl-large" },
          ],
        },
      ],
    };

    const mockData = {
      results: [
        {
          id: 1,
          ...mockArticle,
        },
      ],
    };

    (usePopularArticles as jest.Mock).mockReturnValue({ data: mockData, error: null });

    render(
      <MemoryRouter initialEntries={["/details/1"]}>
        <Routes>
          <Route path="/details/:id" element={<DetailsPage />} />
        </Routes>
      </MemoryRouter>
    );

    // Header
    expect(screen.getByTestId("details-page")).toBeInTheDocument();

    // Article details
    expect(screen.getByText("Mock Article Title")).toBeInTheDocument();
    expect(screen.getByText("This is a mock abstract")).toBeInTheDocument();
    expect(screen.getByText("Published Date: 2023-01-01")).toBeInTheDocument();
    expect(screen.getByText("By John Doe")).toBeInTheDocument();
    expect(screen.getByText("Section : Technology")).toBeInTheDocument();
    expect(screen.getByText("Sub-section : AI")).toBeInTheDocument();

    // List items (Postulates)
    expect(screen.getByText("Postulate 1")).toBeInTheDocument();
    expect(screen.getByText("Postulate 2")).toBeInTheDocument();

    // Check if the image is rendered correctly
    const image = screen.getByRole("img", { name: /Mock Article Title/i });
    expect(image).toHaveAttribute("src", "mockurl-large");
  });

  test("should handle case when no article is found", () => {
    const mockData = {
      results: [],
    };

    (usePopularArticles as jest.Mock).mockReturnValue({ data: mockData, error: null });

    render(
      <MemoryRouter initialEntries={["/details/999"]}>
        <Routes>
          <Route path="/details/:id" element={<DetailsPage />} />
        </Routes>
      </MemoryRouter>
    );

    expect(screen.queryByText("Mock Article Title")).not.toBeInTheDocument();
    expect(screen.getByTestId("details-page")).toBeInTheDocument();
  });

  test("should render default media image when article has no media", () => {
    const mockArticle = {
      title: "Mock Article Title Without Media",
      abstract: "This is a mock abstract",
      published_date: "2023-01-01",
      byline: "By John Doe",
      section: "Technology",
      subsection: "AI",
      per_facet: ["Postulate 1", "Postulate 2"],
      media: [],
    };

    const mockData = {
      results: [
        {
          id: 1,
          ...mockArticle,
        },
      ],
    };

    (usePopularArticles as jest.Mock).mockReturnValue({ data: mockData, error: null });

    render(
      <MemoryRouter initialEntries={["/details/1"]}>
        <Routes>
          <Route path="/details/:id" element={<DetailsPage />} />
        </Routes>
      </MemoryRouter>
    );

    // Check if the title is there
    expect(screen.getByText("Mock Article Title Without Media")).toBeInTheDocument();

    // In this case, the image would be undefined, so we need to handle this scenario (e.g., fallback image or no image at all)
    expect(screen.queryByRole("img")).not.toBeInTheDocument();
  });
});
