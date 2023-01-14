import { defineConfig } from 'cypress'

const xlsx = require('node-xlsx').default;
const fs = require('fs');
const path = require('path');
const readXlsx = require('./cypress/support/readXlsx')
const allureWriter = require('@shelex/cypress-allure-plugin/writer');

export default defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      on('task', {parseXlsx({filePath})
      {
        return new Promise((resolve, reject)=>
        {
          try{
            const jsonData = xlsx.parse(fs.readFileSync(filePath));
            resolve(jsonData);
          }catch(e){
            reject(e)
          }
        });
      }
      }),
      on('task', {
        'readXlsx': readXlsx.read
      }),
      allureWriter(on, config);
        return config;
    },
    env: {
        allureReuseAfterSpec: true
    },
    baseUrl: 'http://localhost:8989',
  }
})