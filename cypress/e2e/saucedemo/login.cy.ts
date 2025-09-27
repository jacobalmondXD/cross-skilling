const username = Cypress.env("username");
const password = Cypress.env("password");

import LoginPage from "../pages/LoginPage";

describe("Login Page tests", () => {
  beforeEach(() => {
    cy.visit("https://www.saucedemo.com/");
  });

  it("checks username and password fields are present", () => {
    LoginPage.userNameInput.should("exist");
    LoginPage.passwordInput.should("exist");
  });

  it("logs in with valid credentials", () => {
    LoginPage.userNameInput.type(username).should("have.value", username);
    LoginPage.passwordInput.type(password).should("have.value", password);

    LoginPage.loginButton.click();
  });
});
