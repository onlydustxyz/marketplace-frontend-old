import { lazy, Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";
import { BrowserRouter, Link, Navigate, Route, Routes } from "react-router-dom";
import { Toaster } from "react-hot-toast";

import Loader from "src/icons/Loader";
import { trackingErrorHandler } from "src/utils/error-boundary";

import ErrorFallbackRouterAware from "./ErrorFallbackRouterAware";
import Layout from "./Layout";
import Modals from "./Modals";
import ScrollTop from "./ScrollTop";

const ContributionsPage = lazy(() => import("./ContributionsPage"));
const ProjectsPage = lazy(() => import("./ProjectsPage"));
const ContributionDetailsPage = lazy(() => import("./ContributionDetailsPage"));
const ProjectDetailsPage = lazy(() => import("./ProjectDetailsPage"));
const MyContributionsPage = lazy(() => import("./MyContributionsPage"));

export default function AppRoutes() {
  return (
    <BrowserRouter>
      <Toaster position="bottom-right" />
      <ScrollTop />
      <Layout>
        <Modals>
          <ErrorBoundary FallbackComponent={ErrorFallbackRouterAware} onError={trackingErrorHandler}>
            <Routes>
              <Route
                path="/contributions"
                element={
                  <Suspense fallback={<Loader className="animate-spin mt-[30vh]" size={62} />}>
                    <ContributionsPage />
                  </Suspense>
                }
              />
              <Route path="/projects" element={<Navigate to="/" replace />} />
              <Route
                path="/"
                element={
                  <Suspense fallback={<Loader className="animate-spin mt-[30vh]" size={62} />}>
                    <ProjectsPage />
                  </Suspense>
                }
              />
              <Route
                path="/contributions/:contributionId"
                element={
                  <Suspense fallback={<Loader className="animate-spin mt-[30vh]" size={62} />}>
                    <ContributionDetailsPage />
                  </Suspense>
                }
              />
              <Route
                path="/projects/:projectId"
                element={
                  <Suspense fallback={<Loader className="animate-spin mt-[30vh]" size={62} />}>
                    <ProjectDetailsPage />
                  </Suspense>
                }
              />
              <Route
                path="/my-contributions"
                element={
                  <Suspense fallback={<Loader className="animate-spin mt-[30vh]" size={62} />}>
                    <MyContributionsPage />
                  </Suspense>
                }
              />
              <Route
                path="*"
                element={
                  <Suspense fallback={<Loader className="animate-spin mt-[30vh]" size={62} />}>
                    <div className="mt-40 mb-8 text-4xl text-red-400/50">This page does not exists</div>
                    <Link to="/" className="text-2xl text-light-purple/90 underline">
                      Go back to the Home page
                    </Link>
                  </Suspense>
                }
              />
            </Routes>
          </ErrorBoundary>
        </Modals>
      </Layout>
    </BrowserRouter>
  );
}
