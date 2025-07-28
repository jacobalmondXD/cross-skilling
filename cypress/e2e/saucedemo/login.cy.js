const username = Cypress.env("username");
const password = Cypress.env("password");

describe("Login Page tests", () => {
  beforeEach(() => {
    cy.visit("https://www.saucedemo.com/");
  });

  it("checks username and password fields are present", () => {
    expect(cy.get("[data-test='username']")).to.exist;
    expect(cy.get("[data-test='password']")).to.exist;
  });

  it("logs in with valid credentials and checks Products page is displayed", () => {
    cy.get("[data-test='username']")
      .type(username)
      .should("have.value", username);

    cy.get("[data-test='password']")
      .type(password)
      .should("have.value", password);

    cy.get("[data-test='login-button']").click();

    cy.get("[data-test='title']").should("have.text", "Products");
  });
});
