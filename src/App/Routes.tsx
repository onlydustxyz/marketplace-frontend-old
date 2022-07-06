import { lazy, Suspense } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Layout from "./Layout";

const HomePage = lazy(() => import("src/pages/HomePage"));
const ContributionDetailsPage = lazy(() => import("src/pages/ContributionDetailsPage"));
const ProjectDetailsPage = lazy(() => import("src/pages/ProjectDetailsPage"));

export default function AppRoutes() {
  return (
    <BrowserRouter>
      <Layout>
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
      </Layout>
    </BrowserRouter>
  );
}
