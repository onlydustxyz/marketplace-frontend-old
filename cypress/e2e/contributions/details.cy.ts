/// <reference types="cypress" />

import { HeadlessWalletFactory } from "../../../tests/lib/starknet-wallet-mock";
import { HeadlessWallet } from "../../../tests/lib/starknet-wallet-mock/wallet";

const walletFactory = new HeadlessWalletFactory();

let headlessWallet: HeadlessWallet;

describe("Contribution", () => {
  describe("Test content", () => {
    it("Should display an error when the contribution does not exist", () => {
      cy.visit("/contributions/does-not-exist");

      cy.contains("Oops, it seems this contribution doesn't exist");
    });

    it("should display all contribution information", () => {
      cy.visit("/contributions/1");

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

    it("should display the good contribution statuses with anonymous", () => {
      cy.visit("/contributions/1");
      cy.getByTestId("contribution-status-label").should("have.text", "OPEN");
      cy.getByTestId("contribution-status-details").should("not.exist");

      cy.visit("/contributions/2");
      cy.getByTestId("contribution-status-label").should("have.text", "COMPLETED");
      cy.getByTestId("contribution-status-details").should("not.exist");

      cy.visit("/contributions/4");
      cy.getByTestId("contribution-status-label").should("have.text", "OPEN");
      cy.getByTestId("contribution-status-details").should("not.exist");

      cy.visit("/contributions/6");
      cy.getByTestId("contribution-status-label").should("have.text", "ASSIGNED");
      cy.getByTestId("contribution-status-details").contains("1 contributor assigned");

      cy.visit("/contributions/8");
      cy.getByTestId("contribution-status-label").should("have.text", "ASSIGNED");
      cy.getByTestId("contribution-status-details").contains("2 contributors assigned");

      cy.visit("/contributions/7");
      cy.getByTestId("contribution-status-label").should("have.text", "COMPLETED");
      cy.getByTestId("contribution-status-details").should("not.exist");

      cy.visit("/contributions/9");
      cy.getByTestId("contribution-status-label").should("have.text", "CLOSED");
      cy.getByTestId("contribution-status-details").should("not.exist");
      cy.getByTestId("button-main-action").should("not.exist");

      cy.visit("/contributions/10");
      cy.getByTestId("contribution-status-label").should("have.text", "COMPLETED");
      cy.getByTestId("contribution-status-details").should("not.exist");
      cy.getByTestId("button-main-action").should("not.exist");
    });

    it("should display the good contribution statuses with a connected user", () => {
      cy.on("window:before:load", window => {
        headlessWallet = walletFactory.create(window, {
          id: "headless-test",
          name: "Headless Test",
          windowPropertyName: "starknet_headless",
        });

        headlessWallet.autoConnect({ address: "0x123456789" });
      });

      cy.visit("/contributions/1");
      cy.getByTestId("contribution-status-label").should("have.text", "OPEN");
      cy.getByTestId("contribution-status-details").should("not.exist");
      cy.getByTestId("button-main-action").should("not.be.disabled").should("have.text", "Apply");

      cy.visit("/contributions/2");
      cy.getByTestId("contribution-status-label").should("have.text", "COMPLETED");
      cy.getByTestId("contribution-status-details").should("not.exist");
      cy.getByTestId("button-main-action").should("not.exist");

      cy.visit("/contributions/3");
      cy.getByTestId("contribution-status-label").should("have.text", "GATED");
      cy.getByTestId("contribution-status-details").should("have.text", "Complete 9 more contributions to unlock");
      cy.getByTestId("button-main-action").should("be.disabled").should("have.text", "Claim");

      cy.visit("/contributions/4");
      cy.getByTestId("contribution-status-label").should("have.text", "APPLIED");
      cy.getByTestId("contribution-status-details").should("be.empty");
      cy.getByTestId("button-main-action").should("be.disabled").should("have.text", "Applied");

      cy.visit("/contributions/6");
      cy.getByTestId("contribution-status-label").should("have.text", "ASSIGNED");
      cy.getByTestId("contribution-status-details").contains("1 contributor assigned");
      cy.getByTestId("button-main-action").should("not.be.disabled").should("have.text", "Submit work");

      cy.visit("/contributions/8");
      cy.getByTestId("contribution-status-label").should("have.text", "ASSIGNED");
      cy.getByTestId("contribution-status-details").contains("2 contributors assigned");
      cy.getByTestId("button-main-action").should("not.exist");

      cy.visit("/contributions/7");
      cy.getByTestId("contribution-status-label").should("have.text", "GATED");
      cy.getByTestId("contribution-status-details").should("have.text", "Complete 8 more contributions to unlock");
      cy.getByTestId("button-main-action").should("be.disabled").should("have.text", "Apply");

      cy.visit("/contributions/9");
      cy.getByTestId("contribution-status-label").should("have.text", "CLOSED");
      cy.getByTestId("contribution-status-details").should("not.exist");
      cy.getByTestId("button-main-action").should("not.exist");

      cy.visit("/contributions/10");
      cy.getByTestId("contribution-status-label").should("have.text", "COMPLETED");
      cy.getByTestId("contribution-status-details").should("not.exist");
      cy.getByTestId("button-main-action").should("not.exist");

      cy.visit("/contributions/11");
      cy.getByTestId("contribution-status-label").should("have.text", "COMPLETED");
      cy.getByTestId("contribution-status-details").should("not.exist");
      cy.getByTestId("button-main-action").should("not.exist");

      cy.visit("/contributions/12");
      cy.getByTestId("contribution-status-label").should("have.text", "OPEN");
      cy.getByTestId("contribution-status-details").should("have.text", "10 remaining assignements");
      cy.getByTestId("button-main-action").should("not.be.disabled").should("have.text", "Claim");

      cy.visit("/contributions/13");
      cy.getByTestId("contribution-status-label").should("have.text", "OPEN");
      cy.getByTestId("contribution-status-details").contains("1 remaining assignement");
      cy.getByTestId("contribution-status-details").contains("2 contributors assigned");
      cy.getByTestId("button-main-action").should("not.be.disabled").should("have.text", "Claim");

      cy.visit("/contributions/14");
      cy.getByTestId("contribution-status-label").should("have.text", "ASSIGNED");
      cy.getByTestId("contribution-status-details").should("have.text", "2 contributors assigned");
      cy.getByTestId("button-main-action").should("not.exist");
    });
  });
});
