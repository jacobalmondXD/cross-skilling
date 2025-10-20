import { Given, When, Then } from "@badeball/cypress-cucumber-preprocessor";
import LoginPage from "../pages/LoginPage";
import ProductPage from "../pages/ProductPage";

const username = Cypress.env("username");
const password = Cypress.env("password");

Given("I am on the login page", () => {
  cy.visit("/");
});

Then("the username and password fields should be visible", () => {
  LoginPage.userNameInput.should("be.visible");
  LoginPage.passwordInput.should("be.visible");
});

When("I enter valid credentials", () => {
  expect(username, "Username env var must be defined").to.not.be.undefined;
  expect(password, "Password env var must be defined").to.not.be.undefined;
  LoginPage.typeUserName(username);
  LoginPage.typePassword(password);
});

When("I click the Login button", () => {
  LoginPage.clickLoginButton();
});

Then("I should be redirected to the product catalog page", () => {
  cy.url().should("eq", Cypress.config("baseUrl") + "inventory.html");
  ProductPage.productTitle.should("have.text", "Products");
});

Then("I should see the product listings", () => {
  ProductPage.productListings.should("be.visible");
});
