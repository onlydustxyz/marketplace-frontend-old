import { lazy, Suspense } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Loader from "src/icons/Loader";
import Layout from "./Layout";
import Modals from "./Modals";

const HomePage = lazy(() => import("./HomePage"));
const ProjectsPage = lazy(() => import("./ProjectsPage"));
const ContributionDetailsPage = lazy(() => import("./ContributionDetailsPage"));
const ProjectDetailsPage = lazy(() => import("./ProjectDetailsPage"));
const MyContributionsPage = lazy(() => import("./MyContributionsPage"));

export default function AppRoutes() {
  return (
    <BrowserRouter>
      <Layout>
        <Modals>
          <Routes>
            <Route
              path="/"
              element={
                <Suspense fallback={<Loader className="animate-spin mt-[30vh]" size={62} />}>
                  <HomePage />
                </Suspense>
              }
            />
            <Route
              path="/projects"
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
          </Routes>
        </Modals>
      </Layout>
    </BrowserRouter>
  );
}
