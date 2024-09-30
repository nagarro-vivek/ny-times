import { fetcher } from "../api/apiHelper";

global.fetch = jest.fn();

describe("fetcher", () => {
  beforeEach(() => {
    fetch.mockClear();
  });

  test("fetches data from URL and returns parsed JSON response", async () => {
    const responseData = { key: "value" };
    const mockedResponse = {
      json: jest.fn().mockResolvedValue(responseData),
    };
    fetch.mockResolvedValue(mockedResponse);

    const url = "https://example.com/api";
    const data = await fetcher(url);

    expect(fetch).toHaveBeenCalledWith(url);
    expect(mockedResponse.json).toHaveBeenCalled();
    expect(data).toEqual(responseData);
  });

  test("throws an error if fetch fails", async () => {
    const errorMessage = "Failed to fetch data";
    fetch.mockRejectedValue(new Error(errorMessage));

    const url = "https://example.com/api";
    await expect(fetcher(url)).rejects.toThrow(errorMessage);
  });
});
