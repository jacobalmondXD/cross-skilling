/// <reference types="cypress" />

class CheckoutInformationPage {
  // Element Getters

  get checkoutInformationTitle() {
    return cy.get("[data-test='title']");
  }

  get firstNameField() {
    return cy.get('[data-test="firstName"]');
  }

  get lastNameField() {
    return cy.get('[data-test="lastName"]');
  }

  get postalCodeField() {
    return cy.get('[data-test="postalCode"]');
  }

  get continueButton() {
    return cy.get('[data-test="continue"]');
  }

  // Actions
  enterFirstName(firstName: string) {
    this.firstNameField.type(firstName);
  }

  enterLastName(lastName: string) {
    this.lastNameField.type(lastName);
  }

  enterPostalCode(postalCode: string) {
    this.postalCodeField.type(postalCode);
  }

  clickContinueButton() {
    this.continueButton.click();
  }
}
export default new CheckoutInformationPage();
