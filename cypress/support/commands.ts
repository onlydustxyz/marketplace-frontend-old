/// <reference types="cypress" />

export {};

declare global {
  namespace Cypress {
    interface Chainable {
      getByTestId(selector: string, options?: Parameters<typeof cy.get>[1]): Chainable<JQuery<HTMLElement>>;
      executeCallback(callback: () => void): Chainable<JQuery<HTMLElement>>;
    }
  }
}

Cypress.Commands.add("getByTestId", (selector, options) => {
  return cy.get(`[data-testid=${selector}]`, options);
});

Cypress.Commands.add("executeCallback", (callback: () => void) => {
  callback();
});
