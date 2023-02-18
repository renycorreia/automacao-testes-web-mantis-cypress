/// <reference types = "Cypress" />

describe('Desafio Base2 | Automação Web', {
    retries: {
        runMode: 3,
        openMode: 1,
    }
}, () => {
    it('validar login', function () {
        cy.login(Cypress.env('user_name'), Cypress.env('user_password'), false)
        cy.visit('/')
        cy.get('address').should('be.visible').contains('MantisBT')
    })
})