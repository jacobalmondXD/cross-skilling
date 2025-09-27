/// <reference types="cypress" />

class LoginPage {
  // Element Getters

  get userNameInput() {
    return cy.get("[data-test='username']");
  }

  get passwordInput() {
    return cy.get("[data-test='password']");
  }

  get loginButton() {
    return cy.get("[data-test='login-button']");
  }
}
export default new LoginPage();
