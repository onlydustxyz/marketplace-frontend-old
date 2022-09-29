/// <reference types="cypress" />

import { HeadlessWalletFactory } from "../../../tests/lib/starknet-wallet-mock";
import { HeadlessWallet } from "../../../tests/lib/starknet-wallet-mock/wallet";

const walletFactory = new HeadlessWalletFactory();

let headlessWallet: HeadlessWallet;

describe("Contribution", () => {
  describe("Actions", () => {
    it("should open register modal when appliying with no connection", () => {
      cy.visit("http://localhost:3000/contributions/1");

      cy.getByTestId("button-main-action").click();

      cy.getByTestId("register-modal").should("exist");
    });

    it("should open register modal when appliying with an account without contributor", () => {
      cy.on("window:before:load", window => {
        headlessWallet = walletFactory.create(window, {
          id: "headless-test",
          name: "Headless Test",
          windowPropertyName: "starknet_headless",
        });

        headlessWallet.autoConnect({ address: "0x55555555" });
      });

      cy.visit("http://localhost:3000/contributions/1");

      cy.getByTestId("button-main-action").click();

      cy.getByTestId("register-modal").should("exist");
    });

    it("should open register modal when appliying with an account with no discord account", () => {
      cy.on("window:before:load", window => {
        headlessWallet = walletFactory.create(window, {
          id: "headless-test",
          name: "Headless Test",
          windowPropertyName: "starknet_headless",
        });

        headlessWallet.autoConnect({ address: "0x123456789abcdef" });
      });

      cy.visit("http://localhost:3000/contributions/1");

      cy.getByTestId("button-main-action").click();

      cy.getByTestId("register-modal").should("exist");
    });

    it("should apply", () => {
      cy.on("window:before:load", window => {
        headlessWallet = walletFactory.create(window, {
          id: "headless-test",
          name: "Headless Test",
          windowPropertyName: "starknet_headless",
        });

        headlessWallet.autoConnect({ address: "0x123456789" });
      });

      cy.visit("http://localhost:3000/contributions/1");

      cy.getByTestId("button-main-action").click();

      cy.getByTestId("toast-container").contains("Thank you for your application for Contribution 1,");
    });

    it("should claim and be accepted", () => {
      cy.on("window:before:load", window => {
        headlessWallet = walletFactory.create(window, {
          id: "headless-test",
          name: "Headless Test",
          windowPropertyName: "starknet_headless",
        });

        headlessWallet.autoConnect({ address: "0x123456789" });
      });

      cy.visit("http://localhost:3000/contributions/3");

      cy.getByTestId("button-main-action").click();

      cy.getByTestId("toast-container").contains("You are being assigned this contribution");

      cy.executeCallback(() => {
        headlessWallet.acceptTransaction({
          contractAddress: "0x04aa3b2b258388a58ed429795ab56a9cd9613152755ec317f5c6bee2294e2264",
          method: "claim_contribution",
        });
      });

      cy.getByTestId("toast-container").contains("You are now assigned to the contribution Contribution 3");
    });

    it("should claim and be rejected", () => {
      cy.on("window:before:load", window => {
        headlessWallet = walletFactory.create(window, {
          id: "headless-test",
          name: "Headless Test",
          windowPropertyName: "starknet_headless",
        });

        headlessWallet.autoConnect({ address: "0x123456789" });
      });

      cy.visit("http://localhost:3000/contributions/3");

      cy.getByTestId("button-main-action").click();

      cy.getByTestId("toast-container").contains("You are being assigned this contribution");

      cy.executeCallback(() => {
        headlessWallet.rejectTransaction({
          contractAddress: "0x04aa3b2b258388a58ed429795ab56a9cd9613152755ec317f5c6bee2294e2264",
          method: "claim_contribution",
        });
      });

      cy.getByTestId("toast-container").contains("An error occured while claiming this contribution");
    });
  });
});
