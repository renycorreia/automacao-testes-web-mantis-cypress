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