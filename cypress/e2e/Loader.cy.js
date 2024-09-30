describe("Loader", () => {
  beforeEach(() => {
    cy.visit("localhost:3000");
  });

  it("should render the Loader component", () => {
    cy.get("[data-testid=loader]").should("exist");
  });

  it("should display circular progress indicator", () => {
    cy.get("[data-testid=circular-progress]").should("exist");
  });

  it('should display "Loading..." text', () => {
    cy.contains("Loading...").should("exist");
  });
});
