/// <reference types="cypress" />

class CheckoutOverviewPage {
  // Element Getters

  get checkoutOverviewTitle() {
    return cy.get("[data-test='title']");
  }

  get checkoutItem() {
    return cy.get('[data-test="inventory-item-name"]');
  }

  get paymentInformation() {
    return cy.get('[data-test="payment-info-value"]');
  }

  get shippingInformation() {
    return cy.get('[data-test="shipping-info-value"]');
  }

  get finishButton() {
    return cy.get('[data-test="finish"]');
  }
  // Actions
  clickFinishButton() {
    this.finishButton.click();
  }
}

export default new CheckoutOverviewPage();
