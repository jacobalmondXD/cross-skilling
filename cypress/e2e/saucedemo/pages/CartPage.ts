/// <reference types="cypress" />

class CartPage {
  // Element Getters

  get cartTitle() {
    return cy.get("[data-test='title']");
  }

  get cartItem() {
    return cy.get('[data-test="inventory-item-name"]');
  }

  get checkoutButton() {
    return cy.get('[data-test="checkout"]');
  }

  // Actions
  clickCheckoutButton() {
    this.checkoutButton.click();
  }
}
export default new CartPage();
