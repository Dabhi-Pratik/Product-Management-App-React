import { lazy, Suspense } from "react";
import {
  createBrowserRouter,
  RouterProvider,
  Navigate,
} from "react-router-dom";

import MainLayout from "./router/MainLayout";
import ProtectedRoute from "./router/ProtectedRoute";
import Loading from "./components/Loading";
import Error from "./components//Error";

const Login = lazy(() => import("./components/Login"));
const Register = lazy(() => import("./components/Register"));
const ProductsList = lazy(() => import("./components/ProductsList"));
const Add = lazy(() => import("./components/add"));
const ProductState = lazy(() => import("./components/ProductState"));

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    errorElement: <Error />,
    children: [
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "register",
        element: <Register />,
      },
      {
        element: <ProtectedRoute />,
        children: [
          {
            index: true,
            element: <Navigate to="/products" replace />,
          },
          {
            path: "products",
            element: <ProductsList />,
          },
          {
            path: "add-product",
            element: <Add />,
          },
          {
            path: "stats",
            element: <ProductState />,
          },
        ],
      },
    ],
  },
]);

function App() {
  return (
    <Suspense
      fallback={
        <Loading
          fullScreen={true}
          message="Loading Product Management App..."
        />
      }
    >
      <RouterProvider router={router} />
    </Suspense>
  );
}

export default App;
