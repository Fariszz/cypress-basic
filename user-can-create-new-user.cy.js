describe("template spec", () => {
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
    cy.get(".card-header-action > .btn-icon").click();
  });
  it("user can create new user", () => {
    //act
    cy.get("#name").type("baru");
    cy.get("#email").type("baru@gmail");
    cy.get("#password").type("password");
    cy.get(".btn-primary").click();

    //assert
    cy.get("p").should("be.visible");
    cy.get("p").should("have.text", "Data Berhasil Ditambahkan");
    cy.get(".nav-link > .d-sm-none").click();
    cy.get('[data-id="logout-btn"').click();
  });

  it("user cannot create new user because invalid email", () => {
    cy.get("#name").type("baru");
    cy.get("#email").type("superadmin");
    cy.get("#password").type("password");
    cy.get(".btn-primary").click();

    cy.get(".invalid-feedback").should("be.visible");
    cy.get(".invalid-feedback").should("contain", "The email must be a valid email address.");

    cy.get(".invalid-feedback").should("have.class", "invalid-feedback");
    cy.get(".nav-link > .d-sm-none").click();
    cy.get('[data-id="logout-btn"').click();
  });

  it.only("user cannot create new user because name is required", () => {
    cy.get('#email').type("baru@gmail.com");
    cy.get('#password').type("1234567890");
    cy.get(".btn-primary").click();

    // assert
    cy.get(".invalid-feedback").should("be.visible");
    cy.get(".invalid-feedback").should("have.class", "invalid-feedback");
    cy.get(".invalid-feedback").should("contain", "The name field is required.");

    cy.get(".nav-link > .d-sm-none").click();
    cy.get('[data-id="logout-btn"').click();
  });
});
