/// <reference types = "Cypress" />

describe('Login | Desafio Base2 | Automação Web', {
  retries: {
    runMode: 3,
    openMode: 1
  }
}, () => {
  it('validar login', () => {
    const user = Cypress.env('user_name')
    const password = Cypress.env('user_password')
    const options = { cacheSession: false }

    cy.login(user, password, options)
    cy.visit('/')
    cy.get('address').should('be.visible').contains('MantisBT')
  })
})
