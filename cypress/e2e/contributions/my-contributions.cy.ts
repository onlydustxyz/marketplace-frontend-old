/// <reference types="cypress" />

import { HeadlessWalletFactory } from "../../../tests/lib/starknet-wallet-mock";
import { HeadlessWallet } from "../../../tests/lib/starknet-wallet-mock/wallet";

const walletFactory = new HeadlessWalletFactory();

let headlessWallet: HeadlessWallet;

describe("My contributions", () => {
  describe("List", () => {
    it("should redirect anonymous user", () => {
      cy.visit("/my-contributions");
      cy.location("pathname").should("eq", "/");
    });

    it("should display message when user has no contributions", () => {
      cy.on("window:before:load", window => {
        headlessWallet = walletFactory.create(window, {
          id: "headless-test",
          name: "Headless Test",
          windowPropertyName: "starknet_headless",
        });

        headlessWallet.autoConnect({ address: "0x9999" });
      });

      cy.visit("/my-contributions");

      cy.contains("You don't have contributions yet");

      cy.getByTestId("my-contributions-empty-button").click();

      cy.location("pathname").should("eq", "/");
    });

    it("should display only contributions with applications or assignements", () => {
      cy.on("window:before:load", window => {
        headlessWallet = walletFactory.create(window, {
          id: "headless-test",
          name: "Headless Test",
          windowPropertyName: "starknet_headless",
        });

        headlessWallet.autoConnect({ address: "0x123456789" });
      });

      cy.visit("/my-contributions");

      cy.scrollTo(0, 500);

      cy.get(".data-testid-my-contributions-list").children().should("have.length", 3);

      cy.getByTestId("contribution-link-4");
      cy.getByTestId("contribution-link-6");
      cy.getByTestId("contribution-link-10");
    });
  });
});
