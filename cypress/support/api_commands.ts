const accessToken = `${Cypress.env('mantis_access_token')}`

Cypress.Commands.add('api_createProject', project => {
  cy.request({
    method: 'POST',
    url: '/api/rest/projects/',
    body: {
      name: project.name,
      status: {
        id: 10,
        name: 'development',
        label: 'development'
      },
      description: project.description,
      enabled: true,
      file_path: '/tmp/',
      view_state: {
        id: 10,
        name: 'public',
        label: 'public'
      }
    },
    headers: { Authorization: accessToken }
  })
})

Cypress.Commands.add('api_deleteProject', projectId => {
  cy.request({
    method: 'DELETE',
    url: `/api/rest/projects/${projectId}`,
    headers: { Authorization: accessToken }
  })
})

Cypress.Commands.add('api_getAllProjects', () => {
  cy.request({
    method: 'GET',
    url: '/api/rest/projects/',
    headers: { Authorization: accessToken }
  })
})

Cypress.Commands.add('api_deleteAllProjects', () => {
  cy.api_getAllProjects().wait(3000)
    .then(response => {
      if (response.body.projects.length > 0) {
        response.body.projects.forEach((element: any) => {
          cy.api_deleteProject(element.id)
        })
      }
    })
})
