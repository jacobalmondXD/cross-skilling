import { Given, When, Then } from "@badeball/cypress-cucumber-preprocessor";
const username = Cypress.env("username");

import ProductPage from "../pages/ProductPage";
import CartPage from "../pages/CartPage";
import CheckoutInformationPage from "../pages/CheckoutInformationPage";
import CheckoutOverviewPage from "../pages/CheckoutOverviewPage";
import CheckoutCompletePage from "../pages/CheckoutCompletePage";

interface ProductData {
  id: string;
  name: string;
}

interface ShippingData {
  firstName: string;
  lastName: string;
  postalCode: string;
}

let productData: { [key: string]: ProductData };
let shippingData: { [key: string]: ShippingData };

before(() => {
  cy.fixture("products.json").then((data) => {
    productData = data;
  });
  cy.fixture("shipping.json").then((data) => {
    shippingData = data;
  });
});

Given("I am a logged-in user on the product catalog page", () => {
  cy.login(username);
  cy.visit("/inventory.html", { failOnStatusCode: false });
});

When("I click the Add to cart button for a chosen item", () => {
  ProductPage.clickAddToCart(productData.itemOne.id);
});

Then("the shopping cart icon should show 1", () => {
  ProductPage.shoppingCartBadge.should("have.text", "1");
});

When("I click the shopping cart icon", () => {
  ProductPage.clickShoppingCartIcon();
});

Then("I should be navigated to the Your Cart page", () => {
  cy.url().should("eq", Cypress.config("baseUrl") + "cart.html");
  CartPage.cartTitle.should("have.text", "Your Cart");
});

Then("I should see the selected item listed in my cart", () => {
  CartPage.cartItem.should("have.text", productData.itemOne.name);
});

When("I click the Checkout button", () => {
  CartPage.clickCheckoutButton();
});

Then("I should be navigated to the Checkout: Your Information page", () => {
  cy.url().should("eq", Cypress.config("baseUrl") + "checkout-step-one.html");
  CheckoutInformationPage.checkoutInformationTitle.should(
    "have.text",
    "Checkout: Your Information"
  );
});

When("I enter valid shipping information", () => {
  CheckoutInformationPage.enterFirstName(shippingData.personOne.firstName);
  CheckoutInformationPage.enterLastName(shippingData.personOne.lastName);
  CheckoutInformationPage.enterPostalCode(shippingData.personOne.postalCode);
});

When("I click the Continue button", () => {
  CheckoutInformationPage.clickContinueButton();
});

Then("I should be navigated to the Checkout: Overview page", () => {
  cy.url().should("eq", Cypress.config("baseUrl") + "checkout-step-two.html");
  CheckoutOverviewPage.checkoutOverviewTitle.should(
    "have.text",
    "Checkout: Overview"
  );
});

When("I review the order summary", () => {
  CheckoutOverviewPage.checkoutItem.should(
    "have.text",
    productData.itemOne.name
  );
  CheckoutOverviewPage.paymentInformation.should(
    "have.text",
    "SauceCard #31337"
  );
  CheckoutOverviewPage.shippingInformation.should(
    "have.text",
    "Free Pony Express Delivery!"
  );
});

When("I click the Finish button", () => {
  CheckoutOverviewPage.clickFinishButton();
});

Then("I should be navigated to the Checkout: Complete page", () => {
  cy.url().should("eq", Cypress.config("baseUrl") + "checkout-complete.html");
  CheckoutCompletePage.checkoutCompleteTitle.should(
    "have.text",
    "Checkout: Complete!"
  );
});

Then("I should see a confirmation message", () => {
  CheckoutCompletePage.orderConfirmationMessage.should(
    "have.text",
    "Thank you for your order!"
  );
});
