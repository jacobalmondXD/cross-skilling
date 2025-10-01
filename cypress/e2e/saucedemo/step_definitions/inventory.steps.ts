import { Given, When, Then } from "@badeball/cypress-cucumber-preprocessor";
const username = Cypress.env("username");

import InventoryPage from "../pages/InventoryPage";

Given("I have logged in", () => {
  cy.login(username);
  cy.visit("/inventory.html", { failOnStatusCode: false });
});

Then("the inventory page should be visible", () => {
  InventoryPage.inventorySection.should("be.visible");
});
