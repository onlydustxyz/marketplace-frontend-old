import * as Sentry from "@sentry/browser";

export const trackingErrorHandler = (error: Error, errorInfo: { componentStack: string }) => {
  Sentry.withScope(scope => {
    scope.setExtras(errorInfo);
    Sentry.captureException(error);
  });
};
