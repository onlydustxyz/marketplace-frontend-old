import React from "react";
import ReactDOM from "react-dom/client";
import * as Sentry from "@sentry/react";
import { BrowserTracing } from "@sentry/tracing";
import App from "src/App";
import config from "src/config";

import "virtual:vite-plugin-sentry/sentry-config";

import "src/assets/css/index.css";
import "src/assets/fonts/Alfreda/stylesheet.css";
import "src/assets/fonts/GTWalsheimPro/stylesheet.css";

if (config.SENTRY_DSN) {
  Sentry.init({
    dsn: config.SENTRY_DSN,
    integrations: [new BrowserTracing()],
    tracesSampleRate: config.SENTRY_TRACES_SAMPLE_RATE,
    debug: true,
    environment: config.SENTRY_ENVIRONMENT,
    dist: import.meta.env.VITE_PLUGIN_SENTRY_CONFIG.dist,
    release: import.meta.env.VITE_PLUGIN_SENTRY_CONFIG.release,
    enabled: process.env.NODE_ENV === "production",
  });
}

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
