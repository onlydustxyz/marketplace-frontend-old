import { lazy, Suspense } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";

const HomePage = lazy(() => import("src/pages/HomePage"));
const ContributionDetailsPage = lazy(() => import("src/pages/ContributionDetailsPage"));

export default function AppRoutes() {
  return (
    <BrowserRouter>
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
          path="/contribution/:contributionId"
          element={
            <Suspense fallback={<>...</>}>
              <ContributionDetailsPage />
            </Suspense>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}
