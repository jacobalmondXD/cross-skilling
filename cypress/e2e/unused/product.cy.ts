const username = Cypress.env("username");

import ProductPage from "../saucedemo/pages/ProductPage";

describe("Login Page tests", () => {
  beforeEach(() => {
    cy.login(username);
    cy.visit("/inventory.html", { failOnStatusCode: false });
  });

  it("checks product page is shown", () => {
    ProductPage.productTitle.should("have.text", "Products");
  });
});
