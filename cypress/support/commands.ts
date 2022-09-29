/// <reference types="cypress" />

export {};

declare global {
  namespace Cypress {
    interface Chainable {
      getByTestId(selector: string): Chainable<JQuery<HTMLElement>>;
      executeCallback(callback: () => void): Chainable<JQuery<HTMLElement>>;
    }
  }
}

Cypress.Commands.add("getByTestId", (selector, ...args) => {
  return cy.get(`[data-testid=${selector}]`, ...args);
});

Cypress.Commands.add("executeCallback", (callback: () => void) => {
  callback();
});
