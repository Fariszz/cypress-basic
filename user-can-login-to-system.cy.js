describe("User Can Login To System", () => {
  // positive test
  it("user can login to system", () => {
    cy.visit("http://localhost:8000");

    // select element html login
    cy.get(":nth-child(2) > .form-control").type("superadmin@gmail.com");

    // select element html password
    cy.get(":nth-child(3) > .form-control").type("password");

    // click button login
    cy.get(".btn").click();

    // assertion success login
    cy.get(".nav-link > .d-sm-none").should("have.text", "Hi, SuperAdmin");
  });

  // negative test
  it("user cannot login with valid username and wrong password", () => {
    // arrange
    cy.visit("http://localhost:8000");

    //act
    cy.get(":nth-child(2) > .form-control").type("superadmin@gmail.com");
    cy.get(":nth-child(3) > .form-control").type("password-salah");
    cy.get(".btn").click();

    //assert
    cy.get(".invalid-feedback").should("have.text", "These credentials do not match our records.");
  });

  it("user cannot login with invalid username and valid password", () => {
    // arrange
    cy.visit("http://localhost:8000");

    //act
    cy.get(":nth-child(2) > .form-control").type("superadmin123@gmail.com");
    cy.get(":nth-child(3) > .form-control").type("password");
    cy.get(".btn").click();

    //assert
    cy.get(".invalid-feedback").should("have.text", "These credentials do not match our records.");
  });

  it("user cannot login with empty email and correct password", () => {
    // arrange
    cy.visit("http://localhost:8000");

    //act
    cy.get(":nth-child(2) > .form-control").invoke("val", "");
    cy.get(":nth-child(3) > .form-control").type("password");
    cy.get(".btn").click();

    //assert
    cy.get(".invalid-feedback").should("have.text", "The email field is required.");
  });

  it("user cannot login with valid email and empty password", () => {
    // arrange
    cy.visit("http://localhost:8000");

    //act
    cy.get(":nth-child(2) > .form-control").type("superadmin@gmail.com");
    cy.get(":nth-child(3) > .form-control").invoke("val", "");
    cy.get(".btn").click();

    //assert
    cy.get(".invalid-feedback").should("have.text", "The password field is required.");
  });

  // negative test
  it("user cannot login with empty email and empty password", () => {
    // arrange
    cy.visit("http://localhost:8000");

    //act
    cy.get(".btn").click();

    //assert
    cy.get(".invalid-feedback").should("have.text", "The email field is required.The password field is required.");
  });

  // Positif
  // Ketika login masukan username dan password tetapi sensitif huruf besar kecilnya
  it("Username dan password tetapi sensitif huruf besar kecilnya ", () => {
    // arrange
    cy.visit("http://127.0.0.1:8000/");

    // act
    cy.get(":nth-child(2) > .form-control").type("Superadmin@gmail.com");
    cy.get(":nth-child(3) > .form-control").type("password");
    cy.get(".btn").click();

    // assert
    cy.get(".nav-link > .d-sm-none").should("have.text", "Hi, SuperAdmin");
  });
});
