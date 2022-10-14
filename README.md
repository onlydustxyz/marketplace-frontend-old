<p align="center">
    <img width="150" src="docs/resources/img/logo.png" />
</p>
<div align="center">
  <h1 align="center">Marketplace frontend</h1>
  <p align="center">
    <a href="https://discord.gg/onlydust">
        <img src="https://img.shields.io/badge/Discord-6666FF?style=for-the-badge&logo=discord&logoColor=white" />
    </a>
    <a href="https://twitter.com/intent/follow?screen_name=onlydust_xyz">
        <img src="https://img.shields.io/badge/Twitter-1DA1F2?style=for-the-badge&logo=twitter&logoColor=white" />
    </a>
    <a href="https://contributions.onlydust.xyz/">
        <img src="https://img.shields.io/badge/Contribute-6A1B9A?style=for-the-badge&logo=notion&logoColor=white" />
    </a>
    <a href="https://codecov.io/gh/onlydustxyz/marketplace-frontend">
        <img src="https://img.shields.io/codecov/c/gh/onlydustxyz/marketplace-frontend?style=for-the-badge&token=EZIUH1O81F" />
    </a>
  </p>
  
  <h3 align="center">Contribution marketplace web application frontend</h3>
</div>

## 🎟️ Description

This repository contains the code for the interface (Front End)

## 🎗️ Prerequisites

Install [yarn](https://classic.yarnpkg.com/en/docs/install).

## 📦 Installation

```bash
yarn install
cp .env.example .env
```

Then modify your `.env` file to match with your environment.

## 🔬 Usage

To run in development mode

```bash
yarn dev
```

## 🌡️ Testing


### Unit/integration

```bash
yarn test
```

With coverage

```bash
yarn test:coverage
```

### End-to-end

Run your server

```bash
yarn dev --mode test
MARKETPLACE_COVERAGE=true yarn dev --mode test // Run with coverage
```

Then run one of these commands

```bash
CYPRESS_BASE_URL=http://localhost:3000 yarn e2e
CYPRESS_BASE_URL=http://localhost:3000 yarn e2e:open // Open the UI
```

## 🛠 Build

```bash
yarn build
```

And to run in local your build.

```bash
yarn preview
```

## 🏗 Contributing
