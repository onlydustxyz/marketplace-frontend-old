/// <reference types="cypress" />

import { HeadlessWalletFactory } from "../../../tests/lib/starknet-wallet-mock";
import { HeadlessWallet } from "../../../tests/lib/starknet-wallet-mock/wallet";

const walletFactory = new HeadlessWalletFactory();

let headlessWallet: HeadlessWallet;

describe("Global", () => {
  describe("Menu", () => {
    it("Should browse using top menu with anonymous", () => {
      cy.visit("/");

      cy.getByTestId("menu-link-mycontributions").should("not.exist");

      cy.getByTestId("menu-link-projects").click();
      cy.getByTestId("page-main-title").should("have.text", "All projects");

      cy.getByTestId("menu-link-contributions").click();
      cy.getByTestId("page-main-title").should("have.text", "All contributions");
    });

    it("should display the good contribution statuses with a connected user", () => {
      cy.on("window:before:load", window => {
        headlessWallet = walletFactory.create(window, {
          id: "headless-test",
          name: "Headless Test",
          windowPropertyName: "starknet_headless",
        });

        headlessWallet.autoConnect({ address: "0x0123456789" });
      });

      cy.visit("/");

      cy.getByTestId("menu-link-mycontributions").should("not.exist");

      cy.getByTestId("menu-link-projects").click();
      cy.getByTestId("page-main-title").should("have.text", "All projects");

      cy.getByTestId("menu-link-contributions").click();
      cy.getByTestId("page-main-title").should("have.text", "All contributions");

      cy.getByTestId("menu-link-mycontributions").click();
      cy.getByTestId("page-main-title").should("have.text", "My contributions");
    });
  });
});
