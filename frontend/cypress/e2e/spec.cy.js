describe('Daily Mood', () => {
  it("finds the developer name", () => {
    cy.visit("/")
    cy.contains("Keenly")
  })

  it('clicks the link "login"', () => {
    cy.visit('/')

    cy.contains('Log In').click()

    // Get an input, type into it
    cy.get('#credential').type('amy@gmail.com')

    //  Verify that the value has been updated
    cy.get('#credential').should('have.value', 'amy@gmail.com')

    // Get an input, type into it
    cy.get('#password').type('password')

    //  Verify that the value has been updated
    cy.get('#password').should('have.value', 'password')

    cy.get(".LoginFormModal-submit").click()

    cy.contains("Moolah")
  })
})
