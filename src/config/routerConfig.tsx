import React from 'react';
import { createBrowserRouter } from "react-router-dom";
import DetailsPage from "../modules/article/views/DetailsPage";
import LandingPage from "../modules/article/views/LandingPage";
import ErrorPage from "../modules/common/views/ErrorPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <LandingPage />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/details/:id",
    element: <DetailsPage />,
    errorElement: <ErrorPage />,
  },
]);

export { router };
