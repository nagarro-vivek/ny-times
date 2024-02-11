describe("DetailsPage", () => {
  beforeEach(() => {
    cy.visit("localhost:3000/details/1");
  });

  it("should render the DetailsPage component", () => {
    cy.get("[data-testid=details-page]").should("exist");
  });

  it("should display loader while fetching data", () => {
    cy.get('[data-testid="circular-progress"]').should("exist");
  });

  it("should display error page if there is an error fetching data", () => {
    cy.intercept("GET", "https://api.nytimes.com/**", { statusCode: 500 });

    cy.visit("localhost:3000/details/1");
    cy.get('[data-testid="error-page"]').should("exist");
  });

  it("displays loading message while data is being fetched", () => {
    cy.visit("localhost:3000/details/1");
    cy.contains("Loading...").should("exist");
  });

  it("displays article details when data fetch is successful", () => {
    const mockData = {
      results: [
        {
          id: 1,
          title: "Article 1",
          published_date: "2022-01-01",
          byline: "Author 1",
        },
      ],
    };
    cy.intercept(
      "https://api.nytimes.com/svc/mostpopular/v2/viewed/7.json*",
      mockData
    );
    cy.visit("localhost:3000/details/1");
    cy.contains("Article 1").should("exist");
    cy.contains("2022-01-01").should("exist");
    cy.contains("Author 1").should("exist");
  });
});
