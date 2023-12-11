describe('User can edit existing data', () => {

    // before each test case
    beforeEach(() => {
      // arrange
      cy.visit("http://localhost:8000");
  
      // reset database usy cypress command
      cy.exec("cd F:/polinema/Belajar/Semester 7/QA/demo-app-cypress-automation && php artisan migrate:fresh --seed");
  
      // act
      cy.get(":nth-child(2) > .form-control").type("superadmin@gmail.com");
      cy.get(":nth-child(3) > .form-control").type("password");
      cy.get(".btn").click();
      cy.visit("http://localhost:8000/user-management/user");
      // cy.get(".card-header-action > .btn-icon").click();
    })

  it("User can edit existing data", () => {
    cy.get(".table td")
    .contains("user")
    .parent()
    .find("a")
    .contains("Edit")
    .click();

  cy.get("#name").clear("user");
  cy.get("#name").type("user edited");
  cy.get(".btn-primary").contains("Submit").click();
  cy.get(".table td").contains("user").should("have.text", "user edited");
  cy.get(".alert")
  .should("be.visible")
  .and("have.class", "alert-success")
  .and("contain", "User Berhasil Diupdate");
  })

  
})