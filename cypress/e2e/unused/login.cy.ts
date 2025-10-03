const username = Cypress.env("username");
const password = Cypress.env("password");

import LoginPage from "../saucedemo/pages/LoginPage";
import ProductPage from "../saucedemo/pages/ProductPage";

describe("Login Page tests", () => {
  beforeEach(() => {
    cy.visit("/");
  });

  it("checks username and password fields are present", () => {
    LoginPage.userNameInput.should("exist");
    LoginPage.passwordInput.should("exist");
  });

  it("logs in with valid credentials, product page is shown", () => {
    LoginPage.login(username, password);
    ProductPage.productTitle.should("have.text", "Products");
  });
});
