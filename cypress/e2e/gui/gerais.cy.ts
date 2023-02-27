/// <reference types = "Cypress" />

describe('Desafio Base2 | Automação Web', {
  retries: {
    runMode: 3,
    openMode: 1
  }
}, () => {
  beforeEach(function () {
    cy.login(Cypress.env('user_name'), Cypress.env('user_password'), true)
    cy.visit('/')
  })

  it('acessar página de gerenciamento', function () {
    cy.get('#sidebar > .nav-list > li > a')
      .each(($op) => {
        const href = $op.attr('href')
        if ((href !== undefined) && (href.valueOf() === '/manage_overview_page.php')) {
          cy.visit(`/${href}`)
        }
      })

    cy.get('.widget-title').should('contain.text', 'Informação do Site')
    cy.get('#manage-overview-table').should('be.visible')
  })

  it('acessar página de resumo', function () {
    cy.get('#sidebar > .nav-list > li > a')
      .each(($op) => {
        const href = $op.attr('href')
        if ((href !== undefined) && (href.valueOf() === '/summary_page.php')) {
          cy.visit(`/${href}`)
        }
      })

    cy.get('.widget-title').should('contain.text', 'Resumo')
  })
})
