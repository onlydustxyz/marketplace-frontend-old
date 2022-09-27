/// <reference types="cypress" />

import { HeadlessWalletFactory, MockAccount, MockProvider } from "../../../tests/lib/starknet-wallet-mock";
import { HeadlessWallet } from "../../../tests/lib/starknet-wallet-mock/wallet";

const walletFactory = new HeadlessWalletFactory();

let headlessWallet: HeadlessWallet;

context("Connect", () => {
  beforeEach(() => {
    cy.on("window:before:load", window => {
      headlessWallet = walletFactory.create(window, {
        id: "headless-test",
        name: "Headless Test",
        windowPropertyName: "starknet_headless",
        accountFactory: (address: string) => {
          return new MockAccount(address);
        },
        provider: new MockProvider(),
      });

      headlessWallet.autoConnect({ address: "0x0123456789" });
    });

    cy.visit("http://localhost:3000/");
  });

  it("should display contribution information", () => {
    cy.visit("http://localhost:3000/contributions/3");

    cy.getByTestId("contribution-title").should(el => {
      expect(el.text(), "contribution title").to.equal("Contribution 3");
    });

    cy.getByTestId("header-profile-button").click();

    cy.getByTestId("header-profile-wallet-address").should(el => {
      expect(el.text(), "current account address").to.equal("0x0123...6789");
    });
  });
});
