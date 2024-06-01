import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Admin from "./pages/Admin";
import RootLayout from "./Components/RootLayout";
import ErrorPage from "./pages/ErrorPage";
import ProtectedPages from "./Components/ProtectedPages";
import { ToastContainer } from "react-toastify";
import "react-toastify/ReactToastify.css"

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [{ index: true, element: <Home /> }],
    errorElement: <ErrorPage />,
  },
  { path: "/login", element: <Login /> },
  { path: "/register", element: <Register /> },
  {
    element: <ProtectedPages />,
    children: [{ path: "/admin", element: <Admin /> }],
  },
]);
const App = () => {
  return (
    <>
      <ToastContainer limit={1}/>
      <RouterProvider router={router} />
    </>
  );
};

export default App;
