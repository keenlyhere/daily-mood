describe('Daily Mood', () => {
  it("finds the developer name", () => {
    cy.visit("/")
    cy.contains("Keenly")
  })

  it('is able to login', () => {
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

  it('is able to login to demo user', () => {
    cy.visit('/')

    cy.contains('Log In').click()

    cy.get(".LoginFormModal-demo").click()

    cy.contains("Moolah")
  })

  it('is able to logout', () => {
    cy.visit('/')

    cy.contains('Log In').click()

    cy.get(".LoginFormModal-demo").click()

    cy.contains("Moolah")

    cy.contains('Logout').click()
  })
})
