import './commands'
import addContext from 'mochawesome/addContext'
import '@shelex/cypress-allure-plugin'

afterEach(function () {
	cy.screenshot({ capture: 'runner' })
})

before(() => {
	cy.login(Cypress.env('user_name'), Cypress.env('user_password'), false)

	cy.acessarMenuLateral('Gerenciar')
	cy.acessarSubmenuGerenciamento('Gerenciar Projetos')

	var nomeProjeto = '- Projeto default';
	cy.get('.widget-box > .widget-body > .widget-main > .table-responsive > .table > tbody')
		.then(($projetos) => {
			if (!$projetos.text().includes(nomeProjeto)) {
				cy.get('.btn').contains('Criar Novo Projeto').click()
				cy.get('#project-name').type(nomeProjeto)
				cy.get('.btn').contains('Adicionar projeto').click()
			}
			cy.get('.widget-box > .widget-body > .widget-main > .table-responsive > .table > tbody').should('contain.text', nomeProjeto)
		})

	cy.wait(3000)

	var nomeProjeto2 = '- Projeto auxiliar';
	cy.get('.widget-box > .widget-body > .widget-main > .table-responsive > .table > tbody')
		.then(($projetos) => {
			if (!$projetos.text().includes(nomeProjeto2)) {
				cy.get('.btn').contains('Criar Novo Projeto').click()
				cy.get('#project-name').type(nomeProjeto2)
				cy.get('.btn').contains('Adicionar projeto').click()
			}
			cy.get('.widget-box > .widget-body > .widget-main > .table-responsive > .table > tbody').should('contain.text', nomeProjeto2)
		})
})

after(() => {
	var aux = 0

	cy.visit(`${Cypress.config('baseUrl')}/manage_custom_field_page.php`)
	cy.validaSessaoAplicacao()
	cy.get('.widget-body')
		.then($table => {
			if ($table.find('.widget-main > .table-responsive > .table > tbody> tr > td:nth-child(1) > a').length > 0) {
				cy.get('.widget-box > .widget-body > .widget-main > .table-responsive > .table > tbody> tr > td:nth-child(1) > a')
					.then($campos => {
						aux = $campos.length;
						for (let index = 0; index < aux; index++) {
							cy.get('.widget-box > .widget-body > .widget-main > .table-responsive > .table > tbody> tr > td:nth-child(1) > a').first().click()
							cy.get('.btn').contains('Apagar Campo Personalizado').click()
							cy.get('p.bigger-110').should('be.visible')
							cy.get('.btn').contains('Apagar Campo').click()
							cy.wait(3000)
							cy.visit(`${Cypress.config('baseUrl')}/manage_custom_field_page.php`)
							cy.validaSessaoAplicacao()
						}
					})
			}
		})

})

after(() => {
	var aux = 0
	cy.visit(`${Cypress.config('baseUrl')}/manage_proj_page.php`)
	cy.validaSessaoAplicacao()
	cy.get('#categories > .widget-box > .widget-body')
		.then($table => {
			if ($table.find('.widget-main > .table-responsive > .table > tbody > tr > td:nth-child(1)').length > 1) {
				cy.get('#categories > .widget-box > .widget-body > .widget-main > .table-responsive > .table > tbody > tr > td:nth-child(1)')
					.then($campos => {
						aux = $campos.length;
						for (let index = 0; index < aux; index++) {
							cy.get('#categories > .widget-box > .widget-body > .widget-main > .table-responsive > .table > tbody > tr > td:nth-child(1)')
								.then($categoria => {
									if ($categoria.text() != 'General') {
										cy.get('#categories > .widget-box > .widget-body > .widget-main > .table-responsive > .table > tbody > tr > td:nth-child(3)').first().contains('Apagar').click()
										cy.get('p').should('be.visible')
										cy.get('.btn').contains('Apagar Categoria').click()
										cy.wait(3000)
										cy.visit(`${Cypress.config('baseUrl')}/manage_proj_page.php`)
										cy.validaSessaoAplicacao()
									}
								})
						}
					})
			}
		})

})

