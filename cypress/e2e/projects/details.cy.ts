/// <reference types="cypress" />

describe("Project", () => {
  describe("Details page", () => {
    it("Should display an error when the project does not exist", () => {
      cy.visit("http://localhost:3000/projects/does-not-exists");

      cy.contains("Oops, it seems this project doesn't exist");
    });

    it("Should display project information", () => {
      cy.visit("http://localhost:3000/projects/1");

      cy.getByTestId("project-title").contains("Project 1");
      cy.getByTestId("project-description").contains("Description 1");

      cy.getByTestId("project-extlink-github")
        .should("exist")
        .should("have.attr", "href", "https://example.com/projects/1")
        .should("have.attr", "target", "_blank");
      cy.getByTestId("project-extlink-discord")
        .should("exist")
        .should("have.attr", "href", "https://example.com/discord/1")
        .should("have.attr", "target", "_blank");
      cy.getByTestId("project-extlink-website")
        .should("exist")
        .should("have.attr", "href", "https://example.com/website/1")
        .should("have.attr", "target", "_blank");

      cy.getByTestId("menu-link-projects").click();
      cy.getByTestId("project-link-2").click();

      cy.getByTestId("project-title").contains("Project 2");
      cy.getByTestId("project-description").contains("Description 2");

      cy.getByTestId("project-extlink-github")
        .should("exist")
        .should("have.attr", "href", "https://example.com/projects/2")
        .should("have.attr", "target", "_blank");
      cy.getByTestId("project-extlink-discord").should("not.exist");
      cy.getByTestId("project-extlink-website").should("not.exist");
    });
  });
});
