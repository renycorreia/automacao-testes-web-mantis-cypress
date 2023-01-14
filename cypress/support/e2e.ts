import './commands'
import addContext from 'mochawesome/addContext'
import '@shelex/cypress-allure-plugin'

afterEach(function () {
	cy.screenshot({ capture: 'runner' })
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
