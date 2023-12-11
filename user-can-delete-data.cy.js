describe('User can delete data', () => {
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
  
  // positive test case
  it("user can create new user", () => {
    // cy.get(":nth-child(3) > .text-right > .d-flex > .ml-2 > .btn").click();
    // cy.get(":nth-child(2) > .swal-button").click();
    // cy.get("p").should("be.visible");
    // cy.get(".alert")
    // .should("be.visible")
    // .and("have.class", "alert-success")
    // .contains("User Deleted Successfully");

    cy.get(".table td")
    .contains("user")
    .parent()
    .find("button")
    .contains("Delete")
    .click();

    // make sure sweet alert visible
    cy.get(".swal-button-container").find("button").contains("OK").click();
    cy.get(".alert")
    .should("be.visible")
    .and("have.class", "alert-success")
    .contains("User Deleted Successfully");
    cy.get(".table").should("not.contain", "user");
    
    // arrange
    // act
    // assert
  });

  // negative test case
  it("user can cancel delete data", () => {
    // arrange
    // act
    // assert
    cy.get(".table td")
    .contains("user")
    .parent()
    .find("button")
    .contains("Delete")
    .click();
    // make sure sweet alert visible
    cy.get(".swal-button-container").find("button").contains("Cancel").click();

    // assert
    cy.get(".table td").contains("user").should("be.visible");
  });
});