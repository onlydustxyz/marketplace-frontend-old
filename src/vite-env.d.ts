/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly ODBS_GITHUB_CLIENT_ID: string;
  readonly ODBS_GITHUB_REDIRECT_URI: string;
  readonly ODBS_API_HOSTNAME: string;
  readonly ODBS_REGISTRY_CONTRACT_ADDRESS: string;

  readonly ODBS_PROVIDER_NETWORK: "mainnet-alpha" | "goerli-alpha" | "localhost";
  readonly OCBD_PROVIDER_HOSTNAME: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
