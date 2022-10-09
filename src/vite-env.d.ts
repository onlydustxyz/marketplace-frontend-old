/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly MARKETPLACE_GITHUB_CLIENT_ID: string;
  readonly MARKETPLACE_GITHUB_REDIRECT_URI: string;
  readonly MARKETPLACE_DATA_API_HOSTNAME: string;
  readonly MARKETPLACE_SIGNUP_API_HOSTNAME: string;
  readonly MARKETPLACE_REGISTRY_CONTRACT_ADDRESS: string;

  readonly MARKETPLACE_STARKNET_NETWORK: "mainnet-alpha" | "goerli-alpha" | "localhost";
  readonly MARKETPLACE_STARKNET_HOSTNAME: string;

  readonly MARKETPLACE_TYPEFORM_APPLY_URL: string;
  readonly MARKETPLACE_TYPEFORM_SUBMIT_URL: string;
  readonly MARKETPLACE_SENTRY_DSN: string;
  readonly MARKETPLACE_SENTRY_ENVIRONMENT: string;
  readonly MARKETPLACE_SENTRY_RELEASE: string;
  readonly MARKETPLACE_SENTRY_TRACES_SAMPLE_RATE: string;

  readonly MARKETPLACE_REFRESH_CONTRIBUTIONS_INTERVAL: string;
  readonly MARKETPLACE_REFRESH_CONTRIBUTIONS_MAX_TRIES: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}

declare global {
  namespace NodeJS {
    interface Global {
      import: {
        meta: ImportMeta;
      };
    }
  }
}
