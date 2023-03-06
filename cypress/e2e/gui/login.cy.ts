/// <reference types = "Cypress" />

describe('Login | Desafio Base2 | Automação Web', {
  retries: {
    runMode: 3,
    openMode: 1
  }
}, () => {
  it('validar login', () => {
    cy.realizarLogoff()

    const options = { cacheSession: false }

    cy.login(options)
    cy.visit('/')

    if (Cypress.env('environment') === 'homolog') {
      cy.get('#trial_banner').should('contain.text', 'Trial Version:')
    } else {
      cy.get('address').should('be.visible').contains('MantisBT')
    }
  })
})
