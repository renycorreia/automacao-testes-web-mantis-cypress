/// <reference types = "Cypress" />
import { faker } from '@faker-js/faker'

const projetoDefault = {
  name: '- Projeto default',
  description: faker.commerce.productDescription()
}

describe('Campo Personalizado | Desafio Base2 | Automação Web', {
  retries: {
    runMode: 3,
    openMode: 1
  }
}, () => {
  const TRHEE_SECONDS_IN_MILLISECONDS = 3000

  before(function () {
    cy.login()
    cy.gui_apagaTodosCamposCustomizado()
    cy.api_deleteAllProjects()
    cy.api_createProject(projetoDefault)
  })

  beforeEach(function () {
    cy.login()
    cy.acessarMenuLateral('Gerenciar')
    cy.acessarSubmenuGerenciamento('Gerenciar Campos Personalizados')
    cy.wait(TRHEE_SECONDS_IN_MILLISECONDS)
  })

  it('acessar página de campos personalizados', function () {
    cy.get('.widget-title')
      .should('contain.text', 'Campos Personalizados')
  })

  it('criar campo personalizado', function () {
    const randomText = `Campo ${faker.word.noun()}`

    cy.getTableBody()
      .as('customFieldTbody')
      .should('not.contain.text', randomText)

    cy.get('input[name="name"]')
      .type(randomText)

    cy.get('.btn')
      .contains('Novo Campo Personalizado').click()

    cy.get('.widget-title')
      .should('contain.text', 'Alterar campo personalizado')

    cy.get('.btn')
      .contains('Atualizar Campo Personalizado')
      .click()

    cy.get('p.bold.bigger-110')
      .should('be.visible')
      .and('contain.text', 'Operação realizada com sucesso')

    cy.get('@customFieldTbody')
      .should('contain.text', randomText)
  })

  it('validar uso de campo personalizado', function () {
    const randomText = `Campo ${faker.word.noun()}`

    cy.getTableBody()
      .as('customFieldTbody')
      .should('not.contain.text', randomText)

    cy.get('input[name="name"]')
      .type(randomText)

    cy.get('.btn')
      .contains('Novo Campo Personalizado').click()

    cy.get(':nth-child(11) > :nth-child(2) > label > .lbl') // checkbox Mostrar ao atualizar tarefas
      .click()

    cy.get('#custom-field-access-level-r')
      .select('relator')

    cy.get('#custom-field-access-level-rw')
      .select('relator')

    cy.get('.btn')
      .contains('Atualizar Campo Personalizado')
      .click()

    cy.get('@customFieldTbody')
      .should('contain.text', randomText)

    cy.get('@customFieldTbody')
      .within(() => {
        cy.get('tr > td:nth-child(1) > a')
          .each(($elm) => {
            if ($elm.text() === randomText) {
              cy.wrap($elm)
                .click()
            }
          })
      })

    cy.get('#custom-field-project-id')
      .select('- Projeto default')

    cy.get('.btn')
      .contains('Vincular Campo Personalizado')
      .click()

    cy.get('[href="bug_report_page.php"]')
      .click()

    cy.get('h4')
      .then($titulo => {
        if ($titulo.text().includes('Escolher Projeto')) {
          cy.get('#select-project-id')
            .select('- Projeto default')

          cy.get('.btn')
            .contains('Selecionar Projeto')
            .click()
        }
      })
    cy.get('#category_id')
      .select('[Todos os Projetos] General')

    cy.get('.category')
      .should('contain.text', randomText)
  })

  it('apagar campo personalizado', function () {
    const randomText = `Campo ${faker.word.noun()}`

    cy.getTableBody()
      .as('customFieldTbody')
      .should('not.contain.text', randomText)

    cy.get('input[name="name"]')
      .type(randomText)

    cy.get('.btn')
      .contains('Novo Campo Personalizado')
      .click()

    cy.get(':nth-child(11) > :nth-child(2) > label > .lbl') // checkbox Mostrar ao atualizar tarefas
      .click()

    cy.get('#custom-field-access-level-r')
      .select('relator')

    cy.get('#custom-field-access-level-rw')
      .select('relator')

    cy.get('.btn')
      .contains('Atualizar Campo Personalizado')
      .click()

    cy.get('@customFieldTbody')
      .should('contain.text', randomText)

    cy.get('@customFieldTbody')
      .within(() => {
        cy.get('tr > td:nth-child(1) > a')
          .each(($elm) => {
            if ($elm.text() === randomText) {
              cy.wrap($elm)
                .click()
            }
          })
      })

    cy.get('.btn')
      .contains('Apagar Campo Personalizado')
      .click()

    cy.get('p.bigger-110')
      .should('be.visible')
      .and('contain.text', `Você tem certeza que deseja apagar o campo personalizado "${randomText}" e todos os seus valores associados?`)

    cy.get('.btn')
      .contains('Apagar Campo')
      .click()

    cy.get('p.bold.bigger-110')
      .should('be.visible')
      .and('contain.text', 'Operação realizada com sucesso')

    cy.get('@customFieldTbody')
      .should('not.contain.text', randomText)
  })
})
