declare namespace Cypress {
	interface Chainable<Subject> {
		/**
		 * Comando customizável para realizar login na página, passando o usuário e a senha
		 * @param {string} login
		 * @param {string} password
		 * @param {any} cache
		 */
		login(login: any, password: any, cache: any): Chainable<any>
		login(): Chainable<any>

		
		/**
		 * Acessar Menu Lateral
		 */
		acessarMenuLateral(nomeMenu: any): Chainable<any>
		
		/**
		 * Acessar Submenu de Gerenciamento
		 */
		acessarSubmenuGerenciamento(nomeMenu: any): Chainable<any>

		/**
		 * Converter arquivo xlsx para json
		 */
		parseXlsx(inputFile: any): Chainable<any>

		/**
		 * Validar queda de sessão na aplicação
		 */
		validaSessaoAplicacao(): Chainable<any>
	}
}
