describe('Daily Mood', () => {
  it("finds the developer name", () => {
    cy.visit("/")
    cy.contains("Keenly")
  })

  it('is able to login', () => {
    cy.login("amy@gmail.com", "password");
    // cy.visit('/')

    // cy.contains('Log In').click()

    // // Get an input, type into it
    // cy.get('#credential').type('amy@gmail.com')

    // //  Verify that the value has been updated
    // cy.get('#credential').should('have.value', 'amy@gmail.com')

    // // Get an input, type into it
    // cy.get('#password').type('password')

    // //  Verify that the value has been updated
    // cy.get('#password').should('have.value', 'password')

    // cy.get(".LoginFormModal-submit").click()

    // cy.contains("Moolah")
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

  it('is able to select a mood', () => {
    cy.login("amy@gmail.com", "password")

    cy.visit("/daily");

    cy.get(".SideBar-moolah").then(($moolah) => {
      const moolah = $moolah.text();

      cy.get("#Content").click()

      cy.get("#Content").should("have.class", "active-mood")

      cy.get(".fa-trash").click()


      cy.get(".SideBar-moolah").should(($moolah2) => {
        expect($moolah2.text()).not.to.eq(moolah)
      })


    })
    
    cy.get(".ConfirmDelete-delete-button").click()

  })
})
