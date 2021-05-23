// REGISTER USER
// describe('Register', () => {
//   it('Go on register page', () => {
//     cy.visit("http://localhost:19006/")
//     cy.contains("Sign Up", { timeout: 10000 }).click()
//     cy.contains("FIRST NAME")
//     cy.contains("LAST NAME")
//   })
//   it("Entering register data...", () => {
//     cy.get('input[placeholder="Enter your firstname"]').first().click({ force: true }).type('Anja');
//     cy.get('input[data-testid="ln"]').first().click({ force: true }).type('Novak');
//     cy.get('.r-marginBottom-8d26hk > [data-testid=email]').first({ force: true }).click({ force: true }).type('aaa@a.a', { force: true });
//     // cy.get('input[placeholder*="email"]').first().click({ force: true }).type('aaa@a.a');
//     cy.get('.r-marginBottom-8d26hk > [data-testid=pass]').first().click({ force: true }).type('Dobr0$Geslo');
//     cy.get('.r-marginBottom-8d26hk > [data-testid=reg]').first().click()
//     // cy.get('div[data-testid="log"]').first().click({force: true})
//     cy.contains("Dogs for rent nearby")
//   })
// })

// LOGIN USER
describe('Log in', () => {
  it("Go on login and enter login data", () => {
    // cy.visit("http://localhost:19006/")
    cy.visit('http://localhost:19006/', {
      onBeforeLoad(win) {
        const latitude = 46.38879;
        const longitude = 14.15899;
        cy.stub(win.navigator.geolocation, 'getCurrentPosition').callsFake((cb) => {
          return cb({ coords: { latitude, longitude } });
        });
      },
    });
    cy.get('input[placeholder="Enter your email address"]').first().click({ force: true }).type('aaa@a.a');
    cy.get('input[placeholder="Enter your password"]').first().click({ force: true }).type('Dobr0$Geslo');
    cy.get('div[data-testid="log"]').click()
    cy.contains("Dogs for rent nearby")
  })
})

// SETTINGS - PROFILE
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
})

/*
// SETTINGS - MY DOGS, ADD DOG
describe('Settings - My dogs, add dog', () => {
  it('Go on settings page', () => {
    cy.get('[href="/Root/Settings"]').click()
    cy.contains("Profile")
  })
  it('Add dog', () => {
    cy.get(':nth-child(2) > .r-borderBottomColor-uuzew').click()
    cy.get('[style="margin-right: 72px; margin-left: 72px;"] > .css-reset-4rbku5').contains("My Dogs")

    cy.get('.r-pointerEvents-105ug2t > :nth-child(1) > :nth-child(1) > :nth-child(1) > :nth-child(1) > .r-display-6koalj > :nth-child(2) > :nth-child(2) > :nth-child(1) > .r-flex-13awgt0.r-overflow-1udh08x > .r-flexDirection-1d5kdc7 > :nth-child(2) > :nth-child(1) > [style="height: 64px;"] > .r-flex-13awgt0 > .r-alignItems-obd0qt > .r-overflow-1udh08x > .css-cursor-18t94o4 > .css-view-1dbjc4n').click()
    cy.get(':nth-child(1) > .css-textinput-11aywtz').type("Test dog")
    cy.get(':nth-child(2) > .css-textinput-11aywtz').type("Test description")
    cy.get('.r-marginTop-1x0uki6 > :nth-child(5) > .css-view-1dbjc4n').click()

    cy.get('[style="margin-right: 72px; margin-left: 72px;"] > .css-reset-4rbku5').contains("My Dogs")
    cy.contains("Test dog", { timeout: 10000 }).scrollIntoView()
    cy.get('[data-testid=header-back]').click()
  })
})

// SETTINGS - BECOME A REPORTER
describe('Settings - Become a reporter', () => {
  it('Go on settings page', () => {
    cy.get('[href="/Root/Settings"]').click()
    cy.get(':nth-child(3) > .r-borderBottomColor-uuzew').click()
    cy.get('.r-padding-1pcd2l5 > .r-cursor-1loqt21 > .css-view-1dbjc4n > .css-text-901oao').contains("Become a reporter")
  })
  it('Become a reporter', () => {
    cy.get('.r-padding-1pcd2l5 > .r-cursor-1loqt21 > .css-view-1dbjc4n').scrollIntoView().click()
    cy.get('[style="transition-duration: 0.25s;"] > .r-borderBottomColor-uuzew').should('not.exist');
  })
})
*/