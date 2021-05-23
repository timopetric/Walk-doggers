describe('Register', () => {
  it('Go on register page', () => {
    cy.visit("http://localhost:19006/")
    cy.contains("Sign Up", { timeout: 10000 }).click()
    cy.contains("FIRST NAME")
    cy.contains("LAST NAME")
  })
  it("Entering register data...", () => {
    cy.get('input[placeholder="Enter your firstname"]').first().click({ force: true }).type('Anja');
    cy.get('input[data-testid="ln"]').first().click({ force: true }).type('Novak');
    cy.get('.r-marginBottom-8d26hk > [data-testid=email]').first({ force: true }).click({ force: true }).type('aaa@a.a', { force: true });
    // cy.get('input[placeholder*="email"]').first().click({ force: true }).type('aaa@a.a');
    cy.get('.r-marginBottom-8d26hk > [data-testid=pass]').first().click({ force: true }).type('Dobr0$Geslo');
    cy.get('.r-marginBottom-8d26hk > [data-testid=reg]').first().click()
    // cy.get('div[data-testid="log"]').first().click({force: true})
    cy.contains("Dogs for rent nearby")
  })
})

describe('Log in', () => {
  it('Go on login page', () => {
    cy.visit("http://localhost:19006/")
    cy.contains("Sign Up", { timeout: 10000 }).click()
    cy.contains("FIRST NAME")
    cy.contains("LAST NAME")
  })
  it("Enter login data", () => {
    cy.visit("http://localhost:19006/")
    cy.get('input[placeholder="Enter your email address"]').first().click({ force: true }).type('aaa@a.a');
    cy.get('input[placeholder="Enter your password"]').first().click({ force: true }).type('Dobr0$Geslo');
    cy.get('div[data-testid="log"]').click()
    // cy.get('div[data-testid="log"]').first().click({force: true})
    cy.contains("Dogs for rent nearby")
  })
})
  // it("Signing out...", () => {
  //   cy.contains('Settings').click();
  //   cy.get('div[data-testid="logoutBtn"]').first().click({force: true})
  //   cy.contains("Login")
  // })



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
