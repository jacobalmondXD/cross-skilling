/// <reference types="cypress" />

class CheckoutCompletePage {
  // Element Getters

  get checkoutCompleteTitle() {
    return cy.get("[data-test='title']");
  }

  get orderConfirmationMessage() {
    return cy.get('[data-test="complete-header"]');
  }

  get backToProductsButton() {
    return cy.get("[data-test='back-to-products']");
  }
  // Actions
  clickBackToProductsButton() {
    this.backToProductsButton.click();
  }
}

export default new CheckoutCompletePage();
