describe("Header", () => {
  beforeEach(() => {
    cy.visit("localhost:3000");
  });

  it("should render the Header component", () => {
    cy.get("[data-testid=header]").should("exist");
  });

  it('should display "New York Times" text', () => {
    cy.contains("New York Times").should("exist");
  });
});
