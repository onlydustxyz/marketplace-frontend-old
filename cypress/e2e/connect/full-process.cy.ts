/// <reference types="cypress" />

import { HeadlessWalletFactory } from "../../../tests/lib/starknet-wallet-mock";
import { HeadlessWallet } from "../../../tests/lib/starknet-wallet-mock/wallet";

const walletFactory = new HeadlessWalletFactory();

let headlessWallet: HeadlessWallet;

context("Connect all requirements", () => {
  beforeEach(() => {
    cy.on("window:before:load", window => {
      headlessWallet = walletFactory.create(window, {
        id: "headless-test",
        name: "Headless Test",
        windowPropertyName: "starknet_headless",
      });
    });

    cy.visit("http://localhost:3000/");
  });

  it("should connect to wallet and github account", () => {
    const mockedWalletAddress = "0xa2fd97f6ea0914b540a8c5e24dbbc5a45245d885e354a916c53553cdb093e2";

    cy.window().then(win => {
      cy.stub(win, "open").returns({ location: new URL("http://localhost:3000?code=github-auth-code"), closed: false });
    });

    cy.getByTestId("header-connect-button").click();

    cy.getByTestId("button-connect-headless-test").click();

    cy.executeCallback(() => {
      headlessWallet.connect({ address: mockedWalletAddress });
    });

    cy.getByTestId("wallet-connection-state")
      .should(el => {
        expect(el.text(), "current account address").to.contain("0xa2fd...93e2");
      })
      .getByTestId("wallet-connection-state-dot")
      .should("have.class", "shadow-dot-connected");

    cy.getByTestId("github-connection-state")
      .should(el => {
        expect(el.text(), "GitHub account").to.contain("Not connected");
      })
      .getByTestId("github-connection-state-dot")
      .should("have.class", "shadow-dot-not-connected");

    cy.getByTestId("discord-connection-state")
      .should(el => {
        expect(el.text(), "Discord account").to.contain("Not connected");
      })
      .getByTestId("discord-connection-state-dot")
      .should("have.class", "shadow-dot-not-connected");

    cy.getByTestId("github-connect-button").click();

    cy.getByTestId("github-connection-state")
      .should(el => {
        expect(el.text(), "GitHub account").to.contain("new-github-user-id");
      })
      .getByTestId("github-connection-state-dot")
      .should("have.class", "shadow-dot-connected");
  });
});
