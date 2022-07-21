describe("Appointments", () => {
  beforeEach(() => {
    cy.request("GET", "http://localhost:8000/api/debug/reset");
    cy.visit("http://localhost:8000/");
    cy.contains("Monday");
  })
  it("should book an interview", () => {
    cy.contains("Monday")
    .get('[alt=Add]')
    .first()
    .click()

    cy.get('[data-testid="student-name-input"]')
    .type("Snowie", {delay: 150})

    cy.get('[alt="Sylvia Palmer"]')
    .click()
    
    cy.contains("Save")
    .click();

    cy.contains(".appointment__card--show", "Snowie");
    cy.contains(".appointment__card--show", "Sylvia Palmer");
  });

});