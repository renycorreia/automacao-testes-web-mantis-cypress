import { defineConfig } from 'cypress'

const xlsx = require('node-xlsx').default
const fs = require('fs')
const readXlsx = require('./cypress/support/readXlsx')
const allureWriter = require('@shelex/cypress-allure-plugin/writer')

export default defineConfig({
  e2e: {
    setupNodeEvents (on, config) {
      on('task', {
        async parseXlsx ({ filePath }) {
          return await new Promise((resolve, reject) => {
            try {
              const jsonData = xlsx.parse(fs.readFileSync(filePath))
              resolve(jsonData)
            } catch (e) {
              reject(e)
            }
          })
        }
      })
      on('task', {
        readXlsx: readXlsx.read
      })
      allureWriter(on, config)
      return config
    },
    env: {
      allureReuseAfterSpec: true,
      hideCredentials: true,
      requestMode: true
    },
    baseUrl: 'http://localhost:8989',
    redirectionLimit: 100,
    experimentalRunAllSpecs: true
  }
})
