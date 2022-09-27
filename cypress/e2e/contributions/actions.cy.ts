/// <reference types="cypress" />

describe("Contribution", () => {
  beforeEach(() => {
    Cypress.Cookies.debug(true);

    cy.visit("http://localhost:3000/");

    // clear cookies again after visiting to remove
    // any 3rd party cookies picked up such as cloudflare
    cy.clearCookies();
  });

  describe("Test actions", () => {
    it("should open register modal when appliying with no connection", () => {
      cy.visit("http://localhost:3000/contributions/1");

      cy.getByTestId("button-main-action").click();

      cy.getByTestId("register-modal").should("exist");
    });
  });
});
