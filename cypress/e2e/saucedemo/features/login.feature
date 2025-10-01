# filepath: cypress/e2e/saucedemo/features/login.feature
@login
Feature: User Login
  As a user
  I want to log in to the SauceDemo site
  So that I can access the inventory

  Background:
    Given I am on the login page

  Scenario: Check login fields are present
    Then the username and password fields should be visible

  Scenario: Successful login with valid credentials
    When I log in with valid credentials
    Then I should be redirected to the inventory page