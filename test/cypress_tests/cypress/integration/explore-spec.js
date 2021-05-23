
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
      cy.contains("Dogs for rent nearby", { timeout: 10000 })
    })
  })
  
describe('Blog - Add new blog post', () => {
    it('Go on blog page', () => {
      cy.get('[href="/Root/Blog"]').click()
      cy.get('.r-pointerEvents-105ug2t > :nth-child(1) > :nth-child(1) > :nth-child(1) > :nth-child(1) > .r-display-6koalj > :nth-child(2) > :nth-child(2) > :nth-child(1) > .r-flex-13awgt0.r-overflow-1udh08x > .r-flexDirection-1d5kdc7 > :nth-child(2) > :nth-child(1) > [style="height: 64px;"] > .r-flex-13awgt0 > [style="margin-right: 16px; margin-left: 16px;"] > .css-reset-4rbku5').contains("Blog")
    })
    it('Add dog', () => {
      cy.get('.r-pointerEvents-105ug2t > :nth-child(1) > :nth-child(1) > :nth-child(1) > :nth-child(1) > .r-display-6koalj > :nth-child(2) > :nth-child(2) > :nth-child(1) > .r-flex-13awgt0.r-overflow-1udh08x > .r-flexDirection-1d5kdc7 > :nth-child(2) > :nth-child(1) > [style="height: 64px;"] > .r-flex-13awgt0 > .r-alignItems-obd0qt > .r-overflow-1udh08x > .css-cursor-18t94o4 > .css-view-1dbjc4n').click()
  
      cy.get('[style="margin-right: 72px; margin-left: 72px;"] > .css-reset-4rbku5').contains("New Blog Post")
  
      cy.get(':nth-child(1) > .css-textinput-11aywtz').type("Test blog post")
      cy.get(':nth-child(3) > .css-textinput-11aywtz').type("Test blog description")
      cy.get('.r-flex-13awgt0 > [style="transition-duration: 0s;"] > .css-view-1dbjc4n').click()
    })
  
    it("Login with moderator account to check if listing is unpublished", () => {
      // cy.visit("http://localhost:19006/")
      cy.visit('http://localhost:19006/', {
        onBeforeLoad (win) {
          const latitude = 46.38879;
          const longitude = 14.15899;
          cy.stub(win.navigator.geolocation, 'getCurrentPosition').callsFake((cb) => {
            return cb({ coords: { latitude, longitude } });
          });
        },
      });
      cy.get('input[placeholder="Enter your email address"]').first().click({ force: true }).type('admin@wd.com');
      cy.get('input[placeholder="Enter your password"]').first().click({ force: true }).type('super$trong2000pass');
      cy.get('div[data-testid="log"]').click()
      cy.contains("Dogs for rent nearby", { timeout: 10000 })
    })
  
    it('Go on blog page and approve "Test blog post"', () => {
      cy.get('[href="/Root/Blog"]').click()
      cy.get('.r-pointerEvents-105ug2t > :nth-child(1) > :nth-child(1) > :nth-child(1) > :nth-child(1) > .r-display-6koalj > :nth-child(2) > :nth-child(2) > :nth-child(1) > .r-flex-13awgt0.r-overflow-1udh08x > .r-flexDirection-1d5kdc7 > :nth-child(2) > :nth-child(1) > [style="height: 64px;"] > .r-flex-13awgt0 > [style="margin-right: 16px; margin-left: 16px;"] > .css-reset-4rbku5').contains("Blog")
  
      cy.contains("Test blog post").parent().parent().parent().find('.r-backgroundColor-14lw9ot > [style="padding: 16px;"] > :nth-child(4) > .css-view-1dbjc4n > .css-text-901oao').click()
      cy.get('.r-flex-13awgt0.r-flexDirection-18u37iz > :nth-child(2) > .css-view-1dbjc4n > .css-text-901oao').click()
    })
  
    it("Login back in with user account to check if listing is now published", () => {
      // cy.visit("http://localhost:19006/")
      cy.visit('http://localhost:19006/', {
        onBeforeLoad (win) {
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
      cy.contains("Dogs for rent nearby", { timeout: 10000 })
    })
    it('Check if blog post is now published', () => {
      cy.get('[href="/Root/Blog"]').click()
      cy.get('.r-fontSize-1blvdjr').contains("Test blog post")
    })
  })