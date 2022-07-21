describe("Appointments", () => {
  beforeEach(() => {
    cy.request("GET", "http://localhost:8000/api/debug/reset");
    cy.visit("http://localhost:8000/");
    cy.contains("Monday");
  })
  it("should book an interview", () => {
    cy.get('[alt=Add]')
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

  it("should edit an interview", () => {
    cy.get("[alt=Edit]")
    .first()
    .click({force: true})

    cy.get('[alt="Tori Malcolm"]')
    .click()

    cy.get('[data-testid=student-name-input]')
    .clear()
    .type("Snowie", {delay: 200})

    cy.contains("Save")
    .click();

    cy.contains(".appointment__card--show", "Snowie");
    cy.contains(".appointment__card--show", "Tori Malcolm");
  });

  it("should cancel an interview", () => {
    cy.get("[alt=Delete]")
    .first()
    .click({force: true})

    cy.contains("Confirm")
    .click();

    cy.contains("Deleting").should("exist");
    cy.contains("Deleting").should("not.exist");

    cy.contains(".appointment__card--show", "Archie Cohen")
    .should("not.exist");
  })
});