describe('User can login to system', () => {
  it('user can login with valid username and password', () => {
    // arrange
    cy.visit('http://localhost:8000')

    // act
    cy.get('[data-id="email"]').type('superadmin@gmail.com');
    cy.get('[data-id="password"]').type('password');
    cy.get('[data-id="submit"]').click();
    
    // assert
    cy.get('[data-id="username"').click();
    cy.get('[data-id="logout-btn"').click();
  })
})