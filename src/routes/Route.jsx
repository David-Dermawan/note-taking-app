import HomePage from "../components/pages/Home";
import LoginPage from "../components/pages/Login";
import MainLayout from "../components/layout/MainLayout";
import ProtectedRoute from "./ProtectedRoute";
import Settings from "../components/pages/Settings";

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
