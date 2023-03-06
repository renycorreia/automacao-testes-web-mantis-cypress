/// <reference types = "Cypress" />
import { faker } from '@faker-js/faker'

describe('Marcador | Desafio Base2 | Automação Web', {
  retries: {
    runMode: 3,
    openMode: 1
  }
}, () => {
  const TRHEE_SECONDS_IN_MILLISECONDS = 3000

  before(() => {
    cy.login()
    cy.gui_apagaTodosMarcadores()
    cy.api_deleteAllProjects()
  })

  beforeEach(() => {
    cy.login()
    cy.acessarMenuLateral('Gerenciar')
    cy.acessarSubmenuGerenciamento('Gerenciar Marcadores')
  })

  it('acessar página de marcadores', () => {
    cy.get('.widget-title')
      .should('contain.text', 'Gerenciar Marcadores')

    cy.get('#manage-tags-create-form > .widget-box > .widget-header')
      .should('contain.text', 'Criar Marcador')
  })

  it('validar filtro alfanumérico', () => {
    cy.get('.btn-group > .active')
      .should('have.text', 'TODAS')
      .and('have.attr', 'href')
      .and('include', 'manage_tags_page.php?filter=ALL')
  })

  it('criar marcador', () => {
    const randomText = `${faker.word.noun()} Marcador`

    cy.getTableBody()
      .as('tagTbody')
      .should('not.contain.text', randomText)

    cy.get('#tag-name')
      .type(randomText)

    cy.get('input[type="submit"]')
      .invoke('val', 'Criar Marcador')
      .click()

    const aux = randomText.split('')[0].toUpperCase()

    cy.get(`[href="manage_tags_page.php?filter=${aux}`)
      .click()

    cy.get('@tagTbody')
      .within(() => {
        cy.get('tr > td:nth-child(1)')
          .should('contain.text', randomText)
      })
  })

  it('criar vários marcadores', () => {
    const marcadores = []

    for (let index = 0; index < Math.floor(Math.random() * 5) + 2; index++) {
      const randomText = `${faker.word.noun()} Marcador`

      cy.getTableBody()
        .as('tagTbody')
        .should('not.contain.text', randomText)

      cy.get('#tag-name')
        .type(randomText)

      cy.get('input[type="submit"]')
        .invoke('val', 'Criar Marcador')
        .click()

      marcadores.push(randomText)
    }

    marcadores.forEach((element: any) => {
      const aux = element.split('')[0].toUpperCase()

      cy.get(`[href="manage_tags_page.php?filter=${aux}`)
        .click()

      cy.get('@tagTbody')
        .within(() => {
          cy.get('tr > td:nth-child(1)')
            .should('contain.text', element)
        })
    })
  })

  it('apagar marcador', () => {
    const randomText = `${faker.word.noun()} Marcador`

    cy.getTableBody()
      .as('tagTbody')
      .should('not.contain.text', randomText)

    cy.get('#tag-name')
      .type(randomText)

    cy.get('input[type="submit"]')
      .invoke('val', 'Criar Marcador')
      .click()

    const aux = randomText.split('')[0].toUpperCase()

    cy.get(`[href="manage_tags_page.php?filter=${aux}`)
      .click()

    cy.get('@tagTbody')
      .within(() => {
        cy.get('tr > td:nth-child(1)')
          .should('contain.text', randomText)
          .each(($elm) => {
            const t = $elm.text()
            if (t.includes(randomText)) {
              cy.wrap($elm)
                .click()
            }
          })
      })

    cy.wait(TRHEE_SECONDS_IN_MILLISECONDS)

    cy.get('.btn').contains('Apagar Marcador')
      .click()

    cy.get('p.bigger-110')
      .should('be.visible')
      .and('contain.text', 'Você tem certeza que quer apagar esse marcador?')
    cy.get('.btn')
      .contains('Apagar Marcador')
      .click()

    cy.get(`[href="manage_tags_page.php?filter=${aux}`)
      .click()

    cy.get('@tagTbody')
      .within($body => {
        if ($body.find('tr > td:nth-child(1)').length > 0) {
          cy.get('tr > td:nth-child(1)')
            .should('not.contain.text', randomText)
        }
      })
  })
})
