# filepath: cypress/e2e/saucedemo/features/login.feature
@login
Feature: User Login
As a returning user 
I want to securely log in to the SauceDemo website 
So that I can access the product catalog 
And proceed with my shopping experience.

  Background:
    Given I am on the login page

  Scenario: Check login fields are present
    Then the username and password fields should be visible

  Scenario: Successful login with valid credentials
    When I enter valid credentials
    And I click the Login button 
    Then I should be redirected to the product catalog page