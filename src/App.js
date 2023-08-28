import { RouterProvider } from "react-router-dom";
import "./App.css";
import ToastMessage from "./components/ToastMessage";
import router from "./routes";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import PrivateComponent from "./components/PrivateComponent";
import ProductPage from "./pages/ProductPage";
function App() {
  return (
    <div className="App">
      <ToastMessage />
      <RouterProvider router={router} />
      {/* <BrowserRouter>
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="admin" element={<h2>abc</h2>} />
          <Route path="admin/product" element={<PrivateComponent component={ProductPage} />} />
        </Routes>
      </BrowserRouter> */}
    </div>
  );
}

export default App;
