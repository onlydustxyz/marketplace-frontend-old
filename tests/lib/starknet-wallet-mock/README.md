# Starknet-wallet-mock

## Introduction

This library help developers to test their application by stubbing the wallet and it's inject window object.

It comes with a headless wallet we can interact with using javascript.
And it injects a window object which stubs the usual starknet object injected by standard wallets.
It provides stubbed account and provider to work with.

This way you are able to mock some methods and define how you wallet should respond.

## Installation

You need to instanciate a `headlessWallet` using the `HeadlessWalletFactory`.  

```javascript
import { HeadlessWalletFactory, MockAccount, MockProvider } from 'tests/lib/starknet_headless';

const walletFactory = new HeadlessWalletFactory();

const headlessWallet = walletFactory.create(window, {
    id: "headless-test",
    name: "Headless Test",
    windowPropertyName: "starknet_headless",
});
```

- `windowPropertyName` is the name of the property used to inject the wallet client in `window`.  
It can be anything starting with `starknet`, this way it will be automatically detected by `get-starknet`.

## Usage


### Connect wallet


When the user click on the connect button corresponding to your headless wallet, then you can call the method `connect` to validate the connection.

```javascript
headlessWallet.connect({ address: "0x12340241B3e9559bF8786c236128525A2CC36a2c04F0115Ff902c63Df712cdef" });
```

In case you are working on a React application and you use `@testing-library/react`, you need to wrap this call with an async `act()`.  
This way you ensure yuor application updates before validating your tests.

```javascript
await act(() => {
    headlessWallet.connect({ address: "0x12340241B3e9559bF8786c236128525A2CC36a2c04F0115Ff902c63Df712cdef" });
});
```

### Auto connect a wallet

This feature allow to automatically connect a wallet without having to process the whole login flow.

Execute this method right after creating the headlessWallet.

```javascript
headlessWallet.autoConnect({ address: "0x0123456789" });
```

### Accept or reject a transaction

When invoking a smart contract, you want to be able to accept or reject it.

The only information you need are :
- the address of the contract which is called
- the method called

> This two elements are used to generate a transaction hash.  
> In reality the hash is based and much more data, but to ease the tests definition, we decided to keep it simple.  
> We consider that a same contract and method can't be called twice on a unique test

To accept a transaction

```javascript
headlessWallet.acceptTransaction({
    contractAddress: "0x000000000",
    method: "contract_method",
})
```

To reject a transaction

```javascript
headlessWallet.rejectTransaction({
    contractAddress: "0x000000000",
    method: "contract_method",
})
```

## Development

This library can be used directly in your application code. 
This way you are able to test the library behavior without having to write any test.
