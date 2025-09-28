const username = Cypress.env("username");
//const password = Cypress.env("password");

import LoginPage from "../pages/LoginPage";
import InventoryPage from "../pages/InventoryPage";

describe("Login Page tests", () => {
  beforeEach(() => {
    cy.login(username);
    cy.visit("/inventory.html", { failOnStatusCode: false });
  });

  it("checks inventory page is shown", () => {
    InventoryPage.inventorySection.should("exist");
  });
});
