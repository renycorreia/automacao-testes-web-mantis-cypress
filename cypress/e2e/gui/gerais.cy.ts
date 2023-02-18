/// <reference types = "Cypress" />

describe('Desafio Base2 | Automação Web', {
    retries: {
        runMode: 3,
        openMode: 1,
    }
}, () => {

    beforeEach(function () {
        cy.login()
        cy.visit('/')
    })

    it('acessar página de gerenciamento', function () {
        cy.get('#sidebar > .nav-list > li > a')
            .each(($op) => {
                const href = $op.attr('href');
                if (href.valueOf() === '/manage_overview_page.php') {
                    cy.visit('http://localhost:8989' + href)
                }
            })

        cy.get('.widget-title').should('contain.text', 'Informação do Site')
        cy.get('#manage-overview-table').should('be.visible')
    })

    it('acessar página de resumo', function () {
        cy.get('#sidebar > .nav-list > li > a')
            .each(($op) => {
                const href = $op.attr('href');
                if (href.valueOf() === '/summary_page.php') {
                    cy.visit('http://localhost:8989' + href)
                }
            })

        cy.get('.widget-title').should('contain.text', 'Resumo')
    })

})