describe("ErrorPage Component", () => {
  beforeEach(() => {
    cy.visit("localhost:3000/error-page");
  });

  it("displays default error message when no error is provided", () => {
    cy.contains("Sorry, an unexpected error has occurred.");
  });
});
