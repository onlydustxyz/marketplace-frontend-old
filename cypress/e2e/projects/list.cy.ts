/// <reference types="cypress" />

describe("Project", () => {
  describe("List", () => {
    it("Should display projects", () => {
      cy.visit("/");

      cy.getByTestId("project-list").children().should("have.length", 3);

      cy.getByTestId("project-link-1");
      cy.getByTestId("project-link-3");
      cy.getByTestId("project-link-4");
    });

    it("Should allow to browse from project list to contribution details page", () => {
      cy.visit("/");

      cy.getByTestId("project-link-1").click();
      cy.getByTestId("project-title").contains("Project 1");

      cy.getByTestId("contribution-link-1").click();
      cy.getByTestId("contribution-title").contains("Contribution 1");
    });
  });
});
