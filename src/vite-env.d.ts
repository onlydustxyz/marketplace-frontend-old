/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly OCBD_PROVIDER_HOSTNAME: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
