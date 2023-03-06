import 'cypress-plugin-api'

import './api_commands'
import './gui_commands'

import addContext from 'mochawesome/addContext'
import '@shelex/cypress-allure-plugin'

afterEach(() => {
  cy.screenshot({ capture: 'runner' })
})

Cypress.on('test:after:run', test => {
  let filename = ''
  if (test.state === 'passed' || test.state === 'failed') {
    filename = `${test.title} -- after each hook.png`
    addMochaContext(test, filename)
  }
})

before(() => {
  cy.login()
  cy.defineIdiomaPtBr()
})

function addMochaContext (test: Cypress.ObjectLike, filename: string): void {
  addContext(
    { test },
    {
      title: 'Screenshot',
      value: `../screenshots/${Cypress.spec.name}/${filename}`
    }
  )
}
