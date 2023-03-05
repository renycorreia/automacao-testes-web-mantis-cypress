/// <reference types = "Cypress" />
import { faker } from '@faker-js/faker'

describe('Usuário | Desafio Base2 | Automação Web', {
  retries: {
    runMode: 3,
    openMode: 1
  }
}, () => {
  before(() => {
    cy.login()
    cy.gui_apagaTodosUsuarioSemUso()

    cy.task('readXlsx', { file: 'cypress/fixtures/newUsers.xlsx', sheet: 'users' })
      .then((newUsers) => {
        cy.writeFile('cypress/fixtures/newUsers.json', { newUsers })
      })
  })

  beforeEach(function () {
    cy.login()
    cy.acessarMenuLateral('Gerenciar')
    cy.acessarSubmenuGerenciamento('Gerenciar Usuários')
  })

  it('validar filtro alfanumérico', function () {
    cy.get('.btn-group > .active')
      .should('have.text', 'TODOS')
      .and('have.attr', 'href')
      .and('include', 'manage_user_page.php?sort=username&dir=ASC&save=')
      .and('include', '&hideinactive=0&showdisabled=0&filter=ALL&search=')
  })

  it('criar usuario dados minimos', function () {
    cy.get('.btn')
      .contains('Criar nova conta')
      .click()

    const fullName = faker.name.fullName()
    const userName = fullName.replace(/ /gi, '_')

    cy.get('#user-username')
      .type(userName)

    cy.get('.btn')
      .contains('Criar Usuário')
      .click()

    cy.get('p.bold.bigger-110')
      .should('be.visible')
      .and('contain.text', `Usuário ${userName} criado com um nível de acesso de relator`)

    cy.acessarSubmenuGerenciamento('Gerenciar Usuários')

    cy.getTableBody()
      .as('userTbody')
      .within(() => {
        cy.get('tr > td:nth-child(1)')
          .each(($elm, index) => {
            const t = $elm.text()
            if (t.includes(userName)) {
              cy.get('tr > td:nth-child(4)')
                .eq(index)
                .should('have.text', 'relator')
            }
          })
      })
  })

  it('criar usuario dados minimos e edita', function () {
    cy.get('.btn')
      .contains('Criar nova conta')
      .click()

    const fullName = faker.name.fullName()
    const userName = fullName.replace(/ /gi, '_')

    cy.get('#user-username')
      .type(userName)

    cy.get('.btn').contains('Criar Usuário')
      .click()

    cy.get('p.bold.bigger-110')
      .should('be.visible')
      .and('contain.text', `Usuário ${userName} criado com um nível de acesso de relator`)

    cy.get('#edit-realname')
      .type(fullName)

    cy.get('#email-field')
      .type(`${userName}@mail.com`)

    cy.get('#edit-access-level')
      .select('administrador')

    cy.get('.btn')
      .contains('Atualizar Usuário')
      .click()

    cy.get('p.bold.bigger-110')
      .should('be.visible')
      .and('contain.text', 'Operação realizada com sucesso.')

    cy.acessarSubmenuGerenciamento('Gerenciar Usuários')

    cy.getTableBody()
      .as('userTbody')
      .within(() => {
        cy.get('tr > td:nth-child(1)')
          .each(($elm, index) => {
            const t = $elm.text()
            if (t.includes(userName)) {
              cy.get('tr > td:nth-child(4)')
                .eq(index)
                .should('have.text', 'administrador')
            }
          })
      })
  })

  it('criar usuario - visualizador', function () {
    cy.get('.btn')
      .contains('Criar nova conta')
      .click()

    const fullName = faker.name.fullName()
    const userName = fullName.replace(/ /gi, '_')

    cy.get('#user-username')
      .type(userName)

    cy.get('#user-realname')
      .type(fullName)

    cy.get('#email-field')
      .type(`${userName}@mail.com`)

    cy.get('#user-access-level')
      .select('visualizador')

    cy.get('.btn')
      .contains('Criar Usuário')
      .click()

    cy.get('p.bold.bigger-110')
      .should('be.visible')
      .and('contain.text', `Usuário ${userName} criado com um nível de acesso de visualizador`)

    cy.acessarSubmenuGerenciamento('Gerenciar Usuários')

    cy.getTableBody()
      .as('userTbody')
      .within(() => {
        cy.get('tr > td:nth-child(1)')
          .each(($elm, index) => {
            const t = $elm.text()
            if (t.includes(userName)) {
              cy.get('tr > td:nth-child(4)')
                .eq(index)
                .should('have.text', 'visualizador')
            }
          })
      })
  })

  it('criar usuario - atualizador', function () {
    cy.get('.btn')
      .contains('Criar nova conta')
      .click()

    const fullName = faker.name.fullName()
    const userName = fullName.replace(/ /gi, '_')

    cy.get('#user-username')
      .type(userName)

    cy.get('#user-realname')
      .type(fullName)

    cy.get('#email-field')
      .type(`${userName}@mail.com`)

    cy.get('#user-access-level')
      .select('atualizador')

    cy.get('.btn')
      .contains('Criar Usuário')
      .click()

    cy.get('p.bold.bigger-110')
      .should('be.visible')
      .and('contain.text', `Usuário ${userName} criado com um nível de acesso de atualizador`)

    cy.acessarSubmenuGerenciamento('Gerenciar Usuários')

    cy.getTableBody()
      .as('userTbody')
      .within(() => {
        cy.get('tr > td:nth-child(1)')
          .each(($elm, index) => {
            const t = $elm.text()
            if (t.includes(userName)) {
              cy.get('tr > td:nth-child(4)')
                .eq(index)
                .should('have.text', 'atualizador')
            }
          })
      })
  })

  it('criar usuario - desenvolvedor', function () {
    cy.get('.btn')
      .contains('Criar nova conta')
      .click()

    const fullName = faker.name.fullName()
    const userName = fullName.replace(/ /gi, '_')

    cy.get('#user-username')
      .type(userName)

    cy.get('#user-realname')
      .type(fullName)

    cy.get('#email-field')
      .type(`${userName}@mail.com`)

    cy.get('#user-access-level')
      .select('desenvolvedor')

    cy.get('.btn')
      .contains('Criar Usuário')
      .click()

    cy.get('p.bold.bigger-110')
      .should('be.visible')
      .and('contain.text', `Usuário ${userName} criado com um nível de acesso de desenvolvedor`)

    cy.acessarSubmenuGerenciamento('Gerenciar Usuários')

    cy.getTableBody()
      .as('userTbody')
      .within(() => {
        cy.get('tr > td:nth-child(1)')
          .each(($elm, index) => {
            const t = $elm.text()
            if (t.includes(userName)) {
              cy.get('tr > td:nth-child(4)')
                .eq(index)
                .should('have.text', 'desenvolvedor')
            }
          })
      })
  })

  it('criar usuario - gerente', function () {
    cy.get('.btn')
      .contains('Criar nova conta')
      .click()

    const fullName = faker.name.fullName()
    const userName = fullName.replace(/ /gi, '_')

    cy.get('#user-username')
      .type(userName)

    cy.get('#user-realname')
      .type(fullName)

    cy.get('#email-field')
      .type(`${userName}@mail.com`)

    cy.get('#user-access-level')
      .select('gerente')

    cy.get('.btn')
      .contains('Criar Usuário')
      .click()

    cy.get('p.bold.bigger-110')
      .should('be.visible')
      .and('contain.text', `Usuário ${userName} criado com um nível de acesso de gerente`)

    cy.acessarSubmenuGerenciamento('Gerenciar Usuários')

    cy.getTableBody()
      .as('userTbody')
      .within(() => {
        cy.get('tr > td:nth-child(1)')
          .each(($elm, index) => {
            const t = $elm.text()
            if (t.includes(userName)) {
              cy.get('tr > td:nth-child(4)')
                .eq(index)
                .should('have.text', 'gerente')
            }
          })
      })
  })

  it('buscar usuario pelo login exato', function () {
    cy.get('.btn')
      .contains('Criar nova conta')
      .click()

    const fullName = faker.name.fullName()
    const userName = fullName.replace(/ /gi, '_')

    cy.get('#user-username')
      .type(userName)

    cy.get('#user-realname')
      .type(fullName)

    cy.get('#email-field')
      .type(`${userName}@mail.com`)

    cy.get('.btn')
      .contains('Criar Usuário')
      .click()

    cy.get('p.bold.bigger-110')
      .should('be.visible')
      .and('contain.text', `Usuário ${userName} criado com um nível de acesso de relator`)

    cy.acessarSubmenuGerenciamento('Gerenciar Usuários')

    cy.get('#search')
      .type(userName)

    cy.get('.btn')
      .contains('Aplicar Filtro').click()

    cy.getTableBody()
      .as('userTbody')
      .within(() => {
        cy.get('tr > td:nth-child(1)')
          .should('have.length', 1)
          .each(($elm) => {
            cy.wrap($elm)
              .should('contain.text', userName)
          })
      })
  })

  it('excluir usuário', function () {
    cy.get('.btn')
      .contains('Criar nova conta')
      .click()

    const fullName = faker.name.fullName()
    const userName = fullName.replace(/ /gi, '_')

    cy.get('#user-username').type(userName)

    cy.get('.btn')
      .contains('Criar Usuário')
      .click()

    cy.get('p.bold.bigger-110')
      .should('be.visible')
      .and('contain.text', `Usuário ${userName} criado com um nível de acesso de relator`)

    cy.acessarSubmenuGerenciamento('Gerenciar Usuários')

    cy.get('#search')
      .type(userName)

    cy.get('.btn')
      .contains('Aplicar Filtro')
      .click()

    cy.getTableBody()
      .as('userTbody')
      .within(() => {
        cy.get('tr > td:nth-child(1)')
          .should('have.length', 1)
          .each(($elm) => {
            cy.wrap($elm)
              .should('contain.text', userName)
              .click()
          })
      })

    cy.get('.btn')
      .contains('Apagar Usuário')
      .click()

    cy.get('p.bigger-110')
      .should('be.visible')
      .and('contain.text', `Você tem certeza que deseja apagar a conta "${userName}"?`)

    cy.get('.btn')
      .contains('Apagar Conta')
      .click()

    cy.get('p.bold.bigger-110')
      .should('be.visible')
      .and('contain.text', 'Operação realizada com sucesso.')

    cy.get('@userTbody')
      .should('not.contain.text', userName)
  })

  it('buscar usuario pelo nome exato', function () {
    cy.get('.btn')
      .contains('Criar nova conta')
      .click()

    const fullName = faker.name.fullName()
    const userName = fullName.replace(/ /gi, '')

    cy.get('#user-username')
      .type(userName)

    cy.get('#user-realname')
      .type(fullName)

    cy.get('#email-field')
      .type(`${userName}@mail.com`)

    cy.get('.btn')
      .contains('Criar Usuário')
      .click()

    cy.get('p.bold.bigger-110')
      .should('be.visible')
      .and('contain.text', `Usuário ${userName} criado com um nível de acesso de relator`)

    cy.acessarSubmenuGerenciamento('Gerenciar Usuários')

    cy.get('#search')
      .type(fullName)

    cy.get('.btn')
      .contains('Aplicar Filtro')
      .click()

    cy.getTableBody()
      .as('userTbody')
      .within(() => {
        cy.get('tr > td:nth-child(2)')
          .should('have.length', 1)
          .each(($elm) => {
            cy.wrap($elm)
              .should('contain.text', fullName)
          })
      })
  })

  it('buscar usuario pelo primeiro nome', function () {
    const firstName = 'Joaquim'

    Cypress._.times(2, () => {
      cy.get('.btn')
        .contains('Criar nova conta')
        .click()

      const fullName = `${firstName} ${faker.name.middleName('male')}`
      const userName = fullName.replace(/ /gi, '_')

      cy.get('#user-username')
        .type(userName)

      cy.get('#user-realname')
        .type(fullName)

      cy.get('#email-field')
        .type(`${userName}@mail.com`)

      cy.get('.btn')
        .contains('Criar Usuário')
        .click()

      cy.get('p.bold.bigger-110')
        .should('be.visible')
        .and('contain.text', `Usuário ${userName} criado com um nível de acesso de relator`)

      cy.acessarSubmenuGerenciamento('Gerenciar Usuários')
    })

    cy.get('#search')
      .type(firstName)

    cy.get('.btn')
      .contains('Aplicar Filtro')
      .click()

    cy.getTableBody()
      .as('userTbody')
      .within(() => {
        cy.get('tr > td:nth-child(2)')
          .should('have.length.greaterThan', 1)
          .each(($elm) => {
            cy.wrap($elm)
              .should('contain.text', firstName)
          })
      })
  })

  it('buscar usuario pelo email', function () {
    cy.get('.btn')
      .contains('Criar nova conta')
      .click()

    const fullName = faker.name.fullName()
    const userName = fullName.replace(/ /gi, '_')

    cy.get('#user-username')
      .type(userName)

    cy.get('#user-realname')
      .type(fullName)

    cy.get('#email-field')
      .type(`${userName}@mail.com`)

    cy.get('.btn')
      .contains('Criar Usuário')
      .click()

    cy.get('p.bold.bigger-110')
      .should('be.visible')
      .and('contain.text', `Usuário ${userName} criado com um nível de acesso de relator`)

    cy.acessarSubmenuGerenciamento('Gerenciar Usuários')

    cy.get('#search')
      .type(`${userName}@mail.com`)

    cy.get('.btn')
      .contains('Aplicar Filtro')
      .click()

    cy.getTableBody()
      .as('userTbody')
      .within(() => {
        cy.get('tr > td:nth-child(3)')
          .should('have.length', 1)
          .each(($elm) => {
            cy.wrap($elm)
              .should('contain.text', `${userName}@mail.com`)
          })
      })
  })

  it('criar usuario - Data-Driven', function () {
    cy.fixture('newUsers')
      .then((data) => {
        data.newUsers.forEach((element: any) => {
          cy.get('.btn')
            .contains('Criar nova conta')
            .click()

          cy.get('#user-username')
            .type(element.username)

          cy.get('#user-realname')
            .type(element.realname)

          cy.get('#email-field')
            .type(element.email)

          cy.get('.btn')
            .contains('Criar Usuário')
            .click()

          cy.get('p.bold.bigger-110')
            .should('be.visible')
            .and('contain.text', `Usuário ${element.username} criado com um nível de acesso de relator`)

          cy.acessarSubmenuGerenciamento('Gerenciar Usuários')
        })
      })
  })
})
