describe('My First Test', () => {
  it('Finds Husky string in page', () => {
    cy.visit("http://localhost:19006")
    cy.contains("Husky")
  })

  it('Doesent find Husssky string in page', () => {
    cy.visit("http://localhost:19006")
    cy.contains("Husssky")
  })

})
