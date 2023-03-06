Cypress.Commands.add('login', (
  user = Cypress.env('user_name'),
  password = Cypress.env('user_password'),
  { cacheSession = true } = {}
) => {
  const login = (): void => {
    cy.visit('/login_page.php')

    cy.get('#username').type(user)
    cy.get('.btn-success').click()
    cy.get('#password').type(password, { log: false })
    cy.get('.btn-success').click()
  }

  const validate = (): void => {
    cy.visit('/')
    cy.location('pathname', { timeout: 1000 })
      .should('not.eq', '/login_page.php')
  }

  const options = {
    cacheAcrossSpecs: true,
    validate
  }

  if (cacheSession) {
    cy.session(user, login, options)
  } else {
    login()
  }
})

Cypress.Commands.add('acessarMenuLateral', (nomeMenu) => {
  cy.visit('/')
  cy.get('.nav-list > li > a')
    .each(($elm, index) => {
      const t = $elm.text()
      if (t.includes(nomeMenu)) {
        cy.get('.nav-list > li > a')
          .eq(index).click()
      }
    })
  cy.validaSessaoAplicacao()
})

Cypress.Commands.add('acessarSubmenuGerenciamento', (nomeMenu) => {
  cy.get('.nav-tabs > li > a')
    .each(($op) => {
      if ($op.text() === nomeMenu) {
        cy.wrap($op).click()
      }
    })
  cy.validaSessaoAplicacao()
})

Cypress.Commands.add('parseXlsx', (inputFile) => {
  return cy.task('parseXlsx', { filePath: inputFile })
})

Cypress.Commands.add('validaSessaoAplicacao', () => {
  cy.url().then(($url) => {
    if ($url.includes('/login_password_page.php')) {
      cy.get('#password').type(Cypress.env('user_password'), { log: false })
      cy.get('.btn-success').click()
    }
  })
})

Cypress.Commands.add('gui_apagaTodosCamposCustomizado', () => {
  let aux = 0

  cy.acessarMenuLateral('Gerenciar')
  cy.acessarSubmenuGerenciamento('Gerenciar Campos Personalizados')
  cy.getTableBody()
    .as('customFieldTbody')
    .within($table => {
      if ($table.find('tr > td:nth-child(1) > a').length > 0) {
        cy.get('tr > td:nth-child(1) > a')
          .then($campos => {
            aux = $campos.length
            for (let index = 0; index < aux; index++) {
              cy.get('tr > td:nth-child(1) > a').first().click()

              cy.document().within(() => {
                cy.get('.btn')
                  .contains('Apagar Campo Personalizado')
                  .click()

                cy.get('p.bigger-110')
                  .should('be.visible')

                cy.get('.btn')
                  .contains('Apagar Campo')
                  .click()

                cy.wait(3000)
                cy.acessarMenuLateral('Gerenciar')
                cy.acessarSubmenuGerenciamento('Gerenciar Campos Personalizados')
              })
            }
          })
      }
    })
})

Cypress.Commands.add('gui_apagaTodasCategoriasPossiveis', () => {
  let aux = 0
  cy.acessarMenuLateral('Gerenciar')
  cy.acessarSubmenuGerenciamento('Gerenciar Projetos')
  cy.get('#categories')
    .within(() => {
      cy.getTableBody()
        .as('categoryTbody')
        .within($table => {
          if ($table.find('tr > td:nth-child(1)').length > 1) {
            cy.get('tr > td:nth-child(1)')
              .then($campos => {
                aux = $campos.length
                for (let index = 0; index < aux; index++) {
                  cy.get('tr > td:nth-child(1)')
                    .then($categoria => {
                      if ($categoria.text() !== 'General') {
                        cy.get('tr > td:nth-child(3)')
                          .first()
                          .contains('Apagar')
                          .click()
                        cy.document()
                          .within(() => {
                            cy.get('p')
                              .should('be.visible')

                            cy.get('.btn')
                              .contains('Apagar Categoria')
                              .click()

                            cy.wait(3000)
                            cy.acessarMenuLateral('Gerenciar')
                            cy.acessarSubmenuGerenciamento('Gerenciar Projetos')
                          })
                      }
                    })
                }
              })
          }
        })
    })
})

Cypress.Commands.add('gui_apagaTodosMarcadores', () => {
  let aux = 0
  cy.acessarMenuLateral('Gerenciar')
  cy.acessarSubmenuGerenciamento('Gerenciar Marcadores')
  cy.getTableBody()
    .as('tagTbody')
    .within($table => {
      if ($table.find('tr > td:nth-child(1)').length > 0) {
        cy.get('tr > td:nth-child(1) > a')
          .then($campos => {
            aux = $campos.length
            for (let index = 0; index < aux; index++) {
              cy.get('tr > td:nth-child(1) > a')
                .first()
                .click()
              cy.document()
                .within(() => {
                  cy.get('.btn')
                    .contains('Apagar Marcador')
                    .click()

                  cy.get('p.bigger-110')
                    .should('be.visible')
                    .and('contain.text', 'Você tem certeza que quer apagar esse marcador?')

                  cy.get('.btn')
                    .contains('Apagar Marcador')
                    .click()

                  cy.wait(3000)
                  cy.acessarMenuLateral('Gerenciar')
                  cy.acessarSubmenuGerenciamento('Gerenciar Marcadores')
                })
            }
          })
      }
    })
})

Cypress.Commands.add('gui_apagaTodosUsuarioSemUso', () => {
  let aux = 0
  cy.acessarMenuLateral('Gerenciar')
  cy.acessarSubmenuGerenciamento('Gerenciar Usuários')
  cy.get('.btn')
    .contains('NÃO UTILIZADO')
    .click()

  cy.wait(3000)

  cy.getTableBody()
    .as('userTbody')
    .within($table => {
      if ($table.find('tr > td:nth-child(1)').length > 0) {
        cy.get('tr > td:nth-child(1) > a')
          .then($campos => {
            aux = $campos.length
            for (let index = 0; index < aux; index++) {
              cy.get('tr > td:nth-child(1) > a')
                .first()
                .click()
              cy.wait(3000)
              cy.document()
                .within(() => {
                  cy.get('.btn')
                    .contains('Apagar Usuário')
                    .click()

                  cy.get('p.bigger-110')
                    .should('be.visible')

                  cy.get('.btn')
                    .contains('Apagar Conta')
                    .click()

                  cy.wait(3000)
                  cy.acessarMenuLateral('Gerenciar')
                  cy.acessarSubmenuGerenciamento('Gerenciar Usuários')
                  cy.get('.btn')
                    .contains('NÃO UTILIZADO')
                    .click()

                  cy.wait(3000)
                })
            }
          })
      }
    })
})

Cypress.Commands.add('getTableBody', () => {
  cy.get('.widget-box > .widget-body > .widget-main > .table-responsive > .table > tbody')
})

Cypress.Commands.add('defineIdiomaPtBr', () => {
  cy.visit('/account_prefs_page.php')

  cy.get('#language')
    .select('portuguese_brazil')

  cy.get('[form="account-prefs-update-form"]')
    .click()
})

Cypress.Commands.add('realizarLogoff', () => {
  cy.get('body').then($body => {
    if ($body.find('#navbar').length > 0) {
      cy.get('.user-info').click()
      cy.get('.user-menu > :nth-child(4) > a')
        .click()
    }
  })
})