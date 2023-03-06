/// <reference types = "Cypress" />

describe('Gerais| Desafio Base2 | Automação Web', {
  retries: {
    runMode: 3,
    openMode: 1
  }
}, () => {
  beforeEach(() => {
    cy.login()
    cy.visit('/')
  })

  it('acessar página de gerenciamento', () => {
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

  it('acessar página de resumo', () => {
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
