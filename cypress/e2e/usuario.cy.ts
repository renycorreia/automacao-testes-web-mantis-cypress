/// <reference types = "Cypress" />
import { faker } from '@faker-js/faker'

describe('Desafio Base2 | Automação Web', {
    retries: {
        runMode: 3,
        openMode: 1,
    }
}, () => {

    before(() => {
        cy.task('readXlsx', { file: 'cypress/fixtures/newUsers.xlsx', sheet: "users" })
            .then((newUsers) => {
                cy.writeFile("cypress/fixtures/newUsers.json", { newUsers })
            })
    })

    beforeEach(function () {
        cy.login()
        cy.acessarMenuLateral('Gerenciar')
        cy.acessarSubmenuGerenciamento('Gerenciar Usuários')
    })

    it('validar filtro alfanumérico', function () {
        cy.get('.btn-group > .active').should('have.text', 'TODOS').should('have.attr', 'href').and('include', 'manage_user_page.php?sort=username&dir=ASC&save=').and('include', '&hideinactive=0&showdisabled=0&filter=ALL&search=')
    })

    it('criar usuario dados minimos', function () {
        cy.get('.btn').contains('Criar nova conta').click()

        var randomText = faker.name.fullName()
        var randomTextNoSpace = randomText.replace(/ /gi, "_")
        cy.get('#user-username').type(randomTextNoSpace)
        cy.get('.btn').contains('Criar Usuário').click()
        cy.get('p.bold.bigger-110').should('be.visible').and('contain.text', 'Usuário ' + randomTextNoSpace + ' criado com um nível de acesso de relator')

        cy.acessarSubmenuGerenciamento('Gerenciar Usuários')

        cy.get('.widget-box > .widget-body > .widget-main > .table-responsive > .table > tbody> tr > td:nth-child(1)')
            .each(($elm, index) => {
                const t = $elm.text();
                if (t.includes(randomTextNoSpace)) {
                    cy.get('.widget-box > .widget-body > .widget-main > .table-responsive > .table > tbody> tr > td:nth-child(4)')
                        .eq(index).should('have.text', 'relator')
                }
            })
    })

    it('criar usuario dados minimos e edita', function () {
        cy.get('.btn').contains('Criar nova conta').click()

        var randomText = faker.name.fullName()
        var randomTextNoSpace = randomText.replace(/ /gi, "_")
        cy.get('#user-username').type(randomTextNoSpace)
        cy.get('.btn').contains('Criar Usuário').click()
        cy.get('p.bold.bigger-110').should('be.visible').and('contain.text', 'Usuário ' + randomTextNoSpace + ' criado com um nível de acesso de relator')

        cy.get('#edit-realname').type(randomText)
        cy.get('#email-field').type(randomTextNoSpace + '@mail.com')
        cy.get('#edit-access-level').select('administrador')

        cy.get('.btn').contains('Atualizar Usuário').click()

        cy.get('p.bold.bigger-110').should('be.visible').and('contain.text', 'Operação realizada com sucesso.')

        cy.acessarSubmenuGerenciamento('Gerenciar Usuários')

        cy.get('.widget-box > .widget-body > .widget-main > .table-responsive > .table > tbody> tr > td:nth-child(1)')
            .each(($elm, index) => {
                const t = $elm.text();
                if (t.includes(randomTextNoSpace)) {
                    cy.get('.widget-box > .widget-body > .widget-main > .table-responsive > .table > tbody> tr > td:nth-child(4)')
                        .eq(index).should('have.text', 'administrador')
                }
            })
    })

    it('criar usuario - visualizador', function () {
        cy.get('.btn').contains('Criar nova conta').click()

        var randomText = faker.name.fullName()
        var randomTextNoSpace = randomText.replace(/ /gi, "_")
        cy.get('#user-username').type(randomTextNoSpace)
        cy.get('#user-realname').type(randomText)
        cy.get('#email-field').type(randomTextNoSpace + '@mail.com')
        cy.get('#user-access-level').select('visualizador')
        cy.get('.btn').contains('Criar Usuário').click()
        cy.get('p.bold.bigger-110').should('be.visible').and('contain.text', 'Usuário ' + randomTextNoSpace + ' criado com um nível de acesso de visualizador')

        cy.acessarSubmenuGerenciamento('Gerenciar Usuários')

        cy.get('.widget-box > .widget-body > .widget-main > .table-responsive > .table > tbody> tr > td:nth-child(1)')
            .each(($elm, index) => {
                const t = $elm.text();
                if (t.includes(randomTextNoSpace)) {
                    cy.get('.widget-box > .widget-body > .widget-main > .table-responsive > .table > tbody> tr > td:nth-child(4)')
                        .eq(index).should('have.text', 'visualizador')
                }
            })
    })

    it('criar usuario - atualizador', function () {
        cy.get('.btn').contains('Criar nova conta').click()

        var randomText = faker.name.fullName()
        var randomTextNoSpace = randomText.replace(/ /gi, "_")
        cy.get('#user-username').type(randomTextNoSpace)
        cy.get('#user-realname').type(randomText)
        cy.get('#email-field').type(randomTextNoSpace + '@mail.com')
        cy.get('#user-access-level').select('atualizador')
        cy.get('.btn').contains('Criar Usuário').click()
        cy.get('p.bold.bigger-110').should('be.visible').and('contain.text', 'Usuário ' + randomTextNoSpace + ' criado com um nível de acesso de atualizador')

        cy.acessarSubmenuGerenciamento('Gerenciar Usuários')

        cy.get('.widget-box > .widget-body > .widget-main > .table-responsive > .table > tbody> tr > td:nth-child(1)')
            .each(($elm, index) => {
                const t = $elm.text();
                if (t.includes(randomTextNoSpace)) {
                    cy.get('.widget-box > .widget-body > .widget-main > .table-responsive > .table > tbody> tr > td:nth-child(4)')
                        .eq(index).should('have.text', 'atualizador')
                }
            })
    })

    it('criar usuario - desenvolvedor', function () {
        cy.get('.btn').contains('Criar nova conta').click()

        var randomText = faker.name.fullName()
        var randomTextNoSpace = randomText.replace(/ /gi, "_")
        cy.get('#user-username').type(randomTextNoSpace)
        cy.get('#user-realname').type(randomText)
        cy.get('#email-field').type(randomTextNoSpace + '@mail.com')
        cy.get('#user-access-level').select('desenvolvedor')
        cy.get('.btn').contains('Criar Usuário').click()
        cy.get('p.bold.bigger-110').should('be.visible').and('contain.text', 'Usuário ' + randomTextNoSpace + ' criado com um nível de acesso de desenvolvedor')

        cy.acessarSubmenuGerenciamento('Gerenciar Usuários')

        cy.get('.widget-box > .widget-body > .widget-main > .table-responsive > .table > tbody> tr > td:nth-child(1)')
            .each(($elm, index) => {
                const t = $elm.text();
                if (t.includes(randomTextNoSpace)) {
                    cy.get('.widget-box > .widget-body > .widget-main > .table-responsive > .table > tbody> tr > td:nth-child(4)')
                        .eq(index).should('have.text', 'desenvolvedor')
                }
            })
    })

    it('criar usuario - gerente', function () {
        cy.get('.btn').contains('Criar nova conta').click()

        var randomText = faker.name.fullName()
        var randomTextNoSpace = randomText.replace(/ /gi, "_")
        cy.get('#user-username').type(randomTextNoSpace)
        cy.get('#user-realname').type(randomText)
        cy.get('#email-field').type(randomTextNoSpace + '@mail.com')
        cy.get('#user-access-level').select('gerente')
        cy.get('.btn').contains('Criar Usuário').click()
        cy.get('p.bold.bigger-110').should('be.visible').and('contain.text', 'Usuário ' + randomTextNoSpace + ' criado com um nível de acesso de gerente')

        cy.acessarSubmenuGerenciamento('Gerenciar Usuários')

        cy.get('.widget-box > .widget-body > .widget-main > .table-responsive > .table > tbody> tr > td:nth-child(1)')
            .each(($elm, index) => {
                const t = $elm.text();
                if (t.includes(randomTextNoSpace)) {
                    cy.get('.widget-box > .widget-body > .widget-main > .table-responsive > .table > tbody> tr > td:nth-child(4)')
                        .eq(index).should('have.text', 'gerente')
                }
            })
    })

    it('buscar usuario pelo login exato', function () {

        cy.get('.btn').contains('Criar nova conta').click()

        var randomText = faker.name.fullName()
        var randomTextNoSpace = randomText.replace(/ /gi, "_")
        cy.get('#user-username').type(randomTextNoSpace)
        cy.get('#user-realname').type(randomText)
        cy.get('#email-field').type(randomTextNoSpace + '@mail.com')

        cy.get('.btn').contains('Criar Usuário').click()
        cy.get('p.bold.bigger-110').should('be.visible').and('contain.text', 'Usuário ' + randomTextNoSpace + ' criado com um nível de acesso de relator')

        cy.acessarSubmenuGerenciamento('Gerenciar Usuários')

        cy.get('#search').type(randomTextNoSpace)
        cy.get('.btn').contains('Aplicar Filtro').click()
        cy.get('.widget-box > .widget-body > .widget-main > .table-responsive > .table > tbody> tr > td:nth-child(1)').should('have.length', 1)
            .each(($elm) => {
                cy.wrap($elm).should('contain.text', randomTextNoSpace)
            })
    })

    it('excluir usuário', function () {
        cy.get('.btn').contains('Criar nova conta').click()

        var randomText = faker.name.fullName()
        var randomTextNoSpace = randomText.replace(/ /gi, "_")
        cy.get('#user-username').type(randomTextNoSpace)
        cy.get('.btn').contains('Criar Usuário').click()
        cy.get('p.bold.bigger-110').should('be.visible').and('contain.text', 'Usuário ' + randomTextNoSpace + ' criado com um nível de acesso de relator')

        cy.acessarSubmenuGerenciamento('Gerenciar Usuários')

        cy.get('#search').type(randomTextNoSpace)
        cy.get('.btn').contains('Aplicar Filtro').click()
        cy.get('.widget-box > .widget-body > .widget-main > .table-responsive > .table > tbody> tr > td:nth-child(1)').should('have.length', 1)
            .each(($elm) => {
                cy.wrap($elm).should('contain.text', randomTextNoSpace).click()
            })

        cy.get('.btn').contains('Apagar Usuário').click()

        cy.get('p.bigger-110').should('be.visible').and('contain.text', 'Você tem certeza que deseja apagar a conta "' + randomTextNoSpace + '"?')

        cy.get('.btn').contains('Apagar Conta').click()

        cy.get('p.bold.bigger-110').should('be.visible').and('contain.text', 'Operação realizada com sucesso.')

        cy.get('.widget-box > .widget-body > .widget-main > .table-responsive > .table > tbody').should('not.contain.text', randomTextNoSpace)
    })

    it('buscar usuario pelo nome exato', function () {

        cy.get('.btn').contains('Criar nova conta').click()

        var randomText = faker.name.fullName()
        var randomTextNoSpace = randomText.replace(/ /gi, "")
        cy.get('#user-username').type(randomTextNoSpace)
        cy.get('#user-realname').type(randomText)
        cy.get('#email-field').type(randomTextNoSpace + '@mail.com')

        cy.get('.btn').contains('Criar Usuário').click()
        cy.get('p.bold.bigger-110').should('be.visible').and('contain.text', 'Usuário ' + randomTextNoSpace + ' criado com um nível de acesso de relator')

        cy.acessarSubmenuGerenciamento('Gerenciar Usuários')

        cy.get('#search').type(randomText)
        cy.get('.btn').contains('Aplicar Filtro').click()
        cy.get('.widget-box > .widget-body > .widget-main > .table-responsive > .table > tbody> tr > td:nth-child(2)').should('have.length', 1)
            .each(($elm) => {
                cy.wrap($elm).should('contain.text', randomText)
            })
    })

    it('buscar usuario pelo primeiro nome', function () {

        cy.get('.btn').contains('Criar nova conta').click()

        var randomText = 'Joaquim ' + faker.name.middleName('male');
        var randomTextNoSpace = randomText.replace(/ /gi, "_")
        cy.get('#user-username').type(randomTextNoSpace)
        cy.get('#user-realname').type(randomText)
        cy.get('#email-field').type(randomTextNoSpace + '@mail.com')

        cy.get('.btn').contains('Criar Usuário').click()
        cy.get('p.bold.bigger-110').should('be.visible').and('contain.text', 'Usuário ' + randomTextNoSpace + ' criado com um nível de acesso de relator')

        cy.acessarSubmenuGerenciamento('Gerenciar Usuários')
        cy.get('.btn').contains('Criar nova conta').click()

        randomText = 'Joaquim ' + faker.name.middleName('male');
        randomTextNoSpace = randomText.replace(/ /gi, "_")
        cy.get('#user-username').type(randomTextNoSpace)
        cy.get('#user-realname').type(randomText)
        cy.get('#email-field').type(randomTextNoSpace + '@mail.com')

        cy.get('.btn').contains('Criar Usuário').click()
        cy.get('p.bold.bigger-110').should('be.visible').and('contain.text', 'Usuário ' + randomTextNoSpace + ' criado com um nível de acesso de relator')

        cy.acessarSubmenuGerenciamento('Gerenciar Usuários')

        cy.get('#search').type(randomText.substring(0, randomText.indexOf(' ')))
        cy.get('.btn').contains('Aplicar Filtro').click()
        cy.get('.widget-box > .widget-body > .widget-main > .table-responsive > .table > tbody> tr > td:nth-child(2)').should('have.length.greaterThan', 1)
            .each(($elm) => {
                cy.wrap($elm).should('contain.text', randomText.substring(0, randomText.indexOf(' ')))
            })
    })

    it('buscar usuario pelo email', function () {

        cy.get('.btn').contains('Criar nova conta').click()

        var randomText = faker.name.fullName()
        var randomTextNoSpace = randomText.replace(/ /gi, "_")
        cy.get('#user-username').type(randomTextNoSpace)
        cy.get('#user-realname').type(randomText)
        cy.get('#email-field').type(randomTextNoSpace + '@mail.com')

        cy.get('.btn').contains('Criar Usuário').click()
        cy.get('p.bold.bigger-110').should('be.visible').and('contain.text', 'Usuário ' + randomTextNoSpace + ' criado com um nível de acesso de relator')

        cy.acessarSubmenuGerenciamento('Gerenciar Usuários')

        cy.get('#search').type(randomTextNoSpace + '@mail.com')
        cy.get('.btn').contains('Aplicar Filtro').click()
        cy.get('.widget-box > .widget-body > .widget-main > .table-responsive > .table > tbody> tr > td:nth-child(3)').should('have.length', 1)
            .each(($elm) => {
                cy.wrap($elm).should('contain.text', randomTextNoSpace + '@mail.com')
            })
    })

    it('criar usuario - Data-Driven (apagar em seguida)', function () {
        cy.fixture('newUsers').then((data) => {
            for (let i = 0; i < data.newUsers.length; i++) {
                cy.get('.btn').contains('Criar nova conta').click()
                cy.get('#user-username').type(data.newUsers[i].username)
                cy.get('#user-realname').type(data.newUsers[i].realname)
                cy.get('#email-field').type(data.newUsers[i].email)
                cy.get('.btn').contains('Criar Usuário').click()
                cy.get('p.bold.bigger-110').should('be.visible').and('contain.text', 'Usuário ' + data.newUsers[i].username + ' criado com um nível de acesso de relator')

                cy.acessarSubmenuGerenciamento('Gerenciar Usuários')

                cy.get('#search').type(data.newUsers[i].username + '{enter}')
                //cy.get('.btn').contains('Aplicar Filtro').click()

                cy.get('.widget-box > .widget-body > .widget-main > .table-responsive > .table > tbody> tr > td:nth-child(1)').should('have.length', 1)
                    .each(($elm, index) => {
                        const t = $elm.text();
                        if (t.includes(data.newUsers[i].username)) {
                            cy.get('.widget-box > .widget-body > .widget-main > .table-responsive > .table > tbody> tr > td:nth-child(4)')
                                .eq(index).should('have.text', 'relator')
                        }

                        cy.wrap($elm).click()
                    })

                cy.get('.btn').contains('Apagar Usuário').click()

                cy.get('p.bigger-110').should('be.visible').and('contain.text', 'Você tem certeza que deseja apagar a conta "' + data.newUsers[i].username + '"?')

                cy.get('.btn').contains('Apagar Conta').click()

                cy.get('p.bold.bigger-110').should('be.visible').and('contain.text', 'Operação realizada com sucesso.')

                cy.get('#search').type(data.newUsers[i].username + '{enter}')
                //cy.get('.btn').contains('Aplicar Filtro').click()
                cy.get('.widget-box > .widget-body > .widget-main > .table-responsive > .table > tbody> tr > td:nth-child(1)').should('have.length', 0)
                    .each(($elm) => {
                        cy.wrap($elm).should('not.contain.text', data.newUsers[i].username)
                    })
            }
        })
    })
})