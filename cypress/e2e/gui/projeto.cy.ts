/// <reference types = "Cypress" />
import { faker } from '@faker-js/faker'

describe('Desafio Base2 | Automação Web', {
  retries: {
    runMode: 3,
    openMode: 1
  }
}, () => {
  before(function () {
    cy.api_deleteAllProjects()
  })

  beforeEach(function () {
    cy.login(Cypress.env('user_name'), Cypress.env('user_password'), true)
    cy.visit('/')
  })

  it('acessar pagina de projetos', function () {
    cy.acessarMenuLateral('Gerenciar')
    cy.acessarSubmenuGerenciamento('Gerenciar Projetos')

    cy.get('.widget-title')
      .should('contain.text', 'Projetos')

    cy.get('.widget-title')
      .should('contain.text', 'Categorias Globais')
  })

  it('criar projeto', function () {
    cy.acessarMenuLateral('Gerenciar')
    cy.acessarSubmenuGerenciamento('Gerenciar Projetos')

    const randomText = `Projeto ${faker.word.noun()}`

    cy.getTableBody()
      .first()
      .as('projectTbody')
      .should('not.contain.text', randomText)

    cy.get('.btn')
      .contains('Criar Novo Projeto')
      .click()

    cy.get('#project-name')
      .type(randomText)

    cy.get('.btn')
      .contains('Adicionar projeto')
      .click()

    cy.get('@projectTbody')
      .should('contain.text', randomText)
  })

  it('editar nome projeto', function () {
    cy.acessarMenuLateral('Gerenciar')
    cy.acessarSubmenuGerenciamento('Gerenciar Projetos')

    const randomText = `Projeto ${faker.word.noun()}`

    cy.getTableBody()
      .first()
      .as('projectTbody').should('not.contain.text', randomText)

    cy.get('.btn')
      .contains('Criar Novo Projeto')
      .click()

    cy.get('#project-name')
      .type(randomText)

    cy.get('.btn')
      .contains('Adicionar projeto')
      .click()

    cy.get('@projectTbody')
      .within(() => {
        cy.get('tr > td:nth-child(1) > a')
          .each(($elm) => {
            if ($elm.text() === randomText) {
              cy.wrap($elm)
                .click()
            }
          })
      })

    cy.get('#project-name')
      .type(reverseString(randomText))

    cy.get('.btn')
      .contains('Atualizar Projeto')
      .click()

    cy.get('@projectTbody')
      .should('contain.text', reverseString(randomText))
  })

  it('editar estado projeto', function () {
    cy.acessarMenuLateral('Gerenciar')
    cy.acessarSubmenuGerenciamento('Gerenciar Projetos')

    const randomText = `Projeto ${faker.word.noun()}`

    cy.getTableBody()
      .first()
      .as('projectTbody')
      .should('not.contain.text', randomText)

    cy.get('.btn')
      .contains('Criar Novo Projeto').click()

    cy.get('#project-name')
      .type(randomText)

    cy.get('.btn').contains('Adicionar projeto')
      .click()

    cy.get('@projectTbody')
      .within(() => {
        cy.get('tr > td:nth-child(1) > a')
          .each(($elm) => {
            if ($elm.text() === randomText) {
              cy.wrap($elm)
                .click()
            }
          })
      })

    cy.get('#project-status')
      .select('release')

    cy.get('.btn')
      .contains('Atualizar Projeto')
      .click()

    cy.get('@projectTbody')
      .within(() => {
        cy.get('tr > td:nth-child(1)')
          .each(($elm, index) => {
            const t = $elm.text()
            if (t.includes(randomText)) {
              cy.get('tr > td:nth-child(2)')
                .eq(index)
                .should('have.text', 'release')
            }
          })
      })
  })

  it('desabilitar projeto', function () {
    cy.acessarMenuLateral('Gerenciar')
    cy.acessarSubmenuGerenciamento('Gerenciar Projetos')

    const randomText = `Projeto ${faker.word.noun()}`

    cy.getTableBody()
      .first()
      .as('projectTbody')
      .should('not.contain.text', randomText)

    cy.get('.btn')
      .contains('Criar Novo Projeto')
      .click()

    cy.get('#project-name')
      .type(randomText)

    cy.get('.btn')
      .contains('Adicionar projeto')
      .click()

    cy.get('@projectTbody')
      .within(() => {
        cy.get('tr > td:nth-child(1) > a')
          .each(($elm) => {
            if ($elm.text() === randomText) {
              cy.wrap($elm)
                .click()
            }
          })
      })

    cy.get('#project-enabled')
      .uncheck()

    cy.get('.btn')
      .contains('Atualizar Projeto')
      .click()

    cy.get('@projectTbody')
      .within(() => {
        cy.get('tr > td:nth-child(1)')
          .each(($elm, index) => {
            const t = $elm.text()
            if (t.includes(randomText)) {
              cy.get('tr > td:nth-child(3)')
                .eq(index)
                .should('not.have.class', 'fa-check')
            }
          })
      })

    /* Habilitando projeto após os testes pois a api que retorna todos os projetos para serem apagados agora está retornando apenas os projetos ativos */
    cy.get('@projectTbody')
      .within(() => {
        cy.get('tr > td:nth-child(1) > a')
          .each(($elm) => {
            if ($elm.text() === randomText) {
              cy.wrap($elm)
                .click()
            }
          })
      })

    cy.get('#project-enabled')
      .check()

    cy.get('.btn')
      .contains('Atualizar Projeto')
      .click()
  })

  it('habilitar projeto desabilitado', function () {
    cy.acessarMenuLateral('Gerenciar')
    cy.acessarSubmenuGerenciamento('Gerenciar Projetos')

    const randomText = `Projeto ${faker.word.noun()}`

    cy.getTableBody()
      .first()
      .as('projectTbody')
      .should('not.contain.text', randomText)

    cy.get('.btn')
      .contains('Criar Novo Projeto')
      .click()

    cy.get('#project-name')
      .type(randomText)

    cy.get('.btn')
      .contains('Adicionar projeto')
      .click()

    cy.get('@projectTbody')
      .within(() => {
        cy.get('tr > td:nth-child(1) > a')
          .each(($elm) => {
            if ($elm.text() === randomText) {
              cy.wrap($elm)
                .click()
            }
          })
      })

    cy.get('#project-enabled')
      .uncheck()

    cy.get('.btn')
      .contains('Atualizar Projeto')
      .click()

    cy.get('@projectTbody')
      .within(() => {
        cy.get('tr > td:nth-child(1)')
          .each(($elm, index) => {
            const t = $elm.text()
            if (t.includes(randomText)) {
              cy.get('tr > td:nth-child(3)')
                .eq(index)
                .should('not.have.class', 'fa-check')
            }
          })
      })

    cy.get('@projectTbody')
      .within(() => {
        cy.get('tr > td:nth-child(1) > a')
          .each(($elm) => {
            if ($elm.text() === randomText) {
              cy.wrap($elm)
                .click()
            }
          })
      })

    cy.get('#project-enabled')
      .check()

    cy.get('.btn')
      .contains('Atualizar Projeto')
      .click()

    cy.get('@projectTbody')
      .within(() => {
        cy.get('tr > td:nth-child(1)')
          .each(($elm, index) => {
            const t = $elm.text()
            if (t.includes(randomText)) {
              cy.get('tr > td:nth-child(3)')
                .eq(index)
                .children()
                .should('have.class', 'fa-check')
            }
          })
      })
  })

  it('editar visibilidade projeto', function () {
    cy.acessarMenuLateral('Gerenciar')
    cy.acessarSubmenuGerenciamento('Gerenciar Projetos')

    const randomText = `Projeto ${faker.word.noun()}`

    cy.getTableBody()
      .first()
      .as('projectTbody')
      .should('not.contain.text', randomText)

    cy.get('.btn')
      .contains('Criar Novo Projeto')
      .click()

    cy.get('#project-name')
      .type(randomText)

    cy.get('.btn')
      .contains('Adicionar projeto')
      .click()

    cy.get('@projectTbody')
      .within(() => {
        cy.get('tr > td:nth-child(1) > a')
          .each(($elm) => {
            if ($elm.text() === randomText) {
              cy.wrap($elm)
                .click()
            }
          })
      })

    cy.get('#project-view-state')
      .select('privado')

    cy.get('.btn')
      .contains('Atualizar Projeto')
      .click()

    cy.get('@projectTbody')
      .within(() => {
        cy.get('tr > td:nth-child(1)')
          .each(($elm, index) => {
            const t = $elm.text()
            if (t.includes(randomText)) {
              cy.get('tr > td:nth-child(4)')
                .eq(index)
                .should('have.text', 'privado')
            }
          })
      })
  })

  it('apagar projeto', function () {
    cy.acessarMenuLateral('Gerenciar')
    cy.acessarSubmenuGerenciamento('Gerenciar Projetos')

    const randomText = `Projeto ${faker.word.noun()}`

    cy.getTableBody()
      .first()
      .as('projectTbody')
      .should('not.contain.text', randomText)

    cy.get('.btn')
      .contains('Criar Novo Projeto')
      .click()

    cy.get('#project-name')
      .type(randomText)

    cy.get('.btn')
      .contains('Adicionar projeto')
      .click()

    cy.get('@projectTbody')
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
      .contains('Apagar Projeto')
      .click()

    cy.get('p')
      .should('be.visible')
      .and('contain.text', `Você tem certeza que deseja apagar o projeto "${randomText}"?`)

    cy.get('.btn')
      .contains('Apagar Projeto')
      .click()

    cy.get('@projectTbody')
      .should('not.contain.text', randomText)
  })

  function reverseString (str: string): string {
    return str.split('').reverse().join('')
  }
})
