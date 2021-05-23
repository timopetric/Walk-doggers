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
  // LOGIN USER
  it("Go on login and enter login data", () => {
    cy.visit("http://localhost:19006/")
    cy.get('input[placeholder="Enter your email address"]').first().click({ force: true }).type('aaa@a.a');
    cy.get('input[placeholder="Enter your password"]').first().click({ force: true }).type('Dobr0$Geslo');
    cy.get('div[data-testid="log"]').click()
    cy.contains("Dogs for rent nearby")
  })
})

describe('Settings - Profile', () => {
  it('Go on settings page', () => {
    cy.get('[href="/Root/Settings"]').click()
    cy.contains("Profile")
  })

  it('Change user name and description', () => {
    cy.get(':nth-child(1) > .r-borderBottomColor-uuzew').click()
    cy.get(':nth-child(2) > .css-textinput-11aywtz').should("have.value", "Anja").type(" Teja")
    cy.get(':nth-child(3) > .css-textinput-11aywtz').should("have.value", "Novak")
    cy.get(':nth-child(5) > .css-textinput-11aywtz').type("Prijazna punca")
    cy.get('[style="margin-bottom: 20px; transition-duration: 0s;"] > .css-view-1dbjc4n').click()
    cy.contains("Profile")
  })

  it('Check if user name and description really saved and revert changes', () => {
    cy.get(':nth-child(1) > .r-borderBottomColor-uuzew').click()
    cy.get(':nth-child(2) > .css-textinput-11aywtz').should("have.value", "Anja Teja").type("{backspace}{backspace}{backspace}{backspace}{backspace}")
    cy.get(':nth-child(3) > .css-textinput-11aywtz').should("have.value", "Novak")
    cy.get(':nth-child(5) > .css-textinput-11aywtz').should("have.value", "Prijazna punca").type("{backspace}{backspace}{backspace}{backspace}{backspace}{backspace}{backspace}{backspace}{backspace}{backspace}{backspace}{backspace}{backspace}{backspace}")
    cy.get('[style="margin-bottom: 20px; transition-duration: 0s;"] > .css-view-1dbjc4n').click()
    cy.contains("Profile")
  })

  // it('', () => {
  //   cy.get(':nth-child(2) > .r-borderBottomColor-uuzew').click()
  //   cy.get('[style="margin-right: 72px; margin-left: 72px;"] > .css-reset-4rbku5').contains("My Dogs")

  // })
  // it('Change user name and description', () => {})
  // it('Change user name and description', () => {})

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
