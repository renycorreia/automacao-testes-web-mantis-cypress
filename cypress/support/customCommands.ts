declare namespace Cypress {
  interface Chainable {
    /**
    * Comando customizável para realizar login na página, passando o usuário e a senha
    * @param {string} login
    * @param {string} password
    * @param {any} cache
    */
    login: (login?: any, password?: any, cache?: any) => Chainable<any>

    /**
    * Acessar Menu Lateral
    */
    acessarMenuLateral: (nomeMenu: any) => Chainable<any>

    /**
    * Acessar Submenu de Gerenciamento
    */
    acessarSubmenuGerenciamento: (nomeMenu: any) => Chainable<any>

    /**
    * Converter arquivo xlsx para json
    */
    parseXlsx: (inputFile: any) => Chainable<any>

    /**
    * Validar queda de sessão na aplicação
    */
    validaSessaoAplicacao: () => Chainable<any>

    getTableBody: () => Chainable<any>

    api_createProject: (project: any) => Chainable<any>

    api_getAllProjects: () => Chainable<any>

    api_deleteProject: (projectId: any) => Chainable<any>

    api_deleteAllProjects: () => Chainable<any>

    gui_apagaTodosCamposCustomizado: () => Chainable<any>

    gui_apagaTodasCategoriasPossiveis: () => Chainable<any>

    gui_apagaTodosMarcadores: () => Chainable<any>

    gui_apagaTodosUsuarioSemUso: () => Chainable<any>

    defineIdiomaPtBr: () => Chainable<any>

    realizarLogoff: () => Chainable<any>
  }
}
