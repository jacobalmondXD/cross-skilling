const username = Cypress.env("username");

import InventoryPage from "../saucedemo/pages/InventoryPage";

describe("Login Page tests", () => {
  beforeEach(() => {
    cy.login(username);
    cy.visit("/inventory.html", { failOnStatusCode: false });
  });

  it("checks inventory page is shown", () => {
    InventoryPage.inventorySection.should("exist");
  });
});
