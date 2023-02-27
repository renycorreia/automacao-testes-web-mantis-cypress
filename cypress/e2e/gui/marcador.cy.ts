/// <reference types = "Cypress" />
import { faker } from '@faker-js/faker'

describe('Desafio Base2 | Automação Web', {
  retries: {
    runMode: 3,
    openMode: 1
  }
}, () => {
  const TRHEE_SECONDS_IN_MILLISECONDS = 3000

  before(function () {
    cy.login(Cypress.env('user_name'), Cypress.env('user_password'), true)
    cy.gui_apagaTodosMarcadores()
    cy.api_deleteAllProjects()
  })

  beforeEach(function () {
    cy.login(Cypress.env('user_name'), Cypress.env('user_password'), true)
    cy.acessarMenuLateral('Gerenciar')
    cy.acessarSubmenuGerenciamento('Gerenciar Marcadores')
  })

  it('acessar página de marcadores', function () {
    cy.get('.widget-title').should('contain.text', 'Gerenciar Marcadores')
    cy.get('#manage-tags-create-form > .widget-box > .widget-header').should('contain.text', 'Criar Marcador')
  })

  it('validar filtro alfanumérico', function () {
    cy.get('.btn-group > .active').should('have.text', 'TODAS').should('have.attr', 'href').and('include', 'manage_tags_page.php?filter=ALL')
  })

  it('criar marcador', function () {
    const randomText = faker.word.noun() + ' Marcador'
    cy.get('.widget-main > .table-responsive > .table > tbody').should('not.contain.text', randomText)
    cy.get('#tag-name').type(randomText)
    cy.get('#manage-tags-create-form > .widget-box > .widget-body > .widget-toolbox > .btn').click()

    const aux = randomText.split('')[0].toUpperCase()
    cy.get('[href="manage_tags_page.php?filter=' + aux).click()

    cy.get('.widget-main > .table-responsive > .table > tbody > tr > td:nth-child(1)').should('contain.text', randomText)
  })

  it('criar vários marcadores', function () {
    const marcadores = []

    for (let index = 0; index < Math.floor(Math.random() * 5) + 2; index++) {
      const randomText = faker.word.noun() + ' Marcador'
      cy.get('.widget-main > .table-responsive > .table > tbody').should('not.contain.text', randomText)
      cy.get('#tag-name').type(randomText)
      cy.get('#manage-tags-create-form > .widget-box > .widget-body > .widget-toolbox > .btn').click()
      marcadores.push(randomText)
    }

    marcadores.forEach(element => {
      const aux = element.split('')[0].toUpperCase()
      cy.get(`[href="manage_tags_page.php?filter=${aux}`).click()

      cy.get('.widget-main > .table-responsive > .table > tbody > tr > td:nth-child(1)').should('contain.text', element)
    })
  })

  it('apagar marcador', function () {
    const randomText = faker.word.noun() + ' Marcador'
    cy.get('.widget-main > .table-responsive > .table > tbody').should('not.contain.text', randomText)
    cy.get('#tag-name').type(randomText)
    cy.get('#manage-tags-create-form > .widget-box > .widget-body > .widget-toolbox > .btn').click()

    const aux = randomText.split('')[0].toUpperCase()
    cy.get('[href="manage_tags_page.php?filter=' + aux).click()

    cy.get('.widget-main > .table-responsive > .table > tbody > tr > td:nth-child(1)').should('contain.text', randomText)
      .each(($elm, index) => {
        const t = $elm.text()
        if (t.includes(randomText)) {
          cy.wrap($elm).click()
        }
      })

    cy.wait(TRHEE_SECONDS_IN_MILLISECONDS)

    cy.get('.btn').contains('Apagar Marcador').click()
    cy.get('p.bigger-110').should('be.visible').and('contain.text', 'Você tem certeza que quer apagar esse marcador?')
    cy.get('.btn').contains('Apagar Marcador').click()

    cy.get('[href="manage_tags_page.php?filter=' + aux).click()

    cy.get('.widget-main > .table-responsive > .table').then($table => {
      if ($table.find('tbody > tr > td:nth-child(1)').length > 0) {
        cy.get('.widget-main > .table-responsive > .table > tbody > tr > td:nth-child(1)').should('not.contain.text', randomText)
      }
    })
  })
})
