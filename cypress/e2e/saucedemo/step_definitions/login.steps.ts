import { Given, When, Then } from "@badeball/cypress-cucumber-preprocessor";
import LoginPage from "../pages/LoginPage";
import InventoryPage from "../pages/InventoryPage";

const username = Cypress.env("username");
const password = Cypress.env("password");

Given("I am on the login page", () => {
  cy.visit("/");
});

Then("the username and password fields should be visible", () => {
  LoginPage.userNameInput.should("be.visible");
  LoginPage.passwordInput.should("be.visible");
});

When("I log in with valid credentials", () => {
  LoginPage.login(username, password);
});

Then("I should be redirected to the inventory page", () => {
  InventoryPage.inventorySection.should("be.visible");
});
