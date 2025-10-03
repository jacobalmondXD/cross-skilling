/// <reference types="cypress" />

class ProductPage {
  // Element Getters

  get productTitle() {
    return cy.get("[data-test='title']");
  }

  get shoppingCartBadge() {
    return cy.get("[data-test='shopping-cart-badge']");
  }

  get shoppingCartIcon() {
    return cy.get('[data-test="shopping-cart-link"]');
  }

  get productListings() {
    return cy.get("[data-test='inventory-list']");
  }

  // Actions
  clickAddToCart(itemName: string) {
    const selector = `[data-test="add-to-cart-${itemName}"]`;
    cy.get(selector).click();
  }

  clickShoppingCartIcon() {
    this.shoppingCartIcon.click();
  }
}
export default new ProductPage();
