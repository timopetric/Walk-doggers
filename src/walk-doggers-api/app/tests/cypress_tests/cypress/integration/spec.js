describe('Register', () => {
  it('Go on register page', () => {
    cy.visit("http://localhost:19006/")
    cy.contains("Register").click()
    cy.contains("FIRST NAME")
    cy.contains("LAST NAME")
  })
  it("Entering register data...", () => {
    cy.get('input[data-testid="fn"').first().click({force: true}).type('test');
    cy.get('input[data-testid="ln"').first().click({force: true}).type('test');
    cy.get('div[data-testid="log"]').first().click({force: true})
    cy.contains("Dogs for rent nearby")
  })
  it("Signing out...", () => {
    cy.contains('Settings').click();
    cy.get('div[data-testid="logoutBtn"]').first().click({force: true})
    cy.contains("Login")
  })
})

/*
describe('Login with previously registered account', () => {
  it('Inputing data...', () => {
    cy.get('input[data-testid="email"').first().click({force: true});
    cy.get('input[data-testid="email"').first().type('test');
    cy.contains("Login").click()
    cy.contains("Dogs for rent nearby")
  })
})
*/
