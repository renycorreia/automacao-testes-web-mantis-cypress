/// <reference types = "Cypress" />
import { faker } from '@faker-js/faker'

describe('Desafio Base2 | Automação Web', {
    retries: {
        runMode: 3,
        openMode: 1,
    }
}, () => {
    const TRHEE_SECONDS_IN_MILLISECONDS = 3000

    beforeEach(function () {
        cy.login()
        cy.visit('/bug_report_page.php')
    })

    it('criar tarefa', function () {
        cy.get('#dropdown_projects_menu > .dropdown-toggle > .fa').click()
        cy.get('.scrollable-menu > ul > li > a')
            .each(($elm) => {
                if ($elm.text() === 'Todos os Projetos') {
                    cy.wrap($elm).click()
                }
            })

        cy.get('#select-project-id').select('- Projeto default')

        cy.get('.btn').contains('Selecionar Projeto').click()

        cy.get('#category_id').select('[Todos os Projetos] - Categoria default')

        var resumo = faker.commerce.productDescription();

        cy.get('#summary').type(resumo.substring(0, 50))
        cy.get('#description').invoke('val', resumo)

        cy.get('.btn').contains('Criar Nova Tarefa').click()

        cy.get('p.bold.bigger-110').should('be.visible').and('contain.text', 'Operação realizada com sucesso.')
    })

    it('criar tarefa e validar tarefa na lista', function () {
        cy.get('#dropdown_projects_menu > .dropdown-toggle > .fa').click()
        cy.get('.scrollable-menu > ul > li > a')
            .each(($elm) => {
                if ($elm.text() === 'Todos os Projetos') {
                    cy.wrap($elm).click()
                }
            })

        cy.get('#select-project-id').select('- Projeto default')

        cy.get('.btn').contains('Selecionar Projeto').click()

        cy.get('#category_id').select('[Todos os Projetos] - Categoria default')

        var resumo = faker.commerce.productDescription();

        cy.get('#summary').type(resumo.substring(0, 50))
        cy.get('#description').invoke('val', resumo)

        cy.get('.btn').contains('Criar Nova Tarefa').click()

        cy.get('p.bold.bigger-110').should('be.visible').and('contain.text', 'Operação realizada com sucesso.')

        cy.get('h4.widget-title.lighter').should('be.visible').and('contain.text', 'Ver Detalhes da Tarefa')

        cy.url().then(url => {
            var id = url.split("=")[1]

            cy.get('#sidebar > .nav-list > li > a')
                .each(($op) => {
                    const href = $op.attr('href');
                    if (href.valueOf() === '/view_all_bug_page.php') {
                        cy.visit('http://localhost:8989' + href)
                    }
                })
            cy.get('.column-id').should('contain.text', ('0000000' + id).slice(-7));
        });
    })

    it('criar tarefa e criar clone', function () {
        cy.get('#dropdown_projects_menu > .dropdown-toggle > .fa').click()
        cy.get('.scrollable-menu > ul > li > a')
            .each(($elm) => {
                if ($elm.text() === 'Todos os Projetos') {
                    cy.wrap($elm).click()
                }
            })

        cy.get('#select-project-id').select('- Projeto default')

        cy.get('.btn').contains('Selecionar Projeto').click()

        cy.get('#category_id').select('[Todos os Projetos] - Categoria default')

        var resumo = faker.commerce.productDescription();

        cy.get('#summary').type(resumo.substring(0, 50))
        cy.get('#description').invoke('val', resumo)

        cy.get('.btn').contains('Criar Nova Tarefa').click()

        cy.get('p.bold.bigger-110').should('be.visible').and('contain.text', 'Operação realizada com sucesso.')

        cy.get('h4.widget-title.lighter').should('be.visible').and('contain.text', 'Ver Detalhes da Tarefa')

        cy.get('td.bug-reporter').should('contain.text', 'administrator')
        cy.get('td.bug-summary').should('contain.text', resumo.substring(0, 50))
        cy.get('td.bug-description').should('contain.text', resumo)

        cy.get('.btn').contains('Criar Clone').click()

        cy.get('h4.widget-title.lighter').should('be.visible').and('contain.text', 'Digite os Detalhes do Relatório')

        cy.get('#summary').invoke('val').should('not.be.empty')
        cy.get('#description').invoke('val').should('not.be.empty')



        cy.get('#summary').type(' Clone')
        cy.get('#description').type(' Clone')

        cy.get('.widget-box > .widget-body > .widget-main > .table-responsive > .table > tbody')
            .each(($elm) => {
                cy.wrap($elm).should('contain.text', 'Copiar os dados adicionais do problema principal')
            })

        cy.get('.btn').contains('Criar Nova Tarefa').click()

        cy.get('td.bug-summary').should('contain.text', resumo.substring(0, 50) + ' Clone')
        cy.get('td.bug-description').should('contain.text', resumo + ' Clone')
    })

    it('apagar tarefa', function () {
        cy.get('#dropdown_projects_menu > .dropdown-toggle > .fa').click()
        cy.get('.scrollable-menu > ul > li > a')
            .each(($elm) => {
                if ($elm.text() === 'Todos os Projetos') {
                    cy.wrap($elm).click()
                }
            })

        cy.get('#select-project-id').select('- Projeto default')

        cy.get('.btn').contains('Selecionar Projeto').click()

        cy.get('#category_id').select('[Todos os Projetos] - Categoria default')

        var resumo = faker.commerce.productDescription();

        cy.get('#summary').type(resumo.substring(0, 50))
        cy.get('#description').invoke('val', resumo)

        cy.get('.btn').contains('Criar Nova Tarefa').click()

        cy.get('p.bold.bigger-110').should('be.visible').and('contain.text', 'Operação realizada com sucesso.')

        cy.get('h4.widget-title.lighter').should('be.visible').and('contain.text', 'Ver Detalhes da Tarefa')

        cy.url().then(url => {
            var id = url.split("=")[1]

            cy.get('.btn').contains('Apagar').click()

            cy.get('.widget-title').should('contain.text', 'Você tem certeza que deseja apagar estas tarefas?')

            cy.get('.btn').contains('Apagar Tarefas').click()

            cy.get('.column-id').should('not.contain.text', ('0000000' + id).slice(-7));
        });
    })

    it('criar tarefa e validar tarefa criada', function () {
        cy.get('#dropdown_projects_menu > .dropdown-toggle > .fa').click()
        cy.get('.scrollable-menu > ul > li > a')
            .each(($elm) => {
                if ($elm.text() === 'Todos os Projetos') {
                    cy.wrap($elm).click()
                }
            })

        cy.get('#select-project-id').select('- Projeto default')

        cy.get('.btn').contains('Selecionar Projeto').click()

        cy.get('#category_id').select('[Todos os Projetos] - Categoria default')

        var resumo = faker.commerce.productDescription();

        cy.get('#summary').type(resumo.substring(0, 50))
        cy.get('#description').invoke('val', resumo)

        cy.get('.btn').contains('Criar Nova Tarefa').click()

        cy.get('p.bold.bigger-110').should('be.visible').and('contain.text', 'Operação realizada com sucesso.')

        cy.get('h4.widget-title.lighter').should('be.visible').and('contain.text', 'Ver Detalhes da Tarefa')

        cy.get('td.bug-reporter').should('contain.text', 'administrator')
        cy.get('td.bug-summary').should('contain.text', resumo.substring(0, 50))
        cy.get('td.bug-description').should('contain.text', resumo)
    })

    it('criar tarefa e alterar status - de: novo para: retorno', function () {
        cy.get('#dropdown_projects_menu > .dropdown-toggle > .fa').click()
        cy.get('.scrollable-menu > ul > li > a')
            .each(($elm) => {
                if ($elm.text() === 'Todos os Projetos') {
                    cy.wrap($elm).click()
                }
            })

        cy.get('#select-project-id').select('- Projeto default')

        cy.get('.btn').contains('Selecionar Projeto').click()

        cy.get('#category_id').select('[Todos os Projetos] - Categoria default')

        var resumo = faker.commerce.productDescription();

        cy.get('#summary').type(resumo.substring(0, 50))
        cy.get('#description').invoke('val', resumo)

        cy.get('.btn').contains('Criar Nova Tarefa').click()

        cy.get('p.bold.bigger-110').should('be.visible').and('contain.text', 'Operação realizada com sucesso.')

        cy.wait(TRHEE_SECONDS_IN_MILLISECONDS)
        cy.get('select[name="new_status"]').select('retorno')
        cy.get('.btn').invoke('attr', 'val').contains('Alterar Status:').click()

        cy.get('h4.widget-title.lighter').should('be.visible').and('contain.text', 'Solicitar Retorno para a Tarefa')

        cy.get('#bugnote_text').type('Retorno retorno Retorno')

        cy.get('.btn').contains('Solicitar Retorno').click()

        cy.get('.bug-status').should('contain.text', 'retorno')

    })

    it('criar tarefa e alterar status - de: novo para: admitido', function () {
        cy.get('#dropdown_projects_menu > .dropdown-toggle > .fa').click()
        cy.get('.scrollable-menu > ul > li > a')
            .each(($elm) => {
                if ($elm.text() === 'Todos os Projetos') {
                    cy.wrap($elm).click()
                }
            })

        cy.get('#select-project-id').select('- Projeto default')

        cy.get('.btn').contains('Selecionar Projeto').click()

        cy.get('#category_id').select('[Todos os Projetos] - Categoria default')

        var resumo = faker.commerce.productDescription();

        cy.get('#summary').type(resumo.substring(0, 50))
        cy.get('#description').invoke('val', resumo)

        cy.get('.btn').contains('Criar Nova Tarefa').click()

        cy.get('p.bold.bigger-110').should('be.visible').and('contain.text', 'Operação realizada com sucesso.')

        cy.wait(TRHEE_SECONDS_IN_MILLISECONDS)

        cy.get('select[name="new_status"]').select('admitido')
        cy.get('.btn').invoke('attr', 'val').contains('Alterar Status:').click()

        cy.get('h4.widget-title.lighter').should('be.visible').and('contain.text', 'Admitir Tarefa')

        cy.get('.btn').contains('Admitir Tarefa').click()

        cy.get('.bug-status').should('contain.text', 'admitido')

    })

    it('criar tarefa e alterar status - de: novo para: confirmado', function () {
        cy.get('#dropdown_projects_menu > .dropdown-toggle > .fa').click()
        cy.get('.scrollable-menu > ul > li > a')
            .each(($elm) => {
                if ($elm.text() === 'Todos os Projetos') {
                    cy.wrap($elm).click()
                }
            })

        cy.get('#select-project-id').select('- Projeto default')

        cy.get('.btn').contains('Selecionar Projeto').click()

        cy.get('#category_id').select('[Todos os Projetos] - Categoria default')

        var resumo = faker.commerce.productDescription();

        cy.get('#summary').type(resumo.substring(0, 50))
        cy.get('#description').invoke('val', resumo)

        cy.get('.btn').contains('Criar Nova Tarefa').click()

        cy.get('p.bold.bigger-110').should('be.visible').and('contain.text', 'Operação realizada com sucesso.')

        cy.wait(TRHEE_SECONDS_IN_MILLISECONDS)

        cy.get('select[name="new_status"]').select('confirmado')
        cy.get('.btn').invoke('attr', 'val').contains('Alterar Status:').click()

        cy.get('h4.widget-title.lighter').should('be.visible').and('contain.text', 'Confirmar Tarefa')

        cy.get('.btn').contains('Confirmar Tarefa').click()

        cy.get('.bug-status').should('contain.text', 'confirmado')

    })

    it('criar tarefa e alterar status - de: novo para: atribuído', function () {
        cy.get('#dropdown_projects_menu > .dropdown-toggle > .fa').click()
        cy.get('.scrollable-menu > ul > li > a')
            .each(($elm) => {
                if ($elm.text() === 'Todos os Projetos') {
                    cy.wrap($elm).click()
                }
            })

        cy.get('#select-project-id').select('- Projeto default')

        cy.get('.btn').contains('Selecionar Projeto').click()

        cy.get('#category_id').select('[Todos os Projetos] - Categoria default')

        var resumo = faker.commerce.productDescription();

        cy.get('#summary').type(resumo.substring(0, 50))
        cy.get('#description').invoke('val', resumo)

        cy.get('.btn').contains('Criar Nova Tarefa').click()

        cy.get('p.bold.bigger-110').should('be.visible').and('contain.text', 'Operação realizada com sucesso.')

        cy.wait(TRHEE_SECONDS_IN_MILLISECONDS)

        cy.get('select[name="new_status"]').select('atribuído')
        cy.get('.btn').invoke('attr', 'val').contains('Alterar Status:').click()

        cy.get('h4.widget-title.lighter').should('be.visible').and('contain.text', 'Atribuir Tarefa')

        cy.get('.btn').contains('Atribuir Tarefa').click()

        cy.get('.bug-status').should('contain.text', 'atribuído')

    })

    it('criar tarefa e alterar status - de: novo para: resolvido', function () {
        cy.get('#dropdown_projects_menu > .dropdown-toggle > .fa').click()
        cy.get('.scrollable-menu > ul > li > a')
            .each(($elm) => {
                if ($elm.text() === 'Todos os Projetos') {
                    cy.wrap($elm).click()
                }
            })

        cy.get('#select-project-id').select('- Projeto default')

        cy.get('.btn').contains('Selecionar Projeto').click()

        cy.get('#category_id').select('[Todos os Projetos] - Categoria default')

        var resumo = faker.commerce.productDescription();

        cy.get('#summary').type(resumo.substring(0, 50))
        cy.get('#description').invoke('val', resumo)

        cy.get('.btn').contains('Criar Nova Tarefa').click()

        cy.get('p.bold.bigger-110').should('be.visible').and('contain.text', 'Operação realizada com sucesso.')

        cy.wait(TRHEE_SECONDS_IN_MILLISECONDS)

        cy.get('select[name="new_status"]').select('resolvido')
        cy.get('.btn').invoke('attr', 'val').contains('Alterar Status:').click()

        cy.get('h4.widget-title.lighter').should('be.visible').and('contain.text', 'Resolver Tarefa')

        cy.get('.btn').contains('Resolver Tarefa').click()

        cy.get('.bug-status').should('contain.text', 'resolvido')

    })

    it('criar tarefa e alterar status - de: novo para: fechado', function () {
        cy.get('#dropdown_projects_menu > .dropdown-toggle > .fa').click()
        cy.get('.scrollable-menu > ul > li > a')
            .each(($elm) => {
                if ($elm.text() === 'Todos os Projetos') {
                    cy.wrap($elm).click()
                }
            })

        cy.get('#select-project-id').select('- Projeto default')

        cy.get('.btn').contains('Selecionar Projeto').click()

        cy.get('#category_id').select('[Todos os Projetos] - Categoria default')

        var resumo = faker.commerce.productDescription();

        cy.get('#summary').type(resumo.substring(0, 50))
        cy.get('#description').invoke('val', resumo)

        cy.get('.btn').contains('Criar Nova Tarefa').click()

        cy.get('p.bold.bigger-110').should('be.visible').and('contain.text', 'Operação realizada com sucesso.')

        cy.wait(TRHEE_SECONDS_IN_MILLISECONDS)

        cy.get('select[name="new_status"]').select('fechado')
        cy.get('.btn').invoke('attr', 'val').contains('Alterar Status:').click()

        cy.get('h4.widget-title.lighter').should('be.visible').and('contain.text', 'Fechar Tarefa')

        cy.get('.btn').contains('Fechar Tarefa').click()

        cy.get('.bug-status').should('contain.text', 'fechado')

    })

    it('reabrir tarefa', function () {
        cy.get('#dropdown_projects_menu > .dropdown-toggle > .fa').click()
        cy.get('.scrollable-menu > ul > li > a')
            .each(($elm) => {
                if ($elm.text() === 'Todos os Projetos') {
                    cy.wrap($elm).click()
                }
            })

        cy.get('#select-project-id').select('- Projeto default')

        cy.get('.btn').contains('Selecionar Projeto').click()

        cy.get('#category_id').select('[Todos os Projetos] - Categoria default')

        var resumo = faker.commerce.productDescription();

        cy.get('#summary').type(resumo.substring(0, 50))
        cy.get('#description').invoke('val', resumo)

        cy.get('.btn').contains('Criar Nova Tarefa').click()

        cy.get('p.bold.bigger-110').should('be.visible').and('contain.text', 'Operação realizada com sucesso.')

        cy.wait(TRHEE_SECONDS_IN_MILLISECONDS)

        cy.get('select[name="new_status"]').select('fechado')
        cy.get('.btn').invoke('attr', 'val').contains('Alterar Status:').click()
        cy.get('.btn').contains('Fechar Tarefa').click()
        cy.get('.bug-status').should('contain.text', 'fechado')

        cy.get('.btn').invoke('attr', 'val').contains('Reabrir').click()

        cy.get('h4.widget-title.lighter').should('be.visible').and('contain.text', 'Solicitar Retorno para a Tarefa')

        cy.get('.btn').contains('Solicitar Retorno').click()

        cy.get('.bug-status').should('contain.text', 'retorno')
    })

    it('desassociar tarefa do projeto', function () {
        cy.get('#dropdown_projects_menu > .dropdown-toggle > .fa').click()
        cy.get('.scrollable-menu > ul > li > a')
            .each(($elm) => {
                if ($elm.text() === 'Todos os Projetos') {
                    cy.wrap($elm).click()
                }
            })

        cy.get('#select-project-id').select('- Projeto default')

        cy.get('.btn').contains('Selecionar Projeto').click()

        cy.get('#category_id').select('[Todos os Projetos] - Categoria default')

        var resumo = faker.commerce.productDescription();

        cy.get('#summary').type(resumo.substring(0, 50))
        cy.get('#description').invoke('val', resumo)

        cy.get('.btn').contains('Criar Nova Tarefa').click()

        cy.get('p.bold.bigger-110').should('be.visible').and('contain.text', 'Operação realizada com sucesso.')

        cy.wait(TRHEE_SECONDS_IN_MILLISECONDS)

        cy.get('.bug-project').should('contain.text', '- Projeto default')

        cy.url().then(url => {
            var id = url.split("=")[1]

            cy.get('.btn').invoke('attr', 'val').contains('Mover').click()

            cy.get('select[name="project_id"]').select(1)

            cy.get('.btn').invoke('attr', 'val').contains('Mover Tarefas').click()

            cy.get('.nav-search-input').type(('0000000' + id).slice(-7) + '{enter}')

            cy.get('.bug-project').should('not.contain.text', '- Projeto default')

        })
    })

    it('criar tarefa e adicionar anexo', function () {
        cy.get('#dropdown_projects_menu > .dropdown-toggle > .fa').click()
        cy.get('.scrollable-menu > ul > li > a')
            .each(($elm) => {
                if ($elm.text() === 'Todos os Projetos') {
                    cy.wrap($elm).click()
                }
            })

        cy.get('#select-project-id').select('- Projeto default')

        cy.get('.btn').contains('Selecionar Projeto').click()

        cy.get('#category_id').select('[Todos os Projetos] - Categoria default')

        var resumo = faker.commerce.productDescription();

        cy.get('#summary').type(resumo.substring(0, 50))
        cy.get('#description').invoke('val', resumo)

        cy.get('.btn').contains('Criar Nova Tarefa').click()

        cy.get('p.bold.bigger-110').should('be.visible').and('contain.text', 'Operação realizada com sucesso.')

        cy.get('h4.widget-title.lighter').should('be.visible').and('contain.text', 'Ver Detalhes da Tarefa')

        cy.get('td.bug-reporter').should('contain.text', 'administrator')
        cy.get('td.bug-summary').should('contain.text', resumo.substring(0, 50))
        cy.get('td.bug-description').should('contain.text', resumo)

        cy.get('.dropzone.center.dz-clickable')
            .selectFile('cypress/fixtures/example.json', { action: 'drag-drop' })

        cy.get('.btn').contains('Adicionar Anotação').click()

        cy.get(':nth-child(6) > .widget-box > .widget-body > .widget-main > .table-responsive > .table > tbody').should('contain.text', 'Arquivo Adicionado')
    })
})