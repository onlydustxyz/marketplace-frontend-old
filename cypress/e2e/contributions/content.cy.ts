/// <reference types="cypress" />

describe("Contribution", () => {
  beforeEach(() => {
    Cypress.Cookies.debug(true);

    cy.visit("http://localhost:3000/");

    // clear cookies again after visiting to remove
    // any 3rd party cookies picked up such as cloudflare
    cy.clearCookies();
  });

  describe("Test content", () => {
    it("should display an opened contribution", () => {
      cy.visit("http://localhost:3000/contributions/1");

      cy.getByTestId("contribution-status-label").should("have.text", "OPEN");
      cy.getByTestId("contribution-title").should("have.text", "Contribution 1");
      cy.getByTestId("project-title-link").should("have.text", "Project 1");
      cy.getByTestId("contribution-difficulty").should("have.text", "easy");
      cy.getByTestId("contribution-technology").should("have.text", "-");
      cy.getByTestId("contribution-type").should("have.text", "feature");
      cy.getByTestId("contribution-context").should("have.text", "isolated");
      cy.getByTestId("contribution-duration").should("have.text", "under a day");

      cy.getByTestId("button-main-action").should("have.text", "Apply").should("not.be.disabled");
    });
  });
});
