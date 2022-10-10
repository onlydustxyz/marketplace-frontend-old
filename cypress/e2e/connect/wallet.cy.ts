/// <reference types="cypress" />

import { HeadlessWalletFactory } from "../../../tests/lib/starknet-wallet-mock";
import { HeadlessWallet } from "../../../tests/lib/starknet-wallet-mock/wallet";

const walletFactory = new HeadlessWalletFactory();

let headlessWallet: HeadlessWallet;

context("Connect Wallet account", () => {
  beforeEach(() => {
    cy.on("window:before:load", window => {
      headlessWallet = walletFactory.create(window, {
        id: "headless-test",
        name: "Headless Test",
        windowPropertyName: "starknet_headless",
      });
    });

    cy.visit("/");
  });

  it("should display contribution information when already connected", () => {
    headlessWallet.autoConnect({ address: "0x0123456789" });

    cy.getByTestId("header-profile-button").click();

    cy.getByTestId("header-profile-wallet-address").should(el => {
      expect(el.text(), "current account address").to.equal("0x0123...6789");
    });
  });

  it("should connect the wallet", () => {
    cy.getByTestId("header-connect-button").click();

    cy.getByTestId("button-connect-headless-test").click();

    cy.executeCallback(() => {
      headlessWallet.connect({ address: "0x0123456789" });
    });

    cy.getByTestId("header-profile-button").click();

    cy.getByTestId("header-profile-wallet-address").should(el => {
      expect(el.text(), "current account address").to.equal("0x0123...6789");
    });
  });
});
