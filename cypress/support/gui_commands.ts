Cypress.Commands.add('login', (
	user = Cypress.env('user_name'),
	password = Cypress.env('user_password'),
	{ cacheSession = true } = {},
) => {
	const login = () => {
		cy.visit('/login_page.php')

		cy.get('#username').type(user)
		cy.get('.btn-success').click()
		cy.get('#password').type(password, { log: false })
		cy.get('.btn-success').click()
	}

	const validate = () => {
		cy.visit('/')
		cy.location('pathname', { timeout: 1000 })
			.should('not.eq', '/login_page.php')
	}

	const options = {
		cacheAcrossSpecs: true,
		validate,
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
			const t = $elm.text();
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


Cypress.Commands.add('gui_apagaTodasCategoriasPossiveis', () => {
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

Cypress.Commands.add('gui_apagaTodosMarcadores', () => {
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

Cypress.Commands.add('gui_apagaTodosUsuarioSemUso', () => {
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
