import { createBrowserRouter } from "react-router-dom";
import PrivateComponent from "../components/PrivateComponent";
import LoginPage from "../pages/LoginPage";
import ProductPage from "../pages/ProductPage";
import UserPage from "../pages/UserPage";

const router = createBrowserRouter([
  {
    path: "/login",
    element: <LoginPage />,
  },
  {
    path: "/admin",
    children: [
      {
        path: "",
        element: <h1>abc</h1>,
      },
      {
        path: "product",
        element: <PrivateComponent component={ProductPage} />,
      },
      {
        path: "product/details/:id",
        element: <PrivateComponent component={UserPage} />,
      },
      {
        path: "user",
        element: <PrivateComponent component={UserPage} />,
      },
      {
        path: "category",
        element: <h1>category</h1>,
      },
    ],
  },
]);

export default router;
