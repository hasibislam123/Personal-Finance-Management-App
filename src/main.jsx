import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router";
import RootLayout from "./Layout/RootLayout.jsx";
import AddTransaction from "./Page/Transactions/AddTransaction.jsx";
import MyTransactions from "./Page/Transactions/MyTransactions.jsx";
import UpdateTransaction from "./Page/Transactions/UpdateTransaction.jsx";
import Home from "./Page/Home/Home.jsx";
import AuthProvider from "./Contexts/AuthProvider.jsx";
import Login from "./Page/Auth/Login.jsx";
import Register from "./Page/Auth/Register.jsx";
import Profile from "./Page/Profile/Profile.jsx";
import PrivateRoute from "./Routes/PrivateRoutes.jsx";
import View from "./Component/View/View.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      { index: true, element: <Home /> },
      {
        path: "addtransaction",
        element: (
          <PrivateRoute>
            <AddTransaction />
          </PrivateRoute>
        ),
      },
      {
        path: "mytransactions",
        element: (
          <PrivateRoute>
            <MyTransactions />
          </PrivateRoute>
        ),
      },
      {
        path: "updatetransaction",
        element: (
          <PrivateRoute>
            <UpdateTransaction />
          </PrivateRoute>
        ),
      },
       {
        path: "transactions/:id", // View transaction route
        element: (
          <PrivateRoute>
            <View></View>
          </PrivateRoute>
        ),
      },
      { path: "login", element: <Login /> },
      { path: "register", element: <Register /> },
      {
        path: "profile",
        element: (
          <PrivateRoute>
            <Profile />
          </PrivateRoute>
        ),
      },
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  </StrictMode>
);
