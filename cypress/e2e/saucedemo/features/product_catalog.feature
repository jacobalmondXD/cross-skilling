@product_catalog
Feature: Purchase Item from Product Catalog
  As a logged-in user 
  I want to complete the purchase of an item from the product catalog 
  So that I can receive my desired product.

  Background:
    Given I am a logged-in user on the product catalog page

  Scenario: User successfully purchases a single item
    When I click the Add to cart button for a chosen item
    Then the shopping cart icon should show 1

    When I click the shopping cart icon 
    Then I should be navigated to the Your Cart page
    And I should see the selected item listed in my cart

    When I click the Checkout button
    Then I should be navigated to the Checkout: Your Information page 

    When I enter valid shipping information
    And I click the Continue button
    Then I should be navigated to the Checkout: Overview page

    When I review the order summary
    And I click the Finish button
    Then I should be navigated to the Checkout: Complete page
    And I should see a confirmation message