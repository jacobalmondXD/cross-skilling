const username = Cypress.env("username");
const password = Cypress.env("password");

import LoginPage from "../saucedemo/pages/LoginPage";
import InventoryPage from "../saucedemo/pages/InventoryPage";

describe("Login Page tests", () => {
  beforeEach(() => {
    cy.visit("/");
  });

  it("checks username and password fields are present", () => {
    LoginPage.userNameInput.should("exist");
    LoginPage.passwordInput.should("exist");
  });

  it("logs in with valid credentials, inventory page is shown", () => {
    LoginPage.login(username, password);
    InventoryPage.inventorySection.should("exist");
  });
});
