# filepath: cypress/e2e/saucedemo/features/inventory.feature
@inventory
Feature: Inventory Page
  As a user
  I want to view the Inventory Page
  So that I can see the items available for purchase


  Background:
    Given I have logged in

  Scenario: Inventory page is shown correctly
    Then the inventory page should be visible

 