after(() => {
	var aux = 0
	cy.visit(`${Cypress.config('baseUrl')}/manage_tags_page.php`)
	cy.validaSessaoAplicacao()
	cy.get('.widget-body')
		.then($table => {
			if ($table.find('.widget-main > .table-responsive > .table > tbody > tr > td:nth-child(1)').length > 0) {
				cy.get('.widget-main > .table-responsive > .table > tbody > tr > td:nth-child(1) > a')
					.then($campos => {
						aux = $campos.length;
						for (let index = 0; index < aux; index++) {
							cy.get('.widget-main > .table-responsive > .table > tbody > tr > td:nth-child(1) > a').first().click()
							cy.get('.btn').contains('Apagar Marcador').click()
							cy.get('p.bigger-110').should('be.visible').and('contain.text', 'Você tem certeza que quer apagar esse marcador?')
							cy.get('.btn').contains('Apagar Marcador').click()
							cy.wait(3000)
							cy.visit(`${Cypress.config('baseUrl')}/manage_tags_page.php`)
							cy.validaSessaoAplicacao()
						}
					})
			}
		})

})

after(() => {
	var aux = 0
	cy.visit(`${Cypress.config('baseUrl')}/manage_proj_page.php`)
	cy.validaSessaoAplicacao()
	cy.get('.widget-box > .widget-body')
		.then($table => {
			if ($table.find('.widget-main > .table-responsive > .table > tbody > tr > td:nth-child(1)').length > 0) {
				cy.get('.widget-box > .widget-body > .widget-main > .table-responsive > .table > tbody> tr > td:nth-child(1) > a')
					.then($campos => {
						aux = $campos.length;
						for (let index = 0; index < aux; index++) {
							cy.get('.widget-box > .widget-body > .widget-main > .table-responsive > .table > tbody> tr > td:nth-child(1) > a').first().click()
							cy.get('.btn').contains('Apagar Projeto').click()
							cy.get('p').should('be.visible')
							cy.get('.btn').contains('Apagar Projeto').click()
							cy.wait(3000)
							cy.visit(`${Cypress.config('baseUrl')}/manage_proj_page.php`)
	cy.validaSessaoAplicacao()
						}
					})
			}
		})

})

after(() => {
	var aux = 0
	cy.visit(`${Cypress.config('baseUrl')}/manage_user_page.php?sort=username&dir=ASC&save=1&hideinactive=0&showdisabled=0&filter=UNUSED&search=`)
	cy.validaSessaoAplicacao()
	cy.get('.widget-box > .widget-body')
		.then($table => {
			if ($table.find('.widget-main > .table-responsive > .table > tbody > tr > td:nth-child(1)').length > 0) {
				cy.get('.widget-box > .widget-body > .widget-main > .table-responsive > .table > tbody> tr > td:nth-child(1) > a')
					.then($campos => {
						aux = $campos.length;
						for (let index = 0; index < aux; index++) {
							cy.get('.widget-box > .widget-body > .widget-main > .table-responsive > .table > tbody> tr > td:nth-child(1) > a').first().click()
							cy.wait(3000)
							cy.get('.btn').contains('Apagar Usuário').click()
							cy.get('p.bigger-110').should('be.visible')
							cy.get('.btn').contains('Apagar Conta').click()
							cy.wait(3000)
							cy.visit(`${Cypress.config('baseUrl')}/manage_user_page.php?sort=username&dir=ASC&save=1&hideinactive=0&showdisabled=0&filter=UNUSED&search=`)
							cy.validaSessaoAplicacao()
						}
					})
			}
		})
})

Cypress.on('test:after:run', test => {
	let filename = ''
	if (test.state === 'passed' || test.state === 'failed') {
		filename = `${test.title} -- after each hook.png`
		addMochaContext(test, filename)
	}
})

function addMochaContext(test: Cypress.ObjectLike, filename: string) {
	const screenshotsFolder = Cypress.config('screenshotsFolder')
	addContext(
		{ test },
		{
			title: 'Screenshot',
			value: `../screenshots/${Cypress.spec.name}/${filename}`,
		}
	)
}
