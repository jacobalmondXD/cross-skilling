/// <reference types="cypress" />

class InventoryPage {
  // Element Getters

  get inventorySection() {
    return cy.get("[data-test='inventory-container']");
  }

  // Actions
  // (No actions needed for this page as of now)
}
export default new InventoryPage();
