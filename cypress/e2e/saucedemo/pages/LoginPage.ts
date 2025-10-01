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

  // Actions
  login(username: string, password: string) {
    this.userNameInput.type(username);
    this.passwordInput.type(password);
    this.loginButton.click();
  }
}
export default new LoginPage();
