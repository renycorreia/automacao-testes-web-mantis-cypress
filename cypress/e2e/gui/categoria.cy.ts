/// <reference types = "Cypress" />
import { faker } from '@faker-js/faker'

const projetoDefault = {
  name: '- Projeto default',
  description: faker.commerce.productDescription()
}

describe('Categoria | Desafio Base2 | Automação Web', {
  retries: {
    runMode: 3,
    openMode: 1
  }
}, () => {
  const TRHEE_SECONDS_IN_MILLISECONDS = 3000

  before(function () {
    cy.login()
    cy.gui_apagaTodasCategoriasPossiveis()
    cy.api_deleteAllProjects()
    cy.api_createProject(projetoDefault)
  })

  beforeEach(function () {
    cy.login()
    cy.visit('/')
  })

  it('criar categoria', function () {
    cy.acessarMenuLateral('Gerenciar')
    cy.acessarSubmenuGerenciamento('Gerenciar Projetos')

    const randomText = `Campo ${faker.word.noun()}`

    cy.get('#categories')
      .within(() => {
        cy.getTableBody()
          .as('categoryTbody')
          .should('not.contain.text', randomText)
      })

    cy.get('.input-sm')
      .type(randomText)

    cy.get('.btn')
      .contains('Adicionar Categoria').click()

    cy.get('@categoryTbody')
      .should('contain.text', randomText)
  })

  it('criar e editar categoria', function () {
    cy.acessarMenuLateral('Gerenciar')
    cy.acessarSubmenuGerenciamento('Gerenciar Projetos')

    const randomText = `Campo ${faker.word.noun()}`

    cy.get('#categories')
      .within(() => {
        cy.getTableBody()
          .as('categoryTbody')
          .should('not.contain.text', randomText)
      })

    cy.get('.input-sm')
      .type(randomText)

    cy.get('.btn')
      .contains('Adicionar e editar Categoria')
      .click()

    cy.get('.widget-title')
      .should('contain.text', 'Alterar Categoria do Projeto')

    cy.get('#proj-category-assigned-to')
      .select('administrator')

    cy.get('.btn')
      .contains('Atualizar Categoria')
      .click()

    cy.get('@categoryTbody')
      .should('contain.text', randomText)
  })

  it('alterar categoria já criada', function () {
    cy.acessarMenuLateral('Gerenciar')
    cy.acessarSubmenuGerenciamento('Gerenciar Projetos')

    const randomText = `Campo ${faker.word.noun()}`

    cy.get('.input-sm')
      .type(randomText)

    cy.get('.btn')
      .contains('Adicionar Categoria')
      .click()

    cy.wait(TRHEE_SECONDS_IN_MILLISECONDS)

    cy.get('#categories')
      .within(() => {
        cy.getTableBody()
          .as('categoryTbody')
          .within(() => {
            cy.get('tr > td:nth-child(1)')
              .each(($elm, index) => {
                const t = $elm.text()
                if (t.includes(randomText)) {
                  cy.get('tr > td:nth-child(3)')
                    .eq(index).contains('Alterar').click()
                }
              })
          })
      })

    cy.get('#proj-category-assigned-to')
      .select('administrator')

    cy.get('.btn')
      .contains('Atualizar Categoria')
      .click()

    cy.get('p.bold.bigger-110')
      .should('be.visible')
      .and('contain.text', 'Operação realizada com sucesso.')

    cy.get('@categoryTbody')
      .within(() => {
        cy.get('tr > td:nth-child(1)')
          .each(($elm, index) => {
            const t = $elm.text()
            if (t.includes(randomText)) {
              cy.get('tr > td:nth-child(2)')
                .eq(index).contains('administrator')
            }
          })
      })
  })

  it('apagar categoria', function () {
    cy.acessarMenuLateral('Gerenciar')
    cy.acessarSubmenuGerenciamento('Gerenciar Projetos')

    const randomText = `Campo ${faker.word.noun()}`

    cy.get('.input-sm')
      .type(randomText)

    cy.get('.btn')
      .contains('Adicionar Categoria')
      .click()

    cy.wait(TRHEE_SECONDS_IN_MILLISECONDS)

    cy.get('#categories')
      .within(() => {
        cy.getTableBody()
          .as('categoryTbody')
          .within(() => {
            cy.get('tr > td:nth-child(1)')
              .each(($elm, index) => {
                const t = $elm.text()
                if (t.includes(randomText)) {
                  cy.get('tr > td:nth-child(3)')
                    .eq(index).contains('Apagar').click()
                }
              })
          })
      })

    cy.get('p')
      .should('be.visible')
      .and('contain.text', `Você tem certeza que deseja deletar a categoria "${randomText}"?`)

    cy.get('.btn')
      .contains('Apagar Categoria')
      .click()

    cy.get('@categoryTbody')
      .should('not.contain.text', randomText)
  })
})
