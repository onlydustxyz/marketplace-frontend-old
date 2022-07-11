import { lazy, Suspense } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Layout from "./Layout";
import SharedModals from "./SharedModals";

const HomePage = lazy(() => import("./HomePage"));
const ContributionDetailsPage = lazy(() => import("./ContributionDetailsPage"));
const ProjectDetailsPage = lazy(() => import("./ProjectDetailsPage"));

export default function AppRoutes() {
  return (
    <BrowserRouter>
      <Layout>
        <SharedModals>
          <Routes>
            <Route
              path="/"
              element={
                <Suspense fallback={<>...</>}>
                  <HomePage />
                </Suspense>
              }
            />
            <Route
              path="/contributions/:contributionId"
              element={
                <Suspense fallback={<>...</>}>
                  <ContributionDetailsPage />
                </Suspense>
              }
            />
            <Route
              path="/projects/:projectId"
              element={
                <Suspense fallback={<>...</>}>
                  <ProjectDetailsPage />
                </Suspense>
              }
            />
          </Routes>
        </SharedModals>
      </Layout>
    </BrowserRouter>
  );
}
