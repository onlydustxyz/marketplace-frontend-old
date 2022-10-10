/// <reference types="cypress" />

import { HeadlessWalletFactory } from "../../../tests/lib/starknet-wallet-mock";
import { HeadlessWallet } from "../../../tests/lib/starknet-wallet-mock/wallet";

const walletFactory = new HeadlessWalletFactory();

let headlessWallet: HeadlessWallet;

context("Connect Github account", () => {
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

  it("should connect to github account", () => {
    const mockedWalletAddress = "0xa2fd97f6ea0914b540a8c5e24dbbc5a45245d885e354a916c53553cdb093e2";

    cy.window().then(win => {
      cy.stub(win, "open").returns({
        location: new URL(`${Cypress.config().baseUrl}/?code=github-auth-code`),
        closed: false,
      });
    });

    headlessWallet.autoConnect({ address: mockedWalletAddress });

    cy.getByTestId("header-profile-button").click();

    cy.getByTestId("header-profile-wallet-address").should("have.text", "0xa2fd...93e2");
    cy.getByTestId("header-profile-wallet-address-dot").should("have.class", "shadow-dot-connected");
    cy.getByTestId("header-profile-github-handle").should("have.text", "Not connected");
    cy.getByTestId("header-profile-github-handle-dot").should("have.class", "shadow-dot-not-connected");

    cy.getByTestId("github-connect-button").click();

    cy.getByTestId("header-profile-github-handle").should("have.text", "new-github-user-id");
    cy.getByTestId("header-profile-github-handle-dot").should("have.class", "shadow-dot-connected");
  });
});
