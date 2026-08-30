import HomePage from "../components/pages/Home";
import LoginPage from "../components/pages/Login";
import MainLayout from "../components/layout/MainLayout";
import ProtectedRoute from "./ProtectedRoute";
import Settings from "../components/pages/Settings";
import Color from "../components/pages/Settings/Color";
import Font from "../components/pages/Settings/Font/Font";
import Password from "../components/pages/Settings/Password/Password";

const routes = [
  {
    element: <ProtectedRoute />,
    children: [
      {
        path: "/",
        element: <MainLayout />,
        children: [
          {
            index: true,
            element: <HomePage />,
            handle: {
              title: "All Notes",
            },
          },
          {
            path: "archived",
            element: <HomePage />,
            handle: {
              title: "Archive Notes",
            },
          },
          {
            path: "settings",
            element: <Settings />,
            handle: {
              title: "Settings",
            },
            children: [
              {
                path: "color",
                element: <Color />,
              },
              {
                path: "font",
                element: <Font />,
              },
              {
                path: "password",
                element: <Password />,
              },
            ],
          },
        ],
      },
      {
        path: "/login",
        element: <LoginPage />,
      },
    ],
  },
];

export default routes;
