describe("LandingPage component", () => {
  beforeEach(() => {
    cy.visit("localhost:3000");
  });

  it("displays loading message while data is being fetched", () => {
    cy.visit("localhost:3000");
    cy.contains("Loading...").should("exist");
  });

  it("displays the header", () => {
    cy.get("header").should("exist");
  });

  it("displays loader while fetching data", () => {
    cy.get('[data-testid="circular-progress"]').should("exist");
  });

  it("displays error page if there is an error", () => {
    cy.intercept("GET", "https://api.nytimes.com/**", { statusCode: 500 });

    cy.visit("localhost:3000");
    cy.get('[data-testid="error-page"]').should("exist");
  });

  it("displays articles when data fetch is successful", () => {
    const mockData = {
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
    };
    cy.intercept(
      "https://api.nytimes.com/svc/mostpopular/v2/viewed/7.json*",
      mockData
    );
    cy.visit("localhost:3000");
    cy.contains("Articles").should("exist");
    cy.contains("Article 1").should("exist");
    cy.contains("Article 2").should("exist");
  });

  it("navigates to article detail page when article card is clicked", () => {
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
    cy.visit("localhost:3000");
    cy.contains("Article 1").click();
    cy.url().should("include", "/details/1");
  });
});